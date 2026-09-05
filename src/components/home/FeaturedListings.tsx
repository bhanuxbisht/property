"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, MapPin, Maximize2, MessageCircle, Compass } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { PropertyListing } from "@/lib/listings";

interface FeaturedListingsProps {
  initialListings?: PropertyListing[];
}

export function FeaturedListings({ initialListings = [] }: FeaturedListingsProps) {
  if (initialListings.length === 0) {
    return null;
  }

  return (
    <section className="bg-cream px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center md:mb-14"
        >
          <h2 className="mb-3 text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Featured Properties
          </h2>
          <p className="text-charcoal-light mx-auto max-w-lg text-sm md:text-base">
            Handpicked homes across Murlipura, Sikar Road, and nearby Jaipur
            localities
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {initialListings.map((listing, i) => (
            <motion.article
              key={listing.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md h-full justify-between">
                <div>
                  <Link
                    href={`/property/${listing.id}`}
                    className="relative aspect-[4/3] block overflow-hidden bg-black/5"
                  >
                    <Image
                      src={listing.image}
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute left-3 top-3 flex gap-1.5">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-charcoal backdrop-blur-sm">
                        {listing.type}
                      </span>
                      {listing.has360 && (
                        <span className="rounded-full bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white flex items-center gap-1 shadow">
                          <Compass size={11} /> 360°
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-4">
                    <p className="mb-1 text-lg font-bold text-charcoal">
                      {listing.price}
                    </p>
                    <Link
                      href={`/property/${listing.id}`}
                      className="mb-2 text-sm font-semibold text-charcoal hover:text-terracotta transition-colors line-clamp-1"
                    >
                      {listing.title}
                    </Link>
                    <p className="text-charcoal-light mb-3 flex items-center gap-1 text-xs">
                      <MapPin size={12} />
                      {listing.locality}, Jaipur
                    </p>
                    <div className="text-charcoal-light flex gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Bed size={12} />
                        {listing.bhk}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 size={12} />
                        {listing.area}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi RajHomes, I am interested in "${listing.title}" in ${listing.locality} (${listing.price}). Please share photos and details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/12 py-2 text-xs font-semibold text-[#128C7E] transition-all hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle size={13} />
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/buy"
            className="btn-search inline-flex rounded-full px-8 py-3 text-sm font-medium text-white transition-all"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
