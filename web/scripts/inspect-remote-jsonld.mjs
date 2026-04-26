#!/usr/bin/env node
/**
 * Fetch a URL and list application/ld+json @type / @graph entries.
 * Usage: node scripts/inspect-remote-jsonld.mjs https://pixcloak.com/
 */
const args = process.argv.slice(2).filter((a) => a !== "--verbose");
const verbose = process.argv.includes("--verbose");
const url = args[0] || "https://pixcloak.com/";
const res = await fetch(url, { redirect: "follow" });
if (!res.ok) {
  console.error("HTTP", res.status, url);
  process.exit(1);
}
const html = await res.text();
const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
let m;
let n = 0;
while ((m = re.exec(html))) {
  n++;
  try {
    const j = JSON.parse(m[1]);
    if (j["@graph"]) {
      const parts = j["@graph"].map(
        (x) => `${x["@type"] || "?"}${x["@id"] ? ` (${x["@id"]})` : ""}`,
      );
      console.log(`block ${n}  @graph:  ${parts.join("  |  ")}`);
      if (verbose) {
        const org = j["@graph"].find((x) => x["@type"] === "Organization");
        const site = j["@graph"].find((x) => x["@type"] === "WebSite");
        if (org) {
          console.log("  Organization.logo.url:", org.logo?.url);
          console.log("  Organization.sameAs:", org.sameAs);
          console.log("  Organization.contactPoint:", org.contactPoint?.email || org.contactPoint);
        }
        if (site) {
          console.log("  WebSite.publisher:", site.publisher);
        }
      }
    } else if (Array.isArray(j)) {
      console.log(`block ${n}  array[${j.length}]`);
    } else {
      console.log(`block ${n}  @type: ${j["@type"] || JSON.stringify(Object.keys(j).slice(0, 5))}`);
    }
  } catch (e) {
    console.log(`block ${n}  PARSE ERROR: ${e.message}`);
  }
}
console.log(`\nURL: ${url}`);
console.log(`ld+json blocks: ${n}`);
