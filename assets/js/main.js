"use strict";

(() => {
  const THEME_STORAGE_KEY = "fizzy-color-scheme";

  const onReady = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  const getTheme = () => document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

  // Prism reads the line-number class during its own initialization.
  if (document.body?.dataset.lineNumbers === "true") {
    document.querySelectorAll(".post-content pre").forEach((pre) => pre.classList.add("line-numbers"));
  }

  function setupNavbar() {
    document.querySelectorAll(".navbar-burger").forEach((button) => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;

      const close = (restoreFocus = false) => {
        button.classList.remove("is-active");
        target.classList.remove("is-active");
        button.setAttribute("aria-expanded", "false");
        if (restoreFocus) button.focus();
      };

      button.addEventListener("click", () => {
        const active = button.classList.toggle("is-active");
        target.classList.toggle("is-active", active);
        button.setAttribute("aria-expanded", String(active));
      });

      target.addEventListener("click", (event) => {
        if (event.target.closest("a")) close();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && button.classList.contains("is-active")) close(true);
      });

      document.addEventListener("pointerdown", (event) => {
        if (button.classList.contains("is-active") && !event.target.closest?.("#navbar")) close();
      });
    });
  }

  function setupArchiveGroups() {
    const list = document.querySelector("ul.post-archive");
    if (!list) return;

    const items = Array.from(list.querySelectorAll(".post-archive-item"));
    if (!items.length) return;

    const container = document.createElement("div");
    container.className = "post-archive-groups";

    let year = null;
    let month = null;
    let currentList = null;

    items.forEach((item) => {
      const nextYear = item.dataset.year;
      const nextMonth = item.dataset.month;

      if (nextYear !== year) {
        const divider = document.createElement("hr");
        const heading = document.createElement("h2");
        heading.textContent = nextYear;
        container.append(divider, heading);
        year = nextYear;
        month = null;
      }

      if (nextMonth !== month) {
        const subheading = document.createElement("h3");
        subheading.className = "post-archive-month";
        subheading.textContent = nextMonth;
        currentList = document.createElement("ul");
        currentList.className = "post-archive";
        container.append(subheading, currentList);
        month = nextMonth;
      }

      currentList.appendChild(item);
    });

    list.replaceWith(container);
  }

  function setupCarousel() {
    const carousel = document.getElementById("carousel-home");
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll(".carousel-item"));
    if (slides.length < 2) {
      carousel.querySelector(".carousel-controls")?.setAttribute("hidden", "");
      return;
    }

    const transitionMs = 600;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const previous = carousel.querySelector(".carousel-nav-button--previous");
    const next = carousel.querySelector(".carousel-nav-button--next");
    const pips = Array.from(carousel.querySelectorAll(".carousel-pip"));
    let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let animating = false;

    const updatePips = (activeIndex) => {
      pips.forEach((pip, pipIndex) => {
        const active = pipIndex === activeIndex;
        pip.classList.toggle("is-active", active);
        if (active) pip.setAttribute("aria-current", "true");
        else pip.removeAttribute("aria-current");
      });
    };

    const setActive = (activeIndex) => {
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === activeIndex;
        slide.classList.toggle("is-active", active);
        if (active) slide.removeAttribute("inert");
        else slide.setAttribute("inert", "");
        slide.classList.remove("is-transitioning");
        slide.setAttribute("aria-hidden", String(!active));
        slide.setAttribute("aria-label", `${slideIndex + 1} of ${slides.length}`);
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "slide");
        slide.style.removeProperty("z-index");
      });
      updatePips(activeIndex);
      index = activeIndex;
      animating = false;
    };

    const show = (nextIndex, direction = 1, animate = true) => {
      if (nextIndex === index || animating) return;

      const current = slides[index];
      const incoming = slides[nextIndex];
      const shouldAnimate = animate && !reducedMotion?.matches && typeof incoming.animate === "function";

      updatePips(nextIndex);

      if (!shouldAnimate) {
        setActive(nextIndex);
        return;
      }

      animating = true;
      incoming.classList.add("is-transitioning");
      incoming.style.zIndex = "2";
      current.style.zIndex = "1";

      const timing = {
        duration: transitionMs,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both"
      };
      const offset = direction >= 0 ? 100 : -100;

      const outgoingAnimation = current.animate([
        { transform: "translateX(0%)" },
        { transform: `translateX(${-offset}%)` }
      ], timing);

      const incomingAnimation = incoming.animate([
        { transform: `translateX(${offset}%)` },
        { transform: "translateX(0%)" }
      ], timing);

      Promise.allSettled([outgoingAnimation.finished, incomingAnimation.finished]).then(() => {
        setActive(nextIndex);
        outgoingAnimation.cancel();
        incomingAnimation.cancel();
      });
    };

    setActive(index);
    previous?.addEventListener("click", () => show((index - 1 + slides.length) % slides.length, -1));
    next?.addEventListener("click", () => show((index + 1) % slides.length, 1));
    pips.forEach((pip) => {
      pip.addEventListener("click", () => {
        const target = Number(pip.dataset.carouselSlide) - 1;
        show(target, target >= index ? 1 : -1);
      });
    });
    carousel.querySelector(".carousel-controls")?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show((index - 1 + slides.length) % slides.length, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show((index + 1) % slides.length, 1);
      }
    });
  }

  function setupCaptionBreaks() {
    const captions = document.querySelectorAll(
      ".kg-image-card figcaption, .kg-gallery-card figcaption"
    );

    captions.forEach((caption) => {
      const walker = document.createTreeWalker(caption, NodeFilter.SHOW_TEXT);
      const textNodes = [];

      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeValue?.includes("\\n")) textNodes.push(node);
      }

      textNodes.forEach((node) => {
        const parts = node.nodeValue.split("\\n");
        const fragment = document.createDocumentFragment();

        parts.forEach((part, partIndex) => {
          if (partIndex > 0) fragment.appendChild(document.createElement("br"));
          if (part) fragment.appendChild(document.createTextNode(part));
        });

        node.replaceWith(fragment);
      });
    });
  }

  function setupTranslations() {
    const passages = Array.from(document.querySelectorAll(".translate-on-select[data-translation]"))
      .filter((passage) => passage.dataset.translation.trim());
    if (!passages.length) return;

    const tooltip = document.createElement("div");
    const tooltipId = "translation-tooltip";
    const originalDescriptions = new Map();
    let activePassage = null;
    let activeAnchor = null;
    let activeMode = null;
    let openingScrollX = 0;
    let openingScrollY = 0;

    tooltip.id = tooltipId;
    tooltip.className = "translation-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-live", "polite");
    tooltip.hidden = true;
    document.body.appendChild(tooltip);

    const restoreDescription = (passage) => {
      const original = originalDescriptions.get(passage);
      if (original) passage.setAttribute("aria-describedby", original);
      else passage.removeAttribute("aria-describedby");
    };

    const hide = () => {
      if (!activePassage) return;
      activePassage.setAttribute("aria-expanded", "false");
      restoreDescription(activePassage);
      activePassage = null;
      activeAnchor = null;
      activeMode = null;
      tooltip.hidden = true;
      tooltip.textContent = "";
    };

    const position = () => {
      if (!activeAnchor || tooltip.hidden) return;

      const gap = 10;
      const viewportPadding = 12;
      const tooltipRect = tooltip.getBoundingClientRect();
      const anchorRect = activeAnchor.getBoundingClientRect();
      let left = anchorRect.left + (anchorRect.width / 2) - (tooltipRect.width / 2);
      let top = anchorRect.top - tooltipRect.height - gap;

      left = Math.min(
        Math.max(viewportPadding, left),
        Math.max(viewportPadding, window.innerWidth - tooltipRect.width - viewportPadding)
      );

      if (top < viewportPadding) top = anchorRect.bottom + gap;
      top = Math.min(
        Math.max(viewportPadding, top),
        Math.max(viewportPadding, window.innerHeight - tooltipRect.height - viewportPadding)
      );

      tooltip.style.left = `${Math.round(left)}px`;
      tooltip.style.top = `${Math.round(top)}px`;
    };

    const show = (passage, anchor, mode) => {
      if (activePassage && activePassage !== passage) {
        activePassage.setAttribute("aria-expanded", "false");
        restoreDescription(activePassage);
      }

      activePassage = passage;
      activeAnchor = anchor;
      activeMode = mode;
      openingScrollX = window.scrollX;
      openingScrollY = window.scrollY;
      tooltip.textContent = passage.dataset.translation;
      tooltip.hidden = false;
      passage.setAttribute("aria-expanded", "true");

      const original = originalDescriptions.get(passage);
      passage.setAttribute("aria-describedby", [original, tooltipId].filter(Boolean).join(" "));
      position();
    };

    const selectionDetails = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.toString().trim() || !selection.rangeCount) return null;

      const range = selection.getRangeAt(0);
      const start = range.startContainer.nodeType === Node.ELEMENT_NODE
        ? range.startContainer
        : range.startContainer.parentElement;
      const end = range.endContainer.nodeType === Node.ELEMENT_NODE
        ? range.endContainer
        : range.endContainer.parentElement;
      const passage = start?.closest?.(".translate-on-select[data-translation]");

      if (!passage || passage !== end?.closest?.(".translate-on-select[data-translation]")) return null;
      if (!passage.dataset.translation.trim()) return null;

      const rect = range.getBoundingClientRect();
      return {
        passage,
        anchor: rect.width || rect.height ? range : passage
      };
    };

    const showSelection = () => {
      const details = selectionDetails();
      if (details) show(details.passage, details.anchor, "selection");
      else if (activeMode === "selection") hide();
    };

    passages.forEach((passage) => {
      originalDescriptions.set(passage, passage.getAttribute("aria-describedby"));
      if (!passage.hasAttribute("tabindex")) passage.tabIndex = 0;
      if (!passage.hasAttribute("role") && !passage.querySelector("a, button, input, select, textarea")) {
        passage.setAttribute("role", "button");
      }
      passage.setAttribute("aria-controls", tooltipId);
      passage.setAttribute("aria-expanded", "false");

      passage.addEventListener("keydown", (event) => {
        if (event.target !== passage || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        if (activePassage === passage && activeMode === "keyboard") hide();
        else show(passage, passage, "keyboard");
      });
    });

    document.addEventListener("pointerdown", (event) => {
      if (!event.target.closest?.(".translate-on-select[data-translation], .translation-tooltip")) hide();
    });

    document.addEventListener("pointerup", (event) => {
      const passage = event.target.closest?.(".translate-on-select[data-translation]");
      const touchLike = event.pointerType === "touch" || event.pointerType === "pen";

      if (!touchLike) {
        window.requestAnimationFrame(showSelection);
        return;
      }

      if (!passage || event.target.closest("a, button, input, select, textarea")) return;
      window.requestAnimationFrame(() => {
        const details = selectionDetails();
        if (details) {
          show(details.passage, details.anchor, "selection");
        } else if (activePassage === passage && activeMode === "touch") {
          hide();
        } else {
          show(passage, passage, "touch");
        }
      });
    });

    document.addEventListener("selectionchange", () => {
      if (activeMode === "selection" && !selectionDetails()) hide();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hide();
    });

    window.addEventListener("scroll", () => {
      if (!activePassage) return;
      const distance = Math.hypot(window.scrollX - openingScrollX, window.scrollY - openingScrollY);
      if (distance >= 40) hide();
      else position();
    }, { passive: true });

    window.addEventListener("resize", hide, { passive: true });
  }

  function setupLightbox() {
    document.querySelectorAll("figure.kg-image-card").forEach((figure) => {
      const image = figure.querySelector("img.kg-image");
      const caption = figure.querySelector("figcaption");
      if (!image || image.closest("a")) return;

      const link = document.createElement("a");
      link.href = image.currentSrc || image.src;
      link.dataset.fslightbox = "post-images";
      link.dataset.type = "image";
      link.setAttribute("aria-label", "Open image in lightbox");
      link.appendChild(image);
      figure.replaceChildren(link);
      if (caption) figure.appendChild(caption);
    });

    document.querySelectorAll(".kg-gallery-card img").forEach((image) => {
      if (image.closest("a")) return;

      const link = document.createElement("a");
      link.href = image.currentSrc || image.src;
      link.dataset.noSwup = "";
      link.dataset.fslightbox = "post-images";
      link.dataset.type = "image";
      link.setAttribute("aria-label", "Open image in lightbox");
      image.before(link);
      link.appendChild(image);
    });

    if (typeof refreshFsLightbox === "function") {
      refreshFsLightbox();
      return;
    }

    const lightboxUrl = document.body?.dataset.fslightboxJs;
    if (lightboxUrl && document.querySelector('a[data-fslightbox="post-images"]')) {
      const script = document.createElement("script");
      script.src = lightboxUrl;
      script.defer = true;
      script.onload = () => {
        if (typeof refreshFsLightbox === "function") refreshFsLightbox();
      };
      document.body.appendChild(script);
    }
  }

  function setupPrism() {
    const prismCss = document.body?.dataset.prismCss;
    const prismJs = document.body?.dataset.prismJs;
    if (!prismJs || !document.querySelector('pre code[class*="language-"]')) return;

    if (prismCss && !document.getElementById("fizzy-mdr-prism-css")) {
      const link = document.createElement("link");
      link.id = "fizzy-mdr-prism-css";
      link.rel = "stylesheet";
      link.href = prismCss;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = prismJs;
    script.defer = true;
    script.onload = () => {
      if (window.Prism && typeof window.Prism.highlightAll === "function") {
        window.Prism.highlightAll();
      }
    };
    document.body.appendChild(script);
  }

  function setupMath() {
    if (document.body?.dataset.katex !== "true") return;
    const content = document.querySelector(".post-content");
    if (!content) return;

    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest("pre, code, script, style, textarea, noscript")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });

    let hasMath = false;
    let current;
    while ((current = walker.nextNode())) {
      const text = current.nodeValue || "";
      if (text.includes("$$") || (text.indexOf("$") !== -1 && text.indexOf("$", text.indexOf("$") + 1) !== -1)) {
        hasMath = true;
        break;
      }
    }
    if (!hasMath) return;

    if (!document.getElementById("fizzy-mdr-katex-css")) {
      const link = document.createElement("link");
      link.id = "fizzy-mdr-katex-css";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.css";
      link.integrity = "sha384-1vdNCNel6Tx/NQa8IR1mGOGKsbGreCkOPfbtPPnUURJ5Tu2PRVfQ/7KLZC+Pi1p1";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    const loadScript = (src, integrity, onLoad) => {
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.integrity = integrity;
      script.crossOrigin = "anonymous";
      if (onLoad) script.onload = onLoad;
      document.body.appendChild(script);
    };

    loadScript(
      "https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/katex.min.js",
      "sha384-ycJ6GAwiS15LoUPipwJOrWTvkUHl/YqELValBwI5I4awP1EeEQJYarj+w85ntcz7",
      () => {
        loadScript(
          "https://cdn.jsdelivr.net/npm/katex@0.18.1/dist/contrib/auto-render.min.js",
          "sha384-bjyGPfbij8/NDKJhSGZNP/khQVgtHUE5exjm4Ydllo42FwIgYsdLO2lXGmRBf5Mz",
          () => {
            if (typeof window.renderMathInElement === "function") {
              window.renderMathInElement(content, {
                delimiters: [
                  { left: "$$", right: "$$", display: true },
                  { left: "$", right: "$", display: false }
                ]
              });
            }
          }
        );
      }
    );
  }

  function syncGhostSearchTheme(theme = getTheme()) {
    const styleUrl = document.body?.dataset.searchStyleUrl || "";
    const hostStyles = window.getComputedStyle(document.documentElement);
    const siteAccent = hostStyles.getPropertyValue("--site-accent").trim();
    const siteAccentContrast = hostStyles.getPropertyValue("--site-accent-contrast").trim();

    document.querySelectorAll("#sodo-search-root iframe").forEach((frame) => {
      try {
        const frameDocument = frame.contentDocument;
        if (!frameDocument?.documentElement || !frameDocument.head) return;

        frameDocument.documentElement.setAttribute("data-mdr-theme", theme);
        frameDocument.documentElement.style.colorScheme = theme;
        if (siteAccent) frameDocument.documentElement.style.setProperty("--site-accent", siteAccent);
        if (siteAccentContrast) frameDocument.documentElement.style.setProperty("--site-accent-contrast", siteAccentContrast);

        if (styleUrl && !frameDocument.getElementById("fizzy-mdr-search-theme")) {
          const link = frameDocument.createElement("link");
          link.id = "fizzy-mdr-search-theme";
          link.rel = "stylesheet";
          link.href = styleUrl;
          frameDocument.head.appendChild(link);
        }
      } catch {
        // Ignore inaccessible frames; native search remains usable without the bridge.
      }
    });
  }

  function setupGhostSearchStyling() {
    let searchObserver = null;
    let discoveryObserver = null;

    const styleSearch = () => {
      const root = document.getElementById("sodo-search-root");
      document.documentElement.classList.toggle("mdr-search-open", Boolean(root?.querySelector(".gh-root-frame")));

      root?.querySelectorAll("iframe").forEach((frame) => {
        if (frame.dataset.mdrSearchBound === "true") return;
        frame.dataset.mdrSearchBound = "true";
        frame.addEventListener("load", () => syncGhostSearchTheme(), { passive: true });
      });

      syncGhostSearchTheme();
    };

    const observeSearchRoot = (root) => {
      if (searchObserver) searchObserver.disconnect();
      searchObserver = new MutationObserver(styleSearch);
      searchObserver.observe(root, { childList: true, subtree: true });
      styleSearch();
    };

    const existingRoot = document.getElementById("sodo-search-root");
    if (existingRoot) {
      observeSearchRoot(existingRoot);
      return;
    }

    discoveryObserver = new MutationObserver(() => {
      const root = document.getElementById("sodo-search-root");
      if (!root) return;
      discoveryObserver.disconnect();
      observeSearchRoot(root);
    });
    discoveryObserver.observe(document.body, { childList: true });
  }

  function setupTheme() {
    const root = document.documentElement;
    const toggles = Array.from(document.querySelectorAll(".theme-toggle"));
    const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
    const themeColorMeta = document.getElementById("theme-color-meta");

    const readPref = () => {
      try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === "light" || stored === "dark") return stored;
      } catch {
        // Treat unavailable storage as system preference.
      }
      return "system";
    };

    const resolveTheme = (pref) => {
      if (pref === "light" || pref === "dark") return pref;
      return systemTheme?.matches ? "dark" : "light";
    };

    const nextPref = (pref) => {
      if (pref === "system") return "light";
      if (pref === "light") return "dark";
      return "system";
    };

    const updateControls = (pref) => {
      const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
      const label = `Theme: ${cap(pref)} (click for ${cap(nextPref(pref))})`;

      toggles.forEach((toggle) => {
        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
      });
    };

    const applyPref = (pref, persist = false) => {
      const theme = resolveTheme(pref);
      root.setAttribute("data-theme-pref", pref);
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
      themeColorMeta?.setAttribute("content", theme === "dark" ? "#1c1d20" : "#f6f2e9");

      if (persist) {
        try {
          if (pref === "system") {
            window.localStorage.removeItem(THEME_STORAGE_KEY);
          } else {
            window.localStorage.setItem(THEME_STORAGE_KEY, pref);
          }
        } catch {
          // Theme still applies for the current page if storage is unavailable.
        }
      }

      updateControls(pref);
      syncGhostSearchTheme(theme);
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const currentPref = root.getAttribute("data-theme-pref") || readPref();
        applyPref(nextPref(currentPref), true);
      });
    });

    if (systemTheme) {
      const onSystemChange = () => {
        if (readPref() === "system") applyPref("system");
      };

      if (systemTheme.addEventListener) systemTheme.addEventListener("change", onSystemChange);
      else if (systemTheme.addListener) systemTheme.addListener(onSystemChange);
    }

    applyPref(readPref());
  }

  function setupArticleTitleFit() {
    const title = document.querySelector(".single-article .post-wrap > .title");
    if (!title) return;

    const MIN_PX = 22; // 1.375rem floor so ultra-long titles still wrap cleanly

    const fit = () => {
      title.style.fontSize = "";
      title.style.whiteSpace = "";
      if (window.innerWidth < 769) return;

      let size = parseFloat(window.getComputedStyle(title).fontSize);
      const avail = title.clientWidth;
      if (!size || !avail) return;

      title.style.whiteSpace = "nowrap";
      let needed = title.scrollWidth;

      if (needed > avail) {
        size = Math.max(MIN_PX, Math.floor(size * (avail / needed) * 2) / 2);
        title.style.fontSize = `${size}px`;

        // Step down cleanly in 0.5px increments to account for non-linear kerning
        while (title.scrollWidth > avail && size > MIN_PX) {
          size = Math.max(MIN_PX, size - 0.5);
          title.style.fontSize = `${size}px`;
        }
      }

      // Only allow wrapping if it still overflows even at the minimum readable size
      if (title.scrollWidth > avail) {
        title.style.whiteSpace = "";
      }
    };

    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", fit, { passive: true });
  }

  onReady(() => {
    setupNavbar();
    setupArchiveGroups();
    setupCarousel();
    setupCaptionBreaks();
    setupTranslations();
    setupLightbox();
    setupPrism();
    setupMath();
    setupGhostSearchStyling();
    setupTheme();
    setupArticleTitleFit();
  });
})();
