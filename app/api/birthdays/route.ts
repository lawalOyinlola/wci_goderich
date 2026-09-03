import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import type { PostgrestError } from "@supabase/supabase-js";
import {
  uploadImageDetailed,
  deleteImage,
  deleteImageByPublicId,
} from "@/lib/cloudinary";
import { checkRateLimit, consumeRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";
import {
  normalizeStringField,
  normalizeNumberField,
} from "@/lib/utils/validation";

/**
 * Check if the request is from an admin
 * Currently returns false - implement admin authentication as needed
 * Options: API key check, JWT token, session-based auth, etc.
 */
function isAdminRequest(request: NextRequest): boolean {
  // TODO: Implement admin authentication
  // Example: Check for admin API key in header
  // const adminApiKey = process.env.ADMIN_API_KEY;
  // const providedKey = request.headers.get("x-admin-api-key");
  // return adminApiKey && providedKey === adminApiKey;
  return false;
}

interface BirthdayInsert {
  name: string;
  month: number;
  day: number;
  year: number;
  image: string;
  featured: boolean;
  verified: boolean;
}

interface BirthdayRow extends BirthdayInsert {
  id: string;
  created_at: string;
}

/**
 * Retries a single Supabase operation on transient failures with a short backoff.
 *
 * Only network/availability errors are retried. Anything the database decided
 * on (constraint violations, bad input) is returned immediately - retrying a
 * deterministic rejection just delays the error the caller needs to see.
 */
async function withRetry<T>(
  operation: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  attempts = 3
): Promise<{ data: T | null; error: PostgrestError | null }> {
  let lastError: PostgrestError | null = null;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const { data, error } = await operation();

    if (!error) {
      return { data, error: null };
    }

    lastError = error;

    // Postgres SQLSTATE codes are 5 characters; their absence means the failure
    // happened before the query reached the database (DNS, TLS, socket reset).
    // Class 08 is connection_exception, 57P0x is admin shutdown/crash.
    const isTransient =
      !error.code ||
      error.code.startsWith("08") ||
      error.code.startsWith("57P") ||
      error.code === "XX000";

    if (!isTransient || attempt === attempts - 1) {
      break;
    }

    // 250ms, 500ms
    await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
  }

  return { data: null, error: lastError };
}

/** Escapes ILIKE wildcards so a name containing "%" or "_" is matched literally. */
function escapeIlike(value: string): string {
  return value.replace(/[%_\\]/g, (match) => `\\${match}`);
}

/**
 * Looks up the existing birthday row for an identity (name + date), if any.
 * Case-insensitive on name so "John Doe" and "john doe" collide. The unique
 * constraint on (name, month, day) guarantees at most one match - a
 * resubmission always updates this same row rather than creating a second one,
 * so a celebrant never shows twice in the birthday grid.
 */
async function findExistingBirthday(
  name: string,
  month: number,
  day: number
): Promise<BirthdayRow | null> {
  const { data } = await supabaseServer
    .from("birthdays")
    .select("*")
    .ilike("name", escapeIlike(name))
    .eq("month", month)
    .eq("day", day)
    .maybeSingle();

  return data;
}

/**
 * Deletes an image we uploaded for a record that never got written.
 *
 * Deletes by public_id rather than re-parsing the URL: under Cloudinary's
 * dynamic-folders mode the folder lives in asset_folder metadata and is absent
 * from the public_id, so a URL-derived id silently fails to match and leaves the
 * asset behind. Never throws - a failed cleanup must not mask the original error.
 */
async function rollbackUpload(publicId: string): Promise<void> {
  if (!publicId) return;

  try {
    await deleteImageByPublicId(publicId);
  } catch (deleteError) {
    // Always logged, in every environment: a swallowed failure here is an
    // orphaned asset that nothing else will ever surface.
    console.error(
      `Failed to clean up Cloudinary image ${publicId} after a failed insert:`,
      deleteError
    );
  }
}

