"use client";

import dynamic from "next/dynamic";

const PropertyMapInner = dynamic(
  () => import("./PropertyMapInner"),
  { ssr: false }
);

interface PropertyMapProps {
  readonly mapKey: string;
  readonly lat: number;
  readonly lng: number;
  readonly title: string;
}

export default function PropertyMap({ mapKey, lat, lng, title }: PropertyMapProps) {
  return (
    <div className="mb-10">
      <h2 className="font-heading text-lg font-semibold text-dark mb-4">
        Poloha nemovitosti
      </h2>
      <PropertyMapInner key={mapKey} lat={lat} lng={lng} title={title} />
    </div>
  );
}
