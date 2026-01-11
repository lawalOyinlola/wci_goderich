import SectionHeader from "@/components/SectionHeader";
import { TestimoniesSkeleton } from "@/components/testimonies/TestimoniesSkeleton";

export function AnsweredPrayersSkeleton() {
  return (
    <section className="py-16 bg-muted">
      <div className="small-container">
        <SectionHeader
          title="Answered Prayers"
          subtitle="Testimonies of God's Faithfulness"
          description="See how God has answered prayers in the lives of our members. These testimonies serve as encouragement and proof that prayer works."
        />
        <div>
          <TestimoniesSkeleton />
        </div>
      </div>
    </section>
  );
}
