# Soul Memory

Last updated: 2026-03-27T12:00:00Z

## Goals
- Maintain a professional, trustworthy real estate website for Jitka Jedličková (Mamka Reality)
- Ensure the site is always buildable and deployable (Next.js standalone + Vercel or Docker)
- Keep property listings up-to-date and reflect actual offers

## Preferences
- Respond concisely, directly with code or actionable advice
- Respect existing patterns and conventions (no large rewrites without explicit request)
- Keep changes small, reversible, and consistent with the design system (gold primary, luxury feel)
- Use Czech or English based on user's language

## Build Status
- `next build` uses **standalone** output; `/api/chat` (AI) requires server runtime — not static `out/` only.
- If dev shows missing `.next/routes-manifest.json` or odd cache state: `npm run dev:clean` (or delete `.next`).
- `app/favicon.ico` must not coexist with `public/favicon.ico` (Next conflict).

## Current focus
- Add new property listings or update existing ones as needed
- Verify external links functionality

## Loose ends
- Verify external links (reality-proradost.cz, biledomytasovice.cz, social) still work after deploy.
- Spot-check property images (local `public/images/properties/` vs remote URLs) so listing pages don't 404.
- Vercel: env from `.env.local` is not in git — set secrets in dashboard if features need them (e.g. `DEEPSEEK_API_KEY`).

## Recurring chores / automations to consider
- Run `npm run build` periodically to catch breakages early
- Run `npm run lint` and fix obvious issues
- Monitor external links for changes/breakages
- Consider automating image optimization for property photos
