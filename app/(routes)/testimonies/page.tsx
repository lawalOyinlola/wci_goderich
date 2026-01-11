import Hero from "./Hero";
import TestimoniesContent from "./TestimoniesContent";
import ShareTestimonyForm from "./ShareTestimonyForm";
import CtaSection from "@/components/CtaSection";
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
      <TestimoniesContent testimonies={testimonies} initialType={typeParam} />
      <ShareTestimonyForm />

      <CtaSection
        title="Join Us in Prayer"
        description="Prayer is powerful and effective. Join our prayer community and experience the power of praying in agreement."
        mainText="Whether you're looking for a prayer group, want to submit a prayer request, or need prayer points for your personal prayer time, we're here to support you in your prayer journey."
        buttons={[
          { text: "Join a Prayer Group", href: "/services" },
          { text: "Submit Prayer Request", href: "#prayer-request" },
        ]}
      />
    </>
  );
}
