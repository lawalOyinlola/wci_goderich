"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  smoothScrollToSection,
  parseUrl,
  isSamePage,
  type SmoothScrollOptions,
} from "@/lib/utils/smoothScroll";

/**
 * Hook for smooth scrolling functionality
 * Handles both same-page and cross-page navigation with smooth scrolling
 */
export function useSmoothScroll(defaultOptions?: SmoothScrollOptions) {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Navigate to a URL with smooth scrolling
   * - Different page with hash: navigates and scrolls to section after load
   * - Different page without hash: navigates and scrolls to top after load
   * - Same page with hash: scrolls to section immediately
   * - Same page without hash: normal navigation (no scroll)
   */
  const navigateTo = useCallback(
    (url: string, options?: SmoothScrollOptions) => {
      const { pathname: targetPath, hash } = parseUrl(url);
      const mergedOptions = { ...defaultOptions, ...options };

      // Same page navigation
      if (isSamePage(url)) {
        if (hash) {
          // Scroll to section on same page
          setTimeout(() => {
            smoothScrollToSection(hash, mergedOptions);
          }, 100);
        }
        // No hash on same page = no action needed (already on page)
        return;
      }

      // Different page navigation
      if (targetPath !== pathname) {
        // Store options for post-navigation scrolling
        sessionStorage.setItem(
          "smoothScrollOptions",
          JSON.stringify(mergedOptions)
        );

        // Store hash if present (for scrolling to section)
        // If no hash, SmoothScrollProvider will scroll to top
        if (hash) {
          sessionStorage.setItem("smoothScrollTarget", hash);
        }

        // Navigate to new page
        router.push(targetPath);
        // router.push(targetPath + hash);
      }
    },
    [router, pathname, defaultOptions]
  );

  /**
   * Scroll to a section on the current page
   * Convenience method for same-page section scrolling
   */
  const scrollToSection = useCallback(
    (sectionId: string, options?: SmoothScrollOptions) => {
      const mergedOptions = { ...defaultOptions, ...options };
      smoothScrollToSection(sectionId, mergedOptions);
    },
    [defaultOptions]
  );

  return {
    navigateTo,
    scrollToSection,
  };
}
