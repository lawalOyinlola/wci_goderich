"use client";

import { forwardRef, MouseEvent } from "react";
import Link, { LinkProps } from "next/link";
import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";
import type { SmoothScrollOptions } from "@/lib/utils/smoothScroll";

export interface SmoothLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: React.ReactNode;
  smoothScrollOptions?: SmoothScrollOptions;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Checks if a URL is external (starts with http:// or https://)
 */
function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

/**
 * A Link component that provides smooth scrolling
 * Works with both same-page and cross-page navigation
 * Handles external URLs by using a regular anchor tag
 */
export const SmoothLink = forwardRef<HTMLAnchorElement, SmoothLinkProps>(
  (
    { href, children, smoothScrollOptions, className, onClick, ...linkProps },
    ref
  ) => {
    const { navigateTo } = useSmoothScroll(smoothScrollOptions);

    // Handle external URLs with regular anchor tag
    if (isExternalUrl(href)) {
      return (
        <a
          ref={ref}
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          onClick={onClick}
          className={className}
          {...(linkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);

      // Always use smooth scroll navigation for consistency
      // navigateTo handles both same-page and cross-page cases
      e.preventDefault();
      navigateTo(href, smoothScrollOptions);
    };

    return (
      <Link
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }
);

SmoothLink.displayName = "SmoothLink";
