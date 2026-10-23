import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * Rate limiting backed by the `rate_limits` table in Supabase, so every
 * serverless instance shares one count and limits survive cold starts and
 * redeploys. Each check is one round trip (the `rate_limit_hit` function does
 * the read-and-increment atomically).
 *
 * If the database call fails (including before the migration that creates
 * the table has been run), it falls back to a per-instance in-memory count
 * rather than failing the request: a weaker limit beats taking the forms down.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Fallback store, used only when the database is unreachable.
const memoryStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of memoryStore.entries()) {
    if (entry.resetAt < now) {
      memoryStore.delete(key);
    }
  }
}

/**
 * Get client identifier from request (IP address)
 */
function getClientIdentifier(request: NextRequest): string {
  // Only headers the host overwrites can be trusted. Vercel sets x-real-ip and
  // x-forwarded-for itself, discarding whatever the client sent. It does not
  // touch cf-connecting-ip, so trusting that header let any caller pick a new
  // "IP" per request and skip every limit. Re-add it only if the site is
  // actually served through Cloudflare.
  const realIp = request.headers.get("x-real-ip");
  const forwarded = request.headers.get("x-forwarded-for");

  const ip = realIp || forwarded?.split(",")[0] || "unknown";
  return ip.trim();
}

export interface RateLimitOptions {
  maxRequests: number; // Maximum requests allowed
  windowMs: number; // Time window in milliseconds
  identifier?: string; // Optional custom identifier (defaults to IP)
  /**
   * When false, report the current state without consuming a slot. Lets a route
   * reject an already-limited client up front but only charge the quota once the
   * request turns out to be a genuine, well-formed attempt — so a failed CAPTCHA
   * or a validation error doesn't eat the caller's budget.
   */
  count?: boolean;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

let warnedFallback = false;

/** Atomic increment in Postgres. Returns null if the database can't be used. */
async function hitDatabase(
  key: string,
  windowMs: number,
  consume: boolean
): Promise<{ count: number; resetAt: number } | null> {
  const warnOnce = (reason: string) => {
    if (!warnedFallback) {
      warnedFallback = true;
      console.error(
        "Rate limit database unavailable, using in-memory fallback:",
        reason
      );
    }
  };

  let data: unknown;
  let error: { message: string } | null;
  try {
    // Can throw rather than return an error, e.g. when the Supabase client
    // can't be created because its env vars are missing.
    ({ data, error } = await supabaseServer.rpc("rate_limit_hit", {
      p_key: key,
      p_window_ms: windowMs,
      p_consume: consume,
    }));
  } catch (e) {
    warnOnce(e instanceof Error ? e.message : String(e));
    return null;
  }

  const row = (Array.isArray(data) ? data[0] : data) as
    | { count: number; reset_at: string }
    | null
    | undefined;
  if (error || !row) {
    warnOnce(error?.message ?? "no row returned");
    return null;
  }

  return { count: row.count, resetAt: new Date(row.reset_at).getTime() };
}

function hitMemory(
  key: string,
  windowMs: number,
  consume: boolean
): { count: number; resetAt: number } {
  cleanupExpiredEntries();
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    if (consume) memoryStore.set(key, { count: 1, resetAt });
    return { count: consume ? 1 : 0, resetAt };
  }

  if (consume) entry.count += 1;
  return { count: entry.count, resetAt: entry.resetAt };
}

/**
 * Rate limit check. Returns the result and whether the request is allowed.
 */
export async function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const identifier = options.identifier || getClientIdentifier(request);
  const consume = options.count !== false;

  // Without a proxy in front (plain `next dev` over localhost) there is no
  // x-forwarded-for, so every caller collapses into a single "unknown" bucket
  // and the first few requests lock out the whole machine. Behind Vercel the
  // header is always present, so this only relaxes local development.
  if (identifier === "unknown" && process.env.NODE_ENV === "development") {
    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests,
      resetAt: Date.now() + options.windowMs,
    };
  }

  // Scoped by route as well as caller, so two routes that happen to share a
  // window length don't draw from one budget. Hashed so the table never holds
  // a visitor's raw IP address.
  const key = createHash("sha256")
    .update(`${request.nextUrl.pathname}|${identifier}|${options.windowMs}`)
    .digest("hex");

  const hit =
    (await hitDatabase(key, options.windowMs, consume)) ??
    hitMemory(key, options.windowMs, consume);

  // A peek doesn't count itself, so ask "would one more request fit?"
  const effective = consume ? hit.count : hit.count + 1;

  return {
    success: effective <= options.maxRequests,
    limit: options.maxRequests,
    remaining: Math.max(0, options.maxRequests - effective),
    resetAt: hit.resetAt,
  };
}

/**
 * Consume one slot and return an error response if the caller is over budget.
 * Use after a request has been validated, so only genuine attempts are charged.
 */
export async function consumeRateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<{ allowed: boolean; response?: Response }> {
  return checkRateLimit(request, { ...options, count: true });
}

/**
 * Check rate limit and return error response if exceeded
 */
export async function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<{ allowed: boolean; response?: Response }> {
  const result = await rateLimit(request, options);

  if (!result.success) {
    const response = NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": result.limit.toString(),
          "X-RateLimit-Remaining": result.remaining.toString(),
          "X-RateLimit-Reset": new Date(result.resetAt).toISOString(),
          "Retry-After": Math.ceil(
            (result.resetAt - Date.now()) / 1000
          ).toString(),
        },
      }
    );
    return { allowed: false, response };
  }

  return { allowed: true };
}
