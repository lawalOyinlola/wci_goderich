"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GalleryThumbnailImage } from "./GalleryThumbnailImage";
import GalleryLightbox from "./GalleryLightbox";
import GallerySkeleton from "./GallerySkeleton";
import SectionHeader from "@/components/SectionHeader";
import { SelectField } from "@/components/form/SelectField";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  ImagesIcon,
  CameraIcon,
  PauseIcon,
  ArrowDownIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { GalleryImage, PaginationMeta } from "@/lib/types/gallery";
import { MONTHS } from "@/lib/constants";
import { DEFAULT_GALLERY_LIMIT } from "@/lib/constants/gallery";

interface GalleryContentProps {
  initialCategory?: string;
  initialOrientation?: string;
  initialMonth?: number;
}

/** Responsive column count for the masonry layout: 2 (mobile) / 3 (tablet) / 4 (desktop). */
function useColumnCount() {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setColumns(w < 640 ? 2 : w < 1024 ? 3 : 4);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return columns;
}

/** Image height per unit width, used to balance masonry columns. */
function aspectHeight(image: GalleryImage) {
  if (image.width && image.height) return image.height / image.width;
  if (image.orientation === "portrait") return 4 / 3;
  if (image.orientation === "landscape") return 3 / 4;
  return 1;
}

