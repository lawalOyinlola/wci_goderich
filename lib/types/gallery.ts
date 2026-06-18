/**
 * Gallery image orientation types
 */
export type GalleryOrientation = "portrait" | "landscape" | "square";

/**
 * Gallery image type
 */
export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  altText: string;
  orientation: GalleryOrientation;
  /** Intrinsic pixel dimensions, used to reserve exact space and drive masonry heights. */
  width?: number;
  height?: number;
  category?: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated gallery response
 */
export interface PaginatedGalleryResponse {
  images: GalleryImage[];
  pagination: PaginationMeta;
}

/**
 * Gallery filters
 */
export interface GalleryFilters {
  category?: string;
  orientation?: GalleryOrientation;
  featured?: boolean;
  month?: number; // 1-12 for January-December (current year only)
  pastYears?: boolean; // Filter for images from previous years (not current year)
  page?: number;
  limit?: number;
}
