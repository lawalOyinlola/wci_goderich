"use client";

import * as React from "react";
import {
  FormProvider,
  useFormContext,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";

export function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  ...props
}: UseFormReturn<TFieldValues> & { children: React.ReactNode }) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export function FormField({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const { formState } = useFormContext();
  const isInvalid = Boolean(
    formState.errors[name as keyof typeof formState.errors]
  );
  return (
    <div
      className={cn(
        "space-y-2",
        isInvalid && "[&>*]:aria-[invalid=true]:ring-destructive/30"
      )}
    >
      {children}
    </div>
  );
}

export function FormMessage({ children }: { children?: React.ReactNode }) {
  return (
    <p className="text-[12px] text-destructive text-right mr-1">{children}</p>
  );
}
