import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Batch Rename Rules (Prefix/Suffix, Keep Extension)',
  description: 'Batch rename with prefix/suffix, keep extensions. Compress and download as ZIP with consistent naming. For organizing uploads and versioning. Works locally.',
  alternates: { canonical: '/guides/rename-rules', languages: { 'x-default': '/guides/rename-rules', en: '/guides/rename-rules' } },
};

export default function GuideRenameRules() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Batch Rename Rules (Prefix/Suffix, Keep Extension)', url: '/guides/rename-rules' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Batch Rename Rules (prefix/suffix, keep extension)</h1>
          <p style={{ marginBottom: 8 }}>
            <strong>Short answer:</strong> Set prefix/suffix in <a href="/compress">/compress</a>, run batch, download ZIP—filenames update while extensions stay consistent if you enable that option.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
          <ol>
            <li>Open <a href="/compress">/compress</a></li>
            <li>Set prefix/suffix; enable “keep original extension” if needed.</li>
            <li>Compress and Download ZIP – files are renamed accordingly.</li>
          </ol>
          <p className="text-muted">Consistent filenames help with uploads and versioning.</p>
        </div>
      </div>
    </>
  );
}


