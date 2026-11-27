"use client";

// Where next/image takes each photo from, for each width it puts in srcset. The browser then downloads only the size
// its screen needs. Photos on our CDN come resized and in the lightest format the browser takes (AVIF, WebP or
// JPEG): https://cdn.img-heysite.pl/<photo> → https://cdn.img-heysite.pl/w/<width>/<photo>. How the CDN does it:
// genesite's docs/aws.md, „Warianty zdjęć”.
// The CDN makes only these widths: 384, 640, 828, 1200, 1920 (next.config.ts sets the same; genesite's
// aws/lambdas/variants/widths.json is the list). Any other width gets an error, so keep the three lists equal.

// The CDN's own address, and its CloudFront address, which older sites still have in their code
const CDN_HOSTS = ["cdn.img-heysite.pl", "d2ujfb3yrq13x5.cloudfront.net"];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  // A file of the site itself (public/): served as it is. The ?w= is for next/image only, which wants to see the
  // width in the address; the server ignores it.
  if (src.startsWith("/")) return `${src}?w=${width}`;

  const url = new URL(src);
  if (CDN_HOSTS.includes(url.hostname) && !url.pathname.startsWith("/w/")) {
    return `https://cdn.img-heysite.pl/w/${width}${url.pathname}`;
  }
  // Anything else (another site's photo): as it is
  return src;
}
