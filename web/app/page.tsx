import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Image Preparation in Your Browser",
  description:
    "Redact sensitive details, remove hidden metadata, convert formats, and meet file-size limits locally in your browser.",
  alternates: { canonical: "/" },
};

const quickTools = [
  { href: "/compress", title: "Compress", text: "Fit JPG, PNG, or WebP under a hard KB limit." },
  { href: "/redact", title: "Redact", text: "Apply solid, pixelated, or blurred redaction." },
  { href: "/tools/exif-checker", title: "Metadata check", text: "Inspect and remove EXIF, GPS, XMP, and IPTC markers." },
  { href: "/tools/heic-converter", title: "HEIC converter", text: "Turn iPhone HEIC images into JPG or WebP." },
  { href: "/tools/resize-image", title: "Resize", text: "Change dimensions or longest side locally." },
  { href: "/tools/png-jpg-converter", title: "Convert format", text: "Convert between PNG and JPEG with a clear result." },
];

export default function Home() {
  return (
    <div className="launch-home">
      <section className="launch-hero">
        <div className="launch-hero__copy">
          <span className="eyebrow">PRIVATE IMAGE PREPARATION</span>
          <h1>Prepare private images for safe sharing and upload</h1>
          <p>
            Redact sensitive details, remove metadata, convert formats, and meet file-size limits—locally in your browser.
          </p>
          <div className="launch-actions">
            <Link href="/safe-share" className="button">Prepare for Safe Sharing</Link>
            <Link href="/upload-ready" className="button-outline">Meet an Upload Limit</Link>
          </div>
          <div className="launch-proof">
            <span>Image bytes stay on this device</span>
            <span>Results verified before download</span>
            <span>No account required</span>
          </div>
        </div>
        <div className="launch-hero__panel" aria-label="PixCloak workflow summary">
          <div><span>01</span><strong>Review</strong><small>See what the image contains.</small></div>
          <div><span>02</span><strong>Prepare</strong><small>Redact, resize, convert, or compress.</small></div>
          <div><span>03</span><strong>Verify</strong><small>Reopen and check the exported file.</small></div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="core-workflows">
        <div className="section-heading">
          <span className="eyebrow">START WITH THE OUTCOME</span>
          <h2 id="core-workflows">Two complete workflows</h2>
        </div>
        <div className="workflow-card-grid">
          <Link href="/safe-share" className="workflow-card workflow-card--dark">
            <span>SAFE SHARE</span>
            <h3>Remove visible and hidden private information</h3>
            <p>Draw permanent redactions, export without metadata, and review the verification result.</p>
            <strong>Open Safe Share →</strong>
          </Link>
          <Link href="/upload-ready" className="workflow-card">
            <span>UPLOAD READY</span>
            <h3>Meet a portal&apos;s size and format requirements</h3>
            <p>Choose the limit, process a batch, and download only results that pass the final check.</p>
            <strong>Open Upload Ready →</strong>
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="quick-tools">
        <div className="section-heading">
          <span className="eyebrow">DIRECT TOOLS</span>
          <h2 id="quick-tools">Fix one specific problem</h2>
        </div>
        <div className="quick-tool-grid">
          {quickTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="quick-tool-card">
              <strong>{tool.title}</strong><span>{tool.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="local-explainer">
        <div>
          <span className="eyebrow">LOCAL PROCESSING</span>
          <h2>The image is processed by your browser</h2>
          <p>
            The editing and export pipeline runs on this device. The website may load disclosed analytics or advertising only after the applicable consent choice; those services do not receive the image file from PixCloak.
          </p>
          <Link href="/privacy">See exactly what the site records →</Link>
        </div>
        <ol>
          <li><span>1</span>Select a file from this device.</li>
          <li><span>2</span>The browser decodes and processes it locally.</li>
          <li><span>3</span>The exported result is decoded and checked again.</li>
        </ol>
      </section>

      <section className="home-section" aria-labelledby="real-example">
        <div className="section-heading">
          <span className="eyebrow">REAL PRODUCT SAMPLE</span>
          <h2 id="real-example">Redaction is flattened into the exported image</h2>
        </div>
        <div className="example-grid">
          <figure>
            <Image src="/press/plate-upload.webp" width={720} height={405} alt="Original sample loaded in the PixCloak redaction tool" />
            <figcaption>Before: review the original locally.</figcaption>
          </figure>
          <figure>
            <Image src="/press/plate-solid.webp" width={720} height={405} alt="Sample after a permanent solid redaction was applied" />
            <figcaption>After: the covered pixels are part of the new file.</figcaption>
          </figure>
        </div>
      </section>

      <section className="card supported-summary">
        <h2>Supported in V1.0</h2>
        <p>JPG, PNG, and WebP processing; HEIC conversion; hard KB caps; manual solid, pixelated, and blurred redaction; metadata cleanup and export verification.</p>
        <p className="text-muted">Automatic face, plate, text, and QR detection is intentionally reserved for V1.1.</p>
      </section>

      <section className="card compact-faq">
        <h2>Common questions</h2>
        <details><summary>Are images uploaded?</summary><p>No. The image editing pipeline runs locally in the browser.</p></details>
        <details><summary>Can a result exceed the selected KB limit?</summary><p>No successful result is offered above a hard limit. If necessary, dimensions are reduced; otherwise the tool reports a failure.</p></details>
        <details><summary>Does local processing mean there is no analytics or advertising?</summary><p>No. The privacy page separately discloses website analytics, advertising, and consent behavior. Image bytes are not included in those events.</p></details>
      </section>
    </div>
  );
}
