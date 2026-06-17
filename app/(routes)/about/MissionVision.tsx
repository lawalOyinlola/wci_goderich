import SectionHeader from "@/components/SectionHeader";
import CardDecorator from "@/components/ui/card-decorator";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CHURCH_INFO } from "@/lib/constants";
import { IconComponent, ValidIconName } from "@/components/IconComponent";

export default function MissionVision() {
  const { MISSION, VISION, MANDATE, ABOUT_US } = CHURCH_INFO;

  const missionVisionCards: Array<{
    icon: ValidIconName;
    title: string;
    description: string;
  }> = [
      {
        icon: "LightningIcon",
        title: "MISSION",
        description: MISSION,
      },
      {
        icon: "SparkleIcon",
        title: "MANDATE",
        description: MANDATE,
      },
      {
        icon: "BinocularsIcon",
        title: "VISION",
        description: VISION,
      },
    ];

  return (
    <section id="mission-vision" className="bg-background">
      <div className="@container small-container max-w-5xl">
        <Reveal>
          <SectionHeader
            title="Mission, Vision and Mandate"
            subtitle="About Us"
            description={ABOUT_US[0]}
            descriptionClassName="mb-8 max-w-5xl"
            additionalText={ABOUT_US[1]}
          />
        </Reveal>
        <Stagger className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 bg-background py-0 *:py-6 rounded-xl border">
          {missionVisionCards.map((card) => (
            <StaggerItem key={card.title} className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <IconComponent
                    iconName={card.icon}
                    size={32}
                    weight="duotone"
                    className="text-foreground"
                  />
                </CardDecorator>
                <h3 className="mt-4 font-medium">{card.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{card.description}</p>
              </CardContent>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
