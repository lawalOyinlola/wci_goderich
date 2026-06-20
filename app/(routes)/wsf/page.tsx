"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import HeroTemplate from "@/components/HeroTemplate";
import CtaSection from "@/components/CtaSection";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card } from "@/components/ui/card";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { FieldSeparator } from "@/components/ui/field";
import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
  HouseLineIcon,
  UsersThreeIcon,
  BookOpenIcon,
  HandsPrayingIcon,
  PaperPlaneTiltIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

// Why join a home cell.
const BENEFITS = [
  { icon: UsersThreeIcon, title: "Close-Knit Community", description: "Build genuine friendships in a small, welcoming group near your home." },
  { icon: BookOpenIcon, title: "Grow in the Word", description: "Study the Bible together in an intimate, discussion-friendly setting." },
  { icon: HandsPrayingIcon, title: "Pray Together", description: "Share burdens and victories, and stand with one another in prayer." },
];

// Practical details.
const GOOD_TO_KNOW = [
  "Meets weekly",
  "Hosted in homes",
  "All ages welcome",
  "Free to join",
  "Bible study & prayer",
  "Find one near you",
];

const INTENT_OPTIONS = [
  { value: "join", label: "Find a fellowship near me" },
  { value: "host", label: "Host a fellowship in my home" },
];

const INTENT_LABELS: Record<string, string> = {
  join: "Find a fellowship near me",
  host: "Host a fellowship in my home",
};

type FellowshipFormValues = {
  name: string;
  phone: string;
  email?: string;
  intent: string;
  location: string;
  notes?: string;
};

const fellowshipSchema: yup.ObjectSchema<FellowshipFormValues> = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    ),
  email: yup
    .string()
    .optional()
    .transform((value) => (value === "" ? undefined : value))
    .email("Please enter a valid email address"),
  intent: yup.string().required("Please let us know how we can help"),
  location: yup
    .string()
    .required("Please tell us where you live")
    .min(2, "Please enter your area or neighborhood")
    .max(200, "Location must not exceed 200 characters"),
  notes: yup.string().optional().max(1000, "Notes must not exceed 1000 characters"),
});

