import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "@/components/SectionHeader";

export default function TestimoniesSkeleton() {
  return (
    <section className="py-20 bg-linear-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-500 w-full mx-auto">
        <div className="px-4 mb-8">
          <SectionHeader
            title="Wonders of God in the Community"
            subtitle="Testimonies"
            description="Hear from our church family about how God has worked in their lives"
          />
        </div>
        <div className="px-4">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="shrink-0 basis-4/5 sm:basis-3/4 md:basis-2/3 lg:basis-5/12 xl:basis-1/3 aspect-4/3 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
