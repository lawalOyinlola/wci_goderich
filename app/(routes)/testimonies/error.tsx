"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function TestimoniesError({
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
      description="We encountered an error while loading the testimonies. Please try again."
      errorContext="Testimonies page"
    />
  );
}
