import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import { evidenceFor, formatEvidenceBytes } from "@/lib/guideEvidence";

type ItemLink = { href: string; label: string };

export function CoreToolLayout({
  eyebrow,
  title,
  description,
  tool,
  scenarios,
  limitations,
  next,
  faq,
  evidenceSlug,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tool: ReactNode;
  scenarios: string[];
  limitations: string[];
  next: ItemLink[];
  faq: Array<{ question: string; answer: string }>;
  evidenceSlug?: string;
  sample?: "upload" | "privacy";
}) {
  const evidenceByTool: Record<string, string> = {
    "IMAGE COMPRESSOR": "compress-image-under-100kb",
    "IMAGE REDACTION": "blur-pixelate-solid-redaction",
    "METADATA CHECK": "remove-gps-location-photo",
    "HEIC CONVERTER": "heic-upload-error-convert-locally",
    "IMAGE RESIZER": "reduce-image-size-iphone",
    "FORMAT CONVERTER": "file-size-dimensions-format",
  };
  const resolvedEvidenceSlug = evidenceSlug || evidenceByTool[eyebrow];
  const evidence = resolvedEvidenceSlug ? evidenceFor(resolvedEvidenceSlug) : undefined;
  if (!evidence) throw new Error(`Missing tool evidence: ${resolvedEvidenceSlug || eyebrow}`);
  return (
    <main className="workflow-page core-tool-page">
      <header className="workflow-hero"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></header>
      <section aria-label={`${title} tool`}>{tool}</section>
      <section className="tool-context-grid">
        <div className="card"><h2>Useful for</h2><ul>{scenarios.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="card"><h2>Limits and failures</h2><ul>{limitations.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>
      <section className="guide-evidence"><span className="eyebrow">REAL SAMPLE</span><h2>Inspect the input and output</h2><div className="sample-pair">{[evidence.before, evidence.after].map((sample) => <figure key={sample.src}><a href={sample.downloadHref} download><Image src={sample.src} alt={sample.alt} width={sample.width} height={sample.height} /></a><figcaption><strong>{sample.label}</strong><br />{sample.width}×{sample.height} · {formatEvidenceBytes(sample.bytes)} · <a href={sample.downloadHref} download>download</a></figcaption></figure>)}</div><div className="evidence-result"><strong>Observed result</strong><p>{evidence.result}</p><small>{evidence.method}</small></div></section>
      <section className="related-next"><h2>Related next step</h2><div className="workflow-links">{next.map((item) => <Link className="button-outline" data-related-tool={item.href} href={item.href} key={item.href}>{item.label}</Link>)}</div></section>
      <section className="guide-faq"><h2>Common questions</h2>{faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
      <FaqJsonLd items={faq} />
    </main>
  );
}
