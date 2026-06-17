export type ListingType = "prodej" | "pronajem";

export type ListingCategory =
  | "byt"
  | "dum"
  | "pozemek-zahrada"
  | "garaz"
  | "komerce"
  | "ostatni";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PropertyListing {
  slug: string;
  title: string;
  location: string;
  type: ListingType;
  category?: ListingCategory;
  price?: string;
  description?: string;
  images: string[];
  rooms?: string;
  size?: string;
  coordinates?: Coordinates;
  virtualTour?: string;
  /** Odkaz na detail inzerátu u zprostředkovatele */
  sourceUrl?: string;
}
