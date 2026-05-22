// Navigation links shown in the header and mobile menu.
// Journey and Tools are intentionally excluded from nav (they exist on page but not in nav).
export const navigationLinks = [
  { label: "Home",      href: "#home",      ids: ["home"] },
  { label: "About",     href: "#about",     ids: ["about", "journey"] },
  { label: "Portfolio", href: "#portfolio", ids: ["portfolio"] },
  { label: "Skills",    href: "#skills",    ids: ["skills", "tools"] },
  { label: "Reviews",   href: "#reviews",   ids: ["reviews"] },
  { label: "Contact",   href: "#contact",   ids: ["contact"] },
];

// All section ids that actually exist on the page (for scrollspy observer)
export const allSectionIds = [
  "home", "about", "journey", "portfolio", "skills", "tools", "reviews", "contact"
];

// Map: section id → which nav label should be active
export const sectionNavMap = {
  home:      "home",
  about:     "about",
  journey:   "about",   // Journey maps to About nav
  portfolio: "portfolio",
  skills:    "skills",
  tools:     "skills",  // Tools maps to Skills nav
  reviews:   "reviews",
  contact:   "contact",
};
