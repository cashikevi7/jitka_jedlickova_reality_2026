"use client";

import Image from "next/image";

/** Texty sjednocené s https://www.jitkajedlickova.cz/o-mne/ */
const ABOUT_PARAGRAPHS = [
  "Na trhu s nemovitostmi působím od roku 2012 a rozhodnutí vystoupit ze své komfortní zóny, rozšířit svůj rozhled, vzdělávat se a pomáhat lidem při prodeji, koupi či pronájmu, hodnotím jako šťastný.",
  "Baví mě práce s lidmi, jejich příběhy, sny, touhy a s nimi spjaté nemovitosti. Naslouchám jejich představám a nevnucuji jim svoje, pouze se snažím poradit, být tu pro ně a zajistit potřebný komfort a bezpečí během celého realitního obchodu.",
  "Dělám svou práci s láskou a pokorou, jsem empatická, vstřícná, spolehlivá a věřím v životní moudro „To co dáváš, se Ti vrátí“.",
  "Ráda Vám poskytnu profesionální i přátelskou pomoc.",
  "Mít rád co děláš, znamená být šťastný.",
];

const JITKA_IMAGE = "/images/Jitka/jitka1.webp";

export default function About() {
  return (
    <section id="o-mne" className="py-16 md:py-24" style={{
      background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
    }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="relative aspect-3/4 max-h-[480px] rounded-2xl overflow-hidden order-2 md:order-1"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Image
              src={JITKA_IMAGE}
              alt="Jitka Jedličková - realitní makléřka"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-white">
                <p className="text-lg font-semibold">Jitka Jedličková</p>
                <p className="text-white/80 text-sm">Realitní makléřka</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="section-title mb-6">O mně</h2>
            <div className="space-y-5 mb-8">
              {ABOUT_PARAGRAPHS.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-dark text-base md:text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p
              className="text-primary text-xl italic mb-8"
              style={{ fontFamily: "var(--font-script), cursive" }}
            >
              Svoji práci dělám srdcem.
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a227 0%, #e6b800 100%)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-dark">12+ let zkušeností</p>
                  <p className="text-sm text-muted">na trhu nemovitostí</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
