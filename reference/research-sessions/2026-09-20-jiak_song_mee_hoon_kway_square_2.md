# 2026-09-20 — Restaurant-track scheduled run: jiak_song_mee_hoon_kway @ Square 2

## Context

Deterministic priority-order pick (Phase 1) landed on `kopitiam` (high priority,
first-listed pending entry in the restaurant/food_court/hawker/coffeeshop/canteen
track). Re-verified directly against live `brands.ts`/`premises.ts`/`menuItems.ts`
per the established precedent from every prior scheduled run since 2026-08-31:

- **kopitiam** — same 3 dead-end zero-menu `operatorId: 'kopitiam'` brands
  (`kopitiam_king_grouper` — needs a Brand-merge restructure, out of this task's
  write scope; `kopitiam_china_food` — bare "Cold dishes" scrape signal, needs
  Street View/in-person ID, browser tool unavailable in this unattended session;
  `kopitiam_cheers` — permanently out of scope, non-food concession). No change.
- **koufu** — 0 `operatorId`-tagged Brand rows; its standalone sub-brand chains
  remain fully covered. No backlog.
- **foodfare** — still deprioritized per the 2026-08-23 user instruction (B2B
  institutional-catering scope finding). No change.

Fell through to **hawkers_street** (medium priority, 4th overall pending entry),
which has its own long-running sub-backlog: adding Square 2 branch Premises rows
to existing chain Brands identified via the 2026-09-16 Little Day Out/Eatbook.sg
opening-coverage research (Square 2's 9-stall roster). As of the 2026-09-19 run,
2 items remained: `jiak_song_mee_hoon_kway` and `hup_hong_chicken_rice_tang_plaza`.
Re-checked both directly against live `premises.ts` — neither had gained a Square 2
row since 2026-09-19.

## Work done

Picked the first-listed of the 2 remaining per the one-outlet-per-run rule:
**jiak_song_mee_hoon_kway**.

Added one new Premises row to the existing Brand (no new Brand, no new MenuItems
— this is a chain-branch addition, not a new outlet):

```
id: "jiak_song_mee_hoon_kway_p4"
brandId: "jiak_song_mee_hoon_kway"
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

Address/postal/lat/lng reused verbatim from the identical Square 2 unit already
established by `hill_street_hainanese_curry_rice_p5` / `pangs_hakka_ytf_p5` /
`hill_street_coffee_shop_p5` / `king_of_fried_rice_hws_p4` /
`545_whampoa_prawn_noodles_square_2_p1` / `lixin_teochew_fishball_noodle_clementi_mall_p2`
— the corrected 307506 postal, not the 307606 typo still present on
`tai_seng_fish_soup_p4` (a pre-existing record, out of this run's append-only
scope to fix).

The Brand's existing MenuItem (`bp_25`, "Mee Hoon Kway", $5.50, 460 cal / 20g
protein / 58g carbs / 14g fat, confidence `estimated`) now applies at this new
Premises via the standard chain-brand join — no menu/macro research was needed
this run.

No SFA lookup performed: existing Brand, `food_court_stall` inside a mall venue,
same no-SFA-lookup precedent used throughout this queue entry's Square 2 work.

## Verification (Phase 5)

`/sessions` filesystem was again near-full at the time of this run (same ENOSPC
condition flagged in the 2026-09-03/09-15 session notes), so the build mirror
was routed through `/tmp` instead, per that established workaround:

- Synced `src/`, plus root config files, excluding `node_modules`, `.next`,
  `out`, `.git`, `reference` → `/tmp/psbuild-20260920`.
- `npm install --cache /tmp/npm-cache-20260920` — succeeded (55 packages).
- `npx tsc --noEmit` — silent (no errors).
- `diff` between the mirror's `premises.ts` and the live repo's `premises.ts` —
  byte-identical.
- Parsed the live `brands.ts`/`premises.ts`/`menuItems.ts` as data (not typed,
  per section 4.5): 4,669 total Premises ids (up from 4,668), 0 duplicate ids,
  0 orphaned Premises (every `brandId` resolves to an existing Brand row).

## Status / next steps

`hawkers_street` queue entry left at `status: 'pending'` — remaining backlog:

- 1 Square 2 Premises row still needed: `hup_hong_chicken_rice_tang_plaza`
  (same chain-branch pattern as this run; reuse the same Square 2
  address/postal/lat/lng).
- Unrelated: `kopitiam_china_food` (needs Street View/in-person ID) and
  `kopitiam_king_grouper` (needs a Brand-merge restructure, out of this task's
  scope) — tracked on the `kopitiam` queue entry itself, not this one.
- Still-unfixed: `tai_seng_fish_soup_p4`'s 307606 postal typo (a pre-existing
  record; out of this run's append-only scope).
