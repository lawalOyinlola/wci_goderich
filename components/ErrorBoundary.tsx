"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  WarningCircleIcon,
  ArrowCounterClockwiseIcon,
  HouseLineIcon,
} from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";

export interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
  errorContext?: string;
  homeHref?: string;
  variant?: "default" | "fullscreen";
  className?: string;
}

export function ErrorBoundary({
  error,
  reset,
  title = "Something went wrong!",
  description = "We encountered an unexpected error. Please try again or return to the home page.",
  errorContext,
  homeHref = "/",
  variant = "default",
  className,
}: ErrorBoundaryProps) {
  useEffect(() => {
    const context = errorContext || "Application";
    console.error(`${context} error:`, error);
  }, [error, errorContext]);

  const containerClass =
    variant === "fullscreen"
      ? "min-h-screen flex items-center justify-center bg-background px-4 py-20"
      : "min-h-[60vh] flex items-center justify-center px-4 py-20";

  const titleClass = variant === "fullscreen" ? "text-2xl" : "text-xl";

  return (
    <div className={`${containerClass} ${className || ""}`}>
      <Card className="w-full max-w-md relative">
        <BorderBeam size={250} />
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <WarningCircleIcon size={44} color="var(--primary)" />
          </div>
          <CardTitle className={titleClass}>{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md bg-muted p-4 text-sm">
              <p className="font-semibold text-destructive mb-2">
                {variant === "fullscreen" ? "Error Details:" : "Error:"}
              </p>
              <p className="text-muted-foreground break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-muted-foreground mt-2 text-xs">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <AnimatedButton
            onClick={reset}
            text="Try Again"
            icon={<ArrowCounterClockwiseIcon size={16} />}
            className="w-full sm:w-auto"
          />
          <AnimatedButton
            variant="outline"
            href={homeHref}
            text="Go Home"
            icon={<HouseLineIcon weight="duotone" size={16} />}
            className="w-full sm:w-auto"
          />
        </CardFooter>
      </Card>
    </div>
  );
}
