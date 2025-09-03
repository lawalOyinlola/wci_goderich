"use client";

import * as React from "react";
// import Link from "next/link";

// import { Button } from "@/components/ui/button";
import HeroCarousel from "@/components/HomepageSections/HeroCarousel";
import FeaturesSection from "@/components/HomepageSections/FeaturesSection";
import WelcomeSection from "@/components/HomepageSections/WelcomeSection";
import ChurchServicesSection from "@/components/HomepageSections/ChurchServicesSection";
import UpcomingEventsSection from "@/components/HomepageSections/UpcomingEventsSection";
import ChurchSermonsSection from "@/components/HomepageSections/ChurchSermonsSection";
import DonationSection from "@/components/HomepageSections/DonationSection";
import JesusQuoteSection from "@/components/HomepageSections/JesusQuoteSection";
import LatestBlogSection from "@/components/HomepageSections/LatestBlogSection";
import GallerySection from "@/components/HomepageSections/GallerySection";
import TestimonialsSection from "@/components/HomepageSections/TestimonialsSection";
import LatestNewsSection from "@/components/HomepageSections/LatestNewsSection";
import { CursorStyleTestimonials } from "@/components/CursorStyleTestimonials";
import { TestimoniesSection } from "@/components/HomepageSections/TestimoniesSection";

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <FeaturesSection />
      <WelcomeSection />
      <ChurchServicesSection />
      <UpcomingEventsSection />
      <ChurchSermonsSection />
      <DonationSection />
      <JesusQuoteSection />
      <LatestBlogSection />
      <GallerySection />
      <TestimonialsSection />
      <LatestNewsSection />
      <CursorStyleTestimonials />
      <TestimoniesSection />
    </main>
  );
}



