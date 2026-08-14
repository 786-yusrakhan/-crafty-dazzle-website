/* Crafty Dazzle — site renderer
   Loads content/site-content.json (editable via /admin)
   and fills the page.
*/

const reduceMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---------- Helpers ---------- */

const wa = (whatsapp, message) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;


/*
  Makes image paths work correctly on Netlify/GitHub.

  Examples:
  images/test.png
  ./images/test.png

  become:

  /images/test.png
*/
function fixImagePath(path) {
  if (!path) return "";

  path = String(path).trim();

  // External images / data URLs
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  // Already an absolute/root path
  if (path.startsWith("/")) {
    return path;
  }

  // Remove ./ from beginning
  path = path.replace(/^\.\/+/, "");

  // Make root-relative
  return "/" + path;
}


const setText = (id, value) => {
  const el = document.getElementById(id);

  if (el && value != null) {
    el.textContent = value;
  }
};


const setMultilineHTML = (id, value) => {
  // Turns:
  // line one
  // line two
  //
  // into:
  // line one<br>line two

  const el = document.getElementById(id);

  if (el && value != null) {
    el.innerHTML = String(value).replace(/\n/g, "<br>");
  }
};


/* ---------- Load content ---------- */

async function loadContent() {

  const res = await fetch(
    "/content/site-content.json",
    {
      cache: "no-store"
    }
  );

  if (!res.ok) {
    throw new Error(
      `Could not load site content: ${res.status}`
    );
  }

  return res.json();
}


/* ---------- Brand ---------- */

function renderBrand(C) {

  setText("topbar", C.topbar);

  document.title =
    `${C.brand} | ${C.tagline}`;


  const waShop = wa(
    C.whatsapp,
    "Hello Crafty Dazzle! I would like to see your collection."
  );

  const waCustom = wa(
    C.whatsapp,
    "Hello Crafty Dazzle! I would like to discuss a custom gift."
  );

  const waContact = wa(
    C.whatsapp,
    "Hello Crafty Dazzle! I would like to enquire about your products."
  );

  const waShop2 = wa(
    C.whatsapp,
    "Hello Crafty Dazzle! I would like to shop from your collection."
  );

  const waCustom2 = wa(
    C.whatsapp,
    "Hello Crafty Dazzle! I would like to place a custom order."
  );


  const waShopEl = document.getElementById("waShop");
  const waShop2El = document.getElementById("waShop2");
  const waCustomEl = document.getElementById("waCustom");
  const waCustom2El = document.getElementById("waCustom2");
  const waContactEl = document.getElementById("waContact");
  const instagramEl = document.getElementById("instagram");
  const reelLinkEl = document.getElementById("reelLink");


  if (waShopEl) {
    waShopEl.href = waShop;
  }

  if (waShop2El) {
    waShop2El.href = waShop2;
  }

  if (waCustomEl) {
    waCustomEl.href = waCustom;
  }

  if (waCustom2El) {
    waCustom2El.href = waCustom2;
  }

  if (waContactEl) {
    waContactEl.href = waContact;
  }

  if (instagramEl && C.instagram) {
    instagramEl.href = C.instagram;
  }

  if (reelLinkEl && C.rosePreservationReel) {
    reelLinkEl.href = C.rosePreservationReel;
  }
}


/* ---------- Hero ---------- */

