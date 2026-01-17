"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  smoothScrollToSection,
  smoothScrollToTop,
  type SmoothScrollOptions,
} from "@/lib/utils/smoothScroll";

const DEFAULT_OPTIONS: SmoothScrollOptions = {
  duration: 1.2,
  offset: 10,
  ease: "power2.out",
};

/**
 * Parses stored scroll options from sessionStorage
 */
function getStoredOptions(): SmoothScrollOptions {
  const stored = sessionStorage.getItem("smoothScrollOptions");
  if (!stored) return DEFAULT_OPTIONS;

  try {
    return { ...DEFAULT_OPTIONS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_OPTIONS;
  }
}

/**
 * Provider component that handles smooth scrolling after page navigation
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Handle post-navigation scrolling (cross-page navigation)
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("smoothScrollTarget");
    const hasStoredOptions = sessionStorage.getItem("smoothScrollOptions");

    if (scrollTarget) {
      // Navigated to different page with hash - scroll to section
      const options = getStoredOptions();
      sessionStorage.removeItem("smoothScrollTarget");
      sessionStorage.removeItem("smoothScrollOptions");

      setTimeout(() => {
        smoothScrollToSection(scrollTarget, options);
      }, 500);
      return;
    }

    if (hasStoredOptions) {
      // Navigated to different page without hash - scroll to top
      const options = getStoredOptions();
      sessionStorage.removeItem("smoothScrollOptions");

      setTimeout(() => {
        smoothScrollToTop(options);
      }, 500);
      return;
    }

    // Handle direct URL navigation with hash (browser back/forward, direct link)
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        smoothScrollToSection(window.location.hash, DEFAULT_OPTIONS);
      }, 400);
    }
  }, [pathname]);

  // Handle hash changes on same page (browser navigation)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        smoothScrollToSection(window.location.hash, DEFAULT_OPTIONS);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return <>{children}</>;
}
