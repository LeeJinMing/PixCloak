import Link from "next/link";
import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import { LaunchHero } from "@/components/LaunchHero";
import { PwaBenefits } from "@/components/PwaBenefits";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

export const metadata: Metadata = {
  title: "图片隐私处理与压缩工具—本地打码、压到指定KB",
  description:
    `${SITE_NAME_ZH} PixCloak 在浏览器本地完成图片打码、EXIF/GPS 清理、格式转换和指定 KB 压缩。图片不上传，无需注册，导出前重新校验。`,
  keywords: ["图片压缩", "图片打码", "压缩到指定KB", "去除EXIF", "本地图片工具", "图片不上传"],
  alternates: { canonical: "/zh" },
  openGraph: {
    locale: "zh_CN",
    title: "图片先在本地处理，再安心分享或上传",
    description: "图片打码、元数据清理和指定 KB 压缩，全程在浏览器本地完成。",
    url: "/zh",
  },
};

const quickTools = [
  { href: "/zh/redact", title: "图片打码", text: "手动框选人脸、车牌、证件号或文字，永久写入遮挡效果。" },
  { href: "/zh/compress", title: "压缩到指定 KB", text: "设置 100KB、200KB、500KB 等硬上限，结果不超标才可下载。" },
  { href: "/zh/tools/pdf-to-image", title: "PDF 转图片", text: "把 PDF 每一页在本地导出为 PNG，无需上传或开通会员。" },
  { href: "/zh/tools/image-to-pdf", title: "图片合并 PDF", text: "多张图片排序后合并为一个 PDF，可设置页面和边距。" },
];

const faq = [
  {
    question: "图片会上传到服务器吗？",
    answer: "不会。图片读取、编辑和导出均在当前浏览器中完成，PixCloak 不接收图片文件。",
  },
  {
    question: "能保证压缩结果不超过指定 KB 吗？",
    answer: "可以。工具会重新读取导出文件并核对体积；若无法满足硬上限，会明确提示失败，不会把超标文件当作成功结果。",
  },
  {
    question: "图片打码后还能恢复原内容吗？",
    answer: "导出时遮挡会写入新图片的像素。请下载并检查导出文件，不要把仍含原图层或原文件的编辑工程直接分享。",
  },
];

export default function ZhHomePage() {
  return (
    <>
      <FaqJsonLd items={faq} />
      <div className="launch-home launch-home--zh">
        <LaunchHero
          ariaLabel="皮克图本地图片处理流程"
          eyebrow="浏览器本地图片处理"
          title="本地处理图片，再安心分享或上传"
          description="打码隐私信息、清除 EXIF/GPS、转换格式、压到指定 KB。图片只在你的浏览器中处理，无需上传或注册。"
          primaryAction={{ href: "/zh/redact", label: "开始隐私打码" }}
          secondaryAction={{ href: "/zh/compress", label: "压缩到指定大小" }}
          proofs={["图片不上传服务器", "导出结果重新校验", "无需注册或会员"]}
          panelEyebrow="默认本地处理"
          panelTitle="一张图片，三步确认"
          panelStatus="图片文件始终留在当前设备"
          steps={[
            { number: "01", title: "检查原图", text: "确认画面内容、格式、尺寸和元数据。" },
            { number: "02", title: "按需处理", text: "打码、压缩、缩放或转换格式。" },
            { number: "03", title: "验证导出", text: "重新打开结果，核对体积与隐私信息。" },
          ]}
        />

        <section className="home-section" aria-labelledby="zh-core-workflows">
          <div className="section-heading">
            <span className="eyebrow">先选目标，再选工具</span>
            <h2 id="zh-core-workflows">分享和上传的核心流程</h2>
          </div>
          <div className="workflow-card-grid">
            <Link href="/zh/redact" className="workflow-card workflow-card--dark">
              <span>安心分享</span>
              <h3>遮挡画面中的隐私，再清理隐藏元数据</h3>
              <p>手动框选人脸、车牌、证件号或聊天文字，导出后检查遮挡是否真正写入新图片。</p>
              <strong>打开图片打码 →</strong>
            </Link>
            <Link href="/zh/compress" className="workflow-card">
              <span>顺利上传</span>
              <h3>把图片压到报名、政务或平台要求的大小</h3>
              <p>设置目标 KB 和格式，批量处理，并且只下载通过最终体积校验的结果。</p>
              <strong>打开指定 KB 压缩 →</strong>
            </Link>
            <Link href="/zh/upload-pack" className="workflow-card workflow-card--special">
              <span>报名与政务专项流程</span>
              <h3>照片和签名一次准备完成</h3>
              <p>分别填写两组像素、格式和 KB 要求，只下载全部通过最终校验的照片与签名。</p>
              <strong>打开照片和签名准备 →</strong>
            </Link>
          </div>
        </section>

        <section className="home-section" aria-labelledby="zh-quick-tools">
          <div className="section-heading">
            <span className="eyebrow">直接工具</span>
            <h2 id="zh-quick-tools">解决一个具体问题</h2>
          </div>
          <div className="quick-tool-grid">
            {quickTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="quick-tool-card">
                <strong>{tool.title}</strong>
                <span>{tool.text}</span>
              </Link>
            ))}
          </div>
        </section>

        <PwaBenefits locale="zh" />

        <section className="local-explainer">
          <div>
            <span className="eyebrow">为什么能做到不上传</span>
            <h2>处理引擎运行在你的浏览器里</h2>
            <p>
              选择文件后，浏览器在当前设备上读取、处理并生成新文件。网站服务与图片处理管线分离，图片字节不会被加入分析或广告事件。
            </p>
            <Link href="/privacy">查看网站会记录什么 →</Link>
          </div>
          <ol>
            <li><span>1</span>从当前设备选择图片或 PDF。</li>
            <li><span>2</span>浏览器在本地解码和处理。</li>
            <li><span>3</span>下载前重新读取并校验结果。</li>
          </ol>
        </section>

        <section className="home-section" aria-labelledby="zh-use-cases">
          <div className="section-heading">
            <span className="eyebrow">常见使用场景</span>
            <h2 id="zh-use-cases">从“文件不合要求”直接走到可提交结果</h2>
          </div>
          <div className="zh-use-case-grid">
            <article>
              <span>01</span>
              <h3>报名照与政务表单</h3>
              <p>按 100KB、200KB 或 500KB 限制压缩，同时核对输出格式和尺寸。</p>
            </article>
            <article>
              <span>02</span>
              <h3>截图、证件与二手交易</h3>
              <p>发图前遮挡姓名、地址、号码、车牌等可识别信息，并清理元数据。</p>
            </article>
            <article>
              <span>03</span>
              <h3>PDF 页面转图片</h3>
              <p>把 PDF 每页导出为 PNG；如文件仍过大，可继续压缩到目标 KB。</p>
            </article>
          </div>
        </section>

        <section className="card supported-summary">
          <h2>当前支持范围</h2>
          <p>JPG、PNG、WebP、HEIC 图片处理；指定 KB 硬上限；手动纯色、马赛克和模糊打码；元数据清理；照片与签名准备；PDF 转图片和图片合并 PDF；以及导出结果复检。</p>
          <p className="text-muted">人脸、车牌、文字和二维码自动识别尚未提供，当前请手动框选需要遮挡的区域。</p>
        </section>

        <section className="card compact-faq">
          <h2>常见问题</h2>
          {faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>
      </div>
    </>
  );
}
