"use client";

import * as React from "react";
import HeroCarousel from "@/components/HomepageSections/HeroCarousel";
import FeaturesSection from "@/components/HomepageSections/FeaturesSection";
import WelcomeSection from "@/components/HomepageSections/WelcomeSection";
import ChurchServicesSection from "@/components/HomepageSections/ServicesSection";
import UpcomingEventsSection from "@/components/HomepageSections/UpcomingEventsSection";
import ChurchSermonsSection from "@/components/HomepageSections/SermonsSection";
import DonationSection from "@/components/HomepageSections/DonationSection";
import JesusQuoteSection from "@/components/HomepageSections/JesusQuoteSection";
import GallerySection from "@/components/HomepageSections/GallerySection";
import LatestNewsSection from "@/components/HomepageSections/LatestNewsSection";
import TestimoniesSection from "@/components/HomepageSections/TestimoniesSection";
import MonthlyBirthdaysSection from "@/components/HomepageSections/MonthlyBirthdaysSection";
import ChurchLocationSection from "@/components/HomepageSections/ChurchLocationSection";

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
      <GallerySection />
      <MonthlyBirthdaysSection />
      <LatestNewsSection />
      <TestimoniesSection />
      <ChurchLocationSection />
    </main>
  );
}
