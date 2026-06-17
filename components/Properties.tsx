"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { PROPERTIES, type ListingType } from "@/lib/properties-data";
import { resolvePropertyImageSrc } from "@/lib/property-images";

const TABS: { value: "vse" | ListingType; label: string }[] = [
  { value: "vse", label: "Vše" },
  { value: "prodej", label: "Prodej" },
  { value: "pronajem", label: "Pronájem" },
];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

function getImageSrc(slug: string, images: readonly string[]) {
  const file = images[0];
  return file
    ? resolvePropertyImageSrc(file, slug)
    : `/images/properties/${slug}/01.jpg`;
}

function PropertyImage({
  slug,
  images,
  title,
}: {
  readonly slug: string;
  readonly images: readonly string[];
  readonly title: string;
}) {
  const [src, setSrc] = useState(getImageSrc(slug, images));
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isLoading ? "blur-sm scale-105" : "blur-0"}`}
        onError={() => setSrc(PLACEHOLDER_IMAGE)}
        onLoad={() => setIsLoading(false)}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURAAYhMRJBE1Fh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANJT6dra63SU1PBI6xSH1WqTlVPsD51j1OmrTBDRUkVFFDFT9MRxgBQM6c7q6y6e6dpKmjivFRNVTxl4o6eI5UD2WP0B+dZXZ3XVy6kvNFTVdrFPHMG/1EkvMAgH0o9k/Tqx2r6LqL/0n/9k="
      />
    </>
  );
}

function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorite-properties");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorite-properties", JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  return { favorites: mounted ? favorites : [], toggleFavorite };
}

function parsePrice(priceStr: string | undefined): number | null {
  if (!priceStr) return null;
  const cleaned = priceStr.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : null;
}

function MapSection({ properties }: { properties: typeof PROPERTIES }) {
  const [showMap, setShowMap] = useState(false);

  const markers = useMemo(() => {
    return properties
      .filter((p) => p.coordinates)
      .map((p) => ({
        lat: p.coordinates!.lat,
        lng: p.coordinates!.lng,
        title: p.title,
        slug: p.slug,
        price: p.price,
      }));
  }, [properties]);

  if (markers.length === 0) return null;

  const centerLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
  const centerLng = markers.reduce((sum, m) => sum + m.lng, 0) / markers.length;

  return (
    <div className="mt-8">
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
          style={{
            background: showMap
              ? "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)"
              : "rgba(255,255,255,0.1)",
            color: showMap ? "#1a1a2e" : "white",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          {showMap ? "Skrýt mapu" : "Zobrazit na mapě"}
        </button>
        <p className="text-xs text-white/50 mt-2">Statická mapa - pro interaktivní mapu klikněte na detail nemovitosti</p>

      {showMap && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 400 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <iframe
            title="Nemovitosti na mapě"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${centerLng - 0.1}%2C${centerLat - 0.1}%2C${centerLng + 0.1}%2C${centerLat + 0.1}&layer=mapnik&marker=${centerLat}%2C${centerLng}`}
          />
        </motion.div>
      )}
    </div>
  );
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
    let result = filter === "vse" ? PROPERTIES : PROPERTIES.filter((p) => p.type === filter);

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
        if (roomsFilter !== "4+" && r !== parseInt(roomsFilter, 10)) return false;
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
    <section id="nabidka" className="py-20 md:py-28" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="section-title" style={{ color: 'white' }}>Moje nabídka nemovitostí</h2>
        <p className="section-lead mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Aktuální nabídka v regionu Znojmo a Moravský Krumlov.
        </p>

        <div
          className="flex gap-1 p-1 rounded-lg w-fit mb-6"
          role="tablist"
          aria-label="Filtr typu nabídky"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={filter === tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-280 cursor-pointer ${
                filter === tab.value
                  ? "text-white shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
              style={filter === tab.value ? {
                background: 'linear-gradient(135deg, #c9a227 0%, #e6b800 100%)',
                color: '#1a1a2e',
                boxShadow: '0 4px 12px rgba(201, 162, 39, 0.3)',
              } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-6 transition-all duration-300 cursor-pointer"
          style={{
            background: showFilters || activeFiltersCount > 0
              ? "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)"
              : "rgba(255,255,255,0.1)",
            color: showFilters || activeFiltersCount > 0 ? "#1a1a2e" : "white",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Pokročilé filtry
          {activeFiltersCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs" style={{ background: "#1a1a2e", color: "#c9a227" }}>
              {activeFiltersCount}
            </span>
          )}
        </button>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <div>
              <label className="block text-xs text-white/60 mb-2">Cena od (Kč)</label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="např. 1000000"
                className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/40"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-2">Cena do (Kč)</label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="např. 5000000"
                className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/40"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-2">Velikost od (m²)</label>
              <input
                type="number"
                value={sizeMin}
                onChange={(e) => setSizeMin(e.target.value)}
                placeholder="např. 50"
                className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/40"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-2">Velikost do (m²)</label>
              <input
                type="number"
                value={sizeMax}
                onChange={(e) => setSizeMax(e.target.value)}
                placeholder="např. 100"
                className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/40"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-2">Počet místností</label>
              <select
                value={roomsFilter}
                onChange={(e) => setRoomsFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm text-white"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
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
                  className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Vymazat filtry
                </button>
              </div>
            )}
          </motion.div>
        )}

        <MapSection properties={filtered} />

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 mb-4">Žádné nemovitosti neodpovídají filtrům.</p>
            <button
              onClick={() => {
                setFilter("vse");
                setPriceMin("");
                setPriceMax("");
                setSizeMin("");
                setSizeMax("");
                setRoomsFilter("");
              }}
              className="px-6 py-2 rounded-lg text-sm font-medium cursor-pointer"
              style={{ background: "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)", color: "#1a1a2e" }}
            >
              Zobrazit všechny
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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
                  className="group block relative overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '1rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <div className="aspect-4/3 bg-surface relative overflow-hidden" style={{ borderRadius: '1rem 1rem 0 0' }}>
                    <PropertyImage
                      slug={item.slug}
                      images={item.images}
                      title={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(item.slug);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full transition-all duration-300 cursor-pointer z-10"
                      style={{
                        background: favorites.includes(item.slug)
                          ? "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)"
                          : "rgba(255,255,255,0.9)",
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                      aria-label={favorites.includes(item.slug) ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={favorites.includes(item.slug) ? "white" : "none"}
                        stroke={favorites.includes(item.slug) ? "white" : "#1a1a2e"}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    <span
                      className={`absolute top-3 left-3 ${item.type === "pronajem" ? "badge-rent" : "badge-sale"}`}
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
                    >
                      {item.type === "pronajem" ? "K pronájmu" : "K prodeji"}
                    </span>

                    {item.virtualTour && (
                      <span
                        className="absolute top-[4.5rem] right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        3D
                      </span>
                    )}
                  </div>
                  <div className="p-5" style={{ background: 'transparent' }}>
                    <h3 className="font-heading text-base font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300" style={{ lineHeight: "var(--text-h3-line)", textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm flex items-center gap-1" style={{ lineHeight: "var(--text-small-line)" }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {item.location}
                    </p>
                    
                    <div className="flex gap-3 mt-2">
                      {item.rooms && (
                        <span className="text-xs text-white/60 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          {item.rooms}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-xs text-white/60 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          {item.size} m²
                        </span>
                      )}
                    </div>

                    {item.price && (
                      <p className="text-primary font-semibold text-sm mt-3" style={{ lineHeight: "var(--text-small-line)", textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        {item.price}
                      </p>
                    )}
                    
                    <span className="inline-block mt-4 text-white text-sm font-medium group-hover:opacity-90 transition-opacity duration-280 flex items-center gap-1">
                      Zobrazit detail
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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