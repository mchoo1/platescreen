# 2026-09-17 (2nd restaurant-track scheduled run today) — pangs_hakka_ytf @ Square 2

## Track & selection

Restaurant/food_court/hawker/coffeeshop/canteen track. Per Phase 1's deterministic
priority-order rule, re-verified the 3 higher-priority pending entries directly
against live `brands.ts`/`premises.ts` (not just prior notes) before picking anything:

- **kopitiam** (high) — still exactly 3 zero-menu `operatorId: 'kopitiam'` brands
  (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`), all
  dead-ends/out-of-scope per every prior pass since 2026-08-31 (cheers is a
  non-food concession; china_food has no findable dish-level source; king_grouper
  needs a Brand-merge restructure outside this task's append-only scope).
- **koufu** (high) — 0 `operatorId: 'koufu'` brands; its 11 standalone sub-brand
  chains are either fully covered or correctly menu-less container brands
  (CLAUDE.md §4.3: `koufu_fork_spoon`, `koufu_1983_taste_of_nanyang`,
  `koufu_cookhouse`, `koufu_rasapura_masters`, `koufu_gourmet_paradise`).
- **foodfare** (high) — 0 `operatorId: 'foodfare'` brands; still deprioritized per
  the 2026-08-23 user instruction (B2B institutional-catering scope finding).

All three confirmed unchanged, no addressable gap. Fell through to **hawkers_street**
(medium, 4th overall), which has an established, ongoing backlog: adding Square 2
Premises rows to existing "Hawkers' Street" chain brands confirmed present at that
venue (per the 2026-09-16 research that identified Square 2's 9-stall roster).
Re-checked the remaining 4 chain brands (`pangs_hakka_ytf`,
`hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`,
`hup_hong_chicken_rice_tang_plaza`) against live `premises.ts` directly — none had
gained a Square 2 row since the run earlier today that added
`hill_street_coffee_shop_p5`. Picked the first-listed per the one-outlet-per-run
rule: **pangs_hakka_ytf** ("Pang's Hakka Yong Tau Foo").

## What was added

One Premises row, `pangs_hakka_ytf_p5`, appended to the existing Brand
`pangs_hakka_ytf` (already has 4 Premises: ION Orchard, Tampines 1, Bukit Panjang
Plaza, 100AM Mall — all 0 MenuItems, a separate pre-existing gap not touched by
this run):

```
id: "pangs_hakka_ytf_p5"
brandId: "pangs_hakka_ytf"
label: "Square 2"
locationType: "food_court"
locationContext: "Square 2"
address: "10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506"
postal: "307506"
lat: 1.320705109568455
lng: 103.8441607096606
sfa: null
source: "web_research"
```

Address/postal/lat/lng reused verbatim from the four prior Square 2 additions this
week (`hill_street_coffee_shop_p5`, `king_of_fried_rice_hws_p4`,
`545_whampoa_prawn_noodles_square_2_p1`,
`lixin_teochew_fishball_noodle_clementi_mall_p2`) — the corrected 307506 postal,
not the older 307606 typo still present on `tai_seng_fish_soup_p4`.

**Basis for the match:** the 2026-09-16 research session (Little Day Out /
Eatbook.sg opening-coverage of Hawkers' Street Square 2, Sep 2025) named Square 2's
full 9-stall roster, including "Hakka Yong Tau Foo" — matched by dish identity to
the existing `pangs_hakka_ytf` Brand (Pang's Hakka Yong Tau Foo), the same
resolution already used for `king_of_fried_rice_hws` and `hill_street_coffee_shop`
at this venue.

No new Brand and no new MenuItems — this is a Premises-only addition to an
existing chain Brand (per the `kopitiam_king_grouper` precedent: prefer adding a
Premises row to an existing Brand over fragmenting into a duplicate one). Note
`pangs_hakka_ytf` itself still has 0 MenuItems across all 5 of its Premises — that
is a separate, pre-existing gap (its own macro research remains a future
one-outlet-per-run pick under this queue entry's original 27-stall MenuItems
backlog), not something this Premises-only run resolves.

## SFA lookup

Not attempted — existing Brand, `food_court_stall` type inside a mall venue, same
no-SFA-lookup precedent used throughout every other addition on this queue entry
(SFA licence data doesn't apply cleanly to a food-court concession the way it does
to a standalone hawker-centre stall).

## Confidence

No new MenuItems added, so no confidence levels to report this run.

## Verification (Phase 5)

- Copied `src/` (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to
  a sandbox mirror at `/var/tmp/build/platescreen` (this session's `/sessions`
  filesystem was at 100% capacity, same condition flagged 2026-09-03/2026-09-15;
  routed through `/var/tmp` on the root filesystem instead, which had ~1.2G free).
- `npm install` — succeeded (394 packages).
- `npx tsc --noEmit` — silent, no errors.
- `npm run build` — compiled successfully, type-checking passed, all 4,401 static
  pages generated; the build then hit `ENOSPC` on the final `out/` export-copy
  step once the sandbox's root filesystem filled up from the build artifacts
  themselves (434MB `.next` + npm cache) — a disk-space limit of this sandbox
  session, not a code or data error (compilation and type-checking had already
  completed cleanly before the copy step). Cleaned up `.next`/`out`/npm cache
  afterward to free space.
- Data-integrity script against the mirror: 1,727 brands / 4,667 premises (up
  from 4,666) / 2,668 menu items. 0 duplicate brand ids, 0 duplicate premises ids,
  0 duplicate menuItem ids, 0 orphaned premises (every `brandId` resolves to a
  real Brand), 0 orphaned menuItems. `pangs_hakka_ytf_p5`'s key set matches every
  other Premises row exactly (no missing/extra fields).
- `diff` of `brands.ts` / `premises.ts` / `menuItems.ts` / `researchQueue.ts`
  between the live repo and the mirror — byte-identical on all four.

## Files touched

- `src/lib/premises.ts` — added `pangs_hakka_ytf_p5`.
- `src/lib/researchQueue.ts` — appended an `UPDATE 2026-09-17b` note to the
  `hawkers_street` entry documenting this run; **status left `'pending'`**
  (this is one Premises row in an ongoing multi-item backlog, not entry
  completion).

## Status / next steps

3 further Square 2 Premises-merge leads remain on this entry:
`hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`,
`hup_hong_chicken_rice_tang_plaza` — plus `pangs_hakka_ytf`'s own still-zero
MenuItems (separate backlog), the unrelated `kopitiam_china_food`/
`kopitiam_king_grouper` dead-ends tracked on the `kopitiam` entry itself, and the
still-unfixed `tai_seng_fish_soup_p4` 307606-postal typo (out of this run's
append-only scope, same as every prior pass).
