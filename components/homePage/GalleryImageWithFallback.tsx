"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { optimizeCloudinaryUrl } from "@/lib/utils/cloudinary";

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

  // Reset when src changes
  useEffect(() => {
    setImageSrc(optimizeCloudinaryUrl(src));
    setHasError(false);
    setRetryCount(0);
    setIsRetrying(false);
  }, [src]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      setIsRetrying(true);
      const nextRetry = retryCount + 1;

      // Retry with exponential backoff
      setTimeout(() => {
        setRetryCount(nextRetry);
        // Force re-render by updating src slightly (add cache buster or retry param)
        const retryUrl = optimizeCloudinaryUrl(src, { retry: nextRetry });
        setImageSrc(retryUrl);
        setIsRetrying(false);
      }, retryDelay * nextRetry);
    } else {
      console.error(`Failed to load image after ${maxRetries} retries: ${src}`);
      setHasError(true);
      setIsRetrying(false);
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
        setIsRetrying(false);
      }}
    />
  );
}
