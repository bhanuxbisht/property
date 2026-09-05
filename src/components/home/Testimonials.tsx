"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

// Official Google "G" SVG Icon
function GoogleGIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0" aria-label="Google">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

// Upper Layer Reviews (Layer 1 — Slides Left)
const upperLayerReviews = [
  {
    id: "u1",
    name: "Praveen Rathore",
    initial: "P",
    avatarBg: "bg-[#1A73E8]",
    area: "Murlipura Scheme",
    service: "Plot Sale",
    text: "Good real-estate person. Mr. Singh sold my plot without any hurdle and provided me the best deal in Murlipura. Highly satisfied with the prompt response.",
  },
  {
    id: "u2",
    name: "Sunil Choudhary",
    initial: "S",
    avatarBg: "bg-[#0F9D58]",
    area: "Main Sikar Road",
    service: "Flat Purchase",
    text: "I purchased a flat through Mr. Singh and the deal was very fair. I would like to recommend Mr. Singh's name to all my nearest and dearest for a great deal.",
  },
  {
    id: "u3",
    name: "Ritu Khandelwal",
    initial: "R",
    avatarBg: "bg-[#EA4335]",
    area: "Bajrang Vihar",
    service: "Residential Plot",
    text: "Nice work done by Mr. Singh! I got a great deal on my property. Thank you Mr. Singh for honest guidance and fast title verification.",
  },
  {
    id: "u4",
    name: "Dr. Ashok Meena",
    initial: "A",
    avatarBg: "bg-[#8E24AA]",
    area: "Vidhyadhar Nagar",
    service: "Luxury Villa",
    text: "Extremely trustworthy property consultant. Mr. Singh verified all JDA documents thoroughly before finalizing our villa deal. Transparent and ethical from start to finish.",
  },
];

// Lower Layer Reviews (Layer 2 — Slides Right)
const lowerLayerReviews = [
  {
    id: "l1",
    name: "Mahesh Sharma",
    initial: "M",
    avatarBg: "bg-[#F4511E]",
    area: "Sikar Road",
    service: "Commercial Space",
    text: "Best property consultant in Jaipur. Fair valuation of our property and found genuine buyers in just 3 weeks with complete legal verification.",
  },
  {
    id: "l2",
    name: "Amit & Sunita Kumar",
    initial: "A",
    avatarBg: "bg-[#00897B]",
    area: "Jhotwara",
    service: "Independent House",
    text: "Clear JDA titles, 100% legal verification, and our bank home loan was approved seamlessly through his guidance. Deal with Mr. Singh with complete peace of mind.",
  },
  {
    id: "l3",
    name: "Rajeshver Shekhawat",
    initial: "R",
    avatarBg: "bg-[#3949AB]",
    area: "Murlipura",
    service: "Residential Plot",
    text: "Mr. Singh has genuine on-ground market intelligence in Murlipura. No false commitments, clear agreement terms, and very cooperative throughout the registry.",
  },
  {
    id: "l4",
    name: "Kavita Joshi",
    initial: "K",
    avatarBg: "bg-[#D81B60]",
    area: "Vidhyadhar Nagar",
    service: "Luxury Flat",
    text: "Found our home within our budget and without any stress. Mr. Singh arranged multiple site visits patiently and handled all paperwork personally.",
  },
];

function ReviewCard({ review }: { review: typeof upperLayerReviews[0] }) {
  return (
    <div className="w-[340px] sm:w-[410px] shrink-0 mx-2.5 sm:mx-3.5">
      <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E7D6C4] bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-terracotta/40 hover:shadow-md">
        <div>
          {/* Header: User Avatar, Name & Google Badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white shadow-xs ${review.avatarBg}`}
              >
                {review.initial}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1E2320] leading-snug">
                  {review.name}
                </h3>
                <p className="text-xs text-charcoal-light">
                  {review.area}, Jaipur
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[#FAF6F1] px-2 py-0.5 border border-[#1E2320]/5">
              <GoogleGIcon size={12} />
              <span className="text-[10px] font-medium text-[#1E2320]/70">Google</span>
            </div>
          </div>

          {/* 5 Filled Gold Stars Only (No Review Count Number) */}
          <div className="mb-2.5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-[#FBBC04] text-[#FBBC04]"
              />
            ))}
            <span className="ml-1 text-[11.5px] font-semibold text-[#1E2320]">
              5.0
            </span>
          </div>

          {/* Review Text */}
          <p className="text-xs sm:text-[13px] text-[#1E2320]/85 leading-relaxed">
            &ldquo;{review.text}&rdquo;
          </p>
        </div>

        {/* Footer: Service Tag & Verified Status */}
        <div className="mt-5 flex items-center justify-between border-t border-[#1E2320]/8 pt-3">
          <span className="rounded-full bg-cream-section border border-[#1E2320]/8 px-2.5 py-0.5 text-[11px] font-medium text-charcoal-light">
            {review.service}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <CheckCircle2 size={12} />
            <span>Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-cream px-4 py-16 md:px-8 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Header with 5-Star Only Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-col items-center text-center md:mb-14"
        >
          {/* 5-Star Only Badge without numbers */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50/80 px-4 py-1.5 shadow-xs backdrop-blur-sm">
            <GoogleGIcon size={16} />
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-[#FBBC04] text-[#FBBC04]"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-charcoal">
              5.0 on Google Reviews
            </span>
          </div>

          <h2 className="text-3xl font-light tracking-tight text-charcoal md:text-4xl">
            Trusted by Jaipur Families
          </h2>
          <p className="text-charcoal-light mt-2 text-sm md:text-base">
            Over {siteConfig.propertiesSold} satisfied buyers and property sellers across Jaipur
          </p>
        </motion.div>
      </div>

      {/* Double Layer Sliding Window Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Soft Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-cream via-cream/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-cream via-cream/80 to-transparent" />

        {/* Upper Layer: Slides Smoothly Towards Left */}
        <div className="mb-5 flex overflow-hidden">
          <div className="animate-marquee-left pause-on-hover py-1">
            {upperLayerReviews.map((r) => (
              <ReviewCard key={`upper-1-${r.id}`} review={r} />
            ))}
            {upperLayerReviews.map((r) => (
              <ReviewCard key={`upper-2-${r.id}`} review={r} />
            ))}
          </div>
        </div>

        {/* Lower Layer: Slides Smoothly Towards Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right pause-on-hover py-1">
            {lowerLayerReviews.map((r) => (
              <ReviewCard key={`lower-1-${r.id}`} review={r} />
            ))}
            {lowerLayerReviews.map((r) => (
              <ReviewCard key={`lower-2-${r.id}`} review={r} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Link to Verified Reviews */}
      <div className="mx-auto max-w-6xl mt-10 text-center">
        <a
          href="https://maps.google.com/?q=Property+Boutique+Murlipura+Jaipur"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal hover:text-terracotta transition-colors"
        >
          <GoogleGIcon size={14} />
          <span>View Verified Google Reviews for Property Boutique</span>
          <ExternalLink size={12} className="shrink-0" />
        </a>
      </div>
    </section>
  );
}
