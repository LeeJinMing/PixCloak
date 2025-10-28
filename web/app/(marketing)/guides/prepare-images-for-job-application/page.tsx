import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Prepare Images for Job Applications (200KB/500KB) | PixCloak',
  description: 'Pass HR portal limits quickly: 200KB profile, 500KB attachments. Resize ≤1920px, remove EXIF/GPS on export, and download locally without uploads.',
  alternates: { canonical: '/guides/prepare-images-for-job-application' },
};

export default function GuideJobApplication() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Prepare Images for Job Applications (200KB/500KB)', url: '/guides/prepare-images-for-job-application' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare images for job application portals</h1>
        <ul>
          <li>Common caps: 200KB avatars, 500KB attachments</li>
          <li>Resize to ≤ 1920px; then target size</li>
          <li>Remove EXIF/GPS on export (default)</li>
        </ul>
        <p>Start fast: <a href="/compress?kb=200">/compress?kb=200</a> and <a href="/compress?kb=500">/compress?kb=500</a>.</p>
      </div>
    </div>
    </>
  );
}


