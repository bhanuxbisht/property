export const siteConfig = {
  name: "RajHomes",
  tagline: "Live Peacefully in Jaipur",
  description:
    "Premier independent property consultancy specializing in verified residential flats, luxury villas, plots, and commercial properties across Jaipur, Rajasthan.",
  phone: "+919876543210",
  whatsapp: "919876543210",
  email: "contact@rajhomes.in",
  address: "Murlipura Scheme, Sikar Road, Jaipur, Rajasthan 302039",
  experience: "15+",
  propertiesSold: "250+",
  googleRating: 4.9,
  reraNumber: "RAJ/P/2024/001234",
  areas: [
    { name: "Murlipura", slug: "murlipura" },
    { name: "Sikar Road", slug: "sikar-road" },
    { name: "Vidhyadhar Nagar", slug: "vidhyadhar-nagar" },
    { name: "Jhotwara", slug: "jhotwara" },
    { name: "Vaishali Nagar", slug: "vaishali-nagar" },
    { name: "Mansarovar", slug: "mansarovar" },
    { name: "Jagatpura", slug: "jagatpura" },
    { name: "Malviya Nagar", slug: "malviya-nagar" },
  ],
} as const;

export const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const searchTabs = [
  { id: "buy", label: "Buy", href: "/buy" },
  { id: "sell", label: "Sell", href: "/sell" },
] as const;
