"use client";

import HeroTemplate from "@/components/HeroTemplate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <HeroTemplate
      title="Prayer & Intercession"
      description="Experience the power of prayer. Join our prayer community, submit your prayer requests, and discover prayer points to strengthen your prayer life."
      backgroundImage="/images/prayer-hero.jpeg"
      className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
    >
      <AnimatedButton
        href="#prayer-request"
        text="Submit Prayer Request"
        icon={<ArrowDownIcon weight="bold" />}
        size="lg"
      />
      <AnimatedButton
        variant="outline"
        href="#join-group"
        text="Join Prayer Group"
        size="lg"
      />
    </HeroTemplate>
  );
}
