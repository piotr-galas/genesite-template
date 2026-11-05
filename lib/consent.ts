"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/site.config";

// The visitor's cookie choice, shared by the banners, the tracking scripts and the footer link.
// Kept in localStorage; null until the visitor has chosen.
export type Consent = { analytics: boolean; marketing: boolean };

const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";
const OPEN_EVENT = "cookie-consent-open";

// Whether the site tracks anything at all: without tracking there is nothing to agree to and no banner
export const tracks = Object.values(site.tracking).some(Boolean);

export function readConsent(): Consent | null {
  return parse(readRaw());
}

export function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// The current choice, updated when the visitor changes it; undefined while the page is not in a browser yet
// (the static html), so a returning visitor never sees the banner flash
export function useConsent(): Consent | null | undefined {
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined);
  return raw === undefined ? undefined : parse(raw);
}

// The footer's "Ustawienia cookies" opens the banner again
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// Whether the banner shows: before the first choice, and when opened from the footer
export function useBannerOpen() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);
  const open = reopened || consent === null;
  return [open, () => setReopened(false)] as const;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  // Another tab of the same site
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// The stored text, so React can compare snapshots; null when unreadable or not stored
function readRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): Consent | null {
  try {
    const value = JSON.parse(raw ?? "null");
    if (typeof value?.analytics === "boolean" && typeof value?.marketing === "boolean") return value;
  } catch {}
  return null;
}
