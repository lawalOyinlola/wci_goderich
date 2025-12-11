interface Pastor {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  education?: string[];
  experience?: string[];
  specialties?: string[];
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
  };
  featured?: boolean;
  ordinationDate?: string;
  yearsInMinistry?: number;
}

interface Leader {
  id: number;
  name: string;
  title: string;
  department: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  responsibilities?: string[];
  featured?: boolean;
}

export type { Pastor, Leader };
