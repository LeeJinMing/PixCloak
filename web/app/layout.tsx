import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteGraphJsonLd } from "@/components/SiteGraphJsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { getSiteOrigin } from "@/lib/site";
import { ConsentServices } from "@/components/ConsentServices";
import { isProductionDeployment, resolveServiceConfig } from "@/lib/serviceConfig";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = getSiteOrigin();
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
    description: "Prepare private images for safe sharing and upload. Image processing stays in your browser.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PixCloak – Privacy & Performance toolkit" }],
  },
  twitter: { card: "summary_large_image", title: "PixCloak", description: "Redact, remove metadata, convert, and meet upload limits locally in your browser.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const services = resolveServiceConfig(process.env, isProductionDeployment(process.env));
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {services.adsAvailable && <meta name="google-adsense-account" content={services.adsClient} />}
        <SiteGraphJsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} data-analytics="off" data-ads="off" data-ads-available={services.adsAvailable ? "true" : "false"}>
        <SiteChrome>{children}</SiteChrome>
        <ConsentServices analyticsAvailable={services.analyticsAvailable} adsAvailable={services.adsAvailable} adsClient={services.adsClient} />
      </body>
    </html>
  );
}
