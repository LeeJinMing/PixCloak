import { TEMPLATES } from "@/lib/templates";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates: One‑Click Presets | PixCloak',
  description: 'Start faster with one‑click presets: 200KB/500KB, 1920px resize, WebP/JPEG formats, and privacy‑safe exports. Everything runs locally in your browser.',
  alternates: { canonical: '/templates' },
};

export default function TemplatesPage() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Templates</h1>
      <p>One‑click presets for common scenarios. Choose a template and start.</p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {TEMPLATES.map(t => (
          <a key={t.slug} href={t.ctaHref} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{t.title}</div>
            <div style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>{t.summary}</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {t.highlights.slice(0, 3).map((h, i) => (<li key={i} style={{ fontSize: 13 }}>{h}</li>))}
            </ul>
          </a>
        ))}
      </div>
    </div>
  );
}


