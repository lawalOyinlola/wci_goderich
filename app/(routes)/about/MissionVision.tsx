"use client";

import SectionHeader from "@/components/SectionHeader";
import CardDecorator from "@/components/ui/card-decorator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BinocularsIcon, LightningIcon, SparkleIcon } from "@phosphor-icons/react";
import { CHURCH_INFO } from "@/lib/constants";

export default function MissionVision() {
  const { MISSION, VISION, MANDATE, ABOUT_US } = CHURCH_INFO;

  return (
    <section id="mission-vision" className="bg-background">
      <div className="@container small-container max-w-5xl">
        <SectionHeader
          title="Mission, Vision and Mandate"
          subtitle="About Us"
          description={ABOUT_US[0]}
          descriptionClassName="mb-8 max-w-5xl"
          additionalText={ABOUT_US[1]}
        />
        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16 bg-background py-0 *:py-6">
          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <LightningIcon size={32} weight="duotone" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">MISSION</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{MISSION}</p>
            </CardContent>
          </div>

          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <SparkleIcon size={32} weight="duotone" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">MANDATE</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{MANDATE}</p>
            </CardContent>
          </div>

          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <BinocularsIcon size={32} weight="duotone" aria-hidden />
              </CardDecorator>

              <h3 className="mt-4 font-medium">VISION</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">{VISION}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
