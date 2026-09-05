export const siteConfig = {
  name: "RajHomes",
  tagline: "Live Peacefully in Jaipur",
  description:
    "Independent property consultant serving Murlipura, Sikar Road, Vidhyadhar Nagar, Jhotwara and surrounding areas of Jaipur, Rajasthan.",
  phone: "+919876543210",
  whatsapp: "919876543210",
  email: "contact@rajhomes.in",
  address: "Murlipura, Sikar Road, Jaipur, Rajasthan 302039",
  experience: "12+",
  propertiesSold: "200+",
  googleRating: 4.9,
  reraNumber: "RAJ/P/2024/001234",
  areas: [
    { name: "Murlipura", slug: "murlipura" },
    { name: "Sikar Road", slug: "sikar-road" },
    { name: "Vidhyadhar Nagar", slug: "vidhyadhar-nagar" },
    { name: "Jhotwara", slug: "jhotwara" },
  ],
} as const;

export const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "Developer", href: "/about" },
] as const;

export const searchTabs = [
  { id: "buy", label: "Buy", href: "/buy" },
  { id: "sell", label: "Sell", href: "/sell" },
] as const;
