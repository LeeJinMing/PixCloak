const origin = (process.env.LIVE_ORIGIN || "https://pixcloak.com").replace(/\/$/, "");
const parsed = new URL(origin);

if (parsed.protocol !== "https:" || parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
  throw new Error(`LIVE_ORIGIN must be a public HTTPS origin, received ${origin}`);
}

process.env.TEST_ORIGIN = origin;
console.log(`Auditing deployed release at ${origin}`);
await import("../tests/launch-web-audit.mjs");
