import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
  webpack: (config, { dev }) => {
    // Remove console statements in production builds
    if (!dev && process.env.NODE_ENV === "production") {
      // Configure Terser to remove console statements
      const TerserPlugin = require("terser-webpack-plugin");

      // Ensure optimization.minimizer exists
      config.optimization = config.optimization || {};
      config.optimization.minimizer = config.optimization.minimizer || [];

      // Find or create TerserPlugin
      let terserPlugin = config.optimization.minimizer.find(
        (plugin: unknown) => plugin?.constructor?.name === "TerserPlugin"
      );

      if (terserPlugin) {
        // Update existing TerserPlugin options
        const existingOptions = terserPlugin.options || {};
        const existingTerserOptions = existingOptions.terserOptions || {};
        const existingCompress = existingTerserOptions.compress || {};

        terserPlugin.options = {
          ...existingOptions,
          terserOptions: {
            ...existingTerserOptions,
            compress: {
              ...existingCompress,
              drop_console: true, // Remove all console.* calls
              drop_debugger: true, // Remove debugger statements
            },
          },
        };
      } else {
        // Add new TerserPlugin
        config.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          })
        );
      }
    }

    return config;
  },
};

export default nextConfig;
