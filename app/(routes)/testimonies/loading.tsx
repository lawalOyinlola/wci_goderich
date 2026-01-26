import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card
              key={i}
              className={cn(
                "group relative flex flex-col h-full transition-all duration-300 overflow-hidden gap-4 shadow-sm",
                i === 0 || i === 5 || i === 6 ? "lg:col-span-2" : ""
              )}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                {i % 3 === 1 && (
                  <Skeleton className="h-48 w-full rounded-lg mt-4 aspect-video" />
                )}
                {i % 3 === 2 && (
                  <Skeleton className="h-48 w-full rounded-lg mt-4 bg-linear-to-br from-primary/10 to-primary/5" />
                )}
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs border-t pt-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
