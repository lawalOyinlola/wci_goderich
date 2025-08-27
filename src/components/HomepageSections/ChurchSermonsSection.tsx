"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";

type Sermon = {
  title: string;
  date: string;
  pastor: string;
  image: string;
};

const sermons: Sermon[] = [
  {
    title: "Let the Sunset Inspire You",
    date: "JULY 01, 2019",
    pastor: "Jerry Simon",
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    title: "Developing Spiritual Mentality",
    date: "JULY 01, 2019",
    pastor: "Jerry Simon",
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    title: "Let the Bible Motivate You",
    date: "JULY 01, 2019",
    pastor: "Jerry Simon",
    image: "https://picsum.photos/800/600?random=3",
  },
  {
    title: "Let the Sunset Inspire You",
    date: "JULY 01, 2019",
    pastor: "Jerry Simon",
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    title: "Developing Spiritual Mentality",
    date: "JULY 01, 2019",
    pastor: "Jerry Simon",
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    title: "Let the Bible Motivate You",
    date: "JULY 01, 2019",
    pastor: "Jerry Simon",
    image: "https://picsum.photos/800/600?random=3",
  },
];

export default function ChurchSermonsSection() {
  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Church Sermons"
          subtitle="Sermons"
          description="Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {sermons.map((sermon, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-sm"
            >
              {/* Image Container */}
              <div className="relative aspect-[1] shadow-lg overflow-hidden">
                <Image
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:bg-black/60" />

                {/* Pastor Name */}
                <div className="absolute top-1/2 left-1/2 -translate-1/2 text-white flex flex-col items-center gap-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em]">
                      BY PASTOR:
                    </p>
                    <p className="font-serif italic text-xl mt-1">
                      {sermon.pastor}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 tracking-[0.2em]">
                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-accent transition-colors text-white border-none ring-white ring-[0.4px]  hover:ring-accent  uppercase rounded"
                    >
                      <span>▶</span> Watch
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-transparent hover:bg-accent transition-colors text-white border-none ring-white ring-[0.4px]  hover:ring-accent  uppercase rounded"
                    >
                      <span>↓</span> Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sermon Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 ">{sermon.title}</h3>
                <p className="text-sm text-gray-500">{sermon.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
