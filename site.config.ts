// The company's details in one place: the header, footer, contact page, metadata and structured data read them
// from here, so a change of phone number is one edit. Empty until the site is made for a client.
export const site = {
  // The address the site is published at, e.g. https://www.kowalski.pl (no trailing slash)
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  // Must match the client's current addresses: WordPress ends them with a slash (/kontakt/), most others do not
  // (/kontakt). Changing the form means every address changes for Google. Set it when the copy is made.
  trailingSlash: false,
  name: "",
  description: "",
  // The picture shown when a page is shared (Facebook, LinkedIn, messengers), e.g. "/og.jpg" in public/; 1200×630
  ogImage: "",
  phone: "",
  email: "",
  address: {
    street: "",
    postalCode: "",
    city: "",
  },
  // The main menu, in order; every page is app/<path>/page.tsx
  navigation: [{ href: "/", label: "Strona główna" }],
  // The cookie banner. AGENT: ask the client which they prefer before changing it:
  // "simple": one bar, accept or reject everything; "detailed": analytics and marketing chosen separately.
  // (A Cookiebot option will come later.) Without any tracking below there is no banner at all.
  consent: "simple" as "simple" | "detailed",
  // Tracking, any combination; empty = not used. Nothing loads before the visitor agrees:
  // GTM and GA4 need the analytics consent, Google Ads and the Meta Pixel the marketing one.
  // gtmId: "GTM-XXXXXXX" (its tags get Google's consent signals); ga4Id: "G-XXXXXXXXXX";
  // googleAdsId: "AW-XXXXXXXXX"; metaPixelId: the Pixel's number
  tracking: { gtmId: "", ga4Id: "", googleAdsId: "", metaPixelId: "" },
  // Full profile addresses, e.g. facebook: "https://www.facebook.com/kowalski"
  social: {} as Partial<Record<"facebook" | "instagram" | "linkedin" | "youtube" | "tiktok", string>>,
};
