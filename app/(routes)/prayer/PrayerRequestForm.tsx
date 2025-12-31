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
import { FieldSet, FieldLegend, FieldSeparator } from "@/components/ui/field";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { PRAYER_CATEGORIES } from "@/lib/constants/prayer";

type PrayerRequestFormValues = {
  name: string;
  email?: string;
  phone?: string;
  category: string;
  request: string;
  isAnonymous: boolean;
};

const prayerRequestSchema: yup.ObjectSchema<PrayerRequestFormValues> =
  yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    email: yup
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .email("Please enter a valid email address"),
    phone: yup
      .string()
      .optional()
      .transform((value) => (value === "" ? undefined : value))
      .matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        "Please enter a valid phone number"
      ),
    category: yup.string().required("Please select a prayer category"),
    request: yup
      .string()
      .required("Prayer request is required")
      .min(10, "Prayer request must be at least 10 characters")
      .max(1000, "Prayer request must not exceed 1000 characters"),
    isAnonymous: yup.boolean().default(false),
  });

const categoryOptions = PRAYER_CATEGORIES.map((cat) => ({
  value: cat.value,
  label: cat.label,
}));

export default function PrayerRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<PrayerRequestFormValues>({
    resolver: yupResolver(prayerRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      request: "",
      isAnonymous: false,
    },
    mode: "onTouched",
  });



  const onSubmit = async (data: PrayerRequestFormValues) => {
    const hasEmail = data.email && data.email.trim().length > 0;
    const hasPhone = data.phone && data.phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      form.setError("email", {
        type: "manual",
        message: "Please provide either an email or phone number",
      });
      form.setError("phone", {
        type: "manual",
        message: "Please provide either an email or phone number",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prayer/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit prayer request");
      }

      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting prayer request:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section id="prayer-request" className="py-16 bg-muted">
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
              Prayer Request Submitted!
            </h3>
            <p className="text-muted-foreground">
              Thank you for sharing your prayer request. Our prayer team will be
              praying for you. God bless you!
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="prayer-request" className="py-16 bg-muted">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title="Submit Your Prayer Request"
          subtitle="We're Here to Pray With You"
          description="Share your prayer needs with us. Our prayer team is committed to interceding on your behalf. Your request will be handled with care and confidentiality."
        />
        <Card className="p-8 sm:p-12 mt-12">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <InputField
                name="name"
                control={form.control}
                label="Your Name"
                placeholder="Enter your full name"
                autoComplete="name"
              />

              <FieldSeparator className="mb-4" />
              <FieldSet>
                <FieldLegend variant="label">Contact Information</FieldLegend>
                <p className="text-sm text-muted-foreground mb-4">
                  Please provide at least one way for us to reach you (optional
                  if submitting anonymously)
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    name="email"
                    control={form.control}
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                  <InputField
                    name="phone"
                    control={form.control}
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </div>
                {form.formState.errors.email?.message &&
                  form.formState.errors.phone?.message &&
                  form.formState.errors.email.message ===
                    form.formState.errors.phone.message && (
                    <p className="text-sm text-destructive mt-2">
                      {form.formState.errors.email.message}
                    </p>
                  )}
              </FieldSet>
              <FieldSeparator className="mb-4" />

              <SelectField
                name="category"
                control={form.control}
                label="Prayer Category"
                placeholder="Select a category"
                options={categoryOptions}
              />

              <TextAreaField
                name="request"
                control={form.control}
                label="Your Prayer Request"
                placeholder="Share your prayer need with us..."
                rows={6}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  {...form.register("isAnonymous")}
                  className="rounded border-gray-300"
                />
                <label
                  htmlFor="isAnonymous"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Submit anonymously (your name will not be shared publicly)
                </label>
              </div>

              <AnimatedButton
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                text={isSubmitting ? "Submitting..." : "Submit Prayer Request"}
                icon={<PaperPlaneTiltIcon />}
              />
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
