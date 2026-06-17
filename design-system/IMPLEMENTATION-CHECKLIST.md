# Checklist implementace UI/UX — Mamka Reality

Implementuj v tomto pořadí, aby se styly a komponenty poskládaly do jednoho celku bez rozbití.

1. **`app/globals.css`**  
   Přepsat na design systém: @theme (barvy včetně `primary`, `accent-rent`, `surface`, `dark`, `muted`), @layer base (body, nadpisy, p), @layer components (`.btn-primary`, `.btn-secondary`, `.card`, `.card-hover`, `.pill`, `.badge-sale`, `.badge-rent`, `.section-title`, `.section-lead`). Respektovat `prefers-reduced-motion`.

2. **`design-system/MASTER.md`**  
   Založit a naplnit: koncept značky, IA homepage (message + CTA po sekcích), pravidlo Prodej vs. Pronájem, shrnutí UI systému. Slouží jako referenční dokument.

3. **`components/Hero.tsx`**  
   Refaktor na 3s value prop: eyebrow „Jsem Jitka Jedličková“, H1 „Realitní specialistka pro Znojemsko a Moravský Krumlov“, lead „Prodávám a pronajímám s osobní péčí…“, primární CTA „Domluvte si nezávaznou konzultaci“, sekundární „Prohlédnout nabídku“, pills přes třídu `.pill`. Odkazy s `cursor-pointer`.

4. **`components/Services.tsx`**  
   Nadpisy přes `.section-title` a `.section-lead`. Karty přes `.card`. Jedno CTA „Domluvme si nezávaznou konzultaci“ s `.btn-primary`.

5. **`components/Properties.tsx`**  
   Sekční nadpisy `.section-title` / `.section-lead`. Filtr záložek s `role="tablist"` a `aria-selected`. Karty `.card` + `.card-hover`, odkazy `cursor-pointer`. Badge: Prodej = `.badge-sale` + text „K prodeji“, Pronájem = `.badge-rent` + text „K pronájmu“.

6. **`components/About.tsx`**  
   Sekce nadpis `.section-title`. Fotka s `alt` popisem. Odstavce beze změny logiky, pouze konzistentní třídy (např. `bg-surface` pro obal obrázku).

7. **`components/Testimonials.tsx`**  
   Nadpis `.section-title` / `.section-lead`. Karty reference `.card`. `aria-label` na horizontálním scrollu. Žádná změna dat.

8. **`components/HowItWorks.tsx`**  
   Nadpis `.section-title` / `.section-lead`. Pod kroky krátký text „Chcete začít?“ + CTA „Napište mi“ s `.btn-primary` odkazem na `#kontakt`.

9. **`components/Contact.tsx`**  
   Nadpis a lead („Domluvte si nezávaznou konzultaci“, „Odpovím do 24 h“). Trust line u fotky („Jedna osoba, jeden kontakt“). Formulář s `id` na `label` (contact-name, contact-email, contact-message). Tlačítko `.btn-primary`. Odkazy a tlačítka s `cursor-pointer` a `transition-colors duration-200`.

10. **`app/nabidka/[slug]/page.tsx`**  
    Layout: odkaz Zpět, hero fotka (aspect 16/10 resp. 21/9), blok základních info (badge Prodej/Pronájem přes `.badge-sale` / `.badge-rent`, název, lokace, cena), sekce Fotogalerie (mřížka), sekce Popis nemovitosti, CTA blok (nadpis, text „odpovím do 24 h“, tlačítka `.btn-primary` a `.btn-secondary`). Konzistentní rozlišení Prodej vs. Pronájem jako na homepage.

11. **Ověření**  
    Spustit `npm run build`. Zkontrolovat homepage i jednu detailní stránku v prohlížeči (Hero, Služby, Nabídka, O mně, Reference, Jak to probíhá, Kontakt; detail nemovitosti včetně badge a CTA). Ověřit, že všechny klikatelné prvky mají `cursor-pointer` a že kontrast textu vyhovuje (muted ne příliš světlá).
