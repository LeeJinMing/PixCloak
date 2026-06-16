/**
 * 下一步推荐文案与链接。
 *
 * 英文 (locale=en)：/compress、/redact、/tools/*、/guides/*（无 -zh 后缀）
 * 中文 (locale=zh)：/zh/compress、/zh/redact、/zh/tools/*、/zh/guides/*、/guides/*-zh
 */

export type NextStepItem = { href: string; title: string; desc: string };

export type NextStepsContent = {
  title: string;
  intro: string;
  steps: NextStepItem[];
};

export type ToolNextStepsId = "compress" | "redact" | "pdf-to-image";

const nextStepsEn: Record<ToolNextStepsId, NextStepsContent> = {
  compress: {
    title: "What's next?",
    intro: "Finished compressing? These steps help you share safely and hit platform size limits.",
    steps: [
      {
        href: "/tools/exif-checker",
        title: "Check EXIF & GPS metadata",
        desc: "See what location and camera data is still in the file before you post or email it.",
      },
      {
        href: "/redact",
        title: "Redact faces, plates, or text",
        desc: "Blur or black out sensitive areas, then export without metadata.",
      },
      {
        href: "/compress?kb=200",
        title: "Compress to 200 KB",
        desc: "One-click preset for forms, job portals, and upload caps.",
      },
      {
        href: "/guides/compress-to-200kb",
        title: "Read the 200 KB guide",
        desc: "Step-by-step tips when a portal rejects your attachment.",
      },
    ],
  },
  redact: {
    title: "What's next?",
    intro: "After masking sensitive areas, strip metadata and shrink the file before sharing.",
    steps: [
      {
        href: "/tools/exif-checker",
        title: "Verify EXIF/GPS is gone",
        desc: "Confirm the exported copy no longer carries location or device tags.",
      },
      {
        href: "/compress",
        title: "Compress the redacted image",
        desc: "Hit email or form size limits without re-uploading to a third party.",
      },
      {
        href: "/guides/blur-face-in-photo",
        title: "Blur faces — full guide",
        desc: "Best practices for portraits, group shots, and social posts.",
      },
      {
        href: "/guides/redaction-checklist",
        title: "Privacy checklist before sharing",
        desc: "IDs, screenshots, invoices — what to mask every time.",
      },
    ],
  },
  "pdf-to-image": {
    title: "What's next?",
    intro: "Pages exported as PNG? Shrink, convert, or redact before you upload anywhere.",
    steps: [
      {
        href: "/compress",
        title: "Compress the PNG pages",
        desc: "Set a target KB when slides or scans are too large to attach.",
      },
      {
        href: "/redact",
        title: "Redact a page screenshot",
        desc: "Hide names, account numbers, or plates on exported images.",
      },
      {
        href: "/tools/webp-converter",
        title: "Convert to WebP",
        desc: "Smaller files for web embeds when PNG is overkill.",
      },
      {
        href: "/tools/resize-image",
        title: "Resize for upload limits",
        desc: "Match Instagram, forms, or portal max dimensions.",
      },
    ],
  },
};

const nextStepsZh: Record<ToolNextStepsId, NextStepsContent> = {
  compress: {
    title: "压缩完成后，建议下一步",
    intro: "分享或上传前，可继续去元数据、打码隐私，或按平台要求压到指定大小。",
    steps: [
      {
        href: "/guides/remove-exif-wechat-zh",
        title: "微信发图前去 EXIF",
        desc: "避免照片附带位置、设备等隐藏信息。",
      },
      {
        href: "/zh/redact",
        title: "图片打码遮挡隐私",
        desc: "模糊人脸、车牌、证件号后再分享。",
      },
      {
        href: "/zh/compress?kb=200",
        title: "压缩到 200KB",
        desc: "报名照、政务表单等常见上限一键预设。",
      },
      {
        href: "/guides/compress-to-target-kb-zh",
        title: "压缩到指定 KB 教程",
        desc: "报名照、表单有明确大小上限时的设置方法。",
      },
    ],
  },
  redact: {
    title: "打码完成后，建议下一步",
    intro: "遮挡敏感区域后，建议确认元数据并压缩，再发送或发布。",
    steps: [
      {
        href: "/guides/export-without-metadata-zh",
        title: "确认元数据已去除",
        desc: "了解导出后如何清除 EXIF/GPS，再分享更安全。",
      },
      {
        href: "/zh/compress",
        title: "打码后压缩图片",
        desc: "满足邮件、表单的大小限制，仍在本机处理。",
      },
      {
        href: "/guides/remove-exif-wechat-zh",
        title: "微信分享隐私教程",
        desc: "发群、朋友圈前的检查清单。",
      },
      {
        href: "/zh/compress?kb=500",
        title: "压缩到 500KB",
        desc: "适合多数在线上传场景的体积目标。",
      },
    ],
  },
  "pdf-to-image": {
    title: "转换完成后，建议下一步",
    intro: "PDF 已导出为图片，可继续压缩、打码或阅读详细教程。",
    steps: [
      {
        href: "/zh/compress",
        title: "压缩导出的 PNG",
        desc: "幻灯片、扫描件页数多时常需再缩小体积。",
      },
      {
        href: "/zh/redact",
        title: "打码页面中的隐私",
        desc: "遮挡姓名、账号、车牌等再分享。",
      },
      {
        href: "/zh/guides/pdf-to-image-free",
        title: "PDF 转图详细教程",
        desc: "步骤说明与 WPS 会员方案对比。",
      },
      {
        href: "/zh/compress?kb=200",
        title: "压缩到 200KB",
        desc: "单页截图需满足表单上限时使用。",
      },
    ],
  },
};

export function getToolNextSteps(tool: ToolNextStepsId, locale: "en" | "zh" = "en") {
  return locale === "zh" ? nextStepsZh[tool] : nextStepsEn[tool];
}
