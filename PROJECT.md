# Mamka Reality — kontext projektu pro agenty

Tento soubor je vstupní bod pro AgenticSeek, Cursor, OpenCode nebo jiné agenty. Přečti ho na začátku práce s repozitářem. V kořeni je také **docker-compose.yml** (úvodní komentář obsahuje krátký kontext projektu) a **.agenticseek/context.md** (shrnutí pro AgenticSeek).

---

## O projektu

**Mamka Reality** — osobní web realitní makléřky Jitky Jedličkové (rodinný byznys, smluvní partner Reality Proradost s.r.o.). Statický marketingový web, jedna hlavní stránka + detail nabídek.

---

## Designový cíl

**„Pastva a zážitek pro oči či duši.“** Ambice: jeden z nejhezčích realitních webů (ČR i svět), ne generická šablona. Každá změna má zvyšovat úroveň vzhledu, čitelnosti a důvěry.

---

## Stack

- **Next.js 15** (App Router), **`output: "standalone"`** — SSG stránky + dynamické API (např. `/api/chat` pro AI asistenta)
- **React 18**, **Tailwind CSS v4**, **Framer Motion**, **PhotoSwipe**, **Leaflet**, **Lucide**, **Google Fonts**
- Produkční Node server: `next start` nebo Docker (standalone). Čistý statický export (`out/`) už se nepoužívá.

---

## Struktura repozitáře

| Složka / soubor | Popis |
|-----------------|--------|
| **app/** | `layout.tsx` (fonty, metadata, Navbar + Footer), `page.tsx` (složení sekcí), `globals.css` (Tailwind @theme, barvy, fonty), `nabidka/[slug]/page.tsx` (detail nemovitosti) |
| **components/** | Hero, Stats, Services, Properties, About, Testimonials, HowItWorks, Contact, Navbar, Footer, Gallery — jedna sekce = jeden soubor; kde je potřeba motion/state, je `"use client"` |
| **lib/** | `properties-data.ts` — centrální data nabídek (slug, title, location, type, url). Obrázky nemovitostí: `public/images/properties/<slug>/`. Profilové obrázky: `public/images/Jitka/` |
| **public/** | Statické assety; v kódu odkazy jako `/images/...` |

---

## Klíčové soubory

- [app/layout.tsx](app/layout.tsx) — root layout, metadata, fonty
- [app/page.tsx](app/page.tsx) — složení sekcí homepage
- [app/globals.css](app/globals.css) — Tailwind @theme, design tokeny
- [next.config.ts](next.config.ts) — `output: "standalone"`, `images.unoptimized`
- [components/Hero.tsx](components/Hero.tsx) — hero sekce, hlavní fotka
- [lib/properties-data.ts](lib/properties-data.ts) — data nabídek nemovitostí

---

## Příkazy

| Příkaz | Popis |
|--------|--------|
| `npm run dev` | Dev server na **http://localhost:4180** (`next dev -p 4180`) |
| `npm run build` | Produkční build (`.next/`, včetně standalone artefaktů) |
| `npm run start` | `next start -p 4180` — lokální produkční server |
| **Docker** | `docker compose up` — kontejner poslouchá na **3000**, host mapování **`4180:3000`** |

**Proč 4180:** V `C:\Projekty` jinde běží např. **3000** (Fairworkers, starší mamka-reality Next default), **3001** (Ludvik-Solar, ravr backend v Dockeru), **3026** (Projekce Hubeny web), **3050** (REALFORGE-AI dev). Tento marketing web má vlastní pevný port, aby se s nimi nemíchal.

---

## Pravidla a identita agenta

Pro detailní pravidla, tón a „duši“ projektu čti **[.opencode/soul/](.opencode/soul/)**:

- **SOUL.md** — core truths, boundaries, vibe, ambice
- **IDENTITY.md** — role agenta, kontext projektu, očekávání
- **AGENTS.md** — bootstrap plán, task handling, nástroje a omezení
- **HEARTBEAT.md** — recurring úkoly
- **.opencode/soul.md** — živá paměť (goals, loose ends)

Tento soubor (PROJECT.md) je vstupní bod; soul obsahuje continuity a omezení pro změny.
