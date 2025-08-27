export default function GuideRemoveExifIphoneZH() {
  return (
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
  );
}


