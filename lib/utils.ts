import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SERVICES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format bytes to human readable string
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
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

/**
 * Converts a YouTube URL to an embed URL format
 * Handles both youtube.com/watch?v= and youtu.be/ formats
 * @param url - YouTube URL to convert
 * @returns Embed URL or original URL if conversion fails
 */
export function getEmbedUrl(url: string): string {
  // If it's already an embed URL, return as is
  if (url.includes("youtube.com/embed")) {
    return url;
  }
  // Extract video ID from YouTube URL (handles both youtube.com/watch?v= and youtu.be/ formats)
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

/**
 * Extracts initials from a person's name
 * Takes the first letter of the first two words (up to 2 initials)
 * @param name - Full name string
 * @returns Uppercase initials (e.g., "John Doe" -> "JD")
 */
export function getAvatarInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}
