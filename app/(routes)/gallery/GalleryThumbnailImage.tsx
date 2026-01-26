"use client";

import { useState, useEffect, useRef } from "react";
import { optimizeCloudinaryUrl } from "@/lib/utils/cloudinary";
import { cn } from "@/lib/utils";

interface GalleryThumbnailImageProps {
  src: string;
  alt: string;
  className?: string;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * A robust thumbnail image component with error handling and retry logic
 * Used for gallery thumbnails in the grid
 */
export function GalleryThumbnailImage({
  src,
  alt,
  className,
  maxRetries = 2,
  retryDelay = 800,
}: GalleryThumbnailImageProps) {
  const [imageSrc, setImageSrc] = useState(() => optimizeCloudinaryUrl(src));
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when src changes
  useEffect(() => {
    setImageSrc(optimizeCloudinaryUrl(src));
    setHasError(false);
    setRetryCount(0);
    setIsRetrying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [src]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      setIsRetrying(true);
      const nextRetry = retryCount + 1;

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Retry with exponential backoff
      timeoutRef.current = setTimeout(() => {
        setRetryCount(nextRetry);
        // Force re-render by updating src with retry parameter
        const retryUrl = optimizeCloudinaryUrl(src, { retry: nextRetry });
        setImageSrc(retryUrl);
        setIsRetrying(false);
        timeoutRef.current = null;
      }, retryDelay * nextRetry);
    } else {
      console.error(`Failed to load thumbnail after ${maxRetries} retries: ${src}`);
      setHasError(true);
      setIsRetrying(false);
    }
  };

  const handleLoad = () => {
    setIsRetrying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div
        className={cn(
          "relative w-full h-full bg-muted flex items-center justify-center",
          className
        )}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={cn(
        isRetrying && "opacity-50",
        className
      )}
      loading="lazy"
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
