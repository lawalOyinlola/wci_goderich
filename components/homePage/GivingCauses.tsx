"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

const ROTATE_EVERY_MS = 3200;
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

interface GivingCausesProps {
  causes: readonly string[];
}

/**
 * "Give towards <cause>" heading that cycles through the causes, with the
 * full list underneath so every cause can be read without waiting. The
 * active cause is highlighted in the list as the heading changes.
 */
export function GivingCauses({ causes }: GivingCausesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  // Rotate only while the section is on screen.
  useEffect(() => {
    if (!inView || causes.length < 2) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % causes.length),
      ROTATE_EVERY_MS,
    );
    return () => window.clearInterval(id);
  }, [inView, causes.length]);

  const current = causes[active];

  return (
    <div ref={ref}>
      <h2 className="font-semibold tracking-tight">
        <span className="sr-only">
          Give towards the work of the church: {causes.join(", ")}
        </span>
        <span
          aria-hidden="true"
          className="block text-2xl font-medium text-muted-foreground sm:text-3xl"
        >
          Give towards
        </span>
        {/* Every cause sits in the same grid cell, invisible, so the line is
            always as tall as the longest one and nothing below it jumps. */}
        <span
          aria-hidden="true"
          className="mt-1 inline-grid text-4xl leading-[1.05] text-primary sm:text-5xl"
        >
          {causes.map((cause) => (
            <span key={cause} className="invisible col-start-1 row-start-1">
              {cause}
            </span>
          ))}
          <AnimatePresence initial={false}>
            <motion.span
              key={current}
              className="col-start-1 row-start-1"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: "35%", filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: "-35%", filter: "blur(8px)" }
              }
              transition={{
                y: { type: "spring", visualDuration: 0.55, bounce: 0.15 },
                opacity: { duration: 0.35, ease: EASE_OUT },
                filter: { duration: 0.4, ease: EASE_OUT },
              }}
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
      </h2>

      <ul
        className="mt-8 flex flex-wrap gap-2"
        aria-label="What your giving supports"
      >
        {causes.map((cause, index) => (
          <li
            key={cause}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
              index === active
                ? "bg-primary/10 text-primary ring-1 ring-primary/25"
                : "bg-background text-muted-foreground ring-1 ring-border",
            )}
          >
            {cause}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GivingCauses;
