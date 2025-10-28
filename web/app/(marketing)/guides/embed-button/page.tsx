import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Embed “Compress to KB” Button (Link or Script) | PixCloak',
  description: 'Add a simple link or script‑enhanced button to open PixCloak with presets (KB, format, resize). Local processing—no uploads. Includes customizable styles...',
  alternates: { canonical: '/guides/embed-button', languages: { 'x-default': '/guides/embed-button', en: '/guides/embed-button' } },
};

export default function GuideEmbedButton() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Embed “Compress to KB” Button (Link or Script)', url: '/guides/embed-button' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Embed a “Compress to KB” button</h1>
        <p className="text-muted">Add a small link or script to your blog/docs. Everything opens PixCloak (local processing, no uploads).</p>
        <h2>Link-only (safest)</h2>
        <pre><code>{`<a href="https://pixcloak.com/compress?kb=500&utm_source=embed" rel="noopener">Compress to 500KB (local)</a>`}</code></pre>
        <h2>Script-enhanced button</h2>
        <pre><code>{`<script src="https://pixcloak.com/embed/pixcloak-embed.js" async></script>
<a
  data-pixcloak-embed
  data-kb="500"
  data-lang="en"
  data-utm-source="embed-demo"
  data-bg="#0ea5e9"
  data-color="#fff"
  data-radius="10px"
  data-pad="10px 14px"
>Compress to 500KB (local)</a>`}</code></pre>
        <p className="text-muted">Options: <code>data-kb</code> (e.g., 200/500/1024), <code>data-format</code> (image/webp|image/jpeg), <code>data-resize</code> (e.g., 1920), <code>data-utm-source</code> (default: embed), <code>data-lang</code> (en|zh|es|pt|id), <code>data-bg</code>, <code>data-color</code>, <code>data-radius</code>, <code>data-pad</code>, <code>data-weight</code>, <code>data-text</code>.</p>
        <p className="text-muted">If you lazy‑load HTML, call <code>pixcloakEmbedInit()</code> after inserting elements.</p>
      </div>
    </div>
    </>
  );
}


