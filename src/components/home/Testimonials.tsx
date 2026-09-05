"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const testimonials = [
  {
    name: "Rajesh Sharma",
    area: "Murlipura",
    text: "Found our dream 3 BHK within budget. Honest advice, no pressure — exactly what we needed as first-time buyers.",
    rating: 5,
  },
  {
    name: "Priya Meena",
    area: "Sikar Road",
    text: "Sold our plot in just 3 weeks. They know every lane and every buyer in the area. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    area: "Jhotwara",
    text: "Rented a flat for my family within days. Professional, responsive on WhatsApp, and truly local expertise.",
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
              {siteConfig.googleRating} on Google
            </span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Trusted by Jaipur Families
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-2xl bg-white p-6 shadow-sm"
            >
              <Quote
                size={24}
                className="text-peach absolute right-6 top-6 opacity-60"
              />
              <p className="text-charcoal-light mb-6 text-sm leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer>
                <p className="text-sm font-medium text-charcoal">{t.name}</p>
                <p className="text-charcoal-light text-xs">{t.area}, Jaipur</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
