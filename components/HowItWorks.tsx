"use client";

import Link from "next/link";
import { MessageCircle, ImagePlus, Handshake } from "lucide-react";

const STEPS = [
  {
    icon: MessageCircle,
    title: "První konzultace",
    text: "Probereme vaši nemovitost, cíle a časový rámec. Nastavíme reálnou cenu a způsob prezentace.",
  },
  {
    icon: ImagePlus,
    title: "Příprava nemovitosti a marketing",
    text: "Fotografie, inzerce na portálech a sociálních sítích. Nemovitost připravíme tak, aby zaujala.",
  },
  {
    icon: Handshake,
    title: "Prohlídky a bezpečný převod",
    text: "Provádím zájemce, vyjednávám a dovedu obchod do zdárného konce včetně smluv a přepisů.",
  },
];

export default function HowItWorks() {
  return (
    <section id="jak-spoluprace" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="section-title">Jak spolupráce probíhá</h2>
        <p className="section-lead mb-12">
          Tři jednoduché kroky od prvního kontaktu po předání klíčů.
        </p>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-12">
          {STEPS.map((step) => (
            <div key={step.title}>
              <step.icon
                className="w-8 h-8 text-primary mb-4"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <p className="text-dark font-medium mb-4">Chcete začít?</p>
        <Link href="#kontakt" className="btn-primary cursor-pointer">
          Napište mi
        </Link>
      </div>
    </section>
  );
}
