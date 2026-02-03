"use client";

import HeroTemplate from "@/components/HeroTemplate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon, VideoCameraIcon } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <HeroTemplate
      title="Media Center"
      description="Explore our collection of sermons and teachings from our pastors. Watch live streams from headquarters, listen to DOMI Radio, and stay connected with inspiring worship and multimedia content."
      backgroundImage="/images/techroom_screen.webp"
    >
      <AnimatedButton
        href="#sermons"
        text="Watch Sermons"
        icon={<ArrowDownIcon weight="bold" />}
        size="lg"
      />
      <AnimatedButton
        variant="outline"
        href="#live-streams"
        text="Live Streams & Radio"
        icon={<VideoCameraIcon weight="bold" />}
        size="lg"
      />
    </HeroTemplate>
  );
}
