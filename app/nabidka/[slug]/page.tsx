import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import MortgageCalculator from "@/components/MortgageCalculator";
import PropertyMap from "@/components/properties/PropertyMap";
import ShareButton from "@/components/ShareButton";
import { getListingBySlug, PROPERTIES } from "@/lib/properties-data";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 3600;

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
      ? Number(
        listing.price.replaceAll(/\s/g, "").replaceAll(/[^\d]/g, "")
      ) || undefined
      : undefined;

  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description ?? listing.title,
    ...(priceNumber != null &&
      priceNumber > 0 && {
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
    <div className="min-h-screen" style={{ background: "var(--color-cream)" }}>
      <div className="container mx-auto px-4 max-w-4xl pt-28" suppressHydrationWarning>
        <Link
          href="/#nabidka"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors duration-200 cursor-pointer"
          style={{ color: "var(--color-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět na nabídku
        </Link>

        {/* Gallery */}
        <Gallery images={allImages} slug={listing.slug} title={listing.title} />

        {/* Základní informace */}
        <div className="mb-10 mt-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span
                className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded mb-3 ${badgeClass}`}
              >
                {badgeLabel}
              </span>
              <h1
                className="font-heading text-2xl md:text-3xl font-semibold leading-tight mb-2"
                style={{ color: "var(--color-espresso)" }}
              >
                {listing.title}
              </h1>
              <p style={{ color: "var(--color-muted)" }} className="mb-4">
                {listing.location}
              </p>
              {listing.price && (
                <p
                  className="font-heading text-xl font-semibold"
                  style={{ color: "var(--color-terracotta)" }}
                >
                  {listing.price}
                </p>
              )}
            </div>
            <ShareButton
              title={listing.title}
              text={[listing.title, listing.location, listing.price]
                .filter(Boolean)
                .join(" – ")}
            />
          </div>
        </div>
        <JsonLd data={listingSchema} />

        {listing.sourceUrl && (
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
            <a
              href={listing.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "var(--color-terracotta)" }}
            >
              Kompletní inzerát na Reality Proradost
            </a>
          </p>
        )}

        {/* Popis */}
        {listing.description && (
          <div className="mb-10">
            <h2
              className="font-heading text-lg font-semibold mb-3"
              style={{ color: "var(--color-espresso)" }}
            >
              Popis nemovitosti
            </h2>
            <p
              className="leading-relaxed whitespace-pre-line max-w-[65ch]"
              style={{ color: "var(--color-muted)" }}
            >
              {listing.description}
            </p>
          </div>
        )}

        {/* Klíčové parametry — přehledná karta */}
        <div
          className="mb-10 p-6 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{
            background: "var(--color-warm-white)",
            border: "1px solid var(--color-clay)",
          }}
        >
          {listing.rooms && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-muted-light)" }}>
                Dispozice
              </p>
              <p className="font-heading text-lg font-semibold" style={{ color: "var(--color-espresso)" }}>
                {listing.rooms}
              </p>
            </div>
          )}
          {listing.size && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-muted-light)" }}>
                Plocha
              </p>
              <p className="font-heading text-lg font-semibold" style={{ color: "var(--color-espresso)" }}>
                {listing.size} m²
              </p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-muted-light)" }}>
              Typ
            </p>
            <p className="font-heading text-lg font-semibold" style={{ color: "var(--color-espresso)" }}>
              {isRent ? "Pronájem" : "Prodej"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--color-muted-light)" }}>
              Lokalita
            </p>
            <p className="font-heading text-lg font-semibold" style={{ color: "var(--color-espresso)" }}>
              {listing.location}
            </p>
          </div>
        </div>

        {/* Osobní komentář Jitky */}
        <div
          className="mb-10 p-6 md:p-8 rounded-2xl"
          style={{
            background: "var(--color-terracotta-light)",
            border: "1px solid var(--color-clay)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 mt-0.5"
              style={{
                border: "2px solid var(--color-terracotta)",
                boxShadow: "0 4px 12px rgba(193, 127, 89, 0.2)",
              }}
            >
              <Image
                src="/images/Jitka/jitka1.webp"
                alt="Jitka Jedličková"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--color-terracotta)" }}
              >
                Proč se mi tahle nemovitost líbí
              </p>
              <p
                className="leading-relaxed"
                style={{ color: "var(--color-espresso)" }}
              >
                {listing.personalNote ||
                  "Tato nemovitost má duši — je cítit, že v ní někdo žil rád. Líbí se mi její poloha, světlo a potenciál, který v ní vidím. Ráda vám ji ukážu osobně."}
              </p>
              <p
                className="mt-3 text-sm italic"
                style={{
                  fontFamily: "var(--font-script), cursive",
                  color: "var(--color-terracotta)",
                  fontSize: "1.25rem",
                }}
              >
                Jitka
              </p>
            </div>
          </div>
        </div>

        {/* Kalkulačka splátky */}
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
        <div
          className="mt-10 pt-8"
          style={{ borderTop: "1px solid var(--color-clay)" }}
        >
          <p
            className="font-heading font-semibold mb-2 text-lg"
            style={{ color: "var(--color-espresso)" }}
          >
            Mám zájem o tuto nemovitost
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
            Napište nebo zavolejte — odpovím obvykle do 24 hodin.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+420608713632"
              className="btn-primary inline-flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              +420 608 713 632
            </a>
            <a
              href="mailto:jedlickova@reality-proradost.cz"
              className="btn-secondary inline-flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              Napsat e-mail
            </a>
          </div>
        </div>

        {/* Spodní padding */}
        <div className="pb-20" />
      </div>
    </div>
  );
}
