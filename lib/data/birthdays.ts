import { supabase } from "@/lib/supabase/client";

export interface Birthday {
  id: string;
  name: string;
  month: number;
  day: number;
  image: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches birthdays from Supabase
 * @param month - Optional month filter (1-12)
 * @returns Array of birthdays
 */
export async function getBirthdays(month?: number): Promise<Birthday[]> {
  try {
    let query = supabase
      .from("birthdays")
      .select("*")
      .order("day", { ascending: true });

    if (month && month >= 1 && month <= 12) {
      query = query.eq("month", month);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching birthdays:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getBirthdays:", error);
    return [];
  }
}

/**
 * Submits a new birthday entry
 * @param formData - FormData containing name, month, day, and image file
 * @returns The created birthday record or null on error
 */
export async function submitBirthday(
  formData: FormData
): Promise<Birthday | null> {
  try {
    const response = await fetch("/api/birthdays", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to submit birthday");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error submitting birthday:", error);
    throw error;
  }
}
