import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel Skeleton */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-6xl mx-auto px-4 space-y-6">
            <Skeleton className="h-16 w-96 mx-auto" />
            <Skeleton className="h-8 w-[500px] mx-auto max-w-full" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto max-w-full" />
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="text-center">
                <CardHeader>
                  <Skeleton className="h-16 w-16 mx-auto rounded-full mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section Skeleton */}
      <section className="py-20">
        <div className="small-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="aspect-video rounded-lg" />
          </div>
        </div>
      </section>

      {/* Church Services Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto max-w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Skeleton */}
      <section className="py-20">
        <div className="small-container">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto max-w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sermons Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto max-w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-40 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Skeleton */}
      <section className="py-20">
        <div className="small-container">
          <Card className="text-center p-12">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-6" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </Card>
        </div>
      </section>

      {/* Gallery Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <div className="text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto max-w-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Birthdays Skeleton */}
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

      {/* Testimonies Carousel Skeleton */}
      <section className="py-20 bg-linear-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-500 w-full mx-auto">
          <div className="px-4 mb-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-8 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto max-w-full" />
            </div>
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

      {/* Church Location Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="small-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <Skeleton className="aspect-video rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
