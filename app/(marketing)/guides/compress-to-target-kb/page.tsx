export default function GuideTargetKB() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>将图片压缩到指定体积（200KB/500KB）</h1>
      <p>本指南介绍如何使用目标体积模式，将图片压缩到常见上传限制（200KB/500KB）。</p>
      <ol>
        <li>前往 <a href="/compress?kb=200">/compress?kb=200</a> 或 <a href="/compress?kb=500">/compress?kb=500</a></li>
        <li>拖拽多张图片进入区域，点击 Compress。</li>
        <li>下载 ZIP 打包的结果文件。</li>
      </ol>
      <h2>常见问题</h2>
      <ul>
        <li>目标体积不是精确值，前端采用二分法逼近，通常误差在数KB内。</li>
        <li>若需更小体积，可降低质量或缩小分辨率（后续提供）。</li>
      </ul>
      <p>所有处理均在本地浏览器完成，不上传服务器。</p>
    </div>
  );
}


