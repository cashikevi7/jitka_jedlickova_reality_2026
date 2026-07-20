"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const TERRACOTTA = "#C17F59";
const TERRACOTTA_DARK = "#A86540";

function createTerracottaIcon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path fill="${TERRACOTTA}" stroke="${TERRACOTTA_DARK}" stroke-width="1.5" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"/>
      <circle fill="white" cx="12" cy="12" r="5" opacity="0.9"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "property-map-marker",
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
}

const terracottaIcon = createTerracottaIcon();

interface Marker {
  lat: number;
  lng: number;
  title: string;
  slug: string;
  price: string;
}

interface MapSectionInnerProps {
  markers: Marker[];
}

export default function MapSectionInner({ markers }: MapSectionInnerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || markers.length === 0) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const centerLat = markers[0]?.lat ?? 49.0;
    const centerLng = markers[0]?.lng ?? 16.3;

    const map = L.map(container).setView([centerLat, centerLng], 10);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const bounds = L.latLngBounds(
      markers.map((m) => [m.lat, m.lng] as L.LatLngTuple)
    );

    markers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], { icon: terracottaIcon }).addTo(
        map
      );
      marker.bindPopup(
        `<div style="font-family: system-ui; padding: 4px 0;">
          <strong style="font-size: 14px; color: #2C2416;">${m.title}</strong>
          ${m.price ? `<br/><span style="font-size:13px;color:${TERRACOTTA};font-weight:600;">${m.price}</span>` : ""}
          <br/><a href="/nabidka/${m.slug}" style="font-size:12px;color:${TERRACOTTA};text-decoration:underline;">Zobrazit detail</a>
        </div>`
      );
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [markers]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full z-0"
      style={{ minHeight: 300 }}
    />
  );
}
