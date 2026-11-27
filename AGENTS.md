<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Photos
- Put every photo on a page with `Image` from `next/image`, never a plain `<img>`: only `Image` makes the srcset that
  lets each screen download the size it needs (image-loader.ts, from our CDN). Give it `alt` (what the photo shows,
  for people who can't see it and for Google), `width` and `height` (the photo's own pixels), and `sizes` when it is
  narrower than the screen, e.g. `sizes="(max-width: 768px) 100vw, 50vw"`.
- Use the photo's address as given (`https://cdn.img-heysite.pl/...`), never one with `/w/` in it: the loader adds that.
