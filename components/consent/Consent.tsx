"use client";

import { tracks } from "@/lib/consent";
import { site } from "@/site.config";
import { ConsentDetailed } from "./ConsentDetailed";
import { ConsentSimple } from "./ConsentSimple";
import { Tracking } from "./Tracking";

// The banner chosen in site.config.ts and the tracking it guards; nothing at all when the site tracks nothing
export function Consent() {
  if (!tracks) return null;
  return (
    <>
      {site.consent === "detailed" ? <ConsentDetailed /> : <ConsentSimple />}
      <Tracking />
    </>
  );
}
