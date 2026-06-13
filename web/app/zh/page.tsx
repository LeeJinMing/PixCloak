import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

export const metadata: Metadata = {
  title: "免费在线图片工具—压缩、PDF转图、本地处理不上传",
  description:
    `${SITE_NAME_ZH} PixCloak：免费图片压缩到指定KB、PDF转PNG/JPG，全程浏览器本地处理。无需 WPS 会员，不上传，保护隐私。`,
  alternates: { canonical: "/zh" },
};

export default function ZhHomePage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          {SITE_NAME_ZH} — 本地图片工具（免费、不上传）
        </h1>
        <p className="text-muted" style={{ marginBottom: 12 }}>
          在浏览器里压缩图片、把 PDF 转成图片、去除 EXIF 元数据。文件不离开您的电脑，无需注册，无需 WPS/金山会员。
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/zh/compress" className="pill">
            图片压缩
          </Link>
          <Link href="/zh/tools/pdf-to-image" className="pill">
            PDF 转图片
          </Link>
          <Link href="/zh/compress?kb=200" className="pill-ghost">
            压缩到 200KB
          </Link>
          <Link href="/guides/remove-exif-wechat-zh" className="pill-ghost">
            微信去 EXIF
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>为什么用{SITE_NAME_ZH}？</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ textAlign: "left", padding: 8 }}>对比</th>
              <th style={{ textAlign: "left", padding: 8 }}>{SITE_NAME_ZH}（本地）</th>
              <th style={{ textAlign: "left", padding: 8 }}>WPS / 在线工具</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: 8 }}>隐私</td>
              <td style={{ padding: 8 }}>不上传，本地处理</td>
              <td style={{ padding: 8 }}>常需上传云端</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: 8 }}>费用</td>
              <td style={{ padding: 8 }}>免费</td>
              <td style={{ padding: 8 }}>PDF 等功能常需会员</td>
            </tr>
            <tr>
              <td style={{ padding: 8 }}>目标大小</td>
              <td style={{ padding: 8 }}>可指定 KB（如 200KB）</td>
              <td style={{ padding: 8 }}>多数无法精确控制</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>常用工具</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <Link href="/zh/compress">在线图片压缩</Link> — 支持 JPEG/WebP/PNG，批量 ZIP
          </li>
          <li>
            <Link href="/zh/tools/pdf-to-image">PDF 转图片</Link> — 每页导出 PNG，无需会员
          </li>
          <li>
            <Link href="/zh/redact">图片打码</Link> — 遮挡隐私信息
          </li>
          <li>
            <Link href="/guides/compress-to-target-kb-zh">压缩到指定 KB 教程</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
