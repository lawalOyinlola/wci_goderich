"use client";

import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { WOFBI } from "@/lib/constants";
import {
  ArrowDownIcon,
  GraduationCapIcon,
  TargetIcon,
  EyeIcon,
  ClockIcon,
  CalendarIcon,
  TagIcon,
  BookOpenIcon,
  ListChecksIcon,
  CheckCircleIcon,
  SealCheckIcon,
  CertificateIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@phosphor-icons/react";

const LEVEL_VARIANT = {
  Beginner: "muted",
  Intermediate: "default",
  Advanced: "primary",
} as const;

export default function WofbiPage() {
  return (
    <div>
      {/* Hero: 40th anniversary takeover */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col overflow-hidden bg-stone-950"
      >
        {/* Anniversary artwork. Sits under the scrims so the type stays legible. */}
        <Image
          src="/images/bg-WOFBI_40.jpg"
          alt=""
          aria-hidden="true"
          fill
          preload
          quality={70}
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-950/85 to-stone-950/40" />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-stone-950/70" />

        {/* Warm glow behind the numeral */}
        <div className="absolute right-0 top-1/4 hidden size-144 translate-x-1/4 rounded-full bg-[#d9a441]/15 blur-[120px] lg:block" />

        <div className="relative z-10 flex grow items-center">
          <div className="small-container grid w-full items-center gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
            {/* Copy */}
            <Reveal variant="fade-up" className="order-2 lg:order-1">
              <div className="mb-4 flex items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#e6c37c]">
                  Celebrating 40 Years
                </span>
              </div>

              <h1 className="max-w-2xl text-balance text-4xl font-medium leading-[1.05] text-white md:text-6xl xl:text-7xl">
                {WOFBI.title}
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                {WOFBI.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <AnimatedButton
                  href="#programs"
                  text="View Programs"
                  icon={<ArrowDownIcon weight="bold" />}
                  size="lg"
                />
                <AnimatedButton
                  variant="outline"
                  href="/contact-us?subject=wofbi#contact-form"
                  text="Apply Now"
                  icon={<GraduationCapIcon weight="bold" />}
                  size="lg"
                  className="border-white/25 text-white hover:text-white hover:bg-white/10"
                />
              </div>
            </Reveal>

            {/* Anniversary lockup */}
            <Reveal
              variant="scale"
              className="relative order-1 select-none text-center lg:order-2"
            >
              {/* Soft scrim so the gold numeral never fights the photo behind it */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-112 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-950/70 blur-3xl lg:size-136" />
              <div className="flex items-start justify-center">
                <span className="bg-linear-to-b from-[#f7e2ab] via-[#d9a441] to-[#a9761f] bg-clip-text text-[7rem] font-bold leading-[0.8] tracking-tight text-transparent sm:text-[9rem] lg:text-[13rem]">
                  40
                </span>
                <span className="mt-3 font-mono text-lg uppercase tracking-[0.2em] text-[#e6c37c] lg:mt-6 lg:text-2xl">
                  th
                </span>
              </div>
              <p className="-mt-2 font-great-vibes text-4xl text-[#e6c37c] lg:-mt-4 lg:text-6xl">
                Anniversary
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.45em] text-white/50">
                1986 to 2026
              </p>
            </Reveal>
          </div>
        </div>

        {/* Legacy strip */}
        <div className="relative z-10 border-t border-white/10 bg-stone-950/40 backdrop-blur-sm">
          <Stagger className="small-container grid grid-cols-1 divide-y divide-white/10 py-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { value: "1M+", label: "Global Graduates" },
              { value: "6", label: "Continents Reached" },
              { value: "1986", label: "Year Established" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="px-2 py-6 text-center sm:px-6">
                  <p className="text-2xl font-semibold text-white lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader subtitle="Purpose" title="Why WOFBI Exists" />
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
                  {WOFBI.mission}
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
                  {WOFBI.vision}
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="scroll-mt-24 bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Training Programs"
              title="Our Programs"
              description="Choose the program that best fits your spiritual journey and ministry goals."
            />
          </Reveal>

          <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
            {WOFBI.programs.map((program, index) => (
              <Reveal
                key={program.id}
                variant="fade-up"
                className="border-t pt-10"
              >
                {/* Header */}
                <div className="flex items-start gap-5 mb-6">
                  <span className="text-4xl font-bold text-muted-foreground/20 font-mono select-none min-w-12 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {program.title}
                      </h3>
                      <Badge variant={LEVEL_VARIANT[program.level]} size="sm">
                        {program.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {program.description}
                    </p>
                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <span className="flex items-center gap-1.5 text-foreground/80">
                        <ClockIcon
                          className="h-4 w-4 text-primary"
                          weight="duotone"
                        />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/80">
                        <CalendarIcon
                          className="h-4 w-4 text-primary"
                          weight="duotone"
                        />
                        {program.schedule}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/80">
                        <TagIcon
                          className="h-4 w-4 text-primary"
                          weight="duotone"
                        />
                        {program.fee}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-8">
                  <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
                    <BookOpenIcon className="h-4 w-4" weight="duotone" />
                    Subjects Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, i) => (
                      <Badge key={i} variant="muted" size="sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Curriculum + Requirements + Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {program.curriculum && (
                    <div>
                      <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
                        <ListChecksIcon className="h-4 w-4" weight="duotone" />
                        Curriculum
                      </h4>
                      <ul className="space-y-2.5">
                        {program.curriculum.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <CheckCircleIcon
                              className="h-4 w-4 text-primary mt-0.5 shrink-0"
                              weight="fill"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.requirements && (
                    <div>
                      <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
                        <SealCheckIcon className="h-4 w-4" weight="duotone" />
                        Requirements
                      </h4>
                      <ul className="space-y-2.5">
                        {program.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <CheckCircleIcon
                              className="h-4 w-4 text-primary/50 mt-0.5 shrink-0"
                              weight="fill"
                            />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.benefits && (
                    <div className="md:col-span-2">
                      <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4">
                        <CertificateIcon className="h-4 w-4" weight="duotone" />
                        Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
                        {program.benefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <CheckCircleIcon
                              className="h-4 w-4 text-primary mt-0.5 shrink-0"
                              weight="fill"
                            />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <AnimatedButton
                    href="/contact-us?subject=wofbi#contact-form"
                    text="Apply for this Program"
                    variant="outline"
                    icon={<GraduationCapIcon weight="bold" />}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Admission */}
      <section className="bg-card">
        <div className="small-container max-w-3xl">
          <Reveal>
            <SectionHeader
              subtitle="Get Started"
              title={WOFBI.admissionInfo.title}
              description={WOFBI.admissionInfo.description}
            />
          </Reveal>

          <Stagger as="ul" className="divide-y border-t border-b mb-12">
            {WOFBI.admissionInfo.process.map((step, index) => (
              <StaggerItem key={index} as="li">
                <div className="flex items-center gap-4 py-5">
                  <span className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex-center font-semibold text-sm shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-foreground/80">{step}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="fade-up">
            <h3 className="heading-4 text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium mb-4 text-center">
              Contact Admissions
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${WOFBI.admissionInfo.contact.email}`}
                className="flex items-center gap-3 px-6 py-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
              >
                <EnvelopeIcon
                  className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200"
                  weight="duotone"
                />
                <span className="text-sm font-medium">
                  {WOFBI.admissionInfo.contact.email}
                </span>
              </a>
              <a
                href={`tel:${WOFBI.admissionInfo.contact.phone}`}
                className="flex items-center gap-3 px-6 py-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
              >
                <PhoneIcon
                  className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200"
                  weight="duotone"
                />
                <span className="text-sm font-medium">
                  {WOFBI.admissionInfo.contact.phone}
                </span>
              </a>
            </div>
            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6">
              <ClockIcon className="h-4 w-4 text-primary/60" weight="duotone" />
              {WOFBI.admissionInfo.contact.officeHours}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="Start Your Journey Today"
        description="Join WOFBI and begin your transformation into a well-equipped leader."
        mainText="Take the first step towards becoming a well-equipped leader in ministry. Our programs help you grow in knowledge, faith, and practical ministry skills. Apply now or reach out for more information."
        buttons={[
          { text: "Apply Now", href: "/contact-us?subject=wofbi#contact-form" },
          { text: "Explore Education", href: "/education" },
        ]}
      />
    </div>
  );
}
