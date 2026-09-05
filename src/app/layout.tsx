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
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["RealEstateAgent", "LocalBusiness"],
        "@id": "https://propertyboutique.in/#organization",
        name: siteConfig.name,
        legalName: "Mr. Lalit Singh Bisht",
        founder: {
          "@type": "Person",
          name: "Mr. Lalit Singh Bisht",
          jobTitle: "Principal Property Consultant",
        },
        image: "https://propertyboutique.in/heroimp.png",
        logo: "https://propertyboutique.in/icon.svg",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        url: "https://propertyboutique.in",
        description: siteConfig.description,
        taxID: siteConfig.reraNumber,
        identifier: {
          "@type": "PropertyValue",
          name: "RERA Registration Number",
          value: siteConfig.reraNumber,
        },
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
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Jaipur" },
          { "@type": "AdministrativeArea", name: "Murlipura" },
          { "@type": "AdministrativeArea", name: "Sikar Road" },
          { "@type": "AdministrativeArea", name: "Vidhyadhar Nagar" },
          { "@type": "AdministrativeArea", name: "Jhotwara" },
          { "@type": "AdministrativeArea", name: "Vaishali Nagar" },
          { "@type": "AdministrativeArea", name: "Mansarovar" },
          { "@type": "AdministrativeArea", name: "Jagatpura" },
        ],
        priceRange: "₹₹ - ₹₹₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Cheque, Bank Transfer, RTGS/NEFT",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5",
          reviewCount: "54",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Real Estate Consultancy & Property Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Residential Flats & Builder Floors for Sale in Jaipur",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "JDA Approved Plots & Land Acquisitions",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Independent Luxury Duplex Villas in Jaipur",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "JDA Patta & Legal Title Due Diligence",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://propertyboutique.in/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is the most trusted property dealer in Murlipura and Sikar Road, Jaipur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Property Boutique, founded by Mr. Lalit Singh Bisht (RERA Certificate RAJ/A/2018/606), has over 15 years of verified experience and 999+ transacted properties in Murlipura, Sikar Road, Vidhyadhar Nagar, and Jhotwara.",
            },
          },
          {
            "@type": "Question",
            name: "How can I verify if a property in Jaipur is JDA approved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To verify JDA approval, examine the original Patta (lease deed) issued under Section 90A, ensure the colony layout is officially sanctioned in the JDA master plan, and verify registration in the Sub-Registrar revenue records. Property Boutique conducts complete legal vetting before recommending any property.",
            },
          },
          {
            "@type": "Question",
            name: "What is the average price of 2 & 3 BHK flats in Murlipura, Jaipur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Murlipura, high-quality 2 BHK flats typically range between ₹32 Lakh to ₹48 Lakh, while spacious 3 BHK builder floors and apartments range from ₹50 Lakh to ₹85 Lakh depending on lift, car parking, and proximity to Sikar Road.",
            },
          },
          {
            "@type": "Question",
            name: "Can I get a home loan on properties listed with Property Boutique?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, 100% of verified properties listed with Property Boutique have clean legal titles and are pre-approved for home loans from nationalized and private banks like SBI, HDFC, ICICI, and Bank of Baroda up to 80-90% of the property value.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://propertyboutique.in/#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://propertyboutique.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Buy Properties in Jaipur",
            item: "https://propertyboutique.in/buy",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Sell Property",
            item: "https://propertyboutique.in/sell",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Frequently Asked Questions",
            item: "https://propertyboutique.in/faq",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Jaipur Real Estate Blog",
            item: "https://propertyboutique.in/blog",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
