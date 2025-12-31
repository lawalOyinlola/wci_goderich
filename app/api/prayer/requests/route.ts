import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      category,
      request: prayerRequest,
      isAnonymous = false,
    } = body;

    // Validation
    if (!name || !category || !prayerRequest) {
      return NextResponse.json(
        { error: "Name, category, and prayer request are required" },
        { status: 400 }
      );
    }

    // At least one contact method required if not anonymous
    if (!isAnonymous && !email && !phone) {
      return NextResponse.json(
        { error: "Email or phone number is required" },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabaseServer
      .from("prayer_requests")
      .insert({
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        category: category.trim(),
        request: prayerRequest.trim(),
        is_anonymous: Boolean(isAnonymous),
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating prayer request:", error);
      return NextResponse.json(
        { error: "Failed to create prayer request" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data, success: true, message: "Prayer request submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/prayer/requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    let query = supabaseServer
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching prayer requests:", error);
      return NextResponse.json(
        { error: "Failed to fetch prayer requests" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/prayer/requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

