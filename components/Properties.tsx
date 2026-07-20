"use client";

import MapSection from "@/components/properties/MapSection";
import { ListingType, PROPERTIES } from "@/lib/properties-data";
import { getListingCoverSrc } from "@/lib/property-images";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const TABS = [
  { value: "vse" as const, label: "Vše" },
  { value: "prodej" as const, label: "Prodej" },
  { value: "pronajem" as const, label: "Pronájem" },
];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

function getImageSrc(slug: string, images: string[] | undefined): string {
  return getListingCoverSrc(slug, images ?? []) || PLACEHOLDER_IMAGE;
}

function PropertyImage({
  slug,
  images,
  title,
}: {
  slug: string;
  images: string[] | undefined;
  title: string;
}) {
  const [src, setSrc] = useState(getImageSrc(slug, images));
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      src={src}
      alt={`${title} - úvodní fotografie`}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={`object-cover transition-all duration-500 group-hover:scale-[1.03] ${isLoading ? "blur-sm scale-105" : "blur-0"
        }`}
      onError={() => setSrc(PLACEHOLDER_IMAGE)}
      onLoad={() => setIsLoading(false)}
    />
  );
}

function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("mamka-favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    const newFavorites = favorites.includes(slug)
      ? favorites.filter((f) => f !== slug)
      : [...favorites, slug];
    setFavorites(newFavorites);
    try {
      localStorage.setItem("mamka-favorites", JSON.stringify(newFavorites));
    } catch {
      /* ignore */
    }
  };

  return { favorites: mounted ? favorites : [], toggleFavorite };
}

function parsePrice(price: string | undefined): number | null {
  if (!price) return null;
  const cleaned = price.replace(/\s/g, "").replace(/[^\d]/g, "");
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? null : num;
}

