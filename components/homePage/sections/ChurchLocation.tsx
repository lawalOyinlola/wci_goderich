import ChurchLocationMap from "../ChurchLocationMap";
import ChurchLocationInfo from "../ChurchLocationInfo";
import { Reveal } from "@/components/motion";
import { CHURCH_INFO } from "@/lib/constants";

export default function ChurchLocation() {
  const { CHURCH_LOCATION } = CHURCH_INFO;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Find Our <span className="text-accent">Location</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {CHURCH_LOCATION.description}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Reveal variant="slide-right" className="lg:col-span-2">
            <ChurchLocationMap />
          </Reveal>

          <Reveal variant="slide-left" className="space-y-6">
            <ChurchLocationInfo />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
