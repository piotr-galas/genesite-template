"use client";

import Link from "next/link";
import { saveConsent, useBannerOpen } from "@/lib/consent";

// Accept or reject everything. The look is the agent's to match the client's brand.
export function ConsentSimple() {
  const [open, close] = useBannerOpen();
  if (!open) return null;

  const choose = (all: boolean) => {
    saveConsent({ analytics: all, marketing: all });
    close();
  };

  return (
    <div role="dialog" aria-label="Pliki cookies" className="fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm">
          Używamy plików cookies do analizy ruchu i dopasowania reklam.{" "}
          <Link href="/polityka-prywatnosci" className="underline">
            Polityka prywatności
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose(false)} className="rounded border px-4 py-2 text-sm">
            Odrzuć
          </button>
          <button type="button" onClick={() => choose(true)} className="rounded bg-black px-4 py-2 text-sm text-white">
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
