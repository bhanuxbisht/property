import Link from "next/link";
import { MobileCTA, Footer } from "@/components/layout/Footer";

export default function RentPage() {
  return (
    <>
      <main className="min-h-screen bg-cream px-4 py-16 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display mb-4 text-4xl font-light text-charcoal">
            Rent Property in Jaipur
          </h1>
          <p className="text-charcoal-light mb-8">
            Find rental flats and houses in Murlipura, Jhotwara, and Sikar Road.
            Full listing grid coming soon.
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
