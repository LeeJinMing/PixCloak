#!/usr/bin/env node
/**
 * Load web/.env.local into process.env, then run another script under web/.
 * Usage: node scripts/run-with-local-env.mjs submit-indexnow-all.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const webRoot = join(scriptsDir, "..");
const envPath = join(webRoot, ".env.local");

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const target = process.argv[2];
if (!target) {
  console.error("Usage: node scripts/run-with-local-env.mjs <script.mjs> [args...]");
  process.exit(1);
}

const r = spawnSync(
  process.execPath,
  [join(scriptsDir, target), ...process.argv.slice(3)],
  { cwd: webRoot, stdio: "inherit", env: process.env },
);
process.exit(r.status ?? 1);
