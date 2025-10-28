import { NextRequest, NextResponse } from "next/server";
import { readdirSync, statSync, readFileSync } from "fs";
import { join, dirname } from "path";

// 获取所有页面的变更信息
async function getPageChanges() {
  const appDir = join(process.cwd(), "app");
  const changes: Array<{
    url: string;
    title: string;
    lastModified: string;
    changeType: "new" | "updated" | "content";
  }> = [];

  // 递归查找所有页面
  function findPages(dir: string, basePath = "") {
    const pages: Array<{ path: string; fullPath: string }> = [];
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relativePath = join(basePath, entry.name);

      if (entry.isDirectory()) {
        pages.push(...findPages(fullPath, relativePath));
      } else if (entry.isFile() && entry.name === "page.tsx") {
        pages.push({ path: relativePath, fullPath });
      }
    }

    return pages;
  }

  const allPages = findPages(appDir);

  for (const page of allPages) {
    try {
      const stats = statSync(page.fullPath);
      const content = readFileSync(page.fullPath, "utf-8");

      // 提取标题
      const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
      const title = titleMatch ? titleMatch[1] : "Untitled Page";

      // 构建URL
      const url =
        "/" + page.path.replace(/\/page\.tsx$/, "").replace(/\\/g, "/");

      // 确定变更类型
      let changeType: "new" | "updated" | "content" = "updated";
      if (
        url.includes("/scenarios") ||
        url.includes("/embed") ||
        url.includes("/benchmark") ||
        url.includes("/templates")
      ) {
        changeType = "new";
      } else if (url.includes("/guides/")) {
        changeType = "content";
      }

      changes.push({
        url,
        title,
        lastModified: stats.mtime.toISOString(),
        changeType,
      });
    } catch (error) {
      console.error(`Error processing ${page.path}:`, error);
    }
  }

  return changes.sort(
    (a, b) =>
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );
}

// 生成RSS XML
function generateRSS(
  changes: Array<{
    url: string;
    title: string;
    lastModified: string;
    changeType: "new" | "updated" | "content";
  }>
) {
  const baseUrl = "https://pixcloak.com";
  const siteTitle = "PixCloak - Image Compression Tools";
  const siteDescription =
    "Free image compression and privacy tools. All processing happens locally in your browser.";

  const rssItems = changes
    .slice(0, 50)
    .map((change) => {
      const changeDescription = {
        new: "New feature or tool added",
        updated: "Page updated with new content",
        content: "Content improved or expanded",
      }[change.changeType];

      return `
    <item>
      <title>${change.title}</title>
      <link>${baseUrl}${change.url}</link>
      <description>${changeDescription} - ${change.title}</description>
      <pubDate>${new Date(change.lastModified).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}${change.url}</guid>
      <category>${change.changeType}</category>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${baseUrl}</link>
    <description>${siteDescription}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/changelog.xml" rel="self" type="application/rss+xml"/>
    <generator>PixCloak Changelog Generator</generator>
    ${rssItems}
  </channel>
</rss>`;
}

// 生成变更日志JSON
function generateChangelogJSON(
  changes: Array<{
    url: string;
    title: string;
    lastModified: string;
    changeType: "new" | "updated" | "content";
  }>
) {
  const groupedChanges = changes.reduce((acc, change) => {
    const date = new Date(change.lastModified).toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(change);
    return acc;
  }, {} as Record<string, typeof changes>);

  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalChanges: changes.length,
      version: "1.0.0",
    },
    changes: Object.entries(groupedChanges)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 30) // 最近30天的变更
      .map(([date, dayChanges]) => ({
        date,
        count: dayChanges.length,
        changes: dayChanges.map((change) => ({
          url: change.url,
          title: change.title,
          type: change.changeType,
          timestamp: change.lastModified,
        })),
      })),
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "rss";

  try {
    const changes = await getPageChanges();

    if (format === "json") {
      const changelog = generateChangelogJSON(changes);
      return new NextResponse(JSON.stringify(changelog, null, 2), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // 默认返回RSS格式
    const rssContent = generateRSS(changes);
    return new NextResponse(rssContent, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Changelog generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate changelog" },
      { status: 500 }
    );
  }
}
