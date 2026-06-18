import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "@/components/SectionHeader";
import { TestimoniesCardsSkeleton } from "@/components/testimonies/TestimoniesCardsSkeleton";

export default function TestimoniesLoading() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b to-muted/70 from-background z-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="God's Faithfulness in Our Lives"
          subtitle="Testimonies"
          description="Hear from our church family about how God has worked in their lives"
        />

        {/* Tabs Skeleton */}
        <div className="flex justify-center mb-12 gap-2 bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 rounded-md">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-24 rounded-md bg-white dark:bg-slate-700"
            />
          ))}
        </div>

        {/* Cards Grid Skeleton */}
        <TestimoniesCardsSkeleton count={9} />
      </div>
    </section>
  );
}
