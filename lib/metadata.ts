import type { Metadata } from "next";
import { site } from "@/site.config";

// A page's path as the site writes its addresses: "/kontakt" or "/kontakt/" (site.config.ts trailingSlash)
export function pagePath(path: string) {
  const bare = path.replace(/\/+$/, "");
  if (!bare) return "/";
  return site.trailingSlash ? `${bare}/` : bare;
}

// Every page's metadata: its own title and description, its canonical address, and the same for sharing
// (OpenGraph). In app/<path>/page.tsx: export const metadata = pageMetadata({ title, description, path: "/<path>" })
export function pageMetadata({ title, description, path, image }: { title: string; description?: string; path: string; image?: string }): Metadata {
  const ogImage = image || site.ogImage;
  const url = pagePath(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: site.name || undefined,
      url,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
