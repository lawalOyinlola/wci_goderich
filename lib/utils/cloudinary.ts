/**
 * Cloudinary URL utilities
 * Helps ensure Cloudinary images are properly formatted and accessible
 */

/**
 * Checks if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return /res\.cloudinary\.com/.test(url);
}

/**
 * Optimizes a Cloudinary URL by ensuring it has proper transformations
 * This helps prevent broken images and ensures optimal delivery
 *
 * @param url - The Cloudinary URL
 * @param options - Optional transformation parameters
 * @returns Optimized Cloudinary URL
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: {
    quality?: "auto" | number;
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
    width?: number;
    height?: number;
    retry?: number;
  } = {},
): string {
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    // Find the "upload" segment
    const uploadIndex = pathParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) {
      // Not a valid Cloudinary URL structure, return as-is
      return url;
    }

    // Get the part after "upload" (should be version or transformations)
    const afterUpload = pathParts.slice(uploadIndex + 1);
    const transformationSegment = afterUpload[0];

    // Check if transformations already exist

    const transformationPattern = /^(w_|h_|q_|f_|c_|e_|g_|ar_|dpr_|fl_)/;
    const hasTransformations =
      transformationSegment?.includes(",") ||
      transformationPattern.test(transformationSegment || "");

    if (!hasTransformations) {
      // Case 1: No existing transformations - build new transformation string
      const transformations: string[] = [];

      // Add width/height if provided
      if (options.width) {
        transformations.push(`w_${options.width}`);
      }

      if (options.height) {
        transformations.push(`h_${options.height}`);
      }

      // Add quality and format for reliability (only when no transformations exist)
      transformations.push(`q_${options.quality || "auto"}`);
      transformations.push(`f_${options.format || "auto"}`);

      // Insert transformations after "upload"
      const transformationString = transformations.join(",");
      pathParts.splice(uploadIndex + 1, 0, transformationString);

      // Reconstruct URL
      urlObj.pathname = pathParts.join("/");
      return urlObj.toString();
    } else {
      // Case 2: Transformations already exist - merge width/height into existing transformations
      if (options.width || options.height) {
        // Parse existing transformations
        const existingTransformations = transformationSegment.split(",");
        const transformationMap = new Map<string, string>();

        // Parse existing transformations into a map
        existingTransformations.forEach((trans) => {
          const match = trans.match(/^([a-z_]+)_(.+)$/);
          if (match) {
            const [, key, value] = match;
            transformationMap.set(key, value);
          }
        });

        // Update or add width/height if provided
        if (options.width) {
          transformationMap.set("w", String(options.width));
        }

        if (options.height) {
          transformationMap.set("h", String(options.height));
        }

        // Rebuild transformation string from map
        const mergedTransformations = Array.from(transformationMap.entries())
          .map(([key, value]) => `${key}_${value}`)
          .join(",");

        // Replace the transformation segment
        pathParts[uploadIndex + 1] = mergedTransformations;

        // Reconstruct URL
        urlObj.pathname = pathParts.join("/");
        return urlObj.toString();
      }
    }

    // If transformations exist but we want to add retry parameter
    if (options.retry && options.retry > 0) {
      // Add a cache-busting parameter
      urlObj.searchParams.set("_retry", String(options.retry));
      return urlObj.toString();
    }

    return url;
  } catch (error) {
    // If URL parsing fails, return original
    console.warn("Failed to optimize Cloudinary URL:", error);
    return url;
  }
}

/**
 * Validates if a Cloudinary URL is accessible
 * This is a client-side check that doesn't actually fetch the image
 * but validates the URL structure
 */
export function validateCloudinaryUrl(url: string): boolean {
  if (!isCloudinaryUrl(url)) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    // Should have: /cloud_name/image/upload/.../path
    const uploadIndex = pathParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1 || uploadIndex === 0) {
      return false;
    }

    // Should have at least cloud_name and upload segments
    return pathParts.length > uploadIndex + 1;
  } catch {
    return false;
  }
}

/**
 * Creates a fallback URL for a Cloudinary image
 * Can be used when the primary image fails to load
 *
 * @param publicId - The Cloudinary public_id of the image
 * @param cloudName - Optional Cloudinary cloud name. If not provided, uses NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * @returns Fallback Cloudinary URL
 * @throws Error if cloudName is not provided and NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set
 */
export function createCloudinaryFallbackUrl(
  publicId: string,
  cloudName?: string,
): string {
  const resolvedCloudName =
    cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!resolvedCloudName) {
    throw new Error(
      "Cloudinary cloud name is required. Either pass it as a parameter or set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable.",
    );
  }

  return `https://res.cloudinary.com/${resolvedCloudName}/image/upload/f_auto,q_auto/${publicId}`;
}
