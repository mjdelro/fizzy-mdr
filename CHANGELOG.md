# Changelog

## 2.3.2

- Restored the known-good 5-second left-to-right homepage carousel animation after the 2.3 cleanup pass suppressed it on systems reporting reduced motion.
- Kept the Web Animations API slide transition used by the stable 2.2.13 implementation.

## 2.3.1

- Removed the square navbar hover surface behind the desktop search and light/dark controls.
- Preserved the existing circular hover, border, and focus treatment on both controls.

## 2.3.0

### Changed
- Standardized theme CSS around shared color, typography, radius, and header-control tokens.
- Removed unused legacy Fizzy utilities/styles, obsolete browser prefixes, and unused icon partials.
- Consolidated repeated post-list and article-body markup into reusable partials.
- Standardized header, footer, showcase, archive, author, tag, post, and pagination templates.
- Replaced static inline presentation rules with reusable theme classes where practical.
- Refactored the main theme JavaScript and generated TOC code for clearer state/lifecycle handling.
- Simplified the native Ghost search iframe stylesheet using light/dark design variables.
- Reduced search MutationObserver scope after the Sodo Search root is available.
- Added an actual reduced-motion fallback to the carousel transition.
- Corrected a Portuguese locale key mismatch and minor legacy CSS issues.
- Preserved the stable 5-second left-to-right carousel and frosted theme-aware Ghost search behavior from 2.2.x.

### Fixed
- Corrected a legacy `width` typo and consolidated duplicate bookmark/tag-hover declarations.
- Improved icon-only author-profile link labels and pagination semantics.

> 2.3.0 is a cleanup/refactor release with no intentional visual redesign.

## 2.2.14

- Restyled native Ghost search as a frosted modal that keeps the publication visible underneath.
- Added a 10px backdrop blur with theme-aware light and dark dimming.
- Added light/dark search panel, input, result, border, hover, and highlight colors that follow Fizzy MDR's palette.
- Added live theme synchronization for Ghost's Sodo Search iframe.

## 2.2.13

- Reverted the experimental page-turn/page-peel carousel transitions to the proven transform-based slide animation.
- Carousel posts now advance left-to-right: the current post exits to the right while the next post enters from the left.
- Retained the 5-second autoplay, focus/visibility pause behavior, and reduced-motion fallback.

## 2.2.12

- Replaced the unreliable clip-path page-peel with a transform-only right-to-left page-turn effect.
- The outgoing carousel card now folds toward its left edge using scale/skew, shadow, brightness, and opacity while the next post is revealed underneath.
- Avoided animated `clip-path` and `preserve-3d` so the transition remains reliable in Firefox as well as Chromium.

## 2.2.11

- Replaced the unreliable 3D carousel flip with a Firefox-safe right-to-left page-peel animation.
- Added an angled clipping edge and moving fold shadow so the next carousel post is revealed like a turning page.
- Preserved the 5-second autoplay and reduced-motion behavior.

## 2.2.10

- Replaced the diagonal carousel transition with a 3D right-to-left page-turn animation.
- The current featured post now pivots from its left edge to reveal the next post underneath, with a moving fold shadow for depth.
- Added a reduced-motion fallback that switches posts without the 3D animation.

## 2.2.9

- Changed carousel advance motion to a diagonal right-to-left transition, with the incoming post sliding in from the upper-right while the outgoing post subtly recedes underneath.
- Added fluid homepage excerpt sizing that remains 16px at typical desktop widths and scales gradually up to 18px on large displays such as 2560×1440.

## 2.2.8

- Rebuilt the carousel slide transition with the Web Animations API so theme CSS and hover transforms cannot suppress the motion.
- Carousel advances now visibly swipe from left to right over 600ms while retaining the 5-second autoplay interval.
- Replaced interval-based autoplay with a self-rescheduling timeout to avoid transition overlap and stale timers.

## 2.2.7

- Fixed the homepage carousel swipe animation by keeping all transitioning slides in the same absolute-positioned layer.
- Removed the carousel hover translation that could interfere with the horizontal slide transform.
- Preserved the left-to-right 520ms transition, 5-second autoplay, and reduced-motion fallback.

## 2.2.6

- Added a smooth horizontal left-to-right swipe animation when the homepage carousel advances.
- Kept the 5-second autoplay timing and existing carousel accessibility behavior.
- Disabled the swipe animation for visitors who prefer reduced motion.

