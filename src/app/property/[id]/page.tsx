import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Maximize2,
  MapPin,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Compass,
} from "lucide-react";
import { getListingById, getAllListings } from "@/lib/listings";
import { siteConfig } from "@/lib/site-config";
import { VirtualTourViewer } from "@/components/property/VirtualTourViewer";
import { Footer, MobileCTA } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prop = await getListingById(id);
  if (!prop) return { title: "Property Not Found" };

  return {
    title: `${prop.title} in ${prop.locality} — ${prop.price} | RajHomes Jaipur`,
    description: prop.description,
    openGraph: {
      title: `${prop.title} — ${prop.price}`,
      description: prop.description,
      images: [{ url: prop.image, alt: prop.title }],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prop = await getListingById(id);

  if (!prop) {
    notFound();
  }

  const allListings = await getAllListings();
  const relatedListings = allListings
    .filter((l) => l.id !== prop.id && (l.locality === prop.locality || l.type === prop.type))
    .slice(0, 3);

  const whatsappMessage = `Hello RajHomes! I am interested in "${prop.title}" in ${prop.locality} priced at ${prop.price}. Please share more photos, exact location, and site visit timing.`;
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#1E2320]">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#1E2320]/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
          <Link
            href="/buy"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E2320]/70 hover:text-terracotta transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Properties
          </Link>

          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                prop.status === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {prop.status === "available" ? "Active for Sale" : "SOLD OUT"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
        {/* Header Title & Price */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-terracotta">
              <span className="uppercase tracking-wider">{prop.type}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#1E2320]/70">
                <MapPin size={13} /> {prop.locality}, Jaipur
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl md:text-4xl">
              {prop.title}
            </h1>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-[#1E2320]/60 uppercase tracking-wider block">
              Asking Price
            </span>
            <span className="text-3xl font-extrabold text-[#1E2320]">{prop.price}</span>
          </div>
        </div>

        {/* ── 3D / 360° TOUR OR MAIN GALLERY ── */}
        <div className="mt-6">
          {prop.has360 && prop.panoramaUrl ? (
            <div className="space-y-3">
              <VirtualTourViewer
                panoramaUrl={prop.panoramaUrl}
                title={`360° Interactive View: ${prop.title}`}
              />
              <p className="text-center text-xs text-[#1E2320]/60">
                💡 Drag with mouse or swipe on mobile to rotate around this property in full 360°.
              </p>
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-black/10 shadow-lg sm:aspect-[21/9]">
              <Image
                src={prop.image}
                alt={prop.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          )}
        </div>

        {/* Photo Gallery Grid */}
        {prop.gallery && prop.gallery.length > 1 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
            {prop.gallery.map((imgUrl, i) => (
              <div
                key={i}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/5 shadow-sm"
              >
                <Image
                  src={imgUrl}
                  alt={`${prop.title} photo ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Two-Column Layout: Details + Sticky Contact */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Left: Specs, Description, Features (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
                <span className="text-xs text-[#1E2320]/50 block">Configuration</span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-bold">
                  <Bed size={16} className="text-terracotta" />
                  {prop.bhk}
                </span>
              </div>

              <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
                <span className="text-xs text-[#1E2320]/50 block">Super Area</span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-bold">
                  <Maximize2 size={16} className="text-terracotta" />
                  {prop.area}
                </span>
              </div>

              <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
                <span className="text-xs text-[#1E2320]/50 block">Direction Facing</span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-bold">
                  <Compass size={16} className="text-terracotta" />
                  {prop.facing || "East Facing"}
                </span>
              </div>

              <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-4 shadow-sm">
                <span className="text-xs text-[#1E2320]/50 block">Listed Date</span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-bold">
                  <Calendar size={16} className="text-terracotta" />
                  {prop.postedDate}
                </span>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-[#1E2320]/70">
                Legal &amp; Construction Approvals
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2320]/85">
                  <CheckCircle size={17} className="text-green-600 shrink-0" />
                  <span>100% JDA Approved Patta</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2320]/85">
                  <CheckCircle size={17} className="text-green-600 shrink-0" />
                  <span>RERA Registered Scheme</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1E2320]/85">
                  <CheckCircle size={17} className="text-green-600 shrink-0" />
                  <span>SBI &amp; HDFC Loan Ready</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-[#1E2320]/10 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold mb-3">Property Overview</h3>
              <p className="text-sm leading-relaxed text-[#1E2320]/80 whitespace-pre-line">
                {prop.description}
              </p>
            </div>
          </div>

          {/* Right: Sticky Direct Contact Box (1 col) */}
          <div>
            <div className="sticky top-24 rounded-3xl border border-[#1E2320]/10 bg-white p-6 shadow-xl space-y-5">
              <div className="border-b border-[#1E2320]/10 pb-4">
                <span className="text-xs text-[#1E2320]/50 block">Interested in this property?</span>
                <h3 className="text-lg font-bold">Connect with RajHomes</h3>
                <p className="text-xs text-[#1E2320]/60 mt-1">
                  Schedule a private site inspection with our Jaipur property expert.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#20BE5B] transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  <span>Inquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="btn-search flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98]"
                >
                  <Phone size={17} />
                  <span>Call Consultant Now</span>
                </a>
              </div>

              <div className="rounded-xl bg-[#FAF6F1] p-3 text-xs text-[#1E2320]/75 space-y-1.5 border border-[#1E2320]/5">
                <p className="font-semibold text-[#1E2320]">Why book through RajHomes:</p>
                <p>✓ Zero brokerage for select new schemes</p>
                <p>✓ Direct face-to-face meeting with owner</p>
                <p>✓ Legal document &amp; Registry assistance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Listings Section */}
        {relatedListings.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#1E2320]/10">
            <h2 className="text-xl font-bold mb-6">Similar Properties in Jaipur</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedListings.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/property/${rel.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#1E2320]/10 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="33vw"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
                      {rel.price}
                    </span>
                  </div>
                  <div className="p-4 flex flex-1 flex-col justify-between">
                    <div>
                      <h4 className="line-clamp-1 text-sm font-semibold group-hover:text-terracotta transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#1E2320]/60 mt-1 flex items-center gap-1">
                        <MapPin size={11} /> {rel.locality}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-[#1E2320]/60 border-t border-[#1E2320]/5 pt-2">
                      <span>{rel.bhk}</span>
                      <span>•</span>
                      <span>{rel.area}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
