"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SearchableLocalitySelect } from "@/components/common/SearchableLocalitySelect";
import { Footer, MobileCTA } from "@/components/layout/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "Buy Property",
    locality: "Murlipura",
    budget: "₹40 - 60 Lakh",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      alert("Please provide your phone number so our consultant can contact you.");
      return;
    }

    setIsSubmitting(true);
    const summary = `CONTACT INQUIRY: ${formData.serviceType} in ${formData.locality}, Budget: ${formData.budget}. Message: ${formData.message || "None"}`;

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "general",
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          requirement: summary,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setIsSuccess(true);
    } catch {
      // Fallback: open WhatsApp directly
      handleWhatsApp();
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hello RajHomes! I would like to inquire regarding property in Jaipur.\n\n• Name: ${formData.name || "Client"}\n• Phone: ${formData.phone || "Not specified"}\n• Purpose: ${formData.serviceType}\n• Locality: ${formData.locality}\n• Budget: ${formData.budget}\n• Note: ${formData.message || "Please call me back"}`;

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* Top Header */}
      <header className="border-b border-[#1E2320]/10 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-[#1E2320]">
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/buy" className="text-[#1E2320]/75 hover:text-terracotta">
              Buy Properties
            </Link>
            <Link href="/sell" className="text-[#1E2320]/75 hover:text-terracotta">
              Sell Property
            </Link>
            <Link href="/about" className="text-[#1E2320]/75 hover:text-terracotta">
              About Agent
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="px-4 pt-12 pb-10 sm:px-6 md:pt-16 md:pb-12 border-b border-[#1E2320]/10 bg-gradient-to-b from-[#FAF6F1] to-[#FDFBF7]">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-[#1E2320]">
            Get in Touch with Our <br className="hidden sm:inline" />
            <span className="text-terracotta">Jaipur Property Consultant</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#1E2320]/70 max-w-xl mx-auto">
            Have questions regarding buying a home, selling a plot, or JDA title verification? Reach out directly or visit our office.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column: Form */}
          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#1E2320]">Send an Inquiry</h2>
            <p className="mt-1 text-xs text-[#1E2320]/60">
              Fill out your requirement below for a guaranteed callback within 2 hours.
            </p>

            {isSuccess ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                <CheckCircle2 size={40} className="mx-auto text-emerald-600 mb-3" />
                <h3 className="text-base font-bold text-emerald-950">Inquiry Received!</h3>
                <p className="mt-1 text-xs text-emerald-800">
                  Our principal consultant will call or message you shortly with verified options.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-xs font-semibold text-emerald-700 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Suresh Meena"
                      className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-2.5 text-sm focus:border-terracotta focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 98290XXXXX"
                      className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-2.5 text-sm focus:border-terracotta focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                      Service / Purpose *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-2.5 text-sm focus:border-terracotta focus:outline-none font-medium"
                    >
                      <option value="Buy Property">I Want to Buy Property</option>
                      <option value="Sell Property">I Want to Sell Property</option>
                      <option value="Plot Investment">Residential Plot Investment</option>
                      <option value="JDA Legal Verification">JDA Legal &amp; Patta Advice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                      Approximate Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-2.5 text-sm focus:border-terracotta focus:outline-none font-medium"
                    >
                      <option value="Under ₹35 Lakh">Under ₹35 Lakh</option>
                      <option value="₹35 - 60 Lakh">₹35 - 60 Lakh</option>
                      <option value="₹60 Lakh - 1 Crore">₹60 Lakh - 1 Crore</option>
                      <option value="Above ₹1 Crore">Above ₹1 Crore (Luxury)</option>
                    </select>
                  </div>
                </div>

                {/* Searchable Locality with 40+ Jaipur Areas */}
                <div className="pt-1">
                  <SearchableLocalitySelect
                    value={formData.locality}
                    onChange={(val) => setFormData({ ...formData, locality: val })}
                    label="Preferred Jaipur Locality"
                    placeholder="Search or select from 40+ Jaipur localities..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2320]/80 mb-1.5">
                    Your Specific Requirements / Questions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Looking for a 3 BHK near Sikar Road with lift and parking..."
                    className="w-full rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] p-3 text-sm focus:border-terracotta focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-search flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-md cursor-pointer disabled:opacity-60"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#20bd5a] transition-colors cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Connect on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Office Info & Map Preview */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1E2320]">Contact Information</h3>

              <div className="mt-4 space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E2320]">Direct Phone</p>
                    <a href={`tel:${siteConfig.phone}`} className="text-terracotta font-medium hover:underline">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C7E] shrink-0 mt-0.5">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E2320]">WhatsApp Chat</p>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#128C7E] font-medium hover:underline"
                    >
                      +{siteConfig.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-800 shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E2320]">Email Address</p>
                    <p className="text-[#1E2320]/75">{siteConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E2320]">Office Address</p>
                    <p className="text-[#1E2320]/75 leading-relaxed">{siteConfig.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1E2320]">Consultation Hours</p>
                    <p className="text-[#1E2320]/75">Monday – Sunday: 9:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Location Card */}
            <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-5 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-[#1E2320]">Office Location Map</span>
                <span className="text-[#1E2320]/50">Jaipur, Rajasthan</span>
              </div>
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 border border-[#1E2320]/10">
                <iframe
                  title="RajHomes Jaipur Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14227.060193189116!2d75.7601991!3d26.960249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db29e57843d1b%3A0x6bcfd30e5cf9d40a!2sMurlipura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
