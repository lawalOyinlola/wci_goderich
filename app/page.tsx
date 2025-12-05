import HeroCarousel from "@/components/homePage/sections/HeroCarousel";
import Features from "@/components/homePage/sections/Features";
import Welcome from "@/components/homePage/sections/Welcome";
import ChurchServices from "@/components/homePage/sections/ChurchServices";
import UpcomingEvents from "@/components/homePage/sections/UpcomingEvents";
import Sermons from "@/components/homePage/sections/Sermons";
import Donation from "@/components/homePage/sections/Donation";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <Features />
      <Welcome />
      <ChurchServices />
      <UpcomingEvents />
      <Sermons />
      <Donation />
    </main>
  );
}
