"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
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

export function HeroCarouselWrapper({ children }: HeroCarouselWrapperProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
      playOnInit: true,
    })
  );

  const fadePlugin = useRef(Fade());

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current, fadePlugin.current]}
      className="w-full h-full"
      opts={{
        align: "center",
        loop: true,
        duration: 45,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-screen">{children}</CarouselContent>

      {/* Navigation Buttons */}
      <CarouselPrevious variant="default" className="carousel-btn left-4!" />
      <CarouselNext variant="default" className="carousel-btn right-4!" />

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {Array.from({ length: count }).map((_, index) => (
          <Button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current - 1 ? "true" : undefined}
            className={`w-2 h-2 p-0 rounded-full transition-all duration-300 ${
              index === current - 1
                ? "bg-primary w-8 scale-110"
                : "bg-primary/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
