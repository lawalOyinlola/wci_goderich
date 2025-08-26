"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SectionHeader from "../SectionHeader";

const events = [
  {
    title: "Sharing Our Faith & Gospel",
    time: "8:30am - 11:30am",
    pastor: "Jerry Simon",
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
      className="py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-covenant_exchange.jpg')" }}
    >
      <div className="max-w-screen mx-auto px-4">
        {/*
        <div className="text-center mb-16 text-white">
           <div className="flex items-center justify-center text-sm text-white uppercase tracking-[0.4em] mb-4 font-light gap-6">
            <span className="h-px bg-white w-40"></span>
            <h2>Events</h2>
            <span className="h-px bg-white w-40"></span>
          </div>
          <h2 className="text-4xl font-bold mb-4"> Upcoming Events</h2>
          <p className="max-w-2xl mx-auto">
            Stay connected and join us for our upcoming church events.
          </p>
        </div> */}

        <SectionHeader
          title="Upcoming Events"
          subtitle="Events"
          description="Stay connected and join us for our upcoming church events."
          titleClassName="text-primary-foreground"
          subtitleClassName="text-primary-foreground"
          descriptionClassName="text-primary-foreground"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="flex flex-row items-end cursor-pointer">
              <div className="relative w-6/13 h-15/16">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative bg-card text-card-foreground p-6 pt-18 w-7/13 min-h-[250px] flex flex-col gap-3 justify-start">
                <div className="absolute top-6 -left-5 bg-accent text-primary-foreground px-3 pl-12 py-1.5 font-semibold text-sm whitespace-nowrap">
                  {event.time}
                </div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-sm italic text-gray-500">
                  by pastor:{" "}
                  <span className="font-semibold">{event.pastor}</span>
                </p>
                <p className="text-sm italic text-gray-500">{event.address}</p>
                <Button
                  variant="secondary"
                  className="shrink-1 mt-4 w-max"
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
