import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in out/ for CDN hosting
  output: "export",
  images: { unoptimized: true },
  // Preview runs next dev behind its own domain (set by the server); comma separated
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
