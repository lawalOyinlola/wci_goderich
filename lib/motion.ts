import type { Variants, Transition } from "motion/react";

/**
 * Shared motion design tokens and variants.
 * Single source of truth so every animated surface on the site feels consistent.
 */

/** Easing curves (cubic-bezier). */
export const EASE = {
  /** Smooth deceleration — the default for entrances. */
  out: [0.22, 1, 0.36, 1],
  /** Symmetric ease for loops / hovers. */
  inOut: [0.65, 0, 0.35, 1],
} as const;

/** Durations in seconds. */
export const DURATION = {
  fast: 0.4,
  base: 0.6,
  slow: 0.9,
} as const;

/** Default travel distance (px) for slide/fade entrances. */
export const DISTANCE = 24;

/** Default viewport config for scroll-triggered reveals. */
export const VIEWPORT = {
  once: true,
  /** At least 15% of the element must be visible before triggering — prevents
   *  false positives during page load / scroll restoration. */
  amount: 0.15,
  margin: "0px 0px -8% 0px",
} as const;

const transition: Transition = { duration: DURATION.base, ease: EASE.out };

/** Named entrance variants, keyed by `hidden` / `visible`. */
export const VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition },
  },
  "fade-up": {
    hidden: { opacity: 0, y: DISTANCE },
    visible: { opacity: 1, y: 0, transition },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -DISTANCE },
    visible: { opacity: 1, y: 0, transition },
  },
  "slide-left": {
    hidden: { opacity: 0, x: DISTANCE },
    visible: { opacity: 1, x: 0, transition },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -DISTANCE },
    visible: { opacity: 1, x: 0, transition },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition },
  },
} satisfies Record<string, Variants>;

export type RevealVariant = keyof typeof VARIANTS;

/** A no-op variant used when the user prefers reduced motion. */
export const REDUCED_VARIANT: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/**
 * Builds a stagger container variant. Children using `STAGGER_ITEM` (or any
 * variant with `hidden`/`visible` keys) will animate in sequence.
 */
export function staggerContainer(
  stagger = 0.1,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Default per-item variant for staggered children. */
export const STAGGER_ITEM: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0, transition },
};
