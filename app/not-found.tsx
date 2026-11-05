import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Nie znaleziono strony", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Nie znaleziono strony</h1>
      <p>Strona, której szukasz, nie istnieje albo została przeniesiona.</p>
      <Link href="/" className="underline">
        Wróć na stronę główną
      </Link>
    </section>
  );
}
