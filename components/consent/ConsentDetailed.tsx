"use client";

import Link from "next/link";
import { useState } from "react";
import { readConsent, saveConsent, useBannerOpen, type Consent } from "@/lib/consent";

const CATEGORIES = [
  { key: "necessary", title: "Niezbędne", description: "Potrzebne do działania strony, zawsze włączone." },
  { key: "analytics", title: "Analityczne", description: "Pomagają nam zrozumieć, jak korzystasz ze strony." },
  { key: "marketing", title: "Marketingowe", description: "Pozwalają dopasować reklamy do Twoich zainteresowań." },
] as const;

// Accept all, reject all, or choose analytics and marketing separately. The look is the agent's to match the
// client's brand.
export function ConsentDetailed() {
  const [open, close] = useBannerOpen();
  const [customizing, setCustomizing] = useState(false);
  const [choice, setChoice] = useState<Consent>({ analytics: false, marketing: false });
  if (!open) return null;

  const finish = (consent: Consent) => {
    saveConsent(consent);
    close();
    setCustomizing(false);
  };
  const customize = () => {
    setChoice(readConsent() ?? { analytics: false, marketing: false });
    setCustomizing(true);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Pliki cookies" className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Pliki cookies</h2>
        <p className="mt-2 text-sm">
          Używamy plików cookies, żeby strona działała, oraz, za Twoją zgodą, do analizy ruchu i dopasowania reklam.{" "}
          <Link href="/polityka-prywatnosci" className="underline">
            Polityka prywatności
          </Link>
        </p>

        {customizing && (
          <ul className="mt-4 flex flex-col gap-3">
            {CATEGORIES.map((category) => (
              <li key={category.key} className="flex items-start justify-between gap-4 rounded border p-3">
                <div>
                  <p className="text-sm font-medium">{category.title}</p>
                  <p className="text-sm opacity-70">{category.description}</p>
                </div>
                <input
                  type="checkbox"
                  aria-label={category.title}
                  className="mt-1 h-5 w-5 shrink-0"
                  checked={category.key === "necessary" || choice[category.key]}
                  disabled={category.key === "necessary"}
                  onChange={(event) => {
                    if (category.key !== "necessary") setChoice({ ...choice, [category.key]: event.target.checked });
                  }}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={() => finish({ analytics: false, marketing: false })} className="rounded border px-4 py-2 text-sm">
            Odrzuć wszystkie
          </button>
          {customizing ? (
            <button type="button" onClick={() => finish(choice)} className="rounded border px-4 py-2 text-sm">
              Zapisz wybór
            </button>
          ) : (
            <button type="button" onClick={customize} className="rounded border px-4 py-2 text-sm">
              Dostosuj
            </button>
          )}
          <button type="button" onClick={() => finish({ analytics: true, marketing: true })} className="rounded bg-black px-4 py-2 text-sm text-white">
            Akceptuj wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
