"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeftIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  UploadSimpleIcon,
  UserCircleIcon,
  XIcon,
} from "@phosphor-icons/react";

type Props = {
  onImageChange?: (blob: Blob | null) => void;
  className?: string;
  resetToken?: number;
  disabled?: boolean;
};

export default function AvatarCropUploader({
  onImageChange,
  className,
  resetToken,
  disabled = false,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [finalUrl, setFinalUrl] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const lastAreaKeyRef = useRef<string | null>(null);
  const lastProcessedFileRef = useRef<string | null>(null);

  // Native file input implementation
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    source: string;
  } | null>(null);

  const fileId = uploadedFile?.name;
  const previewUrl = uploadedFile?.source || null;

  // Handle file input change
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const file = event.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const source = URL.createObjectURL(file);
        setUploadedFile({ name: file.name, source });
      }
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [disabled]
  );

  // Trigger file input click
  const uploadFile = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  // Reset crop area when preview changes
  useEffect(() => {
    if (!previewUrl) {
      setCroppedAreaPixels(null);
    }
  }, [previewUrl]);

  // Open dialog on new upload
  useEffect(() => {
    if (fileId && fileId !== lastProcessedFileRef.current) {
      setIsDialogOpen(true);
      setZoom(1);
      lastProcessedFileRef.current = fileId;
    }
  }, [fileId]);

  // Cleanup object URLs
  useEffect(() => {
    const final = finalUrl;
    const preview = previewUrl;
    return () => {
      if (final && final.startsWith("blob:")) URL.revokeObjectURL(final);
      if (preview && preview.startsWith("blob:") && preview !== final) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [finalUrl, previewUrl]);

  // Helpers for cropping via pixel area
  type Area = { x: number; y: number; width: number; height: number };
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const cropToBlob = useCallback(async (): Promise<Blob | null> => {
    if (!previewUrl || !croppedAreaPixels) return null;
    try {
      const image = await createImage(previewUrl);
      const outputSize = 512;
      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.imageSmoothingQuality = "high";
      const { x, y, width, height } = croppedAreaPixels as Area;
      ctx.drawImage(image, x, y, width, height, 0, 0, outputSize, outputSize);
      return await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.92);
      });
    } catch {
      return null;
    }
  }, [previewUrl, croppedAreaPixels]);

  const handleApply = useCallback(async () => {
    if (!previewUrl || !croppedAreaPixels) {
      setIsDialogOpen(false);
      return;
    }
    const blob = await cropToBlob();
    if (!blob) {
      setIsDialogOpen(false);
      return;
    }
    const url = URL.createObjectURL(blob);
    if (finalUrl) URL.revokeObjectURL(finalUrl);
    setFinalUrl(url);
    onImageChange?.(blob);
    setIsDialogOpen(false);
  }, [cropToBlob, finalUrl, onImageChange, previewUrl, croppedAreaPixels]);

  const handleRemove = useCallback(() => {
    if (finalUrl) URL.revokeObjectURL(finalUrl);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setFinalUrl(null);
    lastProcessedFileRef.current = null;
    onImageChange?.(null);
  }, [finalUrl, previewUrl, onImageChange]);

  // Only show image/name when we have a finalized cropped image
  const displayUrl = finalUrl;
  const selectedName = finalUrl ? uploadedFile?.name ?? null : null;

  // Parent-driven reset
  useEffect(() => {
    if (resetToken !== undefined) {
      if (finalUrl) URL.revokeObjectURL(finalUrl);
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setFinalUrl(null);
      lastProcessedFileRef.current = null;
      onImageChange?.(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetToken]);

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-center flex-col gap-2 min-w-0 shrink">
          <Button
            type="button"
            variant="outline"
            onClick={uploadFile}
            disabled={disabled}
            aria-label={displayUrl ? "Change image" : "Upload image"}
            className="whitespace-nowrap"
          >
            <UploadSimpleIcon size={32} className="shrink-0" />
            <span className="hidden sm:inline">
              {displayUrl ? "Change image" : "Select image"}
            </span>
            <span className="sm:hidden">
              {displayUrl ? "Change" : "Select"}
            </span>
          </Button>

          <div className="space-y-1 text-muted-foreground text-xs text-center w-full min-w-0">
            {selectedName ? (
              <p className="max-w-full truncate px-1" title={selectedName}>
                {selectedName}
              </p>
            ) : (
              <p aria-live="polite" role="region" className="px-1 line-clamp-2">
                Upload a clear square photo
              </p>
            )}
          </div>
        </div>

        <div className="relative inline-flex shrink-0">
          {displayUrl && (
            <>
              <button
                type="button"
                className="border-card bg-background hover:bg-accent/50 relative flex size-18 items-center justify-center overflow-hidden rounded-md border border-dashed transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={uploadFile}
                disabled={disabled}
                aria-label={displayUrl ? "Change image" : "Upload image"}
              >
                {displayUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="size-full object-cover"
                    src={displayUrl}
                    alt="Selected image preview"
                    width={72}
                    height={72}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <UserCircleIcon size={20} className="opacity-60" />
                )}
              </button>
              {displayUrl && (
                <Button
                  type="button"
                  onClick={handleRemove}
                  size="icon"
                  disabled={disabled}
                  className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                  aria-label="Remove image"
                >
                  <XIcon size={14} />
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="gap-0 p-0 sm:max-w-140 *:[button]:hidden">
          <DialogDescription className="sr-only">
            Crop image dialog
          </DialogDescription>
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="flex items-center justify-between border-b p-4 text-base -my-1">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="opacity-80"
                  onClick={() => setIsDialogOpen(false)}
                  aria-label="Cancel"
                >
                  <ArrowLeftIcon size={36} />
                </Button>
                <span>Crop image</span>
              </div>
              <Button onClick={handleApply} disabled={!previewUrl} autoFocus>
                Apply
              </Button>
            </DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <Cropper
              className="h-96 sm:h-120"
              image={previewUrl}
              zoom={zoom}
              onCropChange={(area) => {
                if (!area) {
                  lastAreaKeyRef.current = null;
                  setCroppedAreaPixels(null);
                  return;
                }
                const next = area as unknown as {
                  x: number;
                  y: number;
                  width: number;
                  height: number;
                };
                const key = `${next.x}|${next.y}|${next.width}|${next.height}`;
                if (lastAreaKeyRef.current !== key) {
                  lastAreaKeyRef.current = key;
                  setCroppedAreaPixels(next);
                }
              }}
              onZoomChange={setZoom}
            >
              <CropperDescription />
              <CropperImage />
              <CropperCropArea />
            </Cropper>
          )}
          <DialogFooter className="border-t px-4 py-6">
            <div className="mx-auto flex w-full max-w-80 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setZoom((z) => Math.max(1, Number((z - 0.1).toFixed(2))))
                }
                aria-label="Zoom out"
              >
                <MagnifyingGlassMinusIcon size={20} aria-hidden="true" />
              </Button>

              <Slider
                defaultValue={[1]}
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(value) =>
                  setZoom(Math.min(3, Math.max(1, Number(value[0].toFixed(2)))))
                }
                aria-label="Zoom slider"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setZoom((z) => Math.min(3, Number((z + 0.1).toFixed(2))))
                }
                aria-label="Zoom in"
              >
                <MagnifyingGlassPlusIcon size={20} aria-hidden="true" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
