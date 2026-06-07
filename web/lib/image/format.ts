import type { OutputFormat } from "./types";

export function renameByFormat(name: string, mime: OutputFormat): string {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  if (mime === "image/webp") return `${base}.webp`;
  if (mime === "image/png") return `${base}.png`;
  return `${base}.jpg`;
}

export function formatBytes(n: number | undefined): string {
  if (typeof n !== "number" || Number.isNaN(n)) return "-";
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(2)} KB`;
  return `${n} B`;
}

export function getLargeFileNames(files: File[], limitBytes: number): string[] {
  return files.filter((f) => f.size > limitBytes).map((f) => f.name);
}
