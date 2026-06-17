# 🎯 Cursor IDE Prompty pro web Ing. Radim Hubený

## 📝 PROMPT 1: Inicializace projektu (Next.js + Tailwind)

```
Vytvoř moderní web pro autorizovaného projektanta pozemních staveb Ing. Radim Hubený.

TECHNICKÝ STACK:
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animace)
- shadcn/ui komponenty
- Lucide React ikony

ZÁKLADNÍ INFORMACE O KLIENTOVI:
- Jméno: Ing. Radim Hubený
- Titul: Autorizovaný inženýr v oboru pozemní stavby
- Lokalita: Moravský Krumlov
- Zkušenosti: 10+ let praxe
- Specializace: Rodinné a bytové stavby, zdravotnická zařízení, školská zařízení, výrobní haly
- Filozofie: "V projektování je pro mě každá stavba originál"
- Služby: Projekční činnost, inženýrská činnost, autorské/technické dozory, vyřízení dotací NZÚ, prověření nemovitostí před koupí
- Kontakt: info@projekce-hubeny.cz, +420 737 424 288

VIZUÁLNÍ SMĚR (inspirace top architektonická studia):
- Minimalistický, čistý design
- Full-screen hero sekce s architektonickou fotografií
- Tmavá nebo teplá béžová paleta s měděnými akcenty
- Elegantní typography (moderní sans-serif)
- Grid layout pro projekty
- Subtle animations (Framer Motion)

STRUKTURA WEBU:
1. Hero (fullscreen image + hlavní claim + CTA)
2. O mně (filozofie + zkušenosti + foto)
3. Služby (4 kategorie v cards/grid)
4. Proces spolupráce (timeline/kroky)
5. Reference/Projekty (grid s fotkami)
6. Kontakt (formulář + kontaktní info + mapa)
7. Footer

Začni vytvořením struktury projektu a globálních stylů v Tailwind config.
```

---

## 📝 PROMPT 2: Hero sekce

```
Vytvoř HERO sekci pro web projektanta staveb.

POŽADAVKY:
- Full viewport height (100vh)
- Background: Architektonická fotografie s tmavým gradient overlay (zleva nebo shora)
- Obsah zarovnaný vlevo nebo centrovaný
- Large typography pro hlavní claim

COPY:
- H1: "Každá stavba je originál"
- Subtitle: "Ing. Radim Hubený | Autorizovaný projektant pozemních staveb s 10+ lety zkušeností"
- CTA Buttons: "Prohlédnout služby" + "Kontaktovat"

ANIMACE:
- Text reveal on load (staggered children)
- Subtle parallax on background
- Scroll indicator (animated arrow)

DESIGN NOTES:
- Inspirace: Heatherwick Studio, Norm Architects
- Tmavý overlay pro čitelnost textu
- Bílý nebo světlý text
- Elegantní, důvěryhodný dojem
```

---

## 📝 PROMPT 3: Sekce "O mně" / Filozofie

```
Vytvoř sekci O MNĚ pro projektanta staveb.

LAYOUT:
- Split layout: 50% text, 50% image (nebo 60/40)
- Container max-width pro čitelnost

COPY:
- Nadpis: "O mně"
- Quote/Highlight: "V projektování je pro mě každá stavba originál"
- Text: "Jsem autorizovaný inženýr v oboru pozemní stavby s více než desetiletou praxí. Specializuji se na rodinnou a bytovou výstavbu, zdravotnická a školská zařízení, výrobní haly a další typy staveb.

Nabízím komplexní služby od návrhu přes povolení až po realizační dokumentaci. Na projektech spolupracuji s architekty a specialisty, kteří mají dlouholetou praxi ve svém oboru.

Mým cílem je vytvářet funkční a esteticky hodnotné stavby, které odpovídají potřebám klientů a respektují okolní prostředí."

ELEMENTY:
- Profesionální foto (placeholder)
- Statistiky: "10+ let praxe", "X realizovaných projektů", "Člen ČKAIT"
- Certifikace/Ikony

ANIMACE:
- Fade in on scroll
- Counter animation pro statistiky
- Image reveal (clip-path nebo scale)
```

---

## 📝 PROMPT 4: Sekce Služby (4 kategorie)

