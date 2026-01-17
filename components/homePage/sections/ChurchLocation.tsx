import ChurchLocationMap from "../ChurchLocationMap";
import ChurchLocationInfo from "../ChurchLocationInfo";
import { CHURCH_INFO } from "@/lib/constants";

export default function ChurchLocation() {
  const { CHURCH_LOCATION } = CHURCH_INFO;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Find Our <span className="text-accent">Location</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {CHURCH_LOCATION.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChurchLocationMap />
          </div>

          <div className="space-y-6">
            <ChurchLocationInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
