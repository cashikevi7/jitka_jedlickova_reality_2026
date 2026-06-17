import type { PropertyListing, ListingType } from "@/lib/property-types";

import listingsData from "@/data/listings.json";

const LISTINGS: PropertyListing[] = listingsData as PropertyListing[];

export type { ListingType, PropertyListing };
export const PROPERTIES = LISTINGS;

export function getListingBySlug(slug: string): PropertyListing | null {
  return LISTINGS.find((p) => p.slug === slug) ?? null;
}
