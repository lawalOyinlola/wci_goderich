import { NextRequest, NextResponse } from "next/server";

/**
 * Verify hCaptcha token (if hCaptcha is configured)
 */
async function verifyHcaptcha(token: string | null): Promise<boolean> {
  if (!token) return false;

  const secretKey = process.env.HCAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // hCaptcha not configured, skip verification
    return true;
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying hCaptcha:", error);
    return false;
  }
}

/**
 * Verify reCAPTCHA token (if reCAPTCHA is configured)
 */
async function verifyRecaptcha(token: string | null): Promise<boolean> {
  if (!token) return false;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // reCAPTCHA not configured, skip verification
    return true;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
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
 * Supports hCaptcha, reCAPTCHA, and API key verification
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
    const hcaptchaToken = (body.hcaptchaToken as string) || null;
    const recaptchaToken = (body.recaptchaToken as string) || null;

    // Try hCaptcha first, then reCAPTCHA
    if (hcaptchaToken) {
      const isValid = await verifyHcaptcha(hcaptchaToken);
      if (!isValid) {
        return {
          verified: false,
          error: "CAPTCHA verification failed",
        };
      }
    } else if (recaptchaToken) {
      const isValid = await verifyRecaptcha(recaptchaToken);
      if (!isValid) {
        return {
          verified: false,
          error: "CAPTCHA verification failed",
        };
      }
    } else {
      // CAPTCHA required but not provided
      const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
      const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (hcaptchaSiteKey || recaptchaSiteKey) {
        return {
          verified: false,
          error: "CAPTCHA verification required",
        };
      }
      // CAPTCHA not configured, allow request
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

