import TestimoniesContent from "./TestimoniesContent";
import { getTestimoniesServer } from "@/lib/data";
import { SAMPLE_TESTIMONIES } from "@/lib/constants";
import type { Testimony } from "@/lib/types";

interface TestimoniesContentWrapperProps {
  initialType?: string;
}

// Server component wrapper that fetches data
export default async function TestimoniesContentWrapper({
  initialType,
}: TestimoniesContentWrapperProps) {
  const dbTestimonies = await getTestimoniesServer();

  // Transform database testimonies to component format, with fallback to sample testimonies
  const testimonies: Testimony[] =
    dbTestimonies.length > 0
      ? dbTestimonies
      : (SAMPLE_TESTIMONIES.testimonies as Testimony[]);

  return <TestimoniesContent testimonies={testimonies} initialType={initialType} />;
}
