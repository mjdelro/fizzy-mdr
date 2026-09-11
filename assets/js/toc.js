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

    const items = Array.from(document.querySelectorAll("#toc li[data-toc-target], #toc-img li[data-toc-target]"));
    const activate = (id) => {
      items.forEach((item) => item.classList.toggle("active", item.dataset.tocTarget === id));
    };

    if ("IntersectionObserver" in window) {
      const visible = new Map();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.boundingClientRect.top : null);
        });

        const candidates = headings.filter((heading) => visible.get(heading.id) !== null && visible.get(heading.id) !== undefined);
        if (candidates.length === 0) return;

        candidates.sort((a, b) => Math.abs(visible.get(a.id)) - Math.abs(visible.get(b.id)));
        activate(candidates[0].id);
      }, {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0
      });

      headings.forEach((heading) => observer.observe(heading));
    }

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
