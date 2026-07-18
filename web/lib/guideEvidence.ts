import guideEvidenceData from "@/lib/guideEvidence.generated.json";

export type EvidenceSample = {
  src: string;
  downloadHref: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  bytes: number;
  sha256: string;
};

export type GuideEvidence = {
  slug: string;
  result: string;
  method: string;
  before: EvidenceSample;
  after: EvidenceSample;
};

export const guideEvidence = guideEvidenceData as GuideEvidence[];
export const evidenceFor = (slug: string) => guideEvidence.find((entry) => entry.slug === slug);
export const formatEvidenceBytes = (bytes: number) => bytes >= 1024 * 1024
  ? `${(bytes / 1024 / 1024).toFixed(2)}MB`
  : `${(bytes / 1024).toFixed(2)}KB`;
