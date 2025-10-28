export type Scenario = {
  slug: string;
  title: string;
  description: string;
  presets: { label: string; href: string }[]; // e.g. /compress?kb=200
  faq: { q: string; a: string }[];
};

export const scenarios: Scenario[] = [
  {
    slug: "webp-converter-batch",
    title: "Batch Convert Images to WebP (Free ZIP) | PixCloak",
    description:
      "Convert multiple images to WebP in-browser and download as a ZIP.",
    presets: [
      { label: "WebP Converter", href: "/tools/webp-converter" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [
      {
        q: "Will quality drop?",
        a: "Use quality 0.8–0.95 for photos; preview results before exporting.",
      },
      { q: "PNG or WebP?", a: "UI/screens → PNG; photos → WebP/JPEG." },
    ],
  },
  {
    slug: "remove-bg-lite-color",
    title: "Quick background removal by color similarity | PixCloak",
    description:
      "Pick a color and remove similar background locally; export PNG.",
    presets: [
      { label: "Remove BG (Lite)", href: "/tools/remove-bg-lite" },
      { label: "EXIF/GPS Removal", href: "/tools/exif-checker" },
    ],
    faq: [
      {
        q: "Hair edges?",
        a: "Increase tolerance gently; for precise cutouts use a full editor when needed.",
      },
    ],
  },
  {
    slug: "sprite-sheet-generator",
    title: "Sprite Sheet Generator (PNG + JSON) | PixCloak",
    description: "Build a compact sprite.png with mapping JSON for web apps.",
    presets: [
      { label: "Sprite Sheet", href: "/tools/sprite-sheet" },
      { label: "srcset Generator", href: "/tools/srcset-generator" },
    ],
    faq: [
      { q: "How many columns?", a: "Try 4–8; keep gap small to save space." },
    ],
  },
  {
    slug: "lqip-placeholders",
    title: "LQIP Placeholder Generator (Base64, Free) | PixCloak",
    description:
      "Create tiny blurred placeholders to improve perceived performance.",
    presets: [
      { label: "LQIP Generator", href: "/tools/lqip" },
      { label: "srcset Generator", href: "/tools/srcset-generator" },
    ],
    faq: [
      {
        q: "Width?",
        a: "Use 16–32px; keep JPEG quality ~0.5 to minimize size.",
      },
    ],
  },
  {
    slug: "text-watermark-batch",
    title: "Batch Add Text Watermark (Free, No Upload) | PixCloak",
    description:
      "Add text watermarks with adjustable opacity, position, font. Batch process and export locally—no uploads. For protecting photos, branding portfolios, social media.",
    presets: [
      { label: "Text Watermark", href: "/tools/watermark" },
      { label: "Remove EXIF/GPS", href: "/tools/exif-checker" },
    ],
    faq: [
      {
        q: "Best placement?",
        a: "Bottom‑right with subtle opacity; keep contrast readable.",
      },
    ],
  },
  {
    slug: "crop-and-pad-ratios",
    title: "Crop/Pad to 1:1, 4:3, 16:9 (Free) | PixCloak",
    description: "Quickly crop 1:1/4:3/16:9 or pad to fit exact ratios.",
    presets: [
      { label: "Crop Templates", href: "/tools/crop-templates" },
      { label: "Aspect Padder", href: "/tools/aspect-pad" },
    ],
    faq: [
      {
        q: "When to pad?",
        a: "Pad when you must keep full content without cropping.",
      },
    ],
  },
  {
    slug: "resume-200kb",
    title: "Compress Resume Images to 200KB (HR ATS) | PixCloak",
    description:
      "Guidance to prepare resume images under 200KB for applicant tracking systems.",
    presets: [
      { label: "200KB", href: "/compress?kb=200" },
      { label: "500KB", href: "/compress?kb=500" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [
      {
        q: "Will EXIF/GPS be removed?",
        a: "Yes, export re-encodes and strips metadata by default.",
      },
      {
        q: "What format should I choose?",
        a: "JPEG or WebP for photos; PNG for screenshots.",
      },
    ],
  },
  {
    slug: "gov-portal-500kb",
    title: "Prepare images for government portals (≤500KB) | PixCloak",
    description:
      "Step-by-step to meet ≤500KB constraints commonly found on public portals.",
    presets: [
      { label: "500KB", href: "/compress?kb=500" },
      { label: "Target KB Guide", href: "/guides/compress-to-target-kb" },
    ],
    faq: [
      {
        q: "How to ensure clarity?",
        a: "Prefer resize longest side to 1920px before compressing.",
      },
    ],
  },
  {
    slug: "wechat-screenshot-exif",
    title: "Share WeChat screenshots safely (no EXIF/GPS) | PixCloak",
    description: "Remove metadata and redact sensitive info before sharing.",
    presets: [
      { label: "Redact", href: "/redact" },
      { label: "Remove EXIF", href: "/guides/remove-exif-wechat" },
    ],
    faq: [
      {
        q: "Is processing local?",
        a: "Yes, all runs in the browser. Nothing is uploaded.",
      },
    ],
  },
  {
    slug: "visa-photo-300kb",
    title: "Compress Visa Application Photos to 300KB | PixCloak",
    description: "Meet common visa portal size limits while keeping clarity.",
    presets: [
      { label: "300KB", href: "/compress?kb=300" },
      { label: "Resize 1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [
      {
        q: "Passport scan ok?",
        a: "Prefer solid redact for sensitive ID lines, then compress.",
      },
    ],
  },
  {
    slug: "linkedin-banner-1584x396",
    title: "Resize LinkedIn Banner to 1584×396 (Free) | PixCloak",
    description: "Exact size for LinkedIn cover with minimal artifacts.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "WebP vs JPEG", href: "/guides/jpeg-vs-webp-size-quality" },
    ],
    faq: [
      { q: "Which format?", a: "WebP often smaller; PNG for flat graphics." },
    ],
  },
  {
    slug: "university-application-1mb",
    title: "Prepare images for university applications (≤1MB) | PixCloak",
    description: "Compress transcripts/portfolio screenshots under 1MB.",
    presets: [
      { label: "1MB", href: "/compress?kb=1024" },
      { label: "Remove EXIF", href: "/guides/export-without-metadata" },
    ],
    faq: [
      { q: "Clarity tips?", a: "Resize longest side then choose target KB." },
    ],
  },
  {
    slug: "job-application-500kb",
    title: "Compress Job Application Images to 500KB | PixCloak",
    description: "HR systems often require ≤500KB per image.",
    presets: [
      { label: "500KB", href: "/compress?kb=500" },
      { label: "Target KB Guide", href: "/guides/compress-to-target-kb" },
    ],
    faq: [
      {
        q: "Batch export?",
        a: "Use ZIP batch in the compressor after processing.",
      },
    ],
  },
  {
    slug: "passport-scan-redact",
    title: "Redact Passport Scans (No Upload, Private) | PixCloak",
    description: "Mask ID numbers and MRZ, remove EXIF/GPS, then export.",
    presets: [
      { label: "Redact Tool", href: "/redact" },
      { label: "EXIF/GPS Removal", href: "/guides/exif-gps-removal" },
    ],
    faq: [
      {
        q: "Solid or pixelate?",
        a: "Use solid for sensitive numbers; pixelate for faces/plates.",
      },
    ],
  },
  {
    slug: "email-attachment-10mb",
    title: "Compress Images for 10MB Email Attachments | PixCloak",
    description: "Compress and ZIP multiple images to fit 10MB limits.",
    presets: [
      { label: "200KB", href: "/compress?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [
      {
        q: "How many images?",
        a: "Aim 200–500KB each; then ZIP to stay under provider limits.",
      },
    ],
  },
  {
    slug: "website-hero-1920px",
    title: "Optimize Website Hero Images (1920px, Fast) | PixCloak",
    description: "Resize to 1920px then encode at high quality WebP/JPEG.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "WebP vs JPEG", href: "/guides/jpeg-vs-webp-size-quality" },
    ],
    faq: [
      { q: "Transparency?", a: "Keep PNG for UI/screens; photos → WebP/JPEG." },
    ],
  },
  {
    slug: "github-readme-images",
    title: "Optimize Images for GitHub README (Free) | PixCloak",
    description: "Reduce size for repository pages to load fast.",
    presets: [
      { label: "500KB", href: "/compress?kb=500" },
      { label: "Remove Metadata", href: "/guides/export-without-metadata" },
    ],
    faq: [
      { q: "Animation?", a: "Prefer short WebP over heavy GIF when possible." },
    ],
  },
  {
    slug: "id-card-privacy-redaction",
    title: "ID Card Privacy Redaction (Local, Secure) | PixCloak",
    description: "Mask sensitive areas and export without metadata.",
    presets: [
      { label: "Redact Tool", href: "/redact" },
      {
        label: "License Plate/ID guide",
        href: "/guides/license-plate-redaction",
      },
    ],
    faq: [
      {
        q: "Multiple boxes?",
        a: "Add multiple boxes and prefer extreme pixelation or solid.",
      },
    ],
  },
  {
    slug: "wechat-moments-200kb",
    title: "WeChat Moments: Compress Images to 200KB | PixCloak",
    description: "Hit 200KB quickly for smooth sharing in Moments.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize 1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Upload larger?", a: "Use 1920px then 200KB to keep clarity." }],
  },
  {
    slug: "gov-portal-200kb-cn",
    title: "政务/企事业门户：200KB图片规范（本地压缩，无上传）| PixCloak",
    description: "常见上限 200KB，建议先缩放再设目标体积。",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "如何保证清晰度？", a: "优先缩放最长边，再压到目标 KB。" }],
  },
  {
    slug: "portfolio-800kb",
    title: "Portfolio: 800KB High-Quality Exports | PixCloak",
    description: "Keep detail while staying performant for web portfolios.",
    presets: [
      { label: "800KB", href: "/?kb=800" },
      { label: "1MB", href: "/?kb=1024" },
    ],
    faq: [
      {
        q: "Which format?",
        a: "WebP for smaller size; JPEG for compatibility.",
      },
    ],
  },
  {
    slug: "twitter-post-200kb",
    title: "Twitter/X Posts: Compress Images to 200KB | PixCloak",
    description: "Keep feeds fast with 200KB target and 1920px longest side.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [
      {
        q: "JPEG or WebP?",
        a: "Try WebP first; fall back to JPEG if re-encoded.",
      },
    ],
  },
  {
    slug: "linkedin-avatar-400kb",
    title: "LinkedIn Avatar: Compress Under 400KB (Free) | PixCloak",
    description: "Square resize and compress for profile pictures.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [
      { q: "Square size?", a: "Use 512–1024px square then set target KB." },
    ],
  },
  {
    slug: "forms-attachments-500kb",
    title: "Online Forms: 500KB Attachments (Fast) | PixCloak",
    description:
      "Meet common upload caps for applications and support tickets.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Remove EXIF/GPS", href: "/guides/export-without-metadata" },
    ],
    faq: [{ q: "Clarity tips?", a: "Resize to 1920px first then compress." }],
  },
  {
    slug: "ecommerce-product-800kb",
    title: "E-commerce Product Shots ≤ 800KB (Fast LCP) | PixCloak",
    description: "Retain detail while keeping fast LCP.",
    presets: [
      { label: "800KB", href: "/?kb=800" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Transparency?", a: "Use PNG for UI; WebP for photos." }],
  },
  {
    slug: "presentation-slides-1920",
    title: "Presentation Slides: Export 1920px Images | PixCloak",
    description: "Downscale and compress to avoid oversized decks.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "PNG or JPEG?", a: "Slides/UI → PNG; photos → JPEG/WebP." }],
  },
  {
    slug: "blog-hero-1200px",
    title: "Blog Hero: 1200×630 Social Image (Free) | PixCloak",
    description: "Prepare OG images with compact size.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Format?", a: "Prefer JPEG/WebP at 500KB for fast loads." }],
  },
  {
    slug: "email-inline-150kb",
    title: "Email Inline Images ≤ 150KB (Fast, Free) | PixCloak",
    description: "Keep emails lightweight with small inline images.",
    presets: [
      { label: "150KB", href: "/?kb=150" },
      { label: "200KB", href: "/?kb=200" },
    ],
    faq: [
      {
        q: "Many images?",
        a: "Target 100–200KB per image to stay within limits.",
      },
    ],
  },
  {
    slug: "instagram-story-1080x1920",
    title: "Instagram Stories: 1080×1920 (300-500KB) | PixCloak",
    description: "Resize to 1080×1920 then compress to 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "PNG or JPEG?", a: "Photos → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "instagram-story-1080x1920-es",
    title: "ES: Historias Instagram 1080×1920 (300-500KB) | PixCloak",
    description: "Redimensiona a 1080×1920 y comprime a 300–500KB.",
    presets: [
      { label: "300KB", href: "/?kb=300" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "Fotos → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "instagram-story-1080x1920-pt",
    title: "PT: Stories Instagram 1080×1920 (300-500KB) | PixCloak",
    description: "Redimensione para 1080×1920 e comprima para 300–500KB.",
    presets: [
      { label: "300KB", href: "/?kb=300" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "Fotos → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "instagram-story-1080x1920-id",
    title: "ID: Story Instagram 1080×1920 (300-500KB) | PixCloak",
    description: "Ubah ukuran ke 1080×1920 lalu kompres 300–500KB.",
    presets: [
      { label: "300KB", href: "/?kb=300" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Format", a: "Foto → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "facebook-cover-820x312",
    title: "Facebook Cover: 820×312 (300-500KB, Free) | PixCloak",
    description: "Export exact size and keep ~300–500KB.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [
      { q: "Safe area?", a: "Keep text away from edges to avoid cropping." },
    ],
  },
  {
    slug: "facebook-cover-820x312-es",
    title: "ES: Portada Facebook 820×312 (300-500KB) | PixCloak",
    description: "Exporta tamaño exacto y ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Área segura", a: "Evita texto en bordes." }],
  },
  {
    slug: "facebook-cover-820x312-pt",
    title: "PT: Capa Facebook 820×312 (300-500KB) | PixCloak",
    description: "Exporte no tamanho exato e ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Área segura", a: "Evite texto nas bordas." }],
  },
  {
    slug: "facebook-cover-820x312-id",
    title: "ID: Sampul Facebook 820×312 (300-500KB) | PixCloak",
    description: "Ekspor ukuran tepat ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Area aman", a: "Hindari teks di tepi." }],
  },
  {
    slug: "youtube-thumbnail-200kb",
    title: "YouTube Thumbnails ≤ 200KB (1280×720, Free) | PixCloak",
    description: "Prepare 1280×720 thumbnails under 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [
      { q: "Text clarity?", a: "Use high contrast and sharpen before export." },
    ],
  },
  {
    slug: "youtube-thumbnail-200kb-es",
    title: "ES: Miniatura YouTube ≤ 200KB (1280×720) | PixCloak",
    description: "Prepara 1280×720 bajo 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Texto", a: "Alto contraste y nitidez." }],
  },
  {
    slug: "youtube-thumbnail-200kb-pt",
    title: "PT: Miniatura YouTube ≤ 200KB (1280×720) | PixCloak",
    description: "Prepare 1280×720 abaixo de 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Texto", a: "Alto contraste e nitidez." }],
  },
  {
    slug: "youtube-thumbnail-200kb-id",
    title: "ID: Thumbnail YouTube ≤ 200KB (1280×720) | PixCloak",
    description: "Siapkan 1280×720 di bawah 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Teks", a: "Kontras tinggi dan penajaman." }],
  },
  {
    slug: "tiktok-avatar-200kb",
    title: "TikTok Avatar ≤ 200KB (512-1024px, Free) | PixCloak",
    description: "Square resize 512–1024px, then compress.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Best size?", a: "Start with 512–1024px square for clarity." }],
  },
  {
    slug: "tiktok-avatar-200kb-es",
    title: "ES: Avatar TikTok ≤ 200KB (512-1024px) | PixCloak",
    description: "Cuadrado 512–1024px, luego comprime.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Tamaño", a: "Usa 512–1024px cuadrado." }],
  },
  {
    slug: "tiktok-avatar-200kb-pt",
    title: "PT: Avatar TikTok ≤ 200KB (512-1024px) | PixCloak",
    description: "Quadrado 512–1024px, depois comprima.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Tamanho", a: "512–1024px quadrado." }],
  },
  {
    slug: "tiktok-avatar-200kb-id",
    title: "ID: Avatar TikTok ≤ 200KB (512-1024px) | PixCloak",
    description: "Persegi 512–1024px, lalu kompres.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Ukuran", a: "Persegi 512–1024px." }],
  },
  {
    slug: "wordpress-featured-1200x628",
    title: "WordPress Featured Image 1200×628 (300-500KB) | PixCloak",
    description: "Social-friendly featured image around 300–500KB.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Format?", a: "Prefer JPEG/WebP unless transparency needed." }],
  },
  {
    slug: "wordpress-featured-1200x628-es",
    title: "ES: Imagen WordPress 1200×628 (300-500KB) | PixCloak",
    description: "Social‑friendly alrededor de 300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "JPEG/WebP salvo transparencia." }],
  },
  {
    slug: "wordpress-featured-1200x628-pt",
    title: "PT: Imagem WordPress 1200×628 (300-500KB) | PixCloak",
    description: "Amigável para redes sociais ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "JPEG/WebP exceto transparência." }],
  },
  {
    slug: "wordpress-featured-1200x628-id",
    title: "ID: Gambar WordPress 1200×628 (300-500KB) | PixCloak",
    description: "Ramah sosial ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Format", a: "JPEG/WebP kecuali transparansi." }],
  },
  {
    slug: "notion-cover-1500px",
    title: "Notion Cover Images ~1500px (300-500KB) | PixCloak",
    description: "Resize longest side to ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [
      { q: "Dark mode?", a: "Avoid pure white borders; use subtle edges." },
    ],
  },
  {
    slug: "notion-cover-1500px-es",
    title: "ES: Portada Notion ~1500px (300-500KB) | PixCloak",
    description: "Redimensiona a ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "Modo oscuro", a: "Evita bordes blancos puros." }],
  },
  {
    slug: "notion-cover-1500px-pt",
    title: "PT: Capa Notion ~1500px (300-500KB) | PixCloak",
    description: "Redimensione para ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "Modo escuro", a: "Evite bordas brancas puras." }],
  },
  {
    slug: "notion-cover-1500px-id",
    title: "ID: Sampul Notion ~1500px (300-500KB) | PixCloak",
    description: "Ubah ukuran ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "Mode gelap", a: "Hindari tepi putih murni." }],
  },
  {
    slug: "slack-upload-200kb",
    title: "Slack Uploads ≤ 200KB (Fast, No Upload) | PixCloak",
    description: "Compress screenshots for fast previews.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Screenshots?", a: "PNG for UI; WebP/JPEG for photos." }],
  },
  {
    slug: "slack-upload-200kb-es",
    title: "ES: Subidas Slack ≤ 200KB (Rápido) | PixCloak",
    description: "Comprime capturas para vistas previas rápidas.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Capturas", a: "PNG para UI; WebP/JPEG para fotos." }],
  },
  {
    slug: "slack-upload-200kb-pt",
    title: "PT: Uploads Slack ≤ 200KB (Rápido) | PixCloak",
    description: "Comprimir capturas para previews rápidas.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Capturas", a: "PNG para UI; WebP/JPEG para fotos." }],
  },
  {
    slug: "slack-upload-200kb-id",
    title: "ID: Upload Slack ≤ 200KB (Cepat) | PixCloak",
    description: "Kompres tangkapan layar untuk pratinjau cepat.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Screenshot", a: "PNG untuk UI; WebP/JPEG untuk foto." }],
  },
  {
    slug: "jira-attachments-10mb",
    title: "Jira Attachments ≤ 10MB (Batch ZIP) | PixCloak",
    description: "Batch compress and ZIP to meet project upload caps.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Many files?", a: "Compress each to 200–800KB then ZIP." }],
  },
  {
    slug: "jira-attachments-10mb-es",
    title: "ES: Adjuntos Jira ≤ 10MB (Lote ZIP) | PixCloak",
    description: "Comprime y ZIP para límites de proyecto.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Muchos archivos", a: "Comprime 200–800KB c/u y ZIP." }],
  },
  {
    slug: "jira-attachments-10mb-pt",
    title: "PT: Anexos Jira ≤ 10MB (Lote ZIP) | PixCloak",
    description: "Comprimir e ZIP para limites do projeto.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Muitos arquivos", a: "200–800KB cada e ZIP." }],
  },
  {
    slug: "jira-attachments-10mb-id",
    title: "ID: Lampiran Jira ≤ 10MB (Batch ZIP) | PixCloak",
    description: "Kompres dan ZIP untuk batas proyek.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Banyak file", a: "Kompres 200–800KB lalu ZIP." }],
  },
  {
    slug: "google-forms-2mb",
    title: "Google Forms Uploads ≤ 2MB (1920px) | PixCloak",
    description: "Resize to 1920px then target 2MB for clarity.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [
      {
        q: "Clarity?",
        a: "Keep text readable by resizing before compressing.",
      },
    ],
  },
  {
    slug: "google-forms-2mb-es",
    title: "ES: Google Forms ≤ 2MB (1920px) | PixCloak",
    description: "1920px y 2MB para claridad.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [{ q: "Legibilidad", a: "Redimensiona antes de comprimir." }],
  },
  {
    slug: "google-forms-2mb-pt",
    title: "PT: Google Forms ≤ 2MB (1920px) | PixCloak",
    description: "1920px e 2MB para clareza.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [{ q: "Legibilidade", a: "Redimensione antes de comprimir." }],
  },
  {
    slug: "google-forms-2mb-id",
    title: "ID: Google Forms ≤ 2MB (1920px) | PixCloak",
    description: "1920px dan 2MB untuk kejernihan.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [{ q: "Keterbacaan", a: "Ubah ukuran sebelum kompres." }],
  },
];
