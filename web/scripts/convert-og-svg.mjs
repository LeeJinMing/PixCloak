#!/usr/bin/env node
/**
 * 将 og-image.svg 转换为 og.png
 * 需要安装: npm install sharp
 */

import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, "../public");

async function convertSvgToPng() {
  try {
    console.log("🎨 Converting og-image.svg to og.png...");

    const svgBuffer = readFileSync(join(publicDir, "og-image.svg"));

    await sharp(svgBuffer)
      .resize(1200, 630)
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(publicDir, "og.png"));

    console.log("✅ Successfully generated og.png (1200×630)");
    console.log("📍 Location: web/public/og.png");
    console.log("\n🔍 Next steps:");
    console.log("1. Verify the image looks good");
    console.log("2. Test with social media debuggers:");
    console.log("   - Facebook: https://developers.facebook.com/tools/debug/");
    console.log("   - Twitter: https://cards-dev.twitter.com/validator");
    console.log("3. Deploy to production");
  } catch (error) {
    console.error("❌ Error converting SVG to PNG:", error.message);
    console.log(
      "\n💡 Alternative: Use online converter at https://cloudconvert.com/svg-to-png"
    );
    process.exit(1);
  }
}

convertSvgToPng();
