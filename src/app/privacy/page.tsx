import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Footer, MobileCTA } from "@/components/layout/Footer";

export const metadata = {
  title: `Privacy Policy & Terms of Advisory | ${siteConfig.name} Jaipur`,
  description: `Privacy policy, RERA compliance disclosure, and advisory terms for ${siteConfig.name}, headed by Mr. Lalit Singh Bisht (RERA: ${siteConfig.reraNumber}).`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2320]">
      {/* Header */}
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
              href="/"
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs sm:text-[13.5px] font-medium text-[#1E2320]/75 transition-all hover:bg-white/60 hover:text-[#1E2320]"
            >
              <ArrowLeft size={13} />
              <span>Back to Home</span>
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

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/10 px-4 py-1.5 text-xs font-bold text-terracotta mb-4">
          <ShieldCheck size={14} />
          <span>Legal &amp; Regulatory Compliance</span>
        </div>

        <h1 className="text-3xl font-extrabold sm:text-4xl text-[#1E2320] tracking-tight">
          Privacy Policy &amp; Terms of Advisory
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#1E2320]/60">
          Last updated: March 2025 · Applicable to all property consultations across Jaipur, Rajasthan.
        </p>

        <div className="mt-8 space-y-8 text-xs sm:text-sm text-[#1E2320]/80 leading-relaxed">
          <section className="rounded-2xl border border-[#1E2320]/10 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#1E2320] font-bold text-base">
              <Lock size={18} className="text-terracotta" />
              <h2>1. Client Data Privacy &amp; Confidentiality</h2>
            </div>
            <p>
              At <strong>{siteConfig.name}</strong>, we respect your privacy. When you submit an inquiry form or connect with us via phone or WhatsApp, your contact details (name, phone number, budget, and locality preference) are used exclusively by our principal consultant, Mr. Lalit Singh Bisht, to provide relevant property options.
            </p>
            <p className="font-semibold text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              ✓ We have a strict zero-spam policy: We never sell, rent, or share your personal contact information with third-party marketing agencies, loan telecallers, or external broker networks.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1E2320]/10 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#1E2320] font-bold text-base">
              <ShieldCheck size={18} className="text-terracotta" />
              <h2>2. Official RERA Compliance Disclosure</h2>
            </div>
            <p>
              {siteConfig.name} is an independent property consultancy duly registered with the Rajasthan Real Estate Regulatory Authority under <strong>RERA Registration Number: {siteConfig.reraNumber}</strong>.
            </p>
            <p>
              We adhere strictly to the Real Estate (Regulation and Development) Act mandates for truth in advertising and fair negotiation. All advertised project specifications, layout plans, and pricing benchmarks are sourced directly from verified developers or registered landowners.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1E2320]/10 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#1E2320] font-bold text-base">
              <FileText size={18} className="text-terracotta" />
              <h2>3. Buyer Due Diligence &amp; Title Verification Advisory</h2>
            </div>
            <p>
              While {siteConfig.name} conducts preliminary on-ground inspections, JDA layout checks, and title history vetting, property buyers are always advised to conduct their own independent legal due diligence, physical site survey, and legal verification through certified advocates before executing registered sale deeds or releasing substantial financial payments.
            </p>
          </section>

          <section className="rounded-2xl border border-[#1E2320]/10 bg-white p-6 shadow-sm space-y-3">
            <h2 className="text-[#1E2320] font-bold text-base">4. Grievance &amp; Contact Office</h2>
            <p>
              If you have any questions regarding data handling or wish to remove your contact details from our active property matching system, contact our registered office:
            </p>
            <div className="pt-2 text-xs space-y-1 text-[#1E2320]/75">
              <p><strong>Principal Consultant:</strong> Mr. Lalit Singh Bisht</p>
              <p><strong>Office Address:</strong> {siteConfig.address}</p>
              <p><strong>Phone:</strong> {siteConfig.phone}</p>
              <p><strong>Email:</strong> {siteConfig.email}</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
