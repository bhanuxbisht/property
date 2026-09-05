"use client";

import { useState } from "react";
import { Send, Mail, Phone, CheckCircle2, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchTabs, siteConfig } from "@/lib/site-config";
import { getWhatsAppInquiryUrl, getEmailMailtoUrl, inquiryPlaceholders } from "@/lib/inquiry";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export function PropertySearch() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleSubmitInitial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setInputError(true);
      setTimeout(() => setInputError(false), 2000);
      return;
    }
    setIsModalOpen(true);
  };

  const handleDirectWhatsApp = () => {
    const requirement = query.trim() || (activeTab === "buy" ? "Looking to buy property in Jaipur" : "Want to sell my property in Jaipur");
    const url = getWhatsAppInquiryUrl(activeTab, requirement);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() && !email.trim()) {
      alert("Please provide at least a Phone number or Email so we can reach you.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          requirement: query.trim(),
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setIsSuccess(true);
    } catch {
      // Graceful fallback to mailto if network error
      const mailtoUrl = getEmailMailtoUrl(activeTab, query.trim(), name, phone);
      window.location.href = mailtoUrl;
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      setQuery("");
      setName("");
      setPhone("");
      setEmail("");
      setIsSuccess(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[580px]">
      {/* Tabs: Buy | Sell */}
      <div className="mb-3.5 flex items-center justify-center gap-2 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {searchTabs.map((tab) => {
          const tabKey = tab.id as "buy" | "sell";
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tabKey)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-[13px] sm:px-6 sm:py-2 sm:text-[14px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#181C19] shadow-[0_4px_16px_rgba(0,0,0,0.12)] scale-100"
                  : "text-white/85 hover:text-white hover:bg-white/20"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Inquiry Bar */}
      <form
        onSubmit={handleSubmitInitial}
        className={`search-bar relative flex items-center rounded-full p-1 pl-4 sm:p-2 sm:pl-7 pr-1 sm:pr-2 shadow-2xl transition-all duration-300 ${
          inputError ? "ring-2 ring-red-400/80 ring-offset-2 ring-offset-transparent" : ""
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={inquiryPlaceholders[activeTab]}
          className="min-w-0 flex-1 bg-transparent pr-4 text-[13px] sm:text-[15px] text-[#1E2320] placeholder:text-[#1E2320]/60 placeholder:truncate focus:outline-none"
        />

        {/* 1-Click WhatsApp Shortcut Icon with Proper Spacing & Real Brand Logo */}
        <button
          type="button"
          onClick={handleDirectWhatsApp}
          title="Send requirement directly on WhatsApp"
          className="mx-2 sm:mx-2.5 flex h-9 w-9 sm:h-9.5 sm:w-9.5 shrink-0 cursor-pointer items-center justify-center rounded-full hover:scale-110 transition-transform active:scale-95 shadow-sm"
          aria-label="Direct WhatsApp message"
        >
          <WhatsAppIcon size={24} />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          className="btn-search flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium sm:gap-2 sm:px-6 sm:py-2.5 sm:text-[14px] active:scale-95"
        >
          <span>Send</span>
          <Send size={14} strokeWidth={2.2} />
        </button>
      </form>

      {/* Sub-bar hint: explains what happens */}
      <div className="mt-2 flex items-center justify-center gap-3 text-[11px] sm:text-[12px] text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
        <span className="inline-flex items-center gap-1">
          <Sparkles size={12} className="text-[#FFB370]" />
          Instant response on WhatsApp or Phone
        </span>
        <span>•</span>
        <span>RERA Registered</span>
      </div>

      {/* Glassmorphic Lead Dispatch Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-[480px] overflow-hidden rounded-[28px] border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={resetModal}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2320]/5 text-[#1E2320]/70 transition-colors hover:bg-[#1E2320]/10 hover:text-[#1E2320]"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {isSuccess ? (
                /* Success Confirmation View */
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E2320] sm:text-2xl">
                    Inquiry Received!
                  </h3>
                  <p className="mt-2 text-sm text-[#1E2320]/75">
                    Thank you! Our Jaipur property specialist will call or WhatsApp you within 30 minutes with available options.
                  </p>
                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      <WhatsAppIcon size={18} />
                      Open in WhatsApp Now
                    </button>
                    <button
                      type="button"
                      onClick={resetModal}
                      className="flex-1 rounded-full border border-[#1E2320]/15 py-3 text-sm font-medium text-[#1E2320] transition-colors hover:bg-[#1E2320]/5"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Lead Input View */
                <div>
                  <div className="mb-4 pr-6">
                    <span className="inline-block rounded-full bg-terracotta/10 px-3 py-1 text-xs font-semibold text-terracotta uppercase tracking-wider">
                      {activeTab === "buy" ? "Buyer Inquiry" : "Seller Valuation"}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-[#1E2320] sm:text-xl">
                      Send your requirement to {siteConfig.name}
                    </h3>
                    <div className="mt-2.5">
                      <label className="block text-xs font-medium text-[#1E2320]/75 mb-1 flex items-center justify-between">
                        <span>Your Requirement</span>
                        <span className="text-[11px] text-terracotta font-medium">Edit anytime</span>
                      </label>
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={2}
                        placeholder="Describe what you want to buy or sell..."
                        className="w-full resize-none rounded-xl border border-[#1E2320]/15 bg-[#FAF6F1] px-3.5 py-2 text-xs sm:text-sm text-[#1E2320] focus:border-terracotta focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Primary 1-Click WhatsApp Option */}
                  <div className="mb-5">
                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-[#20BE5B] active:scale-[0.99]"
                    >
                      <WhatsAppIcon size={20} />
                      Send Instantly via WhatsApp
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-5 flex items-center justify-center">
                    <div className="w-full border-t border-[#1E2320]/10" />
                    <span className="absolute bg-white px-3 text-xs text-[#1E2320]/50 uppercase tracking-wider">
                      Or request callback / email
                    </span>
                  </div>

                  {/* Direct Contact Form */}
                  <form onSubmit={handleSendInquiry} className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[#1E2320]/75 mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-xl border border-[#1E2320]/15 bg-white px-3.5 py-2.5 text-sm text-[#1E2320] focus:border-terracotta focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1E2320]/75 mb-1">
                        Phone / WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-3 text-[#1E2320]/40" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-[#1E2320]/15 bg-white pl-10 pr-3.5 py-2.5 text-sm text-[#1E2320] focus:border-terracotta focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1E2320]/75 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-3 text-[#1E2320]/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full rounded-xl border border-[#1E2320]/15 bg-white pl-10 pr-3.5 py-2.5 text-sm text-[#1E2320] focus:border-terracotta focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-search mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-medium text-white shadow-lg disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Sending inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Requirement</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>

                    <p className="pt-1 text-center text-[11px] text-[#1E2320]/50">
                      We respect your privacy. No spam. You will only be contacted by {siteConfig.name}.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
