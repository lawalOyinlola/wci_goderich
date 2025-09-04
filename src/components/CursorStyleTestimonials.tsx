import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
// import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const testimonies = [
  {
    id: 1,
    name: "Ben Bernard",
    role: "Instacart",
    testimony:
      "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
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
      "Cursor is the best product I've used in a while - it's an AI enabled editor. I just asked it to write a README for a project I've been working on - analyzed the code-base and worked first time. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought. The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what you want to do. It's enough to make you believe that eventually you'll be able to code at the speed of thought.",
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

export function CursorStyleTestimonials() {
  const { theme } = useTheme();
  const [selectedTestimony, setSelectedTestimony] = useState<number | null>(
    null
  );

  const columns = 4;
  const perColumn = Math.ceil(testimonies.length / columns);
  const columnData = Array.from({ length: columns }).map((_, colIndex) =>
    testimonies.slice(colIndex * perColumn, (colIndex + 1) * perColumn)
  );

  return (
    <section className="py-20 bg-border dark:bg-primary-foreground">
      <div className="container px-4">
        <SectionHeader
          title="Wonders of God in the Community"
          subtitle="Testimonies"
        />

        {/* Four vertical InfiniteSlider columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-screen fade-out-all-sides">
          {columnData.map((items, idx) => {
            const interactive = idx === 1 || idx === 2;
            return (
              <InfiniteSlider
                key={idx}
                direction="vertical"
                speed={25}
                gap={16}
                {...(interactive ? { speedOnHover: 5 } : {})}
                reverse={idx % 2 === 1 ? false : true}
              >
                {items.map((t, i) => (
                  <div
                    key={`${idx}-${i}`}
                    className="relative group bg-card text-card-foreground backdrop-blur-sm rounded-xl p-0 border border-border shadow-sm w-full md:w-[23rem] overflow-hidden"
                    style={{ height: "auto" }}
                  >
                    <MagicCard
                      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                      gradientSize={150}
                      className="h-full p-6 bg-card"
                    >
                      {/* <BorderTrail
                        className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-linear-to-l from-secondary-foreground via-chart-4 to-chart-5 "
                        size={200}
                      /> */}
                      <blockquote
                        className={`font-open-sans mb-4 leading-relaxed text-sm duration-300 transition-all ${
                          selectedTestimony !== t.id && "line-clamp-6"
                        }`}
                      >
                        &quot;{t.testimony}&quot;
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{t.avatar}</div>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-xs text-gray-400">{t.role}</div>
                        </div>
                      </div>
                    </MagicCard>
                    {interactive && (
                      <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-t from-accent/10 via-card/40 to-transparent p-4 group-hover:opacity-100 opacity-0 transition-all duration-600 z-1">
                        <Button
                          variant="link"
                          onClick={() => {
                            setSelectedTestimony(t.id);
                          }}
                        >
                          Read More
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </InfiniteSlider>
            );
          })}
        </div>

        <div className="grid grid-rows-2 gap-6 fade-out-sides mt-40">
          {columnData.map((items, idx) => {
            return (
              <InfiniteSlider
                key={idx}
                speed={25}
                gap={16}
                speedOnHover={5}
                reverse={idx % 2 === 1 ? false : true}
              >
                {items.map((t, i) => (
                  <div
                    key={`${idx}-${i}`}
                    className="relative group aspect-[4/3] text-card-foreground backdrop-blur-sm rounded-xl p-0 border border-border shadow-sm w-full md:max-w-[25rem] overflow-hidden"
                    style={{ height: "auto" }}
                  >
                    <MagicCard
                      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                      gradientSize={150}
                      className="h-full p-6 bg-card"
                    >
                      {/* <BorderTrail
                        className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-linear-to-l from-secondary-foreground via-chart-4 to-chart-5 "
                        size={200}
                      /> */}
                      <blockquote
                        className={`font-open-sans mb-4 leading-relaxed text-sm duration-300 transition-all ${
                          selectedTestimony !== t.id && "line-clamp-10"
                        }`}
                      >
                        &quot;{t.testimony}&quot;
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{t.avatar}</div>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-xs text-gray-400">{t.role}</div>
                        </div>
                      </div>
                    </MagicCard>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-end bg-gradient-to-t from-accent/10 via-card/40 to-transparent p-4 group-hover:opacity-100 opacity-0 transition-all duration-600 z-1">
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedTestimony(t.id);
                        }}
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                ))}
              </InfiniteSlider>
            );
          })}
        </div>
      </div>
    </section>
  );
}
