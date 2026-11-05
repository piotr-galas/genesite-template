"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useConsent, type Consent } from "@/lib/consent";
import { site } from "@/site.config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// The tracking scripts, each loaded only after the visitor agreed to its category: GTM and GA4 with analytics,
// Google Ads and the Meta Pixel with marketing. Until then nothing from Google or Meta reaches the browser.
// Google's consent signals follow every choice, so the tags inside GTM respect the categories too. A script
// that already runs stays until the next page load after consent is withdrawn; it no longer gets consent.
export function Tracking() {
  const consent = useConsent();
  const { gtmId, ga4Id, googleAdsId, metaPixelId } = site.tracking;

  useEffect(() => {
    if (consent) sendGoogleSignals(consent);
  }, [consent]);

  if (!consent) return null;
  const { analytics, marketing } = consent;
  const ga4 = analytics && ga4Id;
  const ads = marketing && googleAdsId;
  const gtagId = ga4 || ads;

  return (
    <>
      {gtmId && analytics && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">
            {`gtag('js',new Date());${ga4 ? `gtag('config','${ga4Id}');` : ""}${ads ? `gtag('config','${googleAdsId}');` : ""}`}
          </Script>
        </>
      )}
      {metaPixelId && marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}

// Consent Mode v2: queued in dataLayer before Google's scripts load, and updated on every later change
function sendGoogleSignals({ analytics, marketing }: Consent) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      // gtag must push the arguments object itself, not an array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  const ads = marketing ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  });
}
