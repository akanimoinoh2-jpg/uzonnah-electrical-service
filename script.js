/* =====================================================
   UZONNAH ELECTRICAL SERVICES — interactive behaviour
   ===================================================== */

/* ---------- Data (from CAC certificate + services) ---------- */
const SERVICES = [
  {
    title: "House & Office Wire",
    icon: "bi-plug-fill",
    img: "images (1).jpg",
    short: "Complete new-build and rewiring to Nigerian standards.",
    detail: "Full design and installation of wiring for new buildings and safe rewiring of older ones — distribution boards, circuit protection, sockets, lighting points, testing and certification."
  },
  {
    title: "Solar & Inverter Systems",
    icon: "bi-sun-fill",
    img: "Industrial-Solar-Street-Light-All-In-One-430x430.jpg",
    short: "Off-grid solar, inverters and solar street lights.",
    detail: "Sizing, supply and installation of solar panels, charge controllers, inverters and batteries — including all-in-one solar street lights for estates, streets and compounds."
  },
  {
    title: "Electrical Installations materials",
    icon: "bi-lightbulb-fill",
    img: "images (15).jpg",
    short: "Lighting, DB boards, pumps, ACs and appliances.",
    detail: "Professional installation of lighting systems, distribution boards, water pumps, air conditioners, industrial equipment and household appliances with correct protection sizing."
  },
  {
    title: "A dealer in switches and sockets of all kinds",
    icon: "bi-plug-fill",
    img: "WhatsApp Image 2026-09-30 at 2.13.30 PM.jpeg",
    short: "Modern switch and socket varieties for homes, offices and buildings.",
    detail: "A wide range of switches and sockets in different designs and finishes for residential, commercial and industrial installations."
  },
];

const GALLERY = [
  { src: "WhatsApp Image 2026-09-30 at 1.51.48 PM.jpeg", caption: "Coleman cables in stock — wholesale supply" },
  { src: "WhatsApp Image 2026-09-30 at 2.13.30 PM.jpeg", caption: "Dealer in all kinds of switches and sockets" },
  { src: "blueswitchs.jpeg", caption: "Switches and sockets of all kinds" },
  { src: "electric socket.jpeg", caption: "Socket and switch varieties for every installation" },
  { src: "WhatsApp Image.jpeg", caption: "Modern switch and socket collections" },
  { src: "WhatsApp Image 2026-09-30 at 2.13.49 PM.jpeg", caption: "itel 40W smart charge LED bulb — 5000mAh" },
  { src: "WhatsApp Image 2026-09-30 at 1.32.11 PM.jpeg", caption: "Modern chandelier — supplied & installed" },
  { src: "WhatsApp Image 2026-09-30 at 5.33.56 AM.jpeg", caption: "700W itel solar street light in stock" },
  { src: "WhatsApp Image .png", caption: "Solar street light with panel — installed unit" },
  { src: "WhatsApp Image 2026-09-29 at 7.40.52 PM.jpeg", caption: "300W itel solar street light" },
  { src: "WhatsApp Image 2026-09-29 at 7.40.51 PM.jpeg", caption: "Decorative indoor lighting — supplied & fitted" },
  { src: "images (10).jpg", caption: "Installation project" },
  { src: "images (12).jpg", caption: "Panel work" },
  { src: "images (11).jpg", caption: "Wiring close-up" },
  { src: "images (14).jpg", caption: "Job site" },
  { src: "images (16).jpg", caption: "Testing & safety" },
  { src: "images (18).jpg", caption: "Finished work" },
  { src: "images (101).jpg", caption: "Workshop stock" },
  { src: "Itel-Solar-Power-Tank-charging.webp", caption: "Solar charging solution" }
];

/* ---------- Render services dynamically ---------- */
const servicesGrid = document.getElementById("servicesGrid");
SERVICES.forEach((s, i) => {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 reveal";
  col.innerHTML = `
    <div class="card service-card shadow-sm" data-index="${i}" role="button" tabindex="0"
         aria-label="Learn more about ${s.title}">
      <img src="${s.img}" alt="${s.title}" loading="lazy">
      <div class="card-body p-4">
        <div class="icon-badge mb-3"><i class="bi ${s.icon}"></i></div>
        <h5 class="fw-bold mb-2">${s.title}</h5>
        <p class="text-secondary mb-3">${s.short}</p>
        <span class="fw-semibold text-warning-emphasis">Learn more <i class="bi bi-arrow-right"></i></span>
      </div>
    </div>`;
  col.querySelector(".service-card").addEventListener("click", () => openService(i));
  col.querySelector(".service-card").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openService(i); }
  });
  servicesGrid.appendChild(col);
});

