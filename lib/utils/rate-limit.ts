import { NextRequest, NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store for rate limiting
// In production, consider using Redis or a database for distributed systems
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client identifier from request (IP address)
 */
function getClientIdentifier(request: NextRequest): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare

  const ip = cfConnectingIp || realIp || forwarded?.split(",")[0] || "unknown";
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

/**
 * Rate limit middleware
 * Returns rate limit result and whether the request should be allowed
 */
export function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): RateLimitResult {
  cleanupExpiredEntries();

  const identifier = options.identifier || getClientIdentifier(request);
  const consume = options.count !== false;
  const now = Date.now();
  const key = `${identifier}:${options.windowMs}`;

  // Without a proxy in front (plain `next dev` over localhost) there is no
  // x-forwarded-for, so every caller collapses into a single "unknown" bucket
  // and the first few requests lock out the whole machine. Behind Vercel the
  // header is always present, so this only relaxes local development.
  if (identifier === "unknown" && process.env.NODE_ENV === "development") {
    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests,
      resetAt: now + options.windowMs,
    };
  }

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + options.windowMs;
    if (consume) {
      rateLimitStore.set(key, { count: 1, resetAt });
    }

    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - (consume ? 1 : 0),
      resetAt,
    };
  }

  const count = consume ? (entry.count += 1) : entry.count + 1;
  const remaining = Math.max(0, options.maxRequests - count);

  return {
    success: count <= options.maxRequests,
    limit: options.maxRequests,
    remaining,
    resetAt: entry.resetAt,
  };
}

/**
 * Consume one slot and return an error response if the caller is over budget.
 * Use after a request has been validated, so only genuine attempts are charged.
 */
export function consumeRateLimit(
  request: NextRequest,
  options: RateLimitOptions
): { allowed: boolean; response?: Response } {
  return checkRateLimit(request, { ...options, count: true });
}

/**
 * Check rate limit and return error response if exceeded
 */
export function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions
): { allowed: boolean; response?: Response } {
  const result = rateLimit(request, options);

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
