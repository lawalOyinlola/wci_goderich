import { Skeleton } from "../ui/skeleton";

export default function ChurchLocationSkeleton () {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container">
                <div className="text-center flex-center flex-col gap-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Find Our <span className="text-accent">Location</span>
                    </h2>
                    <Skeleton className="h-4 max-w-160 w-full" />
                    <Skeleton className="h-4 w-60" />
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                    <Skeleton className="aspect-video rounded-lg" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Skeleton className="col-span-2 lg:rounded-r-none h-100 md:h-154 w-full" />
                    <Skeleton className="aspect-video lg:rounded-l-none h-100 md:h-154 w-full" />
                </div>
            </div>
        </section>
    );
}