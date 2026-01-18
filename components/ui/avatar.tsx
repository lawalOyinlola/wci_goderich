"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Image from "next/image";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  src,
  alt,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  // Check if the image is from Cloudinary (or other external sources that should use Next.js Image)
  const isCloudinaryImage = src && typeof src === "string" && (
    src.includes("res.cloudinary.com") ||
    src.includes("cloudinary.com")
  );

  // If it's a Cloudinary image, use Next.js Image to prevent third-party cookies
  // Next.js Image optimization proxies images through its own API, preventing third-party cookies
  if (isCloudinaryImage) {
    const [hasError, setHasError] = React.useState(false);
    
    // If image fails, return null to trigger Radix UI's fallback mechanism
    if (hasError) {
      return null;
    }

    return (
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn("aspect-square size-full", className)}
        asChild
        {...props}
      >
        <Image
          src={src}
          alt={alt || "Avatar"}
          width={100}
          height={100}
          className={cn("aspect-square size-full object-cover", className)}
          onError={() => setHasError(true)}
        />
      </AvatarPrimitive.Image>
    );
  }

  // For non-Cloudinary images, use the default Radix UI Image
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      src={src}
      alt={alt}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
