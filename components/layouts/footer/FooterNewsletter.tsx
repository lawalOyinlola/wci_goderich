"use client";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";

export function FooterNewsletter() {
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

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((values) => {
        // TODO: hook up to your newsletter API
        console.log("newsletter", values);
        form.reset();
      })}
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
                />
                <Button type="submit" className="h-9">
                  Submit
                </Button>
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
