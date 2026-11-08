"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Gap between neighbouring digits when a change carries leftwards. */
const CARRY_STAGGER_S = 0.06;

// `direction` 1 = the new digit is smaller (a normal countdown tick): it
// drops in from above and the old one falls away below. -1 = the digit
// wrapped (0 -> 9), so it rolls the other way to read as a reset.
const ROLL: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "-75%" : "75%",
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: { y: "0%", opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({
    y: direction > 0 ? "75%" : "-75%",
    opacity: 0,
    filter: "blur(6px)",
  }),
};

// Reduced motion: no travel and no blur, only a short crossfade.
const FADE: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

function rollTransition(delay: number): Transition {
  return {
    y: { type: "spring", visualDuration: 0.45, bounce: 0.2, delay },
    opacity: { duration: 0.25, ease: EASE_OUT, delay },
    filter: { duration: 0.3, ease: EASE_OUT, delay },
  };
}

function Digit({
  char,
  delay,
  reduceMotion,
}: {
  char: string;
  delay: number;
  reduceMotion: boolean;
}) {
  // Track the previous character to pick the roll direction. Updating state
  // during render (guarded) is React's pattern for deriving from the
  // previous value without an effect.
  const [prev, setPrev] = useState(char);
  const [direction, setDirection] = useState(1);
  if (char !== prev) {
    setPrev(char);
    setDirection(Number(char) > Number(prev) ? -1 : 1);
  }

  return (
    // Both the leaving and the arriving digit share one grid cell, so the
    // width never jumps. The mask softens the clip edge above and below.
    <span className="inline-grid overflow-hidden py-[0.12em] -my-[0.12em] mask-[linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.span
          key={char}
          custom={direction}
          variants={reduceMotion ? FADE : ROLL}
          initial="enter"
          animate="center"
          exit="exit"
          transition={
            reduceMotion
              ? { duration: 0.2, ease: EASE_OUT }
              : rollTransition(delay)
          }
          className="col-start-1 row-start-1 block"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface RollingNumberProps {
  /** The text to show, e.g. "09". Each character rolls on its own. */
  value: string;
  /**
   * Position of this number from the right in a group (seconds = 0,
   * minutes = 1, ...), so a carry ripples leftwards across the group.
   */
  groupIndex?: number;
  className?: string;
}

/**
 * Odometer-style number: only the characters that change roll, with a
 * spring, a light blur and a right-to-left stagger. Visual only; give the
 * value to assistive tech separately.
 */
export function RollingNumber({
  value,
  groupIndex = 0,
  className,
}: RollingNumberProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const chars = value.split("");

  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex tabular-nums", className)}
    >
      {chars.map((char, i) => {
        // Key by place from the right so the ones digit keeps its identity
        // when the length changes (100 -> 99).
        const place = chars.length - 1 - i;
        return (
          <Digit
            key={place}
            char={char}
            delay={(groupIndex * 2 + place) * CARRY_STAGGER_S}
            reduceMotion={reduceMotion}
          />
        );
      })}
    </span>
  );
}

export default RollingNumber;
