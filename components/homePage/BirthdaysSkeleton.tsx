import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function BirthdaysSkeleton() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Separator className="shrink sm:w-40" />
            <Skeleton className="h-4 w-24" />
            <Separator className="shrink sm:w-40" />
          </div>
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto max-w-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}