function renderHero(hero) {

  if (!hero) return;


  setText(
    "heroEyebrow",
    hero.eyebrow
  );

  setMultilineHTML(
    "heroHeading",
    hero.heading
  );

  setText(
    "heroBody",
    hero.body
  );

  setText(
    "heroShopBtn",
    hero.shopButton
  );

  setText(
    "heroCustomBtn",
    hero.customButton
  );

  setText(
    "heroMicro",
    hero.micro
  );

  setText(
    "heroCaption",
    hero.caption
  );


  const img =
    document.getElementById("heroImg");


  if (!img) return;


  /*
    IMPORTANT:
    Use the image from JSON if available.
    Otherwise use the known GitHub image.
  */

  const imagePath =
    hero.image ||
    "/images/haldi-mehndi-platter.png";


  img.src =
    fixImagePath(imagePath);


  img.alt =
    `Crafty Dazzle — ${
      hero.caption || "featured piece"
    }`;


  /*
    If JSON contains a wrong/missing image,
    automatically use the correct Haldi image.
  */

  img.onerror = function () {

    if (
      this.dataset.fallbackUsed !== "true"
    ) {

      this.dataset.fallbackUsed = "true";

      this.src =
        "/images/haldi-mehndi-platter.png";
    }

  };

}


/* ---------- About ---------- */

function renderAbout(about) {

  if (!about) return;


  setText(
    "aboutKicker",
    about.kicker
  );

  setText(
    "aboutHeading",
    about.heading
  );

  setText(
    "aboutBody",
    about.body
  );

  setText(
    "reelLinkText",
    about.reelLinkText
  );


  const img =
    document.getElementById("aboutImg");


  if (!img) return;


  const imagePath =
    about.image ||
    "/images/rose-preservation.jpg";


  img.src =
    fixImagePath(imagePath);


  img.alt =
    "Crafty Dazzle handcrafted resin art";


  /*
    Fallback if JSON has an incorrect image path.
  */

  img.onerror = function () {

    if (
      this.dataset.fallbackUsed !== "true"
    ) {

      this.dataset.fallbackUsed = "true";

      this.src =
        "/images/rose-preservation.jpg";
    }

  };

}


/* ---------- Custom ---------- */

function renderCustom(custom) {

  if (!custom) return;


  setMultilineHTML(
    "customHeading",
    custom.heading
  );

  setText(
    "customBody",
    custom.body
  );

  setText(
    "customBtnText",
    custom.button
  );
}


/* ---------- Contact ---------- */

function renderContact(contact, C) {

  if (!contact) return;


  setText(
    "contactHeading",
    contact.heading
  );

  setText(
    "contactBody",
    contact.body
  );

  setText(
    "contactBtnText",
    contact.button
  );

  setText(
    "contactPhone",
    contact.phoneDisplay
  );

  setText(
    "contactInsta",
    contact.instagramHandle
  );

  setText(
    "contactTagline",
    C.tagline
  );
}


/* ---------- Footer ---------- */

function renderFooter(footer, C) {

  if (!footer) return;


  setText(
    "footerNote",
    footer.note
  );

  setText(
    "footerCopyright",
    footer.copyright
  );
}


/* ---------- Products ---------- */

function renderProducts(products, C) {

  const grid =
    document.getElementById("productGrid");


  if (!grid) return;


  grid.innerHTML = "";


  if (!Array.isArray(products)) return;


  products.forEach((p, i) => {

    const card =
      document.createElement("article");


    card.className =
      "card fade";


    card.style.setProperty(
      "--delay",
      `${(i % 6) * 70}ms`
    );


    const imagePath =
      fixImagePath(p.image);


    card.innerHTML = `

      <button
        class="card-media image-button"
        type="button"
        aria-label="View ${p.name || "product"} full image">

        <img
          src="${imagePath}"
          alt="${p.name || "Crafty Dazzle product"}"
          loading="lazy">

      </button>

      <div class="card-body">

        <div class="tag">
          ${p.category || ""}
        </div>

        <h3>
          ${p.name || ""}
        </h3>

        <p>
          ${p.description || ""}
        </p>

        <a
          class="card-link"
          target="_blank"
          rel="noopener"
          href="${wa(
            C.whatsapp,
            "Hello Crafty Dazzle! I am interested in " +
            (p.name || "this product") +
            "."
          )}">
          Shop on WhatsApp →
        </a>

      </div>
    `;


    grid.appendChild(card);

  });

}


/* ---------- Collections ---------- */

