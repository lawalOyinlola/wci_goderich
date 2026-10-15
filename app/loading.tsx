import HeroCarousel from "@/components/homePage/sections/HeroCarousel";
import Features from "@/components/homePage/sections/Features";
import Welcome from "@/components/homePage/sections/Welcome";
import ChurchServices from "@/components/homePage/sections/ChurchServices";
import Donation from "@/components/homePage/sections/Donation";
import GallerySkeleton from "@/components/homePage/GallerySkeleton";
import BirthdaysSkeleton from "@/components/homePage/BirthdaysSkeleton";
import ChurchLocationSkeleton from "@/components/homePage/ChurchLocationSkeleton";

/**
 * Loading component that mimics the actual page layout. Keep it in step with
 * app/page.tsx: sections hidden there (events, sermons, testimonies) must not
 * flash here while a page loads.
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
      <Donation />
      {/* Data-fetching sections - show skeletons */}
      <GallerySkeleton />
      <BirthdaysSkeleton />
      <ChurchLocationSkeleton />
    </>
  );
}
