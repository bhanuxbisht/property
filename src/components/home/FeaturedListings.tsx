"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, MapPin, Maximize2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const listings = [
  {
    id: 1,
    title: "3 BHK Flat in Murlipura",
    locality: "Murlipura, Jaipur",
    price: "₹45 Lac",
    bhk: "3 BHK",
    area: "1,200 sq.ft",
    type: "sale" as const,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: 2,
    title: "2 BHK Apartment on Sikar Road",
    locality: "Sikar Road, Jaipur",
    price: "₹18,000/mo",
    bhk: "2 BHK",
    area: "950 sq.ft",
    type: "rent" as const,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: 3,
    title: "Residential Plot in Jhotwara",
    locality: "Jhotwara, Jaipur",
    price: "₹32 Lac",
    bhk: "Plot",
    area: "1,500 sq.ft",
    type: "sale" as const,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: 4,
    title: "4 BHK Villa in Vidhyadhar Nagar",
    locality: "Vidhyadhar Nagar, Jaipur",
    price: "₹1.2 Cr",
    bhk: "4 BHK",
    area: "2,400 sq.ft",
    type: "sale" as const,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
];

export function FeaturedListings() {
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
          {listings.map((listing, i) => (
            <motion.article
              key={listing.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                <Link
                  href={`/property/${listing.id}`}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-charcoal backdrop-blur-sm">
                    For {listing.type}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="mb-1 text-lg font-semibold text-charcoal">
                    {listing.price}
                  </p>
                  <Link
                    href={`/property/${listing.id}`}
                    className="mb-2 text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1"
                  >
                    {listing.title}
                  </Link>
                  <p className="text-charcoal-light mb-3 flex items-center gap-1 text-xs">
                    <MapPin size={12} />
                    {listing.locality}
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

                  <div className="mt-auto pt-3.5">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi RajHomes, I am interested in "${listing.title}" in ${listing.locality} (${listing.price}). Please share photos and details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/12 py-2 text-xs font-medium text-[#128C7E] transition-all hover:bg-[#25D366] hover:text-white"
                    >
                      <MessageCircle size={13} />
                      Inquire on WhatsApp
                    </a>
                  </div>
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
