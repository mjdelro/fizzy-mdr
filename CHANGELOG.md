# Changelog

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
