import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Only to show the client, on our preview address: nothing for Google
    rules: { userAgent: "*", disallow: "/" },
  };
}
