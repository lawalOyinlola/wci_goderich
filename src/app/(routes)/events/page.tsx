"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const upcomingEvents = [
  {
    title: "Annual Revival Conference",
    date: "December 15-17, 2024",
    time: "6:00 PM Daily",
    location: "WCI Goderich Auditorium",
    description:
      "Join us for three powerful nights of spiritual renewal, healing, and breakthrough. Special guest speakers and anointed worship.",
    image: "/images/2025_theme.png",
    category: "Conference",
    featured: true,
  },
  {
    title: "Christmas Carol Service",
    date: "December 24, 2024",
    time: "7:00 PM",
    location: "WCI Goderich Auditorium",
    description:
      "Celebrate the birth of our Savior with traditional carols, special performances, and a message of hope.",
    image: "/images/bg-covenant_exchange.jpg",
    category: "Celebration",
  },
  {
    title: "New Year's Prayer Service",
    date: "January 1, 2025",
    time: "12:00 AM",
    location: "WCI Goderich Auditorium",
    description:
      "Start the new year in prayer and thanksgiving. Join us for a powerful night of intercession and worship.",
    image: "/images/bg-2025_theme.jpg",
    category: "Prayer",
  },
  {
    title: "Youth Empowerment Summit",
    date: "January 25, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "WCI Goderich Youth Center",
    description:
      "A day of inspiration, workshops, and fellowship for young people to grow in faith and leadership.",
    image: "/images/2025_covenant_exchange.png",
    category: "Youth",
  },
  {
    title: "Women's Conference",
    date: "February 8, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "WCI Goderich Auditorium",
    description:
      "A special gathering for women to be encouraged, equipped, and empowered in their faith journey.",
    image: "/images/bg-prophetic_focus_june.jpg",
    category: "Women",
  },
  {
    title: "Men's Breakfast & Bible Study",
    date: "February 15, 2025",
    time: "7:00 AM - 9:00 AM",
    location: "WCI Goderich Fellowship Hall",
    description:
      "Fellowship over breakfast while studying God's Word and building strong relationships.",
    image: "/images/prophetic_focus_june.png",
    category: "Men",
  },
];

const eventCategories = [
  { name: "All Events", count: upcomingEvents.length, active: true },
  { name: "Conference", count: 1, active: false },
  { name: "Celebration", count: 1, active: false },
  { name: "Prayer", count: 1, active: false },
  { name: "Youth", count: 1, active: false },
  { name: "Women", count: 1, active: false },
  { name: "Men", count: 1, active: false },
];

export default function EventsPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Join us for inspiring events that will strengthen your faith
          </p>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-12 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {eventCategories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  category.active
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-foreground/70 hover:bg-muted/80"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
              Featured Event
            </span>
          </div>

          {upcomingEvents
            .filter((event) => event.featured)
            .map((event, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                      {event.title}
                    </h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-foreground/70">
                        <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                          📅
                        </span>
                        {event.date}
                      </div>
                      <div className="flex items-center text-foreground/70">
                        <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                          ⏰
                        </span>
                        {event.time}
                      </div>
                      <div className="flex items-center text-foreground/70">
                        <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3">
                          📍
                        </span>
                        {event.location}
                      </div>
                    </div>
                    <p className="text-foreground/80 text-lg mb-8 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="outline" size="lg" className="flex-1">
                        Register Now
                      </Button>
                      <Button variant="outline" size="lg" className="flex-1">
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* All Events Grid */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              All Events
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Browse through our upcoming events and mark your calendar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents
              .filter((event) => !event.featured)
              .map((event, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4 text-sm text-foreground/70">
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                          📅
                        </span>
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                          ⏰
                        </span>
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-2">
                          📍
                        </span>
                        {event.location}
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Event Calendar */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Event Calendar
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Plan ahead and never miss an important event
            </p>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  December 2024
                </h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground">Dec 15-17</p>
                    <p className="text-sm text-foreground/70">
                      Annual Revival Conference
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground">Dec 24</p>
                    <p className="text-sm text-foreground/70">
                      Christmas Carol Service
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  January 2025
                </h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground">Jan 1</p>
                    <p className="text-sm text-foreground/70">
                      New Year&apos;s Prayer Service
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground">Jan 25</p>
                    <p className="text-sm text-foreground/70">
                      Youth Empowerment Summit
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  February 2025
                </h3>
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground">Feb 8</p>
                    <p className="text-sm text-foreground/70">
                      Women&apos;s Conference
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="font-semibold text-foreground">Feb 15</p>
                    <p className="text-sm text-foreground/70">
                      Men&apos;s Breakfast & Bible Study
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Get notified about upcoming events and never miss an opportunity to
            grow in faith
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact"> Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/media">Watch Previous Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
