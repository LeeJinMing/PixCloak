import { spawn, spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { createServer } from "node:net";
import process from "node:process";

const distDir = ".next";
const env = {
  ...process.env,
  NODE_ENV: "production",
  VERCEL_ENV: "production",
  NEXT_PUBLIC_SITE_URL: "https://pixcloak.com",
  NEXT_PUBLIC_ANALYTICS: "true",
  NEXT_PUBLIC_ADSENSE: "true",
  NEXT_PUBLIC_GOOGLE_CMP_READY: "true",
  NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-1234567890123456",
  NEXT_PUBLIC_ADSENSE_SLOT: "1234567890",
};

function npmInvocation(args) {
  if (process.platform === "win32") return { command: process.env.ComSpec || "cmd.exe", args: ["/d", "/s", "/c", "npm.cmd", ...args] };
  return { command: "npm", args };
}

function run(args, extraEnv = {}, baseEnv = env) {
  const invocation = npmInvocation(args);
  const result = spawnSync(invocation.command, invocation.args, { stdio: "inherit", env: { ...baseEnv, ...extraEnv } });
  if (result.status !== 0) throw new Error(`npm ${args.join(" ")} failed with exit code ${result.status}`);
}

async function freePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => resolve(port));
    });
  });
}

async function waitForServer(origin, child) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error("Ads audit server exited early");
    try {
      if ((await fetch(origin)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error("Ads audit server did not become ready");
}

function stopTree(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  else child.kill("SIGTERM");
}

let server;
try {
  await rm(distDir, { recursive: true, force: true });
  run(["run", "build"]);
  const port = await freePort();
  const origin = `http://127.0.0.1:${port}`;
  const invocation = npmInvocation(["start", "--", "--port", String(port)]);
  server = spawn(invocation.command, invocation.args, { env, stdio: "ignore" });
  await waitForServer(origin, server);
  const smoke = spawnSync(process.execPath, ["./tests/ad-qualified-smoke.mjs"], { stdio: "inherit", env: { ...env, TEST_ORIGIN: origin } });
  if (smoke.status !== 0) throw new Error(`ads-qualified smoke failed with exit code ${smoke.status}`);
} finally {
  stopTree(server);
  await rm(distDir, { recursive: true, force: true });
  run(["run", "build"], {}, process.env);
}