function renderCollections(collections, C) {

  const colGrid =
    document.getElementById("collectionGrid");


  if (!colGrid) return;


  colGrid.innerHTML = "";


  if (!Array.isArray(collections)) return;


  collections.forEach((c, i) => {

    const a =
      document.createElement("a");


    a.className =
      "collection fade";


    a.style.setProperty(
      "--delay",
      `${i * 80}ms`
    );


    a.href =
      wa(
        C.whatsapp,
        "Hello Crafty Dazzle! I am interested in " +
        (c.label || "your collection") +
        "."
      );


    a.target = "_blank";

    a.rel = "noopener";


    const imagePath =
      fixImagePath(c.image);


    a.innerHTML = `

      <img
        src="${imagePath}"
        alt="${c.label || "Collection"}"
        loading="lazy">

      <div class="collection-content">

        <div class="tag">
          ${c.label || ""}
        </div>

        <h3>
          ${c.label || ""}
        </h3>

        <p>
          ${c.description || ""}
        </p>

      </div>

    `;


    colGrid.appendChild(a);

  });

}


/* ---------- Gallery ---------- */

function renderGallery(gallery) {

  if (!gallery) return;


  setText(
    "galleryKicker",
    gallery.kicker
  );

  setText(
    "galleryHeading",
    gallery.heading
  );

  setText(
    "galleryBody",
    gallery.body
  );


  const grid =
    document.getElementById("galleryGrid");


  if (!grid) return;


  grid.innerHTML = "";


  if (!Array.isArray(gallery.images)) {
    return;
  }


  gallery.images.forEach((g, i) => {

    const fig =
      document.createElement("figure");


    fig.className =
      "gallery-item fade";


    fig.style.setProperty(
      "--delay",
      `${(i % 8) * 60}ms`
    );


    const imagePath =
      fixImagePath(g.image);


    fig.innerHTML = `

      <button
        class="card-media image-button"
        type="button"
        aria-label="View ${
          g.caption || "image"
        } full image">

        <img
          src="${imagePath}"
          alt="${
            g.caption || "Crafty Dazzle image"
          }"
          loading="lazy">

      </button>

      <figcaption>
        ${g.caption || ""}
      </figcaption>

    `;


    grid.appendChild(fig);

  });

}


/* ---------- Services ---------- */

function renderServices(services) {

  const grid =
    document.getElementById("servicesGrid");


  if (!grid) return;


  grid.innerHTML = "";


  if (!Array.isArray(services)) return;


  services.forEach((s, i) => {

    const div =
      document.createElement("div");


    div.className =
      "service fade";


    div.style.setProperty(
      "--delay",
      `${(i % 4) * 70}ms`
    );


    div.innerHTML = `

      <div class="service-no">
        ${s.number || ""}
      </div>

      <h3>
        ${s.title || ""}
      </h3>

      <p>
        ${s.description || ""}
      </p>

    `;


    grid.appendChild(div);

  });

}


/* ---------- Lightbox ---------- */

function initLightbox() {

  const lightbox =
    document.getElementById("lightbox");

  const lightboxImg =
    document.getElementById("lightboxImg");

  const lightboxCaption =
    document.getElementById("lightboxCaption");


  if (
    !lightbox ||
    !lightboxImg ||
    !lightboxCaption
  ) {
    return;
  }


  document.addEventListener(
    "click",
    (e) => {

      const btn =
        e.target.closest(".image-button");


      if (!btn) return;


      const img =
        btn.querySelector("img");


      if (!img) return;


      lightboxImg.src =
        img.src;

      lightboxImg.alt =
        img.alt;

      lightboxCaption.textContent =
        img.alt;


      lightbox.classList.add("open");

      document.body.classList.add(
        "modal-open"
      );

    }
  );


  function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.classList.remove(
      "modal-open"
    );

  }


  const closeButton =
    document.getElementById(
      "lightboxClose"
    );


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeLightbox
    );

  }


  lightbox.addEventListener(
    "click",
    (e) => {

      if (e.target === lightbox) {
        closeLightbox();
      }

    }
  );


  document.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Escape") {
        closeLightbox();
      }

    }
  );

}


