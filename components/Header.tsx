"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";

// The site's name and its menu. On phones the menu is behind a button, which turns into a cross while it is open;
// Escape closes it and gives the focus back to the button, and so does following a link.
export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="font-semibold">
          {site.name}
        </Link>
        <nav className="hidden gap-6 md:flex">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          ref={button}
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-label={open ? "Zamknij menu" : "Menu"}
          aria-expanded={open}
          aria-controls="menu-phone"
          onClick={() => setOpen(!open)}
        >
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {open && (
        <nav id="menu-phone" className="border-t px-4 pb-2 md:hidden">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href} className="block py-3" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
