"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HERO_IMAGE = "/images/Jitka/jitka1.webp";

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="uvod" className="hero">
      <div className="hero-bg">
        {!imgError ? (
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              background:
                "linear-gradient(160deg, #C17F59 0%, #8B6A50 40%, #2C2416 100%)",
            }}
          />
        )}
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-eyebrow hero-entrance hero-entrance-delay-1">
          Realitní specialistka · Znojmo a Moravský Krumlov
        </p>
        <h1 className="hero-entrance hero-entrance-delay-2">
          Domov, kde vyrůstají vzpomínky
        </h1>
        <p className="hero-subtitle hero-entrance hero-entrance-delay-3">
          Prodej, pronájem a odhad nemovitostí s&nbsp;osobní péčí. Od&nbsp;první
          konzultace až po&nbsp;předání klíčů — vždy s&nbsp;lidským přístupem
          a&nbsp;znalostí regionu.
        </p>

        <div className="hero-actions hero-entrance hero-entrance-delay-4">
          <Link href="#kontakt" className="btn-hero-primary">
            Domluvit nezávaznou schůzku
          </Link>
          <Link href="#nabidka" className="btn-hero-secondary">
            Prohlédnout nabídku
          </Link>
        </div>

        <p className="hero-badges hero-entrance hero-entrance-delay-5">
          <span>
            <Star className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true" />
            4.9 hodnocení
          </span>
          <span aria-hidden="true">·</span>
          <span>12 let na trhu</span>
          <span aria-hidden="true">·</span>
          <span>100+ splněných přání</span>
        </p>
      </div>
    </section>
  );
}
