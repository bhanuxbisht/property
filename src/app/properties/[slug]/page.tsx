import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Phone,
  MessageCircle,
  Building2,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import {
  generateAllPSEOSlugs,
  getPSEODataBySlug,
  generateLocalityFAQ,
  LOCALITY_PROFILES,
  slugify,
} from "@/lib/seo-utils";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-areas";
import { Footer, MobileCTA } from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const allSlugs = generateAllPSEOSlugs();
  return allSlugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = getPSEODataBySlug(resolvedParams.slug);
  if (!data) return {};

  return {
    title: `${data.title} | ${siteConfig.name}`,
    description: data.metaDescription,
    keywords: [
      `${data.locality} property`,
      `flats in ${data.locality} Jaipur`,
      `plots in ${data.locality}`,
      `property dealer ${data.locality}`,
      `real estate ${data.locality} Jaipur`,
      "Property Boutique Jaipur",
      "Lalit Singh Bisht",
    ],
    openGraph: {
      title: `${data.title} — Property Boutique`,
      description: data.metaDescription,
      url: `https://propertyboutique.in/properties/${data.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://propertyboutique.in/properties/${data.slug}`,
    },
  };
}

export default async function LocalityPSEOPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getPSEODataBySlug(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const profile = LOCALITY_PROFILES[data.locality];
  const faqs = generateLocalityFAQ(data.locality, data.intent);

  // Suggested nearby localities for internal linking (from primary target list)
  const primaryLocalities = JAIPUR_LOCALITIES.filter((l) => l !== "Other").slice(0, 20);
  const nearbyLocalities = primaryLocalities.filter((loc) => loc !== data.locality).slice(0, 6);

  const pageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Jaipur Properties",
        item: "https://propertyboutique.in/buy",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${data.locality} Real Estate`,
        item: `https://propertyboutique.in/properties/${data.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Floating Glassmorphic Pill Header */}
      <header className="sticky top-0 z-40 w-full px-4 pt-3 pb-2 sm:px-8 sm:pt-4 pointer-events-none">
        <div className="glass-nav pointer-events-auto relative mx-auto flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 sm:px-7 sm:py-3">
          <Link
            href="/"
            className="text-[16px] sm:text-[17px] font-bold tracking-tight text-[#1E2320] transition-opacity hover:opacity-85"
          >
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/buy"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              All Listings
            </Link>
            <Link
              href="/faq"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="btn-peach rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-[13.5px] font-semibold text-[#2D2824] shadow-sm transition-all hover:scale-[1.02]"
            >
              Inquire
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Breadcrumb + Title */}
      <section className="px-4 pt-10 pb-12 sm:px-6 md:pt-14 md:pb-16 border-b border-[#1E2320]/10 bg-gradient-to-b from-[#FAF6F1] to-[#FDFBF7]">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#1E2320]/60 mb-6">
            <Link href="/" className="hover:text-terracotta">Home</Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-terracotta">Jaipur Properties</Link>
            <span>/</span>
            <span className="font-semibold text-[#1E2320]">{data.locality}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/30 bg-terracotta/10 px-3.5 py-1 text-xs font-bold text-terracotta">
              <MapPin size={13} />
              <span>{profile?.zone || "Prime Jaipur Locality"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <ShieldCheck size={13} />
              <span>100% JDA Patta &amp; Legal Verification</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-[#1E2320] leading-tight max-w-4xl">
            {data.headline}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#1E2320]/75 max-w-3xl leading-relaxed">
            {data.metaDescription} Guided by RERA-registered consultant Mr. Lalit Singh Bisht (RERA: {siteConfig.reraNumber}) with 15+ years of verified on-ground advisory.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello Property Boutique, I am interested in properties in ${data.locality}, Jaipur. Please share verified options.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-search inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <MessageCircle size={17} />
              <span>Get {data.locality} Properties on WhatsApp</span>
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#1E2320]/15 bg-white px-7 py-3 text-sm font-semibold text-[#1E2320] hover:bg-[#1E2320]/5 shadow-sm"
            >
              <Phone size={16} />
              <span>Call +91 9001539001</span>
            </a>
          </div>
        </div>
      </section>

      {/* Locality Market Insights Box */}
      <section className="px-4 py-12 sm:px-6 bg-white border-b border-[#1E2320]/10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#1E2320]/10 bg-[#FAF6F1]/50 p-6">
              <div className="flex items-center gap-2 text-terracotta mb-2">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Estimated Plot Rates</span>
              </div>
              <p className="text-xl font-extrabold text-[#1E2320]">
                {profile?.pricePerSqYard || "₹35,000 – ₹85,000 / sq.yard"}
              </p>
              <p className="mt-1 text-xs text-[#1E2320]/60">
                Rates depend on road width (30ft vs 60ft) and commercial zoning.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1E2320]/10 bg-[#FAF6F1]/50 p-6">
              <div className="flex items-center gap-2 text-emerald-700 mb-2">
                <Building2 size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Flats &amp; Floors Price</span>
              </div>
              <p className="text-xl font-extrabold text-[#1E2320]">
                {profile?.flatPriceRange || "₹32 Lakh – ₹90 Lakh"}
              </p>
              <p className="mt-1 text-xs text-[#1E2320]/60">
                Ready-to-move 2 &amp; 3 BHK options with lift &amp; covered parking.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1E2320]/10 bg-[#FAF6F1]/50 p-6">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Sparkles size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Bank Home Loans</span>
              </div>
              <p className="text-xl font-extrabold text-[#1E2320]">
                Up to 85% Pre-Approved
              </p>
              <p className="mt-1 text-xs text-[#1E2320]/60">
                SBI, HDFC, ICICI, Bank of Baroda at competitive repo-linked rates.
              </p>
            </div>
          </div>

          {/* Highlights & Landmarks */}
          {profile?.keyHighlights && (
            <div className="mt-8 rounded-3xl border border-[#1E2320]/10 bg-[#FAF6F1] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1E2320] mb-4">
                Why Invest or Live in {data.locality}, Jaipur?
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm text-[#1E2320]/80">
                {profile.keyHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              {profile.connectivity && (
                <p className="mt-4 pt-4 border-t border-[#1E2320]/10 text-xs sm:text-sm text-[#1E2320]/70">
                  <strong className="text-[#1E2320]">Connectivity Highlights: </strong>
                  {profile.connectivity}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Locality-Specific FAQ Section for Google Snippets & AI Overviews */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-terracotta mb-2">
              <HelpCircle size={14} />
              <span>Locality FAQ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2320]">
              Common Questions About Property in {data.locality}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#1E2320]/10 bg-white p-5 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-[#1E2320]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/75 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links: Explore Adjacent Localities */}
      <section className="px-4 py-12 sm:px-6 bg-[#FAF6F1] border-t border-[#1E2320]/10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-[#1E2320] mb-6 text-center">
            Explore More Top Jaipur Localities
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {nearbyLocalities.map((loc) => (
              <Link
                key={loc}
                href={`/properties/buy-in-${slugify(loc)}`}
                className="rounded-xl border border-[#1E2320]/10 bg-white p-3 text-center text-xs font-semibold text-[#1E2320] shadow-sm transition-all hover:border-terracotta hover:text-terracotta hover:scale-[1.02]"
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Consultant CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-terracotta/25 bg-gradient-to-r from-[#FAF6F1] to-[#FFF4EB] p-8 text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2320]">
            Looking for a Verified Property in {data.locality}?
          </h2>
          <p className="mt-2 text-sm text-[#1E2320]/70 max-w-xl mx-auto">
            Avoid unauthorized colonies and middlemen markups. Schedule an on-ground site visit with Mr. Lalit Singh Bisht today.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}, I want to see verified listings in ${data.locality}, Jaipur.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-search inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md"
            >
              <MessageCircle size={16} />
              <span>Inquire on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E2320]/15 bg-white px-7 py-3 text-sm font-semibold text-[#1E2320] shadow-sm hover:bg-[#1E2320]/5"
            >
              <span>Submit Requirement</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
