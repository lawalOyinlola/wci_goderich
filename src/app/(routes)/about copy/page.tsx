"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About WCI Goderich
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Living Faith Church Worldwide - Spreading the Gospel and
            Transforming Lives
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Our Mission & Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">
                    Mission
                  </h3>
                  <p className="text-foreground/80 text-lg leading-relaxed">
                    To preach the Word of Faith and set people free from every
                    oppression of the devil through the preaching of the word of
                    faith, bringing salvation, healing, and deliverance to all.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">
                    Vision
                  </h3>
                  <p className="text-foreground/80 text-lg leading-relaxed">
                    To be a leading force in spreading the Gospel across Sierra
                    Leone, building strong believers, and establishing a
                    community of faith that impacts generations.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/2025_theme.png"
                alt="Church Mission"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Church History */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Our Journey of Faith
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              From humble beginnings to a thriving community of believers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2013
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Foundation
              </h3>
              <p className="text-foreground/70">
                Official inauguration of WCI Goderich under the leadership of
                Bishop Dr. David Oyedepo
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2018
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Growth
              </h3>
              <p className="text-foreground/70">
                Expanded to a 1,500-seater auditorium with dedicated Children
                and Teens Church
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2025
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Future
              </h3>
              <p className="text-foreground/70">
                Continuing to expand God&apos;s kingdom and reach more souls
                across Sierra Leone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Our Core Values
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✝️
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Faith
              </h3>
              <p className="text-foreground/70">
                Living by faith and not by sight, trusting in God&apos;s
                promises
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ❤️
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Love
              </h3>
              <p className="text-foreground/70">
                Demonstrating God&apos;s love through compassion and service
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📖
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Word
              </h3>
              <p className="text-foreground/70">
                Teaching and living by the truth of God&apos;s Word
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🌍
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Mission
              </h3>
              <p className="text-foreground/70">
                Reaching out to share the Gospel with everyone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Our Leadership
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Guided by faithful servants of God
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-primary to-primary-700"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Bishop Dr. David Oyedepo
                </h3>
                <p className="text-primary font-medium mb-3">
                  Founder & Presiding Bishop
                </p>
                <p className="text-foreground/70 text-sm">
                  Living Faith Church Worldwide
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-accent to-accent-600"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Pastor Jerry Simon
                </h3>
                <p className="text-primary font-medium mb-3">Senior Pastor</p>
                <p className="text-foreground/70 text-sm">WCI Goderich</p>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-secondary to-secondary-700"></div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Church Council
                </h3>
                <p className="text-primary font-medium mb-3">Leadership Team</p>
                <p className="text-foreground/70 text-sm">
                  Dedicated servants guiding our ministry
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Us in Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a community that&apos;s making a difference in Sierra
            Leone and beyond
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
