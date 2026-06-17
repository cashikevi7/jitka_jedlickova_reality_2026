# Designové tokeny — Mamka Reality

Cíl: důvěryhodná rodinná realitka, 40+, čitelnost a klid. Žádný cirkus — čistota, rytmus, dost bílého místa, jasná výzva k akci.

## Barevná paleta (hex)

| Token             | Hex        | Použití                         |
|-------------------|------------|---------------------------------|
| background        | `#faf9f7`  | Pozadí stránky                  |
| card              | `#ffffff`  | Karty, hlavička a patička       |
| surface           | `#f4f3f0`  | Sekundární plochy, filtry       |
| border            | `#e6e4e1`  | Ohraničení                      |
| border-hover      | `#d2cfc9`  | Při najetí na kartu             |
| primary           | `#8f6b47`  | CTA, prodej, akcent             |
| primary-hover     | `#7a5a3a`  | Při najetí na primární tlačítko |
| primary-light     | `#ebe4dc`  | Badge prodej, sekundární        |
| accent-rent       | `#556270`  | Pronájem                        |
| accent-rent-light | `#e4e8ec`  | Badge pronájem                  |
| dark              | `#1c1d20`  | Hlavní text                     |
| muted             | `#5a5c5f`  | Sekundární text                 |

## Typografie

- **Nadpisy:** Playfair Display (serif), font-weight 600, řádkování 1.2–1.25  
- **Tělo textu:** Inter, 1rem, řádkování 1.65  
- **Perex / úvodní odstavec:** 1.125rem, řádkování 1.55  
- **Drobný text:** 0.875rem, řádkování 1.5  
- **H1 (Hero):** clamp(1.75rem, 4vw, 2.75rem), řádkování 1.2  
- **H2 (sekce):** clamp(1.5rem, 2.5vw, 1.875rem)

## Mezery a rozestupy

- Sekce: `py-20 md:py-28` (5rem / 6.5rem)  
- Mezi bloky v sekci: `gap-8` až `gap-12`  
- Odsazení při scrollu (pevná navigace): `scroll-padding-top: 5rem`

## Animace a přechody

- Přechody: 280 ms, ease-out `cubic-bezier(0.33, 1, 0.68, 1)`  
- Karty: při najetí → lehký stín + posun `translateY(-2px)` (vypnuto při `prefers-reduced-motion`)  
- Obrázek v kartě: při najetí → lehké zvětšení `scale(1.02)`  
- Hero text: jemný nástup (fade-in nahoru) s krátkým zpožděním (vypnuto při reduced-motion)  
- Plynulé scrollování: `scroll-behavior: smooth` (vypnuto při reduced-motion)

Tokeny jsou definované v `app/globals.css` (@theme a @layer components).
