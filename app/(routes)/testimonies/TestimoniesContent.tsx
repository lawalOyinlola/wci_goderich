"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import TestimoniesTabs from "./TestimoniesTabs";
import TestimonyCard from "./TestimonyCard";
import { TestimoniesEmpty } from "@/components/testimonies/TestimoniesEmpty";
import type { Testimony } from "@/lib/types";

interface TestimoniesContentProps {
  testimonies: Testimony[];
  initialType?: string;
}

export default function TestimoniesContent({
  testimonies,
  initialType,
}: TestimoniesContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get("type") || initialType;

  // Validate and set active tab from URL
  const validTypes = ["all", "written", "video", "audio"];
  const activeTab =
    typeParam && validTypes.includes(typeParam) ? typeParam : "all";

  const filteredTestimonies = useMemo(() => {
    if (activeTab === "all") {
      return testimonies;
    }
    return testimonies.filter((testimony) => testimony.type === activeTab);
  }, [activeTab, testimonies]);

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
    <section
      className="py-16 sm:py-24 lg:py-32 bg-background z-20"
      id="testimonies"
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title="God's Faithfulness in Our Lives"
          subtitle="Testimonies"
          description="Hear from our church family about how God has worked in their lives"
        />
        <TestimoniesTabs
          testimonies={testimonies}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        >
          {filteredTestimonies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredTestimonies.map((testimony) => (
                <TestimonyCard
                  key={testimony.id}
                  testimony={testimony}
                  className={
                    testimony.type === "written" ? "lg:col-span-2" : ""
                  }
                />
              ))}
            </div>
          ) : (
            <TestimoniesEmpty />
          )}
        </TestimoniesTabs>
      </div>
    </section>
  );
}
