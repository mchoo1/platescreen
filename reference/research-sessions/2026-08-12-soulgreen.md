# Research Session — Soulgreen track (2026-08-12)

**Track:** grab_go / ready_to_eat / supermarket (automated scheduled run)

## Selection

Filtered `RESEARCH_QUEUE` to `status: 'pending'` entries with `type` in
`grab_go` / `ready_to_eat` / `supermarket`: `coffeesmith` (low), `hollin`
(low), `four_leaves` (low), `bengawan_solo` (low), `ok_convenience` (low),
`soulgreen` (medium).

Sorted by priority (highest first, array order as tiebreak): `soulgreen`
(medium) outranks all five `low`-priority candidates, so it is the
selection — same deterministic outcome as the 2026-08-10 and 2026-08-11
runs, since none of the low-priority entries have been touched and
`soulgreen` remains `'pending'`.

Cross-checked `id: "soulgreen"` against `src/lib/outlets.ts` and
`src/lib/foodOptions.ts` — confirmed **not present** in either file.

## Research: Soulgreen

Ran two fresh, independent searches rather than relying on the prior
sessions' notes:

1. `"Soulgreen" Singapore healthy food menu 2026` — surfaced generic SG
   healthy-eating roundups (Eatbook, Chope, Sassy Mama, Honeycombers,
   TripAdvisor) plus Soul Grub and Supergreen Salads (both distinct SG
   brands, not "Soulgreen"), and soulgreen.ae — a UAE-based supplement
   brand, unrelated to Singapore.
2. `Soulgreen SG grab and go nutrition` — surfaced unrelated "Soulgreens"
   supplement products and generic "grab and go" nutrition PDFs from other
   countries/chains (none Singapore, none named "Soulgreen").

No official nutrition panel, HPB entry, Open Food Facts listing, delivery
platform menu (GrabFood/foodpanda), or pricing was found. This is the
**third consecutive automated pass** (2026-08-10, 2026-08-11, 2026-08-12)
reaching the identical dead end: the only Singapore business resembling
this name is "Soul Green," a single-outlet fresh fruit/juice shop at
Eastpoint Mall (Simei) that closed in 2023, and no reopening or new online
presence was found.

**Decision: left `soulgreen` as `'pending'`.** Zero credible items could be
sourced, so per the no-fabrication rule this run adds no `Outlet` or
`FoodOption` records and does not substitute a fallback outlet in the same
run (per task instructions).

Updated the `notes` field on the `soulgreen` queue entry to record this
third dead-end confirmation and to more strongly flag it for human
review.

## Files changed

- `src/lib/researchQueue.ts` — `soulgreen` `notes` field updated to
  document the 2026-08-12 re-confirmation; `status` unchanged (`'pending'`)
- `src/lib/outlets.ts` — no changes
- `src/lib/foodOptions.ts` — no changes

## Typecheck

Not required — no changes to `outlets.ts`/`foodOptions.ts`, and the
`researchQueue.ts` edit is a string literal change only (no structural/type
change). Skipping the sandbox build check since nothing could break
typecheck.

## Recommendation

`soulgreen` has now failed **three** consecutive automated research passes
for the identical reason (the only matching SG shop closed in 2023; no
data has ever been published). Recommend a human either remove this queue
entry or replace it with a corrected outlet name/lead, since further
automated re-attempts are very unlikely to produce a different result.

If the entry is kept as-is, the next candidates in priority/array order
for a future grocery-track run are all `low` priority: `coffeesmith`,
`hollin`, `four_leaves`, `bengawan_solo`, `ok_convenience`.

## Commit status

**Not committed.** `.git/index.lock` was present at the start of this
session (dated 2026-08-11, no live git process visible in this sandbox)
and could not be removed — `rm`, `chmod`, and `chattr` all returned
"Operation not permitted" despite matching file ownership, and the
condition persisted after a 15s retry. This suggests either a stale lock
held at the host/sync layer outside this sandbox's control, or a genuine
concurrent process (e.g. another scheduled PlateScreen research run)
holding it. Rather than force-removing a lock I can't confirm is safe to
clear, I left it in place. The working-tree edit to
`src/lib/researchQueue.ts` (this file's `notes`/`status` are unaffected —
only the `soulgreen` entry's `notes` changed) and this report are on disk
but uncommitted. A human (or the next scheduled run, once the lock clears)
should verify `.git/index.lock` is safe to remove and commit this change
along with any other pending uncommitted work in the repo.
