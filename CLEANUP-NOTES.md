# Fizzy MDR Cleanup Notes

## 2.4.0 consistency refactor

- Consolidated desktop card height, image split, showcase gap, card shadows, pill geometry, and header-control geometry into shared design tokens.
- Replaced duplicated search/theme-toggle styling with a shared `header-control` component while preserving the circular hover/focus treatment.
- Added explicit category-pill variants for normal surfaces, image overlays, and icon-only tags so Bulma utility classes no longer determine their appearance.
- Standardized featured-marker height and the corner star marker against the pill sizing system.
- Reworked the two supporting showcase cards as a two-row grid tied to the same 300px showcase height.
- Replaced legacy homepage card scale/shadow utility classes with one `interactive-card` transition rule so hover motion and carousel animation no longer compete.
- Removed duplicated 38% image-column rules, stale wrapper selectors, and the obsolete `tag-icon-button` helper.
- Centralized card radii and shadows across list, showcase, related, and tag cards.
- Kept feature-image crop centering explicit and shared.
- Replaced the old undefined `var(--shadow)` reference with the existing theme border token.
- Synced direct hash scrolling to the same computed TOC offset used by JavaScript navigation.
- Preserved the current carousel direction/timing, TOC behavior, neutral dark palette, Ghost search treatment, and caption-break handling.

## 2.3.0 baseline cleanup

Version 2.3.0 standardizes the theme without intentionally changing its established appearance or interaction model.

- Consolidated shared colors, fonts, radii, and header-control geometry into CSS variables.
- Removed unused legacy Fizzy utilities, styles, icon partials, duplicate selectors, and obsolete browser prefixes.
- Deduplicated repeated listing markup into `partials/post-list.hbs`.
- Deduplicated repeated article-body markup into `partials/post/post_body.hbs`.
- Standardized header, footer, showcase, archive, author, tag, post, and pagination templates.
- Replaced static inline presentation styles with reusable theme classes where practical.
- Refactored `main.js` and `toc.js` for clearer lifecycle/state handling and reduced-motion behavior.
- Simplified the native Ghost search iframe stylesheet around shared light/dark variables.
- Reduced search DOM observation to the Sodo Search root once it exists.
- Corrected the Portuguese locale key mismatch and minor legacy CSS issues.
- Preserved the stable 5-second left-to-right carousel and frosted light/dark Ghost search treatment from 2.2.x.

## 2.3.4 icon follow-up

The icon cleanup was completed by moving remaining inline theme icons into reusable partials and separating outline UI icons from filled brand icons. The theme vendors only the SVG geometry it uses, so there is no runtime icon-library dependency.

## 2.3.5 dark-palette follow-up

Dark-mode surfaces were moved from green-biased charcoals to neutral grays/blacks. Ghost's configured accent color is reserved for accents rather than background surfaces so photographic and screenshot content is framed neutrally.


## 2.3.6 caption follow-up

- Added a narrow caption rule for Ghost image and gallery cards so author-entered line breaks render on the frontend without preserving arbitrary runs of spaces.


## 2.3.7 caption-marker follow-up

- Added a theme-side `\n` marker for reliable image/gallery caption breaks when Ghost flattens editor soft returns during publishing.
- Conversion is limited to caption text nodes and preserves existing inline formatting.

## 2.3.8 presentation follow-up

- Standardized shared category/tag pill geometry across cards, article tags, and showcase labels while leaving widths content-driven.
- Made feature-image crop centering explicit across card, hero, and showcase image classes.
## 2.3.9 compact list cards

- Desktop post-list cards now use a 300px presentation height instead of allowing feature-image proportions to make the card much taller than its short excerpt.
- Feature images fill the compact card and remain center-cropped.
- Mobile list cards retain their natural content-driven height.


## 2.3.10 TOC anchor offset

- TOC clicks now account for the fixed navbar height and leave approximately one line of space above the target heading.
- Section headings also use `scroll-margin-top` as a native hash-navigation fallback.

## 2.3.11 TOC responsiveness

- Replaced the narrow IntersectionObserver activation band with a frame-throttled scroll spy based on heading position.
- TOC links activate immediately on click and remain synchronized during smooth back-and-forth navigation.
