"use client";

import { useRef } from "react";
import { CHURCH_INFO } from "@/lib/constants";
import { ArrowDownIcon, PlayCircleIcon } from "@phosphor-icons/react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { VideoDialog, type VideoDialogRef } from "@/components/ui/video-dialog";

export default function HeroSection() {
  const { CORE_VALUES } = CHURCH_INFO;
  const videoDialogRef = useRef<VideoDialogRef>(null);

  return (
    <main className="overflow-hidden">
      <section className="bg-linear-to-b to-muted from-background">
        <div className="relative min-h-screen flex-center">
          <div className="relative z-10 small-container">
            <div className="md:w-1/2">
              <div>
                <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">
                  Welcome to Winners Chapel Int&apos;l Goderich
                </h1>
                <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">
                  A Living Faith Church, <br /> Spreading the Gospel and
                  Transforming Lives
                </p>

                <div className="flex items-center gap-3">
                  <AnimatedButton
                    href="#"
                    text="Our Services"
                    icon={<ArrowDownIcon weight="bold" />}
                    size="lg"
                  />
                  <AnimatedButton
                    variant="outline"
                    text="Watch Video"
                    icon={<PlayCircleIcon weight="duotone" />}
                    size="lg"
                    onClick={(e) => {
                      e.preventDefault();
                      videoDialogRef.current?.open();
                    }}
                  />
                </div>
              </div>

              <div className="mt-10">
                <p className="text-muted-foreground">Our Core Values :</p>
                <div className="mt-2 mr-1 grid grid-cols-3 gap-4">
                  {CORE_VALUES.map((value, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 border-l-2 border-muted-foreground/20 pl-2"
                    >
                      <h3 className="font-great-vibes tracking-widest">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0 md:z-20">
            <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border before:pointer-events-none">
              <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                <VideoDialog
                  ref={videoDialogRef}
                  videoSrc="/videos/about_us_hero.mp4"
                  thumbnailSrc="/images/about_us_hero.png"
                  thumbnailAlt="About Us Hero"
                  className="h-full"
                  imgWidth={2880}
                  imgHeight={1842}
                  imgClassName="h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
