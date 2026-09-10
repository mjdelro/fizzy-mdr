"use strict";

(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  // Add Prism line-number classes before Prism initializes on DOMContentLoaded.
  if (document.body && document.body.dataset.lineNumbers === "true") {
    document.querySelectorAll(".post-content pre").forEach(function (pre) {
      pre.classList.add("line-numbers");
    });
  }

  function setupNavbar() {
    document.querySelectorAll(".navbar-burger").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = document.getElementById(button.dataset.target);
        if (!target) return;
        var active = button.classList.toggle("is-active");
        target.classList.toggle("is-active", active);
        button.setAttribute("aria-expanded", active ? "true" : "false");
      });
    });
  }

  function setupArchiveGroups() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".post-archive-item"));
    var year = null;
    var month = null;
    items.forEach(function (item) {
      var nextYear = item.dataset.year;
      var nextMonth = item.dataset.month;
      if (nextYear !== year) {
        var divider = document.createElement("hr");
        var heading = document.createElement("h2");
        heading.textContent = nextYear;
        item.parentNode.insertBefore(divider, item);
        item.parentNode.insertBefore(heading, item);
        year = nextYear;
        month = null;
      }
      if (nextMonth !== month) {
        var subheading = document.createElement("h4");
        subheading.textContent = nextMonth;
        item.parentNode.insertBefore(subheading, item);
        month = nextMonth;
      }
    });
  }

  function setupCarousel() {
    var carousel = document.getElementById("carousel-home");
    if (!carousel) return;
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-item"));
    if (slides.length < 2) return;

    var index = Math.max(0, slides.findIndex(function (slide) { return slide.classList.contains("is-active"); }));
    var timer = null;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(next) {
      slides.forEach(function (slide, i) {
        var active = i === next;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      index = next;
    }
    function start() {
      if (reduceMotion || timer) return;
      timer = window.setInterval(function () { show((index + 1) % slides.length); }, 6000);
    }
    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    show(index);
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    start();
  }

  function setupLightbox() {
    document.querySelectorAll("figure.kg-image-card").forEach(function (figure) {
      var image = figure.querySelector("img.kg-image");
      var caption = figure.querySelector("figcaption");
      if (!image || image.closest("a")) return;
      var link = document.createElement("a");
      link.href = image.currentSrc || image.src;
      link.setAttribute("data-fslightbox", "post-images");
      link.setAttribute("aria-label", "Open image in lightbox");
      link.appendChild(image);
      figure.replaceChildren(link);
      if (caption) figure.appendChild(caption);
    });

    document.querySelectorAll(".kg-gallery-card img").forEach(function (image) {
      if (image.closest("a")) return;
      var link = document.createElement("a");
      link.href = image.currentSrc || image.src;
      link.setAttribute("data-no-swup", "");
      link.setAttribute("data-fslightbox", "post-images");
      link.setAttribute("aria-label", "Open image in lightbox");
      image.parentNode.insertBefore(link, image);
      link.appendChild(image);
    });

    if (typeof refreshFsLightbox === "function") refreshFsLightbox();
  }

  function setupTheme() {
    var storageKey = "fizzy-color-scheme";
    var root = document.documentElement;
    var toggles = Array.prototype.slice.call(document.querySelectorAll(".theme-toggle"));
    var mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    var themeColorMeta = document.getElementById("theme-color-meta");

    function currentTheme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    function updateControls(theme) {
      var nextTheme = theme === "dark" ? "light" : "dark";
      var label = "Switch to " + nextTheme + " mode";
      toggles.forEach(function (toggle) {
        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        var text = toggle.querySelector(".theme-toggle-text");
        if (text) text.textContent = label;
      });
    }
    function applyTheme(theme, persist) {
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
      if (themeColorMeta) themeColorMeta.setAttribute("content", theme === "dark" ? "#111512" : "#f5f6f4");
      if (persist) {
        try { window.localStorage.setItem(storageKey, theme); } catch (error) {}
      }
      updateControls(theme);
    }

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () { applyTheme(currentTheme() === "dark" ? "light" : "dark", true); });
    });

    if (mediaQuery) {
      var onSystemChange = function (event) {
        var stored = null;
        try { stored = window.localStorage.getItem(storageKey); } catch (error) {}
        if (stored !== "light" && stored !== "dark") applyTheme(event.matches ? "dark" : "light", false);
      };
      if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", onSystemChange);
      else if (mediaQuery.addListener) mediaQuery.addListener(onSystemChange);
    }
    applyTheme(currentTheme(), false);
  }

  ready(function () {
    setupNavbar();
    setupArchiveGroups();
    setupCarousel();
    setupLightbox();
    setupTheme();
  });
}());
