"use client";

import Image from "next/image";

/** Texty sjednocené s https://www.jitkajedlickova.cz/o-mne/ */
const ABOUT_PARAGRAPHS = [
  "Na trhu s nemovitostmi působím od roku 2012 a rozhodnutí vystoupit ze své komfortní zóny, rozšířit svůj rozhled, vzdělávat se a pomáhat lidem při prodeji, koupi či pronájmu, hodnotím jako šťastné.",
  "Baví mě práce s lidmi, jejich příběhy, sny, touhy a s nimi spjaté nemovitosti. Naslouchám jejich představám a nevnucuji jim svoje, pouze se snažím poradit, být tu pro ně a zajistit potřebný komfort a bezpečí během celého realitního obchodu.",
  "Dělám svou práci s láskou a pokorou, jsem empatická, vstřícná, spolehlivá a věřím v životní moudro „To co dáváš, se Ti vrátí“.",
  "Ráda Vám poskytnu profesionální i přátelskou pomoc.",
];

/* Jednoduchá časová osa */
const TIMELINE = [
  { year: "2012", label: "Začátek na trhu" },
  { year: "2016", label: "Prvních 50 obchodů" },
  { year: "2020", label: "Rozšíření do regionu Znojmo" },
  { year: "2024", label: "100+ úspěšných transakcí" },
  { year: "2026", label: "Váš nový domov?" },
];

const JITKA_IMAGE = "/images/Jitka/jitka1.webp";

export default function About() {
  return (
    <section
      id="o-mne"
      className="py-20 md:py-28"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Levá — fotka */}
          <div
            className="relative aspect-3/4 max-h-[520px] rounded-2xl overflow-hidden order-2 md:order-1"
            style={{
              boxShadow: "0 25px 50px -12px rgba(44, 36, 22, 0.2)",
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
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(to top, rgba(44,36,22,0.4) 0%, transparent 40%)",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-white">
                <p className="text-lg font-semibold">Jitka Jedličková</p>
                <p className="text-white/80 text-sm">Realitní makléřka</p>
              </div>
            </div>
          </div>

          {/* Pravá — text */}
          <div className="order-1 md:order-2">
            <p className="section-label">O mně</p>
            <h2 className="section-title mb-6">
              Svoji práci dělám srdcem
            </h2>
            <div className="space-y-4 mb-8">
              {ABOUT_PARAGRAPHS.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Mikro-timeline */}
            <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
              {TIMELINE.map((item) => (
                <div
                  key={item.year}
                  className="px-3 py-2 rounded-lg text-center"
                  style={{
                    background: "var(--color-sand)",
                    border: "1px solid var(--color-clay)",
                  }}
                >
                  <p
                    className="text-xs font-bold"
                    style={{ color: "var(--color-terracotta)" }}
                  >
                    {item.year}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="text-xl italic"
              style={{
                fontFamily: "var(--font-script), cursive",
                color: "var(--color-terracotta)",
              }}
            >
              Mít rád co děláš, znamená být šťastný.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
