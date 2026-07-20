"use client";

import Link from "next/link";

const STEPS = [
  {
    number: "1.",
    title: "První konzultace",
    text: "Probereme vaši nemovitost, cíle a časový rámec. Nastavíme reálnou cenu a způsob prezentace. Nezávazně, bez tlaku.",
  },
  {
    number: "2.",
    title: "Příprava a marketing",
    text: "Profesionální fotografie, inzerce na portálech a sociálních sítích. Nemovitost připravíme tak, aby zaujala správné kupce.",
  },
  {
    number: "3.",
    title: "Prohlídky a bezpečný převod",
    text: "Provádím zájemce osobně, vyjednávám nejlepší podmínky a dovádím obchod do zdárného konce včetně smluv a přepisů.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="jak-spoluprace"
      className="py-20 md:py-28"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="section-label">Jak to probíhá</p>
        <h2 className="section-title mb-2">
          Tři kroky od prvního kontaktu po předání klíčů
        </h2>
        <p className="section-lead mb-16 max-w-xl">
          Jednoduchý proces, žádné zbytečné komplikace. Jsem s vámi od začátku
          až do konce.
        </p>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-14">
          {STEPS.map((step) => (
            <div key={step.number}>
              <span
                className="font-heading text-5xl font-semibold leading-none block mb-4"
                style={{ color: "var(--color-terracotta)", opacity: 0.3 }}
              >
                {step.number}
              </span>
              <h3
                className="font-heading text-lg font-semibold mb-2"
                style={{ color: "var(--color-espresso)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8 border-t" style={{ borderColor: "var(--color-clay)" }}>
          <p
            className="text-lg font-medium mb-4"
            style={{ color: "var(--color-espresso)" }}
          >
            Chcete začít?
          </p>
          <Link href="#kontakt" className="btn-primary cursor-pointer">
            Napište mi
          </Link>
        </div>
      </div>
    </section>
  );
}
