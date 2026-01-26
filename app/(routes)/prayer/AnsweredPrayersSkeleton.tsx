import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton component for Answered Prayers section
 * Matches the TestimonialCarousel layout with stacked cards
 */
export function AnsweredPrayersSkeleton() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[400px]">
      {/* Carousel Container with Stacked Cards */}
      <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center overflow-hidden">
        {/* Visible Stacked Cards - showing 3 cards like the carousel */}
        <div className="relative w-full h-full flex items-center justify-center">
          {[0, 1, 2, 3, 4].map((index) => {
            // Simulate the stacked card positioning
            const isCardOne = index === 1;
            const isCardTwo = index === 2;
            const isCardThree = index === 3;
            const isCardFour = index === 4;

            // Calculate z-index and positioning similar to carousel
            let zIndex = 10;
            let transform = "translateX(0) scale(1)";
            let opacity = 1;

            if (isCardOne) {
              zIndex = 5;
              transform = "translate(-6%, 6%) scale(0.9) rotate(-4deg)";
              opacity = 0.5;
            } else if (isCardTwo) {
              zIndex = 5;
              transform = "translate(6%, 6%) scale(0.9) rotate(4deg)";
              opacity = 0.5;
            } else if (isCardThree) {
              zIndex = 4;
              transform = "translate(-7%, 8%) scale(0.9) rotate(-6deg)";
              opacity = 0.4;
            } else if (isCardFour) {
              zIndex = 4;
              transform = "translate(7%, 8%) scale(0.9) rotate(6deg)";
              opacity = 0.4;
            }

            return (
              <div
                key={index}
                className="absolute w-full max-w-sm sm:max-w-xl md:max-w-2xl transition-all duration-500 ease-out"
                style={{
                  zIndex,
                  transform,
                  opacity,
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
