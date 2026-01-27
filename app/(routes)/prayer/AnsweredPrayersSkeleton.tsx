import { Skeleton } from "@/components/ui/skeleton";
import { calculateCardPosition } from "@/lib/utils/carousel";

/**
 * Skeleton component for Answered Prayers section
 * Matches the AnsweredPrayerCarousel layout with stacked cards
 * Uses calculateCardPosition to ensure layout consistency with the actual carousel
 */
export function AnsweredPrayersSkeleton() {
  // Simulate a carousel with 5 cards, with card at index 0 as the active one
  const totalCards = 5;
  const currentIndex = 0;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px]">
      {/* Carousel Container with Stacked Cards */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center overflow-hidden">
        {/* Visible Stacked Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {Array.from({ length: totalCards }).map((_, index) => {
            const isActive = currentIndex === index;
            const isPrev = currentIndex === (index + 1) % totalCards;
            const isNext =
              currentIndex === (index - 1 + totalCards) % totalCards;

            // Calculate card position using the same helper function as the carousel
            const cardPosition = calculateCardPosition(
              index,
              currentIndex,
              totalCards,
              isActive,
              isPrev,
              isNext
            );

            return (
              <div
                key={index}
                className="absolute w-full max-w-sm sm:max-w-xl md:max-w-2xl transition-all duration-500 ease-out"
                style={{
                  zIndex: cardPosition.zIndex,
                  transform: cardPosition.transform,
                  opacity: cardPosition.opacity,
                  pointerEvents: "none",
                }}
              >
                {/* Testimonial Card Skeleton */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Quote Skeleton */}
                  <div className="space-y-3 mb-6">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-5 w-3/4" />
                  </div>

                  {/* Author Info Skeleton */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 md:h-14 md:w-14 rounded-full shrink-0" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <Skeleton className="h-5 w-32 md:w-40" />
                      <Skeleton className="h-4 w-24 md:w-28" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows Skeleton */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </div>
  );
}
