# 2026-08-20 — Outlet cleanup: hawker-centre → real-stall restructuring, branches merged into Outlet

## What changed

1. **Outlet + OutletBranch merged into one table.** `src/lib/outletBranches.ts` is
   deleted. Every `Outlet` in `src/lib/outlets.ts` now carries its own location
   data directly: `lat`/`lng` for single-location outlets, or a nested
   `branches: OutletBranch[]` array for multi-location chains (mcd: 112
   branches, kfc: 20/73 branches — both migrated as-is, no new geocoding this
   run). `src/lib/geo.ts`'s `RESTAURANT_STATIC_COORDS` map (224 entries) is
   retired — all its data was migrated onto the matching Outlet's `lat`/`lng`
   (146 outlets; the other 78 belonged to hawker outlets removed in step 3).
   `src/lib/screener.ts`'s distance logic now reads `outlet.branches` /
   `outlet.lat` / `outlet.lng` directly instead of a separate import.

2. **Removed 4 food-court OPERATOR outlets**: `kopitiam`, `koufu`, `foodfare`,
   `banquet`. These were brand-operator rows, not real single premises, and
   didn't fit the Outlet model — no clean "where is it" answer. Removed along
   with their 33 FoodOptions. Also removed their entries from
   `branchQueue.ts` (a branch list never made sense for them).

3. **Removed 114 generic hawker-centre outlets, replaced with 590 real
   per-stall outlets sourced from SFA/NEA licence data.** Previously, e.g.
   "Maxwell Food Centre" was itself one Outlet with a handful of made-up
   generic dishes. Per your instruction, the centre is now a *location*, and
   each real, licensed stall inside it is its own Outlet (e.g. Tian Tian
   Chicken Rice, `location: "Maxwell Food Centre"`).

## How the 590 real stalls were sourced

Bulk-downloaded the full SFA/data.gov.sg licensed-establishment dataset
(36,687 records) and matched it locally (exact substring match on
`premises_address`, not the unreliable fuzzy search API) against each hawker
centre's name/address. **100 of the 114 centres matched successfully**,
yielding 4,897 real licensed stalls. Capped at **6 stalls per centre**
(590 total, sorted by SFA grade: A first), to keep the initial batch a
size the research pipeline can realistically work through — the other
~4,300 matched stalls are archived in
`reference/migration-scripts/sfa-discovery-log.json` for future expansion,
uncapped.

**14 centres have no replacement outlet at all right now** and need manual
follow-up:
- 2 failed geocoding entirely (no coordinate found): `holland_village_market_and_food_centre`, `fernvale_hawker_centre_market`
- 12 failed SFA address matching (name/address too ambiguous to match confidently against the bulk dataset): a defensive cap rejected over-broad matches rather than guessing.

Each new stall Outlet has real `sfa` data (licence number, licensee name,
premises address, grade) — no macros fabricated. They're queued into
`RESEARCH_QUEUE` (590 new entries, tagged with `sfaLicenceNo` and a note
that the Outlet already exists) for the existing daily research task to work
through over time.

**36 of the 114 removed centres had no static coordinate in the old map** —
re-geocoded 30 of them via OneMap this session (kept as the new stall
outlets' `lat`/`lng`); 6 failed (see above), left ungeocoded rather than
guessed.

## Numbers

| | Before | After |
|---|---|---|
| Outlets | 301 | 773 |
| FoodOptions | 1,841 | 896 |
| Outlets with real per-branch data | 2 (mcd, kfc-partial) | 2 (unchanged this run) |
| Outlets with a real lat/lng | ~146 (via static map) | ~700 (554 new stalls + 146 migrated) |

**FoodOptions dropped from 1,841 to 896** — this is the real tradeoff of the
cleanup. All 945 removed items were generic/fabricated (912 attached to the
removed hawker-centre outlets, 33 to the removed food-court operators). The
896 remaining are all either verified/community-sourced real dishes (existing
90 curated hawker stalls, branded chains, etc.) or already had real
provenance. The 590 new real stalls have **zero FoodOptions until the daily
research task works through the new queue** — at the existing pace this is a
multi-year backlog for full coverage, not a quick fix. Flagging this plainly
rather than inflating the number or fabricating placeholder dishes.

## Verification

- `npx tsc --noEmit` — clean, no errors
- `npm run build` (Next.js static export) — compiled successfully, 4/4 static pages generated
- No duplicate outlet ids (773 checked)
- No orphaned FoodOptions (896 checked, all `outletId` references resolve)

## Files touched

- `src/lib/outlets.ts` — rewritten (773 outlets)
- `src/lib/foodOptions.ts` — rewritten (896 items)
- `src/lib/outletBranches.ts` — deleted
- `src/lib/geo.ts` — `RESTAURANT_STATIC_COORDS` removed
- `src/lib/screener.ts` — distance logic rewritten to read Outlet directly
- `src/lib/branchQueue.ts` — removed 4 operator entries, updated file references
- `src/lib/researchQueue.ts` — untyped-literal conversion (was hitting TS2590 risk at this size) + 590 new entries
- `src/types/db.ts` — already updated earlier this session (Outlet.lat/lng/branches)
- `reference/migration-scripts/sfa-discovery-log.json` — new, full 4,897-record SFA match archive
- Scheduled task `platescreen-research-branches` — prompt updated to reference `outlets.ts`'s `branches` field instead of the deleted `outletBranches.ts`

## Not done / follow-ups

- The 14 unresolved hawker centres (listed above) have no outlet at all now — need manual research.
- 590 new stalls need FoodOption research — already queued, no action needed beyond letting the daily task run.
- The ~4,300 further SFA-matched real stalls beyond the 6/centre cap are archived but not promoted — a future session could raise the cap or add more centres once the research backlog catches up.
