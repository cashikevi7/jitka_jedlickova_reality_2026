"use client";

import Link from "next/link";
import { Home, Key, BarChart2 } from "lucide-react";

const CARDS = [
  {
    icon: Home,
    title: "Prodej",
    bullets: [
      "Reálná cena podle trhu a srovnání v okolí",
      "Fotografie, inzerce, prohlídky a vyjednávání",
      "Smlouvy a převod do posledního detailu",
    ],
  },
  {
    icon: Key,
    title: "Pronájem",
    bullets: [
      "Prezentace nemovitosti a prověření nájemníka",
      "Individuální nájemní smlouvy dle právních předpisů",
      "Průběžná podpora po celou dobu pronájmu",
    ],
  },
  {
    icon: BarChart2,
    title: "Tržní odhad",
    bullets: [
      "Odhad pro notáře nebo pro vaše rozhodnutí",
      "Podle aktuální situace na trhu ve vaší lokalitě",
    ],
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="py-16 md:py-24" style={{
      background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)',
    }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="section-title">Služby</h2>
        <p className="section-lead mb-12">
          Prodej, pronájem a odhad — vždy s důrazem na vás a vaši nemovitost.
        </p>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-14">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: 'linear-gradient(135deg, #c9a227 0%, #e6b800 100%)',
                  boxShadow: '0 4px 12px rgba(201, 162, 39, 0.3)',
                }}
              >
                <card.icon
                  className="w-7 h-7 text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-dark mb-3">
                {card.title}
              </h3>
              <ul className="space-y-2 text-muted text-sm leading-relaxed">
                {card.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="#kontakt" className="btn-primary cursor-pointer">
            Domluvme si nezávaznou konzultaci
          </Link>
        </div>
      </div>
    </section>
  );
}
