"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Phone,
  MessageCircle,
  ShieldCheck,
  Search,
  CheckCircle2,
  Building2,
  FileText,
  BadgePercent,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";

interface FAQItem {
  id: string;
  category: "buying" | "selling" | "legal" | "loans" | "localities";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  // Category: Buying
  {
    id: "buy-1",
    category: "buying",
    question: "What is the average price of a 3 BHK flat in Murlipura, Jaipur?",
    answer:
      "In Murlipura Scheme, ready-to-move 3 BHK builder floors and apartments typically range from ₹48 Lakh to ₹85 Lakh depending on the sector, floor level, lift provision, covered car parking, and proximity to Sikar Road. Independent houses and duplex kothis generally range between ₹85 Lakh to ₹1.6 Crore.",
  },
  {
    id: "buy-2",
    category: "buying",
    question: "What is the difference between a Builder Floor and a Multi-Storey Society Flat in Jaipur?",
    answer:
      "A Builder Floor in Jaipur typically consists of a G+3 or G+4 standalone structure on an independent residential plot (typically 200 to 400 sq.yards) offering greater privacy, lower maintenance fees, and undivided land share (UDS). Multi-storey societies (like those in Vidhyadhar Nagar or Jagatpura) provide extensive amenities such as swimming pools, clubhouses, 24/7 power backup, and landscaped gardens, but come with monthly society maintenance charges.",
  },
  {
    id: "buy-3",
    category: "buying",
    question: "How do I know if a property is priced fairly in Jaipur?",
    answer:
      "Fair valuation in Jaipur is evaluated through three key metrics: recent Sub-Registrar DLC (District Level Committee) registered rates, recent actual sale transactions within a 500-meter radius, and road width frontage (e.g., properties on 40ft or 60ft roads command a 15-25% premium over 30ft roads). Property Boutique provides free, honest market valuations directly based on authentic registered transaction deeds.",
  },
  {
    id: "buy-4",
    category: "buying",
    question: "Are ready-to-move properties safer than under-construction projects?",
    answer:
      "Yes. Ready-to-move properties eliminate construction delay risks, allow immediate physical inspection of construction quality and water supply, and are eligible for immediate home possession and rental income. Under-construction projects should only be purchased if strictly RERA-registered with an active escrow account.",
  },

  // Category: Legal & JDA
  {
    id: "legal-1",
    category: "legal",
    question: "How do I verify if a property in Jaipur has an authentic JDA Patta?",
    answer:
      "To verify JDA Patta authenticity: (1) Check the original lease deed or Patta document bearing official JDA holographic seal and dispatch number; (2) Verify if the layout was converted under Rajasthan Land Revenue Act Section 90-A; (3) Check the Sub-Registrar revenue books for prior sale deeds; and (4) Confirm that the scheme appears on the official JDA Master Plan 2025/2031 portal. Property Boutique verifies all four criteria before listing any property.",
  },
  {
    id: "legal-2",
    category: "legal",
    question: "What is the difference between JDA Patta and Society Patta (Grah Nirman Sahkari Samiti)?",
    answer:
      "Society Pattas were issued by private housing cooperative societies before regulations tightened. While some society schemes are regularized under JDA camps, an unregularized society patta carries high legal risk and is generally ineligible for nationalized bank home loans. A JDA Patta represents direct title ownership recognized by the state government with guaranteed legal sanctity and 100% bank loan approval.",
  },
  {
    id: "legal-3",
    category: "legal",
    question: "What documents must a buyer check before purchasing property in Jaipur?",
    answer:
      "Essential documents include: (1) Original JDA Patta / Title Deed; (2) Chain of title deeds (previous sale deeds showing unbroken ownership chain for at least 30 years); (3) Latest Jamabandi and Revenue Record; (4) Approved Building Plan from JDA or Municipal Corporation; (5) Non-Encumbrance Certificate (Bar-Mukti Praman Patra); (6) Latest Electricity and Water bills in the seller's name; and (7) Seller's Aadhar and PAN cards.",
  },
  {
    id: "legal-4",
    category: "legal",
    question: "What are the stamp duty and registration charges in Rajasthan in 2025?",
    answer:
      "In Rajasthan, stamp duty for male buyers is typically 6% + 20% registration surcharge (total ~7.2% of DLC or purchase value, whichever is higher). For female buyers, there is a 1% government concession (5% stamp duty + surcharges). Registration fees are an additional 1% (capped per government rules). We assist buyers with exact Sub-Registrar calculation to prevent any surprise fees.",
  },

