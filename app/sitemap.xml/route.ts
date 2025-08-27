import type { MetadataRoute } from 'next';

// Fallback route handler for /sitemap.xml to avoid build issues on some setups.
// Prefer the metadata route in app/sitemap.ts; this mirrors its output.
export async function GET(): Promise<Response> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pixcloak.com';
  const now = new Date().toISOString();
  // Keep this minimal: link to homepage and key sections; the full list is in app/sitemap.ts
  const urls: string[] = [
    '/', '/compress', '/redact', '/templates', '/tools', '/press', '/guides'
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((u) => `<url><loc>${base}${u}</loc><lastmod>${now}</lastmod></url>`).join('') +
    `</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

export const dynamic = 'force-static';


