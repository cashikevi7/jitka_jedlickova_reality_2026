# AgenticSeek – řešení chyb (Mamka Reality kontext)

## Chyba 429 (Too Many Requests)

**Příčina:** Backend volá LLM API (DeepSeek / OpenAI / Anthropic / …) a provider vrací 429 (rate limit).

**Kde se to řeší:** V instalaci AgenticSeek (`C:\Users\Patri\agenticSeek`), ne v tomto repu.

1. **Počkej 5–15 minut** a zkus znovu jeden krátký dotaz.
2. **Zkontroluj konfiguraci LLM:** V `C:\Users\Patri\agenticSeek` soubory `config.ini` a `.env` — který provider a model se používá, jestli není vyčerpaná kvóta nebo RPM limit.
3. **Kvóta u poskytovatele:** V dashboardu daného API (DeepSeek, OpenRouter, …) zkontroluj usage a limity.

---

## Text „ludvik-solar project“ / Duplicate answer detected

**Příčina:** Backend má v paměti starou odpověď (např. z předchozí session nebo z jiného projektu). Frontend každé 3 s volá `/latest_answer` a zobrazuje `last_answer` / `last_reasoning`; pokud tam zůstalo „I will search for information about 'ludvik-solar project'...“, frontend to zobrazuje a při shodě hlásí „Duplicate answer detected“.

**Řešení:**

1. **Restart backendu AgenticSeek**  
   Zastav proces na portu 8000 (terminál, kde běží `python api.py` nebo `seek`), pak znovu spusť. Tím se vynuluje `last_answer` / `last_reasoning` v paměti.

2. **Smazat uloženou session (volitelně)**  
   V `C:\Users\Patri\agenticSeek` složka `conversations/` — pokud existuje, může obsahovat staré memory. Pro „čistý start“ ji přejmenuj nebo smaž (např. `conversations_backup`), pak restart backendu. V `config.ini` měj `recover_last_session = False`, aby se stará session nenačítala.

3. **Po restartu**  
   V chatu na http://localhost:3002 napiš jako první zprávu např.:  
   *„Projekt: Mamka Reality. Načti PROJECT.md z kořene workspace a použij ho jako kontext.“*

---

## Shrnutí

| Problém | Kde řešit | Akce |
|--------|-----------|------|
| 429 | AgenticSeek backend + LLM provider | Počkat, zkontrolovat config.ini / .env a kvóty API |
| ludvik-solar / Duplicate | AgenticSeek backend (paměť) | Restart backendu, případně smazat/přejmenovat `conversations/` |

Tento soubor je v Mamka Reality repu pro rychlou referenci; změny se dělají v instalaci AgenticSeek.
