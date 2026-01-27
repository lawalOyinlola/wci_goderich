"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  startTransition,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import TestimoniesTabs from "./TestimoniesTabs";
import TestimonyCard from "./TestimonyCard";
import { TestimoniesEmpty } from "@/components/testimonies/TestimoniesEmpty";
import { Pagination } from "@/components/ui/pagination";
import type { Testimony } from "@/lib/types";
import type { PaginationMeta } from "@/lib/types/gallery";
import TestimoniesLoading from "./loading";

interface TestimoniesContentProps {
  initialType?: string;
  initialPage?: number;
}

export default function TestimoniesContent({
  initialType,
  initialPage = 1,
}: TestimoniesContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

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

  const fetchTestimonies = useCallback(async (signal: AbortSignal) => {
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

      // Check if request was aborted before processing
      if (signal.aborted) {
        return;
      }

      const data = await response.json();

      // Check again after async operation
      if (signal.aborted) {
        return;
      }

      if (data.success) {
        setTestimonies(data.data || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      // Ignore AbortError - it's expected when requests are cancelled
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Error fetching testimonies:", error);
    } finally {
      // Only update loading state if request wasn't aborted
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [currentPage, activeTab]);

  useEffect(() => {
    // Create AbortController for this effect
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetch testimonies with abort signal
    fetchTestimonies(signal);

    // Cleanup: abort the request if component unmounts or dependencies change
    return () => {
      controller.abort();
    };
  }, [fetchTestimonies]);

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

  // Get all testimonies count for tabs (we'll fetch a count separately or use pagination total)
  // For now, we'll use the pagination totalItems when available
  const allTestimoniesCount = pagination?.totalItems || 0;

  // Show loading skeleton when loading (including page changes)
  if (loading) {
    return <TestimoniesLoading />;
  }

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
          totalCount={pagination?.totalItems}
        >
          {testimonies.length > 0 ? (
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
