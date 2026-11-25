import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Nie znaleziono strony", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      {/* The proposals show the home page only: a link to another page of the menu ends here */}
      <h1 className="text-2xl font-semibold">Tu pokazujemy tylko stronę główną</h1>
      <p>Pozostałe podstrony przygotujemy w wybranym wyglądzie.</p>
      <Link prefetch={false} href="/" className="underline">
        Wróć do propozycji
      </Link>
    </section>
  );
}
