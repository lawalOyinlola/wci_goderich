"use client";

import SectionHeader from "@/components/SectionHeader";
import HeroTemplate from "@/components/HeroTemplate";
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
      {/* Hero */}
      <HeroTemplate
        title={WOFBI.title}
        description={WOFBI.description}
        className="bg-linear-to-br from-slate-950 via-zinc-900 to-stone-900"
      >
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
        />
      </HeroTemplate>

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
                  <TargetIcon className="h-4 w-4 text-primary" weight="duotone" />
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
                  <EyeIcon className="h-4 w-4 text-primary/70" weight="duotone" />
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
                        <ClockIcon className="h-4 w-4 text-primary" weight="duotone" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/80">
                        <CalendarIcon className="h-4 w-4 text-primary" weight="duotone" />
                        {program.schedule}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground/80">
                        <TagIcon className="h-4 w-4 text-primary" weight="duotone" />
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
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <CheckCircleIcon className="h-4 w-4 text-primary mt-0.5 shrink-0" weight="fill" />
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
                          <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <CheckCircleIcon className="h-4 w-4 text-primary/50 mt-0.5 shrink-0" weight="fill" />
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
                          <div key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                            <CheckCircleIcon className="h-4 w-4 text-primary mt-0.5 shrink-0" weight="fill" />
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
                <EnvelopeIcon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" weight="duotone" />
                <span className="text-sm font-medium">
                  {WOFBI.admissionInfo.contact.email}
                </span>
              </a>
              <a
                href={`tel:${WOFBI.admissionInfo.contact.phone}`}
                className="flex items-center gap-3 px-6 py-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
              >
                <PhoneIcon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" weight="duotone" />
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