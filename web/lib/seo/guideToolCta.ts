/** Per-guide primary tool CTA (GSC Jul 2026 — convert impressions to clicks). */
export type GuideToolCtaConfig = {
  toolHref: string;
  toolLabel: string;
  intro: string;
};

export const GUIDE_TOOL_CTA: Record<string, GuideToolCtaConfig> = {
  "remove-exif-wechat": {
    toolHref: "/tools/exif-checker",
    toolLabel: "Check EXIF/GPS free",
    intro: "Verify what metadata is still in your photo before you send it on WeChat.",
  },
  "compress-image-to-100kb": {
    toolHref: "/compress?kb=100",
    toolLabel: "Compress to 100KB now",
    intro: "Hit exactly 100KB for passport and form uploads—free, no upload.",
  },
  "compress-to-200kb": {
    toolHref: "/compress?kb=200",
    toolLabel: "Compress to 200KB now",
    intro: "One-click preset for job portals and upload caps.",
  },
  "compress-to-300kb": {
    toolHref: "/compress?kb=300",
    toolLabel: "Compress to 300KB now",
    intro: "Common visa and ID portal limit—set target KB locally.",
  },
  "tinypng-alternative-free-no-upload": {
    toolHref: "/compress",
    toolLabel: "Try the free compressor",
    intro: "TinyPNG-style compression with exact KB targets—unlimited, no upload.",
  },
  "blur-face-in-photo": {
    toolHref: "/redact",
    toolLabel: "Blur faces now",
    intro: "Pixelate or block faces in your browser—no upload, EXIF stripped.",
  },
  "license-plate-redaction": {
    toolHref: "/redact",
    toolLabel: "Redact license plate now",
    intro: "Pixelate or solid-block plates—stronger than soft blur.",
  },
  "blur-number-plate-online": {
    toolHref: "/redact",
    toolLabel: "Hide number plate now",
    intro: "UK/EU number plate redaction—runs locally, no upload.",
  },
  "how-to-compress-on-iphone": {
    toolHref: "/compress",
    toolLabel: "Compress in Safari now",
    intro: "Open in iPhone Safari—set KB target, no app download.",
  },
  "how-to-compress-image-without-losing-quality": {
    toolHref: "/compress",
    toolLabel: "Compress with preview",
    intro: "Dial quality before export—see file size before you download.",
  },
  "how-to-reduce-image-file-size": {
    toolHref: "/compress",
    toolLabel: "Reduce file size now",
    intro: "Shrink JPG/PNG/WebP to a target KB without uploading.",
  },
  "black-out-text-in-image": {
    toolHref: "/redact",
    toolLabel: "Black out text now",
    intro: "Cover names, account numbers, and labels before sharing.",
  },
};

export function guideSlugFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/guides\/([^/]+)/);
  return m?.[1] ?? null;
}

export function getGuideToolCta(pathname: string): GuideToolCtaConfig | null {
  const slug = guideSlugFromPath(pathname);
  if (!slug) return null;
  return GUIDE_TOOL_CTA[slug] ?? null;
}
