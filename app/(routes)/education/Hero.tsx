"use client";

import HeroTemplate from "@/components/HeroTemplate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon, BookOpenTextIcon } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <HeroTemplate
      title="Education & Schools"
      description="Winners Chapel International is committed to providing quality education from primary to university level, nurturing future leaders with Christian values and academic excellence."
      backgroundImage="/images/education_school_hero.jpeg"
    >
      <AnimatedButton
        href="#mission"
        text="View Schools"
        icon={<ArrowDownIcon weight="bold" />}
        size="lg"
      />
      <AnimatedButton
        href="#wofbi"
        variant="outline"
        text="Bible Training"
        icon={<BookOpenTextIcon weight="bold" />}
        size="lg"
      />
    </HeroTemplate>
  );
}
