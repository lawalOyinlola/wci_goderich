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

interface School {
  id: number;
  name: string;
  location: string;
  type: "primary" | "secondary" | "university";
  description?: string;
  website?: string;
  established?: string;
}

interface WofbiProgram {
  id: number;
  title: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  subjects: string[];
  schedule: string;
  fee: string;
  curriculum?: string[];
  requirements?: string[];
  benefits?: string[];
  featured?: boolean;
}

type TestimonyBase = {
  id: number;
  name: string;
  role: string;
  image: string;
  testimony: string;
  category: string;
  date: string;
  featured: boolean;
  verified: boolean;
};

type TextTestimony = TestimonyBase & { type: "text" };
type VideoTestimony = TestimonyBase & { type: "video"; videoUrl: string };
type AudioTestimony = TestimonyBase & { type: "audio"; audioUrl: string };

type Testimony = TextTestimony | VideoTestimony | AudioTestimony;

export type {
  PersonBase,
  Pastor,
  Leader,
  School,
  WofbiProgram,
  Testimony,
  TextTestimony,
  VideoTestimony,
  AudioTestimony,
};
