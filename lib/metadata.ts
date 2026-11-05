import type { Metadata } from "next";
import { site } from "@/site.config";

// Every page's metadata: its own title and description, its canonical address, and the same for sharing
// (OpenGraph). In app/<path>/page.tsx: export const metadata = pageMetadata({ title, description, path: "/<path>" })
export function pageMetadata({ title, description, path, image }: { title: string; description?: string; path: string; image?: string }): Metadata {
  const ogImage = image || site.ogImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: site.name || undefined,
      url: path,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
