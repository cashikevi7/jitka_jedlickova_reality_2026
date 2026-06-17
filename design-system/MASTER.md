# Mamka Reality — Design System & IA

## 1. Koncept značky „Mamka Reality“

**Cílová skupina:** 40+, rodiny, konzervativnější klienti v ČR. Nedůvěra v realitky, potřeba lidského přístupu, někdo „jako máma, co to zařídí a ohlídá“.

**Tón komunikace:**
- Teplý, lidský, bez korporátního žargonu.
- Konkrétní sliby (nezávazná konzultace, odpověď do 24 h), ne vágní „jsme tu pro vás“.
- Důraz na důvěru: fotka, reference, jasný proces, jeden kontakt (Jitka).

**Hlavní claimy:**
- **Hero:** „Jsem Jitka. Realitní specialistka pro Znojemsko a Moravský Krumlov. Prodávám a pronajímám s osobní péčí — od prvního setkání po předání klíčů. Domluvte si nezávaznou konzultaci.“
- **Benefit:** Klid, že máte jednoho člověka, který to s vámi projde a nezmizí.
- **Důvěra:** Na trhu od 2012 • 100+ obchodů • Region znám osobně.

**Vizuální a textový dojem:**
- Čistý, světlý, hodně bílého místa (minimalismus, Swiss-inspired).
- Teplá ale ne křiklavá paleta: béžová/zlatá jako akcent, tmavě šedý text (čitelné pro 40+).
- Velké fotky Jitky (tvář, důvěra), krátké odstavce, jasné CTA.

---

## 2. Informační architektura homepage

| Pořadí | Sekce | Message | CTA |
|--------|--------|--------|-----|
| 1 | **Hero** | Kdo jsem, pro koho, hlavní benefit. | „Domluvte si nezávaznou konzultaci“ (primární), „Prohlédnout nabídku“ (sekundární). |
| 2 | **Služby** | Co umím: Prodej, Pronájem, Odhad — stručně, bez šumu. | Jedno CTA: „Domluvme si nezávaznou konzultaci“. |
| 3 | **Nabídka nemovitostí** | Konkrétní nemovitosti (z `listings.json`), filtr Prodej/Pronájem. | Karta → detail na našem webu. Žádný odchod na externí portál v hlavní CTA. |
| 4 | **O mně** | Krátký manifest + příběh + fotka. Důvěra přes člověka. | Žádné CTA (nebo jemný odkaz na kontakt). |
| 5 | **Reference** | Sociální důkaz: klienti o Jitce. | Žádné CTA. |
| 6 | **Jak spolupráce probíhá** | 3 kroky: konzultace → příprava → prohlídky a převod. Snížení nejistoty. | CTA: „Chcete začít? Napište mi.“ → #kontakt. |
| 7 | **Kontakt** | Telefon, e-mail, formulář, „Odpovím do 24 h“. | Primární: „Domluvte si nezávaznou konzultaci“ (tel nebo formulář). |

**Co neměnit:** Pořadí sekcí v `app/page.tsx` zůstává: Hero → Services → Properties → About → Testimonials → HowItWorks → Contact. Data nemovitostí zůstávají v `lib/properties-data.ts` a `data/listings.json`.

---

## 3. Rozlišení Prodej vs. Pronájem

- **Prodej:** Barva `primary` (zlatá/karamel). Badge text „Prodej“, třída `bg-primary text-white` nebo `bg-primary/15 text-primary`.
- **Pronájem:** Barva `accent-rent` (např. modrošedá). Badge „Pronájem“, třída `bg-accent-rent text-white` nebo `bg-accent-rent/15 text-accent-rent`.
- V kartách i na detailu konzistentně: jeden styl pro Prodej, druhý pro Pronájem (barva + mikrocopy „K prodeji“ / „K pronájmu“ pokud chceme).

---

## 4. UI systém — shrnutí

- **Barvy:** background světle béžová, primary zlatá/karamel, text tmavě šedý, muted středně šedá, card bílá. Accent pro pronájem modrošedá.
- **Typografie:** Nadpisy Playfair Display (serif), tělo Inter. Velikosti: base 1rem, lead 1.125rem, small 0.875rem. Heading 1 velký a řádkový spacing cca 1.2.
- **Tlačítka:** Primární `btn-primary`, sekundární `btn-secondary`. Zaoblení `rounded-lg`, padding konzistentní.
- **Karty:** Bílý podklad, jemný border, `rounded-lg`, hover bez posunu layoutu (např. jen border-color / shadow).
- **Pilulky (Hero):** Zaoblené, neutrální pozadí, malý text.

Implementace v `app/globals.css` (Tailwind @theme + @layer components).
