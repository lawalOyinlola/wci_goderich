"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";
import { DownloadIcon, PlayIcon } from "@phosphor-icons/react";

type Sermon = {
  title: string;
  date: string;
  pastor: string;
  image: string;
};

const sermons: Sermon[] = [
  {
    title: "Let the Sunset Inspire You",
    date: "JULY 01, 2025",
    pastor: "Abel Ukweni",
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    title: "Developing Spiritual Mentality",
    date: "AUGUST 01, 2025",
    pastor: "Lungi xxx",
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    title: "Let the Bible Motivate You",
    date: "AUGUST 29, 2025",
    pastor: "Abel Ukweni",
    image: "https://picsum.photos/800/600?random=3",
  },
  // {
  //   title: "Let the Sunset Inspire You",
  //   date: "JULY 01, 2019",
  //   pastor: "Jerry Simon",
  //   image: "https://picsum.photos/800/600?random=1",
  // },
  // {
  //   title: "Developing Spiritual Mentality",
  //   date: "JULY 01, 2019",
  //   pastor: "Jerry Simon",
  //   image: "https://picsum.photos/800/600?random=2",
  // },
  // {
  //   title: "Let the Bible Motivate You",
  //   date: "JULY 01, 2019",
  //   pastor: "Jerry Simon",
  //   image: "https://picsum.photos/800/600?random=3",
  // },
];

export default function SermonsSection() {
  return (
    <section className="py-24">
      <div className="container max-w-7xl! px-4">
        <SectionHeader
          title="Church Sermons"
          subtitle="Sermons"
          description="Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia"
        />

        {/* Flex layout with equal card widths */}
        <div className="flex flex-wrap justify-center gap-8">
          {sermons.map((sermon, index) => (
            <div
              key={index}
              className="group relative overflow-hidden text-center flex flex-col basis-full sm:basis-[calc(50%-theme(space.8)/2)] lg:basis-[calc(33.333%-theme(space.8)/1.5)] max-w-[420px]"
            >
              {/* Image Container */}
              <div className="relative aspect-[1] shadow-lg overflow-hidden">
                <Image
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 transition-all duration-500 group-hover:bg-black/60" />
                <div className="absolute inset-0 border border-[rgba(253,252,251,0.3)] m-4" />

                {/* Pastor Name */}
                <div className="absolute top-1/2 left-1/2 -translate-1/2 text-white flex flex-col items-center gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em]">
                      BY PASTOR:
                    </p>
                    <p className="font-great-vibes italic text-2xl -tracking-tight font-medium my-1">
                      {sermon.pastor}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 tracking-[0.2em]">
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-accent/80 transition-colors text-xs text-white border-none ring-white ring-[0.4px] hover:ring-accent uppercase rounded py-0! px-1.5!"
                    >
                      <PlayIcon weight="fill" />
                      Watch
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-accent/80 transition-colors text-xs text-white border-none ring-white ring-[0.4px] hover:ring-accent uppercase rounded px-1.5!"
                    >
                      <DownloadIcon weight="fill" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sermon Info */}
              <div className="p-6">
                <h3 className="text-2xl font-lora font-medium mb-1">
                  {sermon.title}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                  {sermon.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
