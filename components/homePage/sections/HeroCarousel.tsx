import Image from "next/image";
import { slides } from "@/lib/homePage/data";
import { HeroCarouselWrapper } from "../HeroCarouselWrapper";
import { CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden">
      <HeroCarouselWrapper>
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

                        <p className="font-lg font-stretch-125% font-outfit!">
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
                        <AnimatedButton
                          key={btn.link}
                          size="lg"
                          variant="secondary"
                          className="min-w-22 sm:min-w-40 bg-secondary hover:bg-secondary/80"
                          text={btn.text}
                          href={btn.link}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </HeroCarouselWrapper>
    </section>
  );
}
