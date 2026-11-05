import { ConsentSettingsLink } from "@/components/consent/ConsentSettingsLink";
import { site } from "@/site.config";

export function Footer() {
  const { street, postalCode, city } = site.address;
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-8 text-sm">
        {site.name && <p className="font-semibold">{site.name}</p>}
        {street && <p>{street}</p>}
        {(postalCode || city) && <p>{[postalCode, city].filter(Boolean).join(" ")}</p>}
        {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>}
        {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        <ConsentSettingsLink />
        <p className="mt-4 opacity-60">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
