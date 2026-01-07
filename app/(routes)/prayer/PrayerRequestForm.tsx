"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SectionHeader from "@/components/SectionHeader";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { CheckboxField } from "@/components/form/CheckboxField";
import { Card } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  FieldSet,
  FieldLegend,
  FieldError,
  FieldSeparator,
  FieldDescription,
} from "@/components/ui/field";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { CHURCH_INFO, PRAYER_CATEGORIES } from "@/lib/constants";

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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { CONTACT } = CHURCH_INFO;
  const {
    phone: churchPhone = "",
    email: churchEmail = "",
    address: churchAddress = "",
  } = CONTACT;

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

  // Watch email, phone, and isAnonymous fields to clear errors
  const emailValue = form.watch("email");
  const phoneValue = form.watch("phone");
  const isAnonymous = form.watch("isAnonymous");

  useEffect(() => {
    const hasEmail = emailValue && emailValue.trim().length > 0;
    const hasPhone = phoneValue && phoneValue.trim().length > 0;

    // If anonymous is checked OR at least one contact method is filled, clear errors
    if (isAnonymous || hasEmail || hasPhone) {
      if (form.formState.errors.email?.type === "manual") {
        form.clearErrors("email");
      }
      if (form.formState.errors.phone?.type === "manual") {
        form.clearErrors("phone");
      }
    }
  }, [emailValue, phoneValue, isAnonymous, form]);

  const onSubmit = async (data: PrayerRequestFormValues) => {
    const hasEmail = data.email && data.email.trim().length > 0;
    const hasPhone = data.phone && data.phone.trim().length > 0;

    // If not anonymous, require at least one contact method
    if (!data.isAnonymous && !hasEmail && !hasPhone) {
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
    }
  };

  if (submitSuccess) {
    return (
      <section id="prayer-request" className="bg-muted">
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
                <Link
                  href={`mailto:${churchEmail}`}
                  className="text-primary text-lg hover:underline"
                >
                  {churchEmail}
                </Link>
                <p className="mt-3 text-sm">{churchPhone}</p>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold">Church Premises</h2>
              {/* NOTE: Fix to open directions in Google Maps */}
              <p className="text-primary text-lg hover:underline">
                {churchAddress}
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
                <h3 className="text-xl font-semibold">
                  Send us your prayer request
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and our prayer team will intercede on
                  your behalf.
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

                <FieldSeparator className="mb-4" />
                <FieldSet>
                  <FieldLegend variant="label">Contact Information</FieldLegend>
                  <FieldDescription className="-mb-2">
                    Please provide at least one way for us to reach you
                    (optional if submitting anonymously)
                  </FieldDescription>
                  <div className="@md:grid-cols-2 grid gap-6">
                    <InputField
                      name="email"
                      control={form.control}
                      label="Email"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      showError={
                        !(
                          form.formState.errors.email?.message &&
                          form.formState.errors.phone?.message &&
                          form.formState.errors.email.message ===
                            form.formState.errors.phone.message
                        )
                      }
                    />
                    <InputField
                      name="phone"
                      control={form.control}
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      showError={
                        !(
                          form.formState.errors.email?.message &&
                          form.formState.errors.phone?.message &&
                          form.formState.errors.email.message ===
                            form.formState.errors.phone.message
                        )
                      }
                    />
                  </div>
                  {/* Show error if both fields have the same error (from manual setError) */}
                  {form.formState.errors.email?.message &&
                    form.formState.errors.phone?.message &&
                    form.formState.errors.email.message ===
                      form.formState.errors.phone.message && (
                      <FieldError>
                        {form.formState.errors.email.message}
                      </FieldError>
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

                <CheckboxField
                  name="isAnonymous"
                  control={form.control}
                  label="Submit anonymously (your name will not be shared publicly)"
                  description="If checked, you can submit without providing contact information"
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
                  icon={<PaperPlaneTiltIcon />}
                />
              </div>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}
