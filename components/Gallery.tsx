"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { Expand } from "lucide-react";
import { resolvePropertyImageSrc } from "@/lib/property-images";
import "photoswipe/style.css";

const PSWP_W = 1600;
const PSWP_H = 1067;

interface GalleryProps {
  readonly images: string[];
  readonly slug: string;
  readonly title: string;
}

export default function Gallery({ images, slug, title }: GalleryProps) {
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);

  useEffect(() => {
    if (lightboxRef.current) {
      lightboxRef.current.destroy();
    }

    lightboxRef.current = new PhotoSwipeLightbox({
      gallery: `#gallery-${slug}`,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightboxRef.current.init();

    return () => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
    };
  }, [slug, images]);

  if (images.length === 0) return null;

  const heroSrc = resolvePropertyImageSrc(images[0], slug);

  let countLabel: string;
  if (images.length === 1) countLabel = "1 fotka";
  else if (images.length < 5) countLabel = `${images.length} fotky`;
  else countLabel = `${images.length} fotek`;

  return (
    <div className="mb-12">
      {/* PhotoSwipe: gallery + children "a" = všechny <a> uvnitř tohoto kořene (pořadí = snímky). ID jen na tomto seznamu, ne na širším obalu sekce. */}
      <ul id={`gallery-${slug}`} className="space-y-5 list-none m-0 p-0">
        <li className="block">
          <div className="relative group rounded-xl overflow-hidden bg-surface shadow-lg ring-1 ring-black/5">
            <a
              href={heroSrc}
              data-pswp-width={PSWP_W}
              data-pswp-height={PSWP_H}
              className="block aspect-16/10 md:aspect-21/9 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary relative cursor-zoom-in"
              aria-label={`Otevřít galerii — ${countLabel}, začít prvním snímkem`}
            >
              <Image
                src={heroSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                priority
              />
            </a>
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 via-black/20 to-transparent pt-16 pb-4 px-4 flex items-end justify-between"
              aria-hidden
            >
              <span className="text-white/95 text-sm font-medium tracking-wide">{countLabel}</span>
              <span className="flex items-center gap-2 text-white/95 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:opacity-100">
                <Expand className="w-4 h-4" aria-hidden />
                Prohlédnout galerii
              </span>
            </div>
          </div>
        </li>

        {images.length > 1 && (
          <li className="block">
            <div className="relative">
              <ul
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scroll-smooth scrollbar-thin list-none m-0 p-0"
                style={{
                  scrollbarGutter: "stable",
                  maskImage:
                    "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
                }}
                aria-label="Náhledy fotek"
              >
                {images.map((img, index) => {
                  const thumbSrc = resolvePropertyImageSrc(img, slug);
                  const isFirst = index === 0;
                  const tileClass = `block w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-surface cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 relative ${
                    index === 0
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background opacity-90 hover:opacity-100"
                  }`;

                  if (isFirst) {
                    return (
                      <li key={`${img}-${index}`} className="shrink-0 snap-center">
                        <div className={tileClass} aria-hidden tabIndex={-1}>
                          <Image
                            src={thumbSrc}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover"
                            loading="eager"
                          />
                        </div>
                      </li>
                    );
                  }

                  return (
                    <li key={`${img}-${index}`} className="shrink-0 snap-center">
                      <a
                        href={thumbSrc}
                        data-pswp-width={PSWP_W}
                        data-pswp-height={PSWP_H}
                        className={tileClass}
                        aria-label={`Foto ${index + 1} z ${images.length}`}
                      >
                        <Image
                          src={thumbSrc}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                          loading={index < 8 ? "eager" : "lazy"}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
