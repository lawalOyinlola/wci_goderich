"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  id?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  showError?: boolean;
}

export function CheckboxField<T extends FieldValues>({
  name,
  control,
  label,
  id,
  description,
  disabled,
  className,
  showError = true,
}: CheckboxFieldProps<T>) {
  const fieldId = id || `field-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          data-disabled={disabled}
          orientation="vertical"
          className={cn(className, "gap-1")}
        >
          <div className="flex items-center gap-3">
            <Checkbox
              id={fieldId}
              checked={Boolean(field.value)}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
            />
            {label && (
              <FieldLabel
                htmlFor={fieldId}
                className="cursor-pointer font-normal text-sm text-foreground"
              >
                {label}
              </FieldLabel>
            )}
          </div>
          {description && (
            <FieldDescription className="ml-7">{description}</FieldDescription>
          )}
          {showError && fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
