"use client";

import type { PROPERTIES } from "@/lib/properties-data";
import dynamic from "next/dynamic";
import { useState } from "react";

/* Leaflet vyžaduje window; dynamicky importováno */
const MapComponent = dynamic(
  () => import("@/components/properties/MapSectionInner"),
  { ssr: false }
);

interface MapSectionProps {
  properties: typeof PROPERTIES;
}

export default function MapSection({ properties }: MapSectionProps) {
  const [showMap, setShowMap] = useState(false);

  /* Vytvoř markery pro nemovitosti, které mají souřadnice */
  const markers = properties
    .filter((p) => p.coordinates?.lat && p.coordinates?.lng)
    .map((p) => ({
      lat: p.coordinates!.lat,
      lng: p.coordinates!.lng,
      title: p.title,
      slug: p.slug,
      price: p.price ?? "",
    }));

  if (markers.length === 0) return null;

  return (
    <div className="mb-10">
      <button
        onClick={() => setShowMap(!showMap)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer"
        style={{
          background: showMap
            ? "var(--color-terracotta-light)"
            : "var(--color-sand)",
          color: showMap
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
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {showMap ? "Skrýt mapu" : "Zobrazit na mapě"}
      </button>

      {showMap && (
        <div
          className="mt-4 rounded-xl overflow-hidden"
          style={{ height: "380px", border: "1px solid var(--color-clay)" }}
        >
          <MapComponent markers={markers} />
        </div>
      )}
    </div>
  );
}
