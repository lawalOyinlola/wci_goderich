"use client";

import SectionHeader from "@/components/SectionHeader";
import { IconComponent, ValidIconName } from "@/components/IconComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

const worldwideGivingOptions: Array<{
  icon: ValidIconName;
  title: string;
  description: string;
}> = [
    {
      icon: "BuildingIcon",
      title: "The Ark Project",
      description:
        "Support the construction and development of The Ark, a landmark project that will serve as a center for worship, ministry, and community impact.",
    },
    {
      icon: "HandHeartIcon",
      title: "Prophet Offering",
      description:
        "Give towards the ministry of our spiritual father and prophet, supporting the work of God's servant in advancing the kingdom.",
    },
    {
      icon: "ChurchIcon",
      title: "Rural Church Building",
      description:
        "Help build churches in rural communities, bringing the Gospel and hope to underserved areas across the nation.",
    },
  ];

export default function LivingFaithWorldwide() {
  return (
    <section className="bg-linear-to-br from-foreground/5 to-background">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title="Give to Living Faith Church Worldwide"
          subtitle="International Giving"
          description="Support the global mission and vision of Living Faith Church Worldwide International. Your giving helps advance God's kingdom through various impactful projects and initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {worldwideGivingOptions.map((option, index) => (
            <Card
              key={index}
              className="group border-0 hover:shadow-primary/20 hover:shadow-sm transition-all duration-300 flex flex-col"
            >
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-2">
                  <IconComponent
                    iconName={option.icon}
                    size={24}
                    weight="duotone"
                  />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm">
                  {option.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <AnimatedButton
            href="https://give.faithtabernacle.org.ng/"
            text="Give to Living Faith Worldwide"
            icon={<ArrowSquareOutIcon weight="bold" />}
            iconPosition="right"
            size="lg"
            className="mb-4"
          />


          <p className="text-sm text-muted-foreground">
            You will be redirected to the official Living Faith Church Worldwide
            giving platform
          </p>
        </div>
      </div>
    </section>
  );
}
