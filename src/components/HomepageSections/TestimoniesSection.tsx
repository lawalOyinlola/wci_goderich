import { useState } from "react";
import Link from "next/link";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import SectionHeader from "@/components/SectionHeader";

const testimonies = [
  {
    id: 1,
    name: "Ben Bernard",
    role: "Instacart",
    testifier:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "👨‍💻",
  },
  {
    id: 2,
    name: "Kevin Whinnery",
    role: "OpenAI",
    testimony:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🚀",
  },
  {
    id: 3,
    name: "Sawyer Hood",
    role: "Figma",
    testimony: "Cursor is hands down my biggest workflow improvement in years",
    avatar: "🎨",
  },
  {
    id: 4,
    name: "Andrew Milich",
    role: "Notion",
    testimony:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "⚡",
  },
  {
    id: 5,
    name: "Morgan McGuire",
    role: "Weights & Biases",
    testimony:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🔬",
  },
  {
    id: 6,
    name: "Alex MacCaw",
    role: "Reflect",
    testimony:
      "Cursor is the best product I've used in a while - it's an AI enabled editor. I just asked it to write a README for a project I've been working on - analyzed the code-base and worked first time. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.Cursor is the best product I've used in a while - it's an AI enabled editor. I just asked it to write a README for a project I've been working on - analyzed the code-base and worked first time. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "📝",
  },
  {
    id: 7,
    name: "Johannes Schickling",
    role: "Prisma",
    testimony:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "⚙️",
  },
  {
    id: 8,
    name: "Wes Bos",
    role: "Internet",
    testimony:
      "I really like how Cursor suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🌐",
  },
  {
    id: 9,
    name: "Wes Bos",
    role: "Internet",
    testimony:
      "I really like how Cursor suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🌐",
  },
  {
    id: 10,
    name: "Wes Bos",
    role: "Internet",
    testimony:
      "I really like how Cursor suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🌐",
  },
  {
    id: 11,
    name: "Wes Bos",
    role: "Internet",
    testimony:
      "I really like how Cursor suggests edits to existing code. It noticed I was inconsistent with my markup and popped up this suggestion that matched my other items. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
    avatar: "🌐",
  },
];

export default function TestimoniesSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
                    className="relative group flex flex-col justify-between bg-card dark:bg-background gap-4 aspect-[4/3] backdrop-blur-sm rounded-xl p-6 border border-border shadow-sm overflow-hidden"
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
                      <BorderTrail
                        className="bg-linear-to-l from-secondary-foreground via-chart-4 to-chart-5"
                        size={260}
                      />
                    )}

                    <ScrollArea className="grow">
                      <blockquote className="mb-4 leading-relaxed text-sm duration-300 transition-all">
                        &quot;{testifier.testimony}&quot;
                      </blockquote>
                    </ScrollArea>

                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{testifier.avatar}</div>
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

        <div className="text-center mt-16">
          <div className="text-primary-foreground bg-gradient-to-br from-accent via-[#f97316] to-[#f59e0b] rounded-2xl p-8 mx-auto max-w-2xl relative overflow-hidden">
            <h3 className="text-2xl font-bold font-lora mb-4">
              Share Your Testimony
            </h3>
            <p className="mb-6">
              Has God worked in your life? We&apos;d love to hear your story and
              share it with our community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="hover:border-accent"
                asChild
              >
                <Link href="/testimonies">View Testimonies</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-background! hover:bg-accent!"
                asChild
              >
                <Link href="/testimonies">Share Your Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
