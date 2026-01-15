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

        {/* Masonry Layout Skeleton - 21 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {Array.from({ length: 3 }).map((_, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`
                    bg-muted animate-pulse rounded-lg
                    ${
                      i % 3 === 0
                        ? "aspect-3/4"
                        : i % 3 === 1
                        ? "aspect-video"
                        : "aspect-square"
                    }
                  `}
                />
              ))}
            </div>
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
