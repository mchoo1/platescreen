# Batch BJ: cross-venue cherry-pick (mixed CORP/GENERIC venues) — 2026-08-29

Task #65. A methodology fix: every prior batch this segment (BB-BI) only considered
venues flagged fully "[CLEAN]" — i.e. every single brand at that venue has a real
dish tag. That filter was leaving real coverage opportunities on the table inside
"mixed" venues, where some brands are corporate entities or GENERIC placeholders
but others sit right next to them with perfectly good dish-specific cuisine tags
(e.g. a 6-brand venue with McDonald's, Pizza Hut, Cold Storage, and 3 real named
stalls was being skipped entirely because it wasn't "clean").

## What changed

Re-audited all 225 remaining uncovered brands directly (not grouped by venue
purity), filtering out only: GENERIC placeholder tags ("Local & Hawker" etc.),
corporate-entity name patterns (Pte Ltd, Co-Operative, Management, Holdings), and
broad food-type categories (Western, Seafood, Noodles-as-bare-category, etc.).
Everything left over — 64 brands — has a real, specific, sourceable dish name in
its own `cuisine` field, regardless of how messy its venue is otherwise.

## Excluded: 5 Koufu food-hall container brands

5 of the 64 candidates (Fork & Spoon, 1983 - A Taste of Nanyang, Cookhouse,
Rasapura Masters, Gourmet Paradise) turned out to be `type: "restaurant"` brand
records representing an *entire multi-stall food court*, not a single dish stall
— confirmed via web search (e.g. Fork & Spoon's own description: "The food court
houses multiple specialized stalls including Ban Mian/Fish Soup, Mini Wokz, Ayam
Penyet, and Yong Tau Foo outlets"). Assigning a single MenuItem to these would
misrepresent an entire venue as one dish. Per task #49, these food halls' actual
internal stalls were already added as separate brands in an earlier session; these
5 container-level records are correctly left with zero MenuItems and are not
"uncovered" in any meaningful sense — flagged here so future audits don't
re-surface them as candidates.

## Results (59 of 59 remaining candidates covered)

22 venues, one or a few brands cherry-picked from each (full per-venue detail in
`src/lib/menuItems.ts`'s new item ids, prefixed by venue): Changi Airport Terminal
4, Sembawang 361, Sembawang MRT Station, Yew Tee Square, National University
Hospital Main Building, Food Folks, Kukoh 21 Food Centre, Jurong West Hawker
Centre, Toa Payoh Lorong 8 Blk 210, New Upper Changi Road Blk 208B, Telok Ayer
Food Centre, Yuhua Village Market and Food Centre, Tampines Round Market and Food
Centre, Toa Payoh Lorong 4 Blk 93, 85 Fengshan Centre, Telok Blangah Market,
Mayflower Market, Ang Mo Kio 628 Market, Kaki Bukit 511 Market and Food Centre,
Bedok North Street 3 Blk 538, Marsiling Lane Market & Food Centre (a third,
distinct premises group at this address — separate from Batches BD's and BI's
groups), Block 80 Circuit Road Market and Food Centre, Changi Village Hawker
Centre.

7 kopitiam_-operated brands among these (Taiwan Dessert & Milk Tea, Soup & Cheong
Fun, Thailand Food, Thai Food, Snack, Thai Makan, Sofnade) were resolved via the
usual `kopitiam-stall-dishes.json` lookup, same as Batches BF-BH.

## New dish types

- `Taiwanese Milk Tea` — 🧋, Beverages, $3.5, 280 cal, 4g protein.
- `Thai Nasi Lemak` — 🍛, Thai, $5.5, 560 cal, 24g protein (from the scrape's
  "Thai Nasi Lemak with Fish Filet & Fried Egg").
- `Pad Thai` — 🍜, Thai, $6.0, 550 cal, 20g protein.
- `Bubble Tea` — 🧋, Beverages, $3.5, 300 cal, 2g protein.
- `Fruit Tea` — 🍹, Beverages, $3.0, 150 cal, 0g protein.
- `Fish Head Steamboat` — 🍲, Seafood, $12.0, 420 cal, 35g protein.
- `Bamboo Shoot Kueh` — 🥟, Local Hawker, $2.0, 200 cal, 4g protein.
- `Yunnan Rice Noodles` — 🍜, Noodles, $6.5, 480 cal, 22g protein.
- `Biang Biang Noodles` — 🍜, Noodles, $7.0, 580 cal, 24g protein.
- `Sarawak Kolo Mee` — 🍜, Noodles, $5.5, 460 cal, 20g protein.
- `Teh Tarik` — 🍵, Beverages, $1.8, 150 cal, 3g protein.
- `Fried Oyster` — 🦪, Seafood, $6.5, 480 cal, 18g protein.

## Diet tags (compatibleWith), set at creation time

Tagged per the same conservative rules as every prior batch this session: halal +
no_pork for Roti Prata (×2), Nasi Lemak, Satay (×2), Teh Tarik; no_pork alone for
Yong Tau Foo (×1), Chicken Rice (×2), Duck Rice, Herbal Chicken Soup, Rojak;
no_pork + pescatarian for Thai Nasi Lemak, Fish Head Steamboat, Fish Head Bee
Hoon, Fish Soup, Fried Oyster; no_pork + vegetarian (+vegan for Vegetarian Bee
Hoon and Fruit Tea) for Taiwanese Milk Tea, Bubble Tea, Min Jiang Kueh, Bamboo
Shoot Kueh, Vegetarian Bee Hoon, Fruit Tea. Pig Organ Soup (Kukoh 21's "Ri Tao Fu")
carries no compatibleWith at all — same categorical exclusion applied to every
explicitly-offal/pork dish this session. Left untagged per the standing skip-list
or ambiguous-protein rules: Mala Xiang Guo, Char Kway Teow, Ban Mian, Wanton
Mee/Noodle (×6), Lor Mee (×2), Porridge, Prawn Mee, Fried Hokkien Mee/Prawn Mee
(×3), Bak Chor Mee, Kway Chap (×2), Popiah, Ngoh Hiang, Mee Hoon Kway, Hor Fun,
Fishball Noodles, Laksa, Roasted Meats, Pad Thai (×2), Yunnan Rice Noodles, Biang
Biang Noodles, Sarawak Kolo Mee, Chee Cheong Fun (×2).

## Verification

- Item count: 2,403 → 2,462 (+59).
- 0 duplicate ids, 0 orphaned items, all 59 target brands confirmed covered
  (1:1). All 5 excluded food-hall brands confirmed still zero-menu.
- Zero-menu-brand count: 225 → 166 (−59), total brand count unchanged at 1,749.
- Spot checks: Pig Organ Soup → no compatibleWith (correct).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +59 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +12 dish types ("Batch BJ additions" block).

## Status / next steps

This "cross-venue cherry-pick" methodology should be the default going forward
rather than the "[CLEAN] venues only" filter used in Batches BB-BH — it surfaces
meaningfully more real coverage per audit pass. Remaining 166 zero-menu brands are
now, by construction, either corporate entities (McDonald's, Cold Storage, Pizza
Hut, Foodfare Co-Op, KFC, Breadtalk, etc. — permanently out of scope) or GENERIC
"Local & Hawker" placeholder-name brands with no cuisine info at all, requiring
actual stall identification (Google Maps/SFA licensee cross-reference) before any
menu research can begin — a heavier lift than anything completed so far this
segment.
