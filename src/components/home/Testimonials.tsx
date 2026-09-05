"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const testimonials = [
  {
    name: "Rajesh Sharma",
    area: "Murlipura",
    text: "Found our dream 3 BHK luxury flat within our exact budget. Honest advice, zero pressure, and complete legal verification — exactly what we needed as first-time buyers.",
    rating: 5,
  },
  {
    name: "Priya Meena",
    area: "Sikar Road",
    text: "Sold our residential plot on main Sikar Road in just 3 weeks at a fair market price. They know every buyer and colony in the area. Truly reliable!",
    rating: 5,
  },
  {
    name: "Amit & Sunita Kumar",
    area: "Vidhyadhar Nagar",
    text: "Purchased an independent luxury villa through Property Boutique. Clear JDA title, transparent dealings, and our SBI home loan was approved in just 5 days.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-col items-center text-center md:mb-14"
        >
          <div className="mb-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-terracotta text-terracotta"
              />
            ))}
            <span className="ml-2 text-sm font-medium text-charcoal">
              {siteConfig.googleRating} on Google Reviews
            </span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Trusted by Jaipur Families
          </h2>
          <p className="text-charcoal-light mt-2 text-sm md:text-base">
            Over 250+ satisfied buyers and property sellers across Jaipur
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-[#1E2320]/5"
            >
              <div>
                <Quote size={24} className="text-peach mb-3" />
                <p className="text-charcoal text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
              <footer className="mt-6 border-t border-charcoal/10 pt-4">
                <p className="font-medium text-charcoal text-sm">{t.name}</p>
                <p className="text-charcoal-light text-xs">{t.area}, Jaipur</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