// GET - Fetch birthdays
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get("month"); // Optional filter by month (1-12)
    const featured = searchParams.get("featured"); // Optional filter for featured only
    const limit = searchParams.get("limit"); // Optional limit
    const verified = searchParams.get("verified"); // Optional filter by verified status (defaults to true)

    let query = supabaseServer
      .from("birthdays")
      .select("*")
      .order("day", { ascending: true });

    // Default to showing only verified birthdays unless explicitly requested
    if (verified === "false" || verified === "0") {
      query = query.eq("verified", false);
    } else {
      query = query.eq("verified", true);
    }

    if (month) {
      const monthNum = parseInt(month, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        query = query.eq("month", monthNum);
      }
    }

    if (featured === "true") {
      query = query.eq("featured", true);
    }

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching birthdays:", error);
      }
      return NextResponse.json(
        { error: "Failed to fetch birthdays" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in GET /api/birthdays:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new birthday
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 genuine submissions per 30 minutes per IP.
    // Peek here so an already-limited client is rejected before we parse a
    // multipart body; the slot itself is consumed further down, once the
    // request has passed validation and CAPTCHA. Charging on arrival meant a
    // mistyped day or an expired CAPTCHA burned the caller's whole budget.
    const rateLimitOptions = {
      maxRequests: 5,
      windowMs: 30 * 60 * 1000, // 30 minutes
    };

    const rateLimitResult = checkRateLimit(request, {
      ...rateLimitOptions,
      count: false,
    });

    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    const formData = await request.formData();

    // Extract CAPTCHA token from form data for authentication
    const hcaptchaToken = formData.get("hcaptchaToken") as string | null;
    const recaptchaToken = formData.get("recaptchaToken") as string | null;
    const bodyForAuth = {
      hcaptchaToken,
      recaptchaToken,
    };

    // Authentication: Require CAPTCHA verification
    const authResult = await checkAuth(request, bodyForAuth, {
      requireCaptcha: true,
    });

    if (!authResult.allowed) {
      return authResult.response!;
    }

    // Extract and normalize fields from FormData
    const rawName = formData.get("name");
    const rawMonth = formData.get("month");
    const rawDay = formData.get("day");
    const imageFile = formData.get("image") as File | null;

    // Normalize fields with type checking
    const name = normalizeStringField(rawName);
    const monthNum = normalizeNumberField(rawMonth, 1, 12);
    const dayNum = normalizeNumberField(rawDay, 1, 31);

    // Validation using normalized values
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!monthNum) {
      return NextResponse.json(
        { error: "Month must be between 1 and 12" },
        { status: 400 }
      );
    }

    if (!dayNum) {
      return NextResponse.json(
        { error: "Day must be between 1 and 31" },
        { status: 400 }
      );
    }

    // Days per month (non-leap year)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDay = daysInMonth[monthNum - 1];

    if (dayNum < 1 || dayNum > maxDay) {
      return NextResponse.json(
        { error: `Day must be between 1 and ${maxDay} for month ${monthNum}` },
        { status: 400 }
      );
    }

    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // One submission per person per year. `currentYear` is computed here, not
    // accepted from the client - the caller never gets to pick it. The church
    // is in Africa/Freetown (UTC+0, no DST), so the server's UTC year always
    // matches local year.
    const currentYear = new Date().getUTCFullYear();
    const confirmOverride =
      normalizeStringField(formData.get("confirmOverride")) === "true";
    const existing = await findExistingBirthday(name, monthNum, dayNum);
    const existingIsSameYear = existing?.year === currentYear;

    if (existing && existingIsSameYear && existing.verified) {
      return NextResponse.json(
        {
          error: `This name and date has already been submitted and verified for ${currentYear}. Come back in ${
            currentYear + 1
          } to update the photo.`,
        },
        { status: 409 }
      );
    }

    if (existing && existingIsSameYear && !confirmOverride) {
      // Don't block outright: the earlier attempt is still awaiting review, so
      // let the caller decide whether this new submission should replace it.
      return NextResponse.json(
        {
          error:
            "A submission for this name and date is already pending review.",
          needsConfirmation: true,
          submittedAt: existing.created_at,
        },
        { status: 409 }
      );
    }

    // Everything about the request is well-formed and authenticated, so this
    // counts as a real attempt against the caller's quota. Reached either with
    // no existing row, a prior year's row (this year's first attempt - no
    // confirmation needed), or a same-year pending row the caller confirmed
    // replacing.
    const consumed = consumeRateLimit(request, rateLimitOptions);
    if (!consumed.allowed) {
      return consumed.response!;
    }

    // Use upload preset for birthdays (if configured) or fallback to manual config
    const birthdaysUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET_BIRTHDAYS;

    const { secure_url: imageUrl, public_id: imagePublicId } =
      await uploadImageDetailed(imageFile, {
        ...(birthdaysUploadPreset
          ? {
              upload_preset: birthdaysUploadPreset,
              folder: "WCI_Goderich/birthdays",
            }
          : {
              folder: "WCI_Goderich/birthdays",
              transformation: {
                width: 512,
                height: 512,
                crop: "fill",
                quality: "auto",
                fetch_format: "auto" as const,
              },
            }),
      });

    // Server-controlled fields: featured and verified
    // These are set to false by default and can only be set to true by admins
    // Note: Even if client sends these fields, we ignore them and use server defaults
    const isAdmin = isAdminRequest(request);
    const featured = false; // Always false for public submissions
    const verified = false; // Always false for public submissions

    if (existing) {
      // Either this year's first attempt on a row left over from a previous
      // year (a routine annual refresh, no confirmation needed) or a
      // confirmed replace of a same-year pending submission. Either way,
      // update the same row rather than insert a second one for this
      // identity. Guard on (year, verified) exactly as read: if either
      // changed between our check above and this write - an admin verifying
      // it, or a concurrent request already refreshing it - the update
      // matches 0 rows instead of overwriting that change.
      const { data, error } = await withRetry<BirthdayRow>(async () =>
        supabaseServer
          .from("birthdays")
          .update({ name, image: imageUrl, year: currentYear, featured, verified })
          .eq("id", existing.id)
          .eq("year", existing.year)
          .eq("verified", existing.verified)
          .select()
          .single()
      );

      if (error) {
        await rollbackUpload(imagePublicId);

        // PGRST116: update matched no rows - see the guard comment above.
        if (error.code === "PGRST116") {
          return NextResponse.json(
            {
              error:
                "This submission just changed. Please refresh and try again.",
            },
            { status: 409 }
          );
        }

        console.error("Error replacing existing birthday:", {
          code: error.code,
          message: error.message,
          details: error.details,
        });
        return NextResponse.json(
          { error: "Failed to update birthday record" },
          { status: 500 }
        );
      }

      // Best-effort: drop the image the replaced submission was using. We only
      // ever persisted its URL (not a public_id), so this falls back to
      // extracting the id from that URL and can miss under Cloudinary's
      // dynamic-folders mode - acceptable for a cleanup step, logged either way.
      if (existing.image) {
        try {
          await deleteImage(existing.image);
        } catch (deleteError) {
          console.error(
            `Failed to clean up replaced Cloudinary image for birthday ${existing.id}:`,
            deleteError
          );
        }
      }

      return NextResponse.json({ data, success: true }, { status: 200 });
    }

    // Insert into database using normalized values.
    // Retried because a dropped Supabase connection here strands an image we
    // just paid to upload; the insert is guarded by a unique constraint, so a
    // retry that actually landed surfaces as a duplicate rather than a dupe row.
    const { data, error } = await withRetry<BirthdayRow>(async () =>
      supabaseServer
        .from("birthdays")
        .insert({
          name,
          month: monthNum,
          day: dayNum,
          year: currentYear,
          image: imageUrl,
          featured,
          verified,
        })
        .select()
        .single()
    );

    if (error) {
      console.error("Error creating birthday:", {
        code: error.code,
        message: error.message,
        details: error.details,
      });

      // 23505 = unique_violation on unique_birthday (name, month, day). Can
      // only happen from a race with a concurrent request for the same
      // identity, since we already checked for an existing row above.
      if (error.code === "23505") {
        // Distinguish two very different situations behind the same code. If the
        // stored row already points at the image we just uploaded, our own retry
        // committed and only the response was lost - the submission succeeded,
        // and deleting that image would break the row now referencing it.
        const { data: raced } = await supabaseServer
          .from("birthdays")
          .select("*")
          .eq("name", name)
          .eq("month", monthNum)
          .eq("day", dayNum)
          .maybeSingle();

        if (raced?.image === imageUrl) {
          return NextResponse.json(
            { data: raced, success: true },
            { status: 201 }
          );
        }

        // The concurrent request won: the image we just uploaded belongs to
        // nothing, so roll it back.
        await rollbackUpload(imagePublicId);

        return NextResponse.json(
          {
            error:
              "A submission for this name and date was just made. Please refresh and try again if needed.",
          },
          { status: 409 }
        );
      }

      await rollbackUpload(imagePublicId);

      return NextResponse.json(
        { error: "Failed to create birthday record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in POST /api/birthdays:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
