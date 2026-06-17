"use client";

import { usePathname } from "next/navigation";
import Hero from "@/components/Hero";

/** Renders the hero only on `/` so it can live as a sibling before `<main>` (layout). */
export default function HomeHero() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <Hero />;
}
