import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { checkAuth } from "@/lib/utils/auth";
import {
  normalizeStringField,
  normalizeNumberField,
} from "@/lib/utils/validation";

// GET - Fetch birthdays
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get("month"); // Optional filter by month (1-12)
    const featured = searchParams.get("featured"); // Optional filter for featured only
    const limit = searchParams.get("limit"); // Optional limit
    const verified = searchParams.get("verified"); // Optional filter by verified status (defaults to true)

    let query = supabaseServer
      .from("birthdays")
      .select("*")
      .order("day", { ascending: true });

    // Default to showing only verified birthdays unless explicitly requested
    if (verified === "false" || verified === "0") {
      query = query.eq("verified", false);
    } else {
      query = query.eq("verified", true);
    }

    if (month) {
      const monthNum = parseInt(month, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        query = query.eq("month", monthNum);
      }
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
      if (process.env.NODE_ENV === "development") {
        console.error("Error fetching birthdays:", error);
      }
      return NextResponse.json(
        { error: "Failed to fetch birthdays" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in GET /api/birthdays:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new birthday
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

    const formData = await request.formData();

    // Extract CAPTCHA token from form data for authentication
    const hcaptchaToken = formData.get("hcaptchaToken") as string | null;
    const recaptchaToken = formData.get("recaptchaToken") as string | null;
    const bodyForAuth = {
      hcaptchaToken,
      recaptchaToken,
    };

    // Authentication: Require CAPTCHA verification
    const authResult = await checkAuth(request, bodyForAuth, {
      requireCaptcha: true,
    });

    if (!authResult.allowed) {
      return authResult.response!;
    }

    // Extract and normalize fields from FormData
    const rawName = formData.get("name");
    const rawMonth = formData.get("month");
    const rawDay = formData.get("day");
    const imageFile = formData.get("image") as File | null;

    // Normalize fields with type checking
    const name = normalizeStringField(rawName);
    const monthNum = normalizeNumberField(rawMonth, 1, 12);
    const dayNum = normalizeNumberField(rawDay, 1, 31);

    // Validation using normalized values
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!monthNum) {
      return NextResponse.json(
        { error: "Month must be between 1 and 12" },
        { status: 400 }
      );
    }

    if (!dayNum) {
      return NextResponse.json(
        { error: "Day must be between 1 and 31" },
        { status: 400 }
      );
    }

    // Days per month (non-leap year)
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDay = daysInMonth[monthNum - 1];

    if (dayNum < 1 || dayNum > maxDay) {
      return NextResponse.json(
        { error: `Day must be between 1 and ${maxDay} for month ${monthNum}` },
        { status: 400 }
      );
    }

    let imageUrl = "";

    // Upload image if provided
    if (imageFile) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "File must be an image" },
          { status: 400 }
        );
      }

      // Use upload preset for birthdays (if configured) or fallback to manual config
      const birthdaysUploadPreset =
        process.env.CLOUDINARY_UPLOAD_PRESET_BIRTHDAYS;

      imageUrl = await uploadImage(imageFile, {
        ...(birthdaysUploadPreset
          ? {
              upload_preset: birthdaysUploadPreset,
              folder: "WCI_Goderich/birthdays",
            }
          : {
              folder: "WCI_Goderich/birthdays",
              transformation: {
                width: 512,
                height: 512,
                crop: "fill",
                quality: "auto",
                fetch_format: "auto" as const,
              },
            }),
      });
    } else {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Insert into database using normalized values
    const { data, error } = await supabaseServer
      .from("birthdays")
      .insert({
        name,
        month: monthNum,
        day: dayNum,
        image: imageUrl,
      })
      .select()
      .single();

    if (error) {
      // Clean up orphaned image
      if (imageUrl) {
        try {
          await deleteImage(imageUrl);
        } catch (deleteError) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error deleting image during cleanup:", deleteError);
          }
        }
      }
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating birthday:", error);
      }
      return NextResponse.json(
        { error: "Failed to create birthday record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error in POST /api/birthdays:", error);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
