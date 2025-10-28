import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

// 模板文件映射
const templateFiles = {
  "instagram-pack-psd": {
    filename: "instagram-templates.psd",
    contentType: "application/octet-stream",
    size: "2.1MB",
  },
  "instagram-pack-pdf": {
    filename: "instagram-guidelines.pdf",
    contentType: "application/pdf",
    size: "0.8MB",
  },
  "instagram-pack-json": {
    filename: "instagram-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
  "facebook-pack-ai": {
    filename: "facebook-templates.ai",
    contentType: "application/octet-stream",
    size: "3.2MB",
  },
  "facebook-pack-pdf": {
    filename: "facebook-guidelines.pdf",
    contentType: "application/pdf",
    size: "1.1MB",
  },
  "facebook-pack-json": {
    filename: "facebook-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
  "linkedin-pack-psd": {
    filename: "linkedin-templates.psd",
    contentType: "application/octet-stream",
    size: "1.8MB",
  },
  "linkedin-pack-pdf": {
    filename: "linkedin-guidelines.pdf",
    contentType: "application/pdf",
    size: "0.9MB",
  },
  "linkedin-pack-json": {
    filename: "linkedin-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
  "resume-pack-psd": {
    filename: "resume-templates.psd",
    contentType: "application/octet-stream",
    size: "1.5MB",
  },
  "resume-pack-pdf": {
    filename: "cv-guidelines.pdf",
    contentType: "application/pdf",
    size: "0.7MB",
  },
  "resume-pack-json": {
    filename: "professional-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
  "government-pack-pdf": {
    filename: "government-templates.pdf",
    contentType: "application/pdf",
    size: "2.3MB",
  },
  "government-pack-pdf-guidelines": {
    filename: "id-photo-guidelines.pdf",
    contentType: "application/pdf",
    size: "0.6MB",
  },
  "government-pack-json": {
    filename: "official-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
  "hero-pack-psd": {
    filename: "hero-templates.psd",
    contentType: "application/octet-stream",
    size: "4.1MB",
  },
  "hero-pack-pdf": {
    filename: "web-guidelines.pdf",
    contentType: "application/pdf",
    size: "1.2MB",
  },
  "hero-pack-json": {
    filename: "web-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
  "email-pack-psd": {
    filename: "email-templates.psd",
    contentType: "application/octet-stream",
    size: "2.8MB",
  },
  "email-pack-pdf": {
    filename: "email-guidelines.pdf",
    contentType: "application/pdf",
    size: "0.9MB",
  },
  "email-pack-json": {
    filename: "email-presets.json",
    contentType: "application/json",
    size: "0.1MB",
  },
};

// 生成示例JSON预设
const generatePresetJSON = (platform: string) => {
  const presets = {
    instagram: {
      feed: { size: "1080x1080", kb: 500, format: "webp", quality: 85 },
      story: { size: "1080x1920", kb: 800, format: "webp", quality: 80 },
      reels: { size: "1080x1920", kb: 800, format: "webp", quality: 80 },
    },
    facebook: {
      post: { size: "1200x630", kb: 500, format: "webp", quality: 85 },
      cover: { size: "1200x630", kb: 500, format: "webp", quality: 85 },
      ad: { size: "1200x628", kb: 500, format: "webp", quality: 85 },
    },
    linkedin: {
      profile: { size: "400x400", kb: 200, format: "jpg", quality: 90 },
      post: { size: "1200x627", kb: 500, format: "webp", quality: 85 },
      company: { size: "300x300", kb: 150, format: "jpg", quality: 90 },
    },
    resume: {
      photo: { size: "300x300", kb: 150, format: "jpg", quality: 95 },
      headshot: { size: "400x400", kb: 200, format: "jpg", quality: 90 },
    },
    government: {
      id: { size: "600x600", kb: 500, format: "jpg", quality: 95 },
      passport: { size: "600x600", kb: 500, format: "jpg", quality: 95 },
    },
    web: {
      hero: { size: "1920x1080", kb: 800, format: "webp", quality: 85 },
      banner: { size: "1200x400", kb: 400, format: "webp", quality: 85 },
    },
    email: {
      header: { size: "600x200", kb: 100, format: "jpg", quality: 85 },
      banner: { size: "600x300", kb: 150, format: "jpg", quality: 85 },
    },
  };

  return JSON.stringify(
    presets[platform as keyof typeof presets] || {},
    null,
    2
  );
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templateId = searchParams.get("id");
  const format = searchParams.get("format");

  if (!templateId) {
    return NextResponse.json(
      { error: "Template ID required" },
      { status: 400 }
    );
  }

  // 构建文件标识符
  const fileKey = `${templateId}-${format}`;
  const templateInfo = templateFiles[fileKey as keyof typeof templateFiles];

  if (!templateInfo) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  try {
    // 对于JSON文件，生成动态内容
    if (format === "json") {
      const jsonContent = generatePresetJSON(templateId);
      return new NextResponse(jsonContent, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${templateInfo.filename}"`,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // 对于其他文件，尝试从public目录读取
    const filePath = join(
      process.cwd(),
      "public",
      "templates",
      templateInfo.filename
    );

    if (!existsSync(filePath)) {
      // 如果文件不存在，返回占位符内容
      let placeholderContent = "";
      let contentType = templateInfo.contentType;

      if (format === "pdf") {
        placeholderContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(PixCloak Template Guidelines) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
297
%%EOF`;
      } else if (format === "psd" || format === "ai") {
        // 返回一个简单的占位符文件
        placeholderContent =
          "PixCloak Template Placeholder - Download the full template from our website";
        contentType = "text/plain";
      }

      return new NextResponse(placeholderContent, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${templateInfo.filename}"`,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // 读取实际文件
    const fileContent = readFileSync(filePath);

    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": templateInfo.contentType,
        "Content-Disposition": `attachment; filename="${templateInfo.filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Template download error:", error);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

// 处理POST请求（批量下载）
export async function POST(request: NextRequest) {
  try {
    const { templates } = await request.json();

    if (!Array.isArray(templates)) {
      return NextResponse.json(
        { error: "Templates array required" },
        { status: 400 }
      );
    }

    // 生成批量下载的ZIP文件
    const zipContent = generateBulkZip(templates);

    return new NextResponse(zipContent, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="pixcloak-templates.zip"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Bulk download error:", error);
    return NextResponse.json(
      { error: "Bulk download failed" },
      { status: 500 }
    );
  }
}

// 生成批量ZIP文件（简化版本）
function generateBulkZip(templates: string[]) {
  // 这里应该使用实际的ZIP库，如archiver或yazl
  // 为了演示，我们返回一个简单的文本文件
  const zipContent = `PixCloak Templates Bulk Download
===============================

Requested templates: ${templates.join(", ")}

This is a placeholder for the actual ZIP file.
In production, this would contain all the requested template files.

Download individual templates from:
https://pixcloak.com/templates

Generated: ${new Date().toISOString()}`;

  return zipContent;
}
