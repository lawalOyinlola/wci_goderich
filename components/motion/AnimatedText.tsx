"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

interface AnimatedTextProps {
  /** The text to animate, revealed word by word. */
  text: string;
  /** Delay between each word (seconds). @default 0.06 */
  stagger?: number;
  /** Delay before the first word animates (seconds). */
  delay?: number;
  /** Re-animate every time it enters the viewport. @default false */
  repeat?: boolean;
  className?: string;
}

const container = (stagger: number, delay: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE.out },
  },
};

/**
 * Reveals a string word-by-word as it scrolls into view. Falls back to a
 * static render when the user prefers reduced motion. Wraps in a span so it
 * can sit inside any heading without changing layout semantics.
 */
export function AnimatedText({
  text,
  stagger = 0.06,
  delay = 0,
  repeat = false,
  className,
}: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={cn(className)}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: VIEWPORT.margin }}
      variants={container(stagger, delay)}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className="inline-block whitespace-nowrap"
          variants={word}
          aria-hidden
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default AnimatedText;
