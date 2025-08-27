export default function GuideTargetKBZH() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>按目标体积压缩（200KB/500KB）</h1>
        <ol>
          <li>打开 <a href="/compress?kb=200">/compress?kb=200</a> 或 <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>拖拽图片后点击 Compress，批量可用 ZIP 下载</li>
          <li>如需更小体积，先把最长边缩放到 1920px</li>
        </ol>
        <p className="text-muted">二分法搜索质量，通常能在相近 KB 内达成目标；本地处理，不上传。</p>
      </div>
    </div>
  );
}


