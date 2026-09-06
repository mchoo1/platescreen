# 2026-09-06 (2nd restaurant-track scheduled run) — Hjh Maimunah, Hawkers' Street @ The Clementi Mall

**Queue entry worked:** `hawkers_street` (medium priority, food_court, `RESEARCH_QUEUE`). This is the
second restaurant-track run today — the first (earlier this session day) added Springleaf Prata
Place under the same queue entry (see `2026-09-06-springleaf_prata_place.md`).

## Selection

Per Phase 1's deterministic priority-then-array-order rule, re-checked the three high-priority
operator entries first:

- **kopitiam** — re-confirmed no addressable gap. Of its 839 operatorId-tagged brands, only 3 remain
  at zero MenuItems (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`), all
  previously exhausted: king_grouper needs a Brand-merge restructure (out of this task's write
  scope), china_food has no findable dish-level source after 4 independent research passes, cheers
  is a non-food convenience-store concession that should never get a MenuItem.
- **koufu** — verified directly against the live dataset: 0 brands with `operatorId: "koufu"` have
  zero MenuItems. Fully covered.
- **foodfare** — still deprioritized per the 2026-08-23 user instruction (unresolved B2B-scope
  question); not re-litigated this run.

Moved to **hawkers_street** (4th in the priority-sorted list). Its own 29 operatorId-tagged Brand
rows all already have ≥1 MenuItem (verified directly), but the entry's notes track 7 further named
concessions identified by press coverage of newer venues that don't have Brand rows at all yet.
Picked the first-listed of those: **Hjh Maimunah** (The Clementi Mall venue).

## Research

Confirmed via WebSearch + web_fetch that Hjh Maimunah operates a stall at Hawkers' Street's newest
food court, The Clementi Mall (opened 28 Oct 2025):

- [eatbook.sg — "Clementi Mall's New Food Court Has 5 Famous Stalls—LiXin, Hjh Maimunah And More"](https://eatbook.sg/hawkers-street-clementi-mall/) (29 Oct 2025) — confirms Hjh Maimunah as one of
  5 Michelin-recognised stalls at this venue, address 3155 Commonwealth Avenue West, #04-20/21/22,
  Singapore 129588 — same address already on file for `wok_hei_hor_fun`'s Premises row at this venue.
- [Mothership.SG — "Michelin-awarded Hjh Maimunah Restaurant opens nasi padang stall at Clementi Mall"](https://mothership.sg/2023/10/hjh-maimunah-clementi-mall/) — background on the brand (Michelin
  Bib Gourmand, established 1992, over 40 menu items).
- [hjmaimunah.com/pages/clementi](https://hjmaimunah.com/pages/clementi) — the chain's own site listing
  a Clementi outlet.

Hjh Maimunah does not publish a per-branch menu or price list — like the chain's other 10+ outlets,
this stall serves the brand's one standing nasi-padang menu. Following the same approach used for
`wok_hei_hor_fun` and `springleaf_prata_place` (both also newly-opened Hawkers' Street concessions
with no branch-specific source), dish names and prices were sourced from the chain's well-documented
flagship locations:

- [The Ordinary Patrons — Hjh Maimunah Joo Chiat visit](https://ordinarypatrons.com/2023/02/28/hjh-maimunah-joo-chiat-nasi-padang/) — itemised prices: Siput Sedut $7.50, Sotong Hitam $7,
  Brinjal $5, Lady's Fingers $5, BBQ Selar Fish $7, rice $1.20.
- WebSearch results citing Hjh Maimunah's set-meal pricing: Beef Rendang Set $8.50, Chicken Set $8,
  Meatless Set $5.50, Sayur Lodeh $1.50 (side).
- A Hjh Maimunah Mini branch's Lontong Sayur, $5.50 (via a maimunahfoods Facebook post referenced in
  search results).

## MenuItems added (7, all `confidence: "estimated"`)

| id | name | price | cal | protein | carbs | fat | tags |
|---|---|---|---|---|---|---|---|
| hmcm_1 | Beef Rendang Set | $8.50 | 640 | 28 | 62 | 28 | halal, no_pork |
| hmcm_2 | Chicken Set | $8.00 | 560 | 30 | 45 | 24 | halal, no_pork |
| hmcm_3 | Nasi Sambal Goreng | $6.00 | 560 | 20 | 68 | 22 | halal, no_pork |
| hmcm_4 | Lontong Sayur | $5.50 | 480 | 14 | 68 | 18 | halal, vegetarian, vegan |
| hmcm_5 | Lemak Siput Sedut | $7.50 | 220 | 14 | 6 | 16 | halal, pescatarian |
| hmcm_6 | Sotong Hitam | $7.00 | 240 | 20 | 10 | 14 | halal, pescatarian |
| hmcm_7 | Sayur Lodeh | $1.50 | 140 | 3 | 11 | 10 | halal, no_pork |

No official nutrition source exists for this chain (not HPB-tracked, no brand nutrition PDF).
Macros are reasoned estimates calibrated against this project's own existing Nasi Padang analogs
already in `menuItems.ts`:

- `mnp_beef_rendang_set` (Majulah Nasi Padang, 620/28/65/26) and
  `np_nasi_padang_northpoint_cit_beef_rendang_set` (600/28/58/26) → Beef Rendang Set.
- `pr_selera_timur_nasi_sambal_goreng_set` (560/20/68/22) → Nasi Sambal Goreng (used directly,
  same shape/price bracket).
- `gsm_lontong` / `tekka_lontong` (480/14/68/18) → Lontong Sayur, including the existing
  vegetarian/vegan tagging precedent for this dish name in this dataset.
- Lemak Siput Sedut and Sotong Hitam have no existing DB analog (first shellfish/squid side dishes
  for a nasi padang brand in this dataset) — original reasoned estimates for a lemak-gravy shellfish
  side and a black-sauce braised-squid side, both modest-portion sides rather than full plates.

Diet tags: `halal` on every item (Hjh Maimunah is Halal-certified per eatbook.sg's own coverage);
`no_pork` on items with a named non-seafood protein (none of these dishes are on the CLAUDE.md
no_pork skip-list or the pork-named exclusion list); `pescatarian` on the two seafood/shellfish
sides; `vegetarian`/`vegan` on Lontong Sayur only, matching this dataset's existing Lontong
precedent — not extended to Nasi Sambal Goreng or Sayur Lodeh, which traditionally may include
dried shrimp/belacan and are therefore ambiguous per section 5.1's conservative rule.
`gluten_free`/`dairy_free`/`nut_free`/`lactose_free` were not attempted (per CLAUDE.md, never
inferred from dish-name alone).

Excluded: the press-mentioned "Ambeng Platter" (explicitly a 2–3 person sharing platter) was left
out — it doesn't fit the "one dish, one serving" MenuItem shape and there's no reliable way to
split it into a single-serving macro estimate without guessing.

## Brand + Premises

- New Brand `hjh_maimunah_clementi_mall` (type `food_court_stall`, operatorId `hawkers_street`,
  cuisine "Indonesian/Malay", priceRange `$`, platforms `dine_in`/`grab_go`).
- New Premises `hjh_maimunah_clementi_mall_p1` — reused the exact address/lat/lng already on file
  for `wok_hei_hor_fun_p1` (same venue, The Clementi Mall, 3155 Commonwealth Ave W
  #04-20/21/22, Singapore 129588; lat 1.314966522855597, lng 103.7642704675928).

## SFA lookup — skipped

Per Phase 3, and consistent with the `wok_hei_hor_fun`/`springleaf_prata_place` precedent set
earlier today: this is a named concession inside a shopping-mall food court operated by Hawkers'
Street, not an independently-licensed hawker stall. The venue's own SFA licence sits at the
food-court-premises level, not per internal stall (same reasoning as the Operator model in
`types/db.ts`). `sfa` left `null` on the Premises row, `source: "operator_official_site"`.

## Verification

- Build mirror synced to `/tmp/build/platescreen` (relocated off the `/sessions` mount mid-run —
  see note below) via `rsync -a --delete` of `src/` and `reference/`.
- `npm install` — 394 packages installed cleanly (after redirecting the npm cache off the full
  `/sessions` filesystem to `/tmp/npm-cache`; see note below).
- `npx tsc --noEmit` — silent, no errors.
- `npm run build` — compiled successfully, all 4,348 static pages generated (1,720 brand pages,
  item-detail pages included), no errors.
- Integrity script: brands 1,719 → 1,720 (+1), menu items 2,615 → 2,622 (+7), premises 4,655 →
  4,656 (+1). 0 duplicate ids across brands/items/premises. 0 orphaned menu items or premises
  (every `brandId` resolves). New brand's 7 items and 1 premises row confirmed present.
- `diff` of the live repo's `brands.ts`/`premises.ts`/`menuItems.ts` against the mirror's copies
  (taken before edits) — byte-identical, confirming the mirror and live repo agreed going in.

**Environment note:** the usual `~/build/platescreen` mirror location resolves onto the `/sessions`
filesystem, which was at 100% disk usage this run (unrelated pre-existing state, not caused by this
task) and caused `npm install` to fail with `ENOSPC` even after clearing `~/.npm`. Rebuilt the
mirror under `/tmp` instead (a separate filesystem with headroom) and pointed `npm install` at a
`/tmp`-based cache with `--cache /tmp/npm-cache`. No project files were affected by this; noting it
here in case a future run hits the same `/sessions`-full condition.

## Status

`hawkers_street` queue entry left at `status: "pending"` — 6 further identified-by-name leads
remain (Tartini Grill & Pasta, Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The
Neighbourwork Fried Hokkien Prawn Mee — all Clementi Mall — and Hup Hong Chicken Rice at Tang
Plaza), plus Square 2's stall list is still unknown. Notes field updated in `researchQueue.ts` with
this run's findings and the updated remaining-leads count.

## Files touched

- `src/lib/brands.ts` — +1 Brand (`hjh_maimunah_clementi_mall`)
- `src/lib/premises.ts` — +1 Premises (`hjh_maimunah_clementi_mall_p1`)
- `src/lib/menuItems.ts` — +7 MenuItems (`hmcm_1`–`hmcm_7`) + dated comment block
- `src/lib/researchQueue.ts` — appended UPDATE note to the `hawkers_street` entry
- `reference/research-sessions/2026-09-06-hjh_maimunah_clementi_mall.md` — this file
