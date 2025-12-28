import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { transformTestimony } from "@/lib/data/testimonies";
import { isValidUrl } from "@/lib/utils";

export const runtime = "nodejs";

// GET - Fetch single testimony by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseServer
      .from("testimonies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Testimony not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching testimony:", error);
      return NextResponse.json(
        { error: "Failed to fetch testimony" },
        { status: 500 }
      );
    }

    // Transform data to match frontend expectations
    const transformedData = transformTestimony(data);

    return NextResponse.json(
      { data: transformedData, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/testimonies/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT/PATCH - Update testimony
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      name,
      role,
      image,
      testimony,
      category,
      date,
      type,
      videoUrl,
      audioUrl,
      featured,
      verified,
    } = body;

    // Fetch existing record to check current state
    const { data: existingData, error: fetchError } = await supabaseServer
      .from("testimonies")
      .select("type, video_url, audio_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json(
          { error: "Testimony not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching existing testimony:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch testimony" },
        { status: 500 }
      );
    }

    // Build update object (only include provided fields)
    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name.trim();
    if (role !== undefined) updateData.role = role.trim();
    if (image !== undefined) updateData.image = image;
    if (testimony !== undefined) updateData.testimony = testimony.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (date !== undefined) updateData.date = date;

    // Cross-field validation for type changes
    if (type !== undefined) {
      if (!["written", "video", "audio"].includes(type)) {
        return NextResponse.json(
          { error: "Type must be 'written', 'video', or 'audio'" },
          { status: 400 }
        );
      }

      // Validate video type requires videoUrl
      if (type === "video") {
        const providedVideoUrl = videoUrl !== undefined ? videoUrl : null;
        const existingVideoUrl = existingData.video_url;

        if (!providedVideoUrl && !existingVideoUrl) {
          return NextResponse.json(
            { error: "videoUrl is required when type is 'video'" },
            { status: 400 }
          );
        }

        // If videoUrl is provided, validate it's a valid URL
        if (providedVideoUrl && !isValidUrl(providedVideoUrl)) {
          return NextResponse.json(
            { error: "videoUrl must be a valid URL" },
            { status: 400 }
          );
        }

        updateData.type = type;
        if (providedVideoUrl !== undefined) {
          updateData.video_url = providedVideoUrl;
        }
      }
      // Validate audio type requires audioUrl
      else if (type === "audio") {
        const providedAudioUrl = audioUrl !== undefined ? audioUrl : null;
        const existingAudioUrl = existingData.audio_url;

        if (!providedAudioUrl && !existingAudioUrl) {
          return NextResponse.json(
            { error: "audioUrl is required when type is 'audio'" },
            { status: 400 }
          );
        }

        // If audioUrl is provided, validate it's a valid URL
        if (providedAudioUrl && !isValidUrl(providedAudioUrl)) {
          return NextResponse.json(
            { error: "audioUrl must be a valid URL" },
            { status: 400 }
          );
        }

        updateData.type = type;
        if (providedAudioUrl !== undefined) {
          updateData.audio_url = providedAudioUrl;
        }
      }
      // When switching to "written", clear videoUrl and audioUrl
      else if (type === "written") {
        updateData.type = type;
        updateData.video_url = null;
        updateData.audio_url = null;
      }
    } else {
      // If type is not being changed, still validate URLs if provided
      if (videoUrl !== undefined) {
        if (!isValidUrl(videoUrl)) {
          return NextResponse.json(
            { error: "videoUrl must be a valid URL" },
            { status: 400 }
          );
        }
        updateData.video_url = videoUrl;
      }
      if (audioUrl !== undefined) {
        if (!isValidUrl(audioUrl)) {
          return NextResponse.json(
            { error: "audioUrl must be a valid URL" },
            { status: 400 }
          );
        }
        updateData.audio_url = audioUrl;
      }
    }

    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (verified !== undefined) updateData.verified = Boolean(verified);

    const { data, error } = await supabaseServer
      .from("testimonies")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Testimony not found" },
          { status: 404 }
        );
      }
      console.error("Error updating testimony:", error);
      return NextResponse.json(
        { error: "Failed to update testimony" },
        { status: 500 }
      );
    }

    // Transform response
    const transformedData = transformTestimony(data);

    return NextResponse.json(
      { data: transformedData, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/testimonies/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete testimony
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if testimony exists before attempting deletion
    const { data: existingData, error: fetchError } = await supabaseServer
      .from("testimonies")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return NextResponse.json(
          { error: "Testimony not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching testimony:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch testimony" },
        { status: 500 }
      );
    }

    // Proceed with deletion
    const { error } = await supabaseServer
      .from("testimonies")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting testimony:", error);
      return NextResponse.json(
        { error: "Failed to delete testimony" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Testimony deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/testimonies/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
