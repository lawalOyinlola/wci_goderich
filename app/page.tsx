import { Suspense } from "react";
import HeroCarousel from "@/components/homePage/sections/HeroCarousel";
import Features from "@/components/homePage/sections/Features";
import Welcome from "@/components/homePage/sections/Welcome";
import ChurchServices from "@/components/homePage/sections/ChurchServices";
import UpcomingEvents from "@/components/homePage/sections/UpcomingEvents";
import FeaturedSermons from "@/components/homePage/sections/FeaturedSermons";
import Donation from "@/components/homePage/sections/Donation";
import Gallery from "@/components/homePage/sections/Gallery";
import BirthdaysWrapper from "@/components/homePage/BirthdaysWrapper";
import TestimoniesWrapper from "@/components/homePage/TestimoniesWrapper";
import ChurchLocation from "@/components/homePage/sections/ChurchLocation";
import GallerySkeleton from "@/components/homePage/GallerySkeleton";
import BirthdaysSkeleton from "@/components/homePage/BirthdaysSkeleton";
import TestimoniesSkeleton from "@/components/homePage/TestimoniesSkeleton";
import ChurchLocationSkeleton from "@/components/homePage/ChurchLocationSkeleton";

export default async function Home() {
  return (
    <>
      <HeroCarousel />
      <Features />
      <Welcome />
      <ChurchServices />
      <UpcomingEvents />
      <FeaturedSermons />
      <Donation />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<BirthdaysSkeleton />}>
        <BirthdaysWrapper />
      </Suspense>
      <Suspense fallback={<TestimoniesSkeleton />}>
        <TestimoniesWrapper />
      </Suspense>
      <Suspense fallback={<ChurchLocationSkeleton />}>
        <ChurchLocation />
      </Suspense>
    </>
  );
}
