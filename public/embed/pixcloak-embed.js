(function () {
  if (window.__pixcloakEmbedInitialized) return; // prevent double init
  window.__pixcloakEmbedInitialized = true;

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
    var utm = opts.utm || "embed";
    params.push("utm_source=" + encodeURIComponent(utm));
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
    if (el.getAttribute("data-pixcloak-embed-ready") === "1") return;
    var kb = toInt(el.getAttribute("data-kb"), null);
    var fmt = el.getAttribute("data-format"); // image/jpeg | image/webp | image/png
    var resize = el.getAttribute("data-resize"); // e.g., 1920
    var utm = el.getAttribute("data-utm-source") || undefined;
    var text = el.getAttribute("data-text");
    var lang = (el.getAttribute("data-lang") || "en").toLowerCase();
    var i18n = {
      en: "Compress image",
      zh: "压缩图片",
      es: "Comprimir imagen",
      pt: "Comprimir imagem",
      id: "Kompres gambar",
    };
    var url = buildUrl({ kb: kb, format: fmt, resize: resize, utm: utm });
    el.setAttribute("href", url);
    el.setAttribute("rel", "noopener noreferrer nofollow");
    if (!el.textContent || !el.textContent.trim()) {
      el.textContent = text
        ? text
        : kb
        ? lang === "zh"
          ? "压缩到 " + kb + "KB（本地）"
          : "Compress to " + kb + "KB (local)"
        : i18n[lang] || i18n.en;
    }
    styleAsButton(el);
    el.setAttribute("data-pixcloak-embed-ready", "1");
  }

  function init() {
    var nodes = document.querySelectorAll("[data-pixcloak-embed]");
    for (var i = 0; i < nodes.length; i++) enhance(nodes[i]);
  }

  window.pixcloakEmbedInit = init; // expose for lazy calls

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
