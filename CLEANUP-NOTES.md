# Fizzy MDR 2.3.0 Cleanup Notes

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