```
Vytvoř sekci SLUŽBY ve formě gridu cards.

4 KATEGORIÍ SLUŽEB:

1. PROJEKČNÍ A INŽENÝRSKÁ ČINNOST
   - Architektonická studie
   - Projekční činnost
   - Inženýrská činnost
   Icon: Blueprint/Ruler

2. KONTROLNÍ A PORADENSKÁ ČINNOST
   - Autorské dozory staveb
   - Technické a stavební dozory
   - Poradenská činnost, posudky
   Icon: ClipboardCheck/Shield

3. VYŘÍZENÍ DOTACÍ NZÚ
   - Zpracování dokumentace a posudku
   - Zpracování žádosti
   - Technický dozor při realizaci
   Icon: FileCheck/Coins

4. PROVĚŘENÍ NEMOVITOSTÍ PŘED KOUPÍ
   - Prověření technického stavu
   - Právní prověření nemovitosti
   Icon: Search/Home

DESIGN:
- 2x2 grid na desktopu, 1 sloupec na mobilu
- Cards s hover efektem (lift + shadow)
- Ikony v kruhu nebo s barevným pozadím
- Číslování 01, 02, 03, 04
- "Více informací" link nebo button

ANIMACE:
- Staggered reveal on scroll
- Icon animation on hover
- Smooth card transitions
```

---

## 📝 PROMPT 5: Proces spolupráce (Timeline)

```
Vytvoř sekci PROCES SPOLUPRÁCE s timeline/škálovým designem.

KROKY (4-5 fází):

1. KONZULTACE A ANALÝZA
   "Seznámení s vašimi potřebami a představami, analýza pozemku a možností"

2. ARCHITEKTONICKÁ STUDIE
   "Vytvoření koncepčního návrhu a vizualizací stavby"

3. PROJEKTOVÁ DOKUMENTACE
   "Zpracování dokumentace pro územní řízení a stavební povolení"

4. REALIZACE A DOZOR
   "Autorský dozor během výstavby, kolaudace a předání stavby"

DESIGN:
- Vertikální timeline s spojnicí
- Nebo horizontální steps na desktopu
- Čísla kroků výrazně
- Ikony pro každý krok
- Spojovací čára s progressem

ANIMACE:
- Timeline reveal on scroll
- Steps animate in sequence
- Connecting line draws itself
```

---

## 📝 PROMPT 6: Portfolio projektů

```
Vytvoř sekci PORTFOLIO / REFERENCE pro ukázku realizovaných projektů.

LAYOUT:
- Masonry grid nebo 2-3 sloupce
- Velké obrázky projektů
- Hover efekt s overlay informacemi

PLACEHOLDER PROJEKTY (vytvoř strukturu pro):
- Rodinné domy (kategorie)
- Bytové stavby
- Zdravotnická zařízení
- Školská zařízení
- Výrobní haly

DESIGN PRO KAŽDÝ PROJEKT:
- Cover image (16:9 nebo 4:3)
- Kategorie tag
- Název projektu
- Rok realizace
- Lokalita

INTERAKCE:
- Hover: Image zoom + overlay s informacemi
- Click: Otevře detail projektu (nebo lightbox)
- Filter by category (volitelně)

ANIMACE:
- Grid items stagger in
- Image parallax on hover
- Smooth transitions

NOTE: Použij placeholder images z unsplash.com (architecture, construction, houses)
```

---

## 📝 PROMPT 7: Kontaktní sekce

```
Vytvoř kontaktní sekci s formulářem a informacemi.

LAYOUT:
- 2 sloupce: Formulář vlevo, kontaktní info vpravo
- Nebo kontaktní boxy nad formulářem

KONTAKTNÍ ÚDAJE:
- Jméno: Ing. Radim Hubený
- Titul: Autorizovaný inženýr v oboru pozemní stavby
- Adresa: Nerudova 803, 672 01 Moravský Krumlov
- IČO: 04671961
- Email: info@projekce-hubeny.cz
- Telefon: +420 737 424 288

FORMULÁŘ FIELDS:
- Jméno a příjmení (required)
- Email (required)
- Telefon
- Typ projektu (select: Rodinný dům, Bytová výstavba, Zdravotnické zařízení, Školské zařízení, Výrobní hala, Jiné)
- Zpráva (textarea)
- GDPR checkbox
- Submit: "Odeslat poptávku"

MAPA:
- Embedded Google Maps (Moravský Krumlov)

DESIGN:
- Clean form styling
- Input focus states
- Error states
- Success message po odeslání

ANIMACE:
- Form inputs fade in
- Button hover effect
- Success animation
```

---

## 📝 PROMPT 8: Navigation & Footer

```
Vytvoř NAVIGACI a FOOTER pro web.

NAVIGACE:
- Fixed header on scroll
- Logo vlevo (textové: "Ing. Radim Hubený" nebo zkráceně "IRH")
- Menu items: Úvod, O mně, Služby, Projekty, Kontakt
- CTA button: "Kontaktovat" (vpravo)
- Mobile: Hamburger menu s fullscreen overlay

DESIGN NAVIGACE:
- Průhledná na hero, bílá/pozadí po scrollu
- Smooth transition
- Active state indicator

FOOTER:
- 3 sloupce:
  1. Logo + krátký popis
  2. Rychlé odkazy (menu)
  3. Kontaktní údaje
- Copyright: "© 2026 Ing. Radim Hubený. Všechna práva vyhrazena."
- Optional: Členství v ČKAIT badge

ANIMACE:
- Header show/hide on scroll direction
- Menu hover effects
- Mobile menu slide/animation
```

