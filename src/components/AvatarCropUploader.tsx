"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
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
};

export default function AvatarCropUploader({
  onImageChange,
  className,
  resetToken,
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

  const [{ files }, { openFileDialog, removeFile, clearFiles, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      multiple: false,
      maxSize: 1024 * 1024 * 8,
    });

  const previewUrl = files[0]?.preview || null;
  const fileId = files[0]?.id;

  const previousFileIdRef = useRef<string | undefined | null>(null);

  // Reset crop area when preview changes
  useEffect(() => {
    if (!previewUrl) {
      setCroppedAreaPixels(null);
    }
  }, [previewUrl]);

  // Open dialog on new upload
  useEffect(() => {
    if (fileId && fileId !== previousFileIdRef.current) {
      setIsDialogOpen(true);
      setZoom(1);
    }
    previousFileIdRef.current = fileId;
  }, [fileId]);

  // Cleanup object URLs
  useEffect(() => {
    const url = finalUrl;
    return () => {
      if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
    };
  }, [finalUrl]);

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
    if (!previewUrl || !fileId || !croppedAreaPixels) {
      if (fileId) {
        removeFile(fileId);
      }
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
  }, [
    cropToBlob,
    finalUrl,
    onImageChange,
    previewUrl,
    fileId,
    croppedAreaPixels,
    removeFile,
  ]);

  const handleRemove = useCallback(() => {
    if (finalUrl) URL.revokeObjectURL(finalUrl);
    setFinalUrl(null);
    onImageChange?.(null);
    clearFiles();
  }, [clearFiles, finalUrl, onImageChange]);

  const displayUrl = finalUrl || previewUrl || null;
  const selectedName = useMemo(() => {
    const f = files[0]?.file as File | undefined;
    return f?.name ?? null;
  }, [files]);

  // Parent-driven reset
  useEffect(() => {
    if (resetToken !== undefined) {
      if (finalUrl) URL.revokeObjectURL(finalUrl);
      setFinalUrl(null);
      onImageChange?.(null);
      clearFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetToken]);

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={openFileDialog}
            aria-label={displayUrl ? "Change image" : "Upload image"}
          >
            <UploadSimpleIcon size={32} />
            Select image
          </Button>

          <div className="space-y-1 text-muted-foreground text-xs text-center">
            {selectedName ? (
              <p>{selectedName}</p>
            ) : (
              <p aria-live="polite" role="region">
                Upload a clear square photo
              </p>
            )}
          </div>
        </div>

        <div className="relative inline-flex">
          {displayUrl && (
            <>
              <button
                type="button"
                className="border-card bg-background hover:bg-accent/50 relative flex size-18 items-center justify-center overflow-hidden rounded-md border border-dashed transition-colors"
                onClick={openFileDialog}
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
                  className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
                  aria-label="Remove image"
                >
                  <XIcon size={14} />
                </Button>
              )}
            </>
          )}
          <input
            {...getInputProps({ accept: "image/*", multiple: false })}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
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
