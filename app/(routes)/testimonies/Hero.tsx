"use client";

import HeroTemplate from "@/components/HeroTemplate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <HeroTemplate
      title="Stories of Faith and Transformation"
      description="Discover the powerful testimonies of our members as they share how God has transformed their lives."
      backgroundImage="/images/testimonies-hero.jpeg"
    >
      <AnimatedButton
        href="#testimonies"
        text="View Testimonies"
        icon={<ArrowDownIcon weight="bold" />}
        size="lg"
      />
      <AnimatedButton
        href="#share-testimony"
        variant="outline"
        text="Share Your Testimony"
        size="lg"
      />
    </HeroTemplate>
  );
}
