# Batch AY: Clementi Ave 3 Blk 448 + Eunos Crescent Blk 4A + Tanglin Halt Market — 2026-08-29

Task #65 (zero-menu-item long-tail backfill), first batch resumed after the app-review
fixes (diet-tag backfill + zero-menu-brand UI fallback). Continues the multi-venue
batching approach (option 1, chosen by the user after Batch AT) at the 6-brand tier.

## Venues and results

Re-ran the audit fresh at the start of this batch: 587 zero-menu brands, 54 venues in
the 6-brand tier (up from the count implied by the AX-era estimate — tier composition
shifts as batches land, same caveat noted since Batch AK). Picked the top 3 venues by
brand count that were pure hawker-stall groups (deliberately avoided venues whose list
included corporate-entity duplicates like "Cold Storage Singapore (1983) Pte Ltd",
"Mcdonald'S Restaurants Pte. Ltd.", "Kentucky Fried Chicken Management Pte Ltd" — those
look like separate SFA-licensee brand records for chains that likely already have a
canonical brand+menu elsewhere in the database; reconciling duplicate brand records is
a bigger structural task than a dish-sourcing batch and is flagged below, not fixed
here).

### Clementi Ave 3 Blk 448 (5 of 6 covered)

Most brands here carry a real, dish-descriptive cuisine tag directly:
- Song Fish Soup (cuisine: Teochew Fish Porridge) → Teochew Sliced Fish Porridge
- Chai Ho Satay (cuisine: Satay) → Satay
- Boon Kee Wanton Mee (cuisine: Wanton Mee) → Wanton Mee
- Soon Huat Cooked Food (cuisine: Sesame Oil Chicken) → Sesame Oil Chicken Rice (new
  dish type)

