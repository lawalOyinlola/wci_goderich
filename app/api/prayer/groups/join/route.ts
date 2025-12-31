import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      prayerGroup,
      reason,
      previousExperience,
    } = body;

    // Validation
    if (!name || !email || !phone || !prayerGroup || !reason) {
      return NextResponse.json(
        { error: "Name, email, phone, prayer group, and reason are required" },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabaseServer
      .from("prayer_group_members")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        prayer_group_id: prayerGroup.trim(),
        reason: reason.trim(),
        previous_experience: previousExperience?.trim() || null,
        status: "pending", // Admin will approve
      })
      .select()
      .single();

    if (error) {
      console.error("Error joining prayer group:", error);
      return NextResponse.json(
        { error: "Failed to join prayer group" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data,
        success: true,
        message: "Application submitted successfully. We'll contact you soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/prayer/groups/join:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

