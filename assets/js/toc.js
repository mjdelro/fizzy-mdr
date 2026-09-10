"use strict";
(function () {
  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "") || "section";
  }

  function uniqueId(base, used) {
    var id = base;
    var count = 2;
    while (used.has(id) || document.getElementById(id)) id = base + "-" + count++;
    used.add(id);
    return id;
  }

  function build(container, headings) {
    if (!container || !headings.length) return;
    var root = document.createElement("ul");
    root.className = "toc-list";
    var currentH2 = null;

    headings.forEach(function (heading) {
      var li = document.createElement("li");
      li.dataset.tocTarget = heading.id;
      var link = document.createElement("a");
      link.href = "#" + heading.id;
      link.textContent = heading.textContent.trim();
      li.appendChild(link);

      if (heading.tagName === "H3" && currentH2) {
        var nested = currentH2.querySelector("ul");
        if (!nested) {
          nested = document.createElement("ul");
          currentH2.appendChild(nested);
        }
        nested.appendChild(li);
      } else {
        root.appendChild(li);
        if (heading.tagName === "H2") currentH2 = li;
      }
    });
    container.replaceChildren(root);
  }

  function init() {
    var content = document.querySelector(".post-content");
    var containers = [document.getElementById("toc"), document.getElementById("toc-img")].filter(Boolean);
    if (!content || !containers.length) return;

    var headings = Array.prototype.slice.call(content.querySelectorAll("h2, h3"));
    if (!headings.length) {
      containers.forEach(function (c) { c.hidden = true; });
      return;
    }

    var used = new Set();
    headings.forEach(function (heading) {
      if (!heading.id) heading.id = uniqueId(slugify(heading.textContent), used);
      else used.add(heading.id);
    });
    containers.forEach(function (container) { build(container, headings); });

    var links = Array.prototype.slice.call(document.querySelectorAll("#toc li[data-toc-target], #toc-img li[data-toc-target]"));
    function activate(id) {
      links.forEach(function (li) { li.classList.toggle("active", li.dataset.tocTarget === id); });
    }

    if ("IntersectionObserver" in window) {
      var visible = new Map();
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible.set(entry.target.id, entry.isIntersecting ? entry.boundingClientRect.top : null); });
        var candidates = headings.filter(function (h) { return visible.get(h.id) !== null && visible.get(h.id) !== undefined; });
        if (candidates.length) {
          candidates.sort(function (a, b) { return Math.abs(visible.get(a.id)) - Math.abs(visible.get(b.id)); });
          activate(candidates[0].id);
        }
      }, {rootMargin: "-15% 0px -70% 0px", threshold: 0});
      headings.forEach(function (heading) { observer.observe(heading); });
    }

    var imageToc = document.getElementById("toc-img");
    if (imageToc) {
      var updateSticky = function () {
        imageToc.classList.toggle("is-fixed", window.scrollY >= 400);
        imageToc.classList.toggle("is-absolute", window.scrollY < 400);
      };
      updateSticky();
      window.addEventListener("scroll", updateSticky, {passive:true});
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
