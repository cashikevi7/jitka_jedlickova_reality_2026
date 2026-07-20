"use client";

import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Jitka Leikepová",
    dealType: "spolupráci při prodeji",
    text: "Seriózní jednání, ochota, upřímnost, vytrvalost. Ze své zkušenosti mohu doporučit paní Jitulku Jedličkovou, nezklame Vás.",
  },
  {
    name: "Jitka Ganzwohlová",
    dealType: "koupi bytu",
    text: "Dobrý den, moc ráda bych touto cestou ještě jednou poděkovala paní Jitce Jedličkové za spolupráci při koupi bytu, za její vstřícnost, solidnost při jednání a lidskou slušnost. Byla jsem s její prací nadmíru spokojená a velmi ráda bych ji tímto způsobem doporučila dalším zájemcům o koupi, či prodeji nemovitosti, s paní Jedličkovou je radost spolupracovat.",
  },
  {
    name: "Renata",
    dealType: "prodej pozemku",
    text: "Díky paní Jitce za vynikající a profesionálně odvedenou práci při prodeji pozemku. Tak si představuji spolupráci s realitním makléřem.",
  },
  {
    name: "Iva Lacinová",
    dealType: "prodej majetku",
    text: "Paní Jedličkovou jsem oslovila při prodeji svého majetku již opakovaně a vše vždy proběhlo rychle, naprosto bez problémů a k mé úplné spokojenosti. Paní Jedličková je velmi profesionální, příjemná, milá a ochotná. Věřím jí a mohu se na ni stoprocentně spolehnout. Všem bych přála, ať už při prodejích nebo nákupech, takového realitního makléře. Její služby mohu opravdu jen doporučit. Paní Jedličková děkuji za všechno!!!",
  },
  {
    name: "Jaroslava Sobotková",
    dealType: "prodej nemovitosti",
    text: "Děkujeme paní Jedličkové za perfektně odvedenou práci. Přístup paní Jedličkové byl opravdu profesionální, vše dopadlo k naší spokojenosti. Reality Pro radost, zastoupené paní Jedličkovou mohu jen doporučit.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="reference"
      className="py-20 md:py-28"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="section-label">Reference</p>
        <h2 className="section-title mb-2">Klienti o spolupráci s Jitkou</h2>
        <p className="section-lead mb-10">
          Důvěra je v realitách všechno. Tady je pár slov od lidí, kterým jsem
          pomohla.
        </p>

        <div
          className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
          aria-label="Reference klientů"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="shrink-0 w-[85vw] sm:w-[340px] snap-start card p-6 flex flex-col"
            >
              {/* Hvězdy */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    fill="var(--color-gold)"
                    stroke="none"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <Quote
                className="w-8 h-8 mb-3 shrink-0"
                style={{ color: "var(--color-terracotta)", opacity: 0.3 }}
                strokeWidth={1}
                aria-hidden="true"
              />
              <p
                className="leading-relaxed mb-5 flex-1"
                style={{ color: "var(--color-espresso)" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p
                  className="font-heading text-sm font-semibold"
                  style={{ color: "var(--color-terracotta)" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-muted)" }}
                >
                  {t.dealType}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
