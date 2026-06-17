"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxProps extends HTMLMotionProps<"div"> {
  /**
   * How far the content drifts across the scroll, in px. Positive moves the
   * element up as you scroll down. @default 60
   */
  amount?: number;
  children: React.ReactNode;
}

/**
 * Subtle scroll-linked parallax. The child drifts vertically as the wrapper
 * passes through the viewport. Disabled under reduced-motion.
 */
export function Parallax({
  amount = 60,
  className,
  children,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} {...props}>
        {children}
      </motion.div>
    </div>
  );
}

export default Parallax;
