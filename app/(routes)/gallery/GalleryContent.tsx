"use client";

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { SelectField } from "@/components/form/SelectField";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { GalleryImage, PaginationMeta } from "@/lib/types/gallery";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import GallerySkeleton from "./GallerySkeleton";
import { MONTHS } from "@/lib/constants";
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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
    try {
      const params = new URLSearchParams();
      params.append("page", String(currentPage));
      params.append("limit", "15");
      params.append("featured", "true"); // Only show featured images
      if (category) params.append("category", category);
      if (orientation) params.append("orientation", orientation);
      if (pastYears) {
        params.append("pastYears", "true");
      } else if (month) {
        params.append("month", String(month));
      }

      const response = await fetch(`/api/gallery?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setImages(data.data || []);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error);
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

        {/* Gallery Masonry Layout or Empty State */}
        {images.length === 0 ? (
          <GalleryEmptyState hasFilter={hasActiveFilter} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {groupedImages?.map((column, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {column.map((image) => (
                  <GalleryImageCard
                    key={image.id}
                    image={image}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
              className="gap-2"
            >
              <CaretLeftIcon weight="bold" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first page, last page, current page, and pages around current
                  return (
                    page === 1 ||
                    page === pagination.totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => {
                  // Add ellipsis when there's a gap
                  const showEllipsisBefore =
                    index > 0 && page - array[index - 1] > 1;

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsisBefore && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="min-w-10"
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="gap-2"
            >
              Next
              <CaretRightIcon weight="bold" />
            </Button>
          </div>
        )}

        {/* Image Info */}
        {pagination && (
          <div className="text-center text-sm text-muted-foreground mt-6">
            Showing {images.length} of {pagination.totalItems} images
            {pagination.totalPages > 1 && (
              <>
                {" "}
                • Page {pagination.currentPage} of {pagination.totalPages}
              </>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          {selectedImage && (
            <>
              <div className="relative aspect-video w-full">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.altText}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <DialogDescription className="text-base">
                    {selectedImage.description}
                  </DialogDescription>
                )}
                {selectedImage.category && (
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">
                      Category: {selectedImage.category}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function GalleryImageCard({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
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
    <div
      className={cn(
        "group relative rounded-lg overflow-hidden shadow-lg cursor-pointer",
        "hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]",
        aspectRatio
      )}
      onClick={onClick}
    >
      <Image
        src={image.imageUrl}
        alt={image.altText}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
        {image.description && (
          <p className="text-white/90 text-sm line-clamp-2">
            {image.description}
          </p>
        )}
      </div>
    </div>
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
