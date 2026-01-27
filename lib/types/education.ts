export interface School {
  id: string | number;
  name: string;
  location: string;
  type: "primary" | "secondary" | "primary_secondary" | "university";
  summary?: string;
  description?: string;
  website?: string;
  established?: string;
}

export interface WofbiProgram {
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
