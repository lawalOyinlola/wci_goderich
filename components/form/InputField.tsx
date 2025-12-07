"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  id?: string;
  type?: string;
  autoComplete?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
  disabled?: boolean;
  className?: string;
}

export function InputField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  id,
  type = "text",
  autoComplete,
  orientation = "vertical",
  disabled,
  className,
}: InputFieldProps<T>) {
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
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <Input
            {...field}
            id={fieldId}
            type={type}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            disabled={disabled}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
