import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("one non-placeholder IndexNow verification key is published", async () => {
  const publicDirectory = new URL("../public/", import.meta.url);
  const candidates = (await readdir(publicDirectory))
    .filter((name) => /^[a-zA-Z0-9_-]{16,128}\.txt$/.test(name))
    .filter((name) => !["robots.txt"].includes(name));
  assert.equal(candidates.length, 1, `expected one IndexNow key file, found ${candidates.join(", ") || "none"}`);
  const key = candidates[0].replace(/\.txt$/, "");
  assert.doesNotMatch(key, /replace|placeholder|1z2x3c4v|pixcloak-key/i);
  assert.equal((await readFile(new URL(`../public/${candidates[0]}`, import.meta.url), "utf8")).trim(), key);
});
