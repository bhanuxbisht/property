import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Share2,
  Tag,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-content";
import { Footer, MobileCTA } from "@/components/layout/Footer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${siteConfig.name} Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: `${post.title} — Property Boutique Jaipur`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
      url: `https://propertyboutique.in/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://propertyboutique.in/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Related articles (exclude current)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: "https://propertyboutique.in/heroimp.png",
    datePublished: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.credentials,
      url: "https://propertyboutique.in/about",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: "https://propertyboutique.in/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://propertyboutique.in/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://propertyboutique.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://propertyboutique.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://propertyboutique.in/blog/${post.slug}`,
      },
    ],
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
              href="/blog"
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              <ArrowLeft size={13} />
              <span>All Articles</span>
            </Link>
            <Link
              href="/buy"
              className="rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              Listings
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
              Inquire
            </Link>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <header className="px-4 pt-10 pb-12 sm:px-6 md:pt-14 md:pb-16 border-b border-[#1E2320]/10 bg-gradient-to-b from-[#FAF6F1] to-[#FDFBF7]">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#1E2320]/60 mb-6">
            <Link href="/" className="hover:text-terracotta">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-terracotta">Blog</Link>
            <span>/</span>
            <span className="font-semibold text-[#1E2320] truncate max-w-[240px] sm:max-w-md">
              {post.title}
            </span>
          </nav>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta/10 px-3.5 py-1 text-xs font-bold text-terracotta">
              <Tag size={12} />
              <span>{post.category}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#1E2320]/15 px-3.5 py-1 text-xs font-medium text-[#1E2320]/70">
              <Clock size={12} />
              <span>{post.readTime}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#1E2320]/15 px-3.5 py-1 text-xs font-medium text-[#1E2320]/70">
              <Calendar size={12} />
              <span>{post.publishDate}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl tracking-tight text-[#1E2320] leading-tight">
            {post.title}
          </h1>

          {/* Author Byline */}
          <div className="mt-6 flex items-center gap-3.5 pt-4 border-t border-[#1E2320]/10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-white font-bold text-sm shadow-sm">
              LS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#1E2320]">{post.author.name}</p>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  <ShieldCheck size={11} />
                  <span>RERA: {siteConfig.reraNumber}</span>
                </span>
              </div>
              <p className="text-xs text-[#1E2320]/65">{post.author.role} · 15+ Years Jaipur Experience</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area: Article + Sticky Consultant Sidebar */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Article Body */}
          <article className="space-y-6 text-[#1E2320]">
            {/* Excerpt Lead Paragraph */}
            <p className="text-base sm:text-lg font-medium text-[#1E2320]/85 leading-relaxed bg-[#FAF6F1] p-5 sm:p-6 rounded-2xl border-l-4 border-terracotta">
              {post.excerpt}
            </p>

            {/* Injected HTML Article Content */}
            <div
              className="prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed space-y-6 [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-extrabold [&>h2]:text-[#1E2320] [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-[#1E2320]/10 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-[#1E2320] [&>p]:text-[#1E2320]/80 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>.callout-box]:p-5 [&>.callout-box]:rounded-2xl [&>.callout-box]:bg-[#FFF4EB] [&>.callout-box]:border [&>.callout-box]:border-terracotta/30 [&>.data-table]:w-full [&>.data-table]:text-xs [&>.data-table]:sm:text-sm [&>.data-table]:border-collapse [&>.data-table]:my-4 [&_.data-table_th]:bg-[#1E2320] [&_.data-table_th]:text-white [&_.data-table_th]:p-2.5 [&_.data-table_th]:text-left [&_.data-table_td]:p-2.5 [&_.data-table_td]:border-b [&_.data-table_td]:border-[#1E2320]/10"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Related Localities Tags */}
            {post.relatedLocalities && post.relatedLocalities.length > 0 && (
              <div className="pt-8 border-t border-[#1E2320]/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E2320]/60 mb-3">
                  Related Jaipur Areas:
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {post.relatedLocalities.map((loc) => (
                    <Link
                      key={loc}
                      href={`/properties/buy-in-${loc.toLowerCase().replace(/\s+/g, "-")}`}
                      className="inline-flex items-center gap-1 rounded-full border border-[#1E2320]/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1E2320] transition-all hover:border-terracotta hover:text-terracotta"
                    >
                      <MapPin size={12} />
                      <span>{loc} Properties</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Article Specific FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="pt-10 border-t border-[#1E2320]/10">
                <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
                  <HelpCircle size={14} />
                  <span>Key Takeaways &amp; FAQs</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E2320] mb-6">
                  Frequently Asked Questions on this Topic
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-[#1E2320]/10 bg-white p-5 shadow-sm"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-[#1E2320]">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/75 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky Consultant Advisory Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-20 rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta mb-4">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-base font-bold text-[#1E2320]">
                Speak with Mr. Lalit Singh Bisht
              </h3>
              <p className="mt-2 text-xs text-[#1E2320]/70 leading-relaxed">
                Have specific questions about this article or evaluating a property in Murlipura, Sikar Road, or Vidhyadhar Nagar?
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hello Mr. Bisht, I read your article "${post.title}" on Property Boutique and would like to ask a question.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-search w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-semibold text-white shadow-md cursor-pointer"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#1E2320]/15 bg-white py-3 text-xs sm:text-sm font-semibold text-[#1E2320] hover:bg-[#1E2320]/5 shadow-sm"
                >
                  <Phone size={15} />
                  <span>Call {siteConfig.phone}</span>
                </a>
              </div>

              {/* Verified Trust Metrics */}
              <div className="mt-6 pt-5 border-t border-[#1E2320]/10 text-xs space-y-2.5 text-[#1E2320]/75">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>RERA License: {siteConfig.reraNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>15+ Years On-Ground Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>999+ Verified Property Closures</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Next / Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#1E2320]/10">
            <h2 className="text-2xl font-bold text-[#1E2320] mb-8 text-center">
              More Jaipur Property Guides
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <div
                  key={related.slug}
                  className="flex flex-col justify-between rounded-2xl border border-[#1E2320]/10 bg-white p-6 shadow-sm transition-all hover:border-terracotta/40 hover:-translate-y-1"
                >
                  <div>
                    <span className="text-[11px] font-bold text-terracotta uppercase">
                      {related.category}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-[#1E2320] leading-snug">
                      <Link
                        href={`/blog/${related.slug}`}
                        className="hover:text-terracotta transition-colors"
                      >
                        {related.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-terracotta hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
