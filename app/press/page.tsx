import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Brand Assets | PixCloak',
  description: 'Download brand assets, demo images, and copy. PixCloak is a privacy‑first image toolkit that runs locally—compress, redact, and export without uploads.',
  alternates: { canonical: '/press', languages: { 'x-default': '/press' } },
};

export default function PressPage() {
  const assets = [
    "/press/compress-200kb.gif",
    "/press/plate-demo.gif",
    "/press/compress-demo-1.webp",
    "/press/compress-demo-2.webp",
    "/press/compress-demo-3.webp",
    "/press/plate-ui.webp",
    "/press/plate-upload.webp",
    "/press/plate-pixelate.webp",
    "/press/plate-solid.webp",
    "/press/copy.txt",
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card" style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}>
        <h1>Press & Brand</h1>
        <p className="text-muted">Download assets and copy for posts. PixCloak is a privacy‑first image toolkit that runs locally (no upload).</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link className="pill" href="/">Home</Link>
          <a className="pill" href="/compress">Compress</a>
          <a className="pill" href="/redact">Redact</a>
          <a className="pill" href="/guides">Guides</a>
          <a className="pill" href="https://github.com/LeeJinMing/PixCloak" target="_blank" rel="noreferrer">GitHub</a>
          <a className="pill" href="/contact">Contact</a>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Assets</h2>
        <ul>
          {assets.map((a) => (
            <li key={a}>
              <a href={a}>{a}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {/* Render previews with next/image to enable AVIF/WebP negotiation */}
          {assets.filter(a => a.endsWith('.webp')).slice(0, 3).map((a) => (
            <div key={a} style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
              <Image src={a} alt={a.replace('/press/', '').replace(/[-_]/g, ' ')} fill sizes="(max-width: 600px) 100vw, 200px" />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Copy</h2>
        <p>See <a href="/press/copy.txt">/press/copy.txt</a> for EN/ZH post templates.</p>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Embed Button</h2>
        <p className="text-muted">Add a small button to your blog/docs to help readers compress locally. No uploads.</p>
        <pre><code>{`<a href="https://pixcloak.com/compress?kb=500&utm_source=embed" rel="noopener">Compress to 500KB (local)</a>`}</code></pre>
        <pre><code>{`<script src="/embed/pixcloak-embed.js" async></script>
<a data-pixcloak-embed data-kb="500">Compress to 500KB (local)</a>`}</code></pre>
        <p className="text-muted">Options: <code>data-kb</code> 200/300/500/800/1024, <code>data-format</code> image/webp|image/jpeg, <code>data-resize</code> 1920.</p>
        <a className="pill" href="/guides/embed-button">Read the full embed guide</a>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Research</h2>
        <ul>
          <li><a href="/guides/research-jpeg-vs-webp">JPEG vs WebP on varied images</a></li>
          <li><a href="/guides/research-500kb-quality-range">What quality fits 500KB?</a></li>
        </ul>
      </div>
    </div>
  );
}


