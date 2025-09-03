import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "../ui/separator";
import Fade from "embla-carousel-fade";
import { AspectRatio } from "../ui/aspect-ratio";

const slides = [
  {
    title: "WINNERS CHAPEL INT'L GODERICH",
    subtitle: "WELCOME",
    description:
      "Making a difference in our community through acts of service and love.",
    background: "linear-gradient(135deg, #004e92 0%, #1a1a1a 100%)",
    buttons: [
      {
        text: "Read More",
        link: "/prophetic-focus-june",
      },
      {
        text: "Services",
        link: "/services",
      },
      {
        text: "Listen",
        link: "/giving",
      },
    ],
  },
  {
    title: "WISDOM IS BETTER THAN WEAPONS OF WAR",
    subtitle: "PROPHETIC FOCUS - JUNE",
    description: "on their own accord in my life this year.",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)",
    bg_image: "./images/bg-prophetic_focus_june.jpg",
    image: "/images/prophetic_focus_june.png",
    buttons: [
      {
        text: "Read More",
        link: "/events",
      },
      {
        text: "Download",
        link: "https://faithtabernacle.org.ng/",
      },
    ],
  },
  {
    title: "MY NEW ERA",
    subtitle: "PROPHETIC THEME - 2025",
    description: "",
    background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    bg_image: "/images/bg-2025_theme.jpg",
    image: "/images/2025_theme.png",
    buttons: [
      {
        text: "Read More",
        link: "/about",
      },
    ],
  },
  {
    title: "GREAT THINGS SHALL CONTINUE TO HAPPEN",
    subtitle: "PRAISE GOD 2025 IS MY NEW ERA",
    description: "on their own accord in my life this year.",
    background: "linear-gradient(135deg, #2d3436 0%, #000428 100%)",
    bg_image: "/images/bg-covenant_exchange.jpg",
    image: "/images/2025_covenant_exchange.png",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<any>();
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

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
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
        <CarouselContent className="h-[97vh]">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full p-0">
              <div className="relative h-full">
                {/* Background */}
                <div
                  className="absolute inset-0 transition-all duration-700 bg-cover bg-center"
                  style={{
                    background: slide.bg_image
                      ? `url(${slide.bg_image}) center/cover no-repeat`
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
                        priority={index === 0}
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
                            // className="min-w-40 border-background text-accent-foreground hover:bg-background hover:text-gray-900 transition-colors"
                            className="min-w-22 sm:min-w-40 bg-secondary hover:bg-secondary/80"
                            asChild
                          >
                            <Link href={btn.link as Route}>{btn.text}</Link>
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
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/20 border-white/30 text-white hover:text-white transition-all duration-200 backdrop-blur-sm" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/20 border-white/30 text-white hover:text-white transition-all duration-200 backdrop-blur-sm" />

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              onClick={() => scrollTo(index)}
              variant="ghost"
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
