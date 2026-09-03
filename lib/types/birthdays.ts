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
