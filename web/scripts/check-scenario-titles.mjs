/**
 * 检查 seo-scenarios.ts 中所有标题的长度
 * 并为每个标题添加 " | PixCloak" 后缀
 */

import { scenarios } from "../lib/seo-scenarios.ts";

console.log("📊 Scenario 标题长度检查\n");
console.log('SEO 最佳实践：55-60 字符（含品牌后缀 " | PixCloak"）\n');
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

let tooLong = 0;
let perfect = 0;
let needsAdjustment = 0;

scenarios.forEach((s, i) => {
  const currentTitle = s.title;
  const withBrand = currentTitle.includes(" | PixCloak")
    ? currentTitle
    : `${currentTitle} | PixCloak`;
  const length = withBrand.length;

  let status = "";
  let icon = "";

  if (length > 60) {
    status = `⚠️  太长 (${length}字符，需要缩短到 ≤60)`;
    icon = "⚠️";
    tooLong++;
    needsAdjustment++;
  } else if (length >= 55 && length <= 60) {
    status = `✅ 完美 (${length}字符)`;
    icon = "✅";
    perfect++;
  } else if (length < 55) {
    status = `📝 偏短 (${length}字符，可以增加到 55-60)`;
    icon = "📝";
    needsAdjustment++;
  }

  console.log(`${icon} [${String(i + 1).padStart(2, "0")}] ${s.slug}`);
  console.log(`   当前: ${currentTitle}`);
  if (!currentTitle.includes(" | PixCloak")) {
    console.log(`   建议: ${withBrand}`);
  }
  console.log(`   长度: ${length} 字符 - ${status}`);
  console.log("");
});

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("📈 统计汇总：\n");
console.log(`   总场景数: ${scenarios.length}`);
console.log(
  `   ✅ 完美 (55-60字符): ${perfect} (${(
    (perfect / scenarios.length) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `   ⚠️  太长 (>60字符): ${tooLong} (${(
    (tooLong / scenarios.length) *
    100
  ).toFixed(1)}%)`
);
console.log(
  `   📝 需要调整: ${needsAdjustment} (${(
    (needsAdjustment / scenarios.length) *
    100
  ).toFixed(1)}%)`
);
console.log("");

if (needsAdjustment > 0) {
  console.log(`💡 需要修复 ${needsAdjustment} 个标题`);
  process.exit(1);
} else {
  console.log("🎉 所有标题都符合 SEO 最佳实践！");
  process.exit(0);
}
