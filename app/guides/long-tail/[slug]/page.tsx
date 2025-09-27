import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scenarios } from "@/lib/seo-scenarios";
import RelatedTasks from "@/components/RelatedTasks";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await params;
  const s = scenarios.find((x) => x.slug === p.slug);
  if (!s) return {} as Metadata;
  const path = `/guides/long-tail/${s.slug}`;
  const languages: Record<string, string> = { 'x-default': path };
  if (s.slug.endsWith('-zh') || s.slug.includes('-cn') || /[\u4e00-\u9fa5]/.test(s.title)) {
    languages.zh = path;
  } else if (s.slug.endsWith('-es')) {
    languages.es = path;
  } else if (s.slug.endsWith('-pt')) {
    languages.pt = path;
  } else if (s.slug.endsWith('-id')) {
    languages.id = path;
  } else {
    languages.en = path;
  }
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: path, languages },
    openGraph: { title: s.title, description: s.description },
    twitter: { title: s.title, description: s.description },
  };
}

export default async function Page({ params }: PageProps) {
  const p = await params;
  const s = scenarios.find((x) => x.slug === p.slug);
  if (!s) return notFound();
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixcloak.com').replace(/\/$/, '')}/` },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixcloak.com').replace(/\/$/, '')}/guides` },
              { '@type': 'ListItem', position: 3, name: s.title, item: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://pixcloak.com').replace(/\/$/, '')}/guides/long-tail/${s.slug}` },
            ],
          })
        }}
      />
      <div className="card">
        <h1 style={{ marginBottom: 8 }}>{s.title}</h1>
        <p className="text-muted" style={{ marginBottom: 12 }}>{s.description}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {s.presets.map((p, i) => (
            <a key={i} className="pill" href={p.href}>{p.label}</a>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>FAQ</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {s.faq.map((f, i) => (
            <div key={i}>
              <strong>{f.q}</strong>
              <div className="text-muted">{f.a}</div>
            </div>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
            })
          }}
        />
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Related tasks</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href="/compress?kb=200" className="pill">Compress to 200KB</a>
          <a href="/compress?kb=500" className="pill">Compress to 500KB</a>
          <a href="/guides/resize-to-1920" className="pill">Resize to 1920</a>
          <a href="/redact" className="pill">Redact sensitive info</a>
          <a href="/guides/exif-gps-removal" className="pill">Remove EXIF/GPS</a>
        </div>
      </div>
      <RelatedTasks />
    </div>
  );
}


