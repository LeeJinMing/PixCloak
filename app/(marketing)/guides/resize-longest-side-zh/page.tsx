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