## 2.2.5

- Fixed the native homepage carousel so `#carousel` posts advance reliably again.
- Restored automatic rotation at a 5-second interval.
- Removed pointer-hover pausing, which could make the carousel appear stuck while being viewed.
- Kept rotation paused while keyboard focus is inside the carousel and while the page is hidden.

## 2.2.4

- Fixed homepage showcase cards so clicking anywhere on the featured image opens the post.
- Kept title and category-pill links independently clickable while allowing non-interactive overlays and the featured badge to pass clicks through to the full-card link.

## 2.2.3

- Made native Ghost YouTube embeds responsive to the article body width.
- Preserved a 16:9 aspect ratio while scaling down cleanly on tablets and mobile.
- Added a 10px corner radius to match the theme's card styling.

## 2.2.2

- Removed the square hover/focus background from the header search and theme toggle wrappers.
- Kept the circular hover treatment on the search button and theme toggle themselves.

## 2.2.1

- Updated the header search control so it uses the same 40px circular button shell as the light/dark theme toggle.
- Increased the search icon sizing and centered it within the circle for better visual balance.

## 2.2.0

- Updated theme compatibility target to Ghost 6.
- Replaced custom Content API search with native Ghost search.
- Replaced Slick carousel, jQuery, jQuery UI, and Tocify with vanilla JavaScript.
- Added Ghost Admin custom settings for the homepage showcase, TOC, and code line numbers.
- Converted primary homepage/article feature images to responsive semantic `<img>` markup with `srcset`, lazy loading, and fetch priority where appropriate.
- Added `body_class` and `post_class` support and improved heading, date, list, button, and navigation semantics.
- Optimized the tag archive to use `count.posts` instead of one API request per tag.
- Replaced Ghost 6-incompatible `limit="all"` queries with explicit 100-item limits.
- Updated KaTeX from 0.10.2 to 0.18.1.
- Updated PrismJS from 1.16.0 to 1.30.0.
- Removed the externally hosted Alibaba icon font and replaced theme icons with inline SVG partials.
- Consolidated showcase CSS so light/dark mode uses identical geometry without bright border artifacts.
- Updated GitHub Actions to `actions/checkout@v7` and `TryGhost/action-deploy-theme@v2`, with GScan validation before deployment.

All notable changes to this customized theme fork are documented in this file.

This project is based on the original **Fizzy** theme by **Yuzhang Huang**.
Legacy upstream history is not reproduced in full here; this changelog tracks the maintained customized fork.

## [2.1.13] - 2026-09-10

### Fixed
- Removed the bright dark-mode showcase edge reintroduced by the transparent geometry-preserving border.
- Kept light/dark showcase geometry identical by using a 1px border painted with the dark page surface and clipping background images to the padding box.

## [2.1.12] - 2026-09-10

### Fixed
- Kept showcase card geometry identical between light and dark modes by replacing the removed dark-mode border with a fully transparent 1px border.
- Locked showcase category-pill dimensions, padding, font metrics, and alignment so switching color schemes no longer causes visible width or text-position shifts.

## [2.1.11] - 2026-09-10

### Changed
- Normalized homepage showcase category-pill geometry across light and dark modes.
- Standardized pill padding to `4px 6px`, `line-height: 1`, `border-radius: 4px`, and borderless box sizing so both color schemes use identical dimensions.

## [2.1.10] - 2026-09-08

### Fixed
- Fixed the desktop light/dark toggle disappearing when all Ghost navigation links are removed.
- Moved persistent header controls (search and desktop theme toggle) out of the Ghost `navigation` partial so they render independently of navigation configuration.

## [2.1.9] - 2026-09-08

### Fixed
- Kept the desktop light/dark toggle and search control visible when all Ghost navigation links are removed.
- The navigation partial now renders unconditionally because it owns persistent header controls in addition to user-configured links.

## [2.1.8] - 2026-09-08

### Fixed
- Fixed the mobile hamburger icon remaining in its light-mode color after switching to dark mode.
- Added a higher-specificity override for Bulma's `.navbar.is-white .navbar-burger` rule so all three burger bars follow the active theme.

## [2.1.7] - 2026-09-04

### Fixed
- Removed the remaining bright colored edge along dark-mode showcase cards by removing the translucent showcase border entirely in dark mode.
- Kept card separation through the existing dark shadow instead of a light border.

