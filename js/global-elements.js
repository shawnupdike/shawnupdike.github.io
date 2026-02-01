// js/global-elements.js
document.addEventListener("DOMContentLoaded", function () {
  // Load header and footer fragments
  (function () {
    // Compute base URL relative to this script
    function getBase() {
      try {
        // For ES modules
        if (
          typeof import.meta !== "undefined" &&
          import.meta.url
        ) {
          return new URL(".", import.meta.url).href;
        }
      } catch (e) {
        // ignore
      }
      // Fallback for classic scripts
      return new URL(".", location.href).href;
    }

    const base = getBase();
    const resolve = (p) => new URL(p, base).href;
    const target = document.getElementById("inner-body") || document.body;

    async function loadFragment(path, position = "beforeend", onInserted) {
      try {
        const res = await fetch(resolve(path), { cache: "no-cache" });
        if (!res.ok) throw new Error(res.status + " " + res.statusText);
        const html = await res.text();

        // Prevent duplicate insert if fragment declares an ID that already exists
        const idMatch = html.match(/id=["']([^"']+)["']/);
        if (idMatch && document.getElementById(idMatch[1])) return;

        target.insertAdjacentHTML(
          position === "afterbegin" ? "afterbegin" : "beforeend",
          html
        );
        if (typeof onInserted === "function") onInserted();
      } catch (err) {
        console.error("Load fragment error:", path, err);
      }
    }

    // Load header
    // script lives in /js/, includes are in the project root _includes/ folder
    loadFragment("../_includes/header.html", "afterbegin");

    // Load footer and update year if present
    loadFragment("../_includes/footer.html", "beforeend", function () {
      const yearSpan = document.getElementById("year");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    });
  })();
});