/* Populate the contact form service dropdown from the same data */
const serviceSelect = document.getElementById("serviceSelect");
SERVICES.forEach((s) => {
  const opt = document.createElement("option");
  opt.value = s.title;
  opt.textContent = s.title;
  serviceSelect.appendChild(opt);
});

/* ---------- Service detail modal ---------- */
function openService(i) {
  const s = SERVICES[i];
  document.getElementById("serviceModalTitle").textContent = s.title;
  document.getElementById("serviceModalBody").innerHTML = `
    <img src="${s.img}" alt="${s.title}" class="img-fluid rounded-3 mb-3" />
    <p class="text-secondary">${s.detail}</p>
    <a href="#contact" class="btn btn-warning rounded-pill px-4 fw-semibold" data-bs-dismiss="modal">
      Order / request wholesale price <i class="bi bi-arrow-right"></i>
    </a>`;
  new bootstrap.Modal("#serviceModal").show();
}

/* ---------- Render gallery with lightbox ---------- */
const galleryGrid = document.getElementById("galleryGrid");
GALLERY.forEach((g) => {
  const col = document.createElement("div");
  col.className = "col-6 col-md-4 col-lg-3 reveal";
  col.innerHTML = `
    <div class="gallery-item" role="button" tabindex="0" aria-label="View: ${g.caption}">
      <img src="${g.src}" alt="${g.caption}" loading="lazy" />
      <div class="gallery-caption"><span><i class="bi bi-zoom-in me-2"></i>${g.caption}</span></div>
    </div>`;
  const open = () => {
    document.getElementById("lightboxImg").src = g.src;
    document.getElementById("lightboxImg").alt = g.caption;
    new bootstrap.Modal("#lightbox").show();
  };
  col.querySelector(".gallery-item").addEventListener("click", open);
  col.querySelector(".gallery-item").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });
  galleryGrid.appendChild(col);
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); revealObserver.unobserve(en.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Animated counters (hero stats) ---------- */
const counterObserver = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    counterObserver.unobserve(en.target);
    const el = en.target;
    const target = +el.dataset.target;
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }),
  { threshold: 0.4 }
);
document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

/* ---------- Navbar scrolled state + active link ---------- */
const nav = document.querySelector(".custom-nav");
const sections = document.querySelectorAll("section[id], header[id]");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);

  let current = "home";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll(".custom-nav .nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });

  const topBtn = document.getElementById("backToTop");
  topBtn.classList.toggle("visible", window.scrollY > 500);
});
document.getElementById("backToTop").addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* Close mobile nav when a link is clicked */
document.querySelectorAll("#mainNav a").forEach((a) =>
  a.addEventListener("click", () => {
    const collapse = bootstrap.Collapse.getInstance(document.getElementById("mainNav"));
    if (collapse && window.innerWidth < 992) collapse.hide();
  })
);

/* ---------- Quote form → WhatsApp ---------- */
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add("was-validated");
    return;
  }
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("serviceSelect").value;
  const msg = document.getElementById("message").value.trim();

  const text =
    `Hello UZONNAH ELECTRICAL SERVICES!%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    (email ? `Email: ${email}%0A` : "") +
    `Goods Needed: ${service}%0A%0A` +
    `Goods Description: ${msg}`;

  document.getElementById("formFeedback").classList.remove("d-none");
  window.open("https://wa.me/2347062536030?text=" + text, "_blank");
});

/* ---------- Dynamic rotating hero background ---------- */
const HERO_BGS = [
  "WhatsApp Image 2026-09-30 at 1.32.11 PM.jpeg",
  "242341_1751823257.webp",
  "WhatsApp Image 2026-09-30 at 5.33.56 AM.jpeg",
  "WhatsApp Image .png",
  "WhatsApp Image 2026-09-29 at 7.40.52 PM.jpeg",
  "images (15).jpg",
  "images (10).jpg"
];
const bgA = document.getElementById("heroBg1");
const bgB = document.getElementById("heroBg2");
let bgActive = bgA, bgIdle = bgB, bgIndex = 0;
function showNextBg() {
  bgIndex = (bgIndex + 1) % HERO_BGS.length;
  bgIdle.style.backgroundImage = `url("${HERO_BGS[bgIndex]}")`;
  bgIdle.classList.add("show");
  bgActive.classList.remove("show");
  [bgActive, bgIdle] = [bgIdle, bgActive];
}
bgA.style.backgroundImage = `url("${HERO_BGS[0]}")`;
bgA.classList.add("show");
setInterval(showNextBg, 5000);

/* ---------- Order form → WhatsApp ---------- */
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.classList.add("was-validated");
    return;
  }
  const name = document.getElementById("ordName").value.trim();
  const phone = document.getElementById("ordPhone").value.trim();
  const email = document.getElementById("ordEmail").value.trim();
  const ctype = document.getElementById("ordType").value;
  const address = document.getElementById("ordAddress").value.trim();
  const goods = document.getElementById("ordGoods").value.trim();
  const notes = document.getElementById("ordNotes").value.trim();

  const text =
    `*NEW ORDER — UZONNAH ELECTRICAL SERVICES (WHOLESALE)*%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    (email ? `Email: ${email}%0A` : "") +
    `Customer Type: ${ctype}%0A` +
    `Delivery Address: ${address}%0A%0A` +
    `*Goods / Items Needed:*%0A${goods}%0A%0A` +
    (notes ? `Notes: ${notes}` : "");

  document.getElementById("orderFeedback").classList.remove("d-none");
  window.open("https://wa.me/2347062536030?text=" + text, "_blank");
});

