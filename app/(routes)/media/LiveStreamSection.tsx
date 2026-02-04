"use client";

import SectionHeader from "@/components/SectionHeader";
import { AnimatedButton } from "@/components/ui/animated-button";
import { LIVE_STREAM_SOURCES } from "@/lib/constants/media";
import { RadioIcon, VideoCameraIcon } from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ICON_MAP = {
  RadioIcon,
  VideoCameraIcon,
} as const;

export default function LiveStreamSection() {
  return (
    <section id="live-streams" className="scroll-mt-24 bg-muted/30">
      <div className="small-container">
        <SectionHeader
          title="Live Streams & Radio"
          subtitle="Tune In"
          description="Connect with Living Faith Church Worldwide through DOMI Radio and live video streams directly from headquarters."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {LIVE_STREAM_SOURCES.map((source) => {
            const IconComponent =
              ICON_MAP[source.icon as keyof typeof ICON_MAP] ?? VideoCameraIcon;
            return (
              <Card
                key={source.id}
                className="group overflow-hidden border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <IconComponent className="h-6 w-6" weight="duotone" />
                  </div>
                  <CardTitle className="text-xl">{source.title}</CardTitle>
                  <CardDescription className="text-base">
                    {source.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedButton
                    href={source.url}
                    text={source.ctaText}
                    icon={<IconComponent weight="bold" className="h-4 w-4" />}
                    iconPosition="right"
                    className="w-full sm:w-auto"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
