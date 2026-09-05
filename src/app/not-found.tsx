import Link from "next/link";
import {
  Home,
  Search,
  BookOpen,
  HelpCircle,
  MessageCircle,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";

export const metadata = {
  title: "404 — Property Not Found | Property Boutique Jaipur",
  description:
    "The property listing or real estate guide you are looking for may have been sold, archived, or moved. Explore verified properties in Jaipur.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
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
              Buy
            </Link>
            <Link
              href="/sell"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Sell
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
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Hero 404 Container */}
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-4 py-1.5 text-xs font-bold text-terracotta mb-4">
          <ShieldCheck size={14} />
          <span>Error 404 · Page or Listing Unavailable</span>
        </div>

        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight text-terracotta">
          404
        </h1>

        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#1E2320]">
          Looking for a Specific Jaipur Property?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#1E2320]/70 max-w-lg mx-auto leading-relaxed">
          The property listing or real estate guide you requested may have been sold, archived, or moved. Let us help you find what you need.
        </p>

        {/* Quick Nav Options */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-xl mx-auto text-left">
          <Link
            href="/buy"
            className="flex items-center gap-3 rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm transition-all hover:border-terracotta hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
              <Search size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E2320]">Browse Listings</p>
              <p className="text-[11px] text-[#1E2320]/60">Verified flats &amp; plots</p>
            </div>
          </Link>

          <Link
            href="/blog"
            className="flex items-center gap-3 rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm transition-all hover:border-terracotta hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E2320]">Read Guides</p>
              <p className="text-[11px] text-[#1E2320]/60">JDA &amp; buying tips</p>
            </div>
          </Link>

          <Link
            href="/faq"
            className="flex items-center gap-3 rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm transition-all hover:border-terracotta hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800">
              <HelpCircle size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E2320]">View FAQ</p>
              <p className="text-[11px] text-[#1E2320]/60">Property rates &amp; legal</p>
            </div>
          </Link>
        </div>

        {/* 1-Click WhatsApp Assistance */}
        <div className="mt-10 rounded-3xl border border-terracotta/20 bg-gradient-to-r from-[#FAF6F1] to-[#FFF6EE] p-6 sm:p-8 max-w-xl mx-auto shadow-sm">
          <p className="text-xs sm:text-sm font-bold text-[#1E2320]">
            Looking for an off-market plot, villa, or flat in Murlipura, Sikar Road, or Vidhyadhar Nagar?
          </p>
          <p className="mt-1 text-xs text-[#1E2320]/65">
            Mr. Lalit Singh Bisht personally assists buyers and sellers with verified options.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Property Boutique, I landed on a 404 page while searching for property in Jaipur. Could you help me with active options?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-search inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold text-white shadow-md"
            >
              <MessageCircle size={15} />
              <span>Ask on WhatsApp</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E2320]/15 bg-white px-6 py-2.5 text-xs font-semibold text-[#1E2320] shadow-sm hover:bg-[#1E2320]/5"
            >
              <Home size={14} />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
