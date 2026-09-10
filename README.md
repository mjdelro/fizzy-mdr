# Fizzy MDR

A customized **Ghost 6** theme based on [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang, built for [michaeldelrosar.io](https://michaeldelrosar.io).

Current release: **2.2.4**

## Features

- Editorial homepage with carousel and featured cards
- Persistent light/dark mode
- Native Ghost search
- Responsive semantic feature images
- Responsive native YouTube embeds
- Atkinson Hyperlegible Next body typography
- IBM Plex Sans headings and UI
- Atkinson Hyperlegible Mono for code
- Vanilla JavaScript carousel and TOC
- Dark-mode support for Ghost cards, tables, code, archives, and TOC
- Ghost Admin settings for showcase, TOC, and code line numbers

## 2.2 Modernization

Version **2.2.0** modernized Fizzy MDR for Ghost 6:

- Updated compatibility to Ghost 6
- Replaced the old Content API search with native Ghost search
- Removed jQuery, Slick, jQuery UI, and Tocify
- Rebuilt the carousel and TOC in vanilla JavaScript
- Added Ghost Admin custom theme settings
- Added responsive `srcset` feature images and improved image loading behavior
- Improved semantic HTML and accessibility
- Optimized archive queries for Ghost 6
- Updated PrismJS to 1.30.0 and KaTeX to 0.18.1
- Replaced the external icon font with inline SVG icons
- Consolidated showcase styling for consistent light/dark geometry
- Updated GitHub Actions with GScan validation and current Ghost deployment actions

Later 2.2.x releases refined the header controls, responsive YouTube embeds, and showcase click behavior.

## Theme Settings

After activation, open **Settings → Design & branding → Theme** in Ghost Admin.

- **Show Showcase** — homepage editorial showcase
- **Show Toc** — generated H2/H3 table of contents
- **Line Numbers** — Prism code line numbers

Legacy Code Injection variables for these features are no longer required.

## Internal Tags

- `#carousel` — adds a post to the homepage carousel
- `#noindex` — excludes a post from standard listing templates

## Development

```bash
git status
git diff
git add .
git diff --staged
git commit -m "Describe the change"
git push
```

GitHub Actions runs **GScan** before deploying the theme to Ghost.

See [CHANGELOG.md](./CHANGELOG.md) for full release history.

## Credits

Original theme: [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang.  
Customized and maintained by [Michael del Rosario](https://michaeldelrosar.io).

## License

MIT. See [LICENSE](./LICENSE).
