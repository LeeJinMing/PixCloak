/** Matches root layout metadataBase / sitemap default. */
export function getSiteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com").replace(/\/$/, "");
}

/** Schema.org and OG prefer absolute URLs; paths are resolved against the site origin. */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return getSiteOrigin();
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${getSiteOrigin()}${path}`;
}
