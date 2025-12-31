import { NextRequest, NextResponse } from "next/server";
// import { supabaseServer, createAnonClient } from "@/lib/supabase/server";
import { supabaseServer } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";

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
    // Use anon client to respect RLS policies
    // const supabase = createAnonClient();
    // Use service_role client since public reads are restricted for PII protection
    // Data is sanitized before returning to ensure no PII exposure
    const supabase = supabaseServer;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");

    // Parse and enforce maximum limit
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 20;
    const enforcedLimit = Math.min(Math.max(parsedLimit, 1), 100); // Between 1 and 100

    // Parse offset for pagination
    const offset = offsetParam ? Math.max(parseInt(offsetParam, 10), 0) : 0;

    // Build query - select only non-sensitive fields
    // We'll select all fields and strip sensitive ones based on is_anonymous
    let query = supabase
      .from("prayer_requests")
      .select(
        "id, name, category, request, is_anonymous, status, created_at, updated_at",
        {
          count: "exact",
        }
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + enforcedLimit - 1);

    if (status && ["pending", "praying", "answered"].includes(status)) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching prayer requests:", error);
      // Check if it's an RLS/auth error
      if (error.code === "PGRST301" || error.message?.includes("permission")) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch prayer requests" },
        { status: 500 }
      );
    }

    // Strip sensitive fields: remove name if is_anonymous is true, always remove email/phone
    const sanitizedData = (data || []).map((item) => {
      const { name, is_anonymous, ...rest } = item;
      return {
        ...rest,
        // Only include name if not anonymous
        ...(is_anonymous ? {} : { name }),
      };
    });

    // Calculate pagination metadata
    const total = count ?? 0;
    const hasMore = offset + enforcedLimit < total;

    return NextResponse.json(
      {
        data: sanitizedData,
        pagination: {
          limit: enforcedLimit,
          offset,
          total,
          hasMore,
        },
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/prayer/requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
