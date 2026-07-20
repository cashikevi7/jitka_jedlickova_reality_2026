import About from "@/components/About";
import Contact from "@/components/Contact";
import CuratedPicks from "@/components/CuratedPicks";
import HowItWorks from "@/components/HowItWorks";
import ListingGalleryTop from "@/components/ListingGalleryTop";
import MobileStickyBar from "@/components/MobileStickyBar";
import Properties from "@/components/Properties";
import { SectionWrapper } from "@/components/Section";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import TrustBadge from "@/components/TrustBadge";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <ListingGalleryTop />

      <SectionWrapper>
        <Stats />
      </SectionWrapper>

      {/* Branding motiv — opakuje se napříč stránkou */}
      <TrustBadge />

      <SectionWrapper>
        <Services />
      </SectionWrapper>

      <SectionWrapper>
        <Properties />
      </SectionWrapper>

      <SectionWrapper>
        <About />
      </SectionWrapper>

      <SectionWrapper>
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper>
        <HowItWorks />
      </SectionWrapper>

      {/* Signature feature: kurátorský výběr */}
      <CuratedPicks />

      <SectionWrapper>
        <Contact />
      </SectionWrapper>

      <MobileStickyBar />
    </>
  );
}
