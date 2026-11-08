"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends Omit<ImageProps, "fill" | "className"> {
  /** Classes for the clipping frame. Give it a height or an aspect ratio. */
  className?: string;
  /** How far the picture travels inside its frame, as % of its height. @default 8 */
  strength?: number;
}

/**
 * A `fill` image that drifts more slowly than the page inside its frame. The
 * picture is drawn taller than the frame so its edges never show. Static
 * under reduced motion.
 */
export function ParallaxImage({
  className,
  strength = 8,
  alt,
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${strength * 1.4}%`,
          bottom: `-${strength * 1.4}%`,
          y: reduceMotion ? 0 : y,
        }}
      >
        <Image fill alt={alt} className="object-cover" {...imageProps} />
      </motion.div>
    </div>
  );
}

export default ParallaxImage;
