"use client";

import Link from "next/link";
import HeroSunMark from "@/components/HeroSunMark";

export default function Hero() {
  return (
    <section id="uvod" className="hero">
      <div className="hero-inner">
        <div className="hero-sun-col">
          <HeroSunMark className="hero-sun" />
        </div>
        <div className="hero-copy-col">
          <p className="eyebrow">Reality · Znojmo a Moravský Krumlov</p>
          <h1>Domov, kde vyrůstají vzpomínky</h1>
          <p className="hero-subtitle">
            Prodej, pronájem a odhad nemovitostí v regionu Znojma a Moravského Krumlova. Kompletní servis a jasná
            komunikace — od první konzultace až po předání klíčů.
          </p>
          <div className="hero-actions">
            <Link href="#kontakt" className="primary">
              Domluvte si konzultaci
            </Link>
            <Link href="#nabidka" className="secondary">
              Prohlédnout nabídku
            </Link>
          </div>
          <p className="hero-badges">Prodej nemovitostí · Pronájem bez starostí · Vše od A do Z</p>
        </div>
      </div>
    </section>
  );
}
