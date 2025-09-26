export type Scenario = {
  slug: string;
  title: string;
  description: string;
  presets: { label: string; href: string }[]; // e.g. /compress?kb=200
  faq: { q: string; a: string }[];
};

export const scenarios: Scenario[] = [
  {
    slug: "resume-200kb",
    title: "Compress resume images to 200KB (HR ATS)",
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
    title: "Prepare images for government portals (≤500KB)",
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
    title: "Share WeChat screenshots safely (no EXIF/GPS)",
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
    title: "Compress visa application photos to 300KB",
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
    title: "Resize LinkedIn banner to 1584×396",
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
    title: "Prepare images for university applications (≤1MB)",
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
    title: "Compress job application images to 500KB",
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
    title: "Redact passport scans before sharing",
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
    title: "Prepare images for 10MB email attachments",
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
    title: "Optimize website hero images (1920px)",
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
    title: "Optimize images for GitHub README",
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
    title: "ID card privacy redaction best practices",
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
    title: "WeChat Moments: compress images to 200KB",
    description: "Hit 200KB quickly for smooth sharing in Moments.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize 1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Upload larger?", a: "Use 1920px then 200KB to keep clarity." }],
  },
  {
    slug: "gov-portal-200kb-cn",
    title: "政务/企事业门户：200KB 图片规范",
    description: "常见上限 200KB，建议先缩放再设目标体积。",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "如何保证清晰度？", a: "优先缩放最长边，再压到目标 KB。" }],
  },
  {
    slug: "portfolio-800kb",
    title: "Portfolio: 800KB high‑quality exports",
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
    title: "Twitter/X posts: compress images to 200KB",
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
    title: "LinkedIn avatar: under 400KB",
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
    title: "Online forms: 500KB attachments",
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
    title: "E‑commerce product shots ≤ 800KB",
    description: "Retain detail while keeping fast LCP.",
    presets: [
      { label: "800KB", href: "/?kb=800" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Transparency?", a: "Use PNG for UI; WebP for photos." }],
  },
  {
    slug: "presentation-slides-1920",
    title: "Presentation slides: export 1920px images",
    description: "Downscale and compress to avoid oversized decks.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "PNG or JPEG?", a: "Slides/UI → PNG; photos → JPEG/WebP." }],
  },
  {
    slug: "blog-hero-1200px",
    title: "Blog hero: 1200×630 social image",
    description: "Prepare OG images with compact size.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Format?", a: "Prefer JPEG/WebP at 500KB for fast loads." }],
  },
  {
    slug: "email-inline-150kb",
    title: "Email inline images ≤ 150KB",
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
    title: "Instagram Stories: 1080×1920 recommended",
    description: "Resize to 1080×1920 then compress to 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "PNG or JPEG?", a: "Photos → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "instagram-story-1080x1920-es",
    title: "ES: Historias 1080×1920 (300–500KB)",
    description: "Redimensiona a 1080×1920 y comprime a 300–500KB.",
    presets: [
      { label: "300KB", href: "/?kb=300" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "Fotos → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "instagram-story-1080x1920-pt",
    title: "PT: Stories 1080×1920 (300–500KB)",
    description: "Redimensione para 1080×1920 e comprima para 300–500KB.",
    presets: [
      { label: "300KB", href: "/?kb=300" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "Fotos → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "instagram-story-1080x1920-id",
    title: "ID: Story 1080×1920 (300–500KB)",
    description: "Ubah ukuran ke 1080×1920 lalu kompres 300–500KB.",
    presets: [
      { label: "300KB", href: "/?kb=300" },
      { label: "1920px", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Format", a: "Foto → JPEG/WebP; UI → PNG." }],
  },
  {
    slug: "facebook-cover-820x312",
    title: "Facebook cover: 820×312",
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
    title: "ES: Portada 820×312 (300–500KB)",
    description: "Exporta tamaño exacto y ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Área segura", a: "Evita texto en bordes." }],
  },
  {
    slug: "facebook-cover-820x312-pt",
    title: "PT: Capa 820×312 (300–500KB)",
    description: "Exporte no tamanho exato e ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Área segura", a: "Evite texto nas bordas." }],
  },
  {
    slug: "facebook-cover-820x312-id",
    title: "ID: Sampul 820×312 (300–500KB)",
    description: "Ekspor ukuran tepat ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Area aman", a: "Hindari teks di tepi." }],
  },
  {
    slug: "youtube-thumbnail-200kb",
    title: "YouTube thumbnails ≤ 200KB",
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
    title: "ES: Miniatura YouTube ≤ 200KB",
    description: "Prepara 1280×720 bajo 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Texto", a: "Alto contraste y nitidez." }],
  },
  {
    slug: "youtube-thumbnail-200kb-pt",
    title: "PT: Miniatura YouTube ≤ 200KB",
    description: "Prepare 1280×720 abaixo de 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Texto", a: "Alto contraste e nitidez." }],
  },
  {
    slug: "youtube-thumbnail-200kb-id",
    title: "ID: Thumbnail YouTube ≤ 200KB",
    description: "Siapkan 1280×720 di bawah 200KB.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Teks", a: "Kontras tinggi dan penajaman." }],
  },
  {
    slug: "tiktok-avatar-200kb",
    title: "TikTok avatar ≤ 200KB",
    description: "Square resize 512–1024px, then compress.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Best size?", a: "Start with 512–1024px square for clarity." }],
  },
  {
    slug: "tiktok-avatar-200kb-es",
    title: "ES: Avatar TikTok ≤ 200KB",
    description: "Cuadrado 512–1024px, luego comprime.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Tamaño", a: "Usa 512–1024px cuadrado." }],
  },
  {
    slug: "tiktok-avatar-200kb-pt",
    title: "PT: Avatar TikTok ≤ 200KB",
    description: "Quadrado 512–1024px, depois comprima.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Tamanho", a: "512–1024px quadrado." }],
  },
  {
    slug: "tiktok-avatar-200kb-id",
    title: "ID: Avatar TikTok ≤ 200KB",
    description: "Persegi 512–1024px, lalu kompres.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Ukuran", a: "Persegi 512–1024px." }],
  },
  {
    slug: "wordpress-featured-1200x628",
    title: "WordPress featured image 1200×628",
    description: "Social-friendly featured image around 300–500KB.",
    presets: [
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
      { label: "500KB", href: "/?kb=500" },
    ],
    faq: [{ q: "Format?", a: "Prefer JPEG/WebP unless transparency needed." }],
  },
  {
    slug: "wordpress-featured-1200x628-es",
    title: "ES: Imagen destacada 1200×628",
    description: "Social‑friendly alrededor de 300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "JPEG/WebP salvo transparencia." }],
  },
  {
    slug: "wordpress-featured-1200x628-pt",
    title: "PT: Imagem destacada 1200×628",
    description: "Amigável para redes sociais ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Formato", a: "JPEG/WebP exceto transparência." }],
  },
  {
    slug: "wordpress-featured-1200x628-id",
    title: "ID: Gambar unggulan 1200×628",
    description: "Ramah sosial ~300–500KB.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "Resize Guide", href: "/guides/resize-to-1920" },
    ],
    faq: [{ q: "Format", a: "JPEG/WebP kecuali transparansi." }],
  },
  {
    slug: "notion-cover-1500px",
    title: "Notion cover images ~1500px",
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
    title: "ES: Portada Notion ~1500px",
    description: "Redimensiona a ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "Modo oscuro", a: "Evita bordes blancos puros." }],
  },
  {
    slug: "notion-cover-1500px-pt",
    title: "PT: Capa Notion ~1500px",
    description: "Redimensione para ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "Modo escuro", a: "Evite bordas brancas puras." }],
  },
  {
    slug: "notion-cover-1500px-id",
    title: "ID: Sampul Notion ~1500px",
    description: "Ubah ukuran ~1500–1920px, 300–500KB.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "300KB", href: "/?kb=300" },
    ],
    faq: [{ q: "Mode gelap", a: "Hindari tepi putih murni." }],
  },
  {
    slug: "slack-upload-200kb",
    title: "Slack uploads ≤ 200KB",
    description: "Compress screenshots for fast previews.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Screenshots?", a: "PNG for UI; WebP/JPEG for photos." }],
  },
  {
    slug: "slack-upload-200kb-es",
    title: "ES: Subidas Slack ≤ 200KB",
    description: "Comprime capturas para vistas previas rápidas.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Capturas", a: "PNG para UI; WebP/JPEG para fotos." }],
  },
  {
    slug: "slack-upload-200kb-pt",
    title: "PT: Uploads Slack ≤ 200KB",
    description: "Comprimir capturas para previews rápidas.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Capturas", a: "PNG para UI; WebP/JPEG para fotos." }],
  },
  {
    slug: "slack-upload-200kb-id",
    title: "ID: Upload Slack ≤ 200KB",
    description: "Kompres tangkapan layar untuk pratinjau cepat.",
    presets: [
      { label: "200KB", href: "/?kb=200" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Screenshot", a: "PNG untuk UI; WebP/JPEG untuk foto." }],
  },
  {
    slug: "jira-attachments-10mb",
    title: "Jira attachments within 10MB",
    description: "Batch compress and ZIP to meet project upload caps.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Many files?", a: "Compress each to 200–800KB then ZIP." }],
  },
  {
    slug: "jira-attachments-10mb-es",
    title: "ES: Adjuntos Jira ≤ 10MB",
    description: "Comprime y ZIP para límites de proyecto.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Muchos archivos", a: "Comprime 200–800KB c/u y ZIP." }],
  },
  {
    slug: "jira-attachments-10mb-pt",
    title: "PT: Anexos Jira ≤ 10MB",
    description: "Comprimir e ZIP para limites do projeto.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Muitos arquivos", a: "200–800KB cada e ZIP." }],
  },
  {
    slug: "jira-attachments-10mb-id",
    title: "ID: Lampiran Jira ≤ 10MB",
    description: "Kompres dan ZIP untuk batas proyek.",
    presets: [
      { label: "500KB", href: "/?kb=500" },
      { label: "ZIP Batch", href: "/guides/zip-batch-download" },
    ],
    faq: [{ q: "Banyak file", a: "Kompres 200–800KB lalu ZIP." }],
  },
  {
    slug: "google-forms-2mb",
    title: "Google Forms uploads ≤ 2MB",
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
    title: "ES: Google Forms ≤ 2MB",
    description: "1920px y 2MB para claridad.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [{ q: "Legibilidad", a: "Redimensiona antes de comprimir." }],
  },
  {
    slug: "google-forms-2mb-pt",
    title: "PT: Google Forms ≤ 2MB",
    description: "1920px e 2MB para clareza.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [{ q: "Legibilidade", a: "Redimensione antes de comprimir." }],
  },
  {
    slug: "google-forms-2mb-id",
    title: "ID: Google Forms ≤ 2MB",
    description: "1920px dan 2MB untuk kejernihan.",
    presets: [
      { label: "1920px", href: "/guides/resize-to-1920" },
      { label: "2MB", href: "/?kb=2048" },
    ],
    faq: [{ q: "Keterbacaan", a: "Ubah ukuran sebelum kompres." }],
  },
];
