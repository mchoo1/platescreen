# 2026-09-05 — Restaurant-track scheduled run: Teban Gardens Barakath International

**Queue entry:** `teban_gardens_market_and_food_centre_barakath_international_pte_ltd`
**Track:** restaurant/food_court/hawker/coffeeshop/canteen (platescreen-research-restaurants)

## Phase 1 — Target selection

Filtered `RESEARCH_QUEUE` to pending entries of type restaurant/food_court/hawker/coffeeshop/
canteen (73 entries) and sorted by priority. The deterministic first four (`kopitiam`, `koufu`,
`foodfare`, `hawkers_street`) are operator/multi-venue meta-entries whose own extensive note
trails (most recently the 2026-09-01/09-02 passes) already establish they have no currently
addressable new work this cycle: Kopitiam's 3 remaining zero-menu brands are exhausted dead ends
(non-food concession, garbage scrape signal, and a bare category label with no in-app-browser
access available in this unattended session), Koufu/Foodfare are deprioritized/researched-out,
and Hawkers' Street's remaining gap (identifying named concessions at newer venues) needs
visual/Street-View identification not available here. `food_junction` (medium) was already
worked this same day (2026-09-05, see its own queue entry/commit) and left `pending` for a
different sub-reason. Continuing down the priority-sorted list past the ~60 entries already
categorized in prior audits as bare-SFA-licensee names (task #29 bucket) or per-location
duplicates of chains covered elsewhere, the first genuinely actionable low-priority entry was
`teban_gardens_market_and_food_centre_barakath_international_pte_ltd` — its Brand/Premises rows
already exist (2026-08-20 SFA hawker restructuring) with exactly 1 pre-existing MenuItem (a
generic "Nasi Briyani"), below this task's 3-item minimum, so real work remained.

## Phase 2 — Research

WebSearch for "Barakath International" + Teban Gardens surfaced a foodpanda delivery-menu
listing for **"Al Barakath Restaurant & Catering PTE LTD (Teban Gardens Road)"**. Fetched the
page directly (`mcp__workspace__web_fetch`) and got a full, real, itemized menu with current SGD
prices (Prata, Thosai, Uthappam, Briyani, Set Meals, Nasi/Mee/Bihoon/Kway Teow Goreng, etc.).

Confirmed this is the same physical outlet as the existing SFA-licensed Brand/Premises row, not
a coincidental namesake: the foodpanda listing's address ("Block 39 HDB Teban Gardens, Teban
Gardens Rd 39 UNIT N0: 01-332, 600039") is an exact match — down to the postal code and unit
number — to this Brand's existing Premises row (`sfa.premisesAddress`: "39 TEBAN GARDENS ROAD
#01-332 SINGAPORE 600039", licence `SW04164A000`, licenseeName "BARAKATH INTERNATIONAL PTE LTD").

Selected 7 new, distinct dishes from the real menu (avoiding near-duplicates of the existing
generic "Nasi Briyani" and of each other — skipped the ~9 near-identical Goreng/noodle
sub-variants since they don't differ meaningfully in macros):

| Dish | Price (SGD) | Confidence basis |
|---|---|---|
| Briyani Chicken | 7.28 | Real name/price from outlet's own menu; macros calibrated against this project's existing "Nasi Briyani (Chicken)" (Tekka) entry |
| Briyani Mutton | 7.84 | Same basis, scaled for mutton's higher fat / similar protein vs. chicken |
| Egg Onion Prata | 2.88 | Calibrated against existing "Roti Prata (Egg)" / "Egg Prata" entries |
| Murtabak Ayam | 8.80 | Calibrated against existing "Murtabak (Chicken)" (Tekka), scaled up for this stall's larger/pricier portion |
| Mutton Set Meal | 6.80 | Reasoned: rice base + mutton-curry side, calibrated against existing Mutton Soup entries + generic South Indian set-meal composition |
| Fish Set Meal | 5.76 | Same reasoning, lighter fish-curry profile, tagged pescatarian |
| Plain Thosai (2 pcs) | 3.12 | Existing "Thosai (Plain)" (1 pc) entry doubled |

All items: confidence `"estimated"` (no official brand nutrition source exists for this
individual hawker stall — macros are reasoned from real dish names/prices against this project's
own existing analogous entries, per project rules). Diet tags: `halal` + `no_pork` applied
liberally per section 5.1 (all dishes are named chicken/mutton/fish/egg/vegetarian, none on the
no_pork skip-list); `vegetarian`/`vegan` only for the egg-free Thosai; no `gluten_free`/
`dairy_free`/etc. attempted (current conservative policy — not inferred from dish name alone).

Did not touch the pre-existing "Nasi Briyani" item (out of scope — this run only adds).

## Phase 3 — SFA registration

Skipped. Brand already existed with a Premises row carrying real SFA data from the 2026-08-20
restructuring (licence `SW04164A000`, grade B) — per this task's Phase 1 step 5 rule. The
foodpanda address cross-check above independently re-confirms that match rather than replacing it.

## Phase 4 — Records written

- `src/lib/menuItems.ts`: appended 7 new MenuItem objects (`tgbi_1`–`tgbi_7`), brandId
  `teban_gardens_market_and_food_centre_barakath_international_pte_ltd`. Brand goes from 1 → 8
  MenuItems.
- `reference/data/dish-macro-lookup.py`: new `# --- Batch 2026-09-05 additions
  (teban_gardens_market_and_food_centre_barakath_international_pte_ltd...) ---` block with the
  7 new dish-name → (emoji, category, price, calories, protein, carbs, fat) tuples.
- `src/lib/researchQueue.ts`: flipped this entry's `status` from `"pending"` to `"researched"`
  and appended an UPDATE note documenting the above.

## Phase 5 — Verification

- Synced `src/` to a fresh mirror at `/tmp/build/platescreen` (repo has no `node_modules`; also
  worked around this run's low disk space on the default `/sessions`-backed home/npm-cache path
  by pointing `npm install --cache` at `/tmp/npm-cache`, which has headroom on a separate
  filesystem).
- `npx tsc --noEmit` — **clean, exit code 0**.
- `npm run build` — **successful**, all 4,324 pages generated.
- Verify script: 0 duplicate MenuItem ids (2,601 total items), 0 orphaned `brandId` references
  against 1,717 Brands, target brand confirmed at 8 items with the expected new ids/content.
- `diff` of live `src/lib/menuItems.ts` and `src/lib/researchQueue.ts` against the mirror's
  copies: byte-identical.
- Deleted the mirror and temp npm cache after verification.

## Status / next steps

Queue entry flipped to `researched`. No further action needed on this brand. The restaurant
track's pending queue still has the same known-exhausted buckets flagged by prior sessions
(Kopitiam/Koufu/Hawkers' Street operator backlogs, ~task #29 bare-licensee names, chain-duplicate
entries) — a future run should keep sweeping past those for the next genuinely actionable
low-priority single-outlet entry (e.g. the other two "named" prata/food stalls still pending:
`one_punggol_hawker_centre_haji_karim_prata_palace_pte_ltd` and
`punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd`, both of which also already
have a Brand/Premises row and just 1 generic item each, similar shape to this run's target).
