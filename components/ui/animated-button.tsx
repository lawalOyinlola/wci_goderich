"use client";

import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "./button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  text: string;
  hoverText?: string;
  href?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ text, hoverText, href, className, ...props }, ref) => {
    const animatedContent = (
      <div className="relative overflow-hidden inline-flex items-center">
        <span className="transition-all duration-300 ease-out group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute top-0 transition-all duration-300 ease-out translate-y-full group-hover:translate-y-0">
          {hoverText || text}
        </span>
      </div>
    );

    return (
      <Button
        ref={ref}
        className={cn(
          "group relative overflow-hidden inline-flex items-center",
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
