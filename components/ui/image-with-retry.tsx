"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { getLeadershipImagesWithRetry } from "@/lib/constants/gallery";

interface ImageWithRetryProps extends Omit<ImageProps, "src"> {
  src: string;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * Image component with automatic retry logic for failed image loads
 * Specifically handles PST_ABEL_IMG, PST_LUNGI_IMG, and BOARD_IMG
 */
export function ImageWithRetry({
  src,
  maxRetries = 3,
  retryDelay = 1000,
  onError,
  ...props
}: ImageWithRetryProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Check if this is one of the leadership images that needs retry logic
  const isLeadershipImage =
    src.includes("pst_abel_close_shot_jrplde") ||
    src.includes("pst_lungi_standing_rwdbll") ||
    src.includes("open_bible_xy3r0a");

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!isLeadershipImage) {
      onError?.(e);
      return;
    }

    if (retryCount < maxRetries) {
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      // Get the retry URL with incremented retry count
      const retryImages = getLeadershipImagesWithRetry(newRetryCount);
      
      // Find which image this is and use the retry version
      let retrySrc = src;
      if (src.includes("pst_abel_close_shot_jrplde")) {
        retrySrc = retryImages.PST_ABEL_IMG;
      } else if (src.includes("pst_lungi_standing_rwdbll")) {
        retrySrc = retryImages.PST_LUNGI_IMG;
      } else if (src.includes("open_bible_xy3r0a")) {
        retrySrc = retryImages.BOARD_IMG;
      }

      // Retry after delay with exponential backoff
      const delay = retryDelay * Math.pow(2, retryCount);
      setTimeout(() => {
        setCurrentSrc(retrySrc);
        setHasError(false);
      }, delay);
    } else {
      setHasError(true);
      onError?.(e);
    }
  };

  if (hasError && retryCount >= maxRetries) {
    // Return a placeholder or fallback after all retries exhausted
    return (
      <div
        className={props.className}
        style={{
          ...props.style,
          backgroundColor: "var(--muted)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={handleError}
      key={currentSrc} // Force re-render with new src
    />
  );
}
