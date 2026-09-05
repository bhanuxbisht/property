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
  Filter,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PropertyListing } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";
import { JAIPUR_LOCALITIES } from "@/lib/jaipur-areas";

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
      {/* Header Bar */}
      <header className="border-b border-[#1E2320]/10 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#1E2320]">
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/sell"
              className="text-xs font-semibold text-[#1E2320]/75 hover:text-terracotta"
            >
              Sell Property
            </Link>
            <Link
              href="/contact"
              className="text-xs font-semibold text-[#1E2320]/75 hover:text-terracotta"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-[#1E2320]/50 mb-2">
            <Link href="/" className="hover:text-[#1E2320]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1E2320]">Properties in Jaipur</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#1E2320]">
            Properties for Sale in Jaipur
          </h1>
          <p className="mt-1 text-sm text-[#1E2320]/70">
            Verified flats, residential plots, and villas in Murlipura, Sikar Road, Vidhyadhar Nagar, and Jhotwara.
          </p>
        </div>

        {/* ── FILTER SYSTEM BAR ── */}
        <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-5 shadow-sm space-y-4">
          {/* Search Row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-3 text-[#1E2320]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by locality, budget, flat size..."
                className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] pl-11 pr-4 py-2.5 text-sm focus:border-terracotta focus:outline-none"
              />
            </div>

            {/* Quick Locality Tabs */}
            <div className="flex flex-wrap gap-1.5 overflow-x-auto [scrollbar-width:none]">
              {[
                "all",
                "Murlipura",
                "Sikar Road",
                "Vidhyadhar Nagar",
                "Jhotwara",
                "Vaishali Nagar",
                "Mansarovar",
                "Jagatpura",
              ].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocality(loc)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    selectedLocality.toLowerCase() === loc.toLowerCase()
                      ? "bg-terracotta text-white shadow-sm"
                      : "bg-[#FAF6F1] text-[#1E2320]/75 hover:bg-[#1E2320]/10"
                  }`}
                >
                  {loc === "all" ? "All Jaipur" : loc}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#1E2320]/5 text-xs">
            <div className="flex items-center gap-1.5 text-[#1E2320]/60 font-semibold">
              <Filter size={14} />
              <span>Filters:</span>
            </div>

            {/* All Jaipur Localities Dropdown */}
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="rounded-xl border border-[#1E2320]/15 bg-white px-3 py-1.5 focus:outline-none font-medium text-xs text-[#1E2320]"
            >
              <option value="all">📍 All Localities (40+ Jaipur Areas)</option>
              {JAIPUR_LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Property Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-[#1E2320]/15 bg-white px-3 py-1.5 focus:outline-none font-medium"
            >
              <option value="all">All Types</option>
              <option value="flat">Flats / Apartments</option>
              <option value="plot">Plots / Land</option>
              <option value="villa">Independent Villas</option>
            </select>

            {/* BHK Filter */}
            <select
              value={selectedBhk}
              onChange={(e) => setSelectedBhk(e.target.value)}
              className="rounded-xl border border-[#1E2320]/15 bg-white px-3 py-1.5 focus:outline-none font-medium"
            >
              <option value="all">All Configurations</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4+ BHK">4+ BHK</option>
              <option value="plot">Plots Only</option>
            </select>

            {/* Budget Filter */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="rounded-xl border border-[#1E2320]/15 bg-white px-3 py-1.5 focus:outline-none font-medium"
            >
              <option value="all">Any Budget</option>
              <option value="under-35l">Under ₹35 Lac</option>
              <option value="35l-60l">₹35 Lac – ₹60 Lac</option>
              <option value="60l-1cr">₹60 Lac – ₹1 Cr</option>
              <option value="above-1cr">Above ₹1 Cr</option>
            </select>

            {/* Sold Toggle */}
            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#1E2320]/75 ml-auto">
              <input
                type="checkbox"
                checked={showSold}
                onChange={(e) => setShowSold(e.target.checked)}
                className="rounded border-[#1E2320]/20 text-terracotta focus:ring-terracotta"
              />
              <span>Include Sold Properties</span>
            </label>

            {(selectedLocality !== "all" ||
              selectedType !== "all" ||
              selectedBhk !== "all" ||
              selectedBudget !== "all" ||
              searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-terracotta font-semibold hover:underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Listings Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#1E2320]/60 px-1">
          <span>
            Showing <strong className="text-[#1E2320]">{filteredListings.length}</strong> properties
          </span>
          <span className="flex items-center gap-1">
            <Sparkles size={13} className="text-terracotta" />
            Live MLS updated daily
          </span>
        </div>

        {/* ── LISTINGS GRID ── */}
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((prop) => {
            const isSold = prop.status === "sold";
            const whatsappMsg = `Hello RajHomes! I want to inquire about "${prop.title}" in ${prop.locality} priced at ${prop.price}. Please share photos and details.`;
            const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

            return (
              <div
                key={prop.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
                  isSold ? "border-amber-200 opacity-85" : "border-[#1E2320]/10"
                }`}
              >
                {/* Photo & Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-md ${
                        isSold
                          ? "bg-amber-500 text-white shadow-md"
                          : "bg-white/90 text-[#1E2320] shadow-md"
                      }`}
                    >
                      {isSold ? "SOLD OUT" : `FOR ${prop.type.toUpperCase()}`}
                    </span>

                    {prop.has360 && (
                      <span className="flex items-center gap-1 rounded-full bg-purple-600/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
                        <Sparkles size={12} />
                        360° Tour
                      </span>
                    )}
                  </div>

                  {prop.jdaApproved && (
                    <div className="absolute right-3 top-3 rounded-full bg-green-700/85 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
                      JDA Patta
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-2xl font-extrabold text-[#1E2320]">{prop.price}</p>
                    <span className="flex items-center gap-1 text-xs font-medium text-[#1E2320]/60">
                      <MapPin size={12} className="text-terracotta" />
                      {prop.locality}
                    </span>
                  </div>

                  <Link
                    href={`/property/${prop.id}`}
                    className="mt-2 line-clamp-1 text-base font-bold text-[#1E2320] hover:text-terracotta transition-colors"
                  >
                    {prop.title}
                  </Link>

                  <div className="mt-3 flex items-center gap-3 text-xs text-[#1E2320]/70 border-y border-[#1E2320]/5 py-2.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Bed size={14} className="text-terracotta" />
                      {prop.bhk}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Maximize2 size={14} className="text-terracotta" />
                      {prop.area}
                    </span>
                    {prop.facing && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium truncate">
                          <Compass size={13} className="text-terracotta" />
                          {prop.facing}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-col gap-2 pt-1">
                    <Link
                      href={`/property/${prop.id}`}
                      className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-[#1E2320]/15 py-2.5 text-xs font-bold text-[#1E2320] hover:bg-[#1E2320]/5 transition-colors"
                    >
                      <span>{prop.has360 ? "View 360° Tour & Specs" : "View Full Details"}</span>
                      <ArrowRight size={13} />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#25D366] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#20BE5B] transition-all"
                    >
                      <MessageCircle size={14} />
                      <span>Inquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && !loading && (
          <div className="mt-12 rounded-3xl border border-dashed border-[#1E2320]/20 bg-white p-12 text-center">
            <h3 className="text-lg font-bold text-[#1E2320]">No matching properties found</h3>
            <p className="mt-1 text-xs text-[#1E2320]/60 max-w-md mx-auto">
              We frequently have off-market plots and flats in Murlipura and Sikar Road that aren&apos;t listed online yet.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-search mt-5 inline-flex rounded-full px-6 py-2.5 text-xs font-semibold text-white"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* ── CUSTOM OFF-MARKET REQUEST BANNER ── */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#201D1A] to-[#36302B] p-8 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-terracotta/25 px-3 py-1 text-xs font-semibold text-[#FFA47A] uppercase tracking-wider mb-2">
                Off-Market Jaipur Properties
              </span>
              <h3 className="text-2xl font-bold sm:text-3xl">
                Can&apos;t find your dream property?
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Over 40% of our Jaipur transactions happen off-market directly between buyers and trusted owners. Tell us your budget and preferred locality.
              </p>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello RajHomes! I am looking for an off-market property in Jaipur. Please share options matching my requirement.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-search inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white shadow-lg"
            >
              <MessageCircle size={18} />
              <span>Tell Us Your Requirement on WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
