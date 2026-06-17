---
description: Soul Mode status (read‑only observability)
---

Read the current state of Soul Mode and report it.

Steps:
1) Read `.opencode/soul.md`.
2) Read the last 5 lines of `.opencode/soul/heartbeat.jsonl` (if any).
3) Check scheduler job status for `soul-heartbeat` (use `list_jobs` if available, otherwise note "scheduler unknown").
4) Output:
   - Current focus (from soul.md)
   - Latest heartbeat timestamp (or "none yet")
   - Top loose ends (max 3)
   - Next action suggested
   - Scheduler job status (enabled/disabled, cadence)
   - Optional: age of last heartbeat, open todo count from sqlite (if accessible)

Keep the report concise, focused on observability for the user.