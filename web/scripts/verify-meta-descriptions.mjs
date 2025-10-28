/**
 * 验证所有页面的 Meta descriptions 长度
 *
 * 根据 SEO 最佳实践，description 应该在 150-160 字符之间
 */

const pages = [
  {
    path: "web/app/(marketing)/guides/platform-image-limits-zh/page.tsx",
    name: "平台常见图片限制 (中文)",
    description:
      "头像上限200KB、帖子上限500KB、建议最长边1920px。使用快速预设（200KB/500KB/1920px）本地压缩与调整尺寸，自动移除EXIF/GPS元数据，无需上传。适合社交媒体、表单提交、博客发布等场景。",
  },
  {
    path: "web/app/guides/page.tsx",
    name: "Guides 索引",
    description:
      "Complete image guides: compress to 100KB-1MB targets, convert JPG/WebP, resize to 1920px, remove EXIF/GPS metadata. All tools work offline in your browser—no uploads needed. Perfect for web, email, social media, and forms.",
  },
  {
    path: "web/app/(marketing)/guides/pt-comprimir-para-500kb/page.tsx",
    name: "Comprimir 500KB (葡萄牙语)",
    description:
      "Comprima imagens para exatos 500KB—ideal para blogs, e-mail e formulários online. Redimensione para 1920px se necessário, escolha WebP ou JPEG. Processamento local no navegador sem uploads. Suporte para lote e download em ZIP. Perfeito para redes sociais e sites. Leva menos de 1 minuto.",
  },
  {
    path: "web/app/(marketing)/guides/id-kompres-menjadi-1mb/page.tsx",
    name: "Kompres 1MB (印尼语)",
    description:
      "Kompres gambar ke target 1MB untuk portofolio dan pengajuan berkualitas tinggi. Pilih format WebP atau JPEG, ubah ukuran ke 1920px jika diperlukan. Proses lokal di browser tanpa upload. Hapus EXIF/GPS otomatis. Unduh batch sebagai ZIP. Sempurna untuk situs web, media sosial, dan formulir. Cepat dan aman.",
  },
  {
    path: "web/app/(marketing)/redact-id/page.tsx",
    name: "Redact (印尼语)",
    description:
      "Sensor informasi sensitif di foto: blur wajah, plat nomor, teks, dan data pribadi. Hapus EXIF/GPS metadata otomatis saat ekspor. Proses 100% lokal di browser, tanpa upload file. Gambar kotak untuk menutupi area sensitif dengan blur atau pixelation. Sempurna untuk berbagi di media sosial dan forum. Cepat dan privat.",
  },
  {
    path: "web/app/(marketing)/guides/resize-longest-side/page.tsx",
    name: "Resize Longest Side",
    description:
      "Resize images to 1920px longest side before compression—reduces file size by 50-70% with no visible quality loss. Keeps aspect ratio automatically. Works offline in your browser, no uploads. Perfect for web, email, and social media. Takes 1 minute.",
  },
  {
    path: "web/app/(marketing)/guides/resize-to-1920/page.tsx",
    name: "Resize to 1920",
    description:
      "Downscale images to 1920px longest side before compression for faster web delivery. Reduces file size dramatically while keeping aspect ratio. Then compress to 200-800KB targets. All processing happens locally in your browser—no uploads needed. Perfect for websites and social media.",
  },
  {
    path: "web/app/(marketing)/guides/remove-exif-iphone/page.tsx",
    name: "Remove EXIF iPhone",
    description:
      "Remove EXIF and GPS location from iPhone photos before sharing online. Protects your privacy and home address. Works directly in your browser—no app download or permissions needed. Export automatically cleans metadata in seconds. Perfect for social media, forums, and marketplaces.",
  },
  {
    path: "web/app/(marketing)/guides/compress-to-300kb/page.tsx",
    name: "Compress to 300KB",
    description:
      "Compress images to exactly 300KB for online posts and form submissions. Choose WebP for smaller files or JPEG for compatibility. Resize to 1920px if needed. Balances quality and file size perfectly. Works offline in your browser—no uploads. Takes under 1 minute.",
  },
  {
    path: "web/app/(marketing)/guides/rename-rules/page.tsx",
    name: "Rename Rules",
    description:
      "Batch rename images with custom prefix/suffix while keeping original extensions. Compress multiple files and download as ZIP with consistent naming. Perfect for organizing uploads and project versioning. Works locally in your browser—no uploads needed. Saves time on bulk operations.",
  },
  {
    path: "web/app/(marketing)/guides/compress-to-target-kb/page.tsx",
    name: "Compress to Target KB",
    description:
      "Meet strict 200KB/500KB upload limits easily. Set exact target size, resize to 1920px if needed, choose WebP or JPEG format. Batch process multiple images and download as ZIP. Works offline in your browser—no uploads required. Perfect for avatars, posts, forms, and job applications.",
  },
  {
    path: "web/lib/seo-scenarios.ts (text-watermark-batch)",
    name: "Text Watermark Batch",
    description:
      "Add customizable text watermarks to images with adjustable opacity, position, and font. Batch process multiple images and export locally—no uploads. Perfect for protecting photos, branding portfolios, and social media posts. Quick and privacy-focused.",
  },
  {
    path: "web/app/(marketing)/guides/export-without-metadata-zh/page.tsx",
    name: "无元数据导出 (中文)",
    description:
      "本地去除照片EXIF/GPS元数据，保护隐私位置信息。打开压缩或脱敏工具，导出为JPEG/WebP/PNG即可自动清除所有元数据。支持批量处理与ZIP下载，100%浏览器本地执行，无需上传文件，适合社交分享、表单提交。",
  },
  {
    path: "web/app/(marketing)/guides/pt-exportar-sem-metadados/page.tsx",
    name: "Exportar sem metadados (葡萄牙语)",
    description:
      "Remova EXIF e GPS de fotos antes de compartilhar online, protegendo sua localização e privacidade. Abra /compress ou /redact, exporte em JPEG/WebP/PNG para limpar metadados automaticamente. Processamento 100% local no navegador, sem uploads. Suporta lote e ZIP. Perfeito para redes sociais e formulários.",
  },
  {
    path: "web/app/(marketing)/compress-pt/page.tsx",
    name: "Compress (葡萄牙语)",
    description:
      "Comprima imagens para 200KB ou 500KB diretamente no navegador—sem uploads necessários. Converta para WebP ou JPEG, redimensione para 1920px. Remove EXIF/GPS automaticamente. Processamento 100% local e privado. Perfeito para avatares, postagens em redes sociais, e-mail e formulários. Rápido e seguro.",
  },
];

