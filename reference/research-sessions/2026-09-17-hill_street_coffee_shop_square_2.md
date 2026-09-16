# 2026-09-17 — Hill Street Coffee Shop @ Square 2 (Hawkers' Street) — Premises addition (restaurant-track scheduled run)

## Selection (Phase 1)

Re-verified the queue's 3 high-priority pending operator entries directly against live `brands.ts`/`premises.ts` (not just prior notes), per the deterministic top-priority rule this task has followed on every run:

- **kopitiam** — same 3 stuck operator-Brand items unchanged (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`) — no addressable gap.
- **koufu** — standalone sub-brand chains remain fully covered — no addressable gap.
- **foodfare** — still deprioritized per the 2026-08-23 user instruction (B2B institutional-catering scope finding) — no addressable gap.

Fell through to **hawkers_street** (medium priority, 4th overall). Re-checked its remaining backlog of 5 chain Brands still needing a Square 2 Premises row (`hill_street_coffee_shop`, `pangs_hakka_ytf`, `hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`, `hup_hong_chicken_rice_tang_plaza`) directly against live `premises.ts` rather than trusting the prior note's text — confirmed none of the 5 had gained a Square 2 row since 2026-09-16 (each still has only its pre-existing non-Square-2 branches). Picked the first-listed per the one-outlet-per-run rule: **Hill Street Coffee Shop** (`hill_street_coffee_shop`).

## What was added

One new Premises row on the existing `hill_street_coffee_shop` Brand (no new Brand, no new MenuItems — this Brand already has 2 real MenuItems that now also apply at the new location via the standard chain-brand join):

| Field | Value |
|---|---|
| id | `hill_street_coffee_shop_p5` |
| brandId | `hill_street_coffee_shop` |
| label | Square 2 |
| locationType | food_court |
| locationContext | Square 2 |
| address | 10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506 |
| postal | 307506 |
| lat / lng | 1.320705109568455 / 103.8441607096606 |
| sfa | null |
| source | web_research |

Address/coordinates reused verbatim from the corrected Square 2 rows already established by `king_of_fried_rice_hws_p4`, `545_whampoa_prawn_noodles_square_2_p1`, and `lixin_teochew_fishball_noodle_clementi_mall_p2` (the corrected 307506 postal, not the older 307606 typo still present on `tai_seng_fish_soup_p4`).

## Research (Phase 2)

Not needed — `hill_street_coffee_shop` already has 2 verified/estimated MenuItems from prior research; this run only added a physical branch location for the existing menu.

## SFA lookup (Phase 3)

Skipped. Existing Brand, `food_court_stall` inside a mall food-court venue — same no-SFA-lookup precedent used for every other Premises addition under this queue entry.

## Verification (Phase 5)

- Synced `src/` (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a `/tmp` mirror, `npm install` (394 packages, clean).
- `npx tsc --noEmit` — silent, exit 0.
- Node-based structural check on the mirror (temporary script, deleted after use): `BRANDS: 1727 rows, 0 duplicate ids`; `PREMISES: 4666 rows, 0 duplicate ids` (4665 → 4666); `MENU_ITEMS: 2668 rows, 0 duplicate ids`; `Orphaned Premises.brandId: 0`; `Orphaned MenuItems.brandId: 0`; `hill_street_coffee_shop_p5 present: true` (exactly once); `hill_street_coffee_shop` premises count now 5 (`_p1`–`_p5`).
- Re-checked the live repo file directly afterward (the temporary mirror was already cleaned up before a byte-diff could be taken): `grep -c` confirms exactly 1 occurrence of `hill_street_coffee_shop_p5` and 4,666 total `id:` rows in the live `premises.ts`; `git status --short` shows only the two intended files (`premises.ts`, `researchQueue.ts`) modified.
- Did not run `next build` this pass (not required by this task's Phase 5, which specifies `tsc --noEmit`); typecheck alone is sufficient signal for a single-field data addition of this shape.

## Status

`hawkers_street` queue entry left `status: 'pending'` — remaining backlog: Square 2 Premises rows still needed for `pangs_hakka_ytf`, `hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`, `hup_hong_chicken_rice_tang_plaza` (4 left), plus the unrelated `kopitiam_china_food`/`kopitiam_king_grouper` items tracked on the `kopitiam` entry itself, plus the still-unfixed `tai_seng_fish_soup_p4` 307606 postal typo (still out of this run's append-only scope).

## Files touched

- `src/lib/premises.ts` — added 1 Premises row (`hill_street_coffee_shop_p5`) to `PREMISES_13`.
- `src/lib/researchQueue.ts` — appended an `UPDATE 2026-09-17 (restaurant-track scheduled run)` note to the `hawkers_street` entry; `status` unchanged (`pending`).

## Notes

Found 2 pre-existing empty (0-byte) stray files during startup (`_probe.txt.stale-20260917`, `reference/research-sessions/_probe2.txt.stale-20260917`) — filesystem write-probe artifacts from an earlier session per the 2026-09-17 backlog-reconciliation report. Left as-is (untracked, no content, not this task's scope).

## Commit

Committed locally as "Research: add hill_street_coffee_shop_p5 (Square 2 premises)". Not pushed — push is the user's job (`CLAUDE.md` section 8).

```bash
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull origin main && git push origin main
```
