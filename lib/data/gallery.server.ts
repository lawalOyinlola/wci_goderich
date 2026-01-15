/**
 * Server-side data fetching functions for gallery
 * These functions run on the server and can be used in Server Components
 */

import { supabaseServer } from "@/lib/supabase/server";
import type {
  GalleryImage,
  GalleryFilters,
  PaginatedGalleryResponse,
  DatabaseGalleryImage,
} from "@/lib/types/gallery";

/**
 * Transforms a database gallery image to the frontend format
 */
export function transformGalleryImage(
  dbImage: DatabaseGalleryImage
): GalleryImage {
  return {
    id: dbImage.id,
    title: dbImage.title,
    description: dbImage.description || undefined,
    imageUrl: dbImage.image_url,
    altText: dbImage.alt_text,
    orientation: dbImage.orientation,
    category: dbImage.category || undefined,
    featured: dbImage.featured,
    displayOrder: dbImage.display_order,
    createdAt: dbImage.created_at,
    updatedAt: dbImage.updated_at,
  };
}

/**
 * Transforms an array of database gallery images
 */
export function transformGalleryImages(
  dbImages: DatabaseGalleryImage[]
): GalleryImage[] {
  return dbImages.map(transformGalleryImage);
}

/**
 * Fetches gallery images from Supabase on the server with pagination
 * @param filters - Optional filters for gallery images
 * @returns Paginated gallery response
 */
export async function getGalleryImagesServer(
  filters?: GalleryFilters
): Promise<PaginatedGalleryResponse> {
  try {
    const page = filters?.page || 1;
    const limit = filters?.limit || 15;
    const offset = (page - 1) * limit;

    let query = supabaseServer
      .from("gallery")
      .select("*", { count: "exact" })
      .order("display_order", { ascending: false })
      .order("created_at", { ascending: false });

    // Apply filters
    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.orientation) {
      query = query.eq("orientation", filters.orientation);
    }

    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    // Filter by past years (excludes current year)
    if (filters?.pastYears) {
      const currentYear = new Date().getFullYear();
      const startOfCurrentYear = new Date(currentYear, 0, 1);
      query = query.lt("created_at", startOfCurrentYear.toISOString());
    } else if (filters?.month && filters.month >= 1 && filters.month <= 12) {
      // Filter by month (based on created_at) - current year only
      // Filters images by the month they were added (created_at)
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, filters.month - 1, 1);
      const endDate = new Date(currentYear, filters.month, 1);
      query = query.gte("created_at", startDate.toISOString());
      query = query.lt("created_at", endDate.toISOString());
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching gallery images:", error);
      return {
        images: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limit,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    const images = transformGalleryImages(
      (data as DatabaseGalleryImage[]) || []
    );
    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      images,
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
    console.error("Error in getGalleryImagesServer:", error);
    return {
      images: [],
      pagination: {
        currentPage: filters?.page || 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: filters?.limit || 15,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}
