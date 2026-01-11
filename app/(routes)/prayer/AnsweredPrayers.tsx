import SectionHeader from "@/components/SectionHeader";
import { TestimonialCarousel } from "@/components/testimonies/TestimonialCarousel";
import { getTestimoniesServer } from "@/lib/data/testimonies.server";

export default async function AnsweredPrayers() {
  // Fetch testimonies filtered by category "prayer" or "miracles"
  let testimonies = await getTestimoniesServer({
    category: "prayer,miracles",
    verified: true,
    limit: 10,
  });

  // If no prayer/miracles testimonies, fallback to all testimonies (limited)
  if (testimonies.length === 0) {
    testimonies = await getTestimoniesServer({
      verified: true,
      limit: 10,
    });
  }

  return (
    <section className="py-16 bg-muted">
      <div className="small-container">
        <SectionHeader
          title="Answered Prayers"
          subtitle="Testimonies of God's Faithfulness"
          description="See how God has answered prayers in the lives of our members. These testimonies serve as encouragement and proof that prayer works."
        />
        <div>
          {testimonies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No answered prayers to display yet. Check back soon!
              </p>
            </div>
          ) : (
            <TestimonialCarousel testimonials={testimonies} />
          )}
        </div>
      </div>
    </section>
  );
}
