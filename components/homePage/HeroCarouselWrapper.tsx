"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

interface HeroCarouselWrapperProps {
  children: ReactNode;
}

const AUTOPLAY_DELAY_MS = 6000;

export function HeroCarouselWrapper({ children }: HeroCarouselWrapperProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  // No pause-on-hover: the hero fills the screen, so the cursor is almost
  // always over it and the slides would rarely advance. Autoplay already
  // pauses while the tab is hidden, and the timer restarts after every slide
  // change (below), so a manual change always gets a full 6s on screen.
  // Created once and kept stable across renders (embla re-initialises when
  // the plugin list changes).
  const [autoplay] = useState(() =>
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      playOnInit: true,
    }),
  );
  const [plugins] = useState(() => [autoplay, Fade()]);

  useEffect(() => {
    if (!api) return;

    // Respect reduced-motion settings: show slides, don't rotate them.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
    }

    const sync = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };
    // Dots, arrows, keyboard and swipes all land here, as do autoplay's own
    // changes, so restarting the timer on every select keeps a steady pace.
    const onSelect = () => {
      setSelected(api.selectedScrollSnap());
      autoplay.reset();
    };

    sync();
    api.on("select", onSelect);
    api.on("reInit", sync);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", sync);
    };
  }, [api, autoplay]);

  return (
    <Carousel
      setApi={setApi}
      plugins={plugins}
      className="w-full h-full"
      opts={{
        loop: true,
        duration: 45,
      }}
    >
      <CarouselContent className="h-screen">{children}</CarouselContent>

      {/* Navigation Buttons */}
      <CarouselPrevious variant="default" className="carousel-btn left-4!" />
      <CarouselNext variant="default" className="carousel-btn right-4!" />

      {count > 1 && (
        <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center pointer-events-none">
          {/* The visible track is 20px tall. Each button stays 44px tall for
              touch and overflows the track evenly above and below it. The
              9px side padding makes an inactive dot's button 24px wide (the
              WCAG 2.2 minimum target size) and keeps every gap at 18px. */}
          <div className="pointer-events-auto flex h-5 items-center rounded-full bg-black/30 px-1 backdrop-blur-sm">
            {Array.from({ length: count }).map((_, index) => {
              const isActive = index === selected;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex h-11 cursor-pointer items-center justify-center px-[9px]"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                      isActive
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/70 group-hover:bg-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Carousel>
  );
}
