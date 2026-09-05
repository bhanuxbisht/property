import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://propertyboutique.in"),
  title: {
    default: `${siteConfig.name} | Jaipur's Trusted Property Consultant`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Property Boutique Jaipur",
    "property dealer Jaipur",
    "property dealer Murlipura",
    "flats for sale Murlipura",
    "plots Sikar Road Jaipur",
    "villas Vidhyadhar Nagar",
    "real estate Jhotwara Jaipur",
    "Lalit Singh Bisht Property Boutique",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: `${siteConfig.name} — Jaipur's Trusted Property Consultant`,
    description: `Verified flats, luxury villas, plots, and commercial properties in Murlipura, Sikar Road, Vidhyadhar Nagar, and across Jaipur. RERA: ${siteConfig.reraNumber}.`,
    locale: "en_IN",
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Jaipur Real Estate`,
    description: `Verified residential & commercial property consultant in Jaipur. RERA: ${siteConfig.reraNumber}.`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    legalName: "Mr. Lalit Singh Bisht",
    image: "https://propertyboutique.in/heroimp.png",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: "https://propertyboutique.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "22-A, Bajrang Vihar, Murlipura Scheme",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302013",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.9654,
      longitude: 75.7725,
    },
    areaServed: [
      "Murlipura",
      "Sikar Road",
      "Vidhyadhar Nagar",
      "Jhotwara",
      "Jaipur",
    ],
    priceRange: "₹₹ - ₹₹₹₹",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: "54",
    },
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
