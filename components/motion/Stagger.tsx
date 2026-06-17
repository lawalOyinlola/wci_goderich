"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import {
  REDUCED_VARIANT,
  STAGGER_ITEM,
  VIEWPORT,
  staggerContainer,
} from "@/lib/motion";

type MotionTag = "div" | "section" | "ul" | "ol";

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  /** Delay between each child (seconds). @default 0.1 */
  stagger?: number;
  /** Delay before the first child animates (seconds). */
  delayChildren?: number;
  /** Re-animate every time it enters the viewport. @default false */
  repeat?: boolean;
  /** Rendered element. @default "div" */
  as?: MotionTag;
  children: React.ReactNode;
}

/**
 * Container that animates its `StaggerItem` children in sequence as it
 * scrolls into view. Wrap each item (e.g. a card) in `StaggerItem`.
 */
export function Stagger({
  stagger = 0.1,
  delayChildren = 0,
  repeat = false,
  as = "div",
  className,
  children,
  ...props
}: StaggerProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: VIEWPORT.margin }}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  as?: "div" | "li" | "article" | "span";
  children: React.ReactNode;
}

/** A single staggered child. Must be rendered inside a `Stagger`. */
export function StaggerItem({
  as = "div",
  className,
  children,
  ...props
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      variants={reduceMotion ? REDUCED_VARIANT : STAGGER_ITEM}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export default Stagger;
