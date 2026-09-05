import { HeroWrapper } from "@/components/home/HeroSection";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { AreasWeServe } from "@/components/home/AreasWeServe";
import { Testimonials } from "@/components/home/Testimonials";
import {
  TrustBanner,
  MobileCTA,
  Footer,
} from "@/components/layout/Footer";
import { getAllListings } from "@/lib/listings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allListings = await getAllListings();
  const featured = allListings.filter((l) => l.featured || l.status === "available").slice(0, 4);

  return (
    <>
      <main>
        <HeroWrapper />
        <FeaturedListings initialListings={featured} />
        <AreasWeServe />
        <Testimonials />
        <TrustBanner />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
