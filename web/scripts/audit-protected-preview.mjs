import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";

const rawOrigin = process.argv[2] || process.env.PREVIEW_ORIGIN;
if (!rawOrigin) throw new Error("Pass a protected Preview URL: npm run audit:preview -- https://example.vercel.app");
const parsed = new URL(rawOrigin);
const origin = parsed.origin;
if (parsed.protocol !== "https:" || ["pixcloak.com", "www.pixcloak.com"].includes(parsed.hostname)) {
  throw new Error(`Preview audit requires a non-production HTTPS origin, received ${origin}`);
}

const checks = [];
const tempDirectory = mkdtempSync(path.join(tmpdir(), "pixcloak-preview-"));
const headerFile = path.join(tempDirectory, "headers.txt");
const bodyFile = path.join(tempDirectory, "body.txt");

function findLinkedProjectRoot(start) {
  let current = path.resolve(start);
  while (true) {
    const configPath = path.join(current, ".vercel", "project.json");
    if (existsSync(configPath)) {
      const config = JSON.parse(readFileSync(configPath, "utf8"));
      if (config.projectName === "pix-cloak") return current;
    }
    const parent = path.dirname(current);
    if (parent === current) throw new Error("No pix-cloak Vercel project link found in this directory or its parents");
    current = parent;
  }
}

const linkedProjectRoot = findLinkedProjectRoot(process.cwd());

function invocation(command, args) {
  if (process.platform === "win32" && ["npm", "vercel"].includes(command)) {
    return { command: process.env.ComSpec || "cmd.exe", args: ["/d", "/s", "/c", `${command}.cmd`, ...args], shell: false };
  }
  return { command, args, shell: false };
}

function run(name, command, args, env = {}, capture = false, cwd = process.cwd()) {
  const started = Date.now();
  const call = invocation(command, args);
  const childEnv = { ...process.env, ...env };
  if (childEnv.PIXCLOAK_CLEAN_NPM_ENV === "true") {
    delete childEnv.PIXCLOAK_CLEAN_NPM_ENV;
    for (const key of Object.keys(childEnv)) {
      if (key.toLowerCase().startsWith("npm_")) delete childEnv[key];
    }
  }
  const result = spawnSync(call.command, call.args, {
    env: childEnv,
    encoding: capture ? "utf8" : undefined,
    stdio: capture ? "pipe" : "inherit",
    shell: call.shell,
    cwd,
  });
  const record = { name, ok: result.status === 0, durationSeconds: Number(((Date.now() - started) / 1000).toFixed(1)) };
  checks.push(record);
  if (!record.ok) throw new Error(`${name} failed with exit code ${result.status}${result.error ? `: ${result.error.message}` : ""}`);
  return result;
}

try {
  run("protected preview session", "vercel", [
    "curl", "/?x-vercel-set-bypass-cookie=true", "--deployment", origin,
    "--silent", "--show-error", "--dump-header", headerFile, "--output", bodyFile, "--yes",
  ], { PIXCLOAK_CLEAN_NPM_ENV: "true", INIT_CWD: linkedProjectRoot }, false, linkedProjectRoot);

  const headers = readFileSync(headerFile, "utf8");
  const cookie = headers.match(/^set-cookie:\s*(_vercel_jwt=[^;\r\n]+)/im)?.[1];
  if (!cookie) {
    const statuses = [...headers.matchAll(/^HTTP\/[^\r\n]+/gim)].map((match) => match[0]);
    const cookieNames = [...headers.matchAll(/^set-cookie:\s*([^=;\r\n]+)=/gim)].map((match) => match[1]);
    throw new Error(`Vercel did not issue a protected Preview session cookie (status: ${statuses.join(", ") || "unknown"}; cookies: ${cookieNames.join(", ") || "none"})`);
  }

  const response = await fetch(origin, { headers: { cookie }, redirect: "manual" });
  if (response.status !== 200) throw new Error(`Protected Preview root returned ${response.status}`);
  if (!/noindex/i.test(response.headers.get("x-robots-tag") || "")) {
    throw new Error("Preview is not protected by a noindex response header");
  }
  checks.push({ name: "preview protection", ok: true, durationSeconds: 0 });

  const sharedEnv = { TEST_COOKIE: cookie, TEST_ORIGIN: origin };
  const analyticsOnly = process.env.PREVIEW_AUDIT_ANALYTICS_ONLY === "true";
  if (!analyticsOnly) {
    run("remote launch audit", "npm", ["run", "audit:launch"], { ...sharedEnv, ALLOW_PREVIEW_NOINDEX: "true" });
    run("remote image workflows", "npm", ["run", "test:e2e"], { ...sharedEnv, PIXCLOAK_E2E_URL: origin });
    run("remote browser compatibility", "npm", ["run", "test:compat"], sharedEnv);
  }
  if (analyticsOnly || process.env.EXPECT_ANALYTICS === "true") {
    run("remote analytics consent gate", "npm", ["run", "test:analytics-consent"], sharedEnv);
  }
  if (!analyticsOnly) run("remote performance gates", "npm", ["run", "test:performance"], sharedEnv);
  console.log(JSON.stringify({ ok: true, origin, checks }, null, 2));
} catch (error) {
  console.error(JSON.stringify({ ok: false, origin, error: error instanceof Error ? error.message : String(error), checks }, null, 2));
  process.exitCode = 1;
} finally {
  rmSync(tempDirectory, { recursive: true, force: true });
}
