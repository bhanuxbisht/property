"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

export function TrustBanner() {
  return (
    <section className="bg-cream px-4 py-12 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-5xl rounded-3xl border border-[#E7D6C4] bg-gradient-to-b from-[#FAF5EE] via-[#F6EDE2] to-[#F1E5D7] p-8 text-center shadow-sm md:p-14"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-terracotta/25 bg-terracotta/10 px-4 py-1.5 text-xs font-semibold text-terracotta">
          <ShieldCheck size={15} className="text-terracotta" />
          <span>RERA Registered: {siteConfig.reraNumber}</span>
        </div>
        <h2 className="mb-4 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
          Jaipur&apos;s Trusted Property Consultant
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-charcoal-light md:text-base">
          {siteConfig.experience} years of on-ground real estate mastery · {siteConfig.propertiesSold}{" "}
          properties successfully transacted · JDA verified titles only
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-search inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all"
          >
            <Phone size={18} />
            <span>Direct Call Now</span>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello ${siteConfig.name}, I would like to consult regarding buying or selling property in Jaipur.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#20bd5a] hover:shadow-lg hover:-translate-y-0.5"
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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-2 border-t border-[#E3D7CB] bg-[#FAF6F1]/95 p-3 backdrop-blur-lg md:hidden">
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
    <footer className="border-t border-[#E5D9CC] bg-[#F3ECE4] px-4 pb-24 pt-14 text-charcoal md:px-8 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight text-charcoal hover:text-terracotta transition-colors">
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal-light">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-charcoal-light">
              <ShieldCheck size={14} className="text-terracotta" />
              <span>RERA No: {siteConfig.reraNumber}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-charcoal">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-light">
              <li>
                <Link href="/buy" className="hover:text-terracotta transition-colors">
                  Buy Property in Jaipur
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-terracotta transition-colors">
                  Sell Your Property
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-terracotta transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-terracotta transition-colors">
                  Jaipur Real Estate Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terracotta transition-colors">
                  About Our Consultant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta transition-colors">
                  Contact &amp; Office Visit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-charcoal">
              Jaipur Office
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-light">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-terracotta shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="font-medium text-charcoal hover:text-terracotta transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-terracotta shrink-0" />
                <span className="font-medium text-charcoal break-all">{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-charcoal-light">
                <MapPin size={14} className="text-terracotta shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E5D9CC] pt-6 text-center text-xs text-charcoal-light/70">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Specialized in Jaipur Properties.
        </div>
      </div>
    </footer>
  );
}
