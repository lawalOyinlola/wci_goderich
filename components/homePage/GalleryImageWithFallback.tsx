"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl, isCloudinaryUrl } from "@/lib/utils/cloudinary";

interface GalleryImageWithFallbackProps {
  src: string;
  alt: string;
  priority?: boolean;
  maxRetries?: number;
  retryDelay?: number;
}

export function GalleryImageWithFallback({
  src,
  alt,
  priority = false,
  maxRetries = 3,
  retryDelay = 1000,
}: GalleryImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(() => optimizeCloudinaryUrl(src));
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Track mount status
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Clear any pending timeout on unmount
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, []);

  // Reset when src changes and cleanup timeout
  useEffect(() => {
    // Clear any pending retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    setImageSrc(optimizeCloudinaryUrl(src));
    setHasError(false);
    setRetryCount(0);
    setIsRetrying(false);

    // Cleanup function to clear timeout when src changes
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [src]);

  const handleError = () => {
    // Don't proceed if component is unmounted
    if (!isMountedRef.current) {
      return;
    }

    if (retryCount < maxRetries) {
      setIsRetrying(true);
      const nextRetry = retryCount + 1;

      // Clear any existing timeout
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }

      // Retry with exponential backoff
      retryTimeoutRef.current = setTimeout(() => {
        // Check if component is still mounted before updating state
        if (!isMountedRef.current) {
          return;
        }

        // Use current imageSrc (not raw src) to compute retry URL
        let retryUrl: string;
        const optimizedUrl = optimizeCloudinaryUrl(imageSrc, { retry: nextRetry });
        
        // If optimizeCloudinaryUrl didn't modify the URL (non-Cloudinary or no retry param added),
        // add cache-busting query param manually
        if (optimizedUrl === imageSrc || !isCloudinaryUrl(imageSrc)) {
          try {
            // Handle both absolute and relative URLs
            let urlObj: URL;
            if (imageSrc.startsWith("http://") || imageSrc.startsWith("https://") || imageSrc.startsWith("//")) {
              urlObj = new URL(imageSrc);
            } else {
              // Relative URL - use current window location as base
              urlObj = new URL(imageSrc, window.location.href);
            }
            urlObj.searchParams.set("_cb", String(Date.now()));
            retryUrl = urlObj.toString();
          } catch {
            // If URL parsing fails, fallback to adding query param manually
            const separator = imageSrc.includes("?") ? "&" : "?";
            retryUrl = `${imageSrc}${separator}_cb=${Date.now()}`;
          }
        } else {
          retryUrl = optimizedUrl;
        }

        setRetryCount(nextRetry);
        setImageSrc(retryUrl);
        setIsRetrying(false);
        retryTimeoutRef.current = null;
      }, retryDelay * nextRetry);
    } else {
      if (isMountedRef.current) {
        console.error(`Failed to load image after ${maxRetries} retries: ${src}`);
        setHasError(true);
        setIsRetrying(false);
      }
    }
  };

  if (hasError) {
    return (
      <div className="relative w-full h-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 256px, 320px"
      className="object-cover group-hover:scale-110 transition-all duration-500"
      priority={priority}
      onError={handleError}
      onLoad={() => {
        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setIsRetrying(false);
        }
      }}
    />
  );
}
