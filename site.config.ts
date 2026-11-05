// The company's details in one place: the header, footer, contact page, metadata and structured data read them
// from here, so a change of phone number is one edit. Empty until the site is made for a client.
export const site = {
  // The address the site is published at, e.g. https://www.kowalski.pl (no trailing slash)
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
  // Full profile addresses, e.g. facebook: "https://www.facebook.com/kowalski"
  social: {} as Partial<Record<"facebook" | "instagram" | "linkedin" | "youtube" | "tiktok", string>>,
};
