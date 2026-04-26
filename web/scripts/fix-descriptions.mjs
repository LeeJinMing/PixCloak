import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const appDir = join(__dirname, "..", "app");

function findPages(dir) {
  const pages = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...findPages(fullPath));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      pages.push(fullPath);
    }
  }
  return pages;
}

function optimizeDescription(description) {
  if (!description) return description;
  const currentLength = description.length;
  if (currentLength >= 120 && currentLength <= 160) return description;

  if (currentLength < 120) {
    const additions = [
      " Works locally in your browser, no uploads.",
      " 100% free, no registration required.",
      " Process images offline, privacy guaranteed.",
    ];
    for (const addition of additions) {
      const newDesc = description + addition;
      if (newDesc.length >= 120 && newDesc.length <= 160) return newDesc;
    }
    return description + " Process images offline in your browser. 100% free, no uploads, privacy guaranteed.";
  }

  if (currentLength > 160) {
    const targetLength = 155;
    const truncated = description.substring(0, targetLength);
    const lastSpace = truncated.lastIndexOf(" ");
    const lastSentence = truncated.lastIndexOf(".");
    if (lastSentence > targetLength - 30) return truncated.substring(0, lastSentence + 1);
    if (lastSpace > targetLength - 20) return truncated.substring(0, lastSpace) + "...";
    return truncated.substring(0, targetLength - 3) + "...";
  }
  return description;
}

const pages = findPages(appDir);
let fixed = 0;

for (const file of pages) {
  let content = readFileSync(file, "utf-8");
  let modified = false;

  const descRegex = /description:\s*(['"`])((?:(?!\1)[\s\S])*)\1/g;
  
  if (descRegex.test(content)) {
    content = content.replace(descRegex, (match, quote, oldDesc) => {
      const newDesc = optimizeDescription(oldDesc);
      if (newDesc !== oldDesc) {
        modified = true;
        console.log(`Fixed description in ${file}: ${oldDesc.length} -> ${newDesc.length}`);
      }
      return `description: ${quote}${newDesc}${quote}`;
    });
  }

  if (modified) {
    writeFileSync(file, content, "utf-8");
    fixed++;
  }
}

console.log(`Fixed ${fixed} files.`);
