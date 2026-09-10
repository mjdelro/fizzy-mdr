# Fizzy MDR 2.2.0 Cleanup Notes

- Removed legacy Ghost Content API search bundle.
- Removed jQuery, Slick, jQuery UI, and Tocify dependencies.
- Removed external Alibaba icon font dependency.
- Consolidated showcase/dark-mode geometry rules.
- Replaced redundant homepage query with the native Ghost homepage context.
- Replaced tag archive N+1 post-count queries with `count.posts`.
- Updated Ghost 6 compatibility and CI validation.
