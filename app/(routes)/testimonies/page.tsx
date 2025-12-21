"use client";

import { useState, useMemo } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { TESTIMONIES } from "@/lib/constants";
import { Testimony } from "@/lib/types";
import TestimoniesTabs from "./TestimoniesTabs";
import TestimonyCard from "./TestimonyCard";

const TestimoniesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTestimonies = useMemo(() => {
    if (activeTab === "all") {
      return TESTIMONIES;
    }
    return TESTIMONIES.filter((testimony) => testimony.type === activeTab);
  }, [activeTab]);

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

      <section className="py-15 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <TestimoniesTabs
            testimonies={TESTIMONIES as unknown as Testimony[]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          >
            <div
              className={`grid gap-4 md:grid-cols-2  ${
                activeTab === "all" ? "lg:grid-cols-13" : "lg:grid-cols-4"
              }`}
            >
              {filteredTestimonies.map((testimony) => (
                <TestimonyCard
                  key={testimony.id}
                  testimony={testimony}
                  className={
                    testimony.type === "text"
                      ? "lg:col-span-7 lg:row-span-2"
                      : "lg:col-span-3"
                  }
                />
              ))}
            </div>
          </TestimoniesTabs>
        </div>
      </section>
    </>
  );
};

export default TestimoniesPage;
