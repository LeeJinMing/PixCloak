import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com";
const isProd = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PixCloak",
    template: "%s · PixCloak",
  },
  description: "Privacy & Performance: Compress and Redact images in your browser",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "PixCloak",
    title: "PixCloak",
    description: "Compress and Redact images locally. No upload. No tracking.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PixCloak – Privacy & Performance toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixCloak",
    description: "Compress and Redact images locally. No upload. No tracking.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const enableAnalytics = process.env.NEXT_PUBLIC_ANALYTICS !== "false";
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* SW register (only in production) */}
        {isProd && (
          <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});} ` }} />
        )}
        {enableAnalytics && <Analytics />}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid #eee'
        }}>
          <Link href="/" style={{ fontWeight: 700 }}>PixCloak</Link>
          <nav style={{ display: 'flex', gap: 16 }}>
            <Link href="/compress">Compress</Link>
            <Link href="/redact">Redact</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/guides">Guides</Link>
          </nav>
        </header>
        <main style={{ padding: '16px' }}>{children}</main>
        <footer style={{ padding: '16px', borderTop: '1px solid #eee', marginTop: 24 }}>
          <small>© {new Date().getFullYear()} PixCloak. All rights reserved.</small>
        </footer>
      </body>
    </html>
  );
}
