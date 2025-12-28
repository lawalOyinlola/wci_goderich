export interface School {
  id: number;
  name: string;
  location: string;
  type: "primary" | "secondary" | "university";
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
