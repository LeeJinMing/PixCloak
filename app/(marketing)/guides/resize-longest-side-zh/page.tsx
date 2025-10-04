import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '按最长边缩放到 1920px（网页最佳实践） | PixCloak',
  description: '将图片最长边缩放到 1920px，再压缩到 200–800KB，兼顾清晰与加载速度。保持宽高比，适合网站/博客/社交。全程本地处理，无需上传。',
  alternates: {
    canonical: '/guides/resize-longest-side-zh',
    languages: {
      'x-default': '/guides/resize-longest-side',
      en: '/guides/resize-longest-side',
      zh: '/guides/resize-longest-side-zh',
      es: '/guides/es-redimensionar-lado-mas-largo',
      pt: '/guides/pt-redimensionar-lado-mais-longo',
      id: '/guides/id-ubah-ukuran-sisi-terpanjang',
    },
  },
};

export default function GuideResizeLongestZH() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>按最长边缩放（建议 1920px）</h1>
        <ol>
          <li>打开 <a href="/compress">/compress</a></li>
          <li>选择 Resize = Longest side，输入 1920</li>
          <li>再设置目标体积（如 200/500KB）并压缩</li>
        </ol>
        <p className="text-muted">先缩放再压缩，能显著降低体积并提升压缩质量表现。</p>
      </div>
    </div>
  );
}


