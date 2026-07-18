import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("public/icons");
await mkdir(outputDir, { recursive: true });

const appIcon = (maskable = false) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" ${maskable ? "" : 'rx="112"'} fill="#2563eb"/>
  <rect x="96" y="96" width="320" height="320" rx="88" fill="#0f172a"/>
  <rect x="156" y="172" width="200" height="34" rx="17" fill="#fff"/>
  <rect x="156" y="239" width="136" height="34" rx="17" fill="#fff"/>
  <rect x="156" y="306" width="200" height="34" rx="17" fill="#fff"/>
</svg>`;

const shortcutSvgs = {
  "shortcut-safe-share.png": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="24" fill="#2563eb"/>
      <path d="M48 17 73 27v17c0 17-10 29-25 36C33 73 23 61 23 44V27l25-10Z" fill="#fff"/>
      <path d="m37 48 8 8 15-18" fill="none" stroke="#2563eb" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  "shortcut-upload-ready.png": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="24" fill="#0f172a"/>
      <path d="M48 65V25m0 0L33 40m15-15 15 15M26 69v7h44v-7" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  "shortcut-pdf-to-image.png": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="24" fill="#2563eb"/>
      <path d="M26 16h32l14 14v50H26V16Z" fill="#fff"/>
      <path d="M58 16v15h14" fill="#dbeafe"/>
      <circle cx="43" cy="43" r="6" fill="#2563eb"/>
      <path d="m34 68 12-14 8 8 6-7 6 13H34Z" fill="#2563eb"/>
    </svg>`,
  "shortcut-image-to-pdf.png": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="24" fill="#0f172a"/>
      <rect x="17" y="23" width="49" height="43" rx="6" fill="#fff"/>
      <circle cx="32" cy="38" r="6" fill="#2563eb"/>
      <path d="m23 59 12-13 9 9 7-8 9 12H23Z" fill="#2563eb"/>
      <path d="M57 36h20v39H43v-9h23V46h-9V36Z" fill="#fff" opacity=".78"/>
    </svg>`,
};

async function writePng(svg, size, filename) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(outputDir, filename));
}

await Promise.all([
  writePng(appIcon(), 192, "pixcloak-192.png"),
  writePng(appIcon(), 512, "pixcloak-512.png"),
  writePng(appIcon(true), 512, "pixcloak-maskable-512.png"),
  writePng(appIcon(), 180, "apple-touch-icon.png"),
  ...Object.entries(shortcutSvgs).map(([filename, svg]) => writePng(svg, 96, filename)),
]);

console.log(`Generated ${4 + Object.keys(shortcutSvgs).length} PWA icons in ${outputDir}`);
