# Client site

Made from the genesite template: Next.js with a static export (`out/`), Tailwind CSS.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static files in out/
```

The company's details (name, phone, address…) live in `site.config.ts`. `NEXT_PUBLIC_SITE_URL` is the site's address.

## Structure

- `site.config.ts`: the company's details and the main menu.
- `app/<path>/page.tsx`: one folder per page, e.g. `app/kontakt/page.tsx` is `/kontakt`.
- `app/layout.tsx`: what every page shares (header, footer, metadata).
- `components/`: parts used on more than one page (`Header`, `Footer`…).
