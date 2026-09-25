# koufu_elemen — 2026-09-25 (scheduled restaurant-track run)

## Selection (Phase 1)

Deterministic selection per `researchQueue.ts`: filtered to `status ===
'pending'` and `type` in restaurant/food_court/hawker/coffeeshop/canteen (39
matching entries), sorted by priority (high → medium → low), first-listed
wins within a priority.

Top entry was `kopitiam` (high priority, first-listed). Re-confirmed its own
notes before treating it as non-actionable this run: the same 3 unresolved
kopitiam-operator brands as the 2026-09-18 note (`kopitiam_cheers` — never,
non-food concession; `kopitiam_china_food` — blocked on Street View/browser
access, unavailable this session; `kopitiam_king_grouper` — needs a
Brand-merge restructure, outside this task's per-entry scope). No new
information on any of the three. Per the established precedent recorded on
that entry across ~2 dozen prior passes, moved to the next high-priority
entry rather than fabricating a menu or forcing an out-of-scope restructure.

Next entry: `koufu` (high priority, 2nd-listed). This entry's own notes
document Koufu Group's standalone (non-`operatorId`) restaurant/cafe chains
already added one by one in prior sessions, with two remaining leads flagged
as blocked: Pang Pang Kopi (its own site returned HTTP 403 on direct fetch)
and Elemen (elemengroup.com.sg is Squarespace/JS-rendered, no static address
data via fetch). Re-tried both via WebSearch (not a repeat of the prior
direct-fetch attempts) and got real results for both — see below.

## Research (Phase 2)

**Elemen ("elemen 元素")** — picked over Pang Pang Kopi for this run (one
outlet per run; Pang Pang Kopi flagged as the next lead, see below).

- Confirmed via `koufu.com.sg/our-brands/cafe-restaurants/elemen-元素/`
  (server-rendered, unlike elemengroup.com.sg) that Elemen is a real,
  single, 100%-vegetarian Koufu Group restaurant brand (est. 2015) with 5
  officially listed outlets: Paya Lebar Quarter, Harbourfront Centre,
  "Elemen Classic @ Great World City", Woodlands Height (Koufu Group HQ),
  Millenia Walk.
- "Elemen Classic" is that one branch's own on-site label, not a second
  brand — confirmed by koufu.com.sg grouping it under the same "elemen"
  page, and by a sethlui.com review of that exact branch which describes it
  as "an arm under the group of elemen restaurants introduced by the Koufu
  Group back in 2015" at the same address.
- **HarbourFront Centre excluded from Premises**: WebSearch confirmed the
  entire HarbourFront Centre building permanently closed 27 July 2026 for a
  redevelopment (reopening ~2031) — koufu.com.sg's own outlet list is stale
  for this one location. The other 4 outlets were independently
  spot-checked (news/mall-directory sources) and are current. Added 4 of
  the 5 listed Premises, not 5.
- Menu/prices: no official brand nutrition PDF or HPB entry exists (a
  sit-down vegetarian-fusion restaurant, not HCS-eligible, not packaged
  retail) — real dish names + SGD prices sourced from WebSearch aggregation
  (danielfooddiary.com, general search snippets covering the flagship menu)
  and a direct sethlui.com review of the Great World City branch. Cross-
  checked against elemengroup.com.sg/menu (confirmed real but JS-rendered,
  no static price list retrievable).
- 9 MenuItems added, all confidence `estimated`:
  - Wild Mushroom & White Truffle Pizza — $17.80
  - Sizzling Quinoa Brown Rice — $15.80
  - Blue Flower Tofu with Black Truffle Wild Rice — $15.80
  - Shiitake Mushroom-Stuffed Purple Rice Rolls — $15.80
  - Asian Curry with Dough Balls — $12.80
  - Spicy Oyster Mushroom Omelette Pasta — $12.80
  - Stir-Fried Brown Rice with Beancurd Preserved — $16.80
  - Double-Boiled Maca Soup — $8.80
  - Chilled Purple Rice Porridge with Coconut Ice Cream — $6.80
- Skipped 3 dishes mentioned only in aggregated review blurbs with no
  findable price (5 Elements Soup, Truffle Broth Ramen, a plain "Rojak")
  rather than estimate a price with no basis.
- Macros reasoned per-dish from stated ingredients/format, calibrated
  against this DB's own existing pizza entries (Margherita/Pepperoni,
  ~600-700cal personal pizza), `daily_cut`'s quinoa/tofu rice bowls
  (Grilled Chicken Thigh Bowl (Quinoa) 490/42/44/14, Pan-Fried Tofu Bowl
  (Brown Rice) 440/22/54/14), and general pasta/soup/dessert composition —
  full reasoning recorded in menuItems.ts's own comment block above the
  `elm_` entries.
