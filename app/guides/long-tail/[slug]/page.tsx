import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { scenarios } from "@/lib/seo-scenarios";
import RelatedTasks from "@/components/RelatedTasks";

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await Promise.resolve(params);
  const s = scenarios.find((x) => x.slug === p?.slug);
  if (!s) return {} as Metadata;
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/guides/long-tail/${s.slug}` },
    openGraph: { title: s.title, description: s.description },
    twitter: { title: s.title, description: s.description },
  };
}

export default async function Page({ params }: any) {
  const p = await Promise.resolve(params);
  const s = scenarios.find((x) => x.slug === p?.slug);
  if (!s) return notFound();
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
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


