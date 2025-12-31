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
  category: "general" | "midnight" | "weekly" | "special";
  points: string[];
  scripture?: string;
  date?: string;
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

