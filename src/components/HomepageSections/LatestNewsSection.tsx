"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import SectionHeader from "../SectionHeader";

export default function LatestNewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionHeader
        title="Latest News"
        subtitle="News"
        // description="Stay connected and join us for our upcoming church events."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <article className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d85?w=400&h=192&fit=crop&q=80"
              alt="Community Outreach"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Community Outreach</h3>
            <p className="text-gray-700 mb-4">
              Our recent outreach program brought hope to many families.
            </p>
            <Button variant="link" className="text-accent text-md font-medium">
              Read More
            </Button>
          </div>
        </article>
        <article className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=192&fit=crop&q=80"
              alt="Youth Camp"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Youth Camp</h3>
            <p className="text-gray-700 mb-4">
              Highlights from our annual youth camp and activities.
            </p>
            <Button variant="link" className="text-accent text-md font-medium">
              Read More
            </Button>
          </div>
        </article>
        <article className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a5d4?w=400&h=192&fit=crop&q=80"
              alt="Charity Drive"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Charity Drive</h3>
            <p className="text-gray-700 mb-4">
              Join us in our upcoming charity drive to support local
              communities.
            </p>
            <Button variant="link" className="text-accent text-md font-medium">
              Read More
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
