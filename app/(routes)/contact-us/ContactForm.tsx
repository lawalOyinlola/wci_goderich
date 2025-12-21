"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SectionHeader from "@/components/SectionHeader";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { TextAreaField } from "@/components/form/TextAreaField";
import * as yup from "yup";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  FieldSet,
  FieldLegend,
  FieldError,
  FieldSeparator,
  FieldDescription,
} from "@/components/ui/field";
import { CHURCH_INFO, LEADERSHIP } from "@/lib/constants";
import { LeadershipRole } from "@/lib/types";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";

type ContactFormValues = {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
};

const contactSchema: yup.ObjectSchema<ContactFormValues> = yup.object({
  name: yup
    .string()
    .required("Full name is required")
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
  subject: yup
    .string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must not exceed 200 characters"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

const subjectOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "prayer", label: "Prayer Request" },
  { value: "visitor", label: "New Visitor Information" },
  { value: "ministry", label: "Ministry Information" },
  { value: "event", label: "Event Information" },
  { value: "donation", label: "Donation Inquiry" },
  { value: "counseling", label: "Pastoral Counseling" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const { CONTACT } = CHURCH_INFO;
  const { email: churchEmail = "", phone: churchPhone = "" } = CONTACT;

  const { PASTORS } = LEADERSHIP;
  const residentPastor = PASTORS.find(
    (pastor) => pastor.role === LeadershipRole.RESIDENT_PASTOR
  );
  const {
    email: pastorEmail = "",
    phone: pastorPhone = "",
    title: pastorTitle = "",
  } = residentPastor ?? {};

  const form = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onTouched",
  });

  // Watch email and phone fields to clear errors when one is filled
  const emailValue = form.watch("email");
  const phoneValue = form.watch("phone");

  useEffect(() => {
    const hasEmail = emailValue && emailValue.trim().length > 0;
    const hasPhone = phoneValue && phoneValue.trim().length > 0;

    // If at least one is filled, clear errors on both fields
    if (hasEmail || hasPhone) {
      if (form.formState.errors.email?.type === "manual") {
        form.clearErrors("email");
      }
      if (form.formState.errors.phone?.type === "manual") {
        form.clearErrors("phone");
      }
    }
  }, [emailValue, phoneValue, form]);

  const onSubmit = async (data: ContactFormValues) => {
    // Check if at least one contact method is provided
    const hasEmail = data.email && data.email.trim().length > 0;
    const hasPhone = data.phone && data.phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      // Set errors on both fields to show error states
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
      // TODO: Implement form submission to your backend/API
      console.log("Form data:", data);

      // For now, show success message
      alert("Thank you for contacting us! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="bg-muted">
      <div className="small-container max-w-4xl">
        <SectionHeader
          title="How can we help you?"
          subtitle="Contact Us"
          description="We'd love to hear from you. Whether you have a question, prayer request, or just want to connect, we're here to help."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="grid grid-cols-2 lg:col-span-2 lg:block lg:space-y-12">
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
            {pastorEmail && (
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">{pastorTitle}</h3>
                  <Link
                    href={`mailto:${pastorEmail}`}
                    className="text-primary text-lg hover:underline"
                  >
                    {pastorEmail}
                  </Link>
                  {pastorPhone && <p className="mt-3 text-sm">{pastorPhone}</p>}
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="@container lg:col-span-3"
          >
            <Card className="p-8 sm:p-12">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Send us a message</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              <div className="mt-6 space-y-6">
                <InputField
                  name="name"
                  control={form.control}
                  label="Full Name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                <FieldSeparator className="mb-4" />
                <FieldSet>
                  <FieldLegend variant="label">Contact Information</FieldLegend>
                  <FieldDescription className="-mb-2">
                    Please provide at least one way for us to reach you
                  </FieldDescription>
                  <div className="@md:grid-cols-2 grid gap-6">
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
                  name="subject"
                  control={form.control}
                  label="Subject"
                  placeholder="Select a subject"
                  options={subjectOptions}
                />

                <TextAreaField
                  name="message"
                  control={form.control}
                  label="Message"
                  placeholder="Tell us how we can help you..."
                  rows={6}
                />

                <AnimatedButton
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                  text={
                    form.formState.isSubmitting ? "Sending..." : "Send Message"
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
