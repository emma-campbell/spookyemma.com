"use client";

import Script from "next/script";

export function RybbitAnalytics() {
  const scriptUrl = process.env.NEXT_PUBLIC_RYBBIT_SCRIPT_URL;
  const siteId = process.env.NEXT_PUBLIC_RYBBIT_SITE_ID;
  const sessionReplay = process.env.NEXT_PUBLIC_RYBBIT_SESSION_REPLAY;
  const trackErrors = process.env.NEXT_PUBLIC_RYBBIT_TRACK_ERRORS;

  if (!scriptUrl || !siteId) {
    return null;
  }

  return (
    <Script
      src={scriptUrl}
      data-site-id={siteId}
      data-session-replay={sessionReplay}
      data-track-errors={trackErrors}
      strategy="afterInteractive"
      defer
    />
  );
}