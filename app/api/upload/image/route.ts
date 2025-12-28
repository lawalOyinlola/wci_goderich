import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export const runtime = "nodejs";
export const maxDuration = 30; // 30 seconds for image upload

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") as string | null;
    const uploadPreset = formData.get("upload_preset") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Convert File to Blob for upload
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    // Upload to Cloudinary
    // Use upload preset if provided, otherwise use folder and default transformations
    const imageUrl = await uploadImage(blob, {
      ...(uploadPreset
        ? { upload_preset: uploadPreset, folder: folder || undefined }
        : {
            folder: folder || "WCI_Goderich",
            transformation: {
              quality: "auto",
              fetch_format: "auto" as const,
            },
          }),
    });

    return NextResponse.json(
      { url: imageUrl, success: true },
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

