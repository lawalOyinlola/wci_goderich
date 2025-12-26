"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CtaContainer from "@/components/CtaContainer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BorderBeam } from "@/components/ui/border-beam";
import AutoScroll from "embla-carousel-auto-scroll";
import { TESTIMONIES } from "@/lib/constants";

export default function Testimonies() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const { testimonies } = TESTIMONIES;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-500 w-full mx-auto">
        <div className="px-4">
          <SectionHeader
            title="Wonders of God in the Community"
            subtitle="Testimonies"
            description="Hear from our church family about how God has worked in their lives"
          />
        </div>

        <div>
          <Carousel
            plugins={[
              AutoScroll({
                speed: 1,
                startDelay: 500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                stopOnFocusIn: false,
              }),
            ]}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full fade-out-sides"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <CarouselContent>
              {testimonies.map((testifier, index) => (
                <CarouselItem
                  key={index}
                  className="group basis-4/5 sm:basis-3/4 md:basis-2/3 lg:basis-5/12 xl:basis-1/3 2xl:basis-2/7 py-3"
                >
                  <div
                    key={index}
                    className="relative group flex flex-col justify-between bg-card dark:bg-background gap-4 aspect-4/3 backdrop-blur-sm p-6 border border-border shadow-sm rounded-xl overflow-hidden"
                    onMouseEnter={() => {
                      setHoveredItemId(testifier.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredItemId((prev) =>
                        prev === testifier.id ? null : prev
                      );
                    }}
                    onTouchStart={() => {
                      setHoveredItemId(testifier.id);
                    }}
                    onTouchEnd={() => {
                      setHoveredItemId((prev) =>
                        prev === testifier.id ? null : prev
                      );
                    }}
                    onTouchCancel={() => {
                      setHoveredItemId((prev) =>
                        prev === testifier.id ? null : prev
                      );
                    }}
                  >
                    {hoveredItemId === testifier.id && (
                      <BorderBeam
                        size={200}
                        colorFrom="var(--accent)"
                        className="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                      />
                    )}

                    <ScrollArea className="grow">
                      <blockquote className="mb-4 leading-relaxed text-sm duration-300 transition-all">
                        &quot;{testifier.testimony}&quot;
                      </blockquote>
                    </ScrollArea>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={testifier.image}
                          alt={testifier.name}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-great-vibes font-semibold text-sm tracking-wider">
                          {testifier.name}
                        </p>
                        <div className="text-xs text-gray-400">
                          {testifier.role}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-t from-accent/10 via-card/40 to-transparent p-4 transition-all duration-600 ${
                        hoveredItemId === testifier.id
                          ? "opacity-100"
                          : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <Button variant="link">Scroll down to read more</Button>
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
        </div>

        <CtaContainer
          className="mt-16 mx-4"
          title="Share Your Testimony"
          description="Has God worked in your life? We'd love to hear your story and share it with our community."
          buttons={[
            { text: "View Testimonies", href: "/testimonies" },
            { text: "Share Your Story", href: "/testimonies" },
          ]}
        />
      </div>
    </section>
  );
}
