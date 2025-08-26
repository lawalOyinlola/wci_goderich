import * as React from "react";
import { cn } from "@/lib/utils";

interface FadeOverlayProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "intense" | "gradient";
  position?: "top" | "bottom" | "left" | "right" | "all";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: boolean;
  fade?: boolean;
}

const FadeOverlay = React.forwardRef<HTMLDivElement, FadeOverlayProps>(
  (
    {
      children,
      className,
      variant = "default",
      position = "all",
      size = "md",
      blur = true,
      fade = true,
      ...props
    },
    ref
  ) => {
    const getPositionClasses = () => {
      switch (position) {
        case "top":
          return "inset-x-0 top-0 h-32";
        case "bottom":
          return "inset-x-0 bottom-0 h-32";
        case "left":
          return "inset-y-0 left-0 w-32";
        case "right":
          return "inset-y-0 right-0 w-32";
        case "all":
        default:
          return "inset-0";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return position === "left" || position === "right" ? "w-16" : "h-16";
        case "md":
          return position === "left" || position === "right" ? "w-32" : "h-32";
        case "lg":
          return position === "left" || position === "right" ? "w-48" : "h-48";
        case "xl":
          return position === "left" || position === "right" ? "w-64" : "h-64";
        default:
          return position === "left" || position === "right" ? "w-32" : "h-32";
      }
    };

    const getVariantClasses = () => {
      switch (variant) {
        case "subtle":
          return "from-transparent via-transparent to-background/80";
        case "intense":
          return "from-transparent via-background/50 to-background";
        case "gradient":
          return "from-transparent via-background/30 to-background";
        case "default":
        default:
          return "from-transparent to-background";
      }
    };

    const getBlurClasses = () => {
      if (!blur) return "";
      switch (size) {
        case "sm":
          return "backdrop-blur-sm";
        case "md":
          return "backdrop-blur-md";
        case "lg":
          return "backdrop-blur-lg";
        case "xl":
          return "backdrop-blur-xl";
        default:
          return "backdrop-blur-md";
      }
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}

        {/* Top fade overlay */}
        {position === "top" || position === "all" ? (
          <div
            className={cn(
              "absolute inset-x-0 top-0 h-32 pointer-events-none",
              getVariantClasses(),
              getBlurClasses(),
              "bg-gradient-to-b"
            )}
          />
        ) : null}

        {/* Bottom fade overlay */}
        {position === "bottom" || position === "all" ? (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-32 pointer-events-none",
              getVariantClasses(),
              getBlurClasses(),
              "bg-gradient-to-t"
            )}
          />
        ) : null}

        {/* Left fade overlay */}
        {position === "left" || position === "all" ? (
          <div
            className={cn(
              "absolute inset-y-0 left-0 w-32 pointer-events-none",
              getVariantClasses(),
              getBlurClasses(),
              "bg-gradient-to-r"
            )}
          />
        ) : null}

        {/* Right fade overlay */}
        {position === "right" || position === "all" ? (
          <div
            className={cn(
              "absolute inset-y-0 right-0 w-32 pointer-events-none",
              getVariantClasses(),
              getBlurClasses(),
              "bg-gradient-to-l"
            )}
          />
        ) : null}
      </div>
    );
  }
);

FadeOverlay.displayName = "FadeOverlay";

export { FadeOverlay };
