# 2026-09-16 — King of Fried Rice @ Square 2 (Hawkers' Street) — Premises addition (3rd restaurant-track scheduled run today)

## Selection (Phase 1)

Re-verified the queue's 3 high-priority pending operator entries directly against live `brands.ts`/`menuItems.ts` (not just prior notes), per the deterministic top-priority rule this task's `hawkers_street` entry has followed on every run since 2026-08-31:

- **kopitiam** — 832 `operatorId: "kopitiam"` Brand rows; confirmed the same 3 remain at zero MenuItems (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`), all previously-documented dead ends or out of this task's write scope (Brand-merge restructure, bare-scrape-signal, non-food concession respectively). No addressable gap.
- **koufu** — 0 `operatorId: "koufu"` Brand rows; its standalone sub-brand chains remain separately, fully covered. No addressable gap.
- **foodfare** — 0 `operatorId: "foodfare"` Brand rows; still deprioritized per the 2026-08-23 user instruction (B2B institutional-catering scope finding). No addressable gap.

Fell through to **hawkers_street** (medium priority, 4th overall), which today's two earlier runs left with a specific flagged backlog: 7 existing chain Brands confirmed operating at the newly-identified Square 2 venue (`tai_seng_fish_soup`, `king_of_fried_rice_hws`, `hill_street_coffee_shop`, `pangs_hakka_ytf`, `hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`, `hup_hong_chicken_rice_tang_plaza`) still needed a Square 2 Premises row added to their existing Brand id (a Premises-merge, not a new Brand — same precedent as the `kopitiam_king_grouper` and `lixin_teochew_fishball_noodle_square_2` cases).

Checked all 7 against live `premises.ts` first: **`tai_seng_fish_soup` already had its Square 2 row** (`tai_seng_fish_soup_p4`) — resolved without a matching note on a prior pass, so it drops off the list. Of the remaining 6, picked the first-listed per the one-outlet-per-run rule: **King of Fried Rice** (`king_of_fried_rice_hws`).

## What was added

One new Premises row on the existing `king_of_fried_rice_hws` Brand (no new Brand, no new MenuItems — this Brand already has MenuItems that now also apply at the new location via the standard chain-brand join):

| Field | Value |
|---|---|
| id | `king_of_fried_rice_hws_p4` |
| brandId | `king_of_fried_rice_hws` |
| label | Square 2 |
| locationType | food_court |
| locationContext | Square 2 |
| address | 10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506 |
| postal | 307506 |
| lat / lng | 1.320705109568455 / 103.8441607096606 |
| sfa | null |
| source | web_research |

Address/coordinates reused verbatim from this same venue's two other Square 2 Premises rows added earlier today (`545_whampoa_prawn_noodles_square_2_p1`, `lixin_teochew_fishball_noodle_clementi_mall_p2`), which carry the corrected postal code (307506) sourced from Little Day Out's and Eatbook.sg's in-person Square 2 opening coverage — not the older 307606 typo still present on `tai_seng_fish_soup_p4` (flagged again below).

## SFA lookup

Skipped. Existing Brand, `food_court_stall` inside a mall food-court venue — same no-SFA-lookup precedent used for every other Premises/Brand addition under this queue entry.

## Verification (Phase 5)

- Synced `src/` (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a `/tmp` mirror, `npm install` (394 packages, clean).
- `npx tsc --noEmit` — silent, exit 0.
- Node-based structural check: 4,665 Premises `id` values, 0 duplicates; 0 Premises rows with a `brandId` not present in `brands.ts`; `king_of_fried_rice_hws_p4` present exactly once.
- `diff` confirmed the mirror's `premises.ts` and `researchQueue.ts` are byte-identical to the live repo files.
- Did not run `next build` this pass (not required by this task's Phase 5, which specifies `tsc --noEmit`); typecheck alone is sufficient signal for a single-field data addition of this shape.

## Status

`hawkers_street` queue entry left `status: 'pending'` — remaining backlog: Square 2 Premises rows still needed for `hill_street_coffee_shop`, `pangs_hakka_ytf`, `hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`, `hup_hong_chicken_rice_tang_plaza` (5 left), plus the unrelated `kopitiam_china_food` / `kopitiam_king_grouper` items tracked on the `kopitiam` entry itself.

**Flagged for a future pass (not fixed here, outside this run's append-only scope):** `tai_seng_fish_soup_p4`'s address still carries the old `307606` postal typo noted in an earlier run today's update — it's now inconsistent with the corrected `307506` used on every Square 2 Premises row added since.

## Files touched

- `src/lib/premises.ts` — added 1 Premises row (`king_of_fried_rice_hws_p4`) to `PREMISES_13`.
- `src/lib/researchQueue.ts` — appended an `UPDATE 2026-09-16 (3rd restaurant-track scheduled run today)` note to the `hawkers_street` entry; `status` unchanged (`pending`).

## Commit

Committed locally as `Research: add king_of_fried_rice_hws_p4 (Square 2 premises)`. Not pushed — push is the user's job (`CLAUDE.md` section 8).
