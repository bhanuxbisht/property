"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Maximize2,
  MapPin,
  MessageCircle,
  Search,
  Compass,
  ArrowRight,
  Sparkles,
  X,
  RotateCcw,
} from "lucide-react";
import { PropertyListing } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-areas";

const POPULAR_LOCALITIES = [
  "all",
  "Murlipura",
  "Sikar Road",
  "Vidhyadhar Nagar",
  "Jhotwara",
  "Vaishali Nagar",
  "Mansarovar",
  "Jagatpura",
];

export default function BuyPage() {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedLocality, setSelectedLocality] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBhk, setSelectedBhk] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSold, setShowSold] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/listings?status=all")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.listings) {
          setListings(data.listings);
        }
      })
      .catch((err) => {
        console.error("Failed to load listings:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredListings = useMemo(() => {
    return listings.filter((prop) => {
      // Status filter
      if (!showSold && prop.status === "sold") return false;

      // Locality filter
      if (
        selectedLocality !== "all" &&
        prop.locality.toLowerCase() !== selectedLocality.toLowerCase()
      ) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && prop.type !== selectedType) {
        return false;
      }

      // BHK filter
      if (selectedBhk !== "all") {
        if (selectedBhk === "plot" && prop.type !== "plot") return false;
        if (selectedBhk === "4+ BHK" && !["4 BHK", "5+ BHK"].includes(prop.bhk)) return false;
        if (selectedBhk !== "plot" && selectedBhk !== "4+ BHK" && prop.bhk !== selectedBhk) {
          return false;
        }
      }

      // Budget filter
      if (selectedBudget !== "all") {
        const val = prop.priceValue || 0;
        if (selectedBudget === "under-35l" && val > 3500000) return false;
        if (selectedBudget === "35l-60l" && (val < 3500000 || val > 6000000)) return false;
        if (selectedBudget === "60l-1cr" && (val < 6000000 || val > 10000000)) return false;
        if (selectedBudget === "above-1cr" && val < 10000000) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          prop.title.toLowerCase().includes(q) ||
          prop.locality.toLowerCase().includes(q) ||
          prop.price.toLowerCase().includes(q) ||
          prop.bhk.toLowerCase().includes(q) ||
          prop.type.toLowerCase().includes(q) ||
          prop.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [
    listings,
    selectedLocality,
    selectedType,
    selectedBhk,
    selectedBudget,
    searchQuery,
    showSold,
  ]);

  const hasActiveFilters =
    selectedLocality !== "all" ||
    selectedType !== "all" ||
    selectedBhk !== "all" ||
    selectedBudget !== "all" ||
    searchQuery.trim() !== "" ||
    !showSold;

  const resetFilters = () => {
    setSelectedLocality("all");
    setSelectedType("all");
    setSelectedBhk("all");
    setSelectedBudget("all");
    setSearchQuery("");
    setShowSold(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#1E2320]">
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
              href="/sell"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Sell Property
            </Link>
            <Link
              href="/about"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              About Consultant
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

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-[#1E2320]/50 mb-2">
            <Link href="/" className="hover:text-[#1E2320] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1E2320]">Properties in Jaipur</span>
          </div>
          <h1 className="text-2xl font-extrabold sm:text-4xl text-[#1E2320] tracking-tight">
            Properties for Sale in Jaipur
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#1E2320]/70 max-w-2xl">
            Verified flats, residential plots, and luxury villas with 100% clear JDA titles across Jaipur.
          </p>
        </div>

        {/* ── CLEAN & INTUITIVE SEARCH & FILTER SYSTEM ── */}
        <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-5 sm:p-6 shadow-sm space-y-5">
          {/* 1. Full-Width Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-terracotta"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by locality, BHK, budget, or property title (e.g. 3 BHK in Murlipura)..."
              className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] pl-11 pr-10 py-3.5 text-sm text-[#1E2320] placeholder:text-[#1E2320]/45 focus:border-terracotta focus:bg-white focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1E2320]/40 hover:text-[#1E2320] p-1 cursor-pointer"
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* 2. Popular Jaipur Areas Quick Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#1E2320]/60 uppercase tracking-wider">
                Popular Localities
              </span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-terracotta hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={12} /> Reset All Filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {POPULAR_LOCALITIES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocality(loc)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    selectedLocality.toLowerCase() === loc.toLowerCase()
                      ? "bg-terracotta text-white shadow-md scale-105"
                      : "bg-[#FAF6F1] text-[#1E2320]/75 hover:bg-[#1E2320]/10"
                  }`}
                >
                  {loc === "all" ? "All Jaipur" : loc}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Secondary Filter Controls (Dropdowns without annoying icons) */}
          <div className="pt-4 border-t border-[#1E2320]/10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 text-xs">
              {/* All Localities Dropdown (Clean text, NO emoji) */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1E2320]/70 mb-1">
                  All Jaipur Areas
                </label>
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3 py-2.5 font-medium text-[#1E2320] focus:border-terracotta focus:outline-none cursor-pointer"
                >
                  <option value="all">All Localities (40+ Areas)</option>
                  {JAIPUR_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1E2320]/70 mb-1">
                  Property Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3 py-2.5 font-medium text-[#1E2320] focus:border-terracotta focus:outline-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="flat">Flats / Apartments</option>
                  <option value="plot">Plots / Land</option>
                  <option value="villa">Independent Villas</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>

              {/* BHK Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1E2320]/70 mb-1">
                  BHK / Layout
                </label>
                <select
                  value={selectedBhk}
                  onChange={(e) => setSelectedBhk(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3 py-2.5 font-medium text-[#1E2320] focus:border-terracotta focus:outline-none cursor-pointer"
                >
                  <option value="all">All Configurations</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4+ BHK">4+ BHK</option>
                  <option value="plot">Plots Only</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-[#1E2320]/70 mb-1">
                  Budget
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3 py-2.5 font-medium text-[#1E2320] focus:border-terracotta focus:outline-none cursor-pointer"
                >
                  <option value="all">Any Budget</option>
                  <option value="under-35l">Under ₹35 Lakh</option>
                  <option value="35l-60l">₹35 Lakh - ₹60 Lakh</option>
                  <option value="60l-1cr">₹60 Lakh - ₹1 Crore</option>
                  <option value="above-1cr">Above ₹1 Crore</option>
                </select>
              </div>

              {/* Include Sold Toggle */}
              <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
                <label className="flex items-center gap-2 rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-2.5 w-full cursor-pointer hover:bg-[#1E2320]/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={showSold}
                    onChange={(e) => setShowSold(e.target.checked)}
                    className="rounded border-[#1E2320]/20 text-terracotta focus:ring-terracotta"
                  />
                  <span className="font-semibold text-[#1E2320]">Include Sold</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ── RESULTS HEADER & COUNT ── */}
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[#1E2320]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-bold text-[#1E2320]">
              Showing {filteredListings.length} {filteredListings.length === 1 ? "Property" : "Properties"} in Jaipur
            </span>
            {selectedLocality !== "all" && (
              <span className="rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs font-semibold text-terracotta">
                {selectedLocality}
              </span>
            )}
            {searchQuery && (
              <span className="rounded-full bg-[#1E2320]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1E2320]">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          <div className="text-xs text-[#1E2320]/60">
            JDA verified titles · Direct owner negotiation
          </div>
        </div>

        {/* ── PROPERTY LISTINGS GRID ── */}
        <div className="mt-6">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-3xl bg-white/70 animate-pulse border border-[#1E2320]/5"
                />
              ))}
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-12 text-center my-8 shadow-sm">
              <Sparkles className="mx-auto h-12 w-12 text-terracotta/50 mb-3" />
              <h3 className="text-lg font-bold text-[#1E2320]">
                No matching properties found
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60 max-w-md mx-auto leading-relaxed">
                We frequently have off-market plots, luxury villas, and flats in Jaipur that aren&apos;t listed online yet.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-search rounded-full px-6 py-2.5 text-xs font-semibold text-white shadow cursor-pointer"
                >
                  Clear All Filters
                </button>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi ${siteConfig.name}! I was searching for ${selectedLocality !== "all" ? selectedLocality : "property"} in Jaipur but couldn't find a matching listing. Do you have off-market options?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#25D366] px-6 py-2.5 text-xs font-semibold text-white shadow hover:bg-[#20bd5a] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle size={14} /> Ask on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((prop) => (
                <article
                  key={prop.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#1E2320]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    {/* Property Image & Status Badges */}
                    <Link
                      href={`/property/${prop.id}`}
                      className="relative aspect-[16/10] block w-full bg-black/10 overflow-hidden"
                    >
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                            prop.status === "available"
                              ? "bg-emerald-600 text-white"
                              : "bg-[#1E2320]/80 text-white"
                          }`}
                        >
                          {prop.status === "available" ? "Active for Sale" : "SOLD OUT"}
                        </span>
                        {prop.has360 && (
                          <span className="rounded-full bg-purple-600 px-3 py-1 text-[11px] font-bold text-white flex items-center gap-1 shadow-sm">
                            <Compass size={12} /> 360° Virtual Tour
                          </span>
                        )}
                      </div>

                      {/* Bottom Price Pill */}
                      <div className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-extrabold text-[#1E2320] shadow-md backdrop-blur-sm">
                        {prop.price}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-terracotta">
                        <span className="uppercase tracking-wider">{prop.type}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#1E2320]/70 font-medium">
                          <MapPin size={12} /> {prop.locality}, Jaipur
                        </span>
                      </div>

                      <h2 className="mt-2 text-base font-bold text-[#1E2320] group-hover:text-terracotta transition-colors line-clamp-2">
                        <Link href={`/property/${prop.id}`}>{prop.title}</Link>
                      </h2>

                      {/* Key Specs */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-[#1E2320]/75 border-y border-[#1E2320]/5 py-2.5">
                        <span className="flex items-center gap-1 font-medium">
                          <Bed size={13} className="text-terracotta" /> {prop.bhk}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Maximize2 size={13} className="text-terracotta" /> {prop.area}
                        </span>
                        {prop.jdaApproved && (
                          <>
                            <span>•</span>
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                              JDA Approved
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-3 text-xs text-[#1E2320]/65 line-clamp-2 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-5 pt-0">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}! I am interested in "${prop.title}" in ${prop.locality} priced at ${prop.price}. Please share exact address and schedule a site visit.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/15 py-2.5 text-xs font-bold text-[#128C7E] transition-all hover:bg-[#25D366] hover:text-white"
                      >
                        <MessageCircle size={14} />
                        <span>Inquire on WhatsApp</span>
                      </a>

                      <Link
                        href={`/property/${prop.id}`}
                        className="flex items-center justify-center rounded-xl bg-[#FAF6F1] px-3.5 py-2.5 text-xs font-semibold text-[#1E2320] hover:bg-[#1E2320]/10 transition-colors"
                        title="View Full Property Details"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Off-Market Consultation Banner */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-[#1E2320] to-[#2D2824] p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl">
            <span className="rounded-full bg-terracotta/30 px-3 py-1 text-xs font-bold text-terracotta uppercase tracking-wider">
              Off-Market Property Desk
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Can&apos;t find your exact dream property?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed">
              We maintain direct relationships with colony colonizers, independent villa builders, and verified plot owners across Jaipur. Tell us your budget and preferred colony.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}, I am looking for custom property options in Jaipur. Please share available inventory.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-search inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-white shadow-lg cursor-pointer"
              >
                <MessageCircle size={15} />
                <span>Submit Your Requirement on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white transition-colors"
              >
                <span>Book Office Consultation</span> →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