---

## 📝 PROMPT 9: Animace a Mikrointerakce

```
Implementuj globální animace a mikrointerakce pro celý web.

REQUIREMENTS:

1. PAGE TRANSITIONS
   - Smooth fade between pages
   - Optional: Page loader

2. SCROLL ANIMATIONS
   - Reveal on scroll (fade up, fade in)
   - Parallax na hero obrázku
   - Sticky header s efektem

3. HOVER EFEKTY
   - Links: underline animation
   - Buttons: scale + shadow
   - Cards: lift + shadow
   - Images: subtle zoom

4. TEXT ANIMATIONS
   - Hero text stagger reveal
   - Typing effect volitelně

5. FRAMER MOTION SETUP
   - AnimatePresence pro page transitions
   - motion.div pro scroll reveals
   - staggerChildren pro sekvence

CONFIGURACE:
- Plynulé easing (ease-out, cubic-bezier)
- Respektuj prefers-reduced-motion
- Optimalizované pro performance
```

---

## 📝 PROMPT 10: Responzivní design

```
Zkontroluj a optimalizuj responzivní design pro všechny breakpointy.

BREAKPOINTY:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large: > 1280px

KONTROLA:
- Hero text čitelný na mobile
- Navigace funguje na mobilu (hamburger)
- Grid služeb: 1 sloupec na mobilu, 2 na tabletu
- Projektové obrázky optimalizované
- Formulář použitelný na mobilu
- Font sizes responsive
- Padding/margin adekvátní

TESTOVÁNÍ:
- Otestuj různé velikosti obrazovky
- Zkontroluj touch targets (min 44px)
- Optimalizuj images pro mobile
```

---

## 📝 PROMPT 11: SEO a Metadata

```
Implementuj SEO a metadata pro web.

REQUIREMENTS:
- Title: "Ing. Radim Hubený | Autorizovaný projektant pozemních staveb"
- Meta description s klíčovými slovy
- Open Graph tags (pro sdílení)
- Canonical URL
- Structured data (JSON-LD) pro LocalBusiness
- Sitemap.xml
- Robots.txt

KLÍČOVÁ SLOVA:
- projektant staveb, projekční kancelář
- rodinné domy, projektování
- stavební dozor, autorský dozor
- Moravský Krumlov, jižní Morava
- dotace NZÚ, zpracování dotací

PERFORMANCE:
- Optimalizace obrázků (WebP, lazy loading)
- Core Web Vitals
- Přístupnost (ARIA labels, contrast)
```

---

## 🎨 BAREVNÉ VARIANTY (alternativy)

### Varianta A: Dark Elegant (inspirace SOM, Zaha Hadid)
```
Primary: #0a0a0a (téměř černá)
Secondary: #1f1f1f (tmavá šedá)
Accent: #c9a962 (zlatá/měděná)
Text: #ffffff (bílá)
Muted: #a0a0a0 (šedá)
```

### Varianta B: Warm Minimal (inspirace Norm Architects)
```
Primary: #f5f3ef (teplá bílá)
Secondary: #e8e4de (béžová)
Accent: #8b7355 (hnědá)
Text: #2d2a26 (temná)
Muted: #6b6560 (šedohnědá)
```

### Varianta C: Clean Professional (inspirace Foster + Partners)
```
Primary: #ffffff (bílá)
Secondary: #f8f9fa (světlá šedá)
Accent: #c41230 (červená) nebo #1a5490 (modrá)
Text: #212529 (temná)
Muted: #6c757d (šedá)
```

---

## 📚 POUŽITELNÉ ZDROJE

### Fonty (Google Fonts):
- **Headings:** Inter, Playfair Display, Cormorant Garamond
- **Body:** Inter, Source Sans Pro, Open Sans

### Ikony:
- Lucide React (doporučeno)
- Phosphor Icons
- Heroicons

### Obrázky (placeholders):
- Unsplash: architecture, construction, modern house, building
- Pexels: architektura, stavby

### Formuláře:
- React Hook Form + Zod pro validaci
- Nebo nativní form s Next.js API route

---

*Generováno pro projekt Ing. Radim Hubený - Projekční kancelář*
*Inspirace: Zaha Hadid Architects, Foster + Partners, SOM, Heatherwick Studio, Norm Architects*
