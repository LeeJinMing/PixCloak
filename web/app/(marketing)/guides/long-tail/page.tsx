import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import {
  LONG_TAIL_GUIDES,
  type LongTailLocale,
} from "@/lib/longTailGuides";

const LOCALE_ORDER: LongTailLocale[] = ["en", "es", "pt", "id", "zh"];

const LOCALE_LABEL: Record<LongTailLocale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  id: "Bahasa Indonesia",
  zh: "简体中文",
};

export const metadata: Metadata = {
  title: "Long-tail image guides (platforms & use cases)",
  description: "Task-specific guides: compress to target KB, resize for social and forms, redact sensitive areas, strip EXIF, watermarks, sprites.",
  alternates: { canonical: "/guides/long-tail" },
  openGraph: {
    title: "Long-tail image guides",
    description: "Browse PixCloak guides by platform and file-size target. Privacy-first, offline-capable. Works locally in your browser, no uploads.",
    url: "/guides/long-tail",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long-tail image guides",
    description: "Compress, resize, redact, and clean metadata for real-world upload limits. Process images offline in your browser. 100% free, no uploads, privacy guaranteed.",
  },
};

function rowLabel(locale: LongTailLocale, keyword: string) {
  if (locale === "en") return keyword;
  return `${keyword} (${locale.toUpperCase()})`;
}

export default function LongTailGuideIndex() {
  const byLocale = LOCALE_ORDER.map((locale) => ({
    locale,
    label: LOCALE_LABEL[locale],
    guides: LONG_TAIL_GUIDES.filter((g) => g.locale === locale).sort((a, b) =>
      a.slug.localeCompare(b.slug)
    ),
  })).filter((section) => section.guides.length > 0);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: "Long-tail guides", url: "/guides/long-tail" },
        ]}
      />

      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h1>Long-tail image guides</h1>
          <p className="text-muted">
            Short, actionable pages for common upload limits and platforms. Each guide links to
            the right PixCloak tool preset. Processing stays in your browser.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginTop: 8, marginBottom: 0 }}>Last reviewed: April 2026.</p>
        </div>

        {byLocale.map(({ locale, label, guides }) => (
          <div key={locale} className="card">
            <h2>{label}</h2>
            <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
              {guides.map((guide) => (
                <li key={guide.slug} style={{ marginBottom: 6 }}>
                  <Link href={`/guides/long-tail/${guide.slug}`}>
                    {rowLabel(locale, guide.keyword)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="card">
          <h2>Related</h2>
          <p>
            <Link href="/guides">All guides</Link>
            {" · "}
            <Link href="/guides/languages">Guides by language</Link>
            {" · "}
            <Link href="/compress">Compressor</Link>
          </p>
        </div>

        <FaqJsonLd
          items={[
            {
              question: "Are these guides free?",
              answer:
                "Yes. PixCloak tools and guides are free to use. Image processing runs locally in your browser.",
            },
            {
              question: "Do you upload my images?",
              answer:
                "No. Guides explain targets and steps; tools process files on your device unless you explicitly use a network feature.",
            },
          ]}
        />
      </div>
    </>
  );
}
