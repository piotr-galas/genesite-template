"use client";

import { openConsentSettings, tracks } from "@/lib/consent";

// Lets the visitor change their mind, as the law requires; only when the site tracks anything
export function ConsentSettingsLink() {
  if (!tracks) return null;
  return (
    <button type="button" onClick={openConsentSettings} className="w-fit underline">
      Ustawienia cookies
    </button>
  );
}
