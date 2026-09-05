"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function TrustBanner() {
  return (
    <section className="bg-charcoal px-4 py-16 md:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="mb-4 text-3xl font-light tracking-tight text-cream md:text-4xl">
          Your Local Property Expert
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
          {siteConfig.experience} years of experience · {siteConfig.propertiesSold}{" "}
          properties sold &amp; rented · RERA {siteConfig.reraNumber}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-search inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white transition-all"
          >
            <Phone size={18} />
            Call Now
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-all hover:bg-cream/20"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-cream/20 bg-charcoal/95 p-3 backdrop-blur-lg md:hidden">
      <a
        href={`tel:${siteConfig.phone}`}
        className="btn-search flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-white"
      >
        <Phone size={18} />
        Call
      </a>
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-medium text-white"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal px-4 pb-24 pt-12 md:px-8 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-semibold text-cream">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-cream">Explore</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>
                <Link href="/buy" className="hover:text-cream">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-cream">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-cream">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream">
                  About Agent
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-cream">Contact</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-cream">
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.email}</li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
