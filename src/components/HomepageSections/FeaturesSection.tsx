"use client";

import { Button } from "@/components/ui/button";
import { ChurchIcon, HeartIcon, UsersThreeIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const features = [
  {
    icon: <ChurchIcon weight="duotone" size={54} className="text-accent" />,
    title: "Worship",
    subtitle: "Honoring God in Spirit and Truth",
    description:
      "We gather to worship God with reverence and joy, acknowledging His holiness and grace in our lives.",
    bible: "John 4:24",
  },
  {
    icon: <UsersThreeIcon weight="duotone" size={54} className="text-accent" />,
    title: "Connect",
    subtitle: "Building Community & Fellowship",
    description:
      "We foster meaningful relationships among believers to build spiritual growth and mutual support.",
    bible: "Hebrews 10:24-25",
  },
  {
    icon: <HeartIcon weight="duotone" size={54} className="text-accent" />,
    title: "God's Love",
    subtitle: "Experiencing Grace and Mercy",
    description:
      "We embrace the unconditional love of God that transforms lives and brings hope to all.",
    bible: "Romans 5:8",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-card text-card-foreground">
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-8 relative">
          {features.map((feature, index) => (
            <div key={index} className="col-span-2">
              <div className="mb-4 w-fit">{feature.icon}</div>
              <h4 className="uppercase mb-2">{feature.title}</h4>
              <p className="mb-2 text-accent leading-7">{feature.subtitle}</p>

              <Separator className="mb-4 w-10! bg-accent" />

              <p className="text-muted-foreground mb-2 leading-7">
                {feature.description}
              </p>
              <blockquote className="border-l-2 pl-2 text-sm italic">
                {feature.bible}
              </blockquote>
            </div>
          ))}

          <div className="text-center bg-primary text-primary-foreground px-8 md:-mt-30 pt-20 pb-10 col-span-3 flex flex-col items-center justify-center gap-4">
            <h3>THE MANDATE</h3>

            <blockquote className="text-lg mt-6 italic leading-7">
              &quot;Now the hour has come to liberate the world from all
              oppressions of the devil through the preaching of the word of
              faith, and I am sending you to undertake this task.&quot;
            </blockquote>

            <Button
              size="lg"
              variant="outline"
              className="border-2 text-center min-w-[160px] mt-4"
              asChild
            >
              <Link href="https://faithtabernacle.org.ng/mandate/">
                Partake this mission
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
