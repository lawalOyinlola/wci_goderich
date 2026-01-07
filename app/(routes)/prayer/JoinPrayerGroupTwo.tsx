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
import Link from "next/link";

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

export default function JoinPrayerGroupTwo() {
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
    <section id="prayer-request" className="bg-muted">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title="Submit Your Prayer Request"
          subtitle="We're Here to Pray With You"
          description="Share your prayer needs with us. Our prayer team is committed to interceding on your behalf. Your request will be handled with care and confidentiality."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="grid grid-cols-2 lg:block lg:space-y-12">
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <h2 className="mb-3 text-lg font-semibold">Church Office</h2>
                <Link href="/" className="text-primary text-lg hover:underline">
                  adress of church
                </Link>
                <p className="mt-3 text-sm">Phone number of church</p>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold">Church Premises</h2>
              {/* NOTE: Fix to open directions in Google Maps */}
              <p className="text-primary text-lg hover:underline">
                Address of church
              </p>
              <p className="mt-3 text-sm">
                You can submit your prayer request to the ushers during any of
                our services.
              </p>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="@container lg:col-span-2"
          >
            <Card className="p-8 sm:p-12">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Join a Prayer Group</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below so we can add you to a prayer group.
                </p>
              </div>

              <div className="mt-6 space-y-6">
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
                  label="Your Prayer Request"
                  placeholder="Share your prayer need with us..."
                  rows={6}
                />

                <AnimatedButton
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                  text={
                    form.formState.isSubmitting
                      ? "Submitting..."
                      : "Submit Prayer Request"
                  }
                  icon={<UserPlusIcon />}
                />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}
