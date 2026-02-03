/**
 * Server-side data fetching functions for birthdays
 * These functions run on the server and can be used in Server Components
 */

import { headers } from "next/headers";
import { supabaseServer } from "@/lib/supabase/server";
import type { Birthday } from "@/lib/types/birthdays";

/**
 * Fetches birthdays from Supabase on the server
 * @param month - Optional month filter (1-12) or array of months
 * @param featured - Optional filter for featured birthdays only
 * @param limit - Optional limit for number of results
 * @returns Array of birthdays
 */
export async function getBirthdaysServer(options?: {
  month?: number | number[];
  featured?: boolean;
  limit?: number;
}): Promise<Birthday[]> {
  try {
    let query = supabaseServer
      .from("birthdays")
      .select("*")
      .order("month", { ascending: true })
      .order("day", { ascending: true });

    // Filter by verified status (default to showing only verified)
    query = query.eq("verified", true);

    if (options?.month) {
      if (Array.isArray(options.month)) {
        // Filter by multiple months
        query = query.in("month", options.month);
      } else if (options.month >= 1 && options.month <= 12) {
        query = query.eq("month", options.month);
      }
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

/**
 * Fetches birthdays for current month, filling with previous months if needed
 * @param minCount - Minimum number of birthdays to fetch (default: 6)
 * @param featured - Optional filter for featured birthdays only
 * @returns Array of birthdays sorted by month and day
 */
export async function getBirthdaysForCurrentMonth(options?: {
  minCount?: number;
  featured?: boolean;
}): Promise<Birthday[]> {
  // Access request data first so new Date() is allowed in Server Components
  await headers();

  const minCount = options?.minCount ?? 6;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // 1-12

  const allBirthdays: Birthday[] = [];
  const monthsFetched: number[] = [];

  // Start with current month and go backwards until we have enough
  let month = currentMonth;
  let attempts = 0;
  const maxAttempts = 12; // Prevent infinite loop

  while (allBirthdays.length < minCount && attempts < maxAttempts) {
    // Fetch birthdays for this specific month
    const monthBirthdays = await getBirthdaysServer({
      month,
      featured: options?.featured,
    });

    // Add to our collection
    allBirthdays.push(...monthBirthdays);
    monthsFetched.push(month);

    // Sort by month priority (current month first, then previous months) then by day
    allBirthdays.sort((a, b) => {
      // Sort by month priority (current month first, then previous months)
      const aMonthIndex = monthsFetched.indexOf(a.month);
      const bMonthIndex = monthsFetched.indexOf(b.month);
      if (aMonthIndex !== bMonthIndex) {
        return aMonthIndex - bMonthIndex;
      }
      // Within same month, sort by day
      return a.day - b.day;
    });

    // If we have enough, break
    if (allBirthdays.length >= minCount) {
      break;
    }

    // Otherwise, go to previous month
    month = month === 1 ? 12 : month - 1; // Wrap around from January to December
    attempts++;
  }

  // Return up to minCount birthdays
  return allBirthdays.slice(0, minCount);
}
