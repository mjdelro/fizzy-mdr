# Cleanup Notes

These notes describe the current structure and cleanup decisions for the maintained **Fizzy MDR** fork.

## Current baseline

This theme should now be treated as **version 2.1.8** of the customized fork.
It is no longer documented as a sequence of ad hoc patch zips. The package metadata, README, and changelog should stay aligned with the current release version.

## Recent fixes

- Dark-mode showcase cards keep their 1px geometry-preserving border, but it now matches the page surface and background images are clipped to the padding box so no colored edge bleeds through.

- Showcase cards keep a transparent 1px border in dark mode so their geometry matches light mode without reintroducing the old bright-edge artifact.
- Showcase pills use fixed shared metrics in both themes, preventing width or baseline shifts during toggling.

- Homepage showcase category-pill geometry is explicitly normalized across light and dark modes (`4px 6px` padding, consistent line height, radius, and box sizing).
- Search and the desktop theme toggle now live directly in `partials/header.hbs`, so they remain visible even when Ghost primary navigation is empty.
- Desktop search and theme-toggle controls are no longer conditional on Ghost navigation entries.
- Dark-mode showcase tag pills no longer use a faint border or bright edge treatment.
- The desktop theme toggle no longer inherits a rectangular navbar hover surface.
- The mobile navigation burger now explicitly overrides Bulma's white-navbar color rule so its bars switch correctly in dark mode.
- The showcase pill wrappers no longer produce a thin baseline gap that can look like a bright underline in dark mode.
- Dark-mode showcase cards no longer use a translucent border; separation is handled by shadow to avoid image-colored edge artifacts.

## Code Injection

### Keep

Use only the feature toggles you still want:

```html
<script>
  var show_showcase = true;
  var line_numbers = true;
  var show_toc = true;
</script>
```

### Remove

The following legacy variables are no longer used by the theme:

- `show_comment`
- `footer_text`
- `fizzy_credit`

You can also remove any old Gitalk or Disqus scripts and styles from Ghost Code Injection.

## Color scheme

- Light/dark mode is implemented with `data-theme="light|dark"` on the root `<html>` element.
- The first visit follows the operating-system color scheme.
- A visitor's explicit choice is stored as `fizzy-color-scheme` in `localStorage`.
- `default.hbs` contains a small pre-paint bootstrap so the correct theme is applied before CSS renders.
- `assets/js/main.js` owns the toggle behavior and OS-preference listener.
- `assets/css/custom.css` owns the theme variables and dark-mode overrides.
- Desktop toggle markup lives in `partials/navigation.hbs`; the mobile toggle lives in `partials/header.hbs`.

## Structural cleanup already completed

### Comments and credit UI
- Comment rendering removed from the standard post templates.
- The Fizzy credit dropdown/button removed.

### Footer
- The Creative Commons footer is rendered directly by the theme.
- The footer social section is part of the theme and no longer depends on navigation labels.
- The visible “Socials” heading was removed for a cleaner footer.
- Footer spacing and icon sizing were normalized.

### Typography
- Body copy uses **Atkinson Hyperlegible Next**.
- Headings and UI use **IBM Plex Sans**.
- Code uses **Atkinson Hyperlegible Mono**.
- **Special Elite** is retained only as a blockquote accent.
- Figure captions use Atkinson Hyperlegible Next, not the decorative quote font.
- Duplicate and unused font loads were removed.

### Dark-mode coverage
- The header theme-toggle uses a strictly circular hover treatment that matches the icon button on desktop and mobile.
- Article H1–H6 headings inherit the active theme text color.
- TOC panels switch their background, border, and link colors with the theme.
- Ghost file/attachment cards use theme-aware surfaces, borders, text, metadata, and hover states.
- Showcase cards and tag pills were refined to remove bright outlines and underline-like artifacts in dark mode.

### CSS and JS
- `custom.css` is loaded once, last, so custom overrides win predictably.
- Lightbox behavior is consolidated in `assets/js/main.js`.
- KaTeX and Prism CSS are loaded only on posts.
- Old popup/unused scripts and dead assets were removed.

### Layout and UI
- Single-post content width increased to **960px**.
- Homepage cards were restyled to feel more editorial and less theme-default.
- Card image/text proportions were adjusted to favor reading.
- Homepage metadata, hover states, spacing, card radius, and excerpt handling were refined.
- The homepage showcase was tuned to better avoid duplicate stories.
- The redundant single-author byline was removed from homepage list cards and the main showcase card.

## Files most relevant for future edits

If you continue customizing the fork, these are the main files to revisit first:

- `package.json`
- `README.md`
- `CHANGELOG.md`
- `assets/css/custom.css`
- `default.hbs`
- `index.hbs`
- `post.hbs`
- `partials/footer.hbs`
- `partials/navigation.hbs`

## Suggested repository structure practice

When you put this on GitHub, treat the unzipped theme directory as the source of truth.
Use Git tags and GitHub Releases for future packaged theme zips.

Suggested release flow:

1. Edit the source tree.
2. Update `package.json` version.
3. Update `CHANGELOG.md`.
4. Commit and tag the release.
5. Zip the theme.
6. Attach the zip to a GitHub Release.
7. Upload the same zip to Ghost when deploying.

## Upstream attribution

This customized fork is based on the original **Fizzy** theme by **Yuzhang Huang**.
Keep that attribution in the repository and package metadata.
