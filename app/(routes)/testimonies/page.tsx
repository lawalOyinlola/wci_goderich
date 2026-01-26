import Hero from "./Hero";
import TestimoniesContentWrapper from "./TestimoniesContentWrapper";
import ShareTestimonyForm from "./ShareTestimonyForm";
import CtaSection from "@/components/CtaSection";
import { Suspense } from "react";
import TestimoniesLoading from "./loading";

interface TestimoniesPageProps {
  searchParams: Promise<{ type?: string; page?: string }>;
}

export default async function TestimoniesPage({
  searchParams,
}: TestimoniesPageProps) {
  // Get type filter and page from search params
  const params = await searchParams;
  const typeParam = params.type;
  const pageParam = params.page ? parseInt(params.page, 10) : 1;

  return (
    <>
      <Hero />

      <Suspense fallback={<TestimoniesLoading />}>
        <TestimoniesContentWrapper
          initialType={typeParam}
          initialPage={pageParam}
        />
      </Suspense>
      <ShareTestimonyForm />

      <CtaSection
        title="Join Us in Prayer"
        description="Prayer is powerful and effective. Join our prayer community and experience the power of praying in agreement."
        mainText="Whether you're looking for a prayer group, want to submit a prayer request, or need prayer points for your personal prayer time, we're here to support you in your prayer journey."
        buttons={[
          {
            text: "Join a Prayer Group",
            href: "/prayer#prayer-sessions",
          },
          {
            text: "Submit Prayer Request",
            href: "/prayer#prayer-request",
          },
        ]}
      />
    </>
  );
}
