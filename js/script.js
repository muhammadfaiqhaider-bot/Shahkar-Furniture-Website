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
  });

  // Close mobile menu when a link inside it is tapped
  navbar.querySelectorAll(".navbar__mobile-panel a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ------------------------------------------------------------------------
   4. PRODUCT FILTERING (products.html)
   Cards are filtered by their data-category attribute.
   ------------------------------------------------------------------------ */
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
  initProductFilter();
});