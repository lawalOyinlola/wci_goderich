import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register ScrollToPlugin (only runs on client side)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export interface SmoothScrollOptions {
  /**
   * Duration of the scroll animation in seconds
   * @default 1.2
   */
  duration?: number;
  /**
   * Easing function for the animation
   * @default "power2.out"
   */
  ease?: string;
  /**
   * Offset from the target element (in pixels)
   * Useful for fixed headers/navbars
   * @default 80
   */
  offset?: number;
  /**
   * Whether to scroll on the x-axis
   * @default false
   */
  scrollX?: boolean;
}

/**
 * Smoothly scrolls to a target element or position
 * @param target - CSS selector, element, or pixel value
 * @param options - Scroll animation options
 */
export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: SmoothScrollOptions = {}
): void {
  if (typeof window === "undefined") return;

  const {
    duration = 1.2,
    ease = "power2.out",
    offset = 10,
    scrollX = false,
  } = options;

  let scrollTarget: string | number | HTMLElement;
  const isElementTarget = target instanceof HTMLElement;

  // Handle different target types
  if (typeof target === "string") {
    // If it's a number string, convert to number
    if (!isNaN(Number(target))) {
      scrollTarget = Number(target);
    } else {
      // It's a selector - check if element exists
      const element = document.querySelector(target);
      if (!element) {
        console.warn(`Element not found: ${target}`);
        return;
      }
      scrollTarget = target;
    }
  } else if (typeof target === "number") {
    scrollTarget = target;
  } else {
    // It's an HTMLElement
    scrollTarget = target;
  }

  // Calculate offset for element targets
  const isStringOrElement = typeof scrollTarget === "string" || isElementTarget;
  const scrollConfig: gsap.TweenVars = {
    scrollTo: {
      y: scrollTarget,
      x: scrollX ? scrollTarget : undefined,
      offsetY: isStringOrElement ? offset : 0,
      offsetX: scrollX && isStringOrElement ? offset : 0,
    },
    duration,
    ease,
  };

  gsap.to(window, scrollConfig);
}

/**
 * Smoothly scrolls to a section by ID
 * @param sectionId - The ID of the section (with or without #)
 * @param options - Scroll animation options
 */
export function smoothScrollToSection(
  sectionId: string,
  options: SmoothScrollOptions = {}
): void {
  // Remove # if present
  const cleanId = sectionId.replace(/^#/, "");
  smoothScrollTo(`#${cleanId}`, options);
}

/**
 * Smoothly scrolls to the top of the page
 * @param options - Scroll animation options
 */
export function smoothScrollToTop(options: SmoothScrollOptions = {}): void {
  smoothScrollTo(0, options);
}

/**
 * Parses a URL to extract path and hash
 * @param url - The URL to parse
 * @returns Object with pathname and hash
 */
export function parseUrl(url: string): { pathname: string; hash: string } {
  try {
    const urlObj = new URL(url, window.location.origin);
    return {
      pathname: urlObj.pathname,
      hash: urlObj.hash,
    };
  } catch {
    // Handle relative URLs
    const [pathname, hash = ""] = url.split("#");
    return {
      pathname: pathname || "/",
      hash: hash ? `#${hash}` : "",
    };
  }
}

/**
 * Checks if a URL is on the same page
 * @param url - The URL to check
 * @returns True if the URL is on the same page
 */
export function isSamePage(url: string): boolean {
  if (typeof window === "undefined") return false;
  const { pathname } = parseUrl(url);
  return pathname === window.location.pathname || pathname === "/";
}
