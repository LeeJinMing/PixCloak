export type TemplateScene = "redact" | "compress";

export interface TemplatePreset {
  slug: string;
  title: string;
  scene: TemplateScene;
  summary: string;
  highlights: string[];
  ctaHref: string; // where to open the tool
}
