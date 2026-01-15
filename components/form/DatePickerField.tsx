"use client";

import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { format } from "date-fns";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  id?: string;
  description?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
  disabled?: boolean;
  className?: string;
  showError?: boolean;
}

export function DatePickerField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Pick a date",
  id,
  description,
  orientation = "vertical",
  disabled,
  className,
  showError = true,
}: DatePickerFieldProps<T>) {
  const fieldId = id || `field-${name}`;
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        let dateValue: Date | undefined = undefined;

        if (field.value && typeof field.value === "string") {
          const parsedDate = new Date(field.value);
          // Check if date is valid
          if (!isNaN(parsedDate.getTime())) {
            dateValue = parsedDate;
          }
        }

        return (
          <Field
            data-invalid={fieldState.invalid}
            data-disabled={disabled}
            orientation={orientation}
            className={cn(className, "gap-1")}
          >
            {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <div className="flex">
                <InputGroup className="w-full">
                  <InputGroupInput
                    id={fieldId}
                    readOnly
                    placeholder={placeholder}
                    value={
                      dateValue && !isNaN(dateValue.getTime())
                        ? format(dateValue, "PPP")
                        : ""
                    }
                    onClick={() => !disabled && setOpen(true)}
                    aria-invalid={fieldState.invalid}
                    disabled={disabled}
                    className="cursor-pointer"
                  />
                  <InputGroupAddon align="inline-end">
                    <PopoverTrigger asChild>
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        disabled={disabled}
                      >
                        <CalendarBlankIcon size={24} />
                      </InputGroupButton>
                    </PopoverTrigger>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <PopoverContent
                className="w-auto p-0"
                align="start"
                sideOffset={4}
              >
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={(date) => {
                    if (date) {
                      // Convert to ISO string format (YYYY-MM-DD) for form submission
                      const isoDate = date.toISOString().split("T")[0];
                      field.onChange(isoDate);
                      setOpen(false);
                    } else {
                      // Allow clearing the date
                      field.onChange("");
                    }
                  }}
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>
            {description && <FieldDescription>{description}</FieldDescription>}
            {showError && fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
}
