"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-nav relative mx-auto flex w-full max-w-[680px] items-center justify-between rounded-full px-5 py-2.5 sm:px-8 sm:py-3 md:grid md:grid-cols-[1fr_auto_1fr]"
    >
      {/* Logo — left */}
      <Link
        href="/"
        className="text-[15px] sm:text-[17px] font-semibold tracking-[-0.02em] text-[#1E2320]"
      >
        {siteConfig.name}
      </Link>

      {/* Nav links — center: submerged bordered group (desktop) */}
      <div className="hidden items-center justify-center md:flex">
        <div className="nav-group-border flex items-center gap-1 rounded-full border border-[#1E2320]/12 bg-[#1E2320]/[0.04] px-1 py-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-[14px] font-normal text-[#1E2320]/80 transition-all duration-200 hover:bg-white/50 hover:text-[#1E2320]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right side: Contact (desktop) & 3 dots menu button at far corner (mobile) */}
      <div className="flex items-center justify-end">
        <Link
          href="/contact"
          className="btn-peach hidden rounded-full px-5 py-2 text-[14px] font-normal tracking-normal text-[#2D2824] md:inline-flex"
        >
          Contact
        </Link>

        {/* 3-dots / menu toggle at the mobile corner */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#1E2320] transition-all hover:bg-white/40 active:scale-95 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={20} strokeWidth={2} />
          ) : (
            <div className="flex items-center justify-center gap-[3px] p-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E2320]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E2320]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E2320]" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-charcoal hover:bg-cream-section"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-peach mt-1 block rounded-full py-2.5 text-center text-sm font-medium"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
