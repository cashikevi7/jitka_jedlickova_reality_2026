"use client";

import { useRef } from "react";
import { Quote } from "lucide-react";

/** Texty sjednocené s https://www.jitkajedlickova.cz/reference/ */
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
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="reference" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="section-title">Klienti o spolupráci s Jitkou</h2>
        <p className="section-lead mb-10">
          Důvěra je v realitách všechno.
        </p>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
          aria-label="Reference klientů"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="shrink-0 w-[85vw] sm:w-[360px] snap-start card p-6"
            >
              <Quote
                className="w-8 h-8 text-primary/40 mb-4"
                strokeWidth={1}
                aria-hidden
              />
              <p className="text-dark leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <p className="font-heading text-primary text-sm font-semibold">
                {t.name}
              </p>
              <p className="text-muted text-xs mt-0.5">{t.dealType}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
