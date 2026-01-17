"use client";

import HeroTemplate from "@/components/HeroTemplate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon, ImagesIcon } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <HeroTemplate
      title="Photo Gallery"
      description="Explore moments from our services, events, and special occasions. Witness the joy and fellowship of our church community."
      backgroundImage="/images/gallery-hero.jpeg"
    >
      <AnimatedButton
        href="#gallery"
        text="View Gallery"
        icon={<ArrowDownIcon weight="bold" />}
        size="lg"
      />
      <AnimatedButton
        variant="outline"
        href="#gallery"
        text="Browse Collections"
        icon={<ImagesIcon weight="bold" />}
        size="lg"
      />
    </HeroTemplate>
  );
}
