import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "@/components/SectionHeader";

export default function GallerySkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-500 w-full mx-auto">
        <div className="px-4">
          <SectionHeader
            title="Photo Collections"
            subtitle="Gallery"
            description="Pictures from documented events, special occasions and during service"
          />
        </div>

        <div className="relative">
          <div className="space-y-8">
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="shrink-0 w-64 md:w-80 aspect-square rounded-xl"
                />
              ))}
            </div>
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="shrink-0 w-64 md:w-80 aspect-square rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