/* ---------- Floating CONNECT button ---------- */
const connectBtn = document.getElementById("connectBtn");
const connectPopup = document.getElementById("connectPopup");

function setConnect(open) {
  connectPopup.classList.toggle("open", open);
  connectPopup.setAttribute("aria-hidden", String(!open));
  connectBtn.setAttribute("aria-expanded", String(open));
}

connectBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setConnect(!connectPopup.classList.contains("open"));
});

document.getElementById("connectClose").addEventListener("click", () => setConnect(false));
document.addEventListener("click", (e) => {
  if (connectPopup.classList.contains("open") && !connectPopup.contains(e.target)) setConnect(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setConnect(false);
});

/* Close it when a link inside is clicked */
connectPopup.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => setConnect(false))
);

/* ---------- Time-detecting greeting popup ---------- */
(function () {
  const now = new Date();
  const h = now.getHours();
  let title, body, icon;
  if (h < 12) {
    title = "Good morning! ";
    icon = "bi-sunrise-fill";
    body = "Wholesale lines open — Mon to Sat, 8AM – 6PM. Order your bulk electrical materials & solar products at wholesale prices.";
  } else if (h < 17) {
    title = "Good afternoon! ";
    icon = "bi-sun-fill";
    body = "Wholesale & retail open — WhatsApp us on 0706 253 6030 for bulk supply of cables, solar street lights, inverters and more.";
  } else if (h < 20) {
    title = "Good evening! ";
    icon = "bi-sunset-fill";
    body = "Shop closes 6PM but orders are still answered — send your bulk order and we'll respond with wholesale prices.";
  } else {
    title = "Good night! ";
    icon = "bi-moon-stars-fill";
    body = "We're currently closed (Mon – Sat, 8AM – 6PM). Drop your bulk order now and get wholesale prices first thing tomorrow.";
  }
  document.getElementById("greetTitle").textContent = title;
  document.getElementById("greetIcon").className = "bi " + icon + " me-2";
  document.getElementById("greetBody").textContent = body;
  document.getElementById("greetClock").textContent =
    now.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }) +
    " · " + now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  // Only pop once per visit session (won't nag on every scroll/reload within same visit)
  setTimeout(() => {
    bootstrap.Toast.getOrCreateInstance(document.getElementById("greetToast")).show();
  }, 1500);
})();

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Solar Street Light showcase modal ---------- */
const SOLAR_PRODUCTS = [
  { src: "WhatsApp Image 2026-09-30 at 5.33.56 AM.jpeg", caption: "700W itel solar street light" },
  { src: "WhatsApp Image 2026-09-29 at 7.40.52 PM.jpeg", caption: "300W itel solar street light" },
  { src: "WhatsApp Image .png", caption: "Solar street light with panel — installed unit" },
  { src: "Industrial-Solar-Street-Light-All-In-One-430x430.jpg", caption: "All-in-one industrial solar street light" },
  { src: "Itel-Solar-Power-Tank-charging.webp", caption: "itel Solar Power Tank — charging solution" }
];

const solarGrid = document.getElementById("solarGrid");
if (solarGrid) {
  SOLAR_PRODUCTS.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4";
    col.innerHTML = `
      <div class="gallery-item" role="button" tabindex="0" aria-label="View: ${p.caption}">
        <img src="${p.src}" alt="${p.caption}" loading="lazy" />
        <div class="gallery-caption"><span><i class="bi bi-zoom-in me-2"></i>${p.caption}</span></div>
      </div>`;
    const open = () => {
      document.getElementById("lightboxImg").src = p.src;
      document.getElementById("lightboxImg").alt = p.caption;
      new bootstrap.Modal("#lightbox").show();
    };
    col.querySelector(".gallery-item").addEventListener("click", open);
    col.querySelector(".gallery-item").addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    solarGrid.appendChild(col);
  });
}
