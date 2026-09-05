"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  Send,
  Users,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";
import { SearchableLocalitySelect } from "@/components/common/SearchableLocalitySelect";

export default function SellPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    locality: "Murlipura",
    propertyType: "Residential Plot",
    size: "",
    expectedPrice: "",
    titleStatus: "JDA Approved Patta",
    roadWidth: "40 ft",
    facing: "East Facing",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWhatsAppDirect = () => {
    const summary = `Hello RajHomes! I want to sell my property in Jaipur.\n\n*Property Details:*\n• Type: ${formData.propertyType}\n• Locality: ${formData.locality}\n• Area/Size: ${formData.size || "Not specified"}\n• Expected Price: ${formData.expectedPrice || "Negotiable"}\n• Title Status: ${formData.titleStatus}\n• Road Width: ${formData.roadWidth}\n• Facing: ${formData.facing}\n\n*Owner Contact:*\n• Name: ${formData.name || "Owner"}\n• Phone: ${formData.phone || "Not specified"}\n\nPlease contact me for inspection and valuation.`;

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      alert("Please provide your Phone / WhatsApp number so our consultant can contact you.");
      return;
    }

    setIsSubmitting(true);
    const requirementSummary = `SELLER LISTING: ${formData.propertyType} in ${formData.locality}, Size: ${formData.size || "N/A"}, Expected: ${formData.expectedPrice || "N/A"}, Title: ${formData.titleStatus}, Road: ${formData.roadWidth}, Facing: ${formData.facing}. Notes: ${formData.notes || "None"}`;

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sell",
          requirement: requirementSummary,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setIsSuccess(true);
    } catch {
      // Fallback: open WhatsApp
      handleWhatsAppDirect();
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#1E2320]">
      {/* Top Header */}
      <header className="border-b border-[#1E2320]/10 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#1E2320]">
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/buy"
              className="text-xs font-semibold text-[#1E2320]/75 hover:text-terracotta"
            >
              Buy Properties
            </Link>
            <Link
              href={`tel:${siteConfig.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#1E2320]/15 px-3.5 py-1.5 text-xs font-semibold text-[#1E2320]"
            >
              <Phone size={13} />
              <span>{siteConfig.phone}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-12 pb-8 sm:px-8 sm:pt-16 sm:pb-12 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-4 py-1 text-xs font-bold text-terracotta uppercase tracking-wider mb-4">
          <Sparkles size={13} />
          <span>Jaipur Seller Concierge</span>
        </span>
        <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-[#1E2320] leading-tight">
          Sell Your Jaipur Property at Maximum Market Value
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#1E2320]/70 max-w-2xl mx-auto leading-relaxed">
          Connect directly with serious, verified buyers across Murlipura, Sikar Road, Vidhyadhar Nagar, and Jhotwara. Zero upfront cost, 100% legal paperwork support.
        </p>

        {/* 3 Quick Value Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-medium text-[#1E2320]/80">
          <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 shadow-sm border border-[#1E2320]/5">
            <ShieldCheck size={16} className="text-green-600" />
            <span>Zero Upfront Listing Fee</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 shadow-sm border border-[#1E2320]/5">
            <Clock size={16} className="text-terracotta" />
            <span>Average Sale in 35 Days</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 shadow-sm border border-[#1E2320]/5">
            <Users size={16} className="text-blue-600" />
            <span>200+ Active Cash &amp; Loan Buyers</span>
          </div>
        </div>
      </section>

      {/* Main Valuation & Submission Form */}
      <section className="mx-auto max-w-3xl px-4 py-6 sm:px-8">
        <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-xl sm:p-10">
          {isSuccess ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl font-bold text-[#1E2320]">
                Property Details Received!
              </h2>
              <p className="mt-2 text-sm text-[#1E2320]/70 max-w-md mx-auto">
                Thank you! Our Jaipur real estate specialist will contact you on WhatsApp / Phone within 30 minutes to arrange a free valuation inspection.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#20BE5B]"
                >
                  <MessageCircle size={17} />
                  <span>Chat on WhatsApp Directly</span>
                </button>
                <Link
                  href="/buy"
                  className="rounded-2xl border border-[#1E2320]/15 px-6 py-3.5 text-sm font-semibold hover:bg-[#1E2320]/5"
                >
                  Explore Market Listings
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div className="border-b border-[#1E2320]/10 pb-4">
                <h2 className="text-xl font-bold">List Your Property with RajHomes</h2>
                <p className="text-xs text-[#1E2320]/60 mt-1">
                  Fill in your property details below for an accurate market price evaluation.
                </p>
              </div>

              {/* Row 1: Type & Locality */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-4 py-3 text-sm focus:border-terracotta focus:outline-none font-medium"
                  >
                    <option value="Residential Plot">Residential Plot / Land</option>
                    <option value="Flat / Apartment">Flat / Apartment</option>
                    <option value="Independent Villa">Independent Villa / Kothi</option>
                    <option value="Commercial Land/Shop">Commercial Shop / Showroom / Land</option>
                  </select>
                </div>

                <div>
                  <SearchableLocalitySelect
                    value={formData.locality}
                    onChange={(val) => setFormData({ ...formData, locality: val })}
                    label="Locality in Jaipur"
                    placeholder="Search or select from 40+ Jaipur localities..."
                  />
                </div>
              </div>

              {/* Row 2: Size & Expected Price */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Property Size / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="e.g. 150 sq.yd, 3 BHK, 1200 sq.ft"
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-4 py-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Expected Price
                  </label>
                  <input
                    type="text"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    placeholder="e.g. ₹55 Lac or ₹1.10 Cr"
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-4 py-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Legal Patta & Road Width */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Title / Patta Status
                  </label>
                  <select
                    value={formData.titleStatus}
                    onChange={(e) => setFormData({ ...formData, titleStatus: e.target.value })}
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-3 text-xs sm:text-sm focus:outline-none"
                  >
                    <option value="JDA Approved Patta">JDA Approved Patta</option>
                    <option value="90B Approved">90B Approved</option>
                    <option value="Registry / Registry Patta">Registry / Nagar Nigam</option>
                    <option value="Society Patta">Society Patta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Front Road Width
                  </label>
                  <select
                    value={formData.roadWidth}
                    onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-3 text-xs sm:text-sm focus:outline-none"
                  >
                    <option value="30 ft">30 ft Road</option>
                    <option value="40 ft">40 ft Road</option>
                    <option value="60 ft">60 ft Sector Road</option>
                    <option value="80+ ft">80+ ft Main Road</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Facing Direction
                  </label>
                  <select
                    value={formData.facing}
                    onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-3 text-xs sm:text-sm focus:outline-none"
                  >
                    <option value="East Facing">East Facing</option>
                    <option value="North Facing">North Facing</option>
                    <option value="North-East">North-East</option>
                    <option value="Corner Plot">Corner Plot</option>
                    <option value="West/South Facing">West / South Facing</option>
                  </select>
                </div>
              </div>

              {/* Owner Contact Information */}
              <div className="pt-4 border-t border-[#1E2320]/10 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E2320]/70">
                  Owner Contact Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rameshwar Agarwal"
                      className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-4 py-3 text-sm focus:border-terracotta focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] px-4 py-3 text-sm focus:border-terracotta focus:outline-none font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Additional Details / Urgency
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Looking to sell within 30 days, clear registry papers available."
                    className="w-full rounded-2xl border border-[#1E2320]/15 bg-[#FAF6F1] p-3.5 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-search flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold text-white shadow-lg active:scale-[0.98] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Details...</span>
                  ) : (
                    <>
                      <span>Submit for Free Valuation</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-md hover:bg-[#20BE5B] transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={17} />
                  <span>Send on WhatsApp</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-[#1E2320]/50 pt-1">
                Your contact details are strictly confidential. We only share details with genuine, verified buyers.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold sm:text-3xl">How We Sell Your Property in 4 Steps</h2>
          <p className="mt-2 text-sm text-[#1E2320]/60 max-w-lg mx-auto">
            From honest market pricing to safe JDA registry, we manage everything from start to finish.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm relative">
            <span className="text-3xl font-black text-terracotta/20">01</span>
            <h3 className="mt-2 font-bold text-base">On-Site Valuation</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#1E2320]/70">
              We physically inspect your property and analyze recent circle rates and actual transaction prices in your Jaipur pocket.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm relative">
            <span className="text-3xl font-black text-terracotta/20">02</span>
            <h3 className="mt-2 font-bold text-base">Targeted Marketing</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#1E2320]/70">
              Professional photos, 360° virtual tours, and promotion to our network of 200+ pre-approved home loan buyers.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm relative">
            <span className="text-3xl font-black text-terracotta/20">03</span>
            <h3 className="mt-2 font-bold text-base">Buyer Screenings</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#1E2320]/70">
              Zero time-wasters. We verify buyer finances and negotiate directly to achieve your target asking price.
            </p>
          </div>

          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm relative">
            <span className="text-3xl font-black text-terracotta/20">04</span>
            <h3 className="mt-2 font-bold text-base">Safe JDA Registry</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#1E2320]/70">
              Full assistance with agreement drafting, token money escrow, bank NOCs, and smooth Sub-Registrar deed execution.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Quote / Stats Banner */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <div className="rounded-3xl bg-[#1E2320] p-8 text-white sm:p-12">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <p className="text-4xl font-extrabold text-terracotta">200+</p>
              <p className="mt-1 text-xs text-white/70">Properties Successfully Sold &amp; Registered</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-terracotta">12+ Years</p>
              <p className="mt-1 text-xs text-white/70">Trusted in Murlipura &amp; Sikar Road Market</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-terracotta">100%</p>
              <p className="mt-1 text-xs text-white/70">Clear Title &amp; Registry Verification Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
