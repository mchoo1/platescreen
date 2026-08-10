# Research Session — Soulgreen track (2026-08-11)

**Track:** grab_go / ready_to_eat / supermarket (automated scheduled run)

## Selection

Filtered `RESEARCH_QUEUE` to `status: 'pending'` entries with `type` in
`grab_go` / `ready_to_eat` / `supermarket`: `coffeesmith` (low), `hollin`
(low), `four_leaves` (low), `bengawan_solo` (low), `ok_convenience` (low),
`soulgreen` (medium).

Sorted by priority (highest first, array order as tiebreak): `soulgreen`
(medium) outranks all five `low`-priority candidates, so it is the
selection — same outcome as the 2026-08-10 run, since none of the
low-priority entries have been researched yet and `soulgreen` remains
`'pending'`.

Cross-checked `id: "soulgreen"` against `src/lib/outlets.ts` and
`src/lib/foodOptions.ts` — confirmed **not present** in either file.

## Research: Soulgreen

Re-ran the search from scratch (not just re-reading yesterday's notes) in
case anything changed in the 24 hours since the last attempt:

1. `"Soul Green" Singapore juice bar 2026` — only result is the same
   single-outlet fruit/juice shop, Soul Green, at Eastpoint Mall, 3 Simei
   St 6 #01-16 (Simei), listed on OpenRice with no reviews. No new
   information; this outlet closed in 2023 per the prior session's
   findings (SHOPSinSG + corroborating search), and nothing in today's
   results contradicts that or suggests it reopened.
2. `Soulgreen Singapore healthy food chain grab and go` — surfaced other SG
   healthy chains (Soul Grub, Sousfully, Green Kitchen, SaladStop!) but
   none named "Soulgreen." The only literal "Soulgreen" brand found is
   **soulgreen.ae**, based in the United Arab Emirates — unrelated to the
   Singapore queue entry (different market, no evidence of an SG presence).

No official nutrition panel, HPB entry, Open Food Facts listing, delivery
platform menu (GrabFood/foodpanda), or pricing was found for either
candidate. Same dead end as yesterday.

**Decision: left `soulgreen` as `'pending'`.** Fewer than 5 credible items
(in fact zero) could be sourced, so per the no-fabrication rule this run
adds no `Outlet` or `FoodOption` records and does not substitute a
fallback outlet in the same run.

Updated the `notes` field on the `soulgreen` queue entry to record this
second dead-end confirmation and to flag it for human review — repeatedly
re-running an automated search against a shop that's been closed for three
years is unlikely to ever produce new data.

## Files changed

- `src/lib/researchQueue.ts` — `soulgreen` `notes` field updated to
  document the 2026-08-11 re-confirmation; `status` unchanged (`'pending'`)
- `src/lib/outlets.ts` — no changes
- `src/lib/foodOptions.ts` — no changes

## Typecheck

Not required — no changes to `outlets.ts`/`foodOptions.ts`, and the
`researchQueue.ts` edit is a string literal change only (no structural/type
change). Skipping the sandbox build check since there's nothing that could
break typecheck.

## Next candidates for a future grocery-track run

`soulgreen` is recommended for removal or a substantive queue update by a
human, since it has now failed two consecutive automated research passes
for the same reason (shop closed since 2023, no data ever published). If
it remains in the queue, the next candidates in priority/array order are
all `low` priority: `coffeesmith`, `hollin`, `four_leaves`,
`bengawan_solo`, `ok_convenience`.
