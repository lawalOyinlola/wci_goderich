import { Skeleton } from "@/components/ui/skeleton";
import SectionHeader from "@/components/SectionHeader";

export default function PrayerLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <main className="overflow-hidden relative bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="bg-black/20 absolute inset-0" />
        <section>
          <div className="pb-24 pt-12">
            <div className="relative small-container flex flex-col lg:flex-center">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <Skeleton className="h-16 w-64 mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-8" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-48" />
                  <Skeleton className="h-12 w-48" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Content Skeleton */}
      <section className="py-16 bg-background">
        <div className="small-container">
          <SectionHeader
            title="Loading..."
            subtitle="Please wait"
            description=""
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 border rounded-lg">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
