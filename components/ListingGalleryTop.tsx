"use client";

import { PROPERTIES } from "@/lib/properties-data";
import { getListingCoverSrc } from "@/lib/property-images";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

export default function ListingGalleryTop() {
  return (
    <section
      className="relative z-10 pt-8 md:pt-12 pb-10 md:pb-14"
      style={{ background: "var(--color-cream)" }}
      aria-label="Aktuální nabídka nemovitostí"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <p className="section-label">Aktuálně v nabídce</p>
            <h2 className="font-heading text-xl md:text-2xl font-semibold" style={{ color: "var(--color-espresso)" }}>
              Nemovitosti, které právě nabízím
            </h2>
            <p className="text-sm mt-1 max-w-xl" style={{ color: "var(--color-muted)" }}>
              Klikněte na nemovitost pro detail. Kompletní seznam s filtry a mapou najdete níže.
            </p>
          </div>
          <Link
            href="#nabidka"
            className="inline-flex items-center gap-1 text-sm font-semibold transition-colors shrink-0 cursor-pointer"
            style={{ color: "var(--color-terracotta)" }}
          >
            Kompletní nabídka a filtry
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ul
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 list-none m-0"
          style={{
            scrollbarGutter: "stable",
            maskImage:
              "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
          }}
        >
          {PROPERTIES.map((p) => (
            <li
              key={p.slug}
              className="shrink-0 snap-start w-[min(85vw,300px)]"
            >
              <GalleryCard listing={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GalleryCard({
  listing,
}: Readonly<{
  listing: (typeof PROPERTIES)[number];
}>) {
  const [src, setSrc] = useState(
    getListingCoverSrc(listing.slug, listing.images)
  );
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={`/nabidka/${listing.slug}`}
      prefetch={false}
      className="group block rounded-2xl overflow-hidden card card-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: "var(--color-terracotta)" }}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={src}
          alt={listing.title}
          fill
          sizes="300px"
          className={`object-cover transition-transform duration-500 ${isLoading ? "blur-sm scale-105" : "blur-0"
            }`}
          onError={() => setSrc(PLACEHOLDER)}
          onLoad={() => setIsLoading(false)}
          style={{ transformOrigin: "center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(44,36,22,0.7) 0%, rgba(44,36,22,0.1) 40%, transparent 100%)",
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={
              listing.type === "pronajem" ? "badge-rent" : "badge-sale"
            }
          >
            {listing.type === "pronajem" ? "PRONÁJEM" : "PRODEJ"}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <p className="text-white font-heading text-sm font-semibold leading-snug line-clamp-2 group-hover:opacity-90 transition-opacity">
            {listing.title}
          </p>
          {listing.price && (
            <p
              className="text-sm font-semibold mt-1"
              style={{ color: "var(--color-gold)" }}
            >
              {listing.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
