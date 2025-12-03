"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { slides } from "@/lib/homePage/data";

export default function HeroCarousel() {
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
    <section className="relative overflow-hidden">
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
        <CarouselContent className="h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full p-0">
              <div className="relative h-full">
                {/* Background */}
                <div
                  className="absolute inset-0 transition-all duration-700 bg-cover bg-center"
                  style={{
                    background: slide.backgroundImage
                      ? `url(${slide.backgroundImage}) center/cover no-repeat`
                      : slide.background,
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex items-center justify-center text-white z-10">
                  <div className="text-center max-w-6xl mx-auto px-4">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={3000}
                        height={0}
                        className="mx-auto"
                        priority={true}
                      />
                    ) : (
                      <>
                        <div className="flex items-center justify-center text-lg uppercase tracking-[0.2em] mb-4 font-light gap-6 max-sm:gap-4 px-4">
                          <Separator className="w-20! sm:w-45! bg-gray-300" />

                          <p className="font-lg font-stretch-125%">
                            {slide.subtitle}
                          </p>

                          <Separator className="w-20! sm:w-45! bg-gray-300" />
                        </div>

                        <h1 className="sm:text-6xl font-bold mb-8 leading-tight text-5xl">
                          {slide.title}
                        </h1>
                        {slide.description && (
                          <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto px-4">
                            {slide.description}
                          </p>
                        )}
                      </>
                    )}

                    {slide.buttons && (
                      <div className="flex gap-4 sm:gap-6 justify-center flex-wrap px-4">
                        {slide.buttons.map((btn) => (
                          <Button
                            key={btn.link}
                            variant="secondary"
                            size="lg"
                            className="min-w-22 sm:min-w-40 bg-secondary hover:bg-secondary/80"
                            asChild
                          >
                            <Link href={btn.link}>{btn.text}</Link>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="carousel-btn left-4!" />
        <CarouselNext className="carousel-btn right-4!" />

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              onClick={() => scrollTo(index)}
              variant="ghost"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current - 1 ? "true" : undefined}
              className={`w-2 h-2 p-0 rounded-full transition-all duration-300 ${
                index === current - 1
                  ? "bg-white w-8 scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
