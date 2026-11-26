# Fizzy MDR design system

## Design brief

Fizzy MDR is a personal editorial publication about typewriters, film photography, and technology. Its interface should feel like a well-kept working archive: observant, practical, tactile, and quiet. Photographs, objects, and writing carry the personality. The surrounding interface gives them structure without competing for attention.

The site is for readers who arrive for long-form essays, technical notes, and image-rich object stories. It should never read as a software product, a generic technology blog, or a themed nostalgia exercise.

**Dial:** ENERGY 1 / RHYTHM 2 / MOTION 1

## Principles

1. **Content leads.** Typography, spacing, and imagery establish hierarchy before decoration does.
2. **Neutral surfaces frame real color.** The interface stays warm and restrained so photographs and screenshots retain their character.
3. **Details come from the subject matter.** Typewriter quotations, film imagery, and archival metadata are meaningful. Decorative retro effects are not.
4. **Interaction remains legible.** Controls look actionable, state changes are visible, and touch targets remain usable even when their visual footprint is small.
5. **Every flourish has a job.** Accent color signals taxonomy or state. Gradients protect text or mark hierarchy. Shadows separate media from a surface.

## Brand character

| The site is | The site is not |
| --- | --- |
| Editorial and personal | Corporate or product-led |
| Calm and specific | Sterile or generic |
| Tactile and photographic | Decoratively vintage |
| Technically literate | Visually busy or futuristic |
| Accessible and direct | Precious or cryptic |

## Color

The palette uses warm neutrals with one publication accent. Ghost supplies the live accent color; `#176b3a` is the fallback. Components derive readable, tinted, and darkened variants from that value rather than introducing unrelated hues.

### Core tokens

| Role | Light (Warm Paper) | Dark (Warm Coal) | Use |
| --- | --- | --- | --- |
| Page | `#f6f2e9` | `#1c1d20` | Site background |
| Card | `#fbf8f1` | `#222428` | Story and taxonomy surfaces |
| Elevated | `#fbf8f1` | `#292b30` | Floating or raised surfaces |
| Subtle | `#efeae0` | `#18191c` | Quiet section and utility backgrounds |
| Primary text | `#232528` | `#dcdad5` | Body copy and main labels |
| Secondary text | `#474a4d` | `#c0beb8` | Supporting copy |
| Muted text | `#635f57` | `#94979f` | Dates, counts, and low-priority metadata |
| Accent | Ghost setting, fallback `#176b3a` | Same source | Links, taxonomy, focus, and selected state |

### Color rules

- Keep large surfaces neutral. Do not wash entire sections in the accent color.
- Use the accent for links, taxonomy, active state, focus, small editorial rules, and featured status.
- Use the darker accent mix for text on light backgrounds. Do not assume the raw accent always meets contrast requirements.
- Keep white text on dark image overlays and solid dark taxonomy pills.
- Let photography provide the broadest color range on the page.
- Do not add unrelated gradients, neon glows, or a second decorative accent.

## Typography

- Charis is the long-form article face because its strong serifs and clear features suit sustained reading.
- Atkinson Hyperlegible Next handles headings, navigation, controls, cards, archives, and metadata so all non-prose typography shares one unified low-vision sans family.
- Intel One Mono is reserved for code so technical material remains legible with widened punctuation and distinct homoglyphs (`0/O`, `1/l/I`).
- Charis Italic gives quotations a distinct voice without introducing another type family.

Headings should feel firm rather than dramatic. Use weight, scale, and spacing to establish hierarchy. Keep body copy comfortably loose at approximately `1.68` line height on article pages. Metadata is smaller and quieter, but it must remain readable.

## Layout and rhythm

Article pages use a centered reading column with a maximum width of `960px`. Index and archive pages can use wider compositions when readers need to scan photographs, subjects, or dates.

Desktop story list cards use a `215px` horizontal frame (`300px` for taller standalone feature cards) with photography occupying `34%` of the width. The remaining space holds the title, excerpt, and metadata. Featured items can form a two-row stack with a `1.5rem` gap. These proportions keep images present without turning the home page into a gallery.

Use spacing to communicate relationship:

- Large gaps separate editorial sections.
- Medium gaps separate stories or component groups.
- Small gaps bind metadata to the title or image it describes.
- Keep alignment steady. Avoid decorative offsets and arbitrary overlap.

At `768px` and below, horizontal compositions reflow into a single column. At `480px` and below, tighten padding before reducing type. At coarse-pointer sizes, preserve at least `44px` interactive targets.

## Shape and elevation

- Story cards, media, and larger panels use a `10px` radius.
- Header controls and standalone icon controls are circular.
- Taxonomy pills use a compact `4px` radius so they read as labels rather than buttons.
- Ordinary cards stay flat with a fine, low-contrast border.
- Media and floating utilities may use a shallow shadow when separation is necessary.
- Hover may lift an interactive card by `1px`. Do not stack lift, glow, scale, and heavy shadow on the same element.

Shape is functional vocabulary. Circles indicate compact controls, soft rectangles contain editorial material, and compact pills identify taxonomy.

## Components

### Header

The header is quiet and utility-led. Icon controls are `44px` circles with clear hover and focus states. Navigation labels truncate when space is limited instead of forcing a broken header. Search should feel layered over the publication through a restrained frosted backdrop, not like a separate application.

### Story cards

Each story card groups one real story image, title, excerpt, and metadata. The image should be cropped deliberately and preserve the subject's visual weight. Titles remain the dominant text. Dates, reading time, and taxonomy recede through size and color.

