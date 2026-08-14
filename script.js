/* Crafty Dazzle — site renderer
   Loads content/site-content.json (editable via /admin) and fills the page. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wa = (whatsapp, message) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
};

const setMultilineHTML = (id, value) => {
  // Turns "line one\nline two" into "line one<br>line two" — used for headings only.
  const el = document.getElementById(id);
  if (el && value != null) el.innerHTML = value.replace(/\n/g, "<br>");
};

async function loadContent() {
  const res = await fetch("content/site-content.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load site content");
  return res.json();
}

function renderBrand(C) {
  setText("topbar", C.topbar);
  document.title = `${C.brand} | ${C.tagline}`;

  const waShop = wa(C.whatsapp, "Hello Crafty Dazzle! I would like to see your collection.");
  const waCustom = wa(C.whatsapp, "Hello Crafty Dazzle! I would like to discuss a custom gift.");
  const waContact = wa(C.whatsapp, "Hello Crafty Dazzle! I would like to enquire about your products.");
  const waShop2 = wa(C.whatsapp, "Hello Crafty Dazzle! I would like to shop from your collection.");
  const waCustom2 = wa(C.whatsapp, "Hello Crafty Dazzle! I would like to place a custom order.");

  document.getElementById("waShop").href = waShop;
  document.getElementById("waShop2").href = waShop2;
  document.getElementById("waCustom").href = waCustom;
  document.getElementById("waCustom2").href = waCustom2;
  document.getElementById("waContact").href = waContact;
  document.getElementById("instagram").href = C.instagram;
  document.getElementById("reelLink").href = C.rosePreservationReel;
}

function renderHero(hero) {
  setText("heroEyebrow", hero.eyebrow);
  setMultilineHTML("heroHeading", hero.heading);
  setText("heroBody", hero.body);
  setText("heroShopBtn", hero.shopButton);
  setText("heroCustomBtn", hero.customButton);
  setText("heroMicro", hero.micro);
  setText("heroCaption", hero.caption);
  const img = document.getElementById("heroImg");
  img.src = hero.image;
  img.alt = `Crafty Dazzle — ${hero.caption || "featured piece"}`;
}

function renderAbout(about) {
  setText("aboutKicker", about.kicker);
  setText("aboutHeading", about.heading);
  setText("aboutBody", about.body);
  setText("reelLinkText", about.reelLinkText);
  const img = document.getElementById("aboutImg");
  img.src = about.image;
  img.alt = "Crafty Dazzle handcrafted resin art";
}

function renderCustom(custom) {
  setMultilineHTML("customHeading", custom.heading);
  setText("customBody", custom.body);
  setText("customBtnText", custom.button);
}

function renderContact(contact, C) {
  setText("contactHeading", contact.heading);
  setText("contactBody", contact.body);
  setText("contactBtnText", contact.button);
  setText("contactPhone", contact.phoneDisplay);
  setText("contactInsta", contact.instagramHandle);
  setText("contactTagline", C.tagline);
}

function renderFooter(footer, C) {
  setText("footerNote", footer.note);
  setText("footerCopyright", footer.copyright);
}

function renderProducts(products, C) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  products.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card fade";
    card.style.setProperty("--delay", `${(i % 6) * 70}ms`);
    card.innerHTML = `
      <button class="card-media image-button" type="button" aria-label="View ${p.name} full image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </button>
      <div class="card-body">
        <div class="tag">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a class="card-link" target="_blank" rel="noopener" href="${wa(C.whatsapp, "Hello Crafty Dazzle! I am interested in " + p.name + ".")}">Shop on WhatsApp →</a>
      </div>`;
    grid.appendChild(card);
  });
}

function renderCollections(collections, C) {
  const colGrid = document.getElementById("collectionGrid");
  colGrid.innerHTML = "";
  collections.forEach((c, i) => {
    const a = document.createElement("a");
    a.className = "collection fade";
    a.style.setProperty("--delay", `${i * 80}ms`);
    a.href = wa(C.whatsapp, "Hello Crafty Dazzle! I am interested in " + c.label + ".");
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<img src="${c.image}" alt="${c.label}" loading="lazy"><div class="collection-content"><div class="tag">${c.label}</div><h3>${c.label}</h3><p>${c.description}</p></div>`;
    colGrid.appendChild(a);
  });
}

function renderGallery(gallery) {
  setText("galleryKicker", gallery.kicker);
  setText("galleryHeading", gallery.heading);
  setText("galleryBody", gallery.body);
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";
  gallery.images.forEach((g, i) => {
    const fig = document.createElement("figure");
    fig.className = "gallery-item fade";
    fig.style.setProperty("--delay", `${(i % 8) * 60}ms`);
    fig.innerHTML = `
      <button class="card-media image-button" type="button" aria-label="View ${g.caption} full image">
        <img src="${g.image}" alt="${g.caption}" loading="lazy">
      </button>
      <figcaption>${g.caption}</figcaption>`;
    grid.appendChild(fig);
  });
}

function renderServices(services) {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = "";
  services.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "service fade";
    div.style.setProperty("--delay", `${(i % 4) * 70}ms`);
    div.innerHTML = `<div class="service-no">${s.number}</div><h3>${s.title}</h3><p>${s.description}</p>`;
    grid.appendChild(div);
  });
}

/* ---------- Lightbox (full, uncropped image viewer) ---------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".image-button");
    if (!btn) return;
    const img = btn.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add("open");
    document.body.classList.add("modal-open");
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("modal-open");
  }
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("menu");

  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  };

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll("a[data-close]").forEach((a) =>
    a.addEventListener("click", () => setOpen(false))
  );
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  if (reduceMotion) {
    document.querySelectorAll(".fade").forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".fade").forEach((el) => observer.observe(el));
}

/* ---------- Subtle hero parallax (desktop, mouse only) ---------- */
function initHeroParallax() {
  if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;
  const frame = document.getElementById("heroFrame");
  if (!frame) return;
  const img = frame.querySelector("img");
  frame.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `scale(1.03) translate(${x * -10}px, ${y * -10}px)`;
  });
  frame.addEventListener("mouseleave", () => { img.style.transform = ""; });
}

/* ---------- Sticky nav shadow on scroll ---------- */
function initNavShadow() {
  const nav = document.querySelector("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function hideLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;
  loader.classList.add("done");
  setTimeout(() => loader.remove(), 500);
}

(async function init() {
  initMobileMenu();
  initLightbox();
  initNavShadow();
  initHeroParallax();

  try {
    const C = await loadContent();
    renderBrand(C);
    renderHero(C.hero);
    renderAbout(C.about);
    renderCustom(C.custom);
    renderContact(C.contact, C);
    renderFooter(C.footer, C);
    renderProducts(C.products, C);
    renderCollections(C.collections, C);
    renderGallery(C.gallery);
    renderServices(C.services);
  } catch (err) {
    console.error("Crafty Dazzle: failed to load site content", err);
  }

  initScrollReveal();
  hideLoader();
})();
