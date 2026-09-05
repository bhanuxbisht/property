"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Tag,
  Phone,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-content";
import { Footer, MobileCTA } from "@/components/layout/Footer";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Articles" },
    { id: "Legal & Due Diligence", label: "Legal & JDA" },
    { id: "Market Trends & Comparisons", label: "Market Trends" },
    { id: "Buyer Guides", label: "Buyer Guides" },
    { id: "Home Loans & Finance", label: "Loans & Finance" },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.keywords.some((k) => k.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* Floating Glassmorphic Pill Header */}
      <header className="sticky top-0 z-40 w-full px-4 pt-3 pb-2 sm:px-8 sm:pt-4 pointer-events-none">
        <div className="glass-nav pointer-events-auto relative mx-auto flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 sm:px-7 sm:py-3">
          <Link
            href="/"
            className="text-[16px] sm:text-[17px] font-bold tracking-tight text-[#1E2320] transition-opacity hover:opacity-85"
          >
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/buy"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Buy
            </Link>
            <Link
              href="/sell"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Sell
            </Link>
            <Link
              href="/faq"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="btn-peach rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-[13.5px] font-semibold text-[#2D2824] shadow-sm transition-all hover:scale-[1.02]"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="px-4 pt-12 pb-10 sm:px-6 md:pt-16 md:pb-12 border-b border-[#1E2320]/10 bg-gradient-to-b from-[#FAF6F1] to-[#FDFBF7]">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-4 py-1.5 text-xs font-bold text-terracotta mb-4">
            <BookOpen size={14} />
            <span>Jaipur Property Insights &amp; Market Intelligence</span>
          </div>

          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tight text-[#1E2320] leading-tight">
            Jaipur Real Estate <span className="text-terracotta">Blog &amp; Guides</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#1E2320]/75 max-w-2xl mx-auto leading-relaxed">
            Essential on-ground advice from RERA-registered consultant Mr. Lalit Singh Bisht. Master JDA Patta verification, property rates, registry procedures, and loan approvals across Jaipur.
          </p>

          {/* Search Box */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E2320]/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles (e.g. JDA Patta, Murlipura rates, home loan)..."
              className="w-full rounded-full border border-[#1E2320]/15 bg-white py-3.5 pl-12 pr-5 text-sm text-[#1E2320] shadow-sm placeholder:text-[#1E2320]/40 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#1E2320] text-white shadow-sm"
                    : "border border-[#1E2320]/15 bg-white text-[#1E2320]/70 hover:bg-[#1E2320]/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-[#1E2320]/10 bg-white p-10 text-center shadow-sm">
            <BookOpen size={40} className="mx-auto text-[#1E2320]/30 mb-3" />
            <h2 className="text-base font-bold text-[#1E2320]">No Articles Found</h2>
            <p className="mt-1 text-xs sm:text-sm text-[#1E2320]/60">
              Try adjusting your search query or view all articles.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-full border border-[#1E2320]/20 bg-white px-5 py-2 text-xs font-semibold text-[#1E2320] hover:bg-[#1E2320]/5"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#1E2320]/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-md"
              >
                <div className="p-6 sm:p-7">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between gap-2 text-xs mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 px-3 py-1 font-bold text-terracotta">
                      <Tag size={12} />
                      <span>{post.category}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#1E2320]/50 font-medium">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-[#1E2320] leading-snug line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-terracotta transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 text-xs sm:text-sm text-[#1E2320]/70 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer with Author & Link */}
                <div className="border-t border-[#1E2320]/5 bg-[#FAF6F1]/50 px-6 py-4 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-semibold text-[#1E2320]">{post.author.name}</p>
                    <p className="text-[11px] text-[#1E2320]/50">{post.publishDate}</p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-terracotta hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Advisory Callout */}
        <section className="mt-16 rounded-3xl border border-terracotta/20 bg-gradient-to-r from-[#FAF6F1] to-[#FFF6EE] p-8 text-center sm:p-10 shadow-sm">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 mb-3">
              <ShieldCheck size={13} />
              <span>Official RERA Consultation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E2320]">
              Need One-on-One Property Advice in Jaipur?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/70 leading-relaxed">
              Whether you are evaluating a plot on Sikar Road, verifying a JDA Patta in Murlipura, or seeking a 3 BHK flat in Vidhyadhar Nagar, talk directly with Mr. Lalit Singh Bisht.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-search inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-md"
              >
                <Phone size={15} />
                <span>Call {siteConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello Property Boutique, I read your blog and would like to consult on Jaipur real estate.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#1E2320]/15 bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-[#1E2320] shadow-sm hover:bg-[#1E2320]/5"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
