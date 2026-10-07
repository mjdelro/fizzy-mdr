# Fizzy MDR

A customized **Ghost 6** theme based on [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang, maintained for [michaeldelrosar.io](https://michaeldelrosar.io).

Current release: **2.6.0**

## Features

- Editorial homepage with a manually controlled featured carousel and supporting cards
- Persistent light/dark mode with matching native Ghost search
- Responsive feature images and YouTube embeds
- Self-hosted Charis 7 article typography
- Atkinson Hyperlegible Next supporting typography
- IBM Plex Sans headings and UI
- Atkinson Hyperlegible Mono code
- Vanilla JavaScript carousel and table of contents
- Dark-mode coverage for Ghost cards, tables, code, archives, and TOC
- Ghost Admin settings for showcase, TOC, and code line numbers
- GScan validation in the GitHub Actions deployment workflow
- Vendored, reusable SVG icon partials with no runtime icon-library dependency
- Highlight-to-translate passages with desktop selection, touch, and keyboard support

## Highlight to translate

Add translatable Tagalog text with an HTML card in the Ghost editor. The English translation stays hidden until a reader selects the Tagalog passage on desktop, taps it on a touch device, or focuses it and presses Enter or Space. The theme reads the translation only from `data-translation` and inserts it as plain text.

### Whole paragraph

```html
<p class="translate-on-select"
   data-translation="In the surge of love, the heart beat softly.">
  Sa silakbo ng pagmamahal, pumintig ang puso nang marahan.
</p>
```

### Short phrase inside a paragraph

```html
<p>
  Narinig ko ang
  <span class="translate-on-select"
        data-translation="the heart's quiet longing">
    tahimik na pananabik ng puso
  </span>
  sa kanyang tinig.
</p>
```

### Apostrophes and quotation marks

Use double quotes around the attribute when the translation contains an apostrophe:

```html
<span class="translate-on-select"
      data-translation="The heart's quiet longing.">
  Ang tahimik na pananabik ng puso.
</span>
```

Encode double quotation marks inside the translation as `&quot;`. Ghost preserves this standard HTML entity and the tooltip displays a normal quotation mark:

```html
<span class="translate-on-select"
      data-translation="She said, &quot;Wait for me.&quot;">
  Sinabi niya, “Hintayin mo ako.”
</span>
```

Keep the reader-visible Tagalog inside the element and the manually written English in `data-translation`. Do not put HTML inside the attribute. If a passage contains a link or another control, that control keeps its normal behavior; readers can still select and copy the Tagalog text.

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
- Replaced the looping carousel with manual edge controls and a maximum of five position pips while preserving its right-to-left transition.

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

- **Show Showcase**: show the homepage editorial showcase
- **Show Toc**: generate an H2/H3 table of contents on posts
- **Line Numbers**: show Prism line numbers on code blocks

Legacy Code Injection variables for these features are no longer required.

## Internal Tags

- `#carousel`: include a post in the homepage carousel
- `#noindex`: exclude a post from standard listing templates

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.

## Credits

Original theme: [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang.  
Customized and maintained by [Michael del Rosario](https://michaeldelrosar.io).

## License

Theme code is licensed under the MIT License. See [LICENSE](./LICENSE).

The bundled Charis webfonts remain licensed under the SIL Open Font License, Version 1.1. See [assets/fonts/charis/OFL.txt](./assets/fonts/charis/OFL.txt).
