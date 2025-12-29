"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import CtaContainer from "@/components/CtaContainer";
import { IconComponent } from "@/components/IconComponent";
import { TestimoniesEmpty } from "@/components/testimonies/TestimoniesEmpty";
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
import { VideoDialog } from "@/components/ui/video-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AutoScroll from "embla-carousel-auto-scroll";
import type { Testimony } from "@/lib/types/testimonies";
import { cn, getEmbedUrl, getAvatarInitials } from "@/lib/utils";

interface TestimoniesProps {
  initialTestimonies?: Testimony[];
}

export default function Testimonies({
  initialTestimonies = [],
}: TestimoniesProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const testimonies = initialTestimonies;

  if (testimonies.length === 0) {
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
          <div className="px-4 mt-8">
            <TestimoniesEmpty />
          </div>
        </div>
      </section>
    );
  }

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
              {testimonies.map((testifier, index) => {
                const isVideo = testifier.type === "video";
                const isAudio = testifier.type === "audio";
                const isWritten = testifier.type === "written";

                return (
                  <CarouselItem
                    key={testifier.id}
                    className="group py-3 basis-4/5 sm:basis-3/4 md:basis-2/3 lg:basis-5/12 xl:basis-1/3 2xl:basis-2/7"
                  >
                    <div
                      className="relative group flex flex-col bg-card dark:bg-background backdrop-blur-sm p-6 border border-border shadow-sm rounded-xl overflow-hidden transition-all duration-300 aspect-4/3 justify-between gap-4"
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

                      {/* Video Testimony */}
                      {isVideo && "videoUrl" in testifier && (
                        <div className="flex flex-col h-full">
                          <div className="flex-1 relative rounded-lg overflow-hidden mb-4">
                            <VideoDialog
                              videoSrc={getEmbedUrl(testifier.videoUrl)}
                              thumbnailSrc={testifier.image}
                              thumbnailAlt={`${testifier.name} - Video Testimony`}
                              videoTitle={`${testifier.name} - Testimony`}
                              className="h-full"
                              imgClassName="object-cover h-full"
                            />
                          </div>
                          <div className="space-y-4">
                            <blockquote className="text-sm leading-relaxed line-clamp-3">
                              &quot;{testifier.testimony}&quot;
                            </blockquote>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-8">
                                <AvatarImage src={testifier.image} />
                                <AvatarFallback>
                                  {getAvatarInitials(testifier.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="font-great-vibes font-semibold text-sm tracking-wider truncate">
                                  {testifier.name}
                                </p>
                                <div className="text-xs text-muted-foreground truncate">
                                  {testifier.role}
                                </div>
                              </div>
                              <IconComponent
                                iconName="VideoCameraIcon"
                                size={16}
                                className="text-muted-foreground shrink-0"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Audio Testimony */}
                      {isAudio && "audioUrl" in testifier && (
                        <div className="flex flex-col h-full">
                          <div className="flex-1 relative rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 mb-4">
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                              <Avatar className="size-20">
                                <AvatarImage src={testifier.image} />
                                <AvatarFallback>
                                  {getAvatarInitials(testifier.name)}
                                </AvatarFallback>
                              </Avatar>
                              <Button
                                asChild
                                size="lg"
                                className="gap-2"
                                variant="default"
                              >
                                <a
                                  href={testifier.audioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <IconComponent
                                    iconName="PlayCircleIcon"
                                    size={20}
                                    className="text-current"
                                  />
                                  Listen to Audio
                                </a>
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <blockquote className="text-sm leading-relaxed line-clamp-3">
                              &quot;{testifier.testimony}&quot;
                            </blockquote>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-great-vibes font-semibold text-sm tracking-wider truncate">
                                  {testifier.name}
                                </p>
                                <div className="text-xs text-muted-foreground truncate">
                                  {testifier.role}
                                </div>
                              </div>
                              <IconComponent
                                iconName="MusicNotesIcon"
                                size={16}
                                className="text-muted-foreground shrink-0"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Written Testimony */}
                      {isWritten && (
                        <>
                          <ScrollArea className="grow">
                            <blockquote className="mb-4 leading-relaxed text-sm duration-300 transition-all">
                              &quot;{testifier.testimony}&quot;
                            </blockquote>
                          </ScrollArea>

                          <div className="flex items-center gap-3">
                            <Avatar className="size-10">
                              <AvatarImage src={testifier.image} />
                              <AvatarFallback>
                                {getAvatarInitials(testifier.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-great-vibes font-semibold text-sm tracking-wider truncate">
                                {testifier.name}
                              </p>
                              <div className="text-xs text-muted-foreground truncate">
                                {testifier.role}
                              </div>
                            </div>
                            <IconComponent
                              iconName="FileTextIcon"
                              size={16}
                              className="text-muted-foreground shrink-0"
                            />
                          </div>

                          <div
                            className={cn(
                              "absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-t from-accent/10 via-card/40 to-transparent p-4 transition-all duration-600",
                              hoveredItemId === testifier.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          >
                            <Button variant="link" size="sm">
                              Read more
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
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
