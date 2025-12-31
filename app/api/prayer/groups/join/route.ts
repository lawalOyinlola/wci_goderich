import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { PRAYER_GROUPS } from "@/lib/constants/prayer";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";

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
    const { name, email, phone, prayerGroup, reason, previousExperience } =
      body;

    // Validation
    if (!name || !email || !phone || !prayerGroup || !reason) {
      return NextResponse.json(
        { error: "Name, email, phone, prayer group, and reason are required" },
        { status: 400 }
      );
    }

    // Verify prayer group exists
    const trimmedGroupId = prayerGroup.trim();
    const groupExists = PRAYER_GROUPS.some(
      (group) => group.id === trimmedGroupId
    );

    if (!groupExists) {
      return NextResponse.json(
        { error: "Invalid prayer group. Please select a valid prayer group." },
        { status: 404 }
      );
    }

    // Insert into database
    const { data, error } = await supabaseServer
      .from("prayer_group_members")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        prayer_group_id: trimmedGroupId,
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
