"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { TestimonialCarousel } from "@/components/testimonies/TestimonialCarousel";
import { TestimoniesSkeleton } from "@/components/testimonies/TestimoniesSkeleton";
import type { Testimony } from "@/lib/types/testimonies";

export default function AnsweredPrayers() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonies() {
      try {
        // Fetch testimonies filtered by category "prayer" or "miracles"
        const response = await fetch(
          "/api/testimonies?category=prayer,miracles&verified=true&limit=10"
        );

        if (response.ok) {
          const result = await response.json();
          const answeredPrayers = result.data || [];

          // If no prayer/miracles testimonies, fallback to all testimonies (limited)
          if (answeredPrayers.length === 0) {
            const fallbackResponse = await fetch(
              "/api/testimonies?verified=true&limit=10"
            );
            if (fallbackResponse.ok) {
              const fallbackResult = await fallbackResponse.json();
              setTestimonies(fallbackResult.data || []);
            }
          } else {
            setTestimonies(answeredPrayers);
          }
        }
      } catch (error) {
        console.error("Error fetching testimonies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonies();
  }, []);

  return (
    <section className="py-16 bg-muted">
      <div className="small-container">
        <SectionHeader
          title="Answered Prayers"
          subtitle="Testimonies of God's Faithfulness"
          description="See how God has answered prayers in the lives of our members. These testimonies serve as encouragement and proof that prayer works."
        />
        <div>
          {loading ? (
            <TestimoniesSkeleton />
          ) : testimonies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No answered prayers to display yet. Check back soon!
              </p>
            </div>
          ) : (
            <TestimonialCarousel testimonials={testimonies} />
          )}
        </div>
      </div>
    </section>
  );
}
