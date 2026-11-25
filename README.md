# Client site

**This is the branch `proposals`**: not a client's site but the page we show the client before the meeting,
their home page in three layouts and our bar on top to switch between them. It is never merged into `master`;
rebase it on `master` to bring the template's changes. After the meeting the page is deleted or left as it is.

- `app/page.tsx`: the proposals in order, each with its letter and a few words on what it is going for (the
  bar shows them).
- `components/proposals/Proposal<letter>.tsx`: one proposal, the whole home page with its own header and footer
  (the layout has none on this branch). A sticky header goes under our bar: `top-[var(--proposals-bar)]`.
- `components/proposals/Proposals.tsx`: our bar. It works on phones too; `#b` in the address opens proposal B.
- Only the home page exists: a menu's link to another page leads to `app/not-found.tsx`, which says so and leads
  back. The page is kept out of Google (`robots.ts`, noindex, no sitemap).


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
- Links between pages: `<Link prefetch={false}>`, every one. By default Next.js fetches every linked page ahead,
  with its images, as soon as the link shows: a phone visitor of one page downloads the menu's pages too
  (buczakauto.pl: 1 MB of the home page's slider on every page).
- `components/`: parts used on more than one page (`Header`, `Footer`…). `Header` has the phone menu (a button
  that turns into a cross, Escape closes it); a copy restyles it to the client's look. `StructuredData` gives
  Google the business (schema.org `businessType`) from `site.config.ts`, on every page.
- `components/consent/`: the cookie banner (`simple` or `detailed`, chosen in `site.config.ts`) and the tracking
  it guards (Google Tag Manager, GA4, Google Ads, Meta Pixel). Nothing loads before the visitor agrees; without any
  tracking id there is no banner.
