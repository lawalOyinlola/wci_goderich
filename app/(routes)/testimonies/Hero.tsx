"use client";

import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <>
      <main className="overflow-hidden relative bg-[url(/images/testimonies-hero.jpeg)] bg-cover bg-center ">
        <div className="bg-black/30 absolute inset-0" />
        <div className="bg-background/50 absolute inset-y-0 h-2/1 w-1/2 rounded-r-full backdrop-blur-[2px]" />
        <div className="bg-background/50 absolute inset-y-0 w-4/7 rounded-r-full backdrop-blur-[2px]" />
        <section>
          <div className="pb-24 pt-12">
            <div className="relative small-container flex flex-col lg:flex-center">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  Stories of Faith and Transformation
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">
                  Discover the powerful testimonies of our members as they share
                  how God has transformed their lives.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <AnimatedButton
                    href="#testimonies"
                    text="View Testimonies"
                    icon={<ArrowDownIcon weight="bold" />}
                    size="lg"
                  />
                  <AnimatedButton
                    variant="outline"
                    text="Share Your Testimony"
                    // icon={<CirclesThreePlusIcon weight="duotone" />}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
