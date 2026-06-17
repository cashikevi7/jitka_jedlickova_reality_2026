/** Obrázek může být lokální soubor v `public/images/properties/<slug>/` nebo absolutní URL (např. Reality Proradost). */
export function resolvePropertyImageSrc(image: string, slug: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return `/images/properties/${slug}/${image}`;
}

export function getListingCoverSrc(slug: string, images: readonly string[]): string {
  const file = images[0];
  return file ? resolvePropertyImageSrc(file, slug) : `/images/properties/${slug}/01.jpg`;
}
