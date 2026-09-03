import type { Birthday } from "@/lib/types/birthdays";

// Re-export for convenience
export type { Birthday };

/**
 * Fetches birthdays from the API route
 * @param month - Optional month filter (1-12)
 * @returns Array of birthdays
 */
export async function getBirthdays(month?: number): Promise<Birthday[]> {
  try {
    const params = new URLSearchParams();
    if (month && month >= 1 && month <= 12) {
      params.append("month", month.toString());
    }

    const queryString = params.toString();
    const url = `/api/birthdays${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch birthdays");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error in getBirthdays:", error);
    return [];
  }
}

/**
 * Gateway statuses that mean the request never reached the handler, so replaying
 * it cannot duplicate work. Deliberately excludes 500: that comes from our own
 * route, which has already retried the insert and rolled back its upload, so a
 * replay would only re-upload the image to reach the same deterministic answer.
 */
const RETRYABLE_STATUSES = new Set([502, 503, 504]);

const MAX_ATTEMPTS = 3;

/**
 * Thrown when the API found a still-pending submission for the same name and
 * date. Not a failure - it's a decision point the UI should hand to the user
 * (replace the pending submission, or leave it alone) rather than show as an
 * error.
 */
export class NeedsConfirmationError extends Error {
  submittedAt?: string;
  /** Whether the existing row is already verified (from a prior year) rather than pending review. */
  verified?: boolean;

  constructor(message: string, submittedAt?: string, verified?: boolean) {
    super(message);
    this.name = "NeedsConfirmationError";
    this.submittedAt = submittedAt;
    this.verified = verified;
  }
}

interface ParsedErrorBody {
  message: string;
  needsConfirmation: boolean;
  submittedAt?: string;
  verified?: boolean;
}

async function readErrorBody(response: Response): Promise<ParsedErrorBody> {
  try {
    const body = await response.json();
    if (typeof body?.error === "string") {
      // 429 carries the wait in seconds; turn it into something a visitor can act on.
      if (response.status === 429 && typeof body.retryAfter === "number") {
        const minutes = Math.max(1, Math.ceil(body.retryAfter / 60));
        return {
          message: `${body.error} Please try again in about ${minutes} minute${
            minutes === 1 ? "" : "s"
          }.`,
          needsConfirmation: false,
        };
      }
      return {
        message: body.error,
        needsConfirmation: body.needsConfirmation === true,
        submittedAt:
          typeof body.submittedAt === "string" ? body.submittedAt : undefined,
        verified: body.verified === true,
      };
    }
  } catch {
    // Non-JSON body (a proxy error page, a truncated response)
  }
  return { message: "Failed to submit birthday", needsConfirmation: false };
}

/**
 * Submits a new birthday entry, retrying only failures that are safe to replay.
 *
 * @param formData - FormData containing name, month, day, and image file
 * @param options.confirmOverride - Pass true to replace an existing pending
 *   submission for the same name and date, after the caller has confirmed
 *   that with the user. Without it, a pending match throws
 *   {@link NeedsConfirmationError} instead of submitting.
 * @returns The created (or replaced) birthday record
 * @throws {NeedsConfirmationError} when a pending submission already exists
 *   and `confirmOverride` was not set
 * @throws Error with a message suitable for display for any other failure
 */
export async function submitBirthday(
  formData: FormData,
  options: { confirmOverride?: boolean } = {}
): Promise<Birthday | null> {
  if (options.confirmOverride) {
    formData.set("confirmOverride", "true");
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let response: Response;

    try {
      response = await fetch("/api/birthdays", {
        method: "POST",
        body: formData,
      });
    } catch (networkError) {
      // fetch only rejects before a response exists, so nothing was processed.
      lastError =
        networkError instanceof Error
          ? new Error(
              "Could not reach the server. Please check your connection."
            )
          : new Error("Failed to submit birthday");

      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise((r) => setTimeout(r, 600 * 2 ** attempt));
        continue;
      }
      break;
    }

    if (response.ok) {
      const result = await response.json();
      return result.data;
    }

    const body = await readErrorBody(response);

    if (body.needsConfirmation) {
      throw new NeedsConfirmationError(
        body.message,
        body.submittedAt,
        body.verified
      );
    }

    lastError = new Error(body.message);

    // Every other status is the server's settled answer - a duplicate, a bad
    // field, a spent quota. Replaying it wastes an upload and misleads the user.
    if (!RETRYABLE_STATUSES.has(response.status) || attempt === MAX_ATTEMPTS - 1) {
      break;
    }

    await new Promise((r) => setTimeout(r, 600 * 2 ** attempt));
  }

  throw lastError ?? new Error("Failed to submit birthday");
}
