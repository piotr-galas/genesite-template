"use client";

import { useEffect, useState, type ReactNode } from "react";

export type Proposal = {
  // "A", "B", "C": the button's text and the address's hash (#a, #b, #c)
  letter: string;
  // A few words on what it is going for, e.g. "Spokojnie i klasycznie"
  name: string;
  page: ReactNode;
};

// Our bar over the client's home page: the client switches between the layouts we propose and compares them on
// the same content. Every proposal is in the html, the others hidden, so switching is instant and works without
// a server; a hidden proposal's lazy images do not load until it is shown. The hash keeps the choice, so a link to
// #b opens proposal B. The bar's height is --proposals-bar: a proposal's sticky header sits under it with
// `top-[var(--proposals-bar)]`.
export function Proposals({ proposals }: { proposals: Proposal[] }) {
  const [current, setCurrent] = useState(proposals[0].letter);

  useEffect(() => {
    const fromHash = () => {
      const letter = window.location.hash.slice(1).toUpperCase();
      if (proposals.some((proposal) => proposal.letter === letter)) setCurrent(letter);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [proposals]);

  const choose = (letter: string) => {
    setCurrent(letter);
    history.replaceState(null, "", `#${letter.toLowerCase()}`);
    window.scrollTo({ top: 0 });
  };

  const shown = proposals.find((proposal) => proposal.letter === current) ?? proposals[0];

  return (
    <>
      <div
        className="sticky top-0 z-[1000] flex h-[var(--proposals-bar)] items-center gap-3 bg-neutral-900 px-3 text-sm text-white shadow-md sm:px-4"
        role="toolbar"
        aria-label="Propozycje wyglądu strony"
      >
        <span className="hidden shrink-0 font-medium text-neutral-300 sm:inline">Propozycje wyglądu:</span>
        <div className="flex gap-1.5">
          {proposals.map((proposal) => {
            const active = proposal.letter === current;
            return (
              <button
                key={proposal.letter}
                type="button"
                aria-pressed={active}
                onClick={() => choose(proposal.letter)}
                className={`min-h-9 min-w-9 rounded-md px-3 font-semibold transition-colors ${
                  active ? "bg-white text-neutral-900" : "bg-neutral-700 text-white hover:bg-neutral-600"
                }`}
              >
                {proposal.letter}
              </button>
            );
          })}
        </div>
        <span className="truncate text-neutral-300" aria-live="polite">
          {shown.name}
        </span>
      </div>
      {proposals.map((proposal) => (
        <div key={proposal.letter} hidden={proposal.letter !== current} className="flex flex-1 flex-col">
          {proposal.page}
        </div>
      ))}
    </>
  );
}
