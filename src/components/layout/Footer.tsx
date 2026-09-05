"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

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
        <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 text-xs text-cream/80 mb-4">
          <ShieldCheck size={14} className="text-terracotta" />
          <span>RERA Registered: {siteConfig.reraNumber}</span>
        </div>
        <h2 className="mb-4 text-3xl font-light tracking-tight text-cream md:text-4xl">
          Jaipur&apos;s Trusted Property Consultant
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
          {siteConfig.experience} years of on-ground real estate mastery · {siteConfig.propertiesSold}{" "}
          properties successfully transacted · JDA verified titles only
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-search inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white transition-all shadow-lg"
          >
            <Phone size={18} />
            Direct Call Now
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}, I would like to consult regarding buying or selling property in Jaipur.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-8 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-all hover:bg-cream/20"
          >
            <WhatsAppIcon size={19} />
            <span>WhatsApp Consultation</span>
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
        className="btn-search flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow"
      >
        <Phone size={18} />
        <span>Call Consultant</span>
      </a>
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}, I would like to consult regarding buying or selling property in Jaipur.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white shadow"
      >
        <WhatsAppIcon size={19} />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal px-4 pb-24 pt-12 md:px-8 md:pb-12 border-t border-cream/10 text-cream">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-cream">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-cream/50">
              <ShieldCheck size={14} className="text-terracotta" />
              <span>RERA No: {siteConfig.reraNumber}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-cream uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href="/buy" className="hover:text-cream transition-colors">
                  Buy Property in Jaipur
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-cream transition-colors">
                  Sell Your Property
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream transition-colors">
                  About Our Consultant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cream transition-colors">
                  Contact &amp; Office Visit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-cream uppercase tracking-wider">
              Jaipur Office
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-terracotta shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-cream">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-terracotta shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-cream/60">
                <MapPin size={14} className="text-terracotta shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Specialized in Jaipur Properties.
        </div>
      </div>
    </footer>
  );
}
