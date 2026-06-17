---
description: Interactive steering of Soul Mode (update focus, preferences, cadence)
---

You can update Soul Mode's memory and heartbeat cadence.

If the user provides explicit values in the prompt (e.g., "set current focus to X", "change cadence to every 24 hours"), apply them directly.

Otherwise, interactively ask for updates to:
- Current focus
- Preferences (tone, format, boundaries)
- Loose ends
- Recurring chores

If cadence changes, update the `soul-heartbeat` scheduler job (use `update_job` if available, otherwise instruct the user).

Always summarize exactly what changed (or what would need to be changed if scheduler tools are missing).

Keep steering reversible and safe.