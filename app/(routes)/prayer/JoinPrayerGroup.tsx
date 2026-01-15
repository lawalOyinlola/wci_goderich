"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { FieldSeparator } from "@/components/ui/field";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  MIDNIGHT_PRAYER_GROUPS,
  UNIQUE_PRAYER_SESSIONS,
} from "@/lib/constants";

type JoinPrayerGroupFormValues = {
  name: string;
  phone: string;
  prayerGroup: string;
  reason?: string;
  previousExperience?: string;
};

const joinGroupSchema: yup.ObjectSchema<JoinPrayerGroupFormValues> = yup.object(
  {
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
    prayerGroup: yup.string().required("Please select a prayer group"),
    reason: yup
      .string()
      .optional()
      .max(500, "Reason must not exceed 500 characters"),
    previousExperience: yup
      .string()
      .optional()
      .max(500, "Experience must not exceed 500 characters"),
  }
);

// Convert MIDNIGHT_PRAYER_GROUPS to format needed for the form
const prayerGroupOptions = Object.entries(MIDNIGHT_PRAYER_GROUPS).map(
  ([groupNumber, group]) => ({
    value: `midnight-${groupNumber}`,
    label: `Midnight ${group.name} (${group.day}s at ${group.time})`,
  })
);

// Extract the midnight-warriors session for special display
const midnightWarriorsSession = UNIQUE_PRAYER_SESSIONS.find(
  (session) => session.id === "midnight-warriors"
);

export default function JoinPrayerGroup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<JoinPrayerGroupFormValues>({
    resolver: yupResolver(joinGroupSchema),
    defaultValues: {
      name: "",
      phone: "",
      prayerGroup: "",
      reason: "",
      previousExperience: "",
    },
    mode: "onTouched",
  });

  const selectedGroupId = form.watch("prayerGroup");

  const onSubmit = async (data: JoinPrayerGroupFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prayer/groups/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to join prayer group");
      }

      // Show success toast
      toast.success("Application Submitted!", {
        description:
          "Thank you for your interest in joining a prayer group. We'll contact you soon with more information. God bless you!",
        duration: 8000,
      });

      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      // Log for debugging (only in development)
      if (process.env.NODE_ENV === "development") {
        console.error("Error joining prayer group:", error);
      }
      toast.error("Failed to join prayer group", {
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

  if (submitSuccess) {
    return (
      <section id="join-group" className="py-16 bg-background">
        <div className="small-container max-w-2xl">
          <Card className="p-8 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Application Submitted!
            </h3>
            <p className="text-muted-foreground">
              Thank you for your interest in joining a prayer group. We'll
              contact you soon with more information. God bless you!
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-4 items-start">
      <div className="grid min-[400px]:grid-cols-2 gap-4 lg:col-span-2">
        <div className="mb-8 col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <ClockIcon size={24} weight="duotone" className="text-primary" />
            <h3>Special Midnight Prayer Groups</h3>
            <Badge variant="default" className="ml-2">
              Weekly
            </Badge>
          </div>
          <div>
            {midnightWarriorsSession && (
              <Card
                key={midnightWarriorsSession.id}
                className="relative p-6 transition-all duration-300 shadow-sm hover:shadow-primary/20 hover:shadow-md overflow-hidden"
              >
                <BorderBeam size={200} colorFrom="var(--accent)" />
                <p className="text-muted-foreground mb-4">
                  {midnightWarriorsSession.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={18} className="text-primary" />
                    <span className="text-sm font-medium">
                      {midnightWarriorsSession.day}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon size={18} className="text-primary" />
                    <div className="flex flex-wrap gap-2">
                      {midnightWarriorsSession.times.map((time, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon size={18} className="text-primary" />
                    <span className="text-sm">
                      {midnightWarriorsSession.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon size={18} className="text-primary" />
                    <span className="text-sm capitalize">
                      {midnightWarriorsSession.type}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {Object.entries(MIDNIGHT_PRAYER_GROUPS).map(([groupNumber, group]) => {
          const groupId = `midnight-${groupNumber}`;
          return (
            <div
              key={groupId}
              className={cn(
                "p-4 rounded-lg border transition-colors",
                selectedGroupId === groupId
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <h4 className="mb-1">{group.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {group.day}s at {group.time}
              </p>

              {group.maxMembers && group.currentMembers !== undefined && (
                <p className="text-xs text-muted-foreground mt-2">
                  {group.currentMembers}/{group.maxMembers} members
                </p>
              )}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          // Show toast when form validation fails
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
        className="@container lg:col-span-2"
      >
        <Card className="p-8">
          <div className="flex flex-col gap-4">
            <h4>Join a Midnight Prayer Group</h4>
            <p className="text-sm text-muted-foreground">
              Fill out the form below so we can add you to a prayer group.
            </p>
          </div>

          <FieldSeparator />

          <div className="space-y-6">
            <InputField
              name="name"
              control={form.control}
              label="Your Name"
              placeholder="Enter your full name"
              autoComplete="name"
            />

            <InputField
              name="phone"
              control={form.control}
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              autoComplete="tel"
            />

            <SelectField
              name="prayerGroup"
              control={form.control}
              label="Select Prayer Group"
              placeholder="Choose a prayer group"
              options={prayerGroupOptions}
            />

            <TextAreaField
              name="reason"
              control={form.control}
              label="Why do you want to join this prayer group? (Optional)"
              placeholder="Tell us about your desire to join..."
              rows={4}
            />

            <TextAreaField
              name="previousExperience"
              control={form.control}
              label="Previous Prayer Group Experience (Optional)"
              placeholder="Have you been part of a prayer group before? Share your experience..."
              rows={3}
            />

            <AnimatedButton
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              text={isSubmitting ? "Submitting..." : "Join Prayer Group"}
              icon={<UserPlusIcon />}
            />
          </div>
        </Card>
      </form>
    </div>
  );
}