Do not put unrelated interface fragments into cards simply to make a grid feel complete.

### Taxonomy

Tags and categories are compact navigational labels. Standalone taxonomy pills use a solid, darkened accent surface with white text, while inline card tags use a subtle accent tint with high-contrast readable accent text that fills on hover or focus. On touch devices, expand the hit area to at least `44px` square.

Tag directory cards may combine up to four recent post images into a small archive mosaic. The mosaic should reveal the subject range, not act as abstract decoration.

### Featured carousel

The featured carousel is manual. It shows no more than five circular pips along the bottom edge. The active pip gains opacity and a slight scale change; inactive pips remain deliberately faint.

Previous and next controls occupy the left and right edges. They appear on hover or focus for precise pointers and remain softly visible on coarse pointers. Clicking either edge moves one item and updates the highlighted pip. Pips are direct controls, not passive status marks.

Keep carousel text clear of its controls. Do not autoplay. Do not loop motion in the background.

### Article content

Long-form pages prioritize reading continuity. Second-level headings receive a short `2px` accent rule that fades to transparent across half the content width. This is the primary decorative editorial gesture inside an article.

Code, tables, embeds, quotations, and media use their own restrained surfaces. Image captions and source notes stay close to the media they describe. Anchor targets leave enough room below the fixed header to remain visible.

### Table of contents

The table of contents is a reading aid, not a second navigation system. Keep it visually subordinate to the article, highlight the current section, and ensure keyboard focus remains visible.

## Imagery

Use real photographs, scans, and screenshots tied to the story. Prefer images with clear objects, legible texture, and natural color. Crop around the subject rather than around empty ambience.

Image overlays are permitted only where text needs protection. They should be dark and restrained. Avoid colorizing photographs to force them into the palette, generic stock imagery, fake film damage, and ornamental typewriter graphics.

## Icons

Use Lucide for interface actions and Simple Icons for supported brands. Keep brand marks in their official silhouettes. The LinkedIn mark uses the local Bootstrap icon asset.

Every icon must name a real action, content type, brand, or state. Pair ambiguous icons with accessible labels. Do not use emoji as interface symbols or introduce one-off icon styles.

## Motion

Motion follows direct interaction and explains a change of state.

- Use `150ms` to `180ms` transitions for hover, focus, opacity, border, and small position changes.
- Carousel slide motion may run longer when needed to make direction understandable.
- Keep motion on transform and opacity where possible.
- Disable nonessential transitions and animation when `prefers-reduced-motion` is active.
- Do not add ambient animation, automatic carousels, scroll theatrics, or staggered entrance sequences.

## Accessibility

- Maintain WCAG AA contrast for text and meaningful controls in both themes.
- Preserve visible `2px` focus indicators with sufficient separation from the control edge.
- Make compact controls at least `44px` square on touch and coarse-pointer devices.
- Support keyboard navigation for menus, search, carousel controls, taxonomy links, and the table of contents.
- Give icon-only controls accessible names.
- Restore focus when dismissing an overlay or modal interaction.
- Honor reduced-motion preferences without hiding state changes.
- Keep headings in logical order and use landmarks before adding ARIA.

## Editorial voice

Interface copy is direct, specific, and modest. Prefer concrete nouns and verbs over promotional language. Titles can carry personality; labels and instructions should remain plain.

Good labels describe the destination or action: “Browse typewriters,” “Open search,” or “Next featured post.” Avoid vague calls to action such as “Discover more,” “Unlock,” or “Dive in.” Do not write headings that merely restate the paragraph beneath them.

## Decision record

- Color: Warm Paper (light) and Warm Coal (dark) neutral surfaces frame mixed photography; green is the publication accent and carries taxonomy or interaction state.
- Layout: a narrow editorial column supports reading, while wider archive compositions make scanning visual subjects easier.
- Spacing: larger gaps separate editorial sections; smaller gaps bind metadata to the story it describes.
- Cards: story and taxonomy cards group a real image, title, and metadata; unrelated content is not forced into cards.
- Icons: every icon names a real action, content type, brand, or featured state.
- Directional glyphs: arrows are reserved for carousel controls, pagination, and the single see-all navigation link.
- Gradients: image overlays protect white text, tag hero gradients identify an image-free archive header, and heading rules mark editorial hierarchy.
- Shadows: media and floating utilities receive shallow separation; ordinary cards, navigation, and controls remain flat.
- Overlay type: the lead carousel title is larger than the compact featured titles, and both use a restrained dark text shadow to stay readable over detailed photographs.
- Accent: green marks categories, featured state, focus, and selected links rather than decorating every surface.

## Guardrails

Do:

- Let the article title or photograph establish the first impression.
- Reuse the existing type, color, radius, and motion tokens.
- Test every new component in light mode, dark mode, keyboard flow, and narrow layouts.
- Make metadata useful, quiet, and close to its subject.

Avoid:

- Product-dashboard patterns, oversized hero copy, and card grids without editorial purpose.
- Decorative badges, generic glass panels, neon glow, and repeated gradient treatments.
- Excessive rounding that makes every element look like a pill.
- Placeholder photography or icons used only to fill space.
- Interaction that depends on hover alone.

## Implementation source of truth

This document states the design intent. The working tokens and component rules live in `assets/css/custom.css`. Ghost typography and accent settings enter through `default.hbs`. Base theme behavior remains in `assets/css/main.css` and `assets/css/search.css`.

When a new design choice conflicts with this document, first decide whether it is an exception or a change in direction. Record a genuine change here, then update the implementation. Do not let isolated overrides quietly become a second design system.