export default function WSFPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  const form = useForm<FellowshipFormValues>({
    resolver: yupResolver(fellowshipSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      intent: "",
      location: "",
      notes: "",
    },
    mode: "onTouched",
  });

  const intent = form.watch("intent");

  // Preselect the matching intent and jump to the form.
  const handleSelectIntent = (value: "join" | "host") => {
    form.setValue("intent", value, { shouldValidate: true });
    scrollToSection("#join");
  };

  const onSubmit = async (data: FellowshipFormValues) => {
    setIsSubmitting(true);
    try {
      const intentLabel = INTENT_LABELS[data.intent] ?? data.intent;
      const message = [
        `Request: ${intentLabel}`,
        `Area / Neighborhood: ${data.location}`,
        data.notes ? `Notes: ${data.notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          subject: `Satellite Fellowship — ${intentLabel}`,
          message,
          isAnonymous: false,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit your request");
      }

      toast.success("Request Submitted!", {
        description:
          data.intent === "host"
            ? "Thank you for opening your home. Our team will reach out to you soon. God bless you!"
            : "Thank you! We'll connect you with a fellowship near you soon. God bless you!",
        duration: 8000,
      });
      form.reset();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error submitting fellowship request:", error);
      }
      toast.error("Failed to submit your request", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again later.",
        duration: 8000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <HeroTemplate
        title="Satellite Fellowship"
        description="Faith grows best in community. Join a home cell near you, or open your home to host one — small groups gathering through the week for the Word, prayer, and genuine fellowship."
        backgroundImage="/images/homecell_hero.jpeg"
        className="bg-linear-to-br from-slate-950 via-zinc-900 to-stone-900"
      >
        <AnimatedButton
          href="#join"
          text="Find a Cell"
          icon={<ArrowDownIcon weight="bold" />}
          size="lg"
        />
        <AnimatedButton
          variant="outline"
          href="#join"
          text="Host a Cell"
          icon={<HouseLineIcon weight="bold" />}
          size="lg"
        />
      </HeroTemplate>

      {/* About + Two Paths */}
      <section className="bg-card">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Satellite Fellowship"
              title="Church, Closer to Home"
              description="Satellite Fellowships are small groups that meet in homes across our community through the week — a place to belong between Sundays, where we study the Word, pray for one another, and do life together as a family of faith."
            />
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <StaggerItem>
              <button
                type="button"
                onClick={() => handleSelectIntent("join")}
                className="group h-full w-full text-left cursor-pointer rounded-2xl border border-border bg-muted/30 p-8 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <MagnifyingGlassIcon
                  className="h-7 w-7 text-primary mb-4 transition-transform duration-200 group-hover:scale-110"
                  weight="duotone"
                />
                <h3 className="font-semibold mb-2 tracking-tight">
                  Find a Cell Near You
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  Tell us where you live and we&apos;ll connect you with a warm
                  group in your neighborhood, ready to welcome you.
                </p>
              </button>
            </StaggerItem>
            <StaggerItem>
              <button
                type="button"
                onClick={() => handleSelectIntent("host")}
                className="group h-full w-full text-left cursor-pointer rounded-2xl border border-border bg-muted/30 p-8 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <HouseLineIcon
                  className="h-7 w-7 text-primary mb-4 transition-transform duration-200 group-hover:scale-110"
                  weight="duotone"
                />
                <h3 className="font-semibold mb-2 tracking-tight">
                  Open Your Home
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm">
                  Have space and a heart to serve? Volunteer to host a cell —
                  we&apos;ll provide the support, you provide the living room.
                </p>
              </button>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Why Join + Form (split) */}
      <section id="join" className="scroll-mt-24 bg-muted/30">
        <div className="small-container">
          <Reveal>
            <SectionHeader
              subtitle="Connect"
              title="Find or Host a Fellowship"
              description="Fill out the form and our team will reach out to help you take the next step."
            />
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-5 items-start max-w-6xl mx-auto">
            {/* Left: why join + essentials */}
            <Reveal variant="slide-right" className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="mb-6 tracking-tight">Life Together</h3>
                <Stagger className="space-y-6">
                  {BENEFITS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={index} className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" weight="duotone" />
                        </div>
                        <div>
                          <h3 className="heading-4 font-semibold text-sm mb-1">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </div>

              <div className="flex flex-wrap gap-2 border-t pt-6">
                {GOOD_TO_KNOW.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
                  >
                    <SparkleIcon
                      className="h-3.5 w-3.5 text-primary/60"
                      weight="duotone"
                    />
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal variant="slide-left" className="lg:col-span-3">
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                const errorCount = Object.keys(errors).length;
                if (errorCount > 0) {
                  toast.error("Please fix the form errors", {
                    description: `There ${
                      errorCount === 1 ? "is" : "are"
                    } ${errorCount} error${
                      errorCount === 1 ? "" : "s"
                    } in the form. Please check the fields below.`,
                    duration: 8000,
                  });
                }
              })}
              className="@container"
            >
              <Card className="p-8 sm:p-10">
                <div className="flex flex-col gap-2 mb-6">
                  <h3 className="heading-4">Tell us about you</h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll use these details to connect you with the right
                    fellowship.
                  </p>
                </div>

                <div className="space-y-6">
                  <SelectField
                    name="intent"
                    control={form.control}
                    label="How can we help?"
                    placeholder="Choose an option"
                    options={INTENT_OPTIONS}
                    disabled={isSubmitting}
                  />

                  <FieldSeparator />

                  <InputField
                    name="name"
                    control={form.control}
                    label="Full Name"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={isSubmitting}
                  />

                  <div className="@md:grid-cols-2 grid gap-6">
                    <InputField
                      name="phone"
                      control={form.control}
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      disabled={isSubmitting}
                    />
                    <InputField
                      name="email"
                      control={form.control}
                      label="Email (Optional)"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                  </div>

                  <InputField
                    name="location"
                    control={form.control}
                    label={
                      intent === "host"
                        ? "Where is your home located?"
                        : "Where do you live?"
                    }
                    placeholder="Your area or neighborhood (e.g. Goderich, Funkia)"
                    autoComplete="address-level2"
                    disabled={isSubmitting}
                  />

                  <TextAreaField
                    name="notes"
                    control={form.control}
                    label="Anything else? (Optional)"
                    placeholder={
                      intent === "host"
                        ? "Tell us about your home and the best days/times to meet..."
                        : "Let us know your preferred days, times, or anything else..."
                    }
                    rows={4}
                    disabled={isSubmitting}
                  />

                  <AnimatedButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    text={isSubmitting ? "Submitting..." : "Submit Request"}
                    icon={<PaperPlaneTiltIcon />}
                  />
                </div>
              </Card>
            </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="There's a Seat for You at the Table"
        description="Whether you're looking for a fellowship or ready to host one, we'd love to walk with you."
        mainText="Community changes everything. Take the next step today and become part of a family of faith right where you live."
        buttons={[
          { text: "Contact Us", href: "/contact-us#contact-form" },
          { text: "Find Our Location", href: "/location" },
        ]}
      />
    </div>
  );
}