import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

export default function GallerySkeleton() {
  return (
    <section id="gallery" className="py-20">
      <div className="container">
        <SectionHeader
          title="Photo Gallery"
          subtitle="Collections"
          description="Browse through our collection of memorable moments"
        />

        {/* Masonry Skeleton - matches GalleryContent layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 mb-12 *:mb-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "bg-muted animate-pulse rounded-lg break-inside-avoid",
                i % 3 === 0
                  ? "aspect-3/4"
                  : i % 3 === 1
                    ? "aspect-4/3"
                    : "aspect-square"
              )}
            />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-10 bg-muted animate-pulse rounded-md"
              />
            ))}
          </div>
          <div className="h-9 w-20 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    </section>
  );
}
