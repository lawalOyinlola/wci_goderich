import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import {
  transformTestimonies,
  transformTestimony,
} from "@/lib/data/testimonies";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";

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
      console.error("Error fetching testimonies:", error);
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
    console.error("Error in GET /api/testimonies:", error);
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

    const body = await request.json();

    // Authentication: Require CAPTCHA verification
    const authResult = await checkAuth(request, body, {
      requireCaptcha: true,
    });

    if (!authResult.allowed) {
      return authResult.response!;
    }
    const {
      name,
      role,
      image, // Should be a Cloudinary URL (uploaded separately, optional)
      testimony,
      category,
      date,
      type,
      videoUrl,
      audioUrl,
      featured = false,
      verified = false,
    } = body;

    // Validation
    if (!testimony || !category || !date || !type) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: testimony, category, date, and type are required",
        },
        { status: 400 }
      );
    }

    // Use default values for optional fields
    // Database requires NOT NULL, so provide defaults
    const submissionName = (name && name.trim()) || "Anonymous";
    const submissionRole = (role && role.trim()) || "";
    // For image, use empty string if not provided (database allows empty strings)
    // You may want to use a default placeholder image URL instead
    const submissionImage = image || "";

    if (!["written", "video", "audio"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be 'written', 'video', or 'audio'" },
        { status: 400 }
      );
    }

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

    // Insert into database
    const { data, error } = await supabaseServer
      .from("testimonies")
      .insert({
        name: submissionName.trim(),
        role: submissionRole.trim(),
        image: submissionImage,
        testimony: testimony.trim(),
        category: category.trim(),
        date,
        type,
        video_url: type === "video" ? videoUrl : null,
        audio_url: type === "audio" ? audioUrl : null,
        featured: Boolean(featured),
        verified: Boolean(verified),
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
          console.error("Error deleting image during cleanup:", deleteError);
        }
      }
      if (videoUrl) {
        try {
          await deleteMedia(videoUrl);
        } catch (deleteError) {
          console.error("Error deleting video during cleanup:", deleteError);
        }
      }
      if (audioUrl) {
        try {
          await deleteMedia(audioUrl);
        } catch (deleteError) {
          console.error("Error deleting audio during cleanup:", deleteError);
        }
      }

      console.error("Error creating testimony:", error);
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
    console.error("Error in POST /api/testimonies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
