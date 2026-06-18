import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import {
  transformTestimonies,
  transformTestimony,
} from "@/lib/data/testimonies";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";
import { parseRequestBody, normalizeStringField } from "@/lib/utils/validation";

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

// GET - Fetch testimonies
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // Optional filter by type (written, video, audio)
    const category = searchParams.get("category"); // Optional filter by category
    const featured = searchParams.get("featured"); // Optional filter for featured only
    const limit = searchParams.get("limit"); // Optional limit
    const page = searchParams.get("page"); // Optional page number for pagination
    const verified = searchParams.get("verified"); // Optional filter by verified status (defaults to true)

    // Pagination parsing and validation
    const MAX_LIMIT = 100; // Maximum items per page to prevent huge responses
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 12;

    // Parse and validate page number
    let pageNum: number;
    if (page) {
      const parsed = parseInt(page, 10);
      pageNum = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_PAGE;
    } else {
      pageNum = DEFAULT_PAGE;
    }
    // Clamp pageNum to be at least 1
    pageNum = Math.max(1, pageNum);

    // Parse and validate limit
    let limitNum: number;
    if (limit) {
      const parsed = parseInt(limit, 10);
      limitNum =
        Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LIMIT;
    } else {
      limitNum = DEFAULT_LIMIT;
    }
    // Clamp limitNum to be positive and cap at MAX_LIMIT
    limitNum = Math.max(1, Math.min(MAX_LIMIT, limitNum));

    // Calculate offset using sanitized values
    const offset = (pageNum - 1) * limitNum;

    // Validate the optional type filter
    const VALID_TYPES = ["written", "video", "audio"] as const;
    if (type && !VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
      return NextResponse.json(
        { error: "Invalid type. Must be one of: written, video, audio." },
        { status: 400 }
      );
    }
    const typeFilter = type ? (type as "written" | "video" | "audio") : null;

    // Parse categories (supports comma-separated or single category)
    let categories: string[] | null = null;
    if (category) {
      categories = category
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      if (categories.length === 0) {
        return NextResponse.json(
          {
            error:
              "No valid categories provided. Please provide at least one category.",
          },
          { status: 400 }
        );
      }
    }

    const showVerified = !(verified === "false" || verified === "0");
    const onlyFeatured = featured === "true";

    // Filters shared by every query (verified, category, featured). Deliberately
    // excludes the `type` filter so tab counts stay stable regardless of which
    // type tab is currently active. `eq`/`in` return the same builder type, so a
    // typed-helper is unnecessary here — we apply them inline per query.

    // Query for the current page of data (respects the active type filter).
    let dataQuery = supabaseServer
      .from("testimonies")
      .select("*")
      .order("date", { ascending: false })
      .eq("verified", showVerified);
    if (categories) {
      dataQuery =
        categories.length === 1
          ? dataQuery.eq("category", categories[0])
          : dataQuery.in("category", categories);
    }
    if (onlyFeatured) {
      dataQuery = dataQuery.eq("featured", true);
    }
    if (typeFilter) {
      dataQuery = dataQuery.eq("type", typeFilter);
    }
    dataQuery = dataQuery.range(offset, offset + limitNum - 1);

    // Per-type counts, independent of the active type filter, so the tabs can
    // always show the true total for each category.
    const makeTypeCount = (t: "written" | "video" | "audio") => {
      let q = supabaseServer
        .from("testimonies")
        .select("*", { count: "exact", head: true })
        .eq("verified", showVerified);
      if (categories) {
        q =
          categories.length === 1
            ? q.eq("category", categories[0])
            : q.in("category", categories);
      }
      if (onlyFeatured) {
        q = q.eq("featured", true);
      }
      return q.eq("type", t);
    };

    const [
      { data, error },
      writtenCountRes,
      videoCountRes,
      audioCountRes,
    ] = await Promise.all([
      dataQuery,
      makeTypeCount("written"),
      makeTypeCount("video"),
      makeTypeCount("audio"),
    ]);

    const countError =
      writtenCountRes.error || videoCountRes.error || audioCountRes.error;

    if (error || countError) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching testimonies:", error || countError);
      }
      return NextResponse.json(
        { error: "Failed to fetch testimonies" },
        { status: 500 }
      );
    }

    const counts = {
      written: writtenCountRes.count || 0,
      video: videoCountRes.count || 0,
      audio: audioCountRes.count || 0,
    };
    const allCount = counts.written + counts.video + counts.audio;

    // Transform data to match frontend expectations
    const transformedData = transformTestimonies(data || []);

    // Total for the *current* view: the active type's count when filtered,
    // otherwise the combined total.
    const totalItems = typeFilter ? counts[typeFilter] : allCount;
    const totalPages = Math.ceil(totalItems / limitNum);
    // Ensure totalPages is a valid number (handle edge cases like NaN/Infinity)
    const safeTotalPages =
      Number.isFinite(totalPages) && totalPages >= 0 ? totalPages : 0;

    const pagination = {
      currentPage: pageNum,
      totalPages: safeTotalPages,
      totalItems,
      itemsPerPage: limitNum,
      hasNextPage: pageNum < safeTotalPages,
      hasPreviousPage: pageNum > 1,
    };

    return NextResponse.json(
      {
        data: transformedData,
        pagination,
        counts: { all: allCount, ...counts },
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in GET /api/testimonies:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new testimony
export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 requests per 30 minutes per IP
    const rateLimitResult = checkRateLimit(request, {
      maxRequests: 3,
      windowMs: 30 * 60 * 1000, // 30 minutes
    });

    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!;
    }

    // Parse JSON with error handling
    let body: Record<string, unknown>;
    try {
      body = await parseRequestBody(request);
    } catch (parseError) {
      return NextResponse.json(
        {
          error:
            parseError instanceof Error
              ? parseError.message
              : "Invalid JSON payload",
        },
        { status: 400 }
      );
    }

    // Authentication: Require CAPTCHA verification
    const authResult = await checkAuth(request, body, {
      requireCaptcha: true,
    });

    if (!authResult.allowed) {
      return authResult.response!;
    }

    // Extract and normalize fields with type checking
    // Note: featured and verified are server-controlled and not accepted from client
    const rawName = body.name;
    const rawRole = body.role;
    const rawImage = body.image;
    const rawTestimony = body.testimony;
    const rawCategory = body.category;
    const rawDate = body.date;
    const rawType = body.type;
    const rawVideoUrl = body.videoUrl;
    const rawAudioUrl = body.audioUrl;

    // Normalize all fields (only trim strings)
    const name = normalizeStringField(rawName);
    const role = normalizeStringField(rawRole, true); // Allow empty
    const image = normalizeStringField(rawImage, true); // Allow empty (Cloudinary URL)
    const testimony = normalizeStringField(rawTestimony);
    const category = normalizeStringField(rawCategory);
    const date = normalizeStringField(rawDate);
    const type = normalizeStringField(rawType);
    const videoUrl = normalizeStringField(rawVideoUrl, true); // Allow empty
    const audioUrl = normalizeStringField(rawAudioUrl, true); // Allow empty

    // Server-controlled fields: featured and verified
    // These are set to false by default and can only be set to true by admins
    const isAdmin = isAdminRequest(request);
    const featured = isAdmin && body.featured === true ? true : false;
    const verified = isAdmin && body.verified === true ? true : false;

    // Validation using normalized values
    if (!testimony || !category || !date || !type) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: testimony, category, date, and type are required",
        },
        { status: 400 }
      );
    }

    // Validate type enum
    if (!["written", "video", "audio"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be 'written', 'video', or 'audio'" },
        { status: 400 }
      );
    }

    // Validate type-specific requirements
    if (type === "video" && !videoUrl) {
      return NextResponse.json(
        { error: "videoUrl is required for video type" },
        { status: 400 }
      );
    }

    if (type === "audio" && !audioUrl) {
      return NextResponse.json(
        { error: "audioUrl is required for audio type" },
        { status: 400 }
      );
    }

    // Use default values for optional fields
    // Database requires NOT NULL, so provide defaults
    const submissionName = name || "Anonymous";
    const submissionRole = role || "";
    // For image, use empty string if not provided (database allows empty strings)
    const submissionImage = image || "";

    // Insert into database using normalized values
    const { data, error } = await supabaseServer
      .from("testimonies")
      .insert({
        name: submissionName,
        role: submissionRole,
        image: submissionImage,
        testimony,
        category,
        date,
        type,
        video_url: type === "video" ? videoUrl || null : null,
        audio_url: type === "audio" ? audioUrl || null : null,
        featured,
        verified,
      })
      .select()
      .single();

    if (error) {
      // Clean up uploaded files if database insert fails
      const { deleteImage, deleteMedia } = await import("@/lib/cloudinary");
      if (submissionImage) {
        try {
          await deleteImage(submissionImage);
        } catch (deleteError) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error deleting image during cleanup:", deleteError);
          }
        }
      }
      if (videoUrl) {
        try {
          await deleteMedia(videoUrl);
        } catch (deleteError) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error deleting video during cleanup:", deleteError);
          }
        }
      }
      if (audioUrl) {
        try {
          await deleteMedia(audioUrl);
        } catch (deleteError) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error deleting audio during cleanup:", deleteError);
          }
        }
      }

      if (process.env.NODE_ENV === "development") {
        console.error("Error creating testimony:", error);
      }
      return NextResponse.json(
        { error: "Failed to create testimony record" },
        { status: 500 }
      );
    }

    // Transform response to match frontend expectations
    const transformedData = transformTestimony(data);

    return NextResponse.json(
      { data: transformedData, success: true },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in POST /api/testimonies:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
