import type { Birthday } from "@/lib/types/birthdays";

// Re-export for convenience
export type { Birthday };

/**
 * Fetches birthdays from the API route
 * @param month - Optional month filter (1-12)
 * @returns Array of birthdays
 */
export async function getBirthdays(month?: number): Promise<Birthday[]> {
  try {
    const params = new URLSearchParams();
    if (month && month >= 1 && month <= 12) {
      params.append("month", month.toString());
    }

    const queryString = params.toString();
    const url = `/api/birthdays${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch birthdays");
    }

    const result = await response.json();
    return result.data || [];
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
