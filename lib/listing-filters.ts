import type { ListingCategory, PropertyListing } from "@/lib/property-types";

export type RegionFilter = "vse" | "znojmo" | "moravsky-krumlov" | "okoli";

export type CategoryFilter =
  | "vse"
  | "byt"
  | "dum"
  | "pozemek-zahrada"
  | "garaz"
  | "komerce"
  | "ostatni";

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "");
}

const KNOWN_CATEGORY: Record<ListingCategory, true> = {
  byt: true,
  dum: true,
  "pozemek-zahrada": true,
  garaz: true,
  komerce: true,
  ostatni: true,
};

function inferListingCategoryFromTitle(listing: PropertyListing): Exclude<CategoryFilter, "vse"> {
  const t = norm(listing.title);
  if (t.includes("komercn")) return "komerce";
  if (t.includes("garaz")) return "garaz";
  if (t.includes("zahrada") || t.includes("zahrady") || t.includes("pozemek")) {
    return "pozemek-zahrada";
  }
  if (t.includes("byt")) return "byt";
  if (t.includes("dum") || t.includes("domu") || t.includes("rodinneho")) {
    return "dum";
  }
  return "ostatni";
}

/** Preferuje `listing.category` z dat; jinak heuristika z titulku. */
export function getListingCategory(
  listing: PropertyListing,
): Exclude<CategoryFilter, "vse"> {
  const c = listing.category;
  if (c && KNOWN_CATEGORY[c]) return c;
  return inferListingCategoryFromTitle(listing);
}

/** Z pole lokace v datech. */
export function getListingRegion(
  listing: PropertyListing,
): Exclude<RegionFilter, "vse"> {
  const l = norm(listing.location);
  if (l.includes("znojmo")) return "znojmo";
  if (l.includes("krumlov")) return "moravsky-krumlov";
  return "okoli";
}

export const REGION_OPTIONS: { value: RegionFilter; label: string }[] = [
  { value: "vse", label: "Všechny lokality" },
  { value: "znojmo", label: "Znojmo" },
  { value: "moravsky-krumlov", label: "Moravský Krumlov" },
  { value: "okoli", label: "Okolí regionu" },
];

export const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: "vse", label: "Všechny typy" },
  { value: "byt", label: "Byt" },
  { value: "dum", label: "Rodinný dům" },
  { value: "pozemek-zahrada", label: "Pozemek / zahrada" },
  { value: "garaz", label: "Garáž" },
  { value: "komerce", label: "Komerční" },
  { value: "ostatni", label: "Ostatní" },
];
