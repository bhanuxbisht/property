"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { PropertySearch } from "@/components/home/PropertySearch";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col justify-between overflow-hidden"
      style={{ height: "100svh", minHeight: "560px" }}
    >
      {/* ── Hero Image ── raw <img>, PNG = lossless, zero compression blur */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/heroimp.png"
          alt="Luxury Indian villa Jaipur golden hour sunset — Property Boutique property"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Subtle bottom gradient to ensure text readability */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)" }}
      />

      {/* Top Section: Glassmorphic Navbar */}
      <div className="relative z-20 w-full px-4 pt-4 sm:px-8 sm:pt-6 md:px-10 md:pt-8">
        <Navbar />
      </div>

      {/* Center Section: Headline + Search Bar (Responsive for both Mobile & Desktop) */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-6 sm:py-8">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-headline mb-4 text-center text-3xl font-normal leading-[1.08] sm:mb-6 sm:text-5xl md:text-6xl lg:text-[5.25rem]"
        >
          Lives Peacefully
        </motion.h1>

        {/* Search tabs + Glassmorphic search bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="w-full max-w-[580px]"
        >
          <PropertySearch />
        </motion.div>
      </div>

      {/* Bottom breathing space: keeps villa pool visible & leaves room for mobile sticky bar */}
      <div className="relative z-0 h-16 sm:h-24 md:h-36 pointer-events-none" aria-hidden="true" />
    </div>
  );
}

export function HeroWrapper() {
  return (
    <section>
      <HeroSection />
      <p className="sr-only">{siteConfig.tagline}</p>
    </section>
  );
}
