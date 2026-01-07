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

export type PrayerGroup = {
  id: string;
  name: string;
  description: string;
  day: string;
  time: string;
  location: string;
  isSpecial?: boolean; // For midnight prayer groups
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  maxMembers?: number;
  currentMembers?: number;
};

export type PrayerPoint = {
  id: string;
  title: string;
  description: string;
  category: "midnight" | "general" | "special";
  points: string[];
  scripture?: string;
  date?: string;
  // For midnight prayer groups (1-6)
  groupNumber?: number;
  intercessions?: PrayerWithScripture[];
  personalThanksgiving?: PrayerWithScripture;
  // For general prayers
  subcategory?:
    | "personal-growth"
    | "family-relationships"
    | "church-community"
    | "global-concerns";
};

export interface PrayerWithScripture {
  prayer: string;
  scripture: string;
}

export interface MidnightPrayerGroup {
  name: string;
  description: string;
  day: string; // e.g., "Monday", "Tuesday", etc.
  time: string; // e.g., "12:00 AM"
  location: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  maxMembers?: number;
  currentMembers?: number;
  intercessions: PrayerWithScripture[];
  personalThanksgiving: PrayerWithScripture;
}

// Structure for all midnight prayer groups (object with groupNumber as key)
export type MidnightPrayerGroups = {
  [groupNumber: number]: MidnightPrayerGroup;
};

export type PrayerSession = {
  id: string;
  name: string;
  description: string;
  day: string;
  times: string[];
  location: string;
  type: "service" | "prayer" | "group";
  isSpecial?: boolean;
};
