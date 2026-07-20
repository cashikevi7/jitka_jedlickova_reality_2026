"use client";

import { PROPERTIES } from "@/lib/properties-data";
import { getListingCoverSrc } from "@/lib/property-images";
import Image from "next/image";
import Link from "next/link";

/**
 * "Vybráno Jitkou" — kurátorský výběr nemovitostí s osobním komentářem.
 * Unikátní prvek, který běžné realitní weby nemají.
 *
 * V produkci by se výběr spravoval přes CMS. Pro MVP vybíráme první 3
 * nemovitosti z dat a přidáváme ke každé osobní komentář.
 */

const PICKS = [
  {
    slug: PROPERTIES[0]?.slug ?? "",
    comment:
      "Tahle nemovitost má výjimečnou atmosféru — jakmile jsem do ní vstoupila, věděla jsem, že tady bude chtít někdo bydlet.",
  },
  ...(PROPERTIES[1]
    ? [
      {
        slug: PROPERTIES[1].slug,
        comment:
          "Lokalita je naprosto skvělá — klidná ulice, všechno blízko, a přitom soukromí. Přesně to, co klienti hledají.",
      },
    ]
    : []),
  ...(PROPERTIES[2]
    ? [
      {
        slug: PROPERTIES[2].slug,
        comment:
          "Poměr ceny a kvality je tady výborný. Kdybych hledala já, tuhle nemovitost bych si šla prohlédnout jako první.",
      },
    ]
    : []),
];

export default function CuratedPicks() {
  /* Namapuj slugy na reálné listingy */
  const picks = PICKS.map((pick) => {
    const listing = PROPERTIES.find((p) => p.slug === pick.slug);
    return listing ? { listing, comment: pick.comment } : null;
  }).filter(Boolean) as {
    listing: (typeof PROPERTIES)[number];
    comment: string;
  }[];

  if (picks.length === 0) return null;

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "var(--color-cream)" }}
      aria-label="Vybráno Jitkou – doporučené nemovitosti"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="section-label">Vybráno Jitkou</p>
        <h2 className="section-title mb-2">
          Osobně doporučuji — vybrala bych si je sama
        </h2>
        <p className="section-lead mb-12 max-w-xl">
          Nejsou to nejdražší ani největší nemovitosti. Jsou to ty, které mají
          duši — a věřím, že by se vám v&nbsp;nich dobře žilo.
        </p>

        <div className="space-y-8 md:space-y-10">
          {picks.map(({ listing, comment }) => {
            const isRent = listing.type === "pronajem";
            const imgSrc =
              getListingCoverSrc(listing.slug, listing.images) ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

            return (
              <Link
                key={listing.slug}
                href={`/nabidka/${listing.slug}`}
                prefetch={false}
                className="group grid md:grid-cols-12 gap-6 p-5 md:p-6 rounded-2xl card card-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: "var(--color-terracotta)" }}
              >
                {/* Foto */}
                <div className="md:col-span-4 relative aspect-4/3 md:aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={listing.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={isRent ? "badge-rent" : "badge-sale"}>
                      {isRent ? "K pronájmu" : "K prodeji"}
                    </span>
                  </div>
                </div>

                {/* Obsah */}
                <div className="md:col-span-8 flex flex-col justify-center">
                  <h3
                    className="font-heading text-lg md:text-xl font-semibold mb-1 group-hover:opacity-80 transition-opacity"
                    style={{ color: "var(--color-espresso)" }}
                  >
                    {listing.title}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {listing.location}
                    {listing.rooms && ` · ${listing.rooms}`}
                    {listing.size && ` · ${listing.size} m²`}
                  </p>

                  {/* Osobní komentář */}
                  <div
                    className="flex items-start gap-3 p-4 rounded-xl mb-3"
                    style={{ background: "var(--color-terracotta-light)" }}
                  >
                    <span
                      className="text-2xl leading-none shrink-0"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-terracotta)",
                      }}
                    >
                      &ldquo;
                    </span>
                    <p
                      className="text-sm leading-relaxed italic"
                      style={{ color: "var(--color-espresso)" }}
                    >
                      {comment}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {listing.price && (
                      <p
                        className="font-heading text-lg font-semibold"
                        style={{ color: "var(--color-terracotta)" }}
                      >
                        {listing.price}
                      </p>
                    )}
                    <span
                      className="inline-flex items-center gap-1 text-sm font-medium transition-all duration-300"
                      style={{ color: "var(--color-terracotta)" }}
                    >
                      Zobrazit detail
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
