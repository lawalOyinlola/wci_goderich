"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/spotlight";
import { TESTIMONIES } from "@/lib/constants";
import { Testimony } from "@/lib/types";
import TestimoniesTabs from "./TestimoniesTabs";
import TestimonyCard from "./TestimonyCard";
import CtaSection from "@/components/CtaSection";

function TestimoniesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = searchParams.get("type");

  // Validate and set active tab from URL
  const validTypes = ["all", "text", "video", "audio"];
  const activeTab =
    typeParam && validTypes.includes(typeParam) ? typeParam : "all";

  const filteredTestimonies = useMemo(() => {
    if (activeTab === "all") {
      return TESTIMONIES;
    }
    return TESTIMONIES.filter((testimony) => testimony.type === activeTab);
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
    <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b to-muted/70 from-background">
      <div className="container mx-auto px-4">
        <TestimoniesTabs
          testimonies={TESTIMONIES as unknown as Testimony[]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        >
          <div
            className={`grid gap-4 md:grid-cols-2  ${
              activeTab === "all" ? "lg:grid-cols-4" : "lg:grid-cols-4"
            }`}
          >
            {filteredTestimonies.map((testimony) => (
              <TestimonyCard
                key={testimony.id}
                testimony={testimony}
                className={testimony.type === "text" ? "lg:col-span-2" : ""}
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
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20"></div>

        <Spotlight
          className="-top-1/5 -left-1/7 md:-top-1/4 md:left-1/6"
          fill="#fdfcfb"
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
            Stories of Transformation
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-300">
            Discover how God&apos;s faithfulness and love have transformed lives
            in our church family
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <section className="py-15 sm:py-24 lg:py-32">
            <div className="container mx-auto px-4">
              <div className="text-center text-muted-foreground">
                Loading testimonies...
              </div>
            </div>
          </section>
        }
      >
        <TestimoniesContent />
      </Suspense>

      <CtaSection
        title="Share Your Testimony"
        description="Has you experienced God's faithfulness in your life? We'd love to hear about it and share it with our church family."
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
