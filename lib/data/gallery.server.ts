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
      // Sanitize pagination inputs even for empty results
      let pageNum = 1;
      let limitNum = DEFAULT_GALLERY_LIMIT;
      
      if (filters?.page !== undefined) {
        const parsed = typeof filters.page === "number" ? filters.page : Number(filters.page);
        pageNum = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
      }
      pageNum = Math.max(1, pageNum);
      
      if (filters?.limit !== undefined) {
        const parsed = typeof filters.limit === "number" ? filters.limit : Number(filters.limit);
        limitNum = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_GALLERY_LIMIT;
      }
      limitNum = Math.max(1, Math.min(DEFAULT_GALLERY_LIMIT, limitNum));
      
      return {
        images: [],
        pagination: {
          currentPage: pageNum,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limitNum,
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

    // Sanitize and validate pagination inputs
    // Parse page number
    let pageNum: number;
    if (filters?.page !== undefined) {
      const parsed = typeof filters.page === "number" ? filters.page : Number(filters.page);
      pageNum = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    } else {
      pageNum = 1;
    }
    // Clamp pageNum to be at least 1
    pageNum = Math.max(1, pageNum);

    // Parse limit
    let limitNum: number;
    if (filters?.limit !== undefined) {
      const parsed = typeof filters.limit === "number" ? filters.limit : Number(filters.limit);
      limitNum = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_GALLERY_LIMIT;
    } else {
      limitNum = DEFAULT_GALLERY_LIMIT;
    }
    // Clamp limitNum to be at least 1 and cap at DEFAULT_GALLERY_LIMIT
    limitNum = Math.max(1, Math.min(DEFAULT_GALLERY_LIMIT, limitNum));

    // Calculate pagination using sanitized values
    const totalItems = images.length;
    // Ensure limitNum is valid before division (should be >= 1 after sanitization)
    const safeLimitNum = Number.isFinite(limitNum) && limitNum > 0 ? limitNum : DEFAULT_GALLERY_LIMIT;
    const totalPages = Math.ceil(totalItems / safeLimitNum);
    // Ensure totalPages is a valid number (handle edge cases like NaN/Infinity)
    const safeTotalPages = Number.isFinite(totalPages) && totalPages >= 0 ? totalPages : 0;
    
    // Calculate offset using sanitized values
    const offset = (pageNum - 1) * safeLimitNum;
    // Ensure offset is non-negative
    const safeOffset = Math.max(0, offset);
    
    // Slice images using sanitized offset and limit
    const paginatedImages = images.slice(safeOffset, safeOffset + safeLimitNum);

    return {
      images: paginatedImages,
      pagination: {
        currentPage: pageNum,
        totalPages: safeTotalPages,
        totalItems,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < safeTotalPages,
        hasPreviousPage: pageNum > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching gallery images from Cloudinary:", error);
    
    // Sanitize pagination inputs even in error case
    let pageNum = 1;
    let limitNum = DEFAULT_GALLERY_LIMIT;
    
    if (filters?.page !== undefined) {
      const parsed = typeof filters.page === "number" ? filters.page : Number(filters.page);
      pageNum = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    }
    pageNum = Math.max(1, pageNum);
    
    if (filters?.limit !== undefined) {
      const parsed = typeof filters.limit === "number" ? filters.limit : Number(filters.limit);
      limitNum = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_GALLERY_LIMIT;
    }
    limitNum = Math.max(1, Math.min(DEFAULT_GALLERY_LIMIT, limitNum));
    
    return {
      images: [],
      pagination: {
        currentPage: pageNum,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: limitNum,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
