"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BeianFooter } from "@/components/BeianFooter";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

const GONGAN_BEIAN = process.env.NEXT_PUBLIC_GONGAN_BEIAN;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");

  return (
    <>
      <header role="banner" style={{ borderBottom: "1px solid #eee" }}>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <Link href={isZh ? "/zh" : "/"} style={{ fontWeight: 700 }}>
            {isZh ? (
              <>
                {SITE_NAME_ZH} <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>PixCloak</span>
              </>
            ) : (
              "PixCloak"
            )}
          </Link>
          <nav
            role="navigation"
            aria-label={isZh ? "中文导航" : "Primary"}
            style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "flex-end" }}
          >
            {isZh ? (
              <>
                <Link href="/zh/compress">图片压缩</Link>
                <Link href="/zh/tools/pdf-to-image">PDF转图片</Link>
                <Link href="/zh/guides/pdf-to-image-free">教程</Link>
                <Link href="/zh/redact">图片打码</Link>
                <Link href="/" className="text-muted">
                  English
                </Link>
              </>
            ) : (
              <>
                <Link href="/compress">Compress</Link>
                <Link href="/redact">Redact</Link>
                <Link href="/tools">Tools</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/guides/embed-button">Embed</Link>
                <Link href="/press">Press</Link>
                <Link href="/zh" className="text-muted">
                  中文
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main role="main" className="container section">
        {children}
      </main>
      <footer role="contentinfo" style={{ borderTop: "1px solid #eee", marginTop: 24 }}>
        <div className="container" style={{ padding: "16px", display: "grid", gap: 8, justifyItems: "center" }}>
          <small>© {new Date().getFullYear()} {isZh ? `${SITE_NAME_ZH} / PixCloak` : "PixCloak"}. All rights reserved.</small>
          <nav role="navigation" aria-label="Footer" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/about">{isZh ? "关于" : "About"}</Link>
            <Link href="/privacy">{isZh ? "隐私政策" : "Privacy"}</Link>
            <Link href="/terms">{isZh ? "服务条款" : "Terms"}</Link>
            <Link href="/contact">{isZh ? "联系反馈" : "Contact"}</Link>
            {!isZh && <Link href="/guides/embed-button">Embed</Link>}
            <Link href="/contact" className="pill">
              {isZh ? "反馈" : "Feedback"}
            </Link>
          </nav>
          <div className="text-muted" style={{ fontSize: 12, textAlign: "center" }}>
            {isZh ? "图片在您的浏览器本地处理，不会上传到服务器。" : "Local processing in your browser. Images are not uploaded to any server."}
          </div>
          <BeianFooter />
          {isZh && GONGAN_BEIAN && (
            <div className="text-muted" style={{ fontSize: 11 }}>
              <a href="https://www.beian.gov.cn/" target="_blank" rel="noopener noreferrer">
                {GONGAN_BEIAN}
              </a>
            </div>
          )}
        </div>
      </footer>
    </>
  );
}
