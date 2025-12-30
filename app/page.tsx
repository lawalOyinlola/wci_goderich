import HeroCarousel from "@/components/homePage/sections/HeroCarousel";
import Features from "@/components/homePage/sections/Features";
import Welcome from "@/components/homePage/sections/Welcome";
import ChurchServices from "@/components/homePage/sections/ChurchServices";
import UpcomingEvents from "@/components/homePage/sections/UpcomingEvents";
import Sermons from "@/components/homePage/sections/Sermons";
import Donation from "@/components/homePage/sections/Donation";
import Gallery from "@/components/homePage/sections/Gallery";
import Birthdays from "@/components/homePage/sections/Birthdays";
import Testimonies from "@/components/homePage/sections/Testimonies";
import ChurchLocation from "@/components/homePage/sections/ChurchLocation";
import { getTestimoniesServer } from "@/lib/data/testimonies.server";
import { getBirthdaysServer } from "@/lib/data/birthdays.server";

export default async function Home() {
  // Fetch featured testimonies on the server
  const featuredTestimonies = await getTestimoniesServer({
    featured: true,
    limit: 10,
  });

  // Fetch featured birthdays on the server (limit 6)
  const featuredBirthdays = await getBirthdaysServer({
    featured: true,
    limit: 6,
  });

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
      <Birthdays initialBirthdays={featuredBirthdays} />
      <Testimonies initialTestimonies={featuredTestimonies} />
      <ChurchLocation />
    </>
  );
}
