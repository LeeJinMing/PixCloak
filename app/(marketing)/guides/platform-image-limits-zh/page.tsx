import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '平台常见图片限制（体积与尺寸）| PixCloak',
  description: '头像常见 200KB、帖子常见 500KB、建议最长边 1920px。提供快速预设与本地导出，移除 EXIF/GPS，适合表单/社交/博客等场景。',
  alternates: {
    canonical: '/guides/platform-image-limits-zh',
    languages: {
      'x-default': '/guides/platform-image-limits',
      en: '/guides/platform-image-limits',
      zh: '/guides/platform-image-limits-zh',
      es: '/guides/es-limites-de-imagenes-plataformas',
      pt: '/guides/pt-limites-de-imagens-plataformas',
      id: '/guides/id-batas-gambar-platform',
    },
  },
};

export default function GuidePlatformLimitsZH() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>常见平台的图片体积与尺寸限制</h1>
        <p className="text-muted">根据公开资料与经验整理，供快速准备图片时参考（持续更新）。</p>
        <ul>
          <li>头像：常见上限 200KB；建议 512–1024px 正方形</li>
          <li>动态/帖子：常见上限 500KB；建议最长边 ≤ 1920px</li>
          <li>横幅/封面：宽图；含渐变/文字时可优先 JPEG 并适度提高体积</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">头像 200KB 预设</a>
          <a className="pill" href="/compress?kb=500">帖子 500KB 预设</a>
          <a className="pill-ghost" href="/guides/resize-longest-side">先缩放到 1920px</a>
        </div>
        <p className="text-muted" style={{ marginTop: 8 }}>提示：本站默认本地处理并移除 EXIF/GPS 元数据；不上传。</p>
      </div>
    </div>
  );
}


