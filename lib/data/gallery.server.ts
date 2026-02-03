/**
 * Gallery data – Cloudinary-only, no database.
 * Fetches images from Cloudinary folder WCI_Goderich/gallery via Admin API.
 * Tries prefixes: WCI_Goderich/gallery, WCI_Goderich/gallery/, gallery.
 * When the folder is empty or fetch fails, uses SAMPLE_IMAGES as fallback.
 * url, alt, title come from Cloudinary metadata or SAMPLE_IMAGES.
 */

import { listImagesFromFolder } from "@/lib/cloudinary";
import {
  GALLERY_FOLDER,
  DEFAULT_GALLERY_LIMIT,
  MAX_GALLERY_RESULTS,
  SAMPLE_IMAGES,
} from "@/lib/constants/gallery";
import type {
  GalleryImage,
  GalleryFilters,
  PaginatedGalleryResponse,
  GalleryOrientation,
} from "@/lib/types/gallery";
import { optimizeCloudinaryUrl } from "@/lib/utils/cloudinary";

/** Prefixes to try when listing gallery images (Cloudinary folder structure can vary). */
const GALLERY_PREFIXES = [
  GALLERY_FOLDER,
  `${GALLERY_FOLDER}/`,
  "gallery",
] as const;

function getOrientation(width: number, height: number): GalleryOrientation {
  if (width > height) return "landscape";
  if (height > width) return "portrait";
  return "square";
}

/** Title: context.custom.title | context.caption | filename from public_id */
function getTitle(resource: {
  public_id: string;
  context?: { custom?: { title?: string }; caption?: string };
}): string {
  const custom = resource.context?.custom?.title;
  if (custom) return custom;
  const caption = resource.context?.caption;
  if (caption) return caption;
  const name = resource.public_id.split("/").pop()?.replace(/\.[^/.]+$/, "");
  return name?.replace(/[-_]/g, " ") ?? "Gallery image";
}

/** Description: context.custom.description | context.custom.alt */
function getDescription(resource: {
  context?: { custom?: { description?: string; alt?: string } };
}): string | undefined {
  return resource.context?.custom?.description ?? resource.context?.custom?.alt;
}

/** Alt: context.custom.alt | context.alt | public_id basename */
function getAlt(resource: {
  public_id: string;
  context?: { custom?: { alt?: string }; alt?: string };
}): string {
  const custom = resource.context?.custom?.alt;
  if (custom) return custom;
  const ctxAlt = resource.context?.alt;
  if (ctxAlt) return ctxAlt;
  const name = resource.public_id.split("/").pop();
  return name ?? "Gallery image";
}

function sanitizePagination(filters?: GalleryFilters): {
  pageNum: number;
  limitNum: number;
} {
  let pageNum = 1;
  if (filters?.page !== undefined) {
    const p = typeof filters.page === "number" ? filters.page : Number(filters.page);
    pageNum = Number.isFinite(p) && p > 0 ? p : 1;
  }
  pageNum = Math.max(1, pageNum);

  let limitNum = DEFAULT_GALLERY_LIMIT;
  if (filters?.limit !== undefined) {
    const l = typeof filters.limit === "number" ? filters.limit : Number(filters.limit);
    limitNum = Number.isFinite(l) && l > 0 ? l : DEFAULT_GALLERY_LIMIT;
  }
  limitNum = Math.max(1, Math.min(limitNum, DEFAULT_GALLERY_LIMIT));

  return { pageNum, limitNum };
}

type ListResult = Awaited<ReturnType<typeof listImagesFromFolder>>;

/** Fetch from Cloudinary, trying each prefix until we get resources or exhaust options. */
async function fetchFromCloudinary(): Promise<ListResult | null> {
  for (const prefix of GALLERY_PREFIXES) {
    try {
      const result = await listImagesFromFolder(prefix, {
        max_results: MAX_GALLERY_RESULTS,
      });
      if (result.resources.length > 0) {
        console.info(`Gallery: found ${result.resources.length} images for prefix "${prefix}"`);
        return result;
      }
    } catch (e) {
      console.warn(`Gallery: no images for prefix "${prefix}"`, e);
    }
  }
  return null;
}

/** Map SAMPLE_IMAGES to GalleryImage[] for fallback when Cloudinary folder is empty. */
function sampleImagesAsGallery(): GalleryImage[] {
  const now = new Date().toISOString();
  return SAMPLE_IMAGES.map((img, i) => ({
    id: `sample-${i}`,
    title: img.title,
    description: undefined,
    imageUrl: optimizeCloudinaryUrl(img.src),
    altText: img.alt,
    orientation: "square" as const,
    category: undefined,
    featured: false,
    displayOrder: SAMPLE_IMAGES.length - i,
    createdAt: now,
    updatedAt: now,
  }));
}

/**
 * Fetches gallery images from Cloudinary (no DB).
 * Maps each resource to GalleryImage using url (secure_url), alt, title from metadata.
 */
export async function getGalleryImagesServer(
  filters?: GalleryFilters,
): Promise<PaginatedGalleryResponse> {
  const { pageNum, limitNum } = sanitizePagination(filters);

  const paginate = (list: GalleryImage[]) => {
    const totalItems = list.length;
    const safeLimit = Math.max(1, limitNum);
    const totalPages = Math.ceil(totalItems / safeLimit);
    const offset = Math.max(0, (pageNum - 1) * safeLimit);
    return {
      images: list.slice(offset, offset + safeLimit),
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
      },
    };
  };

  let images: GalleryImage[];

  try {
    const result = await fetchFromCloudinary();

    if (result) {
      images = result.resources.map((r, i) => {
        const orientation = getOrientation(r.width, r.height);
        const title = getTitle(r);
        const description = getDescription(r);
        const altText = getAlt(r);
        const category = r.tags?.[0];
        const featured = r.tags?.includes("featured") ?? false;

        return {
          id: `cloudinary-${r.public_id}`,
          title,
          description,
          imageUrl: optimizeCloudinaryUrl(r.secure_url),
          altText,
          orientation,
          category,
          featured,
          displayOrder: result.resources.length - i,
          createdAt: r.created_at,
          updatedAt: r.created_at,
        };
      });
    } else {
      console.info("Gallery: Cloudinary folder empty, using SAMPLE_IMAGES");
      images = sampleImagesAsGallery();
    }

    if (filters?.orientation) {
      images = images.filter((img) => img.orientation === filters.orientation);
    }
    if (filters?.category) {
      images = images.filter((img) => img.category === filters.category);
    }
    if (filters?.featured !== undefined) {
      images = images.filter((img) => img.featured === filters.featured);
    }
    if (filters?.pastYears) {
      const y = new Date().getFullYear();
      images = images.filter((img) => new Date(img.createdAt).getFullYear() < y);
    } else if (filters?.month != null && filters.month >= 1 && filters.month <= 12) {
      const y = new Date().getFullYear();
      const m = filters.month - 1;
      images = images.filter((img) => {
        const d = new Date(img.createdAt);
        return d.getFullYear() === y && d.getMonth() === m;
      });
    }

    images.sort((a, b) => {
      if (b.displayOrder !== a.displayOrder) return b.displayOrder - a.displayOrder;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return paginate(images);
  } catch (e) {
    console.error("Gallery: failed to fetch from Cloudinary", e);
    return paginate(sampleImagesAsGallery());
  }
}
