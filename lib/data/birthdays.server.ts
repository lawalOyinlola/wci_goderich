/**
 * Server-side data fetching functions for birthdays
 * These functions run on the server and can be used in Server Components
 */

import { supabaseServer } from "@/lib/supabase/server";
import type { Birthday } from "@/lib/types/birthdays";

/**
 * Fetches birthdays from Supabase on the server
 * @param month - Optional month filter (1-12)
 * @param featured - Optional filter for featured birthdays only
 * @param limit - Optional limit for number of results
 * @returns Array of birthdays
 */
export async function getBirthdaysServer(options?: {
  month?: number;
  featured?: boolean;
  limit?: number;
}): Promise<Birthday[]> {
  try {
    let query = supabaseServer
      .from("birthdays")
      .select("*")
      .order("day", { ascending: true });

    // Filter by verified status (default to showing only verified)
    query = query.eq("verified", true);

    if (options?.month && options.month >= 1 && options.month <= 12) {
      query = query.eq("month", options.month);
    }

    if (options?.featured) {
      query = query.eq("featured", true);
    }

    if (options?.limit) {
      const limitNum = options.limit;
      if (limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching birthdays:", error);
      return [];
    }

    return (data as Birthday[]) || [];
  } catch (error) {
    console.error("Error in getBirthdaysServer:", error);
    return [];
  }
}
