"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import { AspectRatio } from "../ui/aspect-ratio";

const events = [
  {
    title:
      "Sharing Our Faith & Gospel through chirst the teacher of all things",
    time: "8:30am - 11:30am",
    pastor: "Abel Ukweni",
    address: "203 Fake St. Mountain View, San Francisco, California, USA",
    image: "/images/2025_theme.png",
  },
  {
    title: "I will Restore Health Unto you",
    time: "8:30am - 11:30am",
    pastor: "Lungi xxx",
    address: "Church Premises",
    image: "/images/bg-2025_theme.jpg",
  },
  {
    title: "Sharing Our Faith & Gospel",
    time: "8:30am - 11:30am",
    pastor: "Youth Alive Fellowship",
    address: "203 Fake St. Mountain View, San Francisco, California, USA",
    image: "/images/2025_theme.png",
  },
  {
    title: "Sharing Our Faith & Gospel",
    time: "8:30am - 11:30am",
    pastor: "Jerry Simon",
    address: "203 Fake St. Mountain View, San Francisco, California, USA",
    image: "/images/bg-2025_theme.jpg",
  },
  {
    title: "Sharing Our Faith & Gospel",
    time: "8:30am - 11:30am",
    pastor: "Jerry Simon",
    address: "203 Fake St. Mountain View, San Francisco, California, USA",
    image: "/images/2025_theme.png",
  },
];

export default function UpcomingEventsSection() {
  return (
    <section
      className="py-24 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bg-covenant_exchange.jpg')" }}
    >
      <div className="max-w-screen mx-auto px-4">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Events"
          description="Stay connected and join us for our upcoming church events."
          titleClassName="text-primary-foreground z-99"
          subtitleClassName="text-primary-foreground"
          descriptionClassName="text-primary-foreground"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {events.map((event, index) => (
            <div key={index} className="flex flex-row items-end cursor-pointer">
              <div className="relative w-3/7 h-15/16">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="relative bg-card text-card-foreground p-6 pt-18 w-4/7 min-h-[280px] flex flex-col gap-3 justify-start">
                <div className="absolute top-6 -left-5 bg-accent text-primary-foreground px-3 pl-12 py-1 font-semibold text-sm whitespace-nowrap">
                  {event.time}
                </div>
                <p className="text-lg font-normal font-lora line-clamp-2 min-h-12 leading-6">
                  {event.title}
                </p>
                <p className="text-sm italic text-gray-500 font-lora font-normal line-clamp-1">
                  by:{" "}
                  <i className="font-lora italic text-accent">{event.pastor}</i>
                </p>
                <p className="text-sm italic text-gray-500 line-clamp-2 min-h-10">
                  {event.address}
                </p>
                <Button
                  variant="secondary"
                  className="shrink-1 mt-2 w-max"
                  asChild
                >
                  <Link href="/events">Read More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
