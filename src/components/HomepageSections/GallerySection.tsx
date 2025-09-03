"use client";

import Image from "next/image";
import SectionHeader from "../SectionHeader";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    alt: "Church Interior",
    title: "Beautiful Church Interior",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    alt: "Church Service",
    title: "Sunday Service",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
    alt: "Prayer Time",
    title: "Prayer and Worship",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Church Community",
    title: "Church Community",
  },
  {
    src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600&fit=crop",
    alt: "Bible Study",
    title: "Bible Study Group",
  },
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    alt: "Worship Service",
    title: "Worship Service",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    alt: "Church Building",
    title: "Church Building",
  },
];

export default function GallerySection() {
  return (
    <section className="py-20">
      <SectionHeader
        title="Photo Collections"
        subtitle="Gallery"
        description="Pictures from documented events,special occasions and during service"
      />

      {/* <div
        className="relative transition-all duration-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel
          setApi={setApi}
          plugins={[
            AutoScroll({
              speed: 1.5,
              startDelay: 500,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ]}
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full px-4 fade-out-sides"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem
                key={index}
                className="group sm:basis-1/2 md:max-2xl:basis-1/3 2xl:basis-1/4"
              >
                <div className="relative aspect-[1] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold translate-y-20 transition-all duration-600 group-hover:translate-y-0">
                      {image.title || image.alt}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

         
          <div
            className={`transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white hover:scale-110 transition-all duration-200" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/20 text-white hover:scale-110 transition-all duration-200" />
          </div>
        </Carousel>
      </div> */}
      <div className="relative">
        <InfiniteSlider speed={100} speedOnHover={40} gap={16}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative w-64 md:w-80 aspect-square rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-all duration-500"
                priority={index === 0}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 group-hover:opacity-100 opacity-0 transition-all duration-600">
                <h3 className="text-white text-lg font-lora font-semibold translate-y-20 transition-all duration-600 group-hover:translate-y-0">
                  {image.title || image.alt}
                </h3>
              </div>
            </div>
          ))}
        </InfiniteSlider>
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-[80px] md:w-[200px]"
          direction="left"
          blurIntensity={0.7}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-[80px] md:w-[200px]"
          direction="right"
          blurIntensity={0.7}
        />
      </div>
    </section>
  );
}
