export const siteConfig = {
  name: "Property Boutique",
  tagline: "Live Peacefully in Jaipur",
  description:
    "Premier independent property consultancy specializing in verified residential flats, luxury villas, plots, and commercial properties across Jaipur, Rajasthan.",
  phone: "+919001539001",
  whatsapp: "919001539001",
  email: "Propertyboutiquejaipur@gmail.com",
  address: "22-A, Bajrang Vihar, Murlipura Scheme, Jaipur, Rajasthan 302013",
  experience: "15+",
  propertiesSold: "999+",
  googleRating: "5.0",
  googleReviewsCount: 54,
  reraNumber: "RAJ/A/2018/606",
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
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export const searchTabs = [
  { id: "buy", label: "Buy", href: "/buy" },
  { id: "sell", label: "Sell", href: "/sell" },
] as const;
