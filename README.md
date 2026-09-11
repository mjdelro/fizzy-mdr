# Fizzy MDR

A customized **Ghost 6** theme based on [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang, maintained for [michaeldelrosar.io](https://michaeldelrosar.io).

Current release: **2.3.2**

## Features

- Editorial homepage with rotating featured carousel and supporting cards
- Persistent light/dark mode with matching native Ghost search
- Responsive feature images and YouTube embeds
- Atkinson Hyperlegible Next body typography
- IBM Plex Sans headings and UI
- Atkinson Hyperlegible Mono code
- Vanilla JavaScript carousel and table of contents
- Dark-mode coverage for Ghost cards, tables, code, archives, and TOC
- Ghost Admin settings for showcase, TOC, and code line numbers
- GScan validation in the GitHub Actions deployment workflow

## 2.3 Cleanup & Standardization

Version **2.3.0** was a broad maintenance and refactor release focused on making the theme easier to maintain without intentionally redesigning it.

- Consolidated shared CSS variables, component rules, and header controls
- Removed duplicate selectors, redundant declarations, obsolete prefixes, and unused legacy Fizzy styles
- Folded retained utility styles into the main stylesheet and removed an extra CSS request
- Removed unused icon partials and standardized typography-related template classes
- Replaced repeated post/list markup with reusable Handlebars partials
- Standardized the header, footer, navigation, showcase, archives, posts, author/tag pages, and pagination markup
- Removed unnecessary inline styling and redundant feature-image wrappers
- Simplified the light/dark Ghost search theme bridge and reduced unnecessary DOM observation
- Refactored carousel and TOC JavaScript for clearer, smaller theme-owned code
- Added `aria-current` handling and other semantic/accessibility improvements
- Cleaned locale inconsistencies and miscellaneous HTML/CSS issues
- Standardized package scripts and GitHub Actions validation around GScan

The **2.3.1** and **2.3.2** patches preserve that cleanup while fixing header-control hover geometry and restoring the stable 5-second left-to-right carousel animation.

## Theme Settings

After activation, open **Settings → Design & branding → Theme** in Ghost Admin.

- **Show Showcase** — show the homepage editorial showcase
- **Show Toc** — generate an H2/H3 table of contents on posts
- **Line Numbers** — show Prism line numbers on code blocks

Legacy Code Injection variables for these features are no longer required.

## Internal Tags

- `#carousel` — include a post in the homepage carousel
- `#noindex` — exclude a post from standard listing templates

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.

## Credits

Original theme: [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang.  
Customized and maintained by [Michael del Rosario](https://michaeldelrosar.io).

## License

MIT. See [LICENSE](./LICENSE).
