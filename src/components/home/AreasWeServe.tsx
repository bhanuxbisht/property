"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function AreasWeServe() {
  return (
    <section className="bg-cream-section px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="mb-3 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Prime Jaipur Localities We Specialize In
          </h2>
          <p className="text-charcoal-light mx-auto max-w-lg text-sm md:text-base">
            Deep local pricing intelligence, JDA approvals, and verified property inventories
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.areas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/buy?locality=${encodeURIComponent(area.name)}`}
                className="group flex items-center justify-between rounded-2xl bg-white/80 p-5 backdrop-blur-sm border border-[#1E2320]/5 transition-all hover:bg-white hover:shadow-md"
              >
                <div>
                  <h3 className="text-base font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-charcoal-light mt-0.5 text-xs">
                    Flats, Plots &amp; Luxury Villas
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-terracotta transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/buy"
            className="text-xs font-semibold text-terracotta hover:underline inline-flex items-center gap-1"
          >
            <span>Explore all 40+ Jaipur localities</span> →
          </Link>
        </div>
      </div>
    </section>
  );
}
