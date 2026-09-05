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
            Areas We Serve
          </h2>
          <p className="text-charcoal-light mx-auto max-w-lg text-sm md:text-base">
            Deep local expertise across Jaipur&apos;s most sought-after
            neighbourhoods
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.areas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/flats-for-sale-in-${area.slug}`}
                className="group flex items-center justify-between rounded-2xl bg-white/70 p-6 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-medium text-charcoal">
                    {area.name}
                  </h3>
                  <p className="text-charcoal-light mt-1 text-xs">
                    Flats, plots &amp; villas
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-terracotta transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
