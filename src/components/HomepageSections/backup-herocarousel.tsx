import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Route } from "next";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      const threshold = 50; // minimum swipe distance
      if (distance > threshold) {
        nextSlide();
      } else if (distance < -threshold) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with transition */}
      <div
        className="absolute inset-0 transition-all duration-700 bg-cover bg-center"
        style={{
          background: slides[currentSlide].bg_image
            ? `url(${slides[currentSlide].bg_image}) center/cover no-repeat`
            : slides[currentSlide].background,
        }}
      />

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        className="absolute left-4 z-20 rounded-full p-2.5! h-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </Button>
      <Button
        onClick={nextSlide}
        className="absolute right-4 z-20 rounded-full p-2.5! h-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </Button>

      {/* Content */}
      <div className="relative text-center text-white z-10 max-w-6xl mx-auto px-0">
        {slides[currentSlide].image ? (
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            width={3000}
            height={0}
            className="mx-auto"
          />
        ) : (
          <>
            <div className="flex items-center justify-center text-lg uppercase tracking-[0.2em] mb-4 font-light gap-6">
              <span className="h-px bg-gray-300 w-40"></span>
              <h2>{slides[currentSlide].subtitle}</h2>
              <span className="h-px bg-gray-300 w-40"></span>
            </div>

            <h1 className="text-7xl font-bold mb-8 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-12 opacity-80 max-w-2xl mx-auto">
              {slides[currentSlide].description}
            </p>
          </>
        )}

        {slides[currentSlide].buttons && (
          <div className="flex gap-6 justify-center">
            {slides[currentSlide].buttons.map((btn) => (
              <Button
                key={btn.link}
                variant="outline"
                className="min-w-40"
                asChild
              >
                <Link href={btn.link as Route}>{btn.text}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 p-0 rounded-full ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
