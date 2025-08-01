import { Analytics } from "@vercel/analytics/react";

import { RybbitAnalytics } from "@/components/analytics/rybbit";
import { Footer } from "@/components/layout/footer";
import { Sidebar } from "@/components/layout/sidebar";
import type { Metadata } from "next";

import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

import "../globals.css";

const garet = localFont({
  src: [
    {
      path: "../styles/fonts/garet-hairline-webfont.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-hairlineitalic-webfont.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-thin-webfont.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-thinitalic-webfont.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-lightitalic-webfont.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-regularitalic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-mediumitalic-webfont.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-heavy-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-heavyitalic-webfont.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-bolditalic-webfont.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-extrabold-webfont.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-extrabolditalic-webfont.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-black-webfont.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-blackitalic-webfont.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../styles/fonts/garet-fat-webfont.woff2",
      weight: "1000",
      style: "normal",
    },
    {
      path: "../styles/fonts/garet-fatitalic-webfont.woff2",
      weight: "1000",
      style: "italic",
    },
  ],
  variable: "--font-garet",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Emma Campbell",
  description: "Emma's Digital Presence",
  authors: {
    url: "https://spookyemma.com",
    name: "Emma Campbell",
  },
  referrer: "origin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${garet.variable} ${jetbrains.variable} w-full items-center`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Spooklore RSS Feed"
          href="/rss.xml"
        />
      </head>
      <body className="root bg-background leading-relaxed text-text">
        <Sidebar />
        <div className="lg:ml-48 min-h-screen flex flex-col">
          <main className="flex-grow mx-auto w-full max-w-4xl px-4 sm:px-8 py-12 pt-20 lg:pt-12 text-md font-sans">
            {children}
          </main>
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-8">
            <Footer />
          </div>
        </div>
        <Analytics />
        <RybbitAnalytics />
      </body>
    </html>
  );
}
