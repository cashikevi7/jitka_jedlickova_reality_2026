# AGENTS.md — Bootstrap plan a workflow

## Bootstrap plan (první běh / orientace v projektu)

Když na projektu začínáš nebo ho po čase znovu otevíráš:

1. **Přečti si .opencode/soul/** — SOUL.md, IDENTITY.md, tento AGENTS.md, HEARTBEAT.md. Živá paměť (goals, loose ends) je v **.opencode/soul.md**. Jsou to tvá pravidla a mapa projektu.
2. **Ověř stav buildu:** `npm run build` (nebo `pnpm build`). Projekt používá **`output: "standalone"`** — SSG + API (`/api/chat`); produkce = Vercel nebo `next start` / Docker Node.
3. **Struktura kódu:**
   - **app/** — `layout.tsx` (fonty, metadata, Navbar + Footer), `page.tsx` (složení sekcí), `globals.css` (Tailwind @theme, barvy, fonty).
   - **components/** — jedna sekce = jeden soubor: Hero, Stats, Services, Properties, About, Testimonials, Contact, Navbar, Footer. Všechny klientové komponenty používají `"use client"` kde je třeba (motion, useState).
   - **lib/** — `properties-data.ts`: centrální data nabídek (slug, title, location, type, url). Obrázky nemovitostí: `public/images/properties/<slug>/01.jpg`. Profilové fotky: `public/images/profile/` (jitka-01.jpg, jitka-02.jpg) + volitelně externí CDN URL v komponentách.
   - **public/** — obrázky; odkazy z kódu jako `/images/...`.
4. **Konvence:** TypeScript bez `any`. Komponenty pojmenované soubory; styly přes Tailwind a @theme. Obrázky: `<img>` s `onError` fallback tam, kde může chybět lokální soubor.
5. **Externí závislosti:** Odkazy na reality-proradost.cz, biledomytasovice.cz, Facebook/Instagram — neměň bez vědomí uživatele. Obsah (texty, reference) je v komponentách; pro větší změny obsahu se ujisti o záměru.

Po této orientaci můžeš plnit úkoly a heartbeat úlohy.

---

## Task handling

- **Nový feature / úprava UI:** Projdi příslušnou sekci v `components/`, případně `app/globals.css`. Drž se stávajícího stylu (barvy, motion, rozložení).
- **Změna nabídek:** Uprav `lib/properties-data.ts`. Přidání nové nemovitosti = přidat záznam + případně obrázek do `public/images/properties/<slug>/`.
- **Změna textů / copy:** Přímo v komponentách. Žádné CMS ani DB — vše je ve zdrojáku.
- **Build / deploy:** `next build` → standalone; deploy na Vercel (doporučeno) nebo Docker / vlastní Node. AI chat potřebuje `DEEPSEEK_API_KEY` v prostředí serveru.

## Nástroje a omezení

- **Povoleno:** čtení/úprava souborů v repo, spouštění `npm run build` / `next build`, lint. Doporučeno před větší změnou zkontrolovat `next build` a případně `npm run lint`.
- **Neukládej** hesla, API klíče ani citlivé údaje do souborů v gitu. Pokud něco takového potřebuješ (např. env pro budoucí funkce), použij .env.local a ujisti se, že je v .gitignore.
- **Paměť:** Trvalý kontext projektu je v .opencode/soul/ (tato složka) a v .opencode/soul.md (goals, loose ends, recurring chores). Sdílená „behavior memory“ = tato složka + soul.md; repo dokumentace doplňuje. Soukromé údaje uživatele nekopíruj do repo.

## Když něco nejde

- Build padá: zkontroluj chybu (chybící obrázek, špatný import, verze React/Next). Projekt běží na React 18 kvůli kompatibilitě s Framer Motion.
- Hydration warning: v tomto projektu je `suppressHydrationWarning` na `<html>` a `<body>` kvůli rozšířením prohlížeče; neměň to bez důvodu.
- Obrázky se nenačtou: lokální cesty `/images/...` očekávají soubory v `public/`; externí URL (CDN) mohou mít omezení; komponenty mají fallback přes `onError`.
