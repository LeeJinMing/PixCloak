# PixCloak Production Cutover Record — 2026-07-18

## Outcome

- Cutover completed at approximately `2026-07-18 21:33 +08:00`.
- `https://pixcloak.com` now resolves to Vercel deployment `dpl_BDPfGyh6PXbsWZnCVqCbXfKcRqF7`.
- Deployment URL: `https://pix-cloak-dvfgn4nds-leejinmings-projects.vercel.app`.
- Vercel target/status: `production` / `Ready`.
- No rollback was required.

## Safety configuration

- Production `NEXT_PUBLIC_ADSENSE=false`.
- Production `INDEXNOW_KEY=001a496c4107466fbca000201f39aeeb`.
- Live HTML reports `data-ads="off"`, `data-ads-available="false"`, and `data-analytics="off"`.
- No AdSense script is loaded, and the live CSP does not allow ad origins.
- HSTS and CSP are active.

## Verification evidence

- The protected Production candidate passed `npm run audit:preview -- https://pix-cloak-dvfgn4nds-leejinmings-projects.vercel.app`.
- Coverage: 34 indexable URLs, 24 tool routes, 17 image workflows, and Chrome/Edge/Firefox/WebKit.
- Candidate performance samples:
  - `/`: LCP 968 ms, CLS 0.
  - `/safe-share`: LCP 412 ms, CLS 0.
  - `/upload-ready`: LCP 368 ms, CLS 0.0261.
- After promotion, `npm run audit:live` passed all sitemap, link, redirect, noindex, and removed-URL contracts.
- The first live-audit attempt hit a transient 10-second Node connection timeout; DNS/HTTP checks succeeded and the immediate rerun passed.
- Vercel error-log query for the new deployment returned no error logs in the first 30 minutes.

## Search-engine actions

- GSC domain property: `sc-domain:pixcloak.com`.
- Re-submitted `https://pixcloak.com/sitemap.xml`; GSC refreshed it successfully to 14 URLs.
- Re-submitted `https://pixcloak.com/guides/sitemap.xml`; GSC refreshed it successfully to 20 URLs.
- Requested indexing for `https://pixcloak.com/`; GSC accepted the request.
- Requested indexing for `https://pixcloak.com/safe-share`; GSC accepted the request.
- Submitted 15 priority URLs to IndexNow:
  - `https://api.indexnow.org/indexnow`: HTTP 202.
  - `https://www.bing.com/indexnow`: HTTP 200.
  - `https://yandex.com/indexnow`: HTTP 202.

## URL migration contract

- New sitemap inventory: 34 URLs total (`14 + 20`).
- Old URL disposition inventory: 189 retired URLs.
  - 150 permanent redirects.
  - 26 noindex pages.
  - 13 removed/404 pages.
  - 0 unresolved URLs.
- Net indexed-surface reduction: 168 URLs.

## Rollback

- Previous Production deployment: `dpl_47knvnUBXypUByQG4qfaYVGaP43P`.
- Previous deployment URL: `https://pix-cloak-epxc39sew-leejinmings-projects.vercel.app`.
- Rollback command, if a later incident requires it:

```powershell
vercel rollback dpl_47knvnUBXypUByQG4qfaYVGaP43P --yes
```

After any rollback, rerun `npm run audit:live` and confirm the Production environment safety switches before leaving the incident.

## Source-control state

- This release was deployed from the local working tree.
- The release source has not yet been committed or pushed to GitHub.
- Do not treat GitHub as the recoverable source of this deployment until the current tree is reviewed, committed, and pushed intentionally.
