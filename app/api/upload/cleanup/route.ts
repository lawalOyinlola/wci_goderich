import { NextRequest, NextResponse } from "next/server";
import { deleteImage, deleteMedia } from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/utils/rate-limit";

/**
 * POST /api/upload/cleanup
 * Deletes uploaded files from Cloudinary
 * Body: { files: string[] } - Array of Cloudinary URLs to delete
 */
export async function POST(request: NextRequest) {
  // Add rate limiting to prevent abuse
  const rateLimitResult = checkRateLimit(request, {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
  });

  if (!rateLimitResult.allowed) {
    return rateLimitResult.response!;
  }
  try {
    const body = await request.json();
    const { files } = body;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: "Files array is required" },
        { status: 400 }
      );
    }

    // Delete all files in parallel
    const deletePromises = files.map(async (url: string) => {
      try {
        // Try to determine if it's an image or media file
        // Images typically have "/image/upload/" in the URL
        // Videos/audio have "/video/upload/" in the URL
        if (url.includes("/image/upload/")) {
          await deleteImage(url);
        } else if (url.includes("/video/upload/")) {
          await deleteMedia(url);
        } else {
          // Try image first, then media
          try {
            await deleteImage(url);
          } catch {
            await deleteMedia(url);
          }
        }
      } catch (error) {
        console.error(`Error deleting file ${url}:`, error);
        // Continue with other files even if one fails
      }
    });

    await Promise.all(deletePromises);

    return NextResponse.json(
      { success: true, message: "Files deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/upload/cleanup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
