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
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.target);
        if (!target) return;

        const active = button.classList.toggle("is-active");
        target.classList.toggle("is-active", active);
        button.setAttribute("aria-expanded", String(active));
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
    if (slides.length < 2) return;

    const intervalMs = 5000;
    const transitionMs = 600;
    let index = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let timer = null;
    let animating = false;

    const setActive = (next) => {
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === next;
        slide.classList.toggle("is-active", active);
        slide.classList.remove("is-transitioning");
        slide.setAttribute("aria-hidden", String(!active));
        slide.style.removeProperty("z-index");
      });
      index = next;
      animating = false;
    };

    const show = (next, animate = true) => {
      if (next === index || animating) return;

      const current = slides[index];
      const incoming = slides[next];
      const shouldAnimate = animate && typeof incoming.animate === "function";

      if (!shouldAnimate) {
        setActive(next);
        return;
      }

      animating = true;
      incoming.classList.add("is-transitioning");
      incoming.setAttribute("aria-hidden", "false");
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
        setActive(next);
        outgoingAnimation.cancel();
        incomingAnimation.cancel();
      });
    };

    const stop = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    };

    const schedule = () => {
      stop();
      if (document.hidden) return;

      timer = window.setTimeout(() => {
        show((index + 1) % slides.length);
        schedule();
      }, intervalMs);
    };

    setActive(index);

    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) schedule();
    });
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : schedule());
    window.addEventListener("pageshow", schedule);
    schedule();
  }

  function setupLightbox() {
    document.querySelectorAll("figure.kg-image-card").forEach((figure) => {
      const image = figure.querySelector("img.kg-image");
      const caption = figure.querySelector("figcaption");
      if (!image || image.closest("a")) return;

      const link = document.createElement("a");
      link.href = image.currentSrc || image.src;
      link.dataset.fslightbox = "post-images";
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
      link.setAttribute("aria-label", "Open image in lightbox");
      image.before(link);
      link.appendChild(image);
    });

    if (typeof refreshFsLightbox === "function") refreshFsLightbox();
  }

  function syncGhostSearchTheme(theme = getTheme()) {
    const styleUrl = document.body?.dataset.searchStyleUrl || "";

    document.querySelectorAll("#sodo-search-root iframe").forEach((frame) => {
      try {
        const frameDocument = frame.contentDocument;
        if (!frameDocument?.documentElement || !frameDocument.head) return;

        frameDocument.documentElement.setAttribute("data-mdr-theme", theme);
        frameDocument.documentElement.style.colorScheme = theme;

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
      themeColorMeta?.setAttribute("content", theme === "dark" ? "#111512" : "#f5f6f4");

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
    setupLightbox();
    setupGhostSearchStyling();
    setupTheme();
  });
})();
