import HeroCarousel from "@/components/homePage/sections/HeroCarousel";
import Features from "@/components/homePage/sections/Features";
import Welcome from "@/components/homePage/sections/Welcome";
import ChurchServices from "@/components/homePage/sections/ChurchServices";
import UpcomingEvents from "@/components/homePage/sections/UpcomingEvents";
import Sermons from "@/components/homePage/sections/Sermons";
import Donation from "@/components/homePage/sections/Donation";
import Gallery from "@/components/homePage/sections/Gallery";
import BirthdaysWrapper from "@/components/homePage/sections/BirthdaysWrapper";
import TestimoniesWrapper from "@/components/homePage/sections/TestimoniesWrapper";
import ChurchLocation from "@/components/homePage/sections/ChurchLocation";

export default async function Home() {
  return (
    <>
      <HeroCarousel />
      <Features />
      <Welcome />
      <ChurchServices />
      <UpcomingEvents />
      <Sermons />
      <Donation />
      <Gallery />
      <BirthdaysWrapper />
      <TestimoniesWrapper />
      <ChurchLocation />
    </>
  );
}
