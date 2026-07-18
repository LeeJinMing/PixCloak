import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdsenseUnit from "@/components/Adsense";
import { evidenceFor, formatEvidenceBytes, type GuideEvidence } from "@/lib/guideEvidence";
import { guideBySlug, guideTopics, guidesForTopic, launchGuides, type GuideTopic } from "@/lib/launchGuides";
import { absoluteUrl } from "@/lib/site";

const validationDate = "2026-07-18";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(guideTopics), ...launchGuides.map((guide) => guide.slug)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = guideTopics[slug as GuideTopic];
  if (topic) return { title: topic.title, description: topic.description, alternates: { canonical: `/guides/${slug}` } };
  const guide = guideBySlug(slug);
  if (!guide) return {};
  const evidence = evidenceFor(guide.slug);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}`, languages: { "x-default": `/guides/${guide.slug}`, en: `/guides/${guide.slug}` } },
    openGraph: { type: "article", title: guide.title, description: guide.description, url: `/guides/${guide.slug}`, images: evidence ? [{ url: evidence.after.src, width: evidence.after.width, height: evidence.after.height, alt: evidence.after.alt }] : undefined },
  };
}

function TopicHub({ topic }: { topic: GuideTopic }) {
  const details = guideTopics[topic];
  const guides = guidesForTopic(topic);
  return (
    <main className="workflow-page">
      <section className="workflow-hero">
        <div><span className="eyebrow">TOPIC CENTER</span><h1>{details.title}</h1><p>{details.description}</p><Link className="button" href={details.workflowHref}>{details.workflowLabel}</Link></div>
      </section>
      <section className="guide-index-list" aria-labelledby="published-guides">
        <span className="eyebrow">PUBLISHED GUIDES</span><h2 id="published-guides">One distinct task per guide</h2>
        <div className="guide-hub-grid">
          {guides.map((guide) => <article className="card" key={guide.slug}><h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p><Link href={guide.toolHref}>Open the working preset →</Link></article>)}
        </div>
      </section>
      <p className="validation-note">Content and linked tool behavior last verified {validationDate}. Pages are removed from the sitemap when their evidence or tool no longer matches the published claim.</p>
    </main>
  );
}

function Evidence({ evidence }: { evidence: GuideEvidence }) {
  return (
    <section className="guide-evidence" aria-labelledby="evidence-title">
      <span className="eyebrow">REPRODUCIBLE SAMPLE</span><h2 id="evidence-title">This guide&apos;s before-and-after files</h2>
      <div className="sample-pair">
        {[evidence.before, evidence.after].map((sample) => <figure key={sample.src}><a href={sample.downloadHref} download><Image src={sample.src} alt={sample.alt} width={sample.width} height={sample.height} /></a><figcaption><strong>{sample.label}</strong><br />{sample.width}×{sample.height} · {formatEvidenceBytes(sample.bytes)} · <a href={sample.downloadHref} download>download file</a></figcaption></figure>)}
      </div>
      <div className="evidence-result"><strong>Observed result</strong><p>{evidence.result}</p><small>{evidence.method}</small></div>
      <p className="validation-note">Validation date: {validationDate}. Both files are downloadable; dimensions, byte counts, decodability, and distinct SHA-256 hashes are checked by the repository test suite.</p>
    </section>
  );
}

export default async function LaunchGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (guideTopics[slug as GuideTopic]) return <TopicHub topic={slug as GuideTopic} />;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const evidence = evidenceFor(guide.slug);
  if (!evidence) notFound();
  const topic = guideTopics[guide.topic];
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: validationDate, dateModified: validationDate, mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`), author: { "@type": "Organization", name: "PixCloak" }, publisher: { "@type": "Organization", name: "PixCloak" } };
  return (
    <main className="workflow-page guide-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/guides">Guides</Link><span>›</span><Link href={`/guides/${guide.topic}`}>{topic.title}</Link><span>›</span><span>{guide.title}</span></nav>
      <article>
        <header className="workflow-hero"><div><span className="eyebrow">VERIFIED GUIDE</span><h1>{guide.title}</h1><p>{guide.description}</p><Link className="button" href={guide.toolHref}>{guide.toolLabel}</Link></div></header>
        <section className="direct-answer"><h2>Direct answer</h2><p>{guide.answer}</p></section>
        <AdsenseUnit className="ad-slot ad-slot-after-answer" format="auto" />
        <Evidence evidence={evidence} />
        <section className="guide-steps"><h2>Use the verified workflow</h2><ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol></section>
        <section className="guide-limitations"><h2>Limits and failure cases</h2><ul>{guide.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="guide-sources"><h2>Official sources and verification</h2><p>Tool behavior and samples were checked on {validationDate}. External references:</p><ul>{guide.sources.map((source) => <li key={source.href}><a href={source.href} rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>
        <section className="related-next"><h2>Related next step</h2><p><Link href={`/guides/${guide.topic}`}>Return to {topic.title}</Link> or <Link data-related-tool={guide.toolHref} href={guide.toolHref}>{guide.toolLabel.toLowerCase()}</Link>.</p></section>
        <section className="guide-faq"><h2>Common question</h2><details><summary>Does PixCloak upload the source image?</summary><p>No. The editing pipeline uses browser File, Canvas, and Blob APIs on this device. Optional analytics and advertising are separate and load only after the applicable consent choice; product events never include image bytes or filenames.</p></details></section>
        <AdsenseUnit className="ad-slot ad-slot-guide-end" format="auto" />
      </article>
    </main>
  );
}
