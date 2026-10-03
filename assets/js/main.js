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
    });
  }

  function setupArchiveGroups() {
    const items = Array.from(document.querySelectorAll(".post-archive-item"));
    let year = null;
    let month = null;

    items.forEach((item) => {
      const nextYear = item.dataset.year;
      const nextMonth = item.dataset.month;

      if (nextYear !== year) {
        const divider = document.createElement("hr");
        const heading = document.createElement("h2");
        heading.textContent = nextYear;
        item.before(divider, heading);
        year = nextYear;
        month = null;
      }

      if (nextMonth !== month) {
        const subheading = document.createElement("h4");
        subheading.textContent = nextMonth;
        item.before(subheading);
        month = nextMonth;
      }
    });
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

    const show = (nextIndex, animate = true) => {
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

      const outgoingAnimation = current.animate([
        { transform: "translateX(0%)" },
        { transform: "translateX(-100%)" }
      ], timing);

      const incomingAnimation = incoming.animate([
        { transform: "translateX(100%)" },
        { transform: "translateX(0%)" }
      ], timing);

      Promise.allSettled([outgoingAnimation.finished, incomingAnimation.finished]).then(() => {
        setActive(nextIndex);
        outgoingAnimation.cancel();
        incomingAnimation.cancel();
      });
    };

    setActive(index);
    previous?.addEventListener("click", () => show((index - 1 + slides.length) % slides.length));
    next?.addEventListener("click", () => show((index + 1) % slides.length));
    pips.forEach((pip) => {
      pip.addEventListener("click", () => show(Number(pip.dataset.carouselSlide) - 1));
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

    if (typeof refreshFsLightbox === "function") refreshFsLightbox();
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
    discoveryObserver.observe(document.body, { childList: true, subtree: true });
  }

  function setupTheme() {
    const root = document.documentElement;
    const toggles = Array.from(document.querySelectorAll(".theme-toggle"));
    const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
    const themeColorMeta = document.getElementById("theme-color-meta");

    const updateControls = (theme) => {
      const nextTheme = theme === "dark" ? "light" : "dark";
      const label = `Switch to ${nextTheme} mode`;

      toggles.forEach((toggle) => {
        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
        toggle.setAttribute("aria-pressed", String(theme === "dark"));
        const text = toggle.querySelector(".theme-toggle-text");
        if (text) text.textContent = label;
      });
    };

    const applyTheme = (theme, persist = false) => {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
      themeColorMeta?.setAttribute("content", theme === "dark" ? "#111111" : "#f5f6f4");

      if (persist) {
        try {
          window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
          // Theme still applies for the current page if storage is unavailable.
        }
      }

      updateControls(theme);
      syncGhostSearchTheme(theme);
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => applyTheme(getTheme() === "dark" ? "light" : "dark", true));
    });

    if (systemTheme) {
      const onSystemChange = (event) => {
        let storedTheme = null;
        try {
          storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        } catch {
          // Treat unavailable storage as no explicit preference.
        }
        if (storedTheme !== "light" && storedTheme !== "dark") applyTheme(event.matches ? "dark" : "light");
      };

      if (systemTheme.addEventListener) systemTheme.addEventListener("change", onSystemChange);
      else if (systemTheme.addListener) systemTheme.addListener(onSystemChange);
    }

    applyTheme(getTheme());
  }

  onReady(() => {
    setupNavbar();
    setupArchiveGroups();
    setupCarousel();
    setupCaptionBreaks();
    setupLightbox();
    setupGhostSearchStyling();
    setupTheme();
  });
})();
