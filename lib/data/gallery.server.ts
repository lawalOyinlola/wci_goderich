/**
 * Server-side data fetching functions for gallery
 * These functions run on the server and can be used in Server Components
 * Fetches images from Cloudinary's gallery folder
 */

import { listImagesFromFolder } from "@/lib/cloudinary";
import {
  GALLERY_FOLDER,
  DEFAULT_GALLERY_LIMIT,
  MAX_GALLERY_RESULTS,
} from "@/lib/constants/gallery";
import type {
  GalleryImage,
  GalleryFilters,
  PaginatedGalleryResponse,
  GalleryOrientation,
} from "@/lib/types/gallery";
import { optimizeCloudinaryUrl } from "@/lib/utils/cloudinary";

/**
 * Determines image orientation based on width and height
 */
function getOrientation(width: number, height: number): GalleryOrientation {
  if (width > height) {
    return "landscape";
  } else if (height > width) {
    return "portrait";
  } else {
    return "square";
  }
}

/**
 * Extracts title from Cloudinary resource metadata
 */
function extractTitle(resource: {
  public_id: string;
  context?: {
    custom?: { title?: string };
    caption?: string;
  };
}): string {
  return (
    resource.context?.custom?.title ||
    resource.context?.caption ||
    resource.public_id
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ") ||
    "Gallery Image"
  );
}

/**
 * Extracts description from Cloudinary resource metadata
 */
function extractDescription(resource: {
  context?: {
    custom?: { description?: string; alt?: string };
  };
}): string | undefined {
  return resource.context?.custom?.description || resource.context?.custom?.alt;
}

/**
 * Extracts alt text from Cloudinary resource metadata
 */
function extractAltText(resource: {
  public_id: string;
  context?: {
    custom?: { alt?: string };
    alt?: string;
  };
}): string {
  return (
    resource.context?.custom?.alt ||
    resource.context?.alt ||
    resource.public_id.split("/").pop() ||
    "Gallery image"
  );
}

/**
 * Fetches gallery images from Cloudinary's gallery folder
 * Transforms Cloudinary resources into GalleryImage format
 * Uses Cloudinary metadata (context, tags) for title and description
 * @param filters - Optional filters (pagination, etc.)
 * @returns Paginated gallery response
 */
export async function getGalleryImagesServer(
  filters?: GalleryFilters
): Promise<PaginatedGalleryResponse> {
  try {
    const result = await listImagesFromFolder(GALLERY_FOLDER, {
      max_results: MAX_GALLERY_RESULTS,
    });

    if (result.resources.length === 0) {
      return {
        images: [],
        pagination: {
          currentPage: filters?.page || 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: filters?.limit || DEFAULT_GALLERY_LIMIT,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    // Transform Cloudinary resources to GalleryImage format
    let images: GalleryImage[] = result.resources.map((resource, index) => {
      const orientation = getOrientation(resource.width, resource.height);
      const title = extractTitle(resource);
      const description = extractDescription(resource);
      const altText = extractAltText(resource);
      
      // Extract category from tags if available
      const category = resource.tags && resource.tags.length > 0 ? resource.tags[0] : undefined;
      
      // Check if featured based on tags
      const featured = resource.tags?.includes("featured") || false;

      return {
        id: `cloudinary-${resource.public_id}`,
        title,
        description,
        // Optimize Cloudinary URL to ensure proper transformations for reliability
        imageUrl: optimizeCloudinaryUrl(resource.secure_url),
        altText,
        orientation,
        category,
        featured,
        displayOrder: result.resources.length - index, // Newer images first
        createdAt: resource.created_at,
        updatedAt: resource.created_at,
      };
    });

    // Apply filters
    if (filters?.orientation) {
      images = images.filter((img) => img.orientation === filters.orientation);
    }

    if (filters?.category) {
      images = images.filter((img) => img.category === filters.category);
    }

    if (filters?.featured !== undefined) {
      images = images.filter((img) => img.featured === filters.featured);
    }

    // Filter by month or past years
    if (filters?.pastYears) {
      const currentYear = new Date().getFullYear();
      images = images.filter((img) => {
        const imgDate = new Date(img.createdAt);
        return imgDate.getFullYear() < currentYear;
      });
    } else if (filters?.month && filters.month >= 1 && filters.month <= 12) {
      const currentYear = new Date().getFullYear();
      images = images.filter((img) => {
        const imgDate = new Date(img.createdAt);
        return (
          imgDate.getFullYear() === currentYear &&
          imgDate.getMonth() === filters.month! - 1
        );
      });
    }

    // Sort by displayOrder (newer first) then by createdAt
    images.sort((a, b) => {
      if (b.displayOrder !== a.displayOrder) {
        return b.displayOrder - a.displayOrder;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || DEFAULT_GALLERY_LIMIT;
    const totalItems = images.length;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;
    const paginatedImages = images.slice(offset, offset + limit);

    return {
      images: paginatedImages,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching gallery images from Cloudinary:", error);
    return {
      images: [],
      pagination: {
        currentPage: filters?.page || 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: filters?.limit || DEFAULT_GALLERY_LIMIT,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