export default function Properties() {
  const [filter, setFilter] = useState<"vse" | ListingType>("vse");
  const { favorites, toggleFavorite } = useFavorites();

  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sizeMin, setSizeMin] = useState("");
  const [sizeMax, setSizeMax] = useState("");
  const [roomsFilter, setRoomsFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result =
      filter === "vse"
        ? PROPERTIES
        : PROPERTIES.filter((p) => p.type === filter);

    result = result.filter((p) => {
      const price = parsePrice(p.price);
      if (price && priceMin && price < parseInt(priceMin, 10)) return false;
      if (price && priceMax && price > parseInt(priceMax, 10)) return false;

      const size = p.size ? parseInt(p.size, 10) : null;
      if (size && sizeMin && size < parseInt(sizeMin, 10)) return false;
      if (size && sizeMax && size > parseInt(sizeMax, 10)) return false;

      if (roomsFilter && p.rooms) {
        const r = parseInt(p.rooms, 10);
        if (roomsFilter === "4+" && r < 4) return false;
        if (roomsFilter !== "4+" && r !== parseInt(roomsFilter, 10))
          return false;
      }

      return true;
    });

    return result;
  }, [filter, priceMin, priceMax, sizeMin, sizeMax, roomsFilter]);

  const activeFiltersCount = [
    priceMin || priceMax,
    sizeMin || sizeMax,
    roomsFilter,
  ].filter(Boolean).length;

  return (
    <section
      id="nabidka"
      className="py-20 md:py-28"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="section-label">Nabídka nemovitostí</p>
        <h2 className="section-title mb-2">Najděte svůj nový domov</h2>
        <p className="section-lead mb-10">
          Aktuální nabídka v regionu Znojmo a Moravský Krumlov.
        </p>

        {/* Segmentovaný přepínač Prodej/Pronájem/Vše */}
        <div
          className="inline-flex gap-0.5 p-1 rounded-xl mb-6"
          role="tablist"
          aria-label="Filtr typu nabídky"
          style={{
            background: "var(--color-sand)",
            border: "1px solid var(--color-clay)",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={filter === tab.value}
              onClick={() => setFilter(tab.value)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
              style={
                filter === tab.value
                  ? {
                    background: "var(--color-terracotta)",
                    color: "white",
                    boxShadow: "0 2px 8px rgba(193,127,89,0.3)",
                  }
                  : {
                    color: "var(--color-muted)",
                  }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pokročilé filtry toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium mb-6 transition-all duration-300 cursor-pointer ml-2"
          style={{
            background: showFilters
              ? "var(--color-terracotta-light)"
              : "var(--color-sand)",
            color: showFilters
              ? "var(--color-terracotta)"
              : "var(--color-muted)",
            border: "1px solid var(--color-clay)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Pokročilé filtry
          {activeFiltersCount > 0 && (
            <span
              className="ml-1 w-5 h-5 rounded-full text-xs inline-flex items-center justify-center font-semibold"
              style={{
                background: "var(--color-terracotta)",
                color: "white",
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </button>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-5 rounded-xl"
            style={{
              background: "var(--color-warm-white)",
              border: "1px solid var(--color-clay)",
            }}
          >
            <div>
              <label
                htmlFor="filter-price-min"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Cena od (Kč)
              </label>
              <input
                id="filter-price-min"
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="např. 1 000 000"
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors"
                style={{
                  borderColor: "var(--color-clay)",
                  background: "var(--color-cream)",
                  color: "var(--color-espresso)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="filter-price-max"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Cena do (Kč)
              </label>
              <input
                id="filter-price-max"
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="např. 5 000 000"
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors"
                style={{
                  borderColor: "var(--color-clay)",
                  background: "var(--color-cream)",
                  color: "var(--color-espresso)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="filter-size-min"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Velikost od (m²)
              </label>
              <input
                id="filter-size-min"
                type="number"
                value={sizeMin}
                onChange={(e) => setSizeMin(e.target.value)}
                placeholder="např. 50"
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors"
                style={{
                  borderColor: "var(--color-clay)",
                  background: "var(--color-cream)",
                  color: "var(--color-espresso)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="filter-size-max"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Velikost do (m²)
              </label>
              <input
                id="filter-size-max"
                type="number"
                value={sizeMax}
                onChange={(e) => setSizeMax(e.target.value)}
                placeholder="např. 100"
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors"
                style={{
                  borderColor: "var(--color-clay)",
                  background: "var(--color-cream)",
                  color: "var(--color-espresso)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="filter-rooms"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--color-muted)" }}
              >
                Počet místností
              </label>
              <select
                id="filter-rooms"
                value={roomsFilter}
                onChange={(e) => setRoomsFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors"
                style={{
                  borderColor: "var(--color-clay)",
                  background: "var(--color-cream)",
                  color: "var(--color-espresso)",
                }}
              >
                <option value="">Vše</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="4+">4 a více</option>
              </select>
            </div>
            {(priceMin || priceMax || sizeMin || sizeMax || roomsFilter) && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setPriceMin("");
                    setPriceMax("");
                    setSizeMin("");
                    setSizeMax("");
                    setRoomsFilter("");
                  }}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                  style={{
                    color: "var(--color-muted)",
                    border: "1px solid var(--color-clay)",
                  }}
                >
                  Vymazat filtry
                </button>
              </div>
            )}
          </motion.div>
        )}

        <MapSection properties={filtered} />

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="mb-4" style={{ color: "var(--color-muted)" }}>
              Žádné nemovitosti neodpovídají filtrům.
            </p>
            <button
              onClick={() => {
                setFilter("vse");
                setPriceMin("");
                setPriceMax("");
                setSizeMin("");
                setSizeMax("");
                setRoomsFilter("");
              }}
              className="btn-primary cursor-pointer"
            >
              Zobrazit všechny
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
            {filtered.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/nabidka/${item.slug}`}
                  prefetch={false}
                  className="group block card card-hover overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: "var(--color-terracotta)" }}
                >
                  {/* Obrázek — 60 % výšky karty */}
                  <div className="relative aspect-4/3 overflow-hidden">
                    <PropertyImage
                      slug={item.slug}
                      images={item.images}
                      title={item.title}
                    />

                    {/* Bookmark */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(item.slug);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300 cursor-pointer z-10"
                      style={{
                        background: favorites.includes(item.slug)
                          ? "var(--color-terracotta)"
                          : "rgba(255,255,255,0.9)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                      }}
                      aria-label={
                        favorites.includes(item.slug)
                          ? "Odebrat z oblíbených"
                          : "Přidat do oblíbených"
                      }
                    >
                      <svg
                        className="w-4.5 h-4.5"
                        fill={
                          favorites.includes(item.slug) ? "white" : "none"
                        }
                        stroke={
                          favorites.includes(item.slug)
                            ? "white"
                            : "var(--color-espresso)"
                        }
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    {/* Badge */}
                    <span
                      className={`absolute top-3 left-3 ${item.type === "pronajem" ? "badge-rent" : "badge-sale"
                        }`}
                      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
                    >
                      {item.type === "pronajem" ? "K pronájmu" : "K prodeji"}
                    </span>

                    {/* 3D prohlídka */}
                    {item.virtualTour && (
                      <span
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-white"
                        style={{
                          background: "var(--color-sage)",
                          boxShadow: "0 2px 8px rgba(139,157,131,0.3)",
                        }}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        3D prohlídka
                      </span>
                    )}
                  </div>

                  {/* Obsah */}
                  <div className="p-5">
                    <h3
                      className="font-heading text-base font-semibold mb-1 group-hover:opacity-80 transition-opacity"
                      style={{ color: "var(--color-espresso)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm flex items-center gap-1 mb-2"
                      style={{ color: "var(--color-muted)" }}
                    >
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {item.location}
                    </p>

                    {/* Atributy */}
                    <div className="flex gap-4 mb-3">
                      {item.rooms && (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          {item.rooms}
                        </span>
                      )}
                      {item.size && (
                        <span
                          className="text-xs flex items-center gap-1"
                          style={{ color: "var(--color-muted)" }}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {item.size} m²
                        </span>
                      )}
                    </div>

                    {/* Cena */}
                    {item.price && (
                      <p
                        className="font-heading text-lg font-semibold mb-3"
                        style={{ color: "var(--color-terracotta)" }}
                      >
                        {item.price}
                      </p>
                    )}

                    {/* Detail link */}
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
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
