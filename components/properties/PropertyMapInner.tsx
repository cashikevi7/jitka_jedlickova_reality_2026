"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const GOLD = "#C17F59";
const GOLD_DARK = "#A86540";

function createGoldIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
      <path fill="${GOLD}" stroke="${GOLD_DARK}" stroke-width="1.5" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"/>
      <circle fill="white" cx="12" cy="12" r="5" opacity="0.9"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "property-map-marker",
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });
}

const goldIcon = createGoldIcon();

interface PropertyMapInnerProps {
  readonly lat: number;
  readonly lng: number;
  readonly title: string;
}

export default function PropertyMapInner({ lat, lng, title }: PropertyMapInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pokud v tomto kontejneru už mapa existuje, nejdřív ji zrušíme (např. Strict Mode remount)
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(container).setView([lat, lng], 15);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
    marker.bindPopup(title);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, title]);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full rounded-xl shadow-lg border border-border z-0"
      style={{ minHeight: 400 }}
    />
  );
}
