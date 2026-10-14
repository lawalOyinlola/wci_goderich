import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy: an allowlist of every origin the site loads from.
 *
 * Scripts allow 'unsafe-inline' because the strict alternative (per-request
 * nonces) forces every page to render dynamically, which turns off
 * cacheComponents/Partial Prerendering and the static pages Vercel serves from
 * its CDN. The site has no logins or sessions for an injected script to
 * steal, React escapes all rendered content, and the policy still blocks
 * scripts, frames and connections from any origin not listed here.
 *
 * Add an origin here before using a new third-party service, or the browser
 * will block it (check the console for "Refused to load").
 */
const CSP_DIRECTIVES: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    // React's dev overlay rebuilds server error stacks with eval
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://challenges.cloudflare.com", // Turnstile bot check
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": [
    "'self'",
    "data:",
    "blob:", // cropped avatar previews
    "https://res.cloudinary.com",
    "https://images.unsplash.com",
    "https://picsum.photos",
  ],
  "font-src": ["'self'", "data:"],
  // Church videos: HLS segments come over XHR (connect-src) and play from a
  // MediaSource blob; the mp4 fallback loads directly.
  "media-src": ["'self'", "blob:", "https://res.cloudinary.com"],
  "connect-src": [
    "'self'",
    "https://res.cloudinary.com",
    "https://challenges.cloudflare.com",
  ],
  "frame-src": [
    "https://www.youtube.com",
    "https://www.youtube-nocookie.com",
    "https://player.vimeo.com",
    "https://challenges.cloudflare.com",
  ],
  "worker-src": ["'self'", "blob:"], // hls.js transmuxes in a blob worker
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'self'"],
};

const CONTENT_SECURITY_POLICY = Object.entries(CSP_DIRECTIVES)
  .map(([directive, sources]) => `${directive} ${sources.join(" ")}`)
  .join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Disable source maps in production to fix Lighthouse warnings and improve performance
  productionBrowserSourceMaps: false,
  // Enable compression
  compress: true,
  // Don't advertise the framework in an X-Powered-By header
  poweredByHeader: false,
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = default for content images; 60 used for hero backgrounds that sit
    // behind a dark overlay, where the extra compression is invisible.
    qualities: [60, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // Remove console statements in production (works with both Turbopack and Webpack)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            // Keep errors and warnings: they're the only record of a failed
            // upload cleanup, a rate-limit fallback or a missing CAPTCHA key
            // in Vercel's logs.
            exclude: ["error", "warn"],
          }
        : false,
  },
  // Optimize headers for caching and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          {
            // Geolocation stays on for the map's "View My Location" pin.
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), payment=(), usb=()",
          },
          {
            key: "Content-Security-Policy",
            value: CONTENT_SECURITY_POLICY,
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Note: Next.js already serves /_next/static with long-lived immutable
      // cache headers, so no custom Cache-Control is needed (and overriding it
      // can break dev behavior).
    ];
  },
};

export default nextConfig;
