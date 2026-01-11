import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const maxDuration = 60; // 60 seconds for video/audio uploads

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
  cloudinary.config();
} else {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary configuration. Please set CLOUDINARY_URL or provide individual credentials."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const resourceType = formData.get("resourceType") as string | null; // "video" or "audio"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate resource type
    if (!resourceType || !["video", "audio"].includes(resourceType)) {
      return NextResponse.json(
        { error: "resourceType must be 'video' or 'audio'" },
        { status: 400 }
      );
    }

    // Validate file types
    if (resourceType === "video") {
      if (!file.type.startsWith("video/")) {
        return NextResponse.json(
          { error: "File must be a video" },
          { status: 400 }
        );
      }
    } else if (resourceType === "audio") {
      if (!file.type.startsWith("audio/")) {
        return NextResponse.json(
          { error: "File must be an audio file" },
          { status: 400 }
        );
      }
    }

    // Validate file size (max 100MB for video, 50MB for audio)
    const maxSizeVideo = 100 * 1024 * 1024; // 100MB
    const maxSizeAudio = 50 * 1024 * 1024; // 50MB
    const maxSize = resourceType === "video" ? maxSizeVideo : maxSizeAudio;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File size must be less than ${maxSize / (1024 * 1024)}MB for ${resourceType} files`,
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert buffer to base64 data URL
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Build upload options
    const uploadOptions: Record<string, unknown> = {
      resource_type: "video", // Cloudinary uses "video" for both video and audio
      folder: "WCI_Goderich/testimonies",
    };

    // Use upload preset if configured
    const testimoniesUploadPreset =
      process.env.CLOUDINARY_UPLOAD_PRESET_TESTIMONIES;
    if (testimoniesUploadPreset) {
      uploadOptions.upload_preset = testimoniesUploadPreset;
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, uploadOptions);

    return NextResponse.json(
      { url: uploadResult.secure_url, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
