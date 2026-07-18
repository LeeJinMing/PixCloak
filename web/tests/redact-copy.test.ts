import assert from "node:assert/strict";
import test from "node:test";
import { compressEn, compressZh } from "../lib/i18n/compress.ts";
import { redactEn, redactZh } from "../lib/i18n/redact.ts";

test("redaction copy matches the three modes and verified metadata scope", () => {
  for (const strings of [redactEn, redactZh]) {
    assert.match(strings.intro, /blur|模糊/i);
    assert.match(strings.shortcutSpace, /blur|模糊/i);
    assert.match(strings.removeExif, /EXIF/i);
    assert.match(strings.removeExif, /GPS/i);
    assert.match(strings.removeExif, /XMP/i);
    assert.match(strings.removeExif, /IPTC/i);
  }
});

test("compression copy distinguishes Canvas stripping from explicit metadata verification", () => {
  for (const strings of [compressEn, compressZh]) {
    assert.doesNotMatch(strings.faq.map((item) => item.a).join(" "), /PWA/i);
    assert.match(strings.exifNote, /EXIF/i);
    assert.match(strings.exifNote, /GPS/i);
    assert.match(strings.exifNote, /XMP/i);
    assert.match(strings.exifNote, /IPTC/i);
    assert.match(strings.exifNote, /Safe Share/i);
  }
});
