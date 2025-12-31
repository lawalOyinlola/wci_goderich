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
  const now = Date.now();
  const key = `${identifier}:${options.windowMs}`;

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt < now) {
    // Create new entry or reset expired entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    rateLimitStore.set(key, newEntry);

    return {
      success: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - 1,
      resetAt: newEntry.resetAt,
    };
  }

  // Increment count
  entry.count += 1;
  const remaining = Math.max(0, options.maxRequests - entry.count);

  return {
    success: entry.count <= options.maxRequests,
    limit: options.maxRequests,
    remaining,
    resetAt: entry.resetAt,
  };
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
