"use client";

import { useState, useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

export function FooterNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const newsletterSchema: yup.ObjectSchema<{ email: string }> = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .matches(EMAIL_REGEX, "Please enter a valid email address")
      .required("Email is required"),
  });

  const form = useForm<{ email: string }>({
    resolver: yupResolver(newsletterSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (values: { email: string }) => {
    try {
      setIsSubmitting(true);
      // TODO: hook up to your newsletter API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("newsletter", values);

      // Show success state
      setIsSuccess(true);
      form.reset();

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset success message after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setIsSuccess(false);
        timeoutRef.current = null;
      }, 5000);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      // Handle error (you can add error state if needed)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (isSuccess) {
    return (
      <div className="text-sm mt-8 p-4 rounded-md max-w-md w-full">
        <div
          className="flex items-center gap-3 p-4 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
          role="alert"
        >
          <CheckCircle className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
          <div className="flex-1">
            <p className="font-medium">Successfully subscribed!</p>
            <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">
              Thank you for joining our newsletter. We&apos;ll keep you updated
              with the latest news and events.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(handleSubmit)}
      className={cn("text-sm mt-8 p-4 rounded-md max-w-md w-full")}
    >
      <div className="space-y-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              orientation="vertical"
              className="gap-2"
            >
              <FieldLabel htmlFor="mail" className="block font-medium">
                Stay Connected
              </FieldLabel>
              <div className="flex gap-4">
                <Input
                  {...field}
                  id="mail"
                  type="email"
                  placeholder="Your email"
                  className="h-9 text-sm"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                <AnimatedButton
                  type="submit"
                  text={isSubmitting ? "Subscribing..." : "Subscribe"}
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldDescription>
          Get updates about services, events, and ministry opportunities
        </FieldDescription>
      </div>
    </form>
  );
}
