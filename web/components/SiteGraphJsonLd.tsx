import { absoluteUrl, getSiteOrigin } from "@/lib/site";

/**
 * Single JSON-LD graph: Organization + WebSite (publisher link).
 * No SearchAction: /guides has no ?q= search; invalid SearchAction hurts Rich Results.
 */
export function SiteGraphJsonLd() {
  const origin = getSiteOrigin();
  const orgId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "PixCloak",
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
        },
        sameAs: ["https://github.com/LeeJinMing/PixCloak"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@pixcloak.com",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: "PixCloak",
        description: "Compress and Redact images locally. No upload. No tracking.",
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
