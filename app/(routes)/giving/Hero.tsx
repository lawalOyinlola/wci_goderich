"use client";

import HeroTemplate from "@/components/HeroTemplate";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ArrowDownIcon, BankIcon } from "@phosphor-icons/react";

export default function Hero() {
    return (
        <HeroTemplate
            title="Give Cheerfully"
            description="Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver. Your generous giving supports our mission and blesses lives in our community."
            backgroundImage="/images/gallery-hero.jpeg"
        >
            <AnimatedButton
                href="#account-details"
                text="Copy Account Details"
                icon={<ArrowDownIcon weight="bold" />}
                size="lg"
            />
            <AnimatedButton
                variant="outline"
                href="#giving"
                text="Give Online"
                icon={<BankIcon weight="bold" />}
                size="lg"
            />
        </HeroTemplate>
    );
}