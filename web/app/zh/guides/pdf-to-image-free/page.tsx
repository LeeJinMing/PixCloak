import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

export const metadata: Metadata = {
  title: "PDF转图片教程—免费本地转换，不用WPS会员",
  description:
    "手把手教你用浏览器免费把 PDF 转成 PNG 图片：不上传、无需 WPS 会员。适合简历、课件、扫描件导出。",
  keywords: ["pdf转图片教程", "pdf怎么转图片", "免费pdf转png", "wps pdf转图片 收费"],
  alternates: { canonical: "/zh/guides/pdf-to-image-free" },
};

export default function ZhPdfGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/zh" },
          { name: "PDF转图片教程", url: "/zh/guides/pdf-to-image-free" },
        ]}
      />
      <article className="card">
        <h1>PDF 转图片教程（免费、本地、无需 WPS 会员）</h1>
        <p className="text-muted">最后更新：2026 年 6 月</p>

        <h2>为什么不用 WPS 在线转？</h2>
        <p>
          许多用户在 WPS、金山文档里转 PDF 为图片时会遇到<strong>会员订阅</strong>提示。{SITE_NAME_ZH}（PixCloak）在浏览器里本地转换，
          不经过他们的服务器，<strong>免费、不上传</strong>。
        </p>

        <h2>操作步骤</h2>
        <ol>
          <li>
            打开 <Link href="/zh/tools/pdf-to-image">PDF 转图片工具</Link>
          </li>
          <li>点击「选择 PDF 文件」，选中本地 PDF</li>
          <li>调整「最多导出页数」和「清晰度倍数」</li>
          <li>点击「转换为图片」，完成后「下载 ZIP」</li>
          <li>若文件仍太大，用 <Link href="/zh/compress">图片压缩</Link> 压到目标 KB</li>
        </ol>

        <h2>常见问题</h2>
        <p>
          <strong>Q：文件会上传吗？</strong>
          <br />
          A：不会。转换在您的电脑浏览器内完成。
        </p>
        <p>
          <strong>Q：一次能转多少页？</strong>
          <br />
          A：单次最多 50 页，避免浏览器卡死。页数多的 PDF 可分批或拆分后再转。
        </p>
        <p>
          <strong>Q：输出是什么格式？</strong>
          <br />
          A：默认每页一张 PNG。需要 JPG 可用压缩工具导出为 JPEG。
        </p>

        <div style={{ marginTop: 20 }}>
          <Link href="/zh/tools/pdf-to-image" className="pill">
            立即使用 PDF 转图片 →
          </Link>
        </div>
      </article>
    </>
  );
}
