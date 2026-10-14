import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token with Cloudflare. Tokens are
 * single-use, so a replayed token fails here.
 */
async function verifyTurnstile(
  token: string,
  secretKey: string,
  remoteIp: string | null
): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret: secretKey, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return false;
  }
}

/**
 * Verify API key from header (optional, for trusted clients)
 */
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = process.env.API_SUBMISSION_KEY;
  if (!apiKey) {
    // API key not configured, skip verification
    return true;
  }

  const providedKey = request.headers.get("x-api-key");
  return providedKey === apiKey;
}

export interface AuthOptions {
  requireCaptcha?: boolean; // Require CAPTCHA verification
  requireApiKey?: boolean; // Require API key
}

/**
 * Verify request authentication
 * Supports Cloudflare Turnstile and API key verification
 */
export async function verifyRequest(
  request: NextRequest,
  body: Record<string, unknown>,
  options: AuthOptions = {}
): Promise<{ verified: boolean; error?: string }> {
  // Check API key if required
  if (options.requireApiKey && !verifyApiKey(request)) {
    return {
      verified: false,
      error: "Invalid or missing API key",
    };
  }

  // Check CAPTCHA if required
  if (options.requireCaptcha) {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
      // Not configured. Fine for local development; in production it fails
      // closed, so a missing env var can't silently switch bot protection off.
      if (process.env.NODE_ENV === "production") {
        console.error("TURNSTILE_SECRET_KEY is not set; refusing submission");
        return {
          verified: false,
          error: "Verification isn't available right now. Please try again later.",
        };
      }
      return { verified: true };
    }

    const token =
      typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    if (!token) {
      return {
        verified: false,
        error: "Please complete the verification check.",
      };
    }

    const remoteIp =
      request.headers.get("x-real-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      null;

    if (!(await verifyTurnstile(token, secretKey, remoteIp))) {
      return {
        verified: false,
        error: "Verification failed or expired. Please try again.",
      };
    }
  }

  return { verified: true };
}

/**
 * Middleware to check authentication and return error response if failed
 */
export async function checkAuth(
  request: NextRequest,
  body: Record<string, unknown>,
  options: AuthOptions = {}
): Promise<{ allowed: boolean; response?: NextResponse }> {
  const authResult = await verifyRequest(request, body, options);

  if (!authResult.verified) {
    const response = NextResponse.json(
      {
        error: authResult.error || "Authentication failed",
      },
      { status: 401 }
    );
    return { allowed: false, response };
  }

  return { allowed: true };
}

/**
 * Gate for admin-only routes (editing, approving or deleting submissions).
 *
 * Fails closed: if ADMIN_API_KEY is unset, every request is refused, so a
 * missing env var can never leave these routes open the way the CAPTCHA and
 * submission-key checks above do. The key is compared in constant time.
 * Send it as the `x-admin-api-key` header.
 */
export function requireAdmin(
  request: NextRequest
): { allowed: true } | { allowed: false; response: NextResponse } {
  const expected = process.env.ADMIN_API_KEY;
  const provided = request.headers.get("x-admin-api-key");

  if (expected && provided) {
    // Hash both sides so timingSafeEqual gets equal-length buffers and the
    // key's length doesn't leak through an early return.
    const a = createHash("sha256").update(expected).digest();
    const b = createHash("sha256").update(provided).digest();
    if (timingSafeEqual(a, b)) {
      return { allowed: true };
    }
  }

  return {
    allowed: false,
    response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
  };
}
