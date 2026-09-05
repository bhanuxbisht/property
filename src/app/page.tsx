import { HeroWrapper } from "@/components/home/HeroSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { AreasWeServe } from "@/components/home/AreasWeServe";
import { Testimonials } from "@/components/home/Testimonials";
import {
  TrustBanner,
  MobileCTA,
  Footer,
} from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroWrapper />
        <FeaturedListings />
        <AreasWeServe />
        <Testimonials />
        <TrustBanner />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
