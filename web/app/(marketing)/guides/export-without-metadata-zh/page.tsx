import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: '无元数据导出：去除 EXIF/GPS（本地处理）| PixCloak',
  description: '本地去除iPhone/Android照片EXIF/GPS元数据，保护位置隐私防止泄露家庭住址。导出JPEG/WebP/PNG格式自动清除隐私信息。支持批量处理与ZIP打包下载，100%浏览器本地执行无上传。适合微信朋友圈、微博、小红书、闲鱼等社交平台分享。',
  alternates: {
    canonical: '/guides/export-without-metadata-zh',
    languages: {
      'x-default': '/guides/export-without-metadata',
      en: '/guides/export-without-metadata',
      zh: '/guides/export-without-metadata-zh',
      es: '/guides/es-exportar-sin-metadatos',
      pt: '/guides/pt-exportar-sem-metadados',
      id: '/guides/id-ekspor-tanpa-metadata',
    },
  },
};

export default function GuideExportNoMetadataZH() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: '无元数据导出：去除 EXIF/GPS（本地处理）| PixCloak', url: '/guides/export-without-metadata-zh' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>无元数据导出（去除 EXIF/GPS）</h1>
          <ol>
            <li>打开 <a href="/compress">/compress</a> 或 <a href="/redact">/redact</a></li>
            <li>导出为 JPEG/WebP/PNG（重新编码将去除 EXIF/GPS）</li>
            <li>可用 EXIF 查看器验证应显示“无 EXIF”</li>
          </ol>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/press/plate-demo.gif" alt="去除元数据演示" loading="lazy" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee' }} />
          <p className="text-muted">提示：有些查看器会缓存旧信息，重新打开导出的文件确认显示 &quot;no EXIF&quot;。</p>
        </div>
      </div>
    </>
  );
}
