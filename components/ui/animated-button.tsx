"use client";

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  text?: string;
  hoverText?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  children?: React.ReactNode;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      text,
      hoverText,
      href,
      icon,
      iconPosition = "left",
      isLoading,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // If children are provided, use them directly without animation
    if (children) {
      const content = (
        <div className="inline-flex items-center gap-2">
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </div>
      );

      return (
        <Button
          ref={ref}
          className={cn("group/btn", className)}
          asChild={!!href}
          {...props}
        >
          {href ? <Link href={href}>{content}</Link> : content}
        </Button>
      );
    }

    // Otherwise, use the animated text content
    const animatedContent = (
      <div className="inline-flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 ease-out group-hover/btn:scale-105">
            {icon}
          </span>
        )}
        {isLoading && (
          <span className="inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        )}

        <div className="relative overflow-hidden inline-flex items-center">
          <span className="transition-all duration-300 ease-out group-hover/btn:-translate-y-full">
            {text}
          </span>
          <span className="absolute top-0 transition-all duration-300 ease-out translate-y-full group-hover/btn:translate-y-0">
            {hoverText || text}
          </span>
        </div>
        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 ease-out group-hover/btn:scale-105">
            {icon}
          </span>
        )}
      </div>
    );

    return (
      <Button
        ref={ref}
        className={cn(
          "group/btn relative overflow-hidden inline-flex items-center",
          className
        )}
        asChild={!!href}
        {...props}
      >
        {href ? <Link href={href}>{animatedContent}</Link> : animatedContent}
      </Button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
export type { AnimatedButtonProps };
