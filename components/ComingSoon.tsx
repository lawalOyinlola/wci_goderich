"use client";

import { ReactNode } from "react";
import { ClockIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you something amazing. Check back soon!",
  icon,
  className,
  showIcon = true,
}: ComingSoonProps) {
  const defaultIcon = <ClockIcon className="h-16 w-16 md:h-20 md:w-20" weight="duotone" />;

  return (
    <div className={cn("min-h-screen flex items-center justify-center py-20", className)}>
      <div className="small-container max-w-3xl text-center">
        <div className="flex flex-col items-center gap-6">
          {showIcon && (
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative text-primary">
                {icon || defaultIcon}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="h-4 w-4" />
            <span>This feature will be available soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
