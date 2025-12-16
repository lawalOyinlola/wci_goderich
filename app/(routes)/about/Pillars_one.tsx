import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { CHURCH_INFO } from "@/lib/constants";

const PillarsOne = () => {
  const { title, subtitle, description, pillars } =
    CHURCH_INFO.PILLARS_OF_FAITH;

  return (
    <section className="bg-muted/30">
      <div className="small-container max-w-5xl">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description[0]}
          descriptionClassName="mb-8"
          additionalText={description[1]}
        />

        <div className="mt-12 md:mt-24">
          <div className="max-w-4xl mx-auto grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <div key={pillar.id || index} className="group overflow-hidden">
                <Image
                  className="h-60 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-50 group-hover:rounded-xl"
                  src={"/images/bg-2025_theme.jpg"}
                  alt={`${pillar.title} - ${pillar.title}`}
                  width={826}
                  height={1239}
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                      {pillar.title}
                    </h3>
                    <span className="text-xs">
                      _{String(pillar.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {pillar.description}
                    </span>
                    {/* {"verses" in pillar && pillar.verses && (
                      <a
                        href={`tel:${pillar.verses}`}
                        // target="_blank"
                        // rel="noopener noreferrer"
                        className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        {pillar.verses.join(", ")}
                      </a>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsOne;
