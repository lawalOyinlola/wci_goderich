import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

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

    // Build update object (only include provided fields)
    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name.trim();
    if (role !== undefined) updateData.role = role.trim();
    if (image !== undefined) updateData.image = image;
    if (testimony !== undefined) updateData.testimony = testimony.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (date !== undefined) updateData.date = date;
    if (type !== undefined) {
      if (!["written", "video", "audio"].includes(type)) {
        return NextResponse.json(
          { error: "Type must be 'written', 'video', or 'audio'" },
          { status: 400 }
        );
      }
      updateData.type = type;
    }
    if (videoUrl !== undefined) updateData.video_url = videoUrl;
    if (audioUrl !== undefined) updateData.audio_url = audioUrl;
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

