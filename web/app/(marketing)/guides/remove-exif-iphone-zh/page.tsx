import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'iPhone 照片去除 EXIF/GPS（本地处理）| PixCloak',
  description: '在浏览器内本地去除 iPhone 照片的 EXIF/GPS：打开 /compress 或 /redact，导出为 JPEG/WebP/PNG 即可清除元数据。支持验证与批量 ZIP。 Works locally in your browser, no uploads.',
  alternates: { canonical: '/guides/remove-exif-iphone-zh', languages: { zh: '/guides/remove-exif-iphone-zh', en: '/guides/remove-exif-iphone' } },
};

export default function GuideRemoveExifIphoneZH() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'iPhone 照片去除 EXIF/GPS（本地处理）| PixCloak', url: '/guides/remove-exif-iphone-zh' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>iPhone 照片去除 EXIF/GPS 元数据</h1>
        <ol>
          <li>打开 <a href="/compress">/compress</a> 或 <a href="/redact">/redact</a></li>
          <li>导出为 JPEG/WebP（重新编码会去除 EXIF/GPS）</li>
          <li>可用 EXIF 查看器验证应为“无”</li>
        </ol>
        <p className="text-muted">全程本地处理，不上传。</p>
      </div>
    </div>
    </>
  );
}


