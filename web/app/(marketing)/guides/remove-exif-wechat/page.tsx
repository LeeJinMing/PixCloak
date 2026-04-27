import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Does WeChat Remove EXIF? Clean Photos First',
  description: 'WeChat may recompress photos, but do not rely on it to remove GPS or EXIF. Check and strip metadata locally before sending images.',
  alternates: {
    canonical: '/guides/remove-exif-wechat',
    languages: {
      zh: '/guides/remove-exif-wechat-zh',
      en: '/guides/remove-exif-wechat'
    },
  },
};

export default function GuideRemoveExifWeChat() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Does WeChat Remove EXIF?', url: '/guides/remove-exif-wechat' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Does WeChat Remove EXIF? Clean Photos Before Sending</h1>
        <p style={{ marginBottom: 8 }}>
          <strong>Short answer:</strong> do not trust WeChat to remove every GPS or camera metadata field. Clean the original photo locally first, then send the clean copy.
        </p>
        <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <a className="pill" href="/tools/exif-checker">Check EXIF/GPS now</a>
          <a className="pill" href="/compress">Export clean copy</a>
          <a className="pill" href="/redact">Redact visible details</a>
        </div>
        <ol>
          <li>Open the <a href="/tools/exif-checker">EXIF/GPS checker</a> and select the original photo.</li>
          <li>If GPS, camera model, or date fields appear, export a clean copy from <a href="/compress">the compressor</a> or <a href="/redact">redactor</a>.</li>
          <li>Send the exported copy in WeChat, not the original file.</li>
        </ol>
        <p className="text-muted">WeChat can recompress images and change quality. That is not the same as a reliable privacy cleanup workflow.</p>
        <h2>Why this matters</h2>
        <p>
          Photos can carry hidden EXIF data: GPS coordinates, camera model, timestamps, and editing software. Some apps strip part of this data,
          but behavior can change by device, version, and sending mode. A local re-export gives you a predictable clean file.
        </p>
        <h2>Best workflow</h2>
        <ul>
          <li><strong>For location privacy:</strong> check EXIF/GPS first, then export a clean copy.</li>
          <li><strong>For screenshots or IDs:</strong> redact visible names, numbers, faces, or QR codes before sending.</li>
          <li><strong>For large photos:</strong> compress to 200KB or 500KB after metadata cleanup.</li>
        </ul>
      </div>
    </div>
    </>
  );
}


