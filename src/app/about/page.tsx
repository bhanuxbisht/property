import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  FileCheck,
  Banknote,
  Phone,
  MessageCircle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";

export const metadata = {
  title: `About Us — ${siteConfig.name} | 15+ Years Trusted Property Consultant in Jaipur`,
  description: `Learn about ${siteConfig.name} — premier independent real estate consultancy with 15+ years of on-ground experience in Murlipura, Sikar Road, Vidhyadhar Nagar, Jhotwara, and across Jaipur. RERA registered.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* Floating Glassmorphic Pill Header — Homevera Style */}
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
              Buy Properties
            </Link>
            <Link
              href="/sell"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Sell Property
            </Link>
            <Link
              href="/contact"
              className="btn-peach rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-[13.5px] font-semibold text-[#2D2824] shadow-sm transition-all hover:scale-[1.02]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 pt-14 pb-16 sm:px-6 md:pt-20 md:pb-24 border-b border-[#1E2320]/10 bg-gradient-to-b from-[#FAF6F1] to-[#FDFBF7]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-4 py-1.5 text-xs font-bold text-terracotta mb-6">
            <ShieldCheck size={15} />
            <span>RERA Registered: {siteConfig.reraNumber}</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-[#1E2320] leading-tight">
            15+ Years of Integrity in <br className="hidden sm:inline" />
            <span className="text-terracotta">Jaipur Real Estate</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#1E2320]/75 max-w-2xl mx-auto leading-relaxed">
            We are not just brokers; we are trusted property advisors. Guiding families and investors to clear-title, JDA-approved properties across Murlipura, Sikar Road, Vidhyadhar Nagar, and all of Jaipur.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="btn-search inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Phone size={16} />
              <span>Call Consultant Directly</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}, I would like to consult regarding property in Jaipur.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E2320]/15 bg-white px-7 py-3 text-sm font-semibold text-[#1E2320] hover:bg-[#1E2320]/5 shadow-sm"
            >
              <MessageCircle size={16} className="text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* KPI Stats */}
      <section className="px-4 py-12 sm:px-6 bg-white border-b border-[#1E2320]/10">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-terracotta">15+ Years</p>
            <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60 font-medium">Jaipur Market Experience</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-[#1E2320]">250+</p>
            <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60 font-medium">Homes &amp; Plots Sold</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-700">100%</p>
            <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60 font-medium">Clear JDA Titles</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-700">₹100 Cr+</p>
            <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60 font-medium">Property Value Closed</p>
          </div>
        </div>
      </section>

      {/* Why Choose Property Boutique (4 Pillars) */}
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2320]">
              Why Jaipur Families Choose Us Over Regular Brokers
            </h2>
            <p className="mt-2 text-sm text-[#1E2320]/65 max-w-xl mx-auto">
              In real estate, a wrong decision can cause years of legal trouble. We guarantee absolute safety and transparency for every single square yard.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta mb-4">
                <FileCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1E2320]">100% JDA Patta &amp; Legal Verification</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/70 leading-relaxed">
                We personally examine revenue records, JDA master plans, approved colony layouts, and chain of title deeds before showcasing any property. Zero unauthorized schemes.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 mb-4">
                <Banknote size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1E2320]">Pre-Approved Bank Loans (SBI, HDFC, ICICI)</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/70 leading-relaxed">
                Direct relationships with nationalized and private bank loan officers. We assist buyers from documentation to sanction at the lowest available home loan interest rates.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-800 mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1E2320]">Direct Seller Pricing (Zero Hidden Markups)</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/70 leading-relaxed">
                No middleman layering or artificial price inflation. Buyers and sellers sit face-to-face to negotiate directly with clear, written terms.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-800 mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1E2320]">Hyper-Local Jaipur Expertise</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/70 leading-relaxed">
                With 15+ years in Murlipura, Sikar Road, Vidhyadhar Nagar, Jhotwara, Vaishali, and Mansarovar, we know upcoming road widening, metro connectivity, and colony appreciation rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="px-4 py-16 sm:px-6 bg-[#FAF6F1] border-t border-[#1E2320]/10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E2320]">
              Our Real Estate Services in Jaipur
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#1E2320]/5">
              <h3 className="text-base font-bold text-[#1E2320]">1. Verified Home Buying</h3>
              <p className="mt-2 text-xs text-[#1E2320]/70 leading-relaxed">
                From budget 2 BHK flats to 4 BHK luxury villas, find inspected, ready-to-move and under-construction properties with clear documentation.
              </p>
              <Link href="/buy" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-terracotta">
                <span>Browse Listings</span> <ArrowRight size={13} />
              </Link>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#1E2320]/5">
              <h3 className="text-base font-bold text-[#1E2320]">2. Quick Property Sale</h3>
              <p className="mt-2 text-xs text-[#1E2320]/70 leading-relaxed">
                Have a plot, villa, or flat to sell? We connect you with genuine, pre-qualified buyers actively looking in your locality.
              </p>
              <Link href="/sell" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-terracotta">
                <span>List Your Property</span> <ArrowRight size={13} />
              </Link>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#1E2320]/5">
              <h3 className="text-base font-bold text-[#1E2320]">3. Legal &amp; Patta Assistance</h3>
              <p className="mt-2 text-xs text-[#1E2320]/70 leading-relaxed">
                Assistance with JDA patta conversion, registry execution, stamp duty estimation, and Sub-Registrar office filing.
              </p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-terracotta">
                <span>Book Consultation</span> <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
