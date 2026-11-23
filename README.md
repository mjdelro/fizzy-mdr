<p align="center">
  <img src="assets/repo-icon.png" alt="Fizzy MDR Icon" width="104" height="104" />
</p>

<h1 align="center">Fizzy MDR</h1>

<p align="center">A fast, self-hosted Ghost 6 theme forked from Fizzy and tailored for <a href="https://michaeldelrosar.io">michaeldelrosar.io</a>.</p>

<p align="center">
  <a href="https://github.com/mjdelro/fizzy-mdr/releases/latest"><img src="https://img.shields.io/github/v/release/mjdelro/fizzy-mdr?style=flat-square&color=347a45" alt="Latest release" /></a>
  <a href="https://michaeldelrosar.io"><img src="https://img.shields.io/badge/live-michaeldelrosar.io-347a45?style=flat-square" alt="Live site" /></a>
  <img src="https://img.shields.io/badge/Ghost-6.x-1c1d20?style=flat-square&logo=ghost&logoColor=white" alt="Ghost 6.x" />
  <img src="https://img.shields.io/github/license/mjdelro/fizzy-mdr?style=flat-square&color=635f57" alt="License" />
</p>

---

**Fizzy MDR** (current release: **3.0.3**) is a customized Ghost 6 theme based on [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang. See [DESIGN.md](./DESIGN.md) for the design system and [CHANGELOG.md](./CHANGELOG.md) for full release history.

## Highlights

- **Warm Paper & Warm Coal palettes:** Evidence-based light (`#f6f2e9`) and dark (`#1c1d20`) surfaces verified to WCAG AA contrast across prose, UI, Sodo Search, and dual-polarity Prism syntax highlighting.
- **3-state Theme Toggle:** Cycles `System` / `Light` / `Dark` and stays synced with OS day/night changes.
- **Zero render-blocking third-party CDNs:** Bulma-free self-hosted `base.css` (`~15 KB`) and self-hosted Latin-subsetted WOFF2 fonts (`Charis`, `Atkinson Hyperlegible Next`, and `Intel One Mono`).
- **On-demand post assets:** Prism syntax highlighting and `fslightbox` image lightboxes load only on posts that use them; KaTeX CSS loads non-blocking.
- **Accessibility & print:** Keyboard skip-to-content link, single `<main>` landmark, reduced-motion support, footer RSS feed link, brand-accent `theme-color` for Discord/social embeds, and a clean `@media print` stylesheet.
- **Vanilla JS & vendored SVG icons:** Manual featured carousel, H2/H3 table of contents, highlight-to-translate tooltips, and local icon partials under `partials/icons/` (see [ICON-SOURCES.md](./ICON-SOURCES.md)).

## Theme Settings

After activating the theme in Ghost Admin (**Settings → Design & branding → Theme**):

- **Show Showcase:** Display the homepage featured carousel and supporting cards.
- **Show Toc:** Generate an H2/H3 table of contents on posts.
- **Line Numbers:** Show Prism line numbers on code blocks.

### Internal Tags

- `#carousel`: Include a post in the homepage featured carousel.
- `#noindex`: Exclude a post from standard listing templates.

## Authoring Helpers

### Highlight to Translate

Wrap Tagalog text in an HTML card with `class="translate-on-select"` and a plain-text `data-translation` attribute. Readers reveal the English translation by selecting the text on desktop, tapping on touch devices, or focusing and pressing `Enter`/`Space`:

```html
<p class="translate-on-select"
   data-translation="In the surge of love, the heart beat softly.">
  Sa silakbo ng pagmamahal, pumintig ang puso nang marahan.
</p>
```

Encode double quotes inside `data-translation` as `&quot;`. Inline `<span class="translate-on-select" data-translation="...">...</span>` is also supported.

### Caption Line Breaks

Ghost flattens `Shift+Enter` inside image and gallery captions. Type a literal `\n` to force a line break:

```text
First line\nSecond line
```

## Development & Deployment

Validate Ghost 6 compatibility locally with GScan:

```bash
npm test
```

Pushing to `main` runs `.github/workflows/deploy-theme.yml`, which validates the theme with GScan, packages `fizzy-mdr.zip`, and uploads/activates it via the Ghost Admin API. Required repository secrets: `GHOST_ADMIN_API_URL`, `GHOST_ADMIN_API_KEY` (and optional `CF_ACCESS_CLIENT_ID` / `CF_ACCESS_CLIENT_SECRET` when `/ghost` is behind Cloudflare Access).

## Credits & License

- Original theme: [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang
- Customized and maintained by [Michael del Rosario](https://michaeldelrosar.io)
- Licensed under the [MIT License](./LICENSE)
