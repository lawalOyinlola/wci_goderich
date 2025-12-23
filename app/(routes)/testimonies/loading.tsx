import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function TestimoniesLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-700/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Skeleton className="h-16 w-96 mx-auto mb-6" />
          <Skeleton className="h-6 w-[600px] mx-auto max-w-full" />
        </div>
      </section>

      {/* Content Section Skeleton */}
      <section className="py-15 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-12 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-md" />
            ))}
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className={cn(
                  "overflow-hidden",
                  i % 3 === 0 && "lg:col-span-2"
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
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  {i % 3 === 1 && (
                    <Skeleton className="h-48 w-full rounded-lg mt-4" />
                  )}
                </CardContent>
                <div className="px-6 pb-6 pt-4 border-t flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
