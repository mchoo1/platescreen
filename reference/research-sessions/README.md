# reference/research-sessions/ — index

135+ dated `.md` files, one per batch of data work, 2026-08-10 through
present. **Append-only** — never edit or delete a past entry, it's a record
of what was actually done and why, including mistakes and methodology fixes
that later batches corrected. See `CLAUDE.md` section 6 for the pipeline
these all follow.

**Don't read all of them.** For a fresh session, the useful ones are:

- **The most recent 3-5 by filename date** — carry forward any in-flight
  context or methodology notes not yet folded into `CLAUDE.md`.
- **`2026-08-30-database-health-audit.md`** — the most recent broad
  data-quality pass (duplicates, price/calorie sanity), as opposed to the
  narrower zero-menu-coverage batches.
- Anything with a name matching a topic you're about to touch (`grep -l
  <keyword> *.md`) — e.g. before touching Kopitiam-operated brands, check
  files with "kopitiam" in the name for scrape quirks already documented.

**Naming pattern:** `YYYY-MM-DD-<short-topic>.md`, and from late August
onward, most are part of the "zero-menu backfill" project and carry a
`batch-<LETTER>` or `batch-<LETTERS>` suffix (batches ran roughly
alphabetically: A, B, C... then AA, AB... then BA, BB... through BL as of
2026-08-29) — that project's overall status is summarized in
`../planning/ROADMAP.md`, not here; don't reconstruct it from 60+ individual
batch files.
