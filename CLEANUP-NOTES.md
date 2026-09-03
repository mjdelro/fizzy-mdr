# Cleanup Notes

These notes describe the current structure and cleanup decisions for the maintained **Fizzy MDR** fork.

## Current baseline

This theme should now be treated as **version 2.0.0** of the customized fork.
It is no longer documented as a sequence of ad hoc patch zips. The current package metadata, README, and changelog are aligned to that version.

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

This remains a customized fork of:

- **Fizzy** by **Yuzhang Huang**
- Upstream repo: `https://github.com/huangyuzhang/Fizzy-Theme`

Keep the MIT license and attribution intact when publishing or sharing the theme.
