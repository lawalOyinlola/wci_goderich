"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckIcon, CopyIcon, InfoIcon } from "@phosphor-icons/react";
import { GIVING_ACCOUNT } from "@/lib/constants";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const ROWS = [
  { label: "Bank", value: GIVING_ACCOUNT.bankName },
  { label: "Account name", value: GIVING_ACCOUNT.accountName },
] as const;

/** Bank details with a one-tap copy of the account number. */
export function GivingAccountCard() {
  const reduceMotion = useReducedMotion() ?? false;
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied && !failed) return;
    const id = window.setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, 2000);
    return () => window.clearTimeout(id);
  }, [copied, failed]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(GIVING_ACCOUNT.accountNumber);
      setCopied(true);
    } catch {
      setFailed(true);
    }
  };

  const iconMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.6, filter: "blur(4px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.6, filter: "blur(4px)" },
      };

  return (
    <div className="rounded-xl border border-border bg-background p-7 sm:p-9">
      <h3 className="text-lg font-semibold tracking-tight">
        Give by bank transfer
      </h3>

      <dl className="mt-6 grid gap-5">
        {ROWS.map((row) => (
          <div key={row.label}>
            <dt className="text-sm text-muted-foreground">{row.label}</dt>
            <dd className="mt-0.5 font-medium">{row.value}</dd>
          </div>
        ))}
        <div>
          <dt className="text-sm text-muted-foreground">Account number</dt>
          <dd className="mt-1 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold tracking-wide tabular-nums sm:text-3xl">
              {GIVING_ACCOUNT.accountNumber}
            </span>
            <button
              type="button"
              onClick={copyNumber}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md border border-border px-3 text-sm font-medium transition-[background-color,scale] duration-150 ease-out hover:bg-muted active:scale-[0.97]"
            >
              <span className="relative inline-grid size-4">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={copied ? "check" : "copy"}
                    className="col-start-1 row-start-1"
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    {...iconMotion}
                  >
                    {copied ? (
                      <CheckIcon
                        weight="bold"
                        className="size-4 text-green-700 dark:text-green-400"
                      />
                    ) : (
                      <CopyIcon weight="bold" className="size-4" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
              {copied ? "Copied" : failed ? "Copy failed" : "Copy"}
            </button>
          </dd>
        </div>
      </dl>

      <p className="mt-7 flex gap-3 rounded-lg bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 dark:bg-amber-400/10 dark:text-amber-100">
        <InfoIcon
          aria-hidden="true"
          weight="fill"
          className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-300"
        />
        <span>
          <span className="font-semibold">Note:</span> state the purpose of your
          giving in the transfer description, for example Offering, Tithe or
          Shiloh Sacrifice.
        </span>
      </p>
      <p aria-live="polite" className="sr-only">
        {copied
          ? "Account number copied"
          : failed
            ? "Copy failed. Select the number to copy it."
            : ""}
      </p>
    </div>
  );
}

export default GivingAccountCard;
