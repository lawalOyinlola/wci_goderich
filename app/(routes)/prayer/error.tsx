"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function PrayerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      description="We encountered an error while loading the prayer page. Please try again."
      errorContext="Prayer page"
    />
  );
}
