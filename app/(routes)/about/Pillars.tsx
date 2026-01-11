import SectionHeader from "@/components/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CHURCH_INFO } from "@/lib/constants";

const Pillars = () => {
  const { title, subtitle, description, pillars } =
    CHURCH_INFO.PILLARS_OF_FAITH;

  return (
    <section className="bg-muted/30">
      <div className="small-container">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description[0]}
          descriptionClassName="mb-8 max-w-5xl"
          additionalText={description[1]}
        />

        <div className="mt-12 md:mt-24">
          <Accordion
            className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start"
            defaultValue={["1", "2", "3"]}
            type="multiple"
          >
            {pillars.map((pillar) => (
              <AccordionItem
                className="group rounded-md border bg-background px-4 py-1 outline-none last:border-b has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50 shadow-sm transition-all hover:shadow-primary/20 hover:-translate-y-1 duration-300 cursor-pointer active:-translate-y-0.5"
                key={pillar.id}
                value={String(pillar.id)}
              >
                <AccordionTrigger className="justify-start gap-3 py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                  <div className="flex flex-col items-start gap-1 grow">
                    <span className="text-xs text-muted-foreground font-mono">
                      _{String(pillar.id).padStart(2, "0")}
                    </span>

                    <h3 className="text-lg font-semibold tracking-tight capitalize">
                      {pillar.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pt-4 text-muted-foreground flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed grow">
                    "{pillar.description}"
                  </p>
                  <div className="pt-2 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Scripture References:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.verses.map((verse, index) => (
                        <Badge
                          key={pillar.title + index}
                          variant="muted"
                          size="sm"
                          className="line-clamp-2 group-hover:border-transparent group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300"
                        >
                          {verse}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
