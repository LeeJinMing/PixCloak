import { promises as fs } from "node:fs";
import path from "node:path";

const webRoot = process.cwd();
const repoRoot = path.resolve(webRoot, "..");
const licenseUrl = "https://www.gnu.org/licenses/agpl-3.0.txt";

async function syncLicense() {
  const response = await fetch(licenseUrl, {
    headers: { "user-agent": "PixCloak legal asset sync (https://pixcloak.com)" },
  });
  if (!response.ok) throw new Error(`Unable to fetch AGPL text: ${response.status}`);
  const text = (await response.text()).replace(/\r\n/g, "\n").trimEnd() + "\n";
  if (!text.includes("GNU AFFERO GENERAL PUBLIC LICENSE") || !text.includes("END OF TERMS AND CONDITIONS")) {
    throw new Error("Downloaded license text failed validation");
  }
  await fs.writeFile(path.join(repoRoot, "LICENSE"), text, "utf8");
}

async function packageRecords(directory) {
  const records = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === ".bin") continue;
    const full = path.join(directory, entry.name);
    if (entry.name.startsWith("@")) {
      records.push(...await packageRecords(full));
      continue;
    }
    try {
      const pkg = JSON.parse(await fs.readFile(path.join(full, "package.json"), "utf8"));
      if (pkg.name && pkg.version) {
        const license = typeof pkg.license === "string"
          ? pkg.license
          : Array.isArray(pkg.licenses)
            ? pkg.licenses.map((item) => typeof item === "string" ? item : item?.type).filter(Boolean).join(" OR ")
            : "NOT DECLARED";
        records.push({ name: pkg.name, version: pkg.version, license });
      }
    } catch { /* package folders without a readable manifest are ignored */ }
  }
  return records;
}

async function syncNotices() {
  const records = await packageRecords(path.join(webRoot, "node_modules"));
  const unique = [...new Map(records.map((record) => [`${record.name}@${record.version}`, record])).values()]
    .sort((a, b) => a.name.localeCompare(b.name) || a.version.localeCompare(b.version));
  const lines = [
    "# Third-Party Software Notices",
    "",
    "PixCloak includes the following installed JavaScript packages. This inventory is generated from package manifests; each package remains subject to its own license terms and notices.",
    "",
    `Generated from web/node_modules on ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "| Package | Version | Declared license |",
    "|---|---:|---|",
    ...unique.map((record) => `| ${record.name.replaceAll("|", "\\|")} | ${record.version} | ${String(record.license).replaceAll("|", "\\|")} |`),
    "",
  ];
  await fs.writeFile(path.join(repoRoot, "THIRD_PARTY_NOTICES.md"), lines.join("\n"), "utf8");
}

await Promise.all([syncLicense(), syncNotices()]);
console.log("Synchronized LICENSE and THIRD_PARTY_NOTICES.md");
