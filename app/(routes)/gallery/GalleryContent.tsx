"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { SelectField } from "@/components/form/SelectField";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { GalleryImage, PaginationMeta } from "@/lib/types/gallery";
import { Pagination } from "@/components/ui/pagination";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/components/ui/morphing-dialog";
import { RobustGalleryImage } from "@/app/(routes)/gallery/RobustGalleryImage";
import { GalleryThumbnailImage } from "@/app/(routes)/gallery/GalleryThumbnailImage";
import { XIcon } from "lucide-react";
import GallerySkeleton from "./GallerySkeleton";
import { MONTHS } from "@/lib/constants";
import { DEFAULT_GALLERY_LIMIT } from "@/lib/constants/gallery";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ImagesIcon, CameraIcon } from "@phosphor-icons/react";
import { AlertCircle } from "lucide-react";

interface GalleryContentProps {
  initialPage?: number;
  initialCategory?: string;
  initialOrientation?: string;
  initialMonth?: number;
}

export default function GalleryContent({
  initialPage = 1,
  initialCategory,
  initialOrientation,
  initialMonth,
}: GalleryContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = parseInt(
    searchParams.get("page") || String(initialPage),
    10
  );
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

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const params = new URLSearchParams();
      params.append("page", String(currentPage));
      params.append("limit", String(DEFAULT_GALLERY_LIMIT));
      params.append("featured", "true"); // Only show featured images
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
        setImages(data.data || []);
        setPagination(data.pagination);
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

      // Only clear images and pagination if this is the initial load (no images yet)
      // Use functional updates to check current state without dependency
      setImages((prevImages) => {
        if (prevImages.length === 0) {
          return [];
        }
        return prevImages; // Keep existing images on error
      });

      setPagination((prevPagination) => {
        // Only clear pagination if we have no images
        if (prevPagination && prevPagination.totalItems > 0) {
          return prevPagination; // Keep existing pagination if we have images
        }
        return null;
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, category, orientation, month, pastYears]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleMonthChange = (value: string) => {
    if (value === "past-years") {
      updateSearchParams({ month: null, pastYears: "true", page: 1 });
    } else if (value && value !== "all") {
      updateSearchParams({
        month: parseInt(value, 10),
        pastYears: null,
        page: 1,
      });
    } else {
      updateSearchParams({ month: null, pastYears: null, page: 1 });
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

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage });
    // Don't scroll to top - skeleton will show loading state
  };

  const groupedImages = useMemo(() => {
    // Distribute images across 3 columns for masonry layout
    const columns: GalleryImage[][] = [[], [], []];

    // Distribute images evenly across columns
    images.forEach((image, index) => {
      columns[index % 3].push(image);
    });

    return columns;
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
          <GalleryErrorState error={error} onRetry={() => fetchImages()} />
        ) : images.length === 0 ? (
          <GalleryEmptyState hasFilter={hasActiveFilter} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {groupedImages?.map((column, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {column.map((image) => (
                  <GalleryImageCard key={image.id} image={image} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Show error banner if there's an error but we have cached images */}
        {error && images.length > 0 && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-destructive">
                {error} Some images may not be up to date.
              </p>
              <AnimatedButton
                size="sm"
                text="Retry"
                onClick={() => fetchImages()}
                variant="outline"
              />
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <Pagination
            pagination={pagination}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="mt-12"
            itemName="images"
          />
        )}
      </div>
    </section>
  );
}

function GalleryImageCard({ image }: { image: GalleryImage }) {
  const aspectRatio = useMemo(() => {
    switch (image.orientation) {
      case "portrait":
        return "aspect-3/4";
      case "landscape":
        return "aspect-video";
      case "square":
        return "aspect-square";
      default:
        return "aspect-square";
    }
  }, [image.orientation]);

  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <MorphingDialogTrigger
        className={cn(
          "group relative overflow-hidden shadow-lg cursor-pointer rounded-lg",
          "hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]",
          aspectRatio,
          "w-full"
        )}
      >
        <GalleryThumbnailImage
          src={image.imageUrl}
          alt={image.altText}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-lg mb-1">
            {image.title}
          </h3>
          {image.description && (
            <p className="text-white/90 text-sm line-clamp-2">
              {image.description}
            </p>
          )}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative">
          <RobustGalleryImage
            src={image.imageUrl}
            alt={image.altText}
            className="h-auto w-full max-w-[90vw] rounded-[4px] object-contain lg:h-[90vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
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
            href="/contact-us"
          />
        </div>
      </EmptyContent>
    </Empty>
  );
}

function GalleryEmptyState({ hasFilter }: { hasFilter?: boolean }) {
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
                href="/gallery"
                icon={<CameraIcon weight="bold" />}
              />
              <AnimatedButton
                variant="outline"
                size="lg"
                text="Contact Us"
                href="/contact-us"
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
                href="/contact-us"
              />
            </>
          )}
        </div>
      </EmptyContent>
    </Empty>
  );
}
