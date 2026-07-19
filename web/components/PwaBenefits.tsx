import Link from "next/link";

type Locale = "en" | "zh";

const copy = {
  en: {
    eyebrow: "ONE APP, FOUR SHORTCUTS",
    title: "Keep your regular tools one click away",
    intro:
      "Install PixCloak once, then open it from your desktop, Start menu, or home screen without typing the address again.",
    benefits: [
      ["Faster return", "Open a focused app window instead of finding the website again."],
      ["Four direct entries", "Jump straight to safe sharing, upload preparation, PDF export, or PDF creation."],
      ["Same private processing", "Installing the app does not upload an image or create an account."],
      ["Always current", "The launcher opens the maintained web version, so there is no separate installer to update."],
    ],
    shortcuts: [
      ["/safe-share", "Safe Share"],
      ["/upload-ready", "Upload Ready"],
      ["/tools/pdf-to-image", "PDF to Images"],
      ["/tools/image-to-pdf", "Images to PDF"],
    ],
    note:
      "The install option appears after a completed download or a return visit. An internet connection is still required to load the tools.",
  },
  zh: {
    eyebrow: "一个应用，四个快捷入口",
    title: "常用工具直接从桌面打开",
    intro: "安装一次皮克图，以后可从桌面、开始菜单或手机主屏幕打开，不必再次输入网址。",
    benefits: [
      ["更快返回", "直接打开独立应用窗口，不用重新查找网站。"],
      ["四个直达入口", "可直接进入图片打码、指定 KB 压缩、PDF 转图片和图片转 PDF。"],
      ["隐私方式不变", "安装应用不会上传图片，也不需要创建账号。"],
      ["自动使用新版", "桌面入口始终打开维护中的网页版，无需另外下载更新包。"],
    ],
    shortcuts: [
      ["/zh/redact", "图片打码"],
      ["/zh/compress", "指定 KB 压缩"],
      ["/zh/tools/pdf-to-image", "PDF 转图片"],
      ["/zh/tools/image-to-pdf", "图片转 PDF"],
    ],
    note: "完成一次下载或再次访问后，页面顶部会显示安装入口。工具加载时仍需要网络连接。",
  },
} as const;

export function PwaBenefits({ locale }: { locale: Locale }) {
  const content = copy[locale];
  const titleId = locale === "zh" ? "zh-pwa-benefits" : "pwa-benefits";

  return (
    <section className="pwa-home-benefits" aria-labelledby={titleId}>
      <div className="pwa-benefits-copy">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2 id={titleId}>{content.title}</h2>
        <p>{content.intro}</p>
        <div className="pwa-benefit-shortcuts" aria-label={locale === "zh" ? "安装后的四个入口" : "Four shortcuts after installation"}>
          {content.shortcuts.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
        </div>
        <p className="pwa-benefits-note">{content.note}</p>
      </div>
      <ul className="pwa-benefit-list">
        {content.benefits.map(([title, text], index) => (
          <li key={title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{title}</strong><p>{text}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
