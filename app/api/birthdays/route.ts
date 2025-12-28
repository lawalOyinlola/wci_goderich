import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export const runtime = "nodejs";

// GET - Fetch birthdays
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get("month"); // Optional filter by month (1-12)

    let query = supabaseServer
      .from("birthdays")
      .select("*")
      .order("day", { ascending: true });

    if (month) {
      const monthNum = parseInt(month, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        query = query.eq("month", monthNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching birthdays:", error);
      return NextResponse.json(
        { error: "Failed to fetch birthdays" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/birthdays:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new birthday
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const month = formData.get("month") as string;
    const day = formData.get("day") as string;
    const imageFile = formData.get("image") as File | null;

    // Validation
    if (!name || !month || !day) {
      return NextResponse.json(
        { error: "Name, month, and day are required" },
        { status: 400 }
      );
    }

    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    if (monthNum < 1 || monthNum > 12) {
      return NextResponse.json(
        { error: "Month must be between 1 and 12" },
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

    // Insert into database
    const { data, error } = await supabaseServer
      .from("birthdays")
      .insert({
        name: name.trim(),
        month: monthNum,
        day: dayNum,
        image: imageUrl,
      })
      .select()
      .single();

    if (error) {
      // Clean up orphaned image
      if (imageUrl) {
        await deleteImage(imageUrl).catch(() => {});
      }
      console.error("Error creating birthday:", error);
      return NextResponse.json(
        { error: "Failed to create birthday record" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/birthdays:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
