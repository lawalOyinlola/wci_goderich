"use client";

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { XIcon, ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { Testimony } from "@/lib/types/testimonies";
import { getAvatarInitials } from "@/lib/utils";

interface AutoplayApi {
  play(jump?: boolean): void;
  stop(): void;
  reset(): void;
  isPlaying(): boolean;
  timeUntilNext(): number | null;
}

interface TestimonialCarouselProps {
  testimonials: Testimony[];
  autoPlayInterval?: number; // in milliseconds
  onClose?: () => void;
  className?: string;
}

interface CardPosition {
  zIndex: number;
  transform: string;
  opacity: number;
}

/**
 * Calculates the position, transform, opacity, and z-index for a card
 * in the testimonial carousel based on its position relative to the active card.
 */
function calculateCardPosition(
  index: number,
  current: number,
  totalCards: number,
  isActive: boolean,
  isPrev: boolean,
  isNext: boolean
): CardPosition {
  let zIndex = 1;
  let transformParts: string[] = [];
  let opacity = 0.3;
  let scaleValue = 0.85;

  if (isActive) {
    zIndex = 10;
    transformParts = [
      "translateX(0)",
      "translateY(0)",
      "rotate(0deg)",
    ];
    opacity = 1;
    scaleValue = 1;
  } else if (isPrev) {
    zIndex = 5;
    transformParts = [
      "translateX(-25px)",
      "translateY(15px)",
      "rotate(-3deg)",
    ];
    opacity = 0.6;
    scaleValue = 0.95;
  } else if (isNext) {
    zIndex = 5;
    transformParts = [
      "translateX(25px)",
      "translateY(15px)",
      "rotate(3deg)",
    ];
    opacity = 0.6;
    scaleValue = 0.95;
  } else {
    // Cards further away
    const distance = Math.min(
      Math.abs(index - current),
      Math.abs(index - current + totalCards),
      Math.abs(index - current - totalCards)
    );
    if (distance === 2) {
      zIndex = 2;
      transformParts =
        index < current
          ? ["translateX(-50px)", "translateY(25px)", "rotate(-5deg)"]
          : ["translateX(50px)", "translateY(25px)", "rotate(5deg)"];
      opacity = 0.4;
      scaleValue = 0.9;
    } else {
      zIndex = 1;
      transformParts =
        index < current
          ? ["translateX(-75px)", "translateY(35px)", "rotate(-7deg)"]
          : ["translateX(75px)", "translateY(35px)", "rotate(7deg)"];
      opacity = 0.2;
      scaleValue = 0.85;
    }
  }

  // Combine all transforms including scale
  const fullTransform = [
    ...transformParts,
    `scale(${scaleValue})`,
  ].join(" ");

  return {
    zIndex,
    transform: fullTransform,
    opacity,
  };
}

export function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 5000,
  onClose,
  className,
}: TestimonialCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize autoplay plugin - let it handle pause/resume automatically
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoPlayInterval,
      stopOnMouseEnter: true,
    })
  );

  // Track progress using plugin's timeUntilNext() method
  useEffect(() => {
    if (!api) return;

    const autoplay = api.plugins().autoplay as AutoplayApi | undefined;
    if (!autoplay) return;

    const updateProgress = () => {
      const timeLeft = autoplay.timeUntilNext();
      if (timeLeft !== null && timeLeft !== undefined) {
        const progressPercent =
          ((autoPlayInterval - timeLeft) / autoPlayInterval) * 100;
        setProgress(Math.max(0, Math.min(100, progressPercent)));
      }
    };

    // Update progress every 50ms for smooth animation
    const intervalId = setInterval(updateProgress, 50);

    // Listen to autoplay events
    const onTimerSet = () => {
      updateProgress();
    };

    const onTimerStopped = () => {
      // Keep current progress when stopped (e.g., on hover)
    };

    api.on("autoplay:timerset", onTimerSet);
    api.on("autoplay:timerstopped", onTimerStopped);

    return () => {
      clearInterval(intervalId);
      api.off("autoplay:timerset", onTimerSet);
      api.off("autoplay:timerstopped", onTimerStopped);
    };
  }, [api, autoPlayInterval]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const newCurrent = api.selectedScrollSnap();
      setCurrent(newCurrent);
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Reset timer on navigation using plugin's reset() method
  const handleNavigation = (direction: "prev" | "next") => {
    if (!api) return;

    // Use plugin's reset() method to reset the timer
    const autoplay = api.plugins().autoplay as AutoplayApi | undefined;
    autoplay?.reset();

    // Navigate
    if (direction === "prev") {
      api.scrollPrev();
    } else {
      api.scrollNext();
    }
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-[500px] py-12 px-4",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Close Button */}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 h-8 w-8 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all"
          aria-label="Close carousel"
        >
          <XIcon size={16} weight="bold" />
        </Button>
      )}

      {/* Carousel Container with Stacked Cards */}
      <div className="relative w-full max-w-4xl h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden">
        {/* Visible Stacked Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {testimonials.map((testimonial, index) => {
            const isActive = current === index;
            const isPrev = current === (index + 1) % testimonials.length;
            const isNext =
              current ===
              (index - 1 + testimonials.length) % testimonials.length;

            // Calculate card position using helper function
            const cardPosition = calculateCardPosition(
              index,
              current,
              testimonials.length,
              isActive,
              isPrev,
              isNext
            );

            return (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-sm sm:max-w-xl md:max-w-2xl transition-all duration-500 ease-out"
                style={{
                  zIndex: cardPosition.zIndex,
                  transform: cardPosition.transform,
                  opacity: cardPosition.opacity,
                  pointerEvents: "none",
                }}
              >
                {/* Testimonial Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
                  {/* Animated Progress Border */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `conic-gradient(from -90deg, rgb(59, 130, 246) 0deg, rgb(59, 130, 246) ${
                          (progress / 100) * 360
                        }deg, transparent ${
                          (progress / 100) * 360
                        }deg, transparent 360deg)`,
                        padding: "2px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                  )}
                  {/* Quote */}
                  <blockquote className="text-gray-700 dark:text-gray-300 italic text-lg md:text-xl leading-relaxed line-clamp-12 mb-6">
                    &quot;{testimonial.testimony}&quot;
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative inline-flex items-center justify-center">
                      <Avatar className="relative size-12 md:size-14 border-2 border-gray-200 dark:border-gray-700 z-10">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-lg font-semibold">
                          {getAvatarInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg md:text-xl line-clamp-1">
                        {testimonial.name}
                      </p>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Functional Carousel for Touch/Swipe and Auto-play */}
        <Carousel
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          opts={{
            loop: true,
            align: "center",
            duration: 40,
          }}
          className="absolute inset-0 w-full h-full pointer-events-auto"
          style={{ opacity: 0 }}
        >
          <CarouselContent className="ml-0 h-full">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="basis-full pl-0">
                <div className="h-full w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("prev")}
          disabled={!api}
          className={cn(
            "h-10 w-10 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all",
            !isHovered && "opacity-70"
          )}
          aria-label="Previous testimonial"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigation("next")}
          disabled={!api}
          className={cn(
            "h-10 w-10 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-all",
            !isHovered && "opacity-70"
          )}
          aria-label="Next testimonial"
        >
          <ArrowRightIcon size={20} weight="bold" />
        </Button>
      </div>
    </div>
  );
}
