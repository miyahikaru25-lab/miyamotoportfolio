/* =========================================================
   宮本 輝 Portfolio — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- モバイルナビの開閉 ---- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  // メニュー内リンクを押したら閉じる
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  // Escでメニューを閉じる
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---- スクロールで要素をふわっと表示 ---- */
  const targets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- 作品のライトボックス ---- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  let lastFocused = null;

  function openLightbox(src, alt) {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll(".work__thumb, .work-row__thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.link) {
        window.open(btn.dataset.link, "_blank", "noopener noreferrer");
        return;
      }
      const img = btn.querySelector("img");
      openLightbox(btn.dataset.full, img ? img.alt : "");
    });
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });

  /* ---- ヘッダーをスクロールで少し締める ---- */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", function () {
    const y = window.scrollY;
    header.style.boxShadow = y > 8 ? "0 6px 20px rgba(28,24,21,.08)" : "none";
  }, { passive: true });
})();
