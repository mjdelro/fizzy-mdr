# Fizzy MDR

A customized **Ghost 6** theme based on [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang, maintained for [michaeldelrosar.io](https://michaeldelrosar.io).

Current release: **2.4.3**

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
- Vendored, reusable SVG icon partials with no runtime icon-library dependency

## 2.4 Consistency Refactor

Version **2.4.0** consolidates the presentation tweaks added throughout 2.3.x into a smaller set of shared component rules and design tokens.

- Header search and light/dark controls now share one `header-control` component, with a guaranteed circular hover/focus shape and transparent navbar wrappers.
- Category/tag pills now share one geometry, lowercase typography, light/dark colors, and accent hover treatment across cards, showcase images, and articles.
- Featured markers use the same compact vertical rhythm as other pills; the corner star marker is a consistent square.
- Desktop list cards and the homepage showcase share a single 300px presentation-height token.
- The list-card image/text split uses one image-width token instead of duplicated 38/62 rules.
- Top-right showcase cards use a two-row grid with the same shared gap token rather than separate height calculations.
- Homepage cards use one theme-owned interaction rule instead of stacked legacy scale/shadow utilities, preventing hover transforms from competing with carousel animation.
- Card radius and shadow values are centralized and reused across list cards, showcase cards, related cards, and tag cards.
- Feature-image centering is defined once for card, showcase, and hero images.
- Removed stale component selectors and an obsolete icon-button utility.
- Fixed an old undefined CSS `--shadow` reference in the upstream stylesheet.
- Native hash scrolling and TOC clicks now share the same computed header offset.
- Preserved the right-to-left 5-second carousel, neutral dark mode, caption `\n` support, and responsive TOC behavior.

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

The **2.3.1–2.3.11** patches preserved that cleanup while fixing header-control hover geometry, restoring the stable 5-second carousel animation, changing its travel direction to right-to-left, standardizing the theme icon system, moving dark-mode surfaces to neutral charcoal so photography and screenshots are framed without a green cast, adding reliable frontend caption breaks, standardizing category/tag pill geometry, explicitly centering feature-image crops, and making desktop article cards more compact so short excerpts do not leave large empty text areas, and making TOC highlighting track clicks and scrolling immediately.

## Icon System

Fizzy MDR keeps icons as local Handlebars partials under `partials/icons/`, so pages do not load an icon framework or icon JavaScript at runtime. Interface icons are standardized on Lucide; GitHub, Facebook, Twitch, Ko-fi, and X brand marks use Simple Icons; LinkedIn uses Bootstrap Icons because it is not distributed by current Simple Icons releases. See [ICON-SOURCES.md](./ICON-SOURCES.md) for source and license details.

## Caption Line Breaks

Ghost can flatten `Shift+Enter` soft breaks in image and gallery captions before the theme receives the published HTML. To force a frontend line break, type a literal `\n` in the caption:

```text
First line\nSecond line
```

Fizzy MDR converts that marker to a real `<br>` only inside Ghost image and gallery captions.

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
