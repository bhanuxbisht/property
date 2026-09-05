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
  metadataBase: new URL("https://rajhomes.in"),
  title: {
    default: `${siteConfig.name} | Property in Murlipura, Sikar Road, Jaipur`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "property dealer Jaipur",
    "flats for sale Murlipura",
    "plots Sikar Road Jaipur",
    "rent Jhotwara",
    "real estate Vidhyadhar Nagar",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/heroimp.png", width: 1672, height: 941, alt: siteConfig.tagline }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
