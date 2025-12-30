/**
 * Server-side data fetching functions for testimonies
 * These functions run on the server and can be used in Server Components
 */

import { supabaseServer } from "@/lib/supabase/server";
import {
  transformTestimony,
  transformTestimonies,
  type TestimonyFilters,
} from "./testimonies";
import type { Testimony } from "@/lib/types/testimonies";

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
 * Fetches testimonies from Supabase on the server
 * @param filters - Optional filters for testimonies
 * @returns Array of testimonies
 */
export async function getTestimoniesServer(
  filters?: TestimonyFilters
): Promise<Testimony[]> {
  try {
    let query = supabaseServer
      .from("testimonies")
      .select("*")
      .order("date", { ascending: false });

    // Default to showing only verified testimonies unless explicitly requested
    if (filters?.verified === false) {
      query = query.eq("verified", false);
    } else {
      // Default: show only verified testimonies
      query = query.eq("verified", true);
    }

    if (filters?.type && ["written", "video", "audio"].includes(filters.type)) {
      query = query.eq("type", filters.type);
    }

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.featured) {
      query = query.eq("featured", true);
    }

    if (filters?.limit) {
      const limitNum = filters.limit;
      if (limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching testimonies:", error);
      return [];
    }

    // Transform data to match frontend expectations
    return transformTestimonies((data as DatabaseTestimony[]) || []);
  } catch (error) {
    console.error("Error in getTestimoniesServer:", error);
    return [];
  }
}

/**
 * Fetches a single testimony by ID on the server
 * @param id - Testimony ID
 * @returns Testimony object or null
 */
export async function getTestimonyByIdServer(
  id: string
): Promise<Testimony | null> {
  try {
    const { data, error } = await supabaseServer
      .from("testimonies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      console.error("Error fetching testimony:", error);
      return null;
    }

    // Transform data to match frontend expectations
    return transformTestimony(data as DatabaseTestimony);
  } catch (error) {
    console.error("Error in getTestimonyByIdServer:", error);
    return null;
  }
}
