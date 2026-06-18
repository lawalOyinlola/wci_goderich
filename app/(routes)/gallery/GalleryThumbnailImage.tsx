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
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset when src changes
  useEffect(() => {
    setImageSrc(optimizeCloudinaryUrl(src));
    setHasError(false);
    setRetryCount(0);
    setIsRetrying(false);
    setIsLoaded(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [src]);

  // Handle images already cached/complete before onLoad fires
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imageSrc]);

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
      }, retryDelay * Math.pow(2, retryCount));
    } else {
      console.error(`Failed to load thumbnail after ${maxRetries} retries: ${src}`);
      setHasError(true);
      setIsRetrying(false);
    }
  };

  const handleLoad = () => {
    setIsRetrying(false);
    setIsLoaded(true);
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
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={cn(
        // GPU-promote each image to its own compositing layer so it isn't
        // re-rasterized (and flickering) as it scrolls behind the fixed,
        // backdrop-blurred navbar.
        "transform-gpu backface-hidden transition-opacity duration-500 ease-out",
        isLoaded ? "opacity-100" : "opacity-0",
        isRetrying && "opacity-50",
        className
      )}
      loading="lazy"
      decoding="async"
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
