import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '无元数据导出：去除 EXIF/GPS（本地处理）| PixCloak',
  description: '在浏览器内本地去除 EXIF/GPS：打开 /compress 或 /redact，导出为 JPEG/WebP/PNG 即可清除元数据。支持批量与 ZIP，隐私优先、无需上传。',
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
  );
}
