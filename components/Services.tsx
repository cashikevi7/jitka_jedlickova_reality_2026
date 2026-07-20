"use client";

import Link from "next/link";

const SERVICES = [
  {
    number: "01",
    title: "Prodej nemovitostí",
    description:
      "Reálná tržní cena podle lokality a srovnání v okolí. Profesionální fotografie, cílená inzerce, prohlídky se mnou, vyjednávání i kompletní smluvní servis — od A do Z.",
    points: [
      "Stanovení reálné ceny podle trhu",
      "Focení, inzerce, sociální sítě",
      "Prohlídky, vyjednávání, převod",
    ],
  },
  {
    number: "02",
    title: "Pronájem bez starostí",
    description:
      "Prezentace nemovitosti, prověření nájemníka, férová nájemní smlouva a průběžná podpora po celou dobu pronájmu. Vše zařídím — vy jen inkasujete.",
    points: [
      "Prezentace a prověření nájemníka",
      "Smlouvy podle platných předpisů",
      "Podpora po celou dobu pronájmu",
    ],
  },
  {
    number: "03",
    title: "Tržní odhad nemovitosti",
    description:
      "Potřebujete odhad pro notáře, dědictví, nebo vlastní rozhodnutí? Vypracuji ho podle aktuální situace na trhu přímo ve vaší lokalitě.",
    points: [
      "Odhad pro notáře i rozhodování",
      "Aktuální data z vaší lokality",
      "Osobní konzultace výsledku",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="sluzby"
      className="py-20 md:py-28"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="section-label">Služby</p>
        <h2 className="section-title mb-3">
          Prodej, pronájem a odhad — vždy s důrazem na vás
        </h2>
        <p className="section-lead mb-16 max-w-xl">
          Každá nemovitost je jiná. Každý klient má svůj příběh. Moje služby se
          tomu přizpůsobí.
        </p>

        <div className="space-y-12 md:space-y-16">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="grid md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Číslo — na mobilu vlevo od obsahu */}
              <div className="md:col-span-2 flex md:block items-center gap-4">
                <span
                  className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold leading-none"
                  style={{ color: "var(--color-terracotta)", opacity: 0.25 }}
                >
                  {service.number}
                </span>
              </div>

              {/* Obsah */}
              <div className="md:col-span-6">
                <h3
                  className="font-heading text-xl md:text-2xl font-semibold mb-3"
                  style={{ color: "var(--color-espresso)" }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "var(--color-muted)" }}
                >
                  {service.description}
                </p>
                <ul className="space-y-1.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--color-terracotta)" }}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vizuální kotva — prázdný sloupec pro rovnováhu na desktopu */}
              <div className="hidden md:block md:col-span-4" />
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 text-center border-t" style={{ borderColor: "var(--color-clay)" }}>
          <p
            className="text-lg font-medium mb-4"
            style={{ color: "var(--color-espresso)" }}
          >
            Nejste si jistí, která služba je pro vás ta pravá?
          </p>
          <Link href="#kontakt" className="btn-primary cursor-pointer">
            Domluvme si nezávaznou konzultaci
          </Link>
        </div>
      </div>
    </section>
  );
}
