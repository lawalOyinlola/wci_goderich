import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

// GET - Fetch testimonies
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // Optional filter by type (written, video, audio)
    const category = searchParams.get("category"); // Optional filter by category
    const featured = searchParams.get("featured"); // Optional filter for featured only
    const limit = searchParams.get("limit"); // Optional limit

    let query = supabaseServer
      .from("testimonies")
      .select("*")
      .order("date", { ascending: false });

    if (type && ["written", "video", "audio"].includes(type)) {
      query = query.eq("type", type);
    }

    if (category) {
      query = query.eq("category", category);
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
    const transformedData = data?.map((testimony) => ({
      id: testimony.id,
      name: testimony.name,
      role: testimony.role,
      image: testimony.image,
      testimony: testimony.testimony,
      category: testimony.category,
      date: testimony.date,
      type: testimony.type,
      ...(testimony.type === "video" && { videoUrl: testimony.video_url }),
      ...(testimony.type === "audio" && { audioUrl: testimony.audio_url }),
      featured: testimony.featured,
      verified: testimony.verified,
    }));

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
    const body = await request.json();
    const {
      name,
      role,
      image, // Should be a Cloudinary URL (uploaded separately)
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
    if (!name || !role || !image || !testimony || !category || !date || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
        name: name.trim(),
        role: role.trim(),
        image,
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
      console.error("Error creating testimony:", error);
      return NextResponse.json(
        { error: "Failed to create testimony record" },
        { status: 500 }
      );
    }

    // Transform response to match frontend expectations
    const transformedData = {
      id: data.id,
      name: data.name,
      role: data.role,
      image: data.image,
      testimony: data.testimony,
      category: data.category,
      date: data.date,
      type: data.type,
      ...(data.type === "video" && { videoUrl: data.video_url }),
      ...(data.type === "audio" && { audioUrl: data.audio_url }),
      featured: data.featured,
      verified: data.verified,
    };

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

