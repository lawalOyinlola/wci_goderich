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
  BookOpenIcon,
  MusicNoteIcon,
  HeartIcon,
  StarIcon,
  TargetIcon,
  EyeIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  SparkleIcon,
  QuotesIcon,
  LightningIcon,
  CompassIcon,
  MegaphoneIcon,
} from "@phosphor-icons/react";

const ACTIVITY_ICONS = [
  MusicNoteIcon,
  BookOpenIcon,
  UsersIcon,
  HeartIcon,
  SparkleIcon,
  LightningIcon,
  StarIcon,
  MegaphoneIcon,
];

export default function TeensChurchPage() {
  const ministry = MINISTRY_DETAILS.teens;

  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        title="Teens Church"
        description={`Ages 13–18 · ${ministry.subtitle}. ${ministry.tagline}`}
        className="bg-linear-to-br from-indigo-950 via-violet-900 to-purple-900"
      >
        <AnimatedButton
          href="#programs"
          text="Explore Programs"
          icon={<ArrowDownIcon weight="bold" />}
          size="lg"
        />
        <AnimatedButton
          variant="outline"
          href="/contact-us"
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
              &ldquo;Don&apos;t let anyone look down on you because you are
              young, but set an example for the believers in speech, in conduct,
              in love, in faith and in purity.&rdquo;
            </blockquote>
            <p className="text-xs text-muted-foreground tracking-[0.4em] uppercase mt-4">
              1 Timothy 4:12
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
              title="A Place Where Teens Thrive"
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
              description="Dynamic programs built specifically for teenagers navigating faith and life."
            />
          </Reveal>

          <Stagger
            as="ul"
            className="divide-y border-t border-b max-w-3xl mx-auto"
          >
            {ministry.programs.map((program, index) => (
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
              description="Engaging activities that help teens grow in faith, friendship, and purpose."
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

      {/* Topics */}
      <section className="bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Topics"
              title="Real Talk for Real Life"
              description="We tackle the topics teens actually face — honestly, biblically, and without judgment."
            />
          </Reveal>

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border max-w-4xl mx-auto rounded-lg overflow-hidden border">
            {ministry.topics.map((topic, index) => (
              <StaggerItem key={index}>
                <div className="bg-card px-5 py-4 flex items-center gap-3 hover:bg-primary/5 transition-colors duration-200">
                  <CompassIcon
                    className="h-4 w-4 text-primary/60 shrink-0"
                    weight="duotone"
                  />
                  <span className="text-sm font-semibold">{topic}</span>
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
        title="Join Teens Church Today"
        description="Be part of a community where you can be yourself and grow in your faith."
        mainText="Whether you're new to faith or want to go deeper, Teens Church is the place for you. Come as you are and experience authentic community, relevant teaching, and real relationships."
        buttons={[
          { text: "Contact Us", href: "/contact-us" },
          { text: "All Ministries", href: "/about" },
        ]}
      />
    </div>
  );
}