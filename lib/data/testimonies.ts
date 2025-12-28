import { supabase } from "@/lib/supabase/client";
import type { Testimony } from "@/lib/types";

export interface TestimonyFilters {
  type?: "written" | "video" | "audio";
  category?: string;
  featured?: boolean;
  limit?: number;
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

