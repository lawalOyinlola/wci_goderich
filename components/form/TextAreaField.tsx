"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface TextAreaFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  id?: string;
  rows?: number;
  description?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
  disabled?: boolean;
  className?: string;
  showError?: boolean;
}

export function TextAreaField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  id,
  rows = 4,
  description,
  orientation = "vertical",
  disabled,
  className,
  showError = true,
}: TextAreaFieldProps<T>) {
  const fieldId = id || `field-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          data-disabled={disabled}
          orientation={orientation}
          className={cn(className, "gap-1")}
        >
          {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
          <Textarea
            {...field}
            id={fieldId}
            rows={rows}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            disabled={disabled}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {showError && fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
