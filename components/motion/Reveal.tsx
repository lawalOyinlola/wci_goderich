"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import {
  REDUCED_VARIANT,
  VARIANTS,
  VIEWPORT,
  type RevealVariant,
} from "@/lib/motion";

type MotionTag = "div" | "section" | "article" | "span" | "li" | "ul" | "header";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Which named entrance to use. @default "fade-up" */
  variant?: RevealVariant;
  /** Delay before the entrance starts (seconds). */
  delay?: number;
  /** Re-animate every time it enters the viewport. @default false (animate once) */
  repeat?: boolean;
  /** Rendered element. @default "div" */
  as?: MotionTag;
  children: React.ReactNode;
}

/**
 * Wraps server-rendered content in a scroll-triggered entrance animation.
 * Renders statically when the user prefers reduced motion.
 */
export function Reveal({
  variant = "fade-up",
  delay = 0,
  repeat = false,
  as = "div",
  className,
  children,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants = reduceMotion ? REDUCED_VARIANT : VARIANTS[variant];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: VIEWPORT.margin }}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
