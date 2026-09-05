import Link from "next/link";
import { MobileCTA, Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display mb-4 text-4xl font-light text-charcoal">
            About Your Agent
          </h1>
          <p className="text-charcoal-light mb-6 leading-relaxed">
            {siteConfig.experience} years helping families buy, sell, and rent
            across {siteConfig.areas.map((a) => a.name).join(", ")}. RERA{" "}
            {siteConfig.reraNumber}.
          </p>
          <Link
            href="/"
            className="text-terracotta text-sm font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
