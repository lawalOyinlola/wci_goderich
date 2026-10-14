/**
 * Columns safe to send to visitors. Selecting these instead of `*` keeps
 * moderation-only columns (pending_image, pending_submitted_at) server-side.
 */
export const BIRTHDAY_PUBLIC_COLUMNS =
  "id, name, month, day, year, image, verified, featured, created_at, updated_at";

export interface Birthday {
  id: string;
  name: string;
  month: number;
  day: number;
  /** Calendar year this row's name/image was last submitted or updated. Server-assigned; not user-selectable. */
  year: number;
  image: string;
  verified: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
