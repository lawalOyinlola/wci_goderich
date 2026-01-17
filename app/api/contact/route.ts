import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";
import { sendContactEmail } from "@/lib/utils/email";
import {
  parseRequestBody,
  normalizeStringField,
  normalizeBooleanField,
  normalizeEmailField,
  normalizePhoneField,
} from "@/lib/utils/validation";

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
    // Use email/phone validators for better validation
    const name = normalizeStringField(body.name);
    const emailRaw = normalizeStringField(body.email, true);
    const phoneRaw = normalizeStringField(body.phone, true);
    const email = normalizeEmailField(body.email); // Validates email format
    const phone = normalizePhoneField(body.phone); // Validates phone format

    const subject = normalizeStringField(body.subject);
    const message = normalizeStringField(body.message);
    const isAnonymous = normalizeBooleanField(body.isAnonymous);

    // Validation using normalized values
    if (!name || !subject || !message) {
      return NextResponse.json(
        { error: "Name, subject, and message are required" },
        { status: 400 }
      );
    }

    if (emailRaw && !email) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (phoneRaw && !phone) {
      return NextResponse.json(
        { error: "Invalid phone number" },
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

    // Insert into database using normalized values
    const { data: contactData, error } = await supabaseServer
      .from("contact_messages")
      .insert({
        name,
        email: email || null,
        phone: phone || null,
        subject,
        message,
        is_anonymous: isAnonymous,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating contact message:", error);
      }
      return NextResponse.json(
        { error: "Failed to submit contact message" },
        { status: 500 }
      );
    }

    // Send email notification (fire-and-forget, non-blocking)
    sendContactEmail({
      name,
      email: email || undefined,
      phone: phone || undefined,
      subject,
      message,
      isAnonymous,
    }).catch((emailError) => {
      // Log email error but don't fail the request
      // The message is already saved in the database
      if (process.env.NODE_ENV === "development") {
        console.error("Error sending email notification:", emailError);
      }
    });

    return NextResponse.json(
      {
        data: contactData,
        success: true,
        message: "Contact message submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in POST /api/contact:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
