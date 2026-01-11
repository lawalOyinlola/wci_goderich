"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  FileIcon,
  VideoIcon,
  HeadphonesIcon,
  UploadIcon,
  XIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { cn, formatBytes } from "@/lib/utils";

interface SingleFileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  label?: string;
  description?: string;
  uploadProgress?: number;
  disabled?: boolean;
  className?: string;
  maxSize?: number; // in bytes
}

const getFileIcon = (file: File) => {
  const fileType = file.type;

  if (fileType.startsWith("video/")) {
    return VideoIcon;
  }
  if (fileType.startsWith("audio/")) {
    return HeadphonesIcon;
  }
  if (fileType.startsWith("image/")) {
    return FileIcon;
  }

  return FileIcon;
};

export function SingleFileUpload({
  file,
  onFileChange,
  accept,
  label,
  description,
  uploadProgress,
  disabled,
  className,
  maxSize,
}: SingleFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) {
        onFileChange(null);
        return;
      }

      // Validate file size if maxSize is provided
      if (maxSize && selectedFile.size > maxSize) {
        const maxSizeMB = Math.round(maxSize / (1024 * 1024));
        alert(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      onFileChange(selectedFile);
    },
    [onFileChange, maxSize]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;
      handleFileSelect(selectedFile);
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFileSelect]
  );

  const handleRemove = useCallback(() => {
    handleFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [handleFileSelect]);

  const handleChooseFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [disabled, handleFileSelect]
  );

  const FileIconComponent = file ? getFileIcon(file) : FileIcon;
  const isUploading =
    uploadProgress !== undefined && uploadProgress > 0 && uploadProgress < 100;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-medium text-sm">{label}</h3>
          {file ? (
            <Button
              onClick={handleRemove}
              size="sm"
              variant="outline"
              disabled={disabled || isUploading}
              type="button"
            >
              <TrashIcon
                aria-hidden="true"
                className="-ms-0.5 size-3.5 opacity-60"
                weight="regular"
              />
              Remove file
            </Button>
          ) : (
            <Button
              onClick={handleChooseFile}
              size="sm"
              variant="outline"
              disabled={disabled}
              type="button"
            >
              <UploadIcon
                aria-hidden="true"
                className="-ms-0.5 size-3.5 opacity-60"
                weight="regular"
              />
              Choose file
            </Button>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors",
          "has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50",
          isDragging && "bg-accent/50",
          file && "min-h-20",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          aria-label={label || "Upload file"}
          className="sr-only"
        />

        {file ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-col gap-1 rounded-lg border bg-background p-2 pe-3 transition-opacity duration-300">
              <div className="flex items-center justify-between gap-2">
                <div
                  className={cn(
                    "flex items-center gap-3 overflow-hidden",
                    isUploading && "opacity-50"
                  )}
                >
                  <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                    <FileIconComponent
                      className="size-5 opacity-60"
                      weight="regular"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="truncate font-medium text-[13px]">
                      {file.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  aria-label="Remove file"
                  className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onClick={handleRemove}
                  size="icon"
                  variant="ghost"
                  disabled={disabled || isUploading}
                  type="button"
                >
                  <XIcon
                    aria-hidden="true"
                    className="size-4"
                    weight="regular"
                  />
                </Button>
              </div>

              {/* Upload progress bar */}
              {isUploading && uploadProgress !== undefined && (
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="w-10 text-muted-foreground text-xs tabular-nums">
                    {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              aria-hidden="true"
              className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            >
              <FileIcon className="size-4 opacity-60" weight="regular" />
            </div>
            <p className="mb-1.5 font-medium text-sm">
              {isDragging ? "Drop file here" : "Drop your file here"}
            </p>
            {description && (
              <p className="text-muted-foreground text-xs mb-4">
                {description}
              </p>
            )}
            <Button
              onClick={handleChooseFile}
              variant="outline"
              disabled={disabled}
              type="button"
            >
              <UploadIcon
                aria-hidden="true"
                className="-ms-1 opacity-60"
                weight="regular"
              />
              Choose file
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
