import SectionHeader from "@/components/SectionHeader";
import { AnsweredPrayersSkeleton } from "@/app/(routes)/prayer/AnsweredPrayersSkeleton";

export default function AnsweredPrayersSkeletonPage() {
  return (
    <section className="bg-muted">
      <div className="small-container">
        <SectionHeader
          title="Answered Prayers"
          subtitle="Testimonies of God's Faithfulness"
          description="See how God has answered prayers in the lives of our members. These testimonies serve as encouragement and proof that prayer works."
        />
        <div>
          <AnsweredPrayersSkeleton />
        </div>
      </div>
    </section>
  );
}
