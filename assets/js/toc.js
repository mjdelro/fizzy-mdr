"use strict";

(() => {
  const slugify = (text) => text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

  const uniqueId = (base, used) => {
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return id;
  };

  function buildToc(container, headings) {
    if (!container || headings.length === 0) return;

    const root = document.createElement("ul");
    root.className = "toc-list";
    let currentH2 = null;

    headings.forEach((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      item.dataset.tocTarget = heading.id;
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      item.appendChild(link);

      if (heading.tagName === "H3" && currentH2) {
        let nested = currentH2.querySelector(":scope > ul");
        if (!nested) {
          nested = document.createElement("ul");
          currentH2.appendChild(nested);
        }
        nested.appendChild(item);
        return;
      }

      root.appendChild(item);
      if (heading.tagName === "H2") currentH2 = item;
    });

    container.replaceChildren(root);
  }

  function getHeadingOffset(content) {
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const contentStyles = window.getComputedStyle(content);
    const lineHeight = parseFloat(contentStyles.lineHeight) || 24;
    return navbarHeight + lineHeight;
  }

  function scrollToHeading(event, heading, content) {
    event.preventDefault();

    const targetTop = window.scrollY + heading.getBoundingClientRect().top - getHeadingOffset(content);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reduceMotion ? "auto" : "smooth"
    });

    if (window.location.hash !== `#${heading.id}`) {
      window.history.pushState(null, "", `#${heading.id}`);
    }
  }

  function initToc() {
    const content = document.querySelector(".post-content");
    const containers = [document.getElementById("toc"), document.getElementById("toc-img")].filter(Boolean);
    if (!content || containers.length === 0) return;

    const headings = Array.from(content.querySelectorAll("h2, h3"));
    if (headings.length === 0) {
      containers.forEach((container) => { container.hidden = true; });
      return;
    }

    const usedIds = new Set();
    headings.forEach((heading) => {
      const base = heading.id || slugify(heading.textContent);
      heading.id = uniqueId(base, usedIds);
    });

    containers.forEach((container) => buildToc(container, headings));

    const syncHeadingOffset = () => {
      document.documentElement.style.setProperty("--toc-scroll-offset", `${getHeadingOffset(content)}px`);
    };
    syncHeadingOffset();

    const items = Array.from(document.querySelectorAll("#toc li[data-toc-target], #toc-img li[data-toc-target]"));
    const activate = (id) => {
      items.forEach((item) => item.classList.toggle("active", item.dataset.tocTarget === id));
    };

    // Keep a clicked TOC item active while smooth scrolling so the scroll spy
    // cannot briefly jump back to the section we are leaving.
    let pendingTargetId = null;
    let pendingTargetTimer = null;

    const clearPendingTarget = () => {
      pendingTargetId = null;
      if (pendingTargetTimer) {
        window.clearTimeout(pendingTargetTimer);
        pendingTargetTimer = null;
      }
    };

    let spyTicking = false;
    const updateActiveFromScroll = () => {
      const offset = getHeadingOffset(content);

      if (pendingTargetId) {
        const pendingHeading = document.getElementById(pendingTargetId);
        if (pendingHeading && Math.abs(pendingHeading.getBoundingClientRect().top - offset) <= 6) {
          const reachedId = pendingTargetId;
          clearPendingTarget();
          activate(reachedId);
        }

        if (pendingTargetId) {
          spyTicking = false;
          return;
        }
      }

      let activeId = headings[0].id;
      const marker = offset + 2;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= marker) activeId = heading.id;
        else break;
      }

      // Ensure the final short section can become active even when it cannot
      // scroll all the way up to the marker before the document ends.
      const root = document.documentElement;
      if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
        activeId = headings[headings.length - 1].id;
      }

      activate(activeId);
      spyTicking = false;
    };

    const requestSpyUpdate = () => {
      if (spyTicking) return;
      spyTicking = true;
      window.requestAnimationFrame(updateActiveFromScroll);
    };

    containers.forEach((container) => {
      container.querySelectorAll("a[href^='#']").forEach((link) => {
        const id = link.getAttribute("href").slice(1);
        const heading = document.getElementById(id);
        if (!heading) return;

        link.addEventListener("click", (event) => {
          pendingTargetId = id;
          activate(id);

          if (pendingTargetTimer) window.clearTimeout(pendingTargetTimer);
          pendingTargetTimer = window.setTimeout(() => {
            clearPendingTarget();
            requestSpyUpdate();
          }, 2000);

          scrollToHeading(event, heading, content);
        });
      });
    });

    window.addEventListener("scroll", requestSpyUpdate, { passive: true });
    window.addEventListener("resize", () => {
      syncHeadingOffset();
      requestSpyUpdate();
    }, { passive: true });

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", () => {
        clearPendingTarget();
        requestSpyUpdate();
      }, { passive: true });
    }

    // User-initiated scrolling should immediately hand control back to the spy.
    const releaseOnUserScroll = () => {
      if (!pendingTargetId) return;
      clearPendingTarget();
      requestSpyUpdate();
    };
    window.addEventListener("wheel", releaseOnUserScroll, { passive: true });
    window.addEventListener("touchstart", releaseOnUserScroll, { passive: true });
    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        releaseOnUserScroll();
      }
    });

    updateActiveFromScroll();

    const imageToc = document.getElementById("toc-img");
    if (imageToc) {
      let ticking = false;
      const updateSticky = () => {
        imageToc.classList.toggle("is-fixed", window.scrollY >= 400);
        imageToc.classList.toggle("is-absolute", window.scrollY < 400);
        ticking = false;
      };
      const requestStickyUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateSticky);
      };

      updateSticky();
      window.addEventListener("scroll", requestStickyUpdate, { passive: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToc, { once: true });
  } else {
    initToc();
  }
})();
