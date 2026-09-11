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
    instagram: "https://www.instagram.com/shahkar.furnitures/",
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
  {
    category: "bedroom",
    image: "images/categories/bed/bed_1.jpeg",
    name: "Royal Victoria High Back Tufted Bed",
    description: "A regal high-back tufted bed with a luxurious silhouette and elegant statement appeal."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_2.jpeg",
    name: "French Vintage White Rattan Carved Bed",
    description: "A charming vintage-inspired bed with carved detailing and airy rattan elegance."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_3.jpeg",
    name: "Modern Channel Tufted Platform Bed",
    description: "Sleek and contemporary with a channel tufted finish for a modern, refined bedroom."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_4.jpeg",
    name: "Royal High Back Tufted Gold Carved Bed",
    description: "An ornate gold-carved bed that brings royal warmth, style and grandeur to the room."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_5.jpeg",
    name: "Royal Beige Velvet Gold Carved Bed",
    description: "Soft beige velvet upholstery paired with gold carved accents for a luxurious look."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_6.jpeg",
    name: "Modern Grey Tufted Wooden Frame Bed",
    description: "A contemporary grey tufted bed with a warm wooden frame for balanced comfort and style."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_7.jpeg",
    name: "Royal Light Grey Tufted Silver Carved Bed",
    description: "Light grey upholstery and silver detailing create a polished, elegant bedroom focal point."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_8.jpeg",
    name: "Royal Cream Tufted Gold Crown Bed with Side Tables",
    description: "A luxurious cream tufted bed crowned with gold details and coordinated side tables."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_9.jpeg",
    name: "Royal Beige Tufted Silver Carved Bed",
    description: "Elegant beige upholstery paired with silver carved detailing for a timeless bedroom look."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_10.jpeg",
    name: "Royal Dark Walnut Storage Bed",
    description: "Dark walnut craftsmanship meets practical storage, delivering both richness and function."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_11.jpeg",
    name: "Royal Cream Tufted Bed with Bench",
    description: "A soft cream tufted statement bed enhanced with bench seating for added elegance."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_12.jpeg",
    name: "Royal Silver Carved Floral Bed",
    description: "Intricate floral carving and silver finish give this bed a graceful, heirloom appeal."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_13.jpeg",
    name: "French Vintage White Rattan Carved Bed",
    description: "A slightly softer vintage silhouette with handcrafted carving and white rattan charm."
  },
  {
    category: "bedroom",
    image: "images/categories/bed/bed_14.jpeg",
    name: "Modern Channel Tufted Platform Bed",
    description: "Subtle sophistication and clean lines define this elegant platform bed for contemporary spaces."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_1.jpeg",
    name: "Scandinavian white & wood coffee table",
    description: "A clean, welcoming centerpiece that blends bright wood tones with Scandinavian simplicity."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_2.jpeg",
    name: "Glass Top Driftwood Coffee table",
    description: "A textured driftwood-inspired design paired with glass for a refined, airy look."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_3.jpeg",
    name: "Designer Gloss White X-Base Coffee Table",
    description: "A bold geometric base and glossy finish bring contemporary elegance to the living room."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_4.jpeg",
    name: "Rustic Storage Coffee Table",
    description: "A practical rustic wonder with storage and warm character for everyday living."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_5.jpeg",
    name: "Rustic Square Stroage Coffee Table",
    description: "A square rustic storage table designed for both utility and balanced modern styling."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_6.jpeg",
    name: "Versace Tufted Ottoman Coffee table",
    description: "Soft tufted comfort and luxe detailing give this coffee table a designer focal point feel."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_7.jpeg",
    name: "Designer 2-tier Oak Coffee Table",
    description: "A functional two-tier design that adds warmth, storage and layered visual interest."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_8.jpeg",
    name: "Designer S-Shape Layered Coffee Table",
    description: "An artistic layered silhouette that makes a distinctive statement in modern interiors."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_9.jpeg",
    name: "Modern Oak Storage Coffee Table",
    description: "A modern oak storage table crafted for understated elegance and everyday convenience."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_10.jpeg",
    name: "Modern Wallnut & White Storage Coffee table",
    description: "A rich walnut-and-white combination that feels both contemporary and timeless."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_11.jpeg",
    name: "Modern Lift- Top Coffee Table",
    description: "A practical lift-top coffee table that pairs convenience with a sleek, modern profile."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_12.jpeg",
    name: "Modern Open Cube Storage Coffee Table",
    description: "Clean open shelving and compact storage make this table ideal for contemporary living spaces."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_13.jpeg",
    name: "Royal Italian Gold Leg Coffee Table",
    description: "Italian-inspired elegance and gold accents create a refined centerpiece for luxury lounges."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_14.jpeg",
    name: "Royal Silver Leg squared coffee table",
    description: "A square profile with silver legs offers a polished and statement-making coffee table look."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_15.jpeg",
    name: "shabby chic Floral Oval coffee table",
    description: "A floral-inspired oval table that brings softness, charm and vintage character to the room."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_16.jpeg",
    name: "Modern high gloss white block coffee table",
    description: "A high-gloss white block design that brings polish and minimalism to modern interiors."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_17.jpeg",
    name: "classic royal 2-Drawer center table",
    description: "A royal-inspired center table with drawers that adds both style and hidden storage."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_18.jpeg",
    name: "Simple modern glass top storage coffee table",
    description: "An elegant glass-top table designed for clean lines, storage and everyday practicality."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_19.jpeg",
    name: "Modern 3-Tier Floating block coffee table",
    description: "A floating three-tier form that balances sculptural design with useful layered storage."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_20.jpeg",
    name: "Classic Pillar Leg 2-Drawer Coffee table",
    description: "Traditional pillar legs meet practical drawer storage in this timeless coffee table."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_21.jpeg",
    name: "Modern Open Cube Wenge Coffee table",
    description: "Warm wenge tones and open cube styling create a contemporary café-inspired centerpiece."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_22.jpeg",
    name: "Royal white Trunk Storage Coffee table",
    description: "A trunk-inspired table with storage and a refined, vintage-luxe character."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_23.jpeg",
    name: "Modern Grey & Wood Storage coffee table",
    description: "A warm wood-and-grey fusion combining neutral style with practical storage."
  },
  {
    category: "living-room",
    image: "images/categories/coffee_table/tab_25.jpeg",
    name: "Modern lift-Top Coffee table with Storage",
    description: "A versatile lift-top table with added storage for modern everyday convenience."
  },
  {
    category: "dining",
    image: "images/categories/dining/dini_1.jpeg",
    name: "Modern 4 Seater Round Dining Table set",
    description: "A compact and stylish round dining set made for modern family gatherings and intimate meals."
  },
  {
    category: "bedroom",
    image: "images/categories/dressing_table/dressi_1.jpeg",
    name: "French Vintage White Can Dressing Table with Stool",
    description: "A graceful vintage dressing table finished in white with a matching stool for refined charm."
  },
  {
    category: "living-room",
    image: "images/categories/side_table/tab_1.jpeg",
    name: "Royal Carver Bedside Table",
    description: "A beautifully carved bedside table that blends practical storage with elegant craftsmanship."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_1.jpeg",
    name: "Royal Black & Gold Damask Sofa Set",
    description: "A regal damask sofa set with black-and-gold detailing that delivers a luxurious, statement-making presence."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_2.jpeg",
    name: "Royal Floral Cream Sofa Set",
    description: "A graceful cream floral sofa set that blends classic elegance with a softly romantic finish."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_3.jpeg",
    name: "Royal Ivory Floral Embroidered Sofa Set",
    description: "Ivory upholstery and embroidered floral detailing create a refined, heirloom-inspired seating experience."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_4.jpeg",
    name: "French Sage Velvet 2 Seater Sofa",
    description: "A soft sage velvet sofa with a chic French-inspired look designed for relaxed luxury."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_5.jpeg",
    name: "French Sage Classic Sofa Set 5 Seater",
    description: "A classic five-seater sofa set in calming sage tones, combining comfort with tasteful tradition."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_6.jpeg",
    name: "Royal Grey Velvet Gold Carved Sofa",
    description: "A sophisticated grey velvet sofa elevated by elegant gold carving for a polished royal finish."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_7.jpeg",
    name: "Modern Charcoal Grey L-Shaped Sectional with Ottoman",
    description: "A contemporary charcoal sectional with ottoman seating designed for comfort and modern lounging."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_8.jpeg",
    name: "Heavy Royal Black & Gold Damsk Sofa Set",
    description: "An opulent black and gold sofa set with rich detailing that makes a bold luxury statement."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_9.jpeg",
    name: "Royal Light Grey Gold Carved Sofa Set",
    description: "Light grey upholstery and carved gold accents give this sofa set a fresh, elegant identity."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_10.jpeg",
    name: "Royal White Tufted Sofa Set",
    description: "A soft white tufted sofa set that brings freshness, volume and comfort to elegant interiors."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_11.jpeg",
    name: "Modern L-Shape Tufted Corner Sofa with Storage Stools",
    description: "A modular corner sofa with tufted detailing and integrated storage stools for practical luxury."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_12.jpeg",
    name: "Royal Cream Floral Embroidered Sofa Set",
    description: "Cream upholstery paired with floral embroidery creates a timeless, graceful focal point."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_13.jpeg",
    name: "Royal Orange Chesterfield L-Shape Sofa",
    description: "A bold orange Chesterfield-inspired sofa with sculptural depth and a distinctive vintage edge."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_14.jpeg",
    name: "Classic Chesterfield Brown Leather Sofa Set",
    description: "Rich brown leather and classic Chesterfield lines offer timeless sophistication and lasting comfort."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_15.jpeg",
    name: "French Cream Floral Embroidered Sofa",
    description: "A floral embroidered cream sofa with French-inspired styling and graceful, cozy elegance."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_16.jpeg",
    name: "Modern Grey L-Shape Chaise Sectional Sofa",
    description: "A sleek grey sectional with chaise comfort for contemporary lounging and layered design."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_17.jpeg",
    name: "Royal Cream Channel Tufted Sofa with Gold Carving",
    description: "Cream channel tufting and gold carved detailing make this sofa a luxurious statement piece."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_18.jpeg",
    name: "Classic Taupe Tufted Sofa Set 5 Seater with Ottoman",
    description: "A taupe tufted five-seater sofa set with matching ottoman for elegant comfort and gathering spaces."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_19.jpeg",
    name: "Modern Wine Red Velvet Channel Sofa",
    description: "A rich wine-red velvet sofa with channel detailing that adds warmth and dramatic character."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_20.jpeg",
    name: "Classic Cream Sheesham Wood Carved Sofa Set",
    description: "Cream upholstery and sheesham wood carving combine comfort and elegance in a timeless form."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_21.jpeg",
    name: "Modern Grey L-Shape Corner Sofa",
    description: "A streamlined grey corner sofa designed for contemporary interiors and relaxed everyday living."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_22.jpeg",
    name: "French Blue Grey Floral Embroidered Sofa",
    description: "Soft blue-grey tones and floral embroidery give this sofa a gentle, sophisticated vintage charm."
  },
  {
    category: "living-room",
    image: "images/categories/sofa/sofa_23.jpeg",
    name: "Royal Ivory Embroidered Sofa Set",
    description: "An ivory sofa set adorned with embroidery and graceful lines for an elevated classic statement."
  },
  {
    category: "dining",
    image: "images/categories/takht_table/tab_1.jpeg",
    name: "Traditional Hand-Carved Takht with Mother of Pearl",
    description: "An heirloom-inspired takht enriched with hand carving and mother-of-pearl detailing."
  },
  {
    category: "dining",
    image: "images/categories/takht_table/tab_2.jpeg",
    name: "Vintage Door Design Takht Table",
    description: "A distinctive vintage door-inspired takht table with warm character and timeless appeal."
  }
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