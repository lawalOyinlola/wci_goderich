import TestimoniesSection from "./Testimonies";
import { getTestimoniesServer } from "@/lib/data";
import { SAMPLE_TESTIMONIES } from "@/lib/constants";
import type { Testimony } from "@/lib/types";

// Server component wrapper that fetches data
export default async function TestimoniesWrapper() {
  const dbTestimonies = await getTestimoniesServer({ featured: true, limit: 10 });

  // Transform database testimonies to component format, with fallback to sample testimonies
  const featuredTestimonies: Testimony[] =
    dbTestimonies.length > 0
      ? dbTestimonies
      : (SAMPLE_TESTIMONIES.testimonies.filter((t) => t.featured) as Testimony[]);

  return <TestimoniesSection initialTestimonies={featuredTestimonies} />;
}
