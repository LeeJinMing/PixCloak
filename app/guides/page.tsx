"use client";
import { useState, type ReactNode } from 'react';

export default function GuidesPage() {
  const items = [
    {
      href: '/guides/compress-to-target-kb',
      title: 'Compress images to a target size (KB)',
      summary: 'Use Target (KB) to hit 200KB/500KB limits. Prefer resizing first for large photos.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open <a href="/compress?kb=200">/compress?kb=200</a> or <a href="/compress?kb=500">/compress?kb=500</a></li>
            <li>Drag images in, click Compress, then Download ZIP.</li>
          </ol>
          <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Target size is approximate (binary search); usually within a few KB.</li>
            <li>For smaller sizes, reduce resolution or lower quality.</li>
          </ul>
        </div>
      ),
    },
    {
      href: '/guides/convert-jpeg-to-webp',
      title: 'Convert JPEG to WebP',
      summary: 'Use WebP to reduce size while keeping quality; ideal for web publishing.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open /compress, set Format = WebP</li>
            <li>Optionally set Target (KB); click Compress</li>
          </ol>
          <a className="pill" href="/guides/convert-jpeg-to-webp">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/resize-longest-side',
      title: 'Resize by longest side (1920px/1080px)',
      summary: 'Downscale first for huge photos, then compress to target KB.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Choose Resize = Longest side, set value</li>
            <li>Compress and download</li>
          </ol>
          <a className="pill" href="/guides/resize-longest-side">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/rename-rules',
      title: 'Batch rename rules',
      summary: 'Prefix/suffix and keep extension for consistent exports.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Set prefix/suffix; keep extension if needed</li>
            <li>ZIP download with renamed files</li>
          </ol>
          <a className="pill" href="/guides/rename-rules">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/license-plate-redaction',
      title: 'License plate redaction',
      summary: 'Use built‑in preset or draw a box; export without EXIF/GPS.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open /redact and select preset</li>
            <li>Solid or Pixelate, then export</li>
          </ol>
          <a className="pill" href="/guides/license-plate-redaction">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/screenshot-privacy-check',
      title: 'Screenshot privacy check',
      summary: 'Checklist before posting screenshots publicly.',
      content: (
        <div>
          <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Hide contacts/IDs/QR codes</li>
            <li>Crop irrelevant UI</li>
          </ul>
          <a className="pill" href="/guides/screenshot-privacy-check">Open full guide</a>
        </div>
      ),
    },
    { href: '/guides/zip-batch-download', title: 'Batch compress and download ZIP', summary: 'Drag many images, compress, and save as a single ZIP.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Upload multiple files</li><li>Compress, then click Download ZIP</li></ol><a className="pill" href="/guides/zip-batch-download">Open full guide</a></div>) },
    { href: '/guides/jpeg-vs-webp-size-quality', title: 'JPEG vs WebP size & quality', summary: 'When to choose JPEG vs WebP vs PNG.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>WebP often smaller</li><li>JPEG broad support</li></ul><a className="pill" href="/guides/jpeg-vs-webp-size-quality">Open full guide</a></div>) },
    { href: '/guides/mobile-upload-limits', title: 'Mobile upload limits', summary: 'Hit 200KB/500KB quickly with target KB + resize.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use Target (KB)</li><li>Resize longest side</li></ol><a className="pill" href="/guides/mobile-upload-limits">Open full guide</a></div>) },
    { href: '/guides/social-platform-kb', title: 'Common KB targets for social/forms', summary: 'Use 200KB for avatars, 500KB for posts.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Avatars: 200KB</li><li>Posts: 500KB</li></ul><a className="pill" href="/guides/social-platform-kb">Open full guide</a></div>) },
    { href: '/guides/anonymized-sharing', title: 'Anonymized image sharing', summary: 'Redact sensitive fields and remove metadata.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Solid/pixelate</li><li>Remove EXIF/GPS</li></ul><a className="pill" href="/guides/anonymized-sharing">Open full guide</a></div>) },
    { href: '/guides/compress-to-200kb', title: 'Compress to 200KB', summary: 'Hit 200KB limits for avatars and forms.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=200</li><li>Resize longest side</li></ol><a className="pill" href="/guides/compress-to-200kb">Open full guide</a></div>) },
    { href: '/guides/compress-to-500kb', title: 'Compress to 500KB', summary: 'Common post limit for communities and forms.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=500</li><li>Prefer WebP</li></ol><a className="pill" href="/guides/compress-to-500kb">Open full guide</a></div>) },
    { href: '/guides/compress-to-1mb', title: 'Compress to 1MB', summary: 'Higher quality for portfolios and submissions.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=1024</li><li>Set format/resize</li></ol><a className="pill" href="/guides/compress-to-1mb">Open full guide</a></div>) },
    { href: '/guides/remove-exif-iphone', title: 'Remove EXIF/GPS from iPhone photos', summary: 'Export removes metadata by re-encoding.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Open /compress or /redact</li><li>Export as JPEG/WebP</li></ol><a className="pill" href="/guides/remove-exif-iphone">Open full guide</a></div>) },
    { href: '/guides/remove-exif-wechat', title: 'Remove EXIF from WeChat images', summary: 'Strip metadata when exporting.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Open /compress</li><li>Export JPEG/WebP</li></ol><a className="pill" href="/guides/remove-exif-wechat">Open full guide</a></div>) },
    { href: '/guides/avatar-200kb', title: 'Create 200KB avatars', summary: 'Square resize + target KB.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=200</li><li>Resize to 512–1024px</li></ol><a className="pill" href="/guides/avatar-200kb">Open full guide</a></div>) },
    { href: '/guides/post-500kb', title: 'Prepare 500KB post images', summary: 'Good for many feeds and forms.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=500</li><li>Width ≤ 1920px</li></ol><a className="pill" href="/guides/post-500kb">Open full guide</a></div>) },
    { href: '/guides/jpeg-vs-webp-for-twitter', title: 'JPEG vs WebP for X/Twitter', summary: 'Choose format for size vs compatibility.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Try WebP first</li><li>Fallback to JPEG if re-encoded</li></ul><a className="pill" href="/guides/jpeg-vs-webp-for-twitter">Open full guide</a></div>) },
    { href: '/guides/jpeg-vs-webp-for-linkedin', title: 'JPEG vs WebP for LinkedIn', summary: 'Use WebP for feed, JPEG for banners.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>1920px longest side</li><li>Start ~500KB</li></ul><a className="pill" href="/guides/jpeg-vs-webp-for-linkedin">Open full guide</a></div>) },
    { href: '/guides/export-without-metadata', title: 'Export without metadata', summary: 'EXIF/GPS removed on export.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress or /redact</li><li>Export JPEG/WebP/PNG</li></ol><a className="pill" href="/guides/export-without-metadata">Open full guide</a></div>) },
    { href: '/guides/platform-image-limits', title: 'Platform image limits', summary: 'Common caps for size/dimensions + quick presets.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Avatars ≤200KB</li><li>Posts ≤500KB</li></ul><a className="pill" href="/guides/platform-image-limits">Open full guide</a></div>) },
    { href: '/guides/embed-button', title: 'Embed “Compress to KB” button', summary: 'Add link/script to your blog to help readers.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Link-only</li><li>Script-enhanced</li></ul><a className="pill" href="/guides/embed-button">Open full guide</a></div>) },
    { href: '/guides/compress-to-300kb', title: 'Compress to 300KB', summary: 'Balance visual quality and speed.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=300</li><li>Prefer WebP</li></ol><a className="pill" href="/guides/compress-to-300kb">Open full guide</a></div>) },
    { href: '/guides/compress-to-800kb', title: 'Compress to 800KB', summary: 'Higher quality for portfolios.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use /compress?kb=800</li><li>Resize 1920px</li></ol><a className="pill" href="/guides/compress-to-800kb">Open full guide</a></div>) },
    { href: '/guides/resize-to-1920', title: 'Resize to 1920px (longest)', summary: 'Downscale before compressing for best results.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>Set Resize = Longest</li><li>Value 1920</li></ol><a className="pill" href="/guides/resize-to-1920">Open full guide</a></div>) },
    { href: '/guides/prepare-images-for-portfolio', title: 'Portfolio image prep', summary: '1920px + 800KB–1MB.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Resize then target KB</li><li>WebP/JPEG</li></ul><a className="pill" href="/guides/prepare-images-for-portfolio">Open full guide</a></div>) },
    { href: '/guides/prepare-images-for-job-application', title: 'Job application portals', summary: '200KB avatar, 500KB attachment.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Use presets</li><li>Metadata removed</li></ul><a className="pill" href="/guides/prepare-images-for-job-application">Open full guide</a></div>) },
    { href: '/guides/prepare-images-for-forms', title: 'Prepare images for forms', summary: 'Quick presets for common caps.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>200KB/500KB</li><li>1920px</li></ul><a className="pill" href="/guides/prepare-images-for-forms">Open full guide</a></div>) },
    { href: '/guides/avoid-artifacts-webp-jpeg', title: 'Avoid artifacts (WebP/JPEG)', summary: 'Downscale first; adjust KB and format.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>Resize then target KB</li><li>Switch format if needed</li></ul><a className="pill" href="/guides/avoid-artifacts-webp-jpeg">Open full guide</a></div>) },
    { href: '/guides/research-jpeg-vs-webp', title: 'Research: JPEG vs WebP', summary: 'Benchmarks on varied images at target KBs.', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>10 CC0 images</li><li>200/300/500/800KB</li></ul><a className="pill" href="/guides/research-jpeg-vs-webp">Open research</a></div>) },
    { href: '/guides/research-500kb-quality-range', title: 'Research: 500KB quality range', summary: 'What q-values land near 500KB across content?', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>1920px longest</li><li>Binary search</li></ul><a className="pill" href="/guides/research-500kb-quality-range">Open research</a></div>) },
    { href: '/guides/es-comprimir-a-200kb', title: 'ES: Comprimir a 200KB', summary: 'Guía rápida para avatares y formularios.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>/compress?kb=200</li><li>1920px</li></ol><a className="pill" href="/guides/es-comprimir-a-200kb">Abrir guía</a></div>) },
    { href: '/guides/pt-comprimir-para-500kb', title: 'PT: Comprimir para 500KB', summary: 'Limite comum em formulários e comunidades.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>/compress?kb=500</li><li>WebP/JPEG</li></ol><a className="pill" href="/guides/pt-comprimir-para-500kb">Abrir guia</a></div>) },
    { href: '/guides/id-kompres-menjadi-1mb', title: 'ID: Kompres menjadi 1MB', summary: 'Kualitas lebih tinggi untuk portofolio.', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>/compress?kb=1024</li><li>1920px</li></ol><a className="pill" href="/guides/id-kompres-menjadi-1mb">Buka panduan</a></div>) },
    { href: '/guides/remove-exif-iphone-zh', title: '中文：iPhone 照片去 EXIF/GPS', summary: '重新编码导出自动移除元数据。', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>打开 /compress 或 /redact</li><li>导出 JPEG/WebP</li></ol><a className="pill" href="/guides/remove-exif-iphone-zh">打开</a></div>) },
    { href: '/guides/remove-exif-wechat-zh', title: '中文：微信图片去 EXIF', summary: '导出时自动去除 EXIF/GPS。', content: (<div><ol style={{ paddingLeft: 18, margin: '6px 0' }}><li>打开 /compress</li><li>导出 JPEG/WebP</li></ol><a className="pill" href="/guides/remove-exif-wechat-zh">打开</a></div>) },
    { href: '/guides/platform-image-limits-zh', title: '中文：平台图片限制索引', summary: '头像200KB、帖子500KB、先缩放1920px。', content: (<div><ul style={{ paddingLeft: 18, margin: '6px 0' }}><li>200KB/500KB 预设</li><li>移除EXIF/GPS</li></ul><a className="pill" href="/guides/platform-image-limits-zh">打开</a></div>) },
    {
      href: '/guides/redaction-checklist',
      title: 'Privacy redaction checklist',
      summary: 'Mask faces, plates, contacts, IDs; remove EXIF/GPS; use irreversible methods.',
      content: (
        <div>
          <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Cover faces, license plates, phone/email/address, QR codes.</li>
            <li>Remove EXIF/GPS.</li>
            <li>Keep safety margins; prefer solid/pixelate (irreversible).</li>
          </ul>
        </div>
      ),
    },
    {
      href: '/guides/exif-gps-removal',
      title: 'Remove EXIF/GPS metadata',
      summary: 'Re‑encoding removes EXIF/GPS by default in our tools. Why it matters and how to check.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open <a href="/redact">/redact</a> or <a href="/compress">/compress</a></li>
            <li>Export as JPG – EXIF/GPS will be removed automatically.</li>
          </ol>
        </div>
      ),
    },
  ];

  function categoryFor(href: string): 'compress' | 'redact' | 'platform' | 'research' | 'embed' | 'languages' {
    if (href.includes('research-')) return 'research';
    if (href.includes('embed-button')) return 'embed';
    if (href.includes('platform-image-limits')) return 'platform';
    if (href.includes('license-plate-redaction') || href.includes('redaction') || href.includes('/redact') || href.includes('anonymized')) return 'redact';
    if (href.includes('/es-') || href.includes('/pt-') || href.includes('/id-') || href.includes('-zh')) return 'languages';
    return 'compress';
  }

  const [filter, setFilter] = useState<'all' | 'compress' | 'redact' | 'platform' | 'research' | 'embed' | 'languages'>('compress');

  function Item({ title, summary, content }: { title: string; summary: string; content: ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(v => !v)} aria-expanded={open}
          style={{ width: '100%', textAlign: 'left', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700 }}>
          <span>
            {title}
            <div className="text-muted" style={{ fontSize: 13, fontWeight: 400 }}>{summary}</div>
          </span>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{open ? '−' : '+'}</span>
        </button>
        {open && (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginTop: 8, color: '#374151' }}>
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Guides</h1>
        <p className="text-muted">Expand below to read key steps inline, or open the full guide.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'compress', label: 'Compress' },
            { key: 'redact', label: 'Redact' },
            { key: 'platform', label: 'Platform' },
            { key: 'research', label: 'Research' },
            { key: 'embed', label: 'Embed' },
            { key: 'languages', label: 'Languages' },
          ].map((t) => (
            <button key={t.key} onClick={() => setFilter(t.key as typeof filter)}
              className={"pill"}
              aria-pressed={filter === t.key}
              style={{ background: filter === t.key ? '#111827' : undefined, color: filter === t.key ? '#fff' : undefined }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{ display: 'grid', gap: 10 }}>
          {items.filter((it) => filter === 'all' || categoryFor(it.href) === filter).map((it, idx) => (
            <Item key={idx} title={it.title} summary={it.summary} content={it.content} />
          ))}
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Languages</h2>
        <p className="text-muted">Browse guides in Spanish/Portuguese/Indonesian/Chinese.</p>
        <a className="pill" href="/guides/languages">Open languages index</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((g, idx) => ({ '@type': 'ListItem', position: idx + 1, url: g.href, name: g.title })) }) }} />
    </div>
  );
}


