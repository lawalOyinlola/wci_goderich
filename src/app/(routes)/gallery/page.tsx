"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", count: 24 },
    { name: "Worship Services", count: 8 },
    { name: "Events", count: 6 },
    { name: "Ministry", count: 5 },
    { name: "Community", count: 3 },
    { name: "Building", count: 2 },
  ];

  const photos = [
    {
      id: 1,
      title: "Sunday Worship Service",
      category: "Worship Services",
      image: "/images/2025_theme.png",
      date: "December 8, 2024",
      description: "Powerful worship and preaching during our Sunday service",
    },
    {
      id: 2,
      title: "Children's Ministry",
      category: "Ministry",
      image: "/images/bg-covenant_exchange.jpg",
      date: "December 1, 2024",
      description: "Children learning about God's love through fun activities",
    },
    {
      id: 3,
      title: "Youth Conference",
      category: "Events",
      image: "/images/bg-2025_theme.jpg",
      date: "November 25, 2024",
      description: "Annual youth conference empowering young believers",
    },
    {
      id: 4,
      title: "Prayer Meeting",
      category: "Worship Services",
      image: "/images/2025_covenant_exchange.png",
      date: "November 20, 2024",
      description: "Covenant Hour of Prayer - seeking God's face together",
    },
    {
      id: 5,
      title: "Community Outreach",
      category: "Community",
      image: "/images/bg-prophetic_focus_june.jpg",
      date: "November 15, 2024",
      description: "Serving our community with love and compassion",
    },
    {
      id: 6,
      title: "Bible Study Group",
      category: "Ministry",
      image: "/images/prophetic_focus_june.png",
      date: "November 10, 2024",
      description: "Deep diving into God's Word together",
    },
    {
      id: 7,
      title: "Christmas Carol Service",
      category: "Events",
      image: "/images/2025_theme.png",
      date: "December 24, 2023",
      description: "Celebrating the birth of our Savior with carols",
    },
    {
      id: 8,
      title: "Main Auditorium",
      category: "Building",
      image: "/images/bg-covenant_exchange.jpg",
      date: "October 2024",
      description: "Our beautiful 1,500-seater sanctuary",
    },
    {
      id: 9,
      title: "Women's Ministry",
      category: "Ministry",
      image: "/images/bg-2025_theme.jpg",
      date: "October 15, 2024",
      description: "Women growing together in faith and fellowship",
    },
    {
      id: 10,
      title: "Men's Breakfast",
      category: "Events",
      image: "/images/2025_covenant_exchange.png",
      date: "October 8, 2024",
      description: "Fellowship and Bible study over breakfast",
    },
    {
      id: 11,
      title: "Vacation Bible School",
      category: "Ministry",
      image: "/images/bg-prophetic_focus_june.jpg",
      date: "September 2024",
      description: "Children learning Bible stories through fun activities",
    },
    {
      id: 12,
      title: "Church Dedication",
      category: "Building",
      image: "/images/prophetic_focus_june.png",
      date: "August 2018",
      description: "Celebrating the dedication of our church building",
    },
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Capturing moments of faith, fellowship, and ministry
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.name
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

      {/* Photo Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {selectedCategory === "All"
                ? "All Photos"
                : `${selectedCategory} Photos`}
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              {selectedCategory === "All"
                ? "Browse through our collection of church photos and memories"
                : `Explore photos from our ${selectedCategory.toLowerCase()} activities`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative group">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      View Full Size
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {photo.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">
                    {photo.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-3 line-clamp-2">
                    {photo.description}
                  </p>
                  <p className="text-xs text-foreground/50">{photo.date}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📷
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                No Photos Found
              </h3>
              <p className="text-foreground/70">
                No photos available for the selected category. Please try
                another category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Album */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Featured Album: Annual Revival Conference
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Highlights from our most recent revival conference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.slice(0, 3).map((photo, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg"
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{photo.title}</h3>
                    <p className="text-sm opacity-90">{photo.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/events"> View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Share Your Photos */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Share Your Photos
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Have photos from church events or activities? Share them with our
            church family!
          </p>

          <div className="bg-card rounded-lg p-8">
            <p className="text-foreground/80 mb-6">
              We love seeing photos from our church community. Whether it&apos;s
              from a service, event, or just everyday moments of fellowship,
              your photos help us celebrate our church family.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Submit Photos</Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/events">View Events</Link>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">
                Photo Guidelines
              </h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• High-quality photos (minimum 1MB)</li>
                <li>• Include event name and date</li>
                <li>• Respect privacy - get permission when needed</li>
                <li>• Focus on church activities and fellowship</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Be Part of Our Story</h2>
          <p className="text-xl mb-8 opacity-90">
            Join us for services and events to create memories that will be
            captured in our gallery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/services"> Service Times</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/events">Upcoming Events</Link>
            </Button>

            <Button variant="secondary" size="lg" asChild>
              <Link href="/services">Service Times</Link>
            </Button>

            <Button variant="secondary" size="lg" asChild>
              <Link href="/events"> Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
