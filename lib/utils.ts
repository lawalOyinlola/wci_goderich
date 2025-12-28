import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SERVICES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an array of time strings by joining them with " | "
 * @param times - Array of time strings (e.g., ["07:00AM", "09:00AM"])
 * @returns Formatted string (e.g., "07:00AM | 09:00AM")
 */
export function formatTimes(times: readonly string[]): string {
  return times.join(" | ");
}

/**
 * Formats a service schedule including optional additional schedule
 * @param service - Service object with day, times, and optional additionalSchedule
 * @returns Formatted schedule string
 */
export function formatServiceSchedule(
  service: (typeof SERVICES)[number]
): string {
  const mainTimes = formatTimes(service.times);
  const mainSchedule = `${service.day}: ${mainTimes}`;

  if ("additionalSchedule" in service && service.additionalSchedule) {
    const additionalTimes = formatTimes(service.additionalSchedule.times);
    const additional = `${service.additionalSchedule.day}: ${additionalTimes}`;
    return `${mainSchedule} | ${additional}`;
  }

  return mainSchedule;
}

/**
 * Formats an event date and time for display
 * @param date - Date string (e.g., "2025-10-15")
 * @param startTime - Start time string (e.g., "8:30am")
 * @param endTime - Optional end time string (e.g., "11:30am")
 * @returns Formatted date and time string
 */
export function formatEventDateTime(
  date: string,
  startTime: string,
  endTime?: string
): string {
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (endTime) {
    return `${formattedDate} | ${startTime} - ${endTime}`;
  }

  return `${formattedDate} | ${startTime}`;
}

/**
 * Validates if a string is a valid URL
 * @param url - String to validate as URL
 * @returns true if valid URL, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Formats a number as an ordinal (1st, 2nd, 3rd, 4th, etc.)
 * @param n - Number to format
 * @returns Formatted ordinal string
 */
export function formatOrdinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
