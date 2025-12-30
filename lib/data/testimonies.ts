import type { Testimony } from "@/lib/types/testimonies";

export interface TestimonyFilters {
  type?: "written" | "video" | "audio";
  category?: string;
  featured?: boolean;
  limit?: number;
  verified?: boolean;
}

/**
 * Database testimony format (snake_case fields)
 */
type DatabaseTestimony = {
  id: string;
  name: string;
  role: string;
  image: string;
  testimony: string;
  category: string;
  date: string;
  type: "written" | "video" | "audio";
  video_url: string | null;
  audio_url: string | null;
  featured: boolean;
  verified: boolean;
};

/**
 * Transforms a database testimony object to frontend format (camelCase)
 * @param dbTestimony - Testimony from database with snake_case fields
 * @returns Testimony in frontend format with camelCase fields
 */
export function transformTestimony(dbTestimony: DatabaseTestimony): Testimony {
  const base = {
    id: dbTestimony.id,
    name: dbTestimony.name,
    role: dbTestimony.role,
    image: dbTestimony.image,
    testimony: dbTestimony.testimony,
    category: dbTestimony.category,
    date: dbTestimony.date,
    featured: dbTestimony.featured,
    verified: dbTestimony.verified,
  };

  if (dbTestimony.type === "video") {
    return {
      ...base,
      type: "video" as const,
      videoUrl: dbTestimony.video_url!,
    };
  }

  if (dbTestimony.type === "audio") {
    return {
      ...base,
      type: "audio" as const,
      audioUrl: dbTestimony.audio_url!,
    };
  }

  return {
    ...base,
    type: "written" as const,
  };
}

/**
 * Transforms an array of database testimony objects to frontend format
 * @param dbTestimonies - Array of testimonies from database
 * @returns Array of testimonies in frontend format
 */
export function transformTestimonies(
  dbTestimonies: DatabaseTestimony[]
): Testimony[] {
  return dbTestimonies.map(transformTestimony);
}

/**
 * Fetches testimonies from Supabase
 * @param filters - Optional filters for testimonies
 * @returns Array of testimonies
 */
export async function getTestimonies(
  filters?: TestimonyFilters
): Promise<Testimony[]> {
  try {
    const params = new URLSearchParams();

    if (filters?.type) params.append("type", filters.type);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.featured) params.append("featured", "true");
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.verified !== undefined) {
      params.append("verified", filters.verified ? "true" : "false");
    }

    const queryString = params.toString();
    const url = `/api/testimonies${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch testimonies");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error in getTestimonies:", error);
    return [];
  }
}

/**
 * Fetches a single testimony by ID
 * @param id - Testimony ID
 * @returns Testimony object or null
 */
export async function getTestimonyById(id: string): Promise<Testimony | null> {
  try {
    const response = await fetch(`/api/testimonies/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch testimony");
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error("Error in getTestimonyById:", error);
    return null;
  }
}
