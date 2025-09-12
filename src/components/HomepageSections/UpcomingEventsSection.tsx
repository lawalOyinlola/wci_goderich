"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionHeader from "../SectionHeader";

const events = [
  {
    title:
      "Sharing Our Faith & Gospel through Christ the teacher of all things",
    time: "8:30am - 11:30am",
    pastor: "Pastor Abel Ukweni",
    address: "WCI Goderich Church, Sierra Leone",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "I will Restore Health Unto you",
    time: "8:30am - 11:30am",
    pastor: "Pastor Lungi Kamara",
    address: "Church Premises",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80",
  },
  {
    title: "Youth Alive Fellowship Service",
    time: "8:30am - 11:30am",
    pastor: "Youth Alive Fellowship",
    address: "WCI Goderich Church, Sierra Leone",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=400&fit=crop&q=80",
  },
  // {
  //   title: "Sharing Our Faith & Gospel",
  //   time: "8:30am - 11:30am",
  //   pastor: "Business Men Fellowship",
  //   address: "203 Fake St. Mountain View, San Francisco, California, USA",
  //   image: "/images/bg-2025_theme.jpg",
  // },
  // {
  //   title: "Sharing Our Faith & Gospel",
  //   time: "8:30am - 11:30am",
  //   pastor: "Children's Ministry",
  //   address: "203 Fake St. Mountain View, San Francisco, California, USA",
  //   image: "/images/2025_theme.png",
  // },
];

export default function UpcomingEventsSection() {
  return (
    <section
      className="py-24 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/bg-covenant_exchange.jpg')" }}
    >
      <div className="max-w-500 w-full mx-auto px-4">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Events"
          description="Stay connected and join us for our upcoming church events."
          titleClassName="text-primary-foreground"
          subtitleClassName="text-primary-foreground"
          descriptionClassName="text-primary-foreground"
        />

        {/* flex-wrap layout with equal card sizes and centered wrap */}
        <div className="flex flex-wrap justify-center gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="cursor-pointer flex h-[300px] w-full flex-row items-stretch sm:w-[calc(50%-theme(spacing.8)/2)] lg:w-[calc(33.333%-theme(spacing.8)/1.5)] max-w-[560px]"
            >
              <div className="relative h-15/16 w-3/7 self-end">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-full w-3/5 bg-card p-6 pt-18 text-card-foreground flex flex-col gap-3 justify-start">
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
