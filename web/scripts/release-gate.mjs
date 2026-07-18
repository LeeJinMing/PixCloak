import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:net";
import process from "node:process";

const checks = [];

function npmInvocation(args) {
  if (process.platform === "win32") return { command: process.env.ComSpec || "cmd.exe", args: ["/d", "/s", "/c", "npm.cmd", ...args] };
  return { command: "npm", args };
}

function run(name, args, env = {}) {
  const started = Date.now();
  const invocation = npmInvocation(args);
  const result = spawnSync(invocation.command, invocation.args, { stdio: "inherit", env: { ...process.env, ...env } });
  const record = { name, ok: result.status === 0, durationSeconds: Number(((Date.now() - started) / 1000).toFixed(1)) };
  checks.push(record);
  if (!record.ok) throw new Error(`${name} failed with exit code ${result.status}${result.error ? `: ${result.error.message}` : ""}`);
}

async function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close(() => resolvePort(port));
    });
  });
}

async function waitForServer(origin, child, output) {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Production server exited early.\n${output().slice(-4000)}`);
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 300));
  }
  throw new Error(`Production server did not become ready.\n${output().slice(-4000)}`);
}

function stopTree(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  else child.kill("SIGTERM");
}

let server;
let serverOutput = "";
try {
  run("candidate environment", ["run", "env:check"]);
  run("guide evidence generation", ["run", "guides:evidence"]);
  run("contracts", ["run", "test:contracts"]);
  run("lint", ["run", "lint"]);
  run("production build", ["run", "build"]);

  const port = await freePort();
  const origin = `http://127.0.0.1:${port}`;
  const serverInvocation = npmInvocation(["start", "--", "--port", String(port)]);
  server = spawn(serverInvocation.command, serverInvocation.args, { env: { ...process.env, NODE_ENV: "production" }, stdio: ["ignore", "pipe", "pipe"] });
  server.stdout.on("data", (chunk) => { serverOutput += chunk.toString(); });
  server.stderr.on("data", (chunk) => { serverOutput += chunk.toString(); });
  await waitForServer(origin, server, () => serverOutput);

  run("launch audit", ["run", "audit:launch"], { TEST_ORIGIN: origin });
  run("image workflows", ["run", "test:e2e"], { PIXCLOAK_E2E_URL: origin });
  run("browser compatibility", ["run", "test:compat"], { TEST_ORIGIN: origin });
  run("performance gates", ["run", "test:performance"], { TEST_ORIGIN: origin });
  console.log(JSON.stringify({ ok: true, checks }, null, 2));
} catch (error) {
  console.error(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error), checks, serverLogTail: serverOutput.slice(-4000) }, null, 2));
  process.exitCode = 1;
} finally {
  stopTree(server);
}
