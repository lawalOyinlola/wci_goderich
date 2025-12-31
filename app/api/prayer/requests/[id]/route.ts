import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * PUT - Update a prayer request (e.g., mark as answered)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, category, request: prayerRequest } = body;

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (status && ["pending", "praying", "answered"].includes(status)) {
      updateData.status = status;
    }

    if (category) {
      updateData.category = category.trim();
    }

    if (prayerRequest) {
      updateData.request = prayerRequest.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Update prayer request
    const { data, error } = await supabaseServer
      .from("prayer_requests")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating prayer request:", error);
      return NextResponse.json(
        { error: "Failed to update prayer request" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data, success: true, message: "Prayer request updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/prayer/requests/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET - Get a single prayer request by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseServer
      .from("prayer_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching prayer request:", error);
      return NextResponse.json(
        { error: "Failed to fetch prayer request" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/prayer/requests/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

