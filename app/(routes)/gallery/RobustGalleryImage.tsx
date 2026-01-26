"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useMorphingDialog } from "@/components/ui/morphing-dialog";
import { optimizeCloudinaryUrl } from "@/lib/utils/cloudinary";
import { cn } from "@/lib/utils";

interface RobustGalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  maxRetries?: number;
  retryDelay?: number;
}

/**
 * A robust image component that handles errors and retries for gallery images
 * Works with MorphingDialog's layout animation while providing error handling
 */
export function RobustGalleryImage({
  src,
  alt,
  className,
  style,
  maxRetries = 3,
  retryDelay = 1000,
}: RobustGalleryImageProps) {
  const { uniqueId } = useMorphingDialog();
  const [imageSrc, setImageSrc] = useState(() => optimizeCloudinaryUrl(src));
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
      console.error(`Failed to load image after ${maxRetries} retries: ${src}`);
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
      <motion.div
        layoutId={`dialog-img-${uniqueId}`}
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground min-h-[200px]",
          className
        )}
        style={style}
      >
        <div className="text-center p-4">
          <p className="text-sm">Image unavailable</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={cn(
        isRetrying && "opacity-50",
        className
      )}
      style={style}
      layoutId={`dialog-img-${uniqueId}`}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
