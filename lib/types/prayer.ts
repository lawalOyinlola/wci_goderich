export type PrayerRequest = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  request: string;
  category?: string;
  isAnonymous?: boolean;
  status?: "pending" | "praying" | "answered";
  createdAt: string;
  updatedAt?: string;
};

export type PrayerPoint = {
  id: string;
  title: string;
  description: string;
  category: "general" | "special";
  points: string[];
  scripture?: string;
  date?: string;
  // For general prayers
  subcategory?:
    | "personal-growth"
    | "family-relationships"
    | "church-community"
    | "global-concerns";
};
