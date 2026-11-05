import type { MetadataRoute } from "next";
import { pagePath } from "@/lib/metadata";
import { site } from "@/site.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}${pagePath("/")}` }];
}
