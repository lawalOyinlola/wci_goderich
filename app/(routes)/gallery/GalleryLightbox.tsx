"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { CaretLeftIcon, CaretRightIcon, XIcon } from "@phosphor-icons/react";
import { optimizeCloudinaryUrl } from "@/lib/utils/cloudinary";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types/gallery";

interface GalleryLightboxProps {
  images: GalleryImage[];
  /** Index to open at; the lightbox manages the active index internally afterwards. */
  startIndex: number;
  open: boolean;
  onClose: () => void;
}

// Directional slide for navigating between images.
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -320 : 320,
    opacity: 0,
  }),
};

// Treats fast flicks as a swipe even when the drag distance is short.
const SWIPE_THRESHOLD = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export default function GalleryLightbox({
  images,
  startIndex,
  open,
  onClose,
}: GalleryLightboxProps) {
  const [mounted, setMounted] = useState(false);
  // [activeIndex, slideDirection]
  const [[index, direction], setPage] = useState<[number, number]>([
    startIndex,
    0,
  ]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Sync to the requested image each time the lightbox is opened.
  useEffect(() => {
    if (open) setPage([startIndex, 0]);
  }, [open, startIndex]);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([current]) => {
        const next = current + newDirection;
        // Clamp to the loaded set (navigation stays within the current page).
        if (next < 0 || next > images.length - 1) return [current, 0];
        return [next, newDirection];
      });
    },
    [images.length]
  );

  // Shift keyboard focus into the dialog when it opens.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  // Keyboard navigation + body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") paginate(1);
      else if (event.key === "ArrowLeft") paginate(-1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("overflow-hidden");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, onClose, paginate]);

  if (!mounted) return null;

  const current = images[index];
  const hasMultiple = images.length > 1;
  const atStart = index === 0;
  const atEnd = index === images.length - 1;

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const power = swipePower(info.offset.x, info.velocity.x);
    if (power < -SWIPE_THRESHOLD) paginate(1);
    else if (power > SWIPE_THRESHOLD) paginate(-1);
  };

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="gallery-lightbox"
          className="fixed inset-0 z-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close image viewer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed right-4 top-4 z-20 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <XIcon className="size-5" />
          </button>

          {/* Counter */}
          {hasMultiple && (
            <div className="fixed left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              {index + 1} / {images.length}
            </div>
          )}

          {/* Previous */}
          {hasMultiple && (
            <button
              type="button"
              aria-label="Previous image"
              disabled={atStart}
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className={cn(
                "fixed left-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:left-4 sm:size-12",
                atStart && "pointer-events-none opacity-30"
              )}
            >
              <CaretLeftIcon className="size-6" weight="bold" />
            </button>
          )}

          {/* Next */}
          {hasMultiple && (
            <button
              type="button"
              aria-label="Next image"
              disabled={atEnd}
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className={cn(
                "fixed right-2 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-4 sm:size-12",
                atEnd && "pointer-events-none opacity-30"
              )}
            >
              <CaretRightIcon className="size-6" weight="bold" />
            </button>
          )}

          {/* Image stage (swipeable) */}
          <div className="relative flex h-full w-full items-center justify-center px-4 py-16 sm:px-16">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag={hasMultiple ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
                className="relative flex max-h-full max-w-full cursor-grab flex-col items-center active:cursor-grabbing"
              >
                <LightboxImage
                  src={current.imageUrl}
                  alt={current.altText}
                  className="max-h-[80vh] w-auto max-w-[92vw] select-none rounded-md object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            {(current.description ?? current.title) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/80 to-transparent p-4 pt-12 text-center sm:px-16">
                <p className="mx-auto max-w-2xl text-sm text-white/80 line-clamp-2">
                  {current.description ?? current.title}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface LightboxImageProps {
  src: string;
  alt: string;
  className?: string;
  maxRetries?: number;
  retryDelay?: number;
}

/** Full-size lightbox image with the same retry/error handling as the gallery thumbnails. */
function LightboxImage({
  src,
  alt,
  className,
  maxRetries = 3,
  retryDelay = 1000,
}: LightboxImageProps) {
  const [imageSrc, setImageSrc] = useState(() => optimizeCloudinaryUrl(src));
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setImageSrc(optimizeCloudinaryUrl(src));
    setHasError(false);
    setIsLoaded(false);
    retryCountRef.current = 0;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [src]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleError = () => {
    if (retryCountRef.current < maxRetries) {
      const nextRetry = retryCountRef.current + 1;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        retryCountRef.current = nextRetry;
        setImageSrc(optimizeCloudinaryUrl(src, { retry: nextRetry }));
        timeoutRef.current = null;
      }, retryDelay * nextRetry);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="grid min-h-[200px] min-w-[200px] place-items-center rounded-md bg-white/5 p-8 text-center text-white/70">
        <p className="text-sm">Image unavailable</p>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        draggable={false}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </>
  );
}
