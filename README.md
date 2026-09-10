# Fizzy MDR

A customized Ghost theme forked from [Fizzy](https://github.com/huangyuzhang/Fizzy-Theme) and tailored for [michaeldelrosar.io](https://michaeldelrosar.io).

This version keeps Fizzy's magazine-style structure, but updates the theme with a cleaner editorial aesthetic, better reading typography, improved code presentation, simplified footer behavior, and built-in footer social links.

## Highlights

- Editorial homepage layout with showcase plus horizontal post cards
- Accessible typography tuned for long-form reading
  - **Body:** Atkinson Hyperlegible Next
  - **Headings/UI:** IBM Plex Sans
  - **Code:** Atkinson Hyperlegible Mono
- Wider single-post content column (**960px**)
- Cleaner homepage card styling and warmer background
- Built-in custom footer and social links section
- Persistent light/dark color scheme with a top-right toggle
- Comments removed
- KaTeX and Prism styles loaded only where needed
- Streamlined code injection requirements
- Distinct package metadata for this customized fork

## Version

Current customized release: **2.1.13**

## Installation

1. Download the theme ZIP.
2. In Ghost Admin, go to **Settings → Design**.
3. Upload the ZIP as a custom theme.
4. Activate the theme.

## Recommended Ghost Code Injection

This fork still supports the useful display toggles from Fizzy.
In **Ghost Admin → Settings → Code Injection → Site Header**, you can use:

```html
<script>
  var show_showcase = true;
  var line_numbers = true;
  var show_toc = true;
</script>
```

### Variables no longer used

Do **not** keep these old variables around:

- `show_comment`
- `footer_text`
- `fizzy_credit`

Any old Gitalk or Disqus code injection can also be removed.

## Light and dark mode

The top-right sun/moon button switches between light and dark color schemes.

- On a visitor's first visit, the theme follows the operating-system `prefers-color-scheme` setting.
- A manual choice is stored in `localStorage` under `fizzy-color-scheme`.
- The saved choice is applied in the document head before the stylesheets paint, minimizing theme flash during page load.
- On mobile, the same toggle remains visible beside the navigation burger.
- Search and the desktop theme toggle remain available even when Ghost has no primary navigation links configured.
- The desktop theme toggle and search control remain available even when no Ghost navigation links are configured.
- The mobile navigation burger also follows the active light/dark color scheme.

## Theme behavior

### Homepage showcase

- The large left showcase item is populated from posts tagged with the internal tag **`#carousel`**.
- The two right-side showcase cards exclude `#carousel` posts.
- Featured posts are preferred on the right; newer posts can fill remaining slots.

### Internal tags

This fork still uses Fizzy's internal tag behavior:

- `#carousel` / `hash-carousel` → adds posts to the homepage showcase carousel
- `#noindex` / `hash-noindex` → excludes posts from the home listing

### Social links

This fork includes a dedicated footer social section with large icons for:

- GitHub
- LinkedIn
- Twitch
- Ko-fi

The current links are hardcoded for the customized site build:

- GitHub: `https://github.com/mjdelro`
- LinkedIn: `https://www.linkedin.com/in/michaeljdelrosario`
- Twitch: `https://www.twitch.tv/mikey_247`
- Ko-fi: `https://ko-fi.com/mikey_247`

## What's different from upstream Fizzy

This fork intentionally changes several parts of the original theme:

- Removed comment integrations from post templates
- Removed the Fizzy credit UI
- Replaced the JavaScript-driven footer text approach with a theme-rendered footer
- Cleaned up old/unused assets and duplicate font loading
- Refined homepage cards, showcase behavior, spacing, and hover states
- Reworked typography for accessibility and technical-content readability
- Added custom footer social icons and tightened footer spacing
- Updated package metadata and documentation for this fork

## Customization notes

Most visual overrides for this customized build live in:

- `assets/css/custom.css`

Core templates most likely to be edited further:

- `default.hbs`
- `index.hbs`
- `post.hbs`
- `partials/footer.hbs`
- `partials/navigation.hbs`

## License and credit

- Original theme: **Fizzy** by **Yuzhang Huang**
- Customization and maintained fork: **Michael del Rosario**
- License: **MIT**

If you publish or share this fork, retain the upstream attribution and MIT license.

## Related docs

- [Upstream Fizzy repository](https://github.com/huangyuzhang/Fizzy-Theme)
- [Customization notes](./CLEANUP-NOTES.md)
- [Changelog](./CHANGELOG.md)
