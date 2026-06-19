"use client";

import SectionHeader from "@/components/SectionHeader";
import HeroTemplate from "@/components/HeroTemplate";
import CtaSection from "@/components/CtaSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { IconComponent } from "@/components/IconComponent";
import { SERVICES } from "@/lib/constants";
import { formatServiceSchedule } from "@/lib/utils";
import {
  ArrowDownIcon,
  NavigationArrowIcon,
  MusicNotesIcon,
  BookOpenIcon,
  HandHeartIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";

// What a first-time guest can expect on a Sunday.
const EXPECTATIONS = [
  {
    icon: MusicNotesIcon,
    title: "Spirited Worship",
    description:
      "Heartfelt praise and worship that ushers everyone into the presence of God.",
  },
  {
    icon: BookOpenIcon,
    title: "The Word of Faith",
    description:
      "Practical, faith-building teaching from the Word that you can take into your week.",
  },
  {
    icon: HandHeartIcon,
    title: "A Place to Belong",
    description:
      "A warm family that welcomes you the moment you walk through the doors.",
  },
];

// Practical details for planning a visit.
const GOOD_TO_KNOW = [
  "1,500-seater auditorium",
  "Children & Teens Church",
  "Free on-site parking",
  "Wheelchair accessible",
  "Arrive 15 minutes early",
  "Come as you are",
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        title="Worship With Us"
        description="From Sunday celebrations to midweek prayer, there's a place for you at our table every day of the week. Come and encounter God with our family."
        backgroundImage="/images/church-welcome.jpeg"
        className="bg-linear-to-br from-slate-950 via-zinc-900 to-stone-900"
      >
        <AnimatedButton
          href="#schedule"
          text="See Service Times"
          icon={<ArrowDownIcon weight="bold" />}
          size="lg"
        />
        <AnimatedButton
          variant="outline"
          href="/location"
          text="Plan Your Visit"
          icon={<NavigationArrowIcon weight="bold" className="rotate-90" />}
          size="lg"
        />
      </HeroTemplate>

      {/* Schedule */}
      <section id="schedule" className="scroll-mt-24 bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Weekly Schedule"
              title="When We Gather"
              description="Join us for worship, prayer, communion, and fellowship throughout the week."
            />
          </Reveal>

          <Stagger as="ul" className="divide-y border-t border-b max-w-4xl mx-auto">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id} as="li">
                <div className="flex items-start gap-5 py-8">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex-center shrink-0 text-primary">
                    <IconComponent
                      iconName={service.icon}
                      size={24}
                      className={
                        "iconClassName" in service
                          ? service.iconClassName
                          : undefined
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium shrink-0">
                        {formatServiceSchedule(service)}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="What to Expect"
              title="Your First Visit"
              description="New here? Here's a glimpse of what a service with us looks like."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {EXPECTATIONS.map((item, index) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={index}>
                  <div className="border-l-2 border-primary/40 pl-6">
                    <Icon
                      className="h-6 w-6 text-primary mb-4"
                      weight="duotone"
                    />
                    <h3 className="font-semibold mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Good to Know */}
      <section className="bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Good to Know"
              title="Before You Come"
              description="A few details to help you feel right at home."
            />
          </Reveal>

          <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border max-w-4xl mx-auto rounded-lg overflow-hidden border">
            {GOOD_TO_KNOW.map((item, index) => (
              <StaggerItem key={index}>
                <div className="bg-card px-5 py-4 flex items-center gap-3 hover:bg-primary/5 transition-colors duration-200">
                  <SealCheckIcon
                    className="h-4 w-4 text-primary/60 shrink-0"
                    weight="duotone"
                  />
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="We've Saved You a Seat"
        description="Whether it's your first time or you're coming home, you are always welcome here."
        mainText="Plan your visit, find directions to our auditorium, and join us this week. Come as you are — we can't wait to worship with you."
        buttons={[
          { text: "Plan Your Visit", href: "/location" },
          { text: "Contact Us", href: "/contact-us?subject=visitor#contact-form" },
        ]}
      />
    </div>
  );
}