"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

// globals.css sets the body font on every element (`*`), so these spans
// would otherwise drop the parent's face (e.g. the serif on the mandate).
const INHERIT_FONT = { fontFamily: "inherit" } as const;

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  /** Opacity of words the reader has not reached yet. @default 0.18 */
  dimOpacity?: number;
}

function Word({
  children,
  progress,
  range,
  dimOpacity,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dimOpacity: number;
}) {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  return (
    <motion.span style={{ opacity, fontFamily: "inherit" }}>
      {children}
    </motion.span>
  );
}

/**
 * Text whose words brighten one after another as the block scrolls through
 * the middle of the screen, as if read aloud. Static under reduced motion.
 * The words stay real text, so screen readers and search read it normally.
 */
export function ScrollRevealText({
  text,
  className,
  dimOpacity = 0.18,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts as the block's top reaches 85% down the screen and finishes as
    // its bottom passes the middle, so it completes while still readable.
    offset: ["start 0.85", "end 0.5"],
  });

  if (reduceMotion) {
    return (
      <span className={className} style={INHERIT_FONT}>
        {text}
      </span>
    );
  }

  const words = text.split(" ");
  return (
    <span ref={ref} className={cn(className)} style={INHERIT_FONT}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={i} style={INHERIT_FONT}>
            <Word
              progress={scrollYProgress}
              range={[start, end]}
              dimOpacity={dimOpacity}
            >
              {word}
            </Word>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

export default ScrollRevealText;
