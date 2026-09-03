# Changelog

All notable changes to this customized theme fork are documented in this file.

This project is based on the original **Fizzy** theme by **Yuzhang Huang**.
Legacy upstream history is not reproduced in full here; this changelog tracks the maintained customized fork.

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