export default function GalleryContent({
  initialCategory,
  initialOrientation,
  initialMonth,
}: GalleryContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  // Fetching the next page to append, as opposed to the initial/filtered load.
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // false once the user taps the floating button to stop auto-loading on
  // scroll; further pages then only load via the manual "Load more" button.
  const [autoLoad, setAutoLoad] = useState(true);
  // Index of the image currently open in the lightbox (null = closed).
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Page most recently fetched. Infinite scroll has no URL-addressable page,
  // so this lives in component state rather than the query string.
  const pageRef = useRef(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const category = searchParams.get("category") || initialCategory;
  const orientation = searchParams.get("orientation") || initialOrientation;
  const monthParam = searchParams.get("month");
  const month = monthParam ? parseInt(monthParam, 10) : initialMonth;
  const pastYears = searchParams.get("pastYears") === "true";

  const hasActiveFilter = !!category || !!orientation || !!month || pastYears;

  const form = useForm({
    defaultValues: {
      month: pastYears ? "past-years" : month ? String(month) : "all",
    },
  });

  // Update form when month/pastYears changes from URL
  useEffect(() => {
    form.setValue(
      "month",
      pastYears ? "past-years" : month ? String(month) : "all"
    );
  }, [month, pastYears, form]);

  const fetchImages = useCallback(
    async (page: number, { append }: { append: boolean }) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        // Re-arm auto-loading on every fresh (non-append) fetch, i.e. the
        // initial load and every filter change.
        setAutoLoad(true);
      }
      setError(null); // Clear any previous errors
      try {
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(DEFAULT_GALLERY_LIMIT));
        if (category) params.append("category", category);
        if (orientation) params.append("orientation", orientation);
        if (pastYears) {
          params.append("pastYears", "true");
        } else if (month) {
          params.append("month", String(month));
        }

        const response = await fetch(`/api/gallery?${params.toString()}`);

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`Failed to load gallery: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          setImages((prev) =>
            append ? [...prev, ...(data.data || [])] : data.data || []
          );
          setPagination(data.pagination);
          pageRef.current = page;
          setError(null); // Clear error on success
        } else {
          throw new Error(data.error || "Failed to load gallery images");
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unable to load gallery images. Please check your connection and try again.";
        setError(errorMessage);

        if (append) {
          // A failed "load more" keeps everything already on screen; just stop
          // auto-loading so a flaky connection doesn't retry in a loop, and
          // let the floating button offer a manual retry instead.
          setAutoLoad(false);
        } else {
          // Only clear images and pagination if this is the initial load (no images yet)
          // Use functional updates to check current state without dependency
          setImages((prevImages) =>
            prevImages.length === 0 ? [] : prevImages
          );
          setPagination((prevPagination) =>
            prevPagination && prevPagination.totalItems > 0
              ? prevPagination
              : null
          );
        }
      } finally {
        if (append) setLoadingMore(false);
        else setLoading(false);
      }
    },
    [category, orientation, month, pastYears]
  );

  // Initial load and every filter change: reset to page 1 and replace (not
  // append) - fetchImages re-arms autoLoad itself for a non-append fetch.
  useEffect(() => {
    fetchImages(1, { append: false });
  }, [fetchImages]);

  // Auto-load the next page once the sentinel below the grid scrolls into
  // view, as long as the user hasn't tapped "stop" and there's more to load.
  useEffect(() => {
    if (!autoLoad || loading || loadingMore || !pagination?.hasNextPage) {
      return;
    }
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchImages(pageRef.current + 1, { append: true });
        }
      },
      { rootMargin: "600px" } // start the fetch well before the sentinel is actually on screen
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoLoad, loading, loadingMore, pagination?.hasNextPage, fetchImages]);

  const loadMoreManually = useCallback(() => {
    fetchImages(pageRef.current + 1, { append: true });
  }, [fetchImages]);

  const handleMonthChange = (value: string) => {
    if (value === "past-years") {
      updateSearchParams({ month: null, pastYears: "true" });
    } else if (value && value !== "all") {
      updateSearchParams({ month: parseInt(value, 10), pastYears: null });
    } else {
      updateSearchParams({ month: null, pastYears: null });
    }
  };

  // Get available months (only up to current month for current year)
  const availableMonths = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    return MONTHS.slice(0, currentMonth);
  }, []);

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
      router.replace(`/gallery?${params.toString()}`, { scroll: false });
    });
  };

  // Clear every active filter and return to the full, unfiltered gallery.
  const resetFilters = () => {
    form.setValue("month", "all");
    updateSearchParams({
      month: null,
      pastYears: null,
      category: null,
      orientation: null,
    });
  };

  // Distribute images into independent, shortest-first columns. Each column is a
  // normal block flow (not CSS multi-column), so native lazy-loading works and
  // images never jump between columns as later images load in.
  const columnCount = useColumnCount();
  const columns = useMemo(() => {
    const cols: GalleryImage[][] = Array.from({ length: columnCount }, () => []);
    const heights = new Array<number>(columnCount).fill(0);

    images.forEach((image) => {
      let target = 0;
      for (let i = 1; i < columnCount; i++) {
        if (heights[i] < heights[target]) target = i;
      }
      cols[target].push(image);
      heights[target] += aspectHeight(image);
    });

    return cols;
  }, [images, columnCount]);

  // Map each image id to its flat index so a card (rendered inside a masonry
  // column) can open the lightbox at the correct position.
  const indexById = useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((image, i) => map.set(image.id, i));
    return map;
  }, [images]);

  // Show skeleton when loading (including page changes)
  if (loading) {
    return <GallerySkeleton />;
  }

  return (
    <section id="gallery" className="py-20">
      <div className="container max-w-screen">
        <SectionHeader
          title="Photo Gallery"
          subtitle="Collections"
          description="Browse through our collection of memorable moments"
        />

        {/* Month/Year Filter */}
        <div className="flex justify-end mb-8">
          <div className="w-full sm:w-64">
            <SelectField
              name="month"
              control={form.control}
              label="Filter by Time Period"
              placeholder="All Time Periods"
              onValueChange={handleMonthChange}
              options={[
                { value: "all", label: "All Time Periods" },
                { value: "past-years", label: "Past Years" },
                ...availableMonths.map((monthName, index) => ({
                  value: String(index + 1),
                  label: monthName,
                })),
              ]}
            />
          </div>
        </div>

        {/* Gallery Masonry Layout, Error State, or Empty State */}
        {error && images.length === 0 ? (
          <GalleryErrorState
            error={error}
            onRetry={() => fetchImages(1, { append: false })}
          />
        ) : images.length === 0 ? (
          <GalleryEmptyState
            hasFilter={hasActiveFilter}
            onReset={resetFilters}
          />
        ) : (
          <div className="flex items-start gap-3 mb-6">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-1 flex-col gap-3 min-w-0">
                {column.map((image) => (
                  <GalleryImageCard
                    key={image.id}
                    image={image}
                    onOpen={() =>
                      setLightboxIndex(indexById.get(image.id) ?? 0)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Full-screen image viewer with prev/next navigation and swipe */}
        <GalleryLightbox
          images={images}
          startIndex={lightboxIndex ?? 0}
          open={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
        />

        {/* Show error banner if there's an error but we have cached images -
            i.e. a "load more" fetch failed. Auto-load already stopped itself;
            this offers a manual retry of the same next page. */}
        {error && images.length > 0 && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-destructive">
                {error} Some images may not have loaded.
              </p>
              <AnimatedButton
                size="sm"
                text="Retry"
                onClick={loadMoreManually}
                variant="outline"
              />
            </div>
          </div>
        )}

        {/* Invisible sentinel that triggers the next page once it scrolls
            into view; sits ahead of the actual end of the grid via rootMargin. */}
        {pagination?.hasNextPage && (
          <div ref={sentinelRef} aria-hidden className="h-px" />
        )}

        {/* Inline skeleton row while a "load more" fetch is in flight */}
        {loadingMore && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
            {Array.from({ length: columnCount }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        )}

        {/* End of the gallery */}
        {!loading &&
          !loadingMore &&
          images.length > 0 &&
          pagination &&
          !pagination.hasNextPage && (
            <p className="text-center text-sm text-muted-foreground mb-6">
              You&apos;ve reached the end. {pagination.totalItems} photo
              {pagination.totalItems === 1 ? "" : "s"} in total.
            </p>
          )}
      </div>

      {/* Floating control: while auto-loading, lets the user stop it; once
          stopped (or after a load fails), becomes a manual "load more" button. */}
      {pagination?.hasNextPage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          {autoLoad ? (
            <button
              type="button"
              onClick={() => setAutoLoad(false)}
              className="flex items-center gap-2 rounded-full bg-foreground text-background pl-4 pr-5 py-2.5 text-sm font-medium shadow-lg hover:opacity-90 transition-opacity"
            >
              {loadingMore ? (
                <SpinnerGapIcon className="size-4 animate-spin" weight="bold" />
              ) : (
                <PauseIcon className="size-4" weight="fill" />
              )}
              Stop loading
            </button>
          ) : (
            <button
              type="button"
              onClick={loadMoreManually}
              disabled={loadingMore}
              className="flex items-center gap-2 rounded-full bg-foreground text-background pl-4 pr-5 py-2.5 text-sm font-medium shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loadingMore ? (
                <SpinnerGapIcon className="size-4 animate-spin" weight="bold" />
              ) : (
                <ArrowDownIcon className="size-4" weight="bold" />
              )}
              {loadingMore ? "Loading..." : "Load more photos"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}

function GalleryImageCard({
  image,
  onOpen,
}: {
  image: GalleryImage;
  onOpen: () => void;
}) {
  // Reserve the exact box using the image's real dimensions so nothing shifts as
  // it loads; fall back to orientation buckets when dimensions are unavailable.
  const aspectStyle =
    image.width && image.height
      ? { aspectRatio: `${image.width} / ${image.height}` }
      : undefined;
  const aspectFallback =
    image.orientation === "portrait"
      ? "aspect-3/4"
      : image.orientation === "landscape"
        ? "aspect-4/3"
        : "aspect-square";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${image.description ?? image.title}`}
      style={aspectStyle}
      className={cn(
        "group relative block w-full overflow-hidden shadow-lg cursor-pointer rounded-lg bg-muted",
        "hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        !aspectStyle && aspectFallback
      )}
    >
      <GalleryThumbnailImage
        src={image.imageUrl}
        alt={image.altText}
        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-left transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white/90 text-sm line-clamp-3">{image.description ?? image.title}</p>
      </div>
    </button>
  );
}

function GalleryErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <Empty className="border border-dashed py-20 my-12 max-w-2xl mx-auto">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-destructive/20 via-destructive/10 to-destructive/20 rounded-full blur-xl" />
            <AlertCircle
              size={64}
              className="relative text-destructive"
            />
          </div>
        </EmptyMedia>
        <EmptyTitle className="text-3xl font-bold mb-3">
          Unable to Load Gallery
        </EmptyTitle>
        <EmptyDescription className="text-base max-w-md">
          {error || "We encountered an issue loading the gallery. This might be due to a network connection problem."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="mt-6">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <AnimatedButton
            size="lg"
            text="Try Again"
            onClick={onRetry}
            icon={<CameraIcon weight="bold" />}
          />
          <AnimatedButton
            variant="outline"
            size="lg"
            text="Contact Us"
            href="/contact-us?subject=gallery#contact-form"
          />
        </div>
      </EmptyContent>
    </Empty>
  );
}

function GalleryEmptyState({
  hasFilter,
  onReset,
}: {
  hasFilter?: boolean;
  onReset?: () => void;
}) {
  return (
    <Empty className="border border-dashed py-20 my-12 max-w-2xl mx-auto">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl" />
            <ImagesIcon
              weight="duotone"
              size={64}
              className="relative text-primary"
            />
          </div>
        </EmptyMedia>
        <EmptyTitle className="text-3xl font-bold mb-3">
          {hasFilter ? "No Images Found" : "Gallery is Empty"}
        </EmptyTitle>
        <EmptyDescription className="text-base max-w-md">
          {hasFilter
            ? `We couldn't find any images for the selected month. Try selecting a different month or browse all images to discover our photo collections.`
            : `Our photo gallery is waiting to be filled with beautiful moments from our church community. Check back soon to see memories from our services, events, and special occasions.`}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="mt-6">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          {hasFilter ? (
            <>
              <AnimatedButton
                size="lg"
                text="View All Images"
                onClick={onReset}
                icon={<CameraIcon weight="bold" />}
              />
              <AnimatedButton
                variant="outline"
                size="lg"
                text="Contact Us"
                href="/contact-us?subject=gallery#contact-form"
              />
            </>
          ) : (
            <>
              <AnimatedButton
                size="lg"
                text="Explore Our Church"
                href="/about"
                icon={<CameraIcon weight="bold" />}
              />
              <AnimatedButton
                variant="outline"
                size="lg"
                text="Contact Us"
                href="/contact-us?subject=gallery#contact-form"
              />
            </>
          )}
        </div>
      </EmptyContent>
    </Empty>
  );
}
