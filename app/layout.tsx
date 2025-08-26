import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixCloak",
  description: "Privacy & Performance: Compress and Redact images in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* SW register */}
        {/* @ts-expect-error Server Component importing client child via dynamic below if needed */}
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{});} ` }} />
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
