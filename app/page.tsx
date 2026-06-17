"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ListingGalleryTop from "@/components/ListingGalleryTop";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Properties from "@/components/Properties";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";

export const dynamic = "force-static";

function SectionWrapper({ children, id }: { children: React.ReactNode; id: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <>
      <ListingGalleryTop />
      <Stats />
      <SectionWrapper id="sluzby">
        <Services />
      </SectionWrapper>
      <SectionWrapper id="nabidka">
        <Properties />
      </SectionWrapper>
      <SectionWrapper id="o-mne">
        <About />
      </SectionWrapper>
      <SectionWrapper id="reference">
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper id="jak-spoluprace">
        <HowItWorks />
      </SectionWrapper>
      <SectionWrapper id="kontakt">
        <Contact />
      </SectionWrapper>
    </>
  );
}
