/* ==========================================================================
   SHAHKAR FURNITURE — script.js
   Centralized config + shared behavior (navbar, WhatsApp/call links, filtering)
   ========================================================================== */

/* ------------------------------------------------------------------------
   1. SITE CONFIG
   Change phone/WhatsApp number, business name, etc. here ONLY.
   Everything else reads from this object — nothing is hardcoded elsewhere.
   ------------------------------------------------------------------------ */
const SITE_CONFIG = {
  businessName: "Shahkar Furniture",
  phoneNumber: "+923149177112",       // used for tel: links — keep the + and country code
  whatsappNumber: "923149177112",     // used for wa.me links — digits only, no + or spaces
  address: "Showroom Address, City, Pakistan", // placeholder — update with real address
  mapsUrl: "https://maps.google.com", // placeholder — replace with real Google Maps link
  openingHours: "Mon – Sat: 11:00 AM – 9:00 PM",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/"
  }
};

/* ------------------------------------------------------------------------
   2. CONTACT LINK HELPERS
   ------------------------------------------------------------------------ */
function getCallLink() {
  return `tel:${SITE_CONFIG.phoneNumber}`;
}

function getWhatsAppLink(message) {
  const defaultMessage = `Hello, I am interested in your furniture collection. Please provide more details.`;
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
}

/**
 * Wires up every element carrying data-contact="call" or data-contact="whatsapp"
 * with the correct href, generated from SITE_CONFIG. For WhatsApp links tied to
 * a specific product, add data-product="Product Name" on the same element.
 */
function initContactLinks() {
  document.querySelectorAll('[data-contact="call"]').forEach((el) => {
    el.setAttribute("href", getCallLink());
  });

  document.querySelectorAll('[data-contact="whatsapp"]').forEach((el) => {
    const productName = el.getAttribute("data-product");
    const message = productName
      ? `Hello, I am interested in the ${productName}. Please provide more details.`
      : undefined;
    el.setAttribute("href", getWhatsAppLink(message));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

/* ------------------------------------------------------------------------
   3. NAVBAR — mobile toggle
   ------------------------------------------------------------------------ */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".navbar__toggle");
  if (!navbar || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close mobile menu when a link inside it is tapped
  navbar.querySelectorAll(".navbar__mobile-panel a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* ------------------------------------------------------------------------
   4. PRODUCT CATALOG / FILTERING (products.html)
   Renders every available photo in the bedroom / living room / dining folders,
   then filters by category without hardcoding dozens of product entries.
   ------------------------------------------------------------------------ */
const PRODUCT_CATALOG = [
  ...Array.from({ length: 14 }, (_, index) => ({
    category: "bedroom",
    image: `images/categories/bed/bed_${index + 1}.jpeg`,
    name: `Bedroom Piece ${index + 1}`,
    description: "Crafted bedroom furniture designed to bring warmth, elegance and comfort to a refined home."
  })),
  ...Array.from({ length: 30 }, (_, index) => ({
    category: "living-room",
    image: `images/categories/coffee_table/tab_${index + 1}.jpeg`,
    name: `Coffee Table ${index + 1}`,
    description: "A statement coffee table piece that completes a polished and welcoming living room."
  })),
  ...Array.from({ length: 1 }, () => ({
    category: "dining",
    image: "images/categories/dining/dini_1.jpeg",
    name: "Dining Table",
    description: "An elegant dining table for modern family gatherings and formal hosting."
  })),
  ...Array.from({ length: 1 }, () => ({
    category: "bedroom",
    image: "images/categories/dressing_table/dressi_1.jpeg",
    name: "Dressing Table",
    description: "A bedroom dressing table designed with elegance, storage and balanced detailing."
  })),
  ...Array.from({ length: 1 }, () => ({
    category: "living-room",
    image: "images/categories/side_table/tab_1.jpeg",
    name: "Side Table",
    description: "An accent side table designed to complement the living room with both style and utility."
  })),
  ...Array.from({ length: 23 }, (_, index) => ({
    category: "living-room",
    image: `images/categories/sofa/sofa_${index + 1}.jpeg`,
    name: `Sofa ${index + 1}`,
    description: "Comfort-first sofa design that delivers premium lounging and a timeless look."
  })),
  ...Array.from({ length: 2 }, (_, index) => ({
    category: "dining",
    image: `images/categories/takht_table/tab_${index + 1}.jpeg`,
    name: `Takht Table ${index + 1}`,
    description: "Traditional seating furniture with a warm handcrafted character for dining and gathering spaces."
  }))
];

function renderProductCards() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCT_CATALOG.map((product) => `
    <article class="product-card" data-category="${product.category}">
      <div class="product-card__media">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-card__body">
        <span class="product-card__category">${product.category === "living-room" ? "Living Room" : product.category === "bedroom" ? "Bedroom" : "Dining"}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__desc">${product.description}</p>
        <span class="product-card__price">Contact for Price</span>
        <div class="product-card__actions">
          <a href="#" class="btn btn-outline btn-sm">View Details</a>
          <a href="#" data-contact="whatsapp" data-product="${product.name}" class="btn btn-gold btn-sm">WhatsApp</a>
          <a href="#" data-contact="call" class="btn btn-outline btn-sm">Call</a>
        </div>
      </div>
    </article>
  `).join("");

  initProductFilter();
}

function initProductFilter() {
  const filterBar = document.querySelector(".filter-bar");
  if (!filterBar) return;

  const buttons = filterBar.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".product-card[data-category]");
  const emptyState = document.querySelector(".empty-state");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");
      let visibleCount = 0;

      cards.forEach((card) => {
        const matches = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.classList.toggle("is-visible", visibleCount === 0);
      }
    });
  });
}

/* ------------------------------------------------------------------------
   5. INIT
   ------------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  initContactLinks();
  initNavbar();
  renderProductCards();
});