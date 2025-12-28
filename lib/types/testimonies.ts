export type TestimonyBase = {
  id: string; // UUID from database
  name: string;
  role: string;
  image: string;
  testimony: string;
  category: string;
  date: string;
  featured: boolean;
  verified: boolean;
};

export type WrittenTestimony = TestimonyBase & { type: "written" };
export type VideoTestimony = TestimonyBase & {
  type: "video";
  videoUrl: string;
};
export type AudioTestimony = TestimonyBase & {
  type: "audio";
  audioUrl: string;
};

export type Testimony = WrittenTestimony | VideoTestimony | AudioTestimony;
