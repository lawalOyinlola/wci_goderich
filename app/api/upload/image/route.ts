import { NextRequest, NextResponse } from "next/server";
import { uploadImageDetailed, createCleanupToken } from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isAllowedImageFile } from "@/lib/utils/image-sniff";

export const maxDuration = 30; // 30 seconds for image upload

// The only caller is the testimony form. Folder and preset are fixed here
// rather than read from the request: accepting them from the client let
// anyone upload straight into the public gallery folder.
const TESTIMONIES_FOLDER = "WCI_Goderich/testimonies";

export async function POST(request: NextRequest) {
  const rateLimitResult = await checkRateLimit(request, {
    maxRequests: 10,
    windowMs: 30 * 60 * 1000, // 30 minutes
  });

  if (!rateLimitResult.allowed) {
    return rateLimitResult.response!;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Validate the actual bytes, not the client-sent Content-Type
    if (!(await isAllowedImageFile(file))) {
      return NextResponse.json(
        { error: "File must be a JPEG, PNG, WebP, GIF or HEIC image" },
        { status: 400 }
      );
    }

    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET_TESTIMONIES;
    const { secure_url, public_id } = await uploadImageDetailed(file, {
      ...(uploadPreset
        ? { upload_preset: uploadPreset, folder: TESTIMONIES_FOLDER }
        : {
            folder: TESTIMONIES_FOLDER,
            transformation: {
              quality: "auto",
              fetch_format: "auto" as const,
            },
          }),
    });

    return NextResponse.json(
      {
        url: secure_url,
        cleanupToken: createCleanupToken(public_id, "image"),
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
