import { Suspense } from "react";
import Hero from "./Hero";
import PrayerInspiration from "./PrayerInspiration";
import PrayerRequestForm from "./PrayerRequestForm";
import PrayerPoints from "./PrayerPoints";
import PrayerSessions from "./PrayerSessions";
import AnsweredPrayers from "./AnsweredPrayers";
import { AnsweredPrayersSkeleton } from "./AnsweredPrayersSkeleton";
import CtaSection from "@/components/CtaSection";

interface PrayerPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PrayerPage({ searchParams }: PrayerPageProps) {
  const params = await searchParams;
  const categoryParam = params.category;

  return (
    <>
      <Hero />
      <PrayerInspiration />
      <PrayerSessions />
      <PrayerPoints initialCategory={categoryParam} />
      <PrayerRequestForm />
      <Suspense fallback={<AnsweredPrayersSkeleton />}>
        <AnsweredPrayers />
      </Suspense>

      <CtaSection
        title="Be Encouraged by Others"
        description="Read more testimonies from our church family and see how God is moving in our community."
        mainText="Every testimony is a testament to God's faithfulness. Explore more stories of transformation, healing, and breakthrough from our church family."
        buttons={[
          {
            text: "View All Testimonies",
            href: "/testimonies#testimonies",
          },
          { text: "Learn More About Us", href: "/about" },
        ]}
      />
    </>
  );
}
