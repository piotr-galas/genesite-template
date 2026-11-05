# Client site

Made from the genesite template: Next.js with a static export (`out/`), Tailwind CSS.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static files in out/
```

The company's details (name, phone, address…) live in `site.config.ts`. `NEXT_PUBLIC_SITE_URL` is the site's address.

## Structure

- `site.config.ts`: the company's details, the main menu and `trailingSlash`, which must match the client's
  current addresses (`/kontakt/` on WordPress, `/kontakt` elsewhere): set it when the copy is made.
- `app/<path>/page.tsx`: one folder per page, e.g. `app/kontakt/page.tsx` is `/kontakt`. Each sets its own title,
  description and sharing details with `pageMetadata()` from `lib/metadata.ts`.
- `app/not-found.tsx`: the 404 page (`out/404.html`).
- `app/layout.tsx`: what every page shares (header, footer, metadata).
- `components/`: parts used on more than one page (`Header`, `Footer`…).
- `components/consent/`: the cookie banner (`simple` or `detailed`, chosen in `site.config.ts`) and the tracking
  it guards (Google Tag Manager, GA4, Google Ads, Meta Pixel). Nothing loads before the visitor agrees; without any
  tracking id there is no banner.
