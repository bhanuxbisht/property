"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-nav relative mx-auto flex w-full max-w-[680px] items-center justify-between rounded-full px-5 py-2.5 sm:px-7 sm:py-3 md:grid md:grid-cols-[1fr_auto_1fr]"
    >
      {/* Logo — left */}
      <Link
        href="/"
        className="flex items-center gap-2 text-[15px] sm:text-[17px] font-bold tracking-[-0.02em] text-[#1E2320] transition-opacity hover:opacity-85"
      >
        <span>{siteConfig.name}</span>
      </Link>

      {/* Nav links — center: submerged bordered group (desktop) */}
      <div className="hidden items-center justify-center md:flex">
        <div className="nav-group-border flex items-center gap-1 rounded-full border border-[#1E2320]/12 bg-[#1E2320]/[0.04] p-1 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-[13.5px] transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#1E2320] shadow-sm font-semibold"
                    : "font-medium text-[#1E2320]/75 hover:bg-white/60 hover:text-[#1E2320]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right side: Contact (desktop) & 3 dots menu button at far corner (mobile) */}
      <div className="flex items-center justify-end">
        <Link
          href="/contact"
          className="btn-peach hidden rounded-full px-5 py-2 text-[13.5px] font-semibold tracking-normal text-[#2D2824] shadow-sm transition-all hover:scale-[1.02] md:inline-flex"
        >
          Contact
        </Link>

        {/* 3-dots / menu toggle at the mobile corner */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#1E2320] transition-all hover:bg-white/50 active:scale-95 md:hidden"
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

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="glass-nav absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-3xl p-3 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-2xl px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-white text-[#1E2320] font-semibold shadow-sm"
                        : "font-medium text-charcoal hover:bg-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-peach mt-1.5 block rounded-full py-2.5 text-center text-sm font-semibold shadow-sm"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
