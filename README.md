# Fizzy MDR

A customized Ghost 6 theme based on [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang, built for [michaeldelrosar.io](https://michaeldelrosar.io).

Current release: **2.2.0**

## Features

- Editorial homepage with carousel and featured cards
- Persistent light/dark mode
- Native Ghost search
- Responsive semantic feature images
- Atkinson Hyperlegible Next body typography
- IBM Plex Sans headings/UI
- Atkinson Hyperlegible Mono code
- Vanilla JavaScript carousel and TOC; no jQuery, Slick, jQuery UI, or Tocify
- Dark-mode support for Ghost cards, tables, code, archives, and TOC
- Accessible navigation controls and improved semantic markup
- Ghost 6 custom settings for showcase, TOC, and code line numbers

## Theme Settings

After activation, open **Settings → Design & branding → Theme** in Ghost Admin.

- **Show Showcase** — homepage editorial showcase
- **Show Toc** — generated H2/H3 table of contents
- **Line Numbers** — Prism code line numbers

Legacy Code Injection variables (`show_showcase`, `show_toc`, `line_numbers`, `show_search`, `search_key`, `search_url`) are no longer required.

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

GitHub Actions runs GScan before deploying the theme to Ghost.

## Credits

Original theme: [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang.  
Customized and maintained by [Michael del Rosario](https://michaeldelrosar.io).

## License

MIT. See [LICENSE](./LICENSE).