## [2.1.6] - 2026-09-04

### Fixed
- Removed the thin bright line artifact under showcase tag pills by eliminating inline baseline gap behavior on the pill wrappers and links.
- Kept showcase tag pills visually clean in dark mode with no underline, border, or shadow artifacts.

## [2.1.5] - 2026-09-04

### Fixed
- Removed the remaining faint outline on showcase tag pills in dark mode by dropping the pill border and relying on a clean overlay background only.

## [2.1.4] - 2026-09-04

### Fixed
- Removed the remaining square hover highlight around the desktop light/dark mode toggle by neutralizing the parent navbar-item hover state.

## [2.1.3] - 2026-09-04

### Fixed
- Softened the dark-mode showcase card borders so the carousel and top-featured cards no longer show a bright outline.
- Refined dark-mode showcase tag pills so they sit more naturally on top of images without a noticeable light edge.

## [2.1.2] - 2026-09-04

### Fixed
- Refined the theme-toggle hover state so the hover treatment stays circular and matches the icon/button shape in both light and dark modes.
- Added stricter sizing and overflow rules for the light/dark toggle so Bulma navbar-item hover behavior cannot produce a pill or rectangular hover surface.

## [2.1.1] - 2026-09-04

### Fixed
- Fixed article H1–H6 heading colors so headings correctly switch in dark mode.
- Fixed TOC panel backgrounds and borders remaining light after switching to dark mode.
- Fixed Ghost file/attachment cards and download links so their surfaces, text, metadata, borders, and hover states follow the active theme.

## [2.1.0] - 2026-09-04

### Added
- Added a top-right light/dark mode toggle with inline sun and moon icons.
- Added a mobile theme toggle beside the navigation burger.
- Added automatic first-visit detection via `prefers-color-scheme`.
- Added persistent visitor preference via `localStorage`.
- Added a pre-paint theme bootstrap in `default.hbs` to minimize light/dark flashing during navigation and reloads.
- Added dark-mode styling for navigation, cards, articles, tags, tables, search, inline code, bookmarks, archives, TOC, related posts, and the footer.

### Changed
- Updated package metadata and documentation for version 2.1.0.
- Extended the existing green editorial palette into a warm charcoal dark theme rather than using pure black.

## [2.0.0] - 2026-09-03

### Added
- Added a dedicated footer social-links section using large inline SVG icons.
- Added built-in links for GitHub, LinkedIn, Twitch, and Ko-fi.
- Added updated package metadata reflecting this theme as a maintained customized fork.
- Added consolidated project documentation for the current state of the theme.

### Changed
- Renamed the packaged theme metadata to **fizzy-mdr**.
- Reset the customized theme versioning to **2.0.0**.
- Updated the README, cleanup notes, and changelog for the maintained fork.
- Reworked typography:
  - Atkinson Hyperlegible Next for body copy
  - IBM Plex Sans for headings and UI
  - Atkinson Hyperlegible Mono for code
  - Special Elite limited to blockquotes
- Widened single-post content to **960px**.
- Refined homepage styling with:
  - warmer neutral page background
  - softer cards with subtler borders and shadows
  - quieter metadata
  - improved spacing and hover states
  - clamped excerpts
  - adjusted navbar styling
- Refined showcase behavior so the homepage uses three distinct stories more reliably.
- Moved footer content out of JavaScript injection and into the theme itself.
- Reduced footer social-section padding and removed the visible “Socials” heading.
- Standardized footer asset sizing and spacing.
- Changed article list-card proportions to emphasize written content over imagery.
- Preserved a cleaner single-author homepage by removing redundant author bylines from list cards and the primary showcase card.

### Removed
- Removed built-in comment rendering from standard, full-width, and TOC post templates.
- Removed the old Fizzy credit UI.
- Removed the old JavaScript-based custom-footer mechanism.
- Removed duplicate and unused font loading.
- Removed unused assets and dead theme code carried over from prior iterations.

### Fixed
- Fixed footer icon sizing and ensured the custom footer stylesheet loads correctly.
- Fixed showcase rendering so the secondary featured area does not collapse to a single item.
- Fixed code-font consistency between inline code and Prism code blocks.
- Fixed duplicate social-header behavior by moving social prominence to the footer.

## [Unreleased]

- Future changes for the maintained fork will be documented here.
