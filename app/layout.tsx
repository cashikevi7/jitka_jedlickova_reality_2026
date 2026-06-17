import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import AIAssistantWrapper from "@/components/AIAssistantWrapper";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jitka Jedličková | Realitní makléřka",
    template: "%s | Mamka Reality",
  },
  description:
    "Realitní specialistka a smluvní partner Reality Proradost s.r.o. Prodej, pronájem a odhad nemovitostí. Moravský Krumlov.",
  keywords: [
    "reality",
    "nemovitosti",
    "prodej nemovitostí",
    "pronájem",
    "byty",
    "domy",
    "pozemky",
    "Moravský Krumlov",
    "Znojmo",
    "makléř",
  ],
  authors: [{ name: "Jitka Jedličková" }],
  creator: "Mamka Reality",
  publisher: "Mamka Reality",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/Jitka/favicon.ico",
    apple: "/images/Jitka/favicon.ico",
  },
  openGraph: {
    title: "Jitka Jedličková | Realitní makléřka",
    description: "Realitní specialistka v regionu Znojmo a Moravský Krumlov. Prodej, pronájem a odhad nemovitostí.",
    url: "https://www.mamka-reality.cz",
    siteName: "Mamka Reality",
    locale: "cs_CZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Jitka Jedličková – Mamka Reality",
    description: "Realitní specialistka a smluvní partner Reality Proradost s.r.o. Prodej, pronájem a odhad nemovitostí v regionu Znojmo a Moravský Krumlov.",
    telephone: "+420608713632",
    email: "jedlickova@reality-proradost.cz",
    url: "https://www.mamka-reality.cz",
    areaServed: [{ "@type": "Place", name: "Znojmo" }, { "@type": "Place", name: "Moravský Krumlov" }],
  };

  return (
    <html
        lang="cs"
        className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
        suppressHydrationWarning
      >
      <body className="min-h-screen bg-background font-body" suppressHydrationWarning>
        <JsonLd data={localBusinessSchema} />
        <Navbar />
        <HomeHero />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <AIAssistantWrapper />
      </body>
    </html>
  );
}
