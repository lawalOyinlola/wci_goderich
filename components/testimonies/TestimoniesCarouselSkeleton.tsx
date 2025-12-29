import { Skeleton } from "@/components/ui/skeleton";

export function TestimoniesCarouselSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="shrink-0 basis-4/5 sm:basis-3/4 md:basis-2/3 lg:basis-5/12 xl:basis-1/3 2xl:basis-2/7"
        >
          <div className="flex flex-col gap-4 aspect-4/3 p-6 border border-border rounded-xl">
            <Skeleton className="h-full w-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="flex items-center gap-3 mt-auto">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