- Diet tags: Brand-level `dietTags: ["vegetarian"]` (confirmed 100%
  vegetarian concept across every source). Per-item `vegan` applied only
  where no dairy/egg was named in the sourced description — withheld from
  the pizza (cream base + cheese), the pasta (egg omelette), the curry
  (dairy/ghee content unconfirmed), and the dessert (coconut "ice cream"
  dairy status unconfirmed), per the never-guess rule on
  gluten_free/dairy_free-adjacent inference.

## SFA registration (Phase 3)

Skipped — `type: "restaurant"`, not hawker/food_court_stall, out of this
phase's scope (consistent with every other Koufu Group standalone chain
previously added under this same queue entry).

## Records written (Phase 4)

- `src/lib/brands.ts`: 1 new Brand, `koufu_elemen` (no `operatorId` — same
  standalone-chain pattern as `koufu_grove`/`koufu_happy_hawkers`/etc.).
- `src/lib/premises.ts`: 4 new Premises rows (Paya Lebar Quarter, Elemen
  Classic @ Great World City, Woodlands Height/Koufu Group HQ, Millenia
  Walk), appended to `PREMISES_13`. Coordinates sourced from public
  mapping-site listings (findlatitudeandlongitude.com for 3 of the 4,
  streetdb.com for the Koufu HQ address) rather than a geocoding API tool
  (none available this session) — flagging for a future pass to
  cross-verify against OneMap/Google's own geocoder if precision matters.
- `src/lib/menuItems.ts`: 9 new MenuItems, `brandId: "koufu_elemen"`.
- `src/lib/researchQueue.ts`: appended a dated UPDATE note to the `koufu`
  entry recording this run's findings (including the still-open Pang Pang
  Kopi lead). Status left `pending` — this entry's underlying unit of work
  (discovering Koufu Group's remaining named concepts) is not exhausted.

## Verification (Phase 5)

Sandbox mirror at `/tmp/build/platescreen` (excluding `node_modules`,
`.next`, `out`, `.git`, `reference`). `npm install` initially hit `ENOSPC`
— traced to `HOME` (`/sessions/...`) being 100% full and npm defaulting its
cache/log paths there even under an isolated project dir; worked around
with an explicit `--cache /tmp/npm-cache` for install and `HOME=/tmp/fakehome`
for `tsc`/`build` (this sandbox's `/dev/sda1` root had ~4.0G free throughout,
confirming the space was available once npm was pointed away from the full
`/sessions` mount).

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **Clean, exit 0** |
| `npm run build` | **Succeeded** — all 4,438 static pages generated, including the new `/brand/koufu_elemen` routes |
| Total brands | 1,728 (+1) |
| Total premises | 4,673 (+4) |
| Total menu items | 2,704 (+9) |
| Duplicate ids (brands/premises/menuItems) | 0 / 0 / 0 |
| Orphaned `Premises.brandId` / `MenuItem.brandId` | 0 / 0 |
| `koufu_elemen` price outliers (≤0 or >$100) | 0 |
| `diff` live files vs. mirror (brands.ts/premises.ts/menuItems.ts/researchQueue.ts) | **Byte-identical** |

Ephemeral `integrity-check.mjs` and the `/tmp/build` mirror deleted after use.

## Commit (Phase 6)

Committed locally: `git add -A && git commit -m "Research: add koufu_elemen"`.
Not pushed, per standing rule — a human should run
`cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull origin main && git push origin main`
when ready.

## Summary

Added 1 new Brand (`koufu_elemen`, Koufu Group's vegetarian restaurant
chain), 4 Premises, and 9 MenuItems this run. `kopitiam` remains blocked on
the same 3 brands as before (no action needed there until a human resolves
`kopitiam_king_grouper`'s merge or a browser-access path opens for
`kopitiam_china_food`). `koufu`'s own entry stays `pending` — Pang Pang Kopi
(4 outlets, also found via koufu.com.sg this run) is the next concrete,
addressable lead for a future pass.
