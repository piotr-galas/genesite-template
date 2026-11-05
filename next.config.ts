import type { NextConfig } from "next";
import { site } from "./site.config";

const nextConfig: NextConfig = {
  // Static HTML in out/, served as plain files
  output: "export",
  images: { unoptimized: true },
  // /kontakt or /kontakt/, as the client's site has it (site.config.ts)
  trailingSlash: site.trailingSlash,
  // Preview runs next dev behind its own domain (set by the server); comma separated
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  // The client looks at the preview: no Next.js "N" button in the corner
  devIndicators: false,
};

export default nextConfig;