  // Category: Selling & Valuation
  {
    id: "sell-1",
    category: "selling",
    question: "How quickly can Property Boutique sell my property in Jaipur?",
    answer:
      "Because Property Boutique maintains an active network of pre-screened buyers seeking properties in Murlipura, Sikar Road, Vidhyadhar Nagar, and Jhotwara, fairly priced clear-title properties typically receive genuine offers within 14 to 30 days. We manage photography, client walkthroughs, and buyer qualification so sellers avoid casual lookers.",
  },
  {
    id: "sell-2",
    category: "selling",
    question: "Does Property Boutique charge hidden fees or commissions?",
    answer:
      "No. We operate on 100% transparent, written terms agreed upon upfront. We strictly prohibit artificial price inflation or hidden broker markups. The buyer and seller negotiate face-to-face with all documentation open for mutual review.",
  },
  {
    id: "sell-3",
    category: "selling",
    question: "What steps are required to legally transfer property after agreement in Jaipur?",
    answer:
      "The legal transfer process involves: (1) Drafting a formal Agreement to Sell (Biyana) with token advance; (2) Clearing any existing mortgage or bank NOC; (3) Preparing the final Sale Deed (Vikraya Patra) on government e-stamp paper; (4) Biometric registration in front of the Sub-Registrar officer with two witnesses; and (5) Submitting mutation application (Dakhil Kharij) in JDA / Municipal records.",
  },

  // Category: Home Loans & RERA
  {
    id: "loans-1",
    category: "loans",
    question: "What is Mr. Lalit Singh Bisht's RERA Registration Number?",
    answer:
      "Property Boutique operates under official Rajasthan Real Estate Regulatory Authority (RERA) Registration Number RAJ/A/2018/606. This guarantees that all transactions comply strictly with Real Estate (Regulation and Development) Act mandates for buyer protection, truth in advertising, and ethical conduct.",
  },
  {
    id: "loans-2",
    category: "loans",
    question: "Which banks provide home loans for properties listed on Property Boutique?",
    answer:
      "All verified properties qualify for home loans from premier lenders including State Bank of India (SBI), HDFC Bank, ICICI Bank, Bank of Baroda, Axis Bank, and Punjab National Bank. We coordinate directly with dedicated bank home loan managers for swift legal appraisal and maximum loan eligibility (up to 80-90% funding).",
  },
  {
    id: "loans-3",
    category: "loans",
    question: "What is the CIBIL score required for a home loan in Jaipur?",
    answer:
      "A CIBIL score of 750 or higher guarantees the lowest interest rates and quickest approvals. However, borrowers with CIBIL scores between 680 and 749 can still qualify for home loans with slightly adjusted interest margins. We assist buyers in reviewing their loan eligibility prior to booking.",
  },

