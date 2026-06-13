import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SiteGraphJsonLd } from "@/components/SiteGraphJsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { getSiteOrigin } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = getSiteOrigin();
const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "PixCloak", template: "%s | PixCloak" },
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      "en-US": "/",
      "en-GB": "/",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PixCloak",
    title: "PixCloak",
    description: "Compress and Redact images locally. No upload. No tracking.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PixCloak – Privacy & Performance toolkit" }],
  },
  twitter: { card: "summary_large_image", title: "PixCloak", description: "Compress and Redact images locally. No upload. No tracking.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const enableAnalytics = process.env.NEXT_PUBLIC_ANALYTICS !== "false";
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const enableAds = process.env.NEXT_PUBLIC_ADSENSE === "true" && isProd && !!adsClient;
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {enableAds && (
          <>
            <meta name="google-adsense-account" content={adsClient} />
            <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`} crossOrigin="anonymous" />
          </>
        )}
        <SiteGraphJsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} data-ads={enableAds ? 'on' : 'off'}>
        {isProd && (
          <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});} ` }} />
        )}
        {enableAnalytics && <Analytics />}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
