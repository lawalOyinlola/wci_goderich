"use client";

import SectionHeader from "@/components/SectionHeader";
import { MINISTRY_DETAILS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import HeroTemplate from "@/components/HeroTemplate";
import CtaSection from "@/components/CtaSection";
import {
  ArrowDownIcon,
  RocketLaunchIcon,
  BriefcaseIcon,
  HandshakeIcon,
  HeartIcon,
  TrophyIcon,
  TargetIcon,
  EyeIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  SparkleIcon,
  QuotesIcon,
  ChartLineUpIcon,
  CrownIcon,
} from "@phosphor-icons/react";

const ACTIVITY_ICONS = [
  RocketLaunchIcon,
  ChartLineUpIcon,
  BriefcaseIcon,
  HandshakeIcon,
  HeartIcon,
  TrophyIcon,
  UsersIcon,
  SparkleIcon,
];

export default function YouthAlivePage() {
  const ministry = MINISTRY_DETAILS.youth;

  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        title="Youth Alive"
        description={`Young Adults · ${ministry.subtitle}. ${ministry.tagline}`}
        backgroundImage="/images/youth_alive_hero.jpeg"
        className="bg-linear-to-br from-slate-950 via-emerald-950 to-teal-900"
      >
        <AnimatedButton
          href="#programs"
          text="Explore Programs"
          icon={<ArrowDownIcon weight="bold" />}
          size="lg"
        />
        <AnimatedButton
          variant="outline"
          href="/contact-us?subject=ministry#contact-form"
          text="Get in Touch"
          size="lg"
        />
      </HeroTemplate>

      {/* Scripture */}
      <section className="bg-card">
        <div className="small-container max-w-3xl">
          <Reveal className="text-center">
            <QuotesIcon
              className="h-10 w-10 text-primary mx-auto mb-6 opacity-50"
              weight="fill"
            />
            <blockquote className="font-lora text-2xl md:text-3xl italic text-foreground/80 leading-relaxed mb-4">
              &ldquo;They that wait upon the LORD shall renew their strength;
              they shall mount up with wings as eagles; they shall run, and not
              be weary.&rdquo;
            </blockquote>
            <p className="text-xs text-muted-foreground tracking-[0.4em] uppercase mt-4">
              Isaiah 40:31
            </p>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="bg-muted/30">
        <div className="small-container max-w-4xl">
          <Reveal>
            <SectionHeader
              subtitle="About"
              title="Empowered to Impact a Generation"
              description={ministry.description}
            />
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader subtitle="Purpose" title="What We Stand For" />
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <StaggerItem>
              <div className="border-l-2 border-primary pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <TargetIcon
                    className="h-4 w-4 text-primary"
                    weight="duotone"
                  />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Our Mission
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {ministry.mission}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-primary/40 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <EyeIcon
                    className="h-4 w-4 text-primary/70"
                    weight="duotone"
                  />
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                    Our Vision
                  </span>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {ministry.vision}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Programs"
              title="What We Offer"
              description="Word-based teaching, mentorship, and impact projects that equip you to excel in every area of life."
            />
          </Reveal>

          <Stagger
            as="ul"
            className="divide-y border-t border-b max-w-3xl mx-auto"
          >
            {ministry.programs.filter((p) => p.id !== "2").map((program, index) => (
              <StaggerItem key={program.id} as="li">
                <div className="flex gap-6 py-8">
                  <span className="text-4xl font-bold text-muted-foreground/20 font-mono select-none pt-1 min-w-12 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {program.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                        <ClockIcon className="h-3.5 w-3.5" />
                        <span>{program.time}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {program.description}
                    </p>
                    <Badge variant="muted" size="sm">
                      <UsersIcon className="h-3 w-3" />
                      {program.ageGroup}
                    </Badge>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Activities */}
      <section className="bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Activities"
              title="What We Do Together"
              description="Worship, growth, and connection that move you from potential to impact."
            />
          </Reveal>

          <Stagger className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
            {ministry.activities.map((activity, index) => {
              const Icon = ACTIVITY_ICONS[index % ACTIVITY_ICONS.length];
              return (
                <StaggerItem key={index}>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-muted/40 hover:bg-primary/5 hover:border-primary/30 transition-colors duration-200 cursor-default">
                    <Icon className="h-4 w-4 text-primary/60" weight="duotone" />
                    <span className="text-sm font-medium">{activity}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Focus Areas"
              title="Where We Grow"
              description="We pursue holistic development — spirit, career, finances, and leadership — so you thrive in every season."
            />
          </Reveal>

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border max-w-4xl mx-auto rounded-lg overflow-hidden border">
            {ministry.focusAreas.map((area, index) => (
              <StaggerItem key={index}>
                <div className="bg-card px-5 py-4 flex items-center gap-3 hover:bg-primary/5 transition-colors duration-200">
                  <CrownIcon
                    className="h-4 w-4 text-primary/60 shrink-0"
                    weight="duotone"
                  />
                  <span className="text-sm font-semibold">{area}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-card">
        <div className="small-container max-w-3xl">
          <Reveal>
            <SectionHeader
              subtitle="Schedule"
              title="When We Meet"
              description="Join us every Sunday — concurrent with the main service."
            />
          </Reveal>

          <Stagger className="divide-y">
            {[
              { label: "1st Service", time: "7:00 AM – 9:00 AM" },
              { label: "2nd Service", time: "9:00 AM – 11:00 AM" },
              { label: "3rd Service", time: "11:00 AM – 1:00 PM" },
            ].map((service) => (
              <StaggerItem key={service.label}>
                <div className="flex items-center gap-4 py-6">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                    <CalendarIcon
                      className="h-5 w-5 text-primary"
                      weight="duotone"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{service.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {service.time} · Concurrent with main service
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem>
              <div className="flex items-center gap-4 py-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                  <SparkleIcon
                    className="h-5 w-5 text-primary"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Special Events</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {ministry.schedule.specialEvents}
                  </p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="Join Youth Alive Today"
        description="Be part of a movement of young people making a difference in their generation."
        mainText="Whether you're building your career, finding your purpose, or growing your faith, Youth Alive is the place for you. Connect with like-minded young adults, grow in the Word, and make an impact that lasts."
        buttons={[
          { text: "Contact Us", href: "/contact-us?subject=ministry#contact-form" },
          { text: "All Ministries", href: "/about" },
        ]}
      />
    </div>
  );
}