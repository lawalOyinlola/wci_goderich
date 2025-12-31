import { Suspense } from "react";
import Hero from "./Hero";
import TestimoniesContent from "./TestimoniesContent";
import CtaSection from "@/components/CtaSection";
import { TestimoniesSkeleton } from "@/components/testimonies/TestimoniesSkeleton";
import { getTestimoniesServer } from "@/lib/data/testimonies.server";

interface TestimoniesPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function TestimoniesPage({
  searchParams,
}: TestimoniesPageProps) {
  const testimonies = await getTestimoniesServer();

  // Get type filter from search params
  const params = await searchParams;
  const typeParam = params.type;

  return (
    <>
      <Hero />
      <Suspense fallback={<TestimoniesSkeleton />}>
        <TestimoniesContent testimonies={testimonies} initialType={typeParam} />
      </Suspense>
      <CtaSection
        title="Share Your Testimony"
        description="Have you experienced God's faithfulness in your life? We'd love to hear about it and share it with our church family."
        mainText="Your testimony can be a source of encouragement, hope and inspiration for others and it brings glory to God. Whether it's a story of healing, provision, salvation, or any other blessing, every testimony matters."
        buttons={[
          { text: "Share Your Story", href: "/contact-us" },
          { text: "Learn More", href: "/about" },
        ]}
      />
    </>
  );
}