  // Category: Locality Specific
  {
    id: "loc-1",
    category: "localities",
    question: "Why is Sikar Road considered Jaipur's fastest growing investment corridor?",
    answer:
      "Sikar Road connects Jaipur directly to the northern industrial belts, Delhi-Ajmer bypass, and the upcoming Jaipur Ring Road expansion. With the VKI industrial zone employing tens of thousands, major educational institutions, hospitals, and hypermarkets like Sun City, rental demand is consistently high and capital appreciation has outpaced central city averages over the last 5 years.",
  },
  {
    id: "loc-2",
    category: "localities",
    question: "Is Vidhyadhar Nagar a good residential area for families?",
    answer:
      "Vidhyadhar Nagar is widely recognized as one of North Jaipur's most planned, secure, and family-friendly sectors. Designed with wide sector roads, underground drainage, green public gardens in every sector, top schools (like St. Anselm's and IIS), multispecialty hospitals, and the famous Central Spine high street, it is ideal for end-users seeking high quality of life.",
  },
  {
    id: "loc-3",
    category: "localities",
    question: "What are the best areas to buy a budget flat under ₹40 Lakh in Jaipur?",
    answer:
      "Areas such as Murlipura (Dadi Ka Phatak / Bajrang Vihar periphery), Kalwar Road (Jhotwara extension), Niwaru Road, and Sikar Road (Harmada corridor) offer excellent, legally verified 2 BHK builder floors and apartments between ₹28 Lakh and ₹38 Lakh with full bank loan support.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    "buy-1": true,
    "legal-1": true,
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

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

      {/* Hero Section */}
      <section className="px-4 pt-12 pb-10 sm:px-6 md:pt-16 md:pb-12 border-b border-[#1E2320]/10 bg-gradient-to-b from-[#FAF6F1] to-[#FDFBF7]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-4 py-1.5 text-xs font-bold text-terracotta mb-4">
            <HelpCircle size={15} />
            <span>Jaipur Real Estate Knowledge Base</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-[#1E2320] leading-tight">
            Frequently Asked <span className="text-terracotta">Questions</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#1E2320]/75 max-w-2xl mx-auto leading-relaxed">
            Clear, honest, and legally vetted answers regarding property rates, JDA Patta verification, home loans, registry procedures, and top localities across Jaipur.
          </p>

          {/* Search Input */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E2320]/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. JDA Patta, Murlipura prices, stamp duty)..."
              className="w-full rounded-full border border-[#1E2320]/15 bg-white py-3.5 pl-12 pr-5 text-sm text-[#1E2320] shadow-sm placeholder:text-[#1E2320]/40 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Questions" },
              { id: "buying", label: "Buying Homes" },
              { id: "legal", label: "JDA & Legal" },
              { id: "selling", label: "Selling & Valuation" },
              { id: "loans", label: "Loans & RERA" },
              { id: "localities", label: "Jaipur Localities" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#1E2320] text-white shadow-sm"
                    : "border border-[#1E2320]/15 bg-white text-[#1E2320]/70 hover:bg-[#1E2320]/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ List */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {filteredFAQs.length === 0 ? (
          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-10 text-center shadow-sm">
            <HelpCircle size={40} className="mx-auto text-[#1E2320]/30 mb-3" />
            <h2 className="text-base font-bold text-[#1E2320]">No Matching Questions Found</h2>
            <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60">
              Have a specific question about property in Jaipur? Contact Mr. Lalit Singh Bisht directly.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Property Boutique, I have a specific real estate question regarding Jaipur.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-search mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold text-white shadow-md"
            >
              <MessageCircle size={15} />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id]);
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-2xl border border-[#1E2320]/10 bg-white shadow-sm transition-all hover:border-[#1E2320]/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1E2320] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-terracotta/10 text-terracotta" : "bg-[#1E2320]/5 text-[#1E2320]/60"
                      }`}
                    >
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#1E2320]/5 px-5 pt-3 pb-5 text-xs sm:text-sm text-[#1E2320]/75 leading-relaxed bg-[#FAF6F1]/40">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Help Card */}
        <div className="mt-12 rounded-3xl border border-terracotta/20 bg-gradient-to-r from-[#FAF6F1] to-[#FFF6EE] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
                <CheckCircle2 size={13} />
                <span>RERA Registered Advisor</span>
              </div>
              <h3 className="text-xl font-bold text-[#1E2320]">
                Have a Complex Question Regarding Jaipur Real Estate?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/70 max-w-xl">
                Speak directly with Mr. Lalit Singh Bisht. 15+ years on-ground legal and market advisory in Murlipura, Sikar Road, Vidhyadhar Nagar &amp; Jhotwara.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-search inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md"
              >
                <Phone size={15} />
                <span>Call {siteConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Property Boutique, I would like to schedule a property consultation in Jaipur.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#1E2320]/15 bg-white px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#1E2320] shadow-sm hover:bg-[#1E2320]/5"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
