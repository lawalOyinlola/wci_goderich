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
    const verified = searchParams.get("verified"); // Optional filter by verified status (defaults to true)

    let query = supabaseServer
      .from("testimonies")
      .select("*")
      .order("date", { ascending: false });

    // Default to showing only verified testimonies unless explicitly requested
    if (verified === "false" || verified === "0") {
      // Show unverified if explicitly requested
      query = query.eq("verified", false);
    } else {
      // Default: show only verified testimonies
      query = query.eq("verified", true);
    }

    if (type && ["written", "video", "audio"].includes(type)) {
      query = query.eq("type", type);
    }

    if (category) {
      // Support comma-separated categories or single category
      const categories = category
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);
      if (categories.length === 0) {
        // Skip filtering if no valid categories after trimming
        return NextResponse.json(
          {
            error:
              "No valid categories provided. Please provide at least one category.",
          },
          { status: 400 }
        );
      } else if (categories.length === 1) {
        query = query.eq("category", categories[0]);
      } else {
        query = query.in("category", categories);
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
        console.error("Error fetching testimonies:", error);
      }
      return NextResponse.json(
        { error: "Failed to fetch testimonies" },
        { status: 500 }
      );
    }

    // Transform data to match frontend expectations
    const transformedData = transformTestimonies(data || []);

    return NextResponse.json(
      { data: transformedData, success: true },
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
