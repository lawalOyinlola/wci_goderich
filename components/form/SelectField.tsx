"use client";

import { cn } from "@/lib/utils";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  id?: string;
  options: SelectOption[];
  orientation?: "vertical" | "horizontal" | "responsive";
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
  /**
   * Transform the string value before passing to field.onChange
   * Useful for converting strings to numbers or other types
   */
  transformValue?: (value: string) => unknown;
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select...",
  id,
  options,
  orientation = "vertical",
  disabled,
  className,
  onValueChange,
  transformValue,
}: SelectFieldProps<T>) {
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
          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={(val) => {
              const transformedValue = transformValue
                ? transformValue(val)
                : val;
              field.onChange(transformedValue);
              onValueChange?.(val);
            }}
            disabled={disabled}
          >
            <SelectTrigger
              id={fieldId}
              className="h-10 bg-background"
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
