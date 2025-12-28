import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true,
  // experimental: {
  //   useCache: true,
  //   turbopackFileSystemCacheForDev: true,
  //   optimizePackageImports: ["lucide-react"],
  // },
  // Turbopack temporarily disabled due to Google Fonts compatibility issue
  // turbopack: {
  //   root: __dirname,
  // },
  images: {
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
};

export default nextConfig;
