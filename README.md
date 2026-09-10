# Fizzy MDR

A customized Ghost theme based on the original [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang.

Built for [michaeldelrosar.io](https://michaeldelrosar.io), with a focus on typewriters, film photography, Linux, self-hosting, hardware, and technology.

Current release: **2.1.13**

## Features

- Editorial homepage with showcase and article cards
- Persistent light/dark mode
- Mobile dark-mode support
- Atkinson Hyperlegible Next for body text
- IBM Plex Sans for headings and UI
- Atkinson Hyperlegible Mono for code
- 960px article width
- Dark-mode support for TOC, tables, attachments, bookmarks, and code
- Footer links for GitHub, LinkedIn, Twitch, and Ko-fi
- Comments and legacy Fizzy credit UI removed

## Homepage Showcase

Posts tagged with:

```text
#carousel
```

appear in the main homepage carousel.

Supporting cards prefer featured posts while excluding carousel posts.

## Recommended Ghost Code Injection

```html
<script>
  var show_showcase = true;
  var line_numbers = true;
  var show_toc = true;
</script>
```

Legacy variables no longer used:

```text
show_comment
footer_text
fizzy_credit
```

## Important Files

```text
assets/css/custom.css
assets/js/main.js
partials/header.hbs
partials/showcase.hbs
partials/footer.hbs
default.hbs
post.hbs
```

## Development

```bash
git status
git diff
git add .
git diff --staged
git commit -m "Describe the change"
git push
```

## Releases

```text
PATCH  2.1.13 → 2.1.14
MINOR  2.1.13 → 2.2.0
MAJOR  2.x → 3.0.0
```

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## Credits

Original theme: [Fizzy Theme](https://github.com/huangyuzhang/Fizzy-Theme) by Yuzhang Huang.

Customized and maintained by [Michael del Rosario](https://michaeldelrosar.io).

## License

MIT License. See [LICENSE](./LICENSE).
