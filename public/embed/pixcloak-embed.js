(function () {
  function toInt(value, fallback) {
    var n = parseInt(String(value), 10);
    return Number.isFinite(n) && n > 0 ? n : fallback;
  }

  function buildUrl(opts) {
    var base = "https://pixcloak.com/compress";
    var params = [];
    if (opts.kb) params.push("kb=" + encodeURIComponent(opts.kb));
    if (opts.format) params.push("format=" + encodeURIComponent(opts.format));
    if (opts.resize) params.push("resize=" + encodeURIComponent(opts.resize));
    params.push("utm_source=embed");
    return base + (params.length ? "?" + params.join("&") : "");
  }

  function styleAsButton(el) {
    el.style.display = "inline-block";
    el.style.background = "#111827";
    el.style.color = "#ffffff";
    el.style.padding = "8px 12px";
    el.style.borderRadius = "8px";
    el.style.textDecoration = "none";
    el.style.fontWeight = "600";
    el.style.fontFamily =
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
  }

  function enhance(el) {
    var kb = toInt(el.getAttribute("data-kb"), null);
    var fmt = el.getAttribute("data-format"); // image/jpeg | image/webp | image/png
    var resize = el.getAttribute("data-resize"); // e.g., 1920
    var url = buildUrl({ kb: kb, format: fmt, resize: resize });
    el.setAttribute("href", url);
    if (!el.textContent || !el.textContent.trim()) {
      el.textContent = kb
        ? "Compress to " + kb + "KB (local)"
        : "Open in PixCloak (local)";
    }
    styleAsButton(el);
  }

  function init() {
    var nodes = document.querySelectorAll("[data-pixcloak-embed]");
    for (var i = 0; i < nodes.length; i++) enhance(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
