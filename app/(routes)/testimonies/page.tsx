"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Hero from "./Hero";
import SectionHeader from "@/components/SectionHeader";
import TestimoniesTabs from "./TestimoniesTabs";
import TestimonyCard from "./TestimonyCard";
import CtaSection from "@/components/CtaSection";
import { TESTIMONIES } from "@/lib/constants";

function TestimoniesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get("type");
  const { testimonies } = TESTIMONIES;

  // Validate and set active tab from URL
  const validTypes = ["all", "written", "video", "audio"];
  const activeTab =
    typeParam && validTypes.includes(typeParam) ? typeParam : "all";

  const filteredTestimonies = useMemo(() => {
    if (activeTab === "all") {
      return testimonies;
    }
    return testimonies.filter((testimony) => testimony.type === activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    router.push(
      `/testimonies${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b to-muted/70 from-background z-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="God's Faithfulness in Our Lives"
          subtitle={TESTIMONIES.subtitle}
          description="Hear from our church family about how God has worked in their lives"
        />
        <TestimoniesTabs
          testimonies={testimonies}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredTestimonies.map((testimony) => (
              <TestimonyCard
                key={testimony.id}
                testimony={testimony}
                className={testimony.type === "written" ? "lg:col-span-2" : ""}
              />
            ))}
          </div>
        </TestimoniesTabs>
      </div>
    </section>
  );
}

const TestimoniesPage = () => {
  return (
    <>
      <Hero />
      <TestimoniesContent />
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
};

export default TestimoniesPage;