/* ---------- Mobile Menu ---------- */

function initMobileMenu() {

  const toggle =
    document.getElementById(
      "mobileToggle"
    );

  const menu =
    document.getElementById("menu");


  if (!toggle || !menu) return;


  const setOpen = (open) => {

    menu.classList.toggle(
      "open",
      open
    );

    toggle.classList.toggle(
      "open",
      open
    );

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    document.body.classList.toggle(
      "menu-open",
      open
    );

  };


  toggle.addEventListener(
    "click",
    () => {

      setOpen(
        !menu.classList.contains("open")
      );

    }
  );


  menu
    .querySelectorAll("a[data-close]")
    .forEach((a) => {

      a.addEventListener(
        "click",
        () => setOpen(false)
      );

    });


  document.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Escape") {
        setOpen(false);
      }

    }
  );

}


/* ---------- Scroll Reveal ---------- */

function initScrollReveal() {

  if (reduceMotion) {

    document
      .querySelectorAll(".fade")
      .forEach((el) => {

        el.classList.add("visible");

      });

    return;
  }


  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.08,
        rootMargin:
          "0px 0px -40px 0px"
      }

    );


  document
    .querySelectorAll(".fade")
    .forEach((el) => {

      observer.observe(el);

    });

}


/* ---------- Hero Parallax ---------- */

function initHeroParallax() {

  if (
    reduceMotion ||
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
  ) {
    return;
  }


  const frame =
    document.getElementById(
      "heroFrame"
    );


  if (!frame) return;


  const img =
    frame.querySelector("img");


  if (!img) return;


  frame.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        frame.getBoundingClientRect();


      const x =
        (e.clientX - rect.left) /
        rect.width -
        0.5;


      const y =
        (e.clientY - rect.top) /
        rect.height -
        0.5;


      img.style.transform =
        `scale(1.03) translate(${
          x * -10
        }px, ${
          y * -10
        }px)`;

    }
  );


  frame.addEventListener(
    "mouseleave",
    () => {

      img.style.transform = "";

    }
  );

}


/* ---------- Navigation Shadow ---------- */

function initNavShadow() {

  const nav =
    document.querySelector("nav");


  if (!nav) return;


  const onScroll = () => {

    nav.classList.toggle(
      "scrolled",
      window.scrollY > 8
    );

  };


  document.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );


  onScroll();

}


/* ---------- Loader ---------- */

function hideLoader() {

  const loader =
    document.getElementById(
      "pageLoader"
    );


  if (!loader) return;


  loader.classList.add("done");


  setTimeout(
    () => loader.remove(),
    500
  );

}


/* ---------- Initialize ---------- */

(async function init() {

  initMobileMenu();

  initLightbox();

  initNavShadow();

  initHeroParallax();


  try {

    const C =
      await loadContent();


    renderBrand(C);

    renderHero(C.hero);

    renderAbout(C.about);

    renderCustom(C.custom);

    renderContact(
      C.contact,
      C
    );

    renderFooter(
      C.footer,
      C
    );

    renderProducts(
      C.products,
      C
    );

    renderCollections(
      C.collections,
      C
    );

    renderGallery(
      C.gallery
    );

    renderServices(
      C.services
    );


  } catch (err) {

    console.error(
      "Crafty Dazzle: failed to load site content",
      err
    );


    /*
      If content/site-content.json fails,
      keep the default HTML hero image visible.
    */

    const heroImg =
      document.getElementById(
        "heroImg"
      );


    if (heroImg) {

      heroImg.src =
        "/images/haldi-mehndi-platter.png";

    }


    const aboutImg =
      document.getElementById(
        "aboutImg"
      );


    if (aboutImg) {

      aboutImg.src =
        "/images/rose-preservation.jpg";

    }

  }


  initScrollReveal();

  hideLoader();

})();
