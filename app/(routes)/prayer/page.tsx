import Hero from "./Hero";
import PrayerInspiration from "./PrayerInspiration";
import PrayerRequestForm from "./PrayerRequestForm";
import PrayerPoints from "./PrayerPoints";
import JoinPrayerGroup from "./JoinPrayerGroup";
import PrayerSessions from "./PrayerSessions";
import AnsweredPrayers from "./AnsweredPrayers";
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
      <PrayerRequestForm />
      <PrayerPoints initialCategory={categoryParam} />
      <PrayerSessions />
      <JoinPrayerGroup />
      <AnsweredPrayers />
      <CtaSection
        title="Join Us in Prayer"
        description="Prayer is powerful and effective. Join our prayer community and experience the power of corporate prayer."
        mainText="Whether you're looking for a prayer group, want to submit a prayer request, or need prayer points for your personal prayer time, we're here to support you in your prayer journey."
        buttons={[
          { text: "Join a Prayer Group", href: "#join-group" },
          { text: "Submit Prayer Request", href: "#prayer-request" },
        ]}
      />
    </>
  );
}
