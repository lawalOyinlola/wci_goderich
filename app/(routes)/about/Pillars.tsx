import SectionHeader from "@/components/SectionHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CHURCH_INFO } from "@/lib/constants";

const Pillars = () => {
  const { title, subtitle, description, pillars } =
    CHURCH_INFO.PILLARS_OF_FAITH;

  return (
    <section className="py-20 bg-muted/30">
      <div className="small-container">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description[0]}
          descriptionClassName="mb-8"
          additionalText={description[1]}
        />

        <div className="mt-12 md:mt-24">
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <Card
                key={pillar.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {String(pillar.id).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {pillar.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{pillar.description}"
                  </p>
                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Scripture References:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.verses.map((verse, index) => (
                        <span
                          key={index}
                          className="text-xs bg-muted px-2 py-1 rounded-md font-mono"
                        >
                          {verse}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
