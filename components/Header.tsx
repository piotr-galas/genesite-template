import Link from "next/link";
import { site } from "@/site.config";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="font-semibold">
          {site.name}
        </Link>
        <nav className="flex gap-6">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
