export default function GuideExifGpsRemoval() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>如何去除图片 EXIF/GPS 信息</h1>
      <p>使用重编码导出可移除绝大多数EXIF/GPS元数据。我们的工具在导出时默认清除。</p>
      <ol>
        <li>打开 <a href="/redact">/redact</a> 或 <a href="/compress">/compress</a></li>
        <li>导出 JPG 将会自动清除 EXIF/GPS</li>
      </ol>
      <p>若需保留少量无敏感字段的元信息，后续将提供开关选项。</p>
    </div>
  );
}


