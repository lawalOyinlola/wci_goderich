import HeroCarousel from "@/components/homePage/sections/HeroCarousel";
import Features from "@/components/homePage/sections/Features";
import Welcome from "@/components/homePage/sections/Welcome";
import ChurchServices from "@/components/homePage/sections/ChurchServices";
import UpcomingEvents from "@/components/homePage/sections/UpcomingEvents";
import Sermons from "@/components/homePage/sections/FeaturedSermons";
import Donation from "@/components/homePage/sections/Donation";
import GallerySkeleton from "@/components/homePage/GallerySkeleton";
import BirthdaysSkeleton from "@/components/homePage/BirthdaysSkeleton";
import TestimoniesSkeleton from "@/components/homePage/TestimoniesSkeleton";
import ChurchLocationSkeleton from "@/components/homePage/ChurchLocationSkeleton";

/**
 * Loading component that mimics the actual page layout.
 * Static sections (no data fetching) are rendered normally,
 * while data-fetching sections show skeleton loaders.
 */
export default function Loading() {
  return (
    <>
      {/* Static sections - render normally */}
      <HeroCarousel />
      <Features />
      <Welcome />
      <ChurchServices />
      <UpcomingEvents />
      <Sermons />
      <Donation />
      {/* Data-fetching sections - show skeletons */}
      <GallerySkeleton />
      <BirthdaysSkeleton />
      <TestimoniesSkeleton />
      <ChurchLocationSkeleton />
    </>
  );
}
