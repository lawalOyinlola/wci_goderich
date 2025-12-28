import { v2 as cloudinary } from "cloudinary";

if (process.env.CLOUDINARY_URL) {
  cloudinary.config();
} else {
  // Fallback to individual environment variables
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary configuration. Please set CLOUDINARY_URL (recommended - single variable) or provide CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env.local file."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export interface UploadImageOptions {
  folder?: string;
  public_id?: string;
  upload_preset?: string; // Upload preset name (recommended - simplifies config)
  transformation?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number | string;
    fetch_format?: string;
  };
}

/**
 * Uploads an image file (Blob or Buffer) to Cloudinary
 * @param file - The image file as Blob, File, or Buffer
 * @param options - Upload options (folder, transformations, etc.)
 * @returns Promise with the uploaded image URL
 */
export async function uploadImage(
  file: Blob | File | Buffer,
  options: UploadImageOptions = {}
): Promise<string> {
  const { folder, public_id, upload_preset, transformation } = options;

  try {
    // Convert Blob/File to buffer if needed
    let buffer: Buffer;
    if (file instanceof Buffer) {
      buffer = file;
    } else if (file instanceof Blob || file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      throw new Error("Unsupported file type. Expected Blob, File, or Buffer.");
    }

    // Convert buffer to base64 data URL for Cloudinary upload
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;

    // Build upload options
    const uploadOptions: Record<string, unknown> = {
      resource_type: "image",
    };

    // If upload preset is provided, use it (recommended - cleaner and more secure)
    if (upload_preset) {
      uploadOptions.upload_preset = upload_preset;
      // Folder can still be overridden even with preset
      if (folder) {
        uploadOptions.folder = folder;
      }
    } else {
      // Fallback to manual configuration if no preset
      uploadOptions.folder = folder || "WCI_Goderich";

      // Add transformation if provided (Cloudinary accepts transformation as array or object)
      if (transformation) {
        uploadOptions.transformation = [transformation];
      }
    }

    if (public_id) {
      uploadOptions.public_id = public_id;
    }

    const uploadResult = await cloudinary.uploader.upload(
      dataUri,
      uploadOptions
    );

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
}

/**
 * Deletes an image from Cloudinary by URL
 * @param imageUrl - The full URL of the image to delete
 * @returns Promise with deletion result
 */
/**
 * Deletes an image from Cloudinary by URL
 * Handles the folder structure: WCI_Goderich/birthdays/filename or WCI_Goderich/testimonies/filename
 * @param imageUrl - The full URL of the image to delete
 * @returns Promise with deletion result
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from Cloudinary URL
    // URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[folder]/[filename]
    const urlParts = imageUrl.split("/");
    const uploadIndex = urlParts.findIndex((part) => part === "upload");

    if (uploadIndex === -1 || uploadIndex >= urlParts.length - 1) {
      console.error("Invalid Cloudinary URL format");
      return;
    }

    // Get the parts after "upload" (skip version if present)
    const afterUpload = urlParts.slice(uploadIndex + 1);

    // Skip version number if present (starts with 'v' followed by digits)
    const startIndex = afterUpload[0]?.match(/^v\d+$/) ? 1 : 0;
    const pathParts = afterUpload.slice(startIndex);

    // Join all remaining parts (folder/filename) to get the full public_id
    // Remove file extension
    const publicIdWithExt = pathParts.join("/");
    const publicId = publicIdWithExt.replace(/\.[^.]+$/, "");

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    // Don't throw - deletion failures shouldn't break the app
  }
}

export { cloudinary };
