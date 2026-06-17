"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PROPERTIES } from "@/lib/properties-data";
import { getListingCoverSrc } from "@/lib/property-images";
import { ChevronRight } from "lucide-react";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

/**
 * Úvodní horizontální galerie — čte `PROPERTIES` z `data/listings.json`
 * (stejné zdroje jako `Properties`; po úpravě dat znovu build / deploy).
 */
export default function ListingGalleryTop() {
  return (
    <section
      className="relative z-10 pt-24 md:pt-28 pb-8 md:pb-10"
      style={{
        background:
          "linear-gradient(180deg, #0f1729 0%, #16213e 40%, #1a1a2e 100%)",
      }}
      aria-label="Aktuální nabídka nemovitostí"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div>
            <p className="text-white/55 text-xs font-medium uppercase tracking-wider mb-1">
              Aktuálně v nabídce
            </p>
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-white">
              Nemovitosti, které právě nabízím
            </h2>
            <p className="text-white/60 text-sm mt-1 max-w-xl">
              Klikněte na nemovitost pro detail; kompletní seznam s filtry je v sekci Nabídka.
            </p>
          </div>
          <Link
            href="#nabidka"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/90 transition-colors shrink-0 cursor-pointer"
          >
            Kompletní nabídka a filtry
            <ChevronRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

        <ul
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth scrollbar-thin -mx-4 px-4 md:mx-0 md:px-0 list-none m-0"
          style={{
            scrollbarGutter: "stable",
            maskImage:
              "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 12px, black calc(100% - 12px), transparent 100%)",
          }}
        >
          {PROPERTIES.map((p) => (
            <li key={p.slug} className="shrink-0 snap-start w-[min(85vw,280px)]">
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
  const [src, setSrc] = useState(getListingCoverSrc(listing.slug, listing.images));
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={`/nabidka/${listing.slug}`}
      prefetch={false}
      className="group block rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/15 shadow-lg hover:ring-primary/50 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="relative aspect-4/3">
        <Image
          src={src}
          alt=""
          fill
          sizes="280px"
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${isLoading ? "blur-sm scale-105" : "blur-0"}`}
          onError={() => setSrc(PLACEHOLDER)}
          onLoad={() => setIsLoading(false)}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYhMRJBE1Fh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANJT6dra63SU1PBI6xSH1WqTlVPsD51j1OmrTBDRUkVFFDFT9MRxgBQM6c7q6y6e6dpKmjivFRNVTxl4o6eI5UD2WP0B+dZXZ3XVy6kvNFTVdrFPHMG/1EkvMAgH0o9k/Tqx2r6LqL/0n/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <span
            className={`inline-block text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded mb-1.5 ${
              listing.type === "pronajem" ? "badge-rent" : "badge-sale"
            }`}
          >
            {listing.type === "pronajem" ? "PRONÁJEM" : "PRODEJ"}
          </span>
          <p className="text-white font-heading text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {listing.title}
          </p>
          {listing.price && (
            <p className="text-primary text-sm font-semibold mt-1">{listing.price}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
