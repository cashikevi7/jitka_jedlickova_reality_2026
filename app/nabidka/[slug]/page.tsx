import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { getListingBySlug, PROPERTIES } from "@/lib/properties-data";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Gallery from "@/components/Gallery";
import PropertyMap from "@/components/properties/PropertyMap";
import ShareButton from "@/components/ShareButton";
import MortgageCalculator from "@/components/MortgageCalculator";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  const isRent = listing.type === "pronajem";
  const title = `${listing.title} | ${isRent ? "Pronájem" : "Prodej"} - Mamka Reality`;
  const description = listing.description 
    ? listing.description.slice(0, 160) 
    : `${listing.title} - ${listing.location}, ${listing.price}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.mamka-reality.cz/nabidka/${slug}`,
      type: "website",
    },
  };
}

export default async function ListingPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const isRent = listing.type === "pronajem";
  const badgeClass = isRent ? "badge-rent" : "badge-sale";
  const badgeLabel = isRent ? "K pronájmu" : "K prodeji";
  const allImages = listing.images;

  const priceNumber =
    listing.price != null
      ? Number(listing.price.replaceAll(/\s/g, "").replaceAll(/[^\d]/g, "")) || undefined
      : undefined;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description ?? listing.title,
    ...(priceNumber != null && priceNumber > 0 && {
      offers: {
        "@type": "Offer",
        price: priceNumber,
        priceCurrency: "CZK",
      },
    }),
    ...(listing.coordinates && {
      address: {
        "@type": "PostalAddress",
        addressLocality: listing.location,
        addressCountry: "CZ",
      },
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* suppressHydrationWarning: rozšíření (např. Proton Pass) přidávají data-* na kontejnery */}
      <div className="container mx-auto px-4 max-w-4xl" suppressHydrationWarning>
        <Link
          href="/#nabidka"
          className="inline-flex items-center gap-2 text-muted hover:text-primary text-sm font-medium mb-8 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět na nabídku
        </Link>

        {/* Gallery component with lightbox */}
        <Gallery images={allImages} slug={listing.slug} title={listing.title} />

        {/* Základní informace */}
        <div className="mb-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded mb-3 ${badgeClass}`}>
                {badgeLabel}
              </span>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-dark leading-tight mb-2">
                {listing.title}
              </h1>
              <p className="text-muted mb-4">{listing.location}</p>
              {listing.price && (
                <p className="text-primary font-heading text-xl font-semibold">
                  {listing.price}
                </p>
              )}
            </div>
            <ShareButton
              title={listing.title}
              text={[listing.title, listing.location, listing.price].filter(Boolean).join(" – ")}
            />
          </div>
        </div>
        <JsonLd data={listingSchema} />

        {listing.sourceUrl && (
          <p className="text-sm text-muted mb-8">
            <a
              href={listing.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Kompletní inzerát na Reality Proradost
            </a>
          </p>
        )}

        {/* Popis */}
        {listing.description && (
          <div className="mb-10">
            <h2 className="font-heading text-lg font-semibold text-dark mb-3">
              Popis nemovitosti
            </h2>
            <p className="text-muted leading-relaxed whitespace-pre-line max-w-[65ch]">
              {listing.description}
            </p>
          </div>
        )}

        {/* Kalkulačka splátky (jen prodej) */}
        {!isRent && (
          <div className="mb-10">
            <MortgageCalculator initialPrice={priceNumber ?? 3_000_000} />
          </div>
        )}

        {/* Mapa */}
        {listing.coordinates && (
          <PropertyMap
            mapKey={listing.slug}
            lat={listing.coordinates.lat}
            lng={listing.coordinates.lng}
            title={listing.title}
          />
        )}

        {/* CTA kontakt */}
        <div className="border-t border-gray-200 pt-8">
          <p className="font-heading text-dark font-semibold mb-4">
            Mám zájem o nemovitost
          </p>
          <p className="text-muted text-sm mb-4">
            Napište nebo zavolejte — odpovím obvykle do 24 hodin.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+420608713632"
              className="btn-primary cursor-pointer inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              +420 608 713 632
            </a>
            <a
              href="mailto:jedlickova@reality-proradost.cz"
              className="btn-secondary cursor-pointer inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Napsat e-mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}