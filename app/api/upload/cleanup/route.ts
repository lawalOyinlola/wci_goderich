import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  ensureCloudinaryConfigured,
  verifyCleanupToken,
} from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/utils/rate-limit";

// A testimony uploads at most a photo and one video/audio file.
const MAX_TOKENS = 3;

/**
 * POST /api/upload/cleanup
 * Deletes files the caller just uploaded, when the form they belong to fails.
 * Body: { tokens: string[] } - the cleanupToken values returned by
 * /api/upload/image and /api/upload/media.
 *
 * Only signed, unexpired tokens are honoured, so this can only delete a file
 * the same visitor uploaded in the last hour. It used to accept raw URLs,
 * which let anyone delete any asset on the account (gallery photos, videos).
 */
export async function POST(request: NextRequest) {
  // Add rate limiting to prevent abuse
  const rateLimitResult = await checkRateLimit(request, {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
  });

  if (!rateLimitResult.allowed) {
    return rateLimitResult.response!;
  }
  try {
    const body = await request.json();
    const { tokens } = body ?? {};

    if (
      !Array.isArray(tokens) ||
      tokens.length === 0 ||
      tokens.length > MAX_TOKENS ||
      !tokens.every((t) => typeof t === "string")
    ) {
      return NextResponse.json(
        { error: "tokens must be a non-empty array of strings" },
        { status: 400 }
      );
    }

    const assets = (tokens as string[]).map(verifyCleanupToken);
    if (assets.some((asset) => asset === null)) {
      return NextResponse.json(
        { error: "Invalid or expired cleanup token" },
        { status: 403 }
      );
    }

    ensureCloudinaryConfigured();
    await Promise.all(
      assets.map(async (asset) => {
        try {
          await cloudinary.uploader.destroy(asset!.publicId, {
            resource_type: asset!.resourceType,
          });
        } catch (error) {
          // Constant format string, and the id JSON-quoted so it can't
          // break the log line.
          console.error(
            "Error deleting uploaded file:",
            JSON.stringify(asset!.publicId),
            error
          );
          // Continue with other files even if one fails
        }
      })
    );

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
