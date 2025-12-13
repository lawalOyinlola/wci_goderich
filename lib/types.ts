export enum LeadershipRole {
  RESIDENT_PASTOR = "RESIDENT_PASTOR",
  ASSOCIATE_PASTOR = "ASSOCIATE_PASTOR",
  CHAIRMAN = "CHAIRMAN",
  ELDER = "ELDER",
  DEACON = "DEACON",
  WORSHIP_DIRECTOR = "WORSHIP_DIRECTOR",
  MINISTRY_LEADER = "MINISTRY_LEADER",
  DIRECTOR = "DIRECTOR",
  OTHER = "OTHER",
}

interface PersonBase {
  id: number;
  name: string;
  title: string;
  role: LeadershipRole;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
  featured?: boolean;
}

interface Pastor extends PersonBase {
  education?: string[];
  experience?: string[];
  specialties?: string[];
  ordinationDate?: string;
  yearsInMinistry?: number;
}

interface Leader extends PersonBase {
  department: string;
  responsibilities?: string[];
}

export type { PersonBase, Pastor, Leader };
