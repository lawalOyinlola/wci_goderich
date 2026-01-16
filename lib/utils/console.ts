/**
 * Console utility - Suppresses console methods in production
 * This is a runtime solution that works alongside the webpack build-time removal
 *
 * Note: The webpack config in next.config.ts removes console statements at build time,
 * but this provides an additional runtime safeguard.
 */

// Only run in production
if (process.env.NODE_ENV === "production") {
  const noop = () => {};

  // Client-side: Override console methods
  if (typeof window !== "undefined") {
    // Remove non-critical console methods
    // Keep console.error and console.warn for debugging critical issues
    console.log = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    // Uncomment below to also remove errors/warnings:
    // console.error = noop;
    // console.warn = noop;
  }

  // Server-side: Override console methods
  // Keep console.error for server-side error logging (recommended for production monitoring)
  if (typeof window === "undefined") {
    console.log = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    // Uncomment below to also remove server errors/warnings:
    // console.error = noop;
    // console.warn = noop;
  }
}
