# PixCloak

Privacy & Performance toolkit: compress and redact images entirely in your browser. No upload. No tracking.

- Repo: https://github.com/LeeJinMing/PixCloak

## Features

- Image compress: batch, target size (KB), format (JPEG/WebP/PNG), resize (longest or exact WxH), ZIP export
- Image redact: manual boxes, solid/pixelate, EXIF/GPS removed on export, batch ZIP, presets, shortcuts
- PWA offline, robots.txt, sitemap.xml, guides and templates

## Privacy

- All processing happens locally in your browser (no server upload)
- Export uses re-encode to remove EXIF/GPS

## Development

```bash
npm i
npm run dev
```

## License

- Core is released under AGPL-3.0-only (see LICENSE)
- Commercial modules (batch limits lift, template packs, compliance reports, CLI/API, team/white-label) are available under a separate commercial license (see COMMERCIAL.md)