console.log("📊 Meta Description 长度验证报告\n");
console.log("SEO 最佳实践：150-160 字符\n");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let allPassed = true;
let tooShort = 0;
let tooLong = 0;
let perfect = 0;

pages.forEach((page, index) => {
  const length = page.description.length;
  let status = "";
  let icon = "";

  if (length < 150) {
    status = `❌ 太短 (${length}字符，需要至少 150)`;
    icon = "❌";
    allPassed = false;
    tooShort++;
  } else if (length > 160) {
    status = `⚠️  偏长 (${length}字符，建议 150-160)`;
    icon = "⚠️";
    tooLong++;
  } else {
    status = `✅ 完美 (${length}字符)`;
    icon = "✅";
    perfect++;
  }

  console.log(`${icon} [${String(index + 1).padStart(2, "0")}] ${page.name}`);
  console.log(`   长度: ${length} 字符`);
  console.log(`   状态: ${status}`);
  if (length < 150 || length > 160) {
    console.log(`   路径: ${page.path}`);
  }
  console.log("");
});

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("📈 统计汇总：\n");
console.log(`   总页面数: ${pages.length}`);
console.log(
  `   ✅ 完美 (150-160字符): ${perfect} (${(
    (perfect / pages.length) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `   ⚠️  偏长 (>160字符): ${tooLong} (${(
    (tooLong / pages.length) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `   ❌ 太短 (<150字符): ${tooShort} (${(
    (tooShort / pages.length) *
    100
  ).toFixed(1)}%)`
);
console.log("");

if (allPassed && tooLong === 0) {
  console.log("🎉 所有页面的 Meta descriptions 都符合 SEO 最佳实践！");
  process.exit(0);
} else if (tooShort === 0) {
  console.log("✅ 所有页面长度都 ≥150 字符，但有些偏长（可接受）");
  console.log("💡 提示：偏长的 descriptions 在搜索结果中可能被截断");
  process.exit(0);
} else {
  console.log("⚠️  发现 " + tooShort + " 个页面的 description 太短");
  console.log("💡 请修复上述标记为 ❌ 的页面");
  process.exit(1);
}
