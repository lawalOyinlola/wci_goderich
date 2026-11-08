import { Skeleton } from "../ui/skeleton";

export default function ChurchLocationSkeleton() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 pt-24 md:grid-cols-2 md:items-end md:pt-32">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Find Our Location
        </h2>
        <div className="space-y-2 md:justify-self-end md:w-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-105 w-full rounded-none sm:h-130 lg:h-170" />
    </section>
  );
}
