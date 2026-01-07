"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SectionHeader from "@/components/SectionHeader";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { Card } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { UserPlusIcon } from "@phosphor-icons/react";
import { MIDNIGHT_PRAYER_GROUPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
    label: `${group.name} (${group.day}s at ${group.time})`,
  })
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
  const selectedGroup = selectedGroupId
    ? Object.entries(MIDNIGHT_PRAYER_GROUPS).find(
        ([groupNumber]) => `midnight-${groupNumber}` === selectedGroupId
      )?.[1]
    : undefined;

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

      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error joining prayer group:", error);
      alert("An error occurred. Please try again later.");
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
    <section id="join-group" className="py-16 bg-background">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title="Join a Prayer Group"
          subtitle="Connect With Fellow Believers"
          description="Join one of our prayer groups and experience the power of corporate prayer. We have groups for different schedules and needs, including special midnight prayer groups."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Prayer Groups Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Available Groups</h3>
              <div className="space-y-4">
                {Object.entries(MIDNIGHT_PRAYER_GROUPS).map(
                  ([groupNumber, group]) => {
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
                        <h4 className="font-semibold mb-1">{group.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {group.day} at {group.time}
                        </p>
                        <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Special Group
                        </span>
                        {group.maxMembers &&
                          group.currentMembers !== undefined && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {group.currentMembers}/{group.maxMembers} members
                            </p>
                          )}
                      </div>
                    );
                  }
                )}
              </div>
            </Card>
          </div>

          {/* Join Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 sm:p-12">
              {selectedGroup && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold mb-2">
                    Selected Group: {selectedGroup.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedGroup.description}
                  </p>
                  <div className="text-sm">
                    <p>
                      <strong>Day:</strong> {selectedGroup.day}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedGroup.time}
                    </p>
                    <p>
                      <strong>Location:</strong> {selectedGroup.location}
                    </p>
                    {selectedGroup.contactPerson && (
                      <p>
                        <strong>Contact:</strong> {selectedGroup.contactPerson}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <InputField
                    name="name"
                    control={form.control}
                    label="Full Name"
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
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
