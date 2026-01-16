import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";
import { sendContactEmail } from "@/lib/utils/email";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per 15 minutes per IP
    const rateLimitResult = checkRateLimit(request, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
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

    const { name, email, phone, subject, message, isAnonymous = false } = body;

    // Validation
    if (!name || !subject || !message) {
      return NextResponse.json(
        { error: "Name, subject, and message are required" },
        { status: 400 }
      );
    }

    // At least one contact method required if not anonymous
    if (!isAnonymous && !email && !phone) {
      return NextResponse.json(
        {
          error:
            "Email or phone number is required when not submitting anonymously",
        },
        { status: 400 }
      );
    }

    // Insert into database
    const { data: contactData, error } = await supabaseServer
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
        is_anonymous: Boolean(isAnonymous),
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating contact message:", error);
      return NextResponse.json(
        { error: "Failed to submit contact message" },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking)
    try {
      await sendContactEmail({
        name: name.trim(),
        email: email?.trim(),
        phone: phone?.trim(),
        subject: subject.trim(),
        message: message.trim(),
        isAnonymous: Boolean(isAnonymous),
      });
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error("Error sending email notification:", emailError);
      // Continue - the message is already saved in the database
    }

    return NextResponse.json(
      {
        data: contactData,
        success: true,
        message: "Contact message submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