Two brands carried the generic "Local & Hawker" placeholder tag and needed individual
web research:
- **Lee Guat Hoon** → multiple independent sources (OpenRice, Foursquare, JointHawker)
  consistently place a coffee/drinks stall at this exact unit (#01-22). Added a Kopi
  item on that basis.
- **Lee Jim Pong** (#01-42) → sources conflict on the current tenant (a 2025 stall
  guide and a delivery listing say "Clementi 448 Western Food"; another directory says
  "QMeal Fragrant Chicken Rice"; a third references an even earlier "Four Seasons
  Cheng Tng"). Frequent stall turnover, no way to confidently pin the licensee name to
  one dish. **Skipped** — no dish added.

### Eunos Crescent Blk 4A (5 of 6 covered, 7 items)

- Fen Xiang Fried Kway Teow (cuisine: Char Kway Teow) → Char Kway Teow
- Chao Yang Fish Ball Noodle (cuisine: Teochew Fish Ball Noodle) → Fishball Noodles
- Keng Huat Cold & Hot Dessert (cuisine: Cheng Tng) → Cheng Tng
- **Tiong Lee Lim** (generic tag) → a current (2026) Kopitiam.com.sg hawker guide
  places **Whampoa Soya Bean** at this exact unit (#01-35), known for both Soya Bean
  Milk and Tau Huay (beancurd) — added both as 2 separate items (`ec4a_1`, `ec4a_2`),
  since the source names two distinct products, not one dish with two names.
- **Eng Kee Hainanese Chicken Rice & Porridge** → the brand's own name states two
  products; added both Hainanese Chicken Rice and a plain Porridge item (`ec4a_4`,
  `ec4a_5`) rather than picking one.
- **Teo Kiang Huat** (generic tag, #01-23) → web research (Facebook community post,
  JointHawker, OpenRice, a 2017 food blog) places **Keng Huat Cold & Hot Dessert** at
  this exact unit — which is *already a separate brand in this same venue's uncovered
  list* (`eunos_crescent_blk_4a_keng_huat_cold_hot_dessert`, covered above). "Teo Kiang
  Huat" is almost certainly the SFA licensee name for the same physical stall recorded
  under a different brand id with its signboard name. **Skipped as its own item** —
  adding a dish here would have double-counted one real stall as two. Flagged as a
  likely-duplicate-brand-record data-quality issue, not merged (merging brand ids
  safely, without breaking any FK references, is out of scope for this batch).

### Tanglin Halt Market (4 of 6 covered)

- Wei Yi Laksa & Prawn Noodle (cuisine: Laksa & Prawn Noodle) → Laksa
- Tanglin Halt Original Peanut Pancake (cuisine: Peanut Pancake) → Peanut Pancake
- **Delicious Duck Noodles** (cuisine: Duck Noodles) → Duck Noodle Soup (new dish type
  — a plain duck noodle soup, distinct from the existing roast/braised duck dish
  entries already in the lookup table)
- **Jiu Ye** (generic "Local Snacks" tag) → two independent sources (Hawker Trails,
  The Fat Guide) confirm this stall specializes in Hong Kong–style Chee Cheong Fun
  (rice noodle rolls) with turnip/char siew/veg-and-egg fillings, plus a small
  porridge menu. Added Cheong Fun (existing dish type, close enough to the confirmed
  product to reuse rather than invent a near-duplicate).
- **Lim Hang Tong** (generic tag) → extensive search (direct name, name + "hawker",
  name + "Tanglin Halt", alternate spelling) found nothing tying this name to any
  stall. **Skipped** — no dish added.
- **Ngern Jwee Chye** (generic tag) → a Mothership.sg article (Feb 2021) explicitly
  states this person "runs the famous Wei Yi Laksa stall" in this same hawker centre —
  which is *already a separate brand in this venue's list*
  (`tanglin_halt_market_wei_yi_laksa_prawn_noodle`, covered above). Same
  duplicate-stall situation as Teo Kiang Huat. **Skipped as its own item** for the same
  reason.

## New dish types (dish-macro-lookup.py, "Batch AY additions")

- `Sesame Oil Chicken Rice` — 🍗, Chicken Rice/Poultry, $5.0, 560 cal, 28g protein
- `Tau Huay` — 🍮, Bakery/Dessert, $2.0, 150 cal, 8g protein (soft beancurd dessert)
- `Duck Noodle Soup` — 🍜, Chinese Roast, $5.5, 480 cal, 26g protein

## Diet tags (compatibleWith) — set at creation time, not left for a later backfill

Following the same conservative rules used in the 2026-08-29 diet-tag backfill:
Kopi/Cheng Tng/Soya Bean Drink/Tau Huay tagged vegetarian+vegan (no meat, no dairy);
Satay/Hainanese Chicken Rice/Sesame Oil Chicken Rice/Duck Noodle Soup/Teochew Sliced
Fish Porridge tagged no_pork (ingredient-literal); Satay additionally tagged halal
(unambiguous Malay/Indian-Muslim tradition dish). Deliberately left untagged: Wanton
Mee, Char Kway Teow, Fishball Noodles, Laksa, Cheong Fun, and the generic Porridge
item — all traditionally pork-adjacent (lard, sausage, minced pork topping) or
ambiguous-filling even though "pork" doesn't appear in the name, matching the same
skip list used throughout this session's diet-tag work.

## New data-quality finding: duplicate brand records for the same physical stall

Two of the six brands in this batch (Teo Kiang Huat, Ngern Jwee Chye) turned out, on
investigation, to be the SFA-licensee-name record for a stall that's *also* recorded
under its signboard name as a separate Brand in the same venue. This is a different
failure mode than the "generic Local & Hawker tag, no discoverable dish" skip reason
used in earlier batches (AT/AX) — here the dish *is* known, but attributing it to this
brand id would create a second, misleading listing for one real stall. This likely
affects other venues too (anywhere a market's SFA licence list and its signboard-name
list both got captured as separate brands) and would need a dedicated
licensee-name-vs-signboard-name reconciliation pass across the full brand table — not
attempted here, flagged for a future session.

## Verification

- Item count: 2,039 → 2,055 (+16), matches expected.
- 0 duplicate ids, 0 orphaned items (every new item's `brandId` resolves to a real
  Brand), all 14 target brands now have ≥1 item, all 4 intentionally-skipped brands
  (Lee Jim Pong, Teo Kiang Huat, Lim Hang Tong, Ngern Jwee Chye) still have 0 items.
- Zero-menu-brand count: 587 → 573 (−14), total brand count unchanged at 1,749.
- Diet-tag spot checks: Kopi → vegetarian, Satay → halal+no_pork, Wanton Mee → no tag
  (as intended), Laksa → no tag (as intended).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror confirmed byte-identical for both changed
  files (`menuItems.ts`, `dish-macro-lookup.py`).

## Files touched

- `src/lib/menuItems.ts` — +16 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +3 dish types ("Batch AY additions" block).
