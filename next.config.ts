import type { NextConfig } from "next";
import { site } from "./site.config";

const nextConfig: NextConfig = {
  // Static HTML in out/, served as plain files
  output: "export",
  // Photos in the size the screen needs: the loader turns each width into the CDN's address for it (image-loader.ts).
  // Only the widths the CDN makes: 384, 640, 828, 1200, 1920 (genesite's aws/lambdas/variants/widths.json).
  // imageSizes are for images narrower than the screen, and must be below the smallest deviceSize.
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [384],
  },
  // /kontakt or /kontakt/, as the client's site has it (site.config.ts)
  trailingSlash: site.trailingSlash,
  // Preview runs next dev behind its own domain (set by the server); comma separated
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  // The client looks at the preview: no Next.js "N" button in the corner
  devIndicators: false,
};

export default nextConfig;
