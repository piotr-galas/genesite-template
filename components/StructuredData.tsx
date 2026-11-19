import { site } from "@/site.config";

// The business for Google (schema.org LocalBusiness or a closer type, site.businessType), from site.config.ts, on
// every page: name, phone, email, address, opening hours, profiles. Only what is filled in; nothing without a name.
export function StructuredData() {
  if (!site.name) return null;
  const { street, postalCode, city } = site.address;
  const data = {
    "@context": "https://schema.org",
    "@type": site.businessType,
    name: site.name,
    description: site.description || undefined,
    url: site.url,
    image: site.ogImage ? new URL(site.ogImage, site.url).href : undefined,
    // Google wants the international form: 695 455 131 → +48695455131
    telephone: site.phone ? internationalPhone(site.phone) : undefined,
    email: site.email || undefined,
    address:
      street || city
        ? { "@type": "PostalAddress", streetAddress: street || undefined, postalCode: postalCode || undefined, addressLocality: city || undefined, addressCountry: "PL" }
        : undefined,
    openingHours: site.openingHours.length ? site.openingHours : undefined,
    sameAs: Object.values(site.social).length ? Object.values(site.social) : undefined,
  };
  // Stringified by us, from our own config: no visitor's input goes in
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function internationalPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+48${digits.replace(/^0+/, "")}`;
}
