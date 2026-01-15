"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FieldError } from "@/components/ui/field";
import { SingleFileUpload } from "./SingleFileUpload";
import { cn } from "@/lib/utils";

interface FileFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  accept?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  showError?: boolean;
  uploadProgress?: number;
  maxSize?: number; // in bytes
}

export function FileField<T extends FieldValues>({
  name,
  control,
  label,
  accept,
  description,
  disabled,
  className,
  showError = true,
  uploadProgress,
  maxSize,
}: FileFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState }) => (
        <div className={cn("flex flex-col gap-1", className)}>
          <SingleFileUpload
            file={value || null}
            onFileChange={(file) => {
              onChange(file);
            }}
            accept={accept}
            label={label}
            description={description}
            uploadProgress={uploadProgress}
            disabled={disabled}
            maxSize={maxSize}
          />
          {showError && fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </div>
      )}
    />
  );
}
