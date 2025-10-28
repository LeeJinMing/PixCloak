import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com";
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
        <script
          type="application/ld+json"
          // Organization schema for brand entity
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PixCloak',
              url: siteUrl,
              logo: `${siteUrl}/favicon.svg`,
              sameAs: [
                'https://github.com/LeeJinMing/PixCloak'
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          // WebSite schema with site search hint
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: siteUrl,
              name: 'PixCloak',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/guides?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} data-ads={enableAds ? 'on' : 'off'}>
        {isProd && (
          <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});} ` }} />
        )}
        {enableAnalytics && <Analytics />}
        <header role="banner" style={{ borderBottom: '1px solid #eee' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px' }}>
            <Link href="/" style={{ fontWeight: 700 }}>PixCloak</Link>
            <nav role="navigation" aria-label="Primary" style={{ display: 'flex', gap: 16 }}>
              <Link href="/redact">Redact</Link>
              <Link href="/tools">Tools</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/guides/embed-button">Embed</Link>
              <Link href="/press">Press</Link>
            </nav>
          </div>
        </header>
        <main role="main" className="container section">{children}</main>
        <footer role="contentinfo" style={{ borderTop: '1px solid #eee', marginTop: 24 }}>
          <div className="container" style={{ padding: '16px 16px', display: 'grid', gap: 8, justifyItems: 'center' }}>
            <small>© {new Date().getFullYear()} PixCloak. All rights reserved.</small>
            <nav role="navigation" aria-label="Footer" style={{ display: 'flex', gap: 16 }}>
              <Link href="/about">About</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/guides/embed-button">Embed</Link>
              <Link href="/contact" className="pill">Feedback</Link>
            </nav>
            <div className="text-muted" style={{ fontSize: 12 }}>Local processing in your browser. Images are not uploaded to any server.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
