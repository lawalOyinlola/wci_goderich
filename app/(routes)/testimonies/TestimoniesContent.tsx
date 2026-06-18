"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import TestimoniesTabs from "./TestimoniesTabs";
import TestimonyCard from "./TestimonyCard";
import { TestimoniesEmpty } from "@/components/testimonies/TestimoniesEmpty";
import { TestimoniesCardsSkeleton } from "@/components/testimonies/TestimoniesCardsSkeleton";
import { Pagination } from "@/components/ui/pagination";
import type { Testimony } from "@/lib/types";
import type { PaginationMeta } from "@/lib/types/gallery";

interface TestimoniesContentProps {
  initialType?: string;
  initialPage?: number;
}

export interface TestimonyCounts {
  all: number;
  written: number;
  video: number;
  audio: number;
}

export default function TestimoniesContent({
  initialType,
  initialPage = 1,
}: TestimoniesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [counts, setCounts] = useState<TestimonyCounts | null>(null);
  const [loading, setLoading] = useState(true);

  // In-memory cache keyed by `type:page` so switching back to an already-viewed
  // tab or page renders instantly without a refetch or loading flash.
  const cacheRef = useRef<
    Map<
      string,
      {
        testimonies: Testimony[];
        pagination: PaginationMeta | null;
        counts: TestimonyCounts | null;
      }
    >
  >(new Map());

  const parsedPage = Number.parseInt(searchParams.get("page") ?? "", 10);

  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? parsedPage
      : Math.max(1, initialPage);

  const typeParam = searchParams.get("type") || initialType;

  // Validate and set active tab from URL
  const validTypes = ["all", "written", "video", "audio"];
  const activeTab =
    typeParam && validTypes.includes(typeParam) ? typeParam : "all";

  useEffect(() => {
    const cacheKey = `${activeTab}:${currentPage}`;

    // Serve from cache instantly — no network call, no loading flash.
    const cached = cacheRef.current.get(cacheKey);
    if (cached) {
      setTestimonies(cached.testimonies);
      setPagination(cached.pagination);
      if (cached.counts) {
        setCounts(cached.counts);
      }
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchTestimonies = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", String(currentPage));
        params.append("limit", "12"); // 12 items per page
        params.append("verified", "true"); // Only show verified testimonies

        // Add type filter if not "all"
        if (activeTab !== "all") {
          params.append("type", activeTab);
        }

        const response = await fetch(`/api/testimonies?${params.toString()}`, {
          signal,
        });

        if (signal.aborted) {
          return;
        }

        const data = await response.json();

        if (signal.aborted) {
          return;
        }

        if (data.success) {
          const next = {
            testimonies: (data.data ?? []) as Testimony[],
            pagination: (data.pagination ?? null) as PaginationMeta | null,
            counts: (data.counts ?? null) as TestimonyCounts | null,
          };
          cacheRef.current.set(cacheKey, next);
          setTestimonies(next.testimonies);
          setPagination(next.pagination);
          if (next.counts) {
            setCounts(next.counts);
          }
        }
      } catch (error) {
        // Ignore AbortError - it's expected when requests are cancelled
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching testimonies:", error);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTestimonies();

    return () => {
      controller.abort();
    };
  }, [activeTab, currentPage]);

  const updateSearchParams = (
    updates: Record<string, string | number | null | undefined>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Use startTransition and replace to prevent scrolling and full re-render
    startTransition(() => {
      router.replace(`/testimonies?${params.toString()}`, { scroll: false });
    });
  };

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    // Reset to page 1 when changing tabs
    params.set("page", "1");
    startTransition(() => {
      router.replace(`/testimonies?${params.toString()}`, { scroll: false });
    });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage });
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
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={counts}
        >
          {loading ? (
            <TestimoniesCardsSkeleton />
          ) : testimonies.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {testimonies.map((testimony) => (
                  <TestimonyCard
                    key={testimony.id}
                    testimony={testimony}
                    className={
                      testimony.type === "written" ? "lg:col-span-2" : ""
                    }
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <Pagination
                  pagination={pagination}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  itemName="testimonies"
                />
              )}
            </>
          ) : (
            <TestimoniesEmpty />
          )}
        </TestimoniesTabs>
      </div>
    </section>
  );
}
