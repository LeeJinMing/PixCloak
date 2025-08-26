export default function GuideRedactionChecklist() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>发布前隐私检查清单（图片）</h1>
      <ul>
        <li>人脸、车牌、手机号、邮箱、住址、二维码是否遮蔽？</li>
        <li>是否清除了 EXIF/GPS？</li>
        <li>边界是否留有足够安全边距（防止泄露边缘信息）？</li>
        <li>导出是否使用不可逆方式（实色块或强像素化）？</li>
      </ul>
      <p>
        立即前往 <a href="/redact">/redact</a> 使用本地脱敏工具，处理完成后再发布。
      </p>
    </div>
  );
}


