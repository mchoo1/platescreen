# Batch BB: 15-venue push — ABC Brickworks, Redhill, Bendemeer, Telok Blangah Crescent, Holland Drive, People's Park, Albert Centre, East Coast Lagoon, Boon Lay Place, Havelock Road, Tanjong Pagar Plaza, Serangoon Garden, Sims Vista, Taman Jurong, Marine Terrace — 2026-08-29

Task #65, resumed at user's explicit direction to push through the long tail faster
("keep going for the next 59"). Re-audited after Batch BA (541 zero-menu brands) and
found a large cluster of 6-brand-tier venues where every brand already carries a
real, dish-descriptive cuisine tag — no generic "Local & Hawker" placeholders, no
corporate-entity duplicates. Picked 15 such venues (90 brands) for one wide batch
instead of the usual 2-3, to make meaningfully faster progress per commit while
keeping the same verification rigor.

## Methodology change this batch (documented for transparency)

Every dish assignment below still comes directly from the brand's own existing
cuisine field — nothing is invented. What's different from earlier batches: 7 brands
in this selection carry only a broad category tag with no single identifiable dish
(Western Food, Malay Classics, Malay Cuisine, Indonesian Cuisine, Zi Char, Local
Delights, Kueh). In earlier batches (e.g. AX, AY, AZ) these would each get an
individual web-search research pass to try to identify the specific stall. Given the
volume target for this push, that step was skipped this batch — these 7 are left
untagged/uncovered exactly as before, flagged here as a worklist for a future
research pass rather than resolved now. This is a change in *how much effort* went
into each generic-tag brand, not a change in the never-fabricate standard: nothing
was guessed either way.

## Venues and dish assignments

| Venue | Covered | Skipped (generic tag, not researched this batch) |
|---|---|---|
| ABC Brickworks Market & Food Centre | 4/6 | Wow Wow West (Western Food), Nusa & Tara (Malay Classics) |
| Redhill Market | 6/6 | — |
| Bendemeer Market and Food Centre | 6/6 | — |
| Telok Blangah Crescent Food Centre | 5/6 | Kassim Stall (Malay Cuisine) |
| Holland Drive Market & Food Centre | 6/6 | — |
| People's Park Food Centre | 6/6 | — |
| Albert Centre Market & Food Centre | 5/6 | Pondok Makan Indonesia (Indonesian Cuisine) |
| East Coast Lagoon Food Village | 6/6 | — |
| Boon Lay Place Market & Food Village | 5/6 | Kee Hiong Food Stall (Zi Char) |
| Havelock Road Cooked Food Centre | 6/6 | — |
| Tanjong Pagar Plaza Market & Food Centre | 5/6 | Soon Heng Food Delights (Local Delights) |
| Serangoon Garden Market & Food Centre | 6/6 | — |
| Sims Vista Market & Food Centre | 5/6 | Fang Kee (Kueh — no specific kueh type named) |
| Taman Jurong Market & Food Centre | 6/6 | — |
| Marine Terrace Market & Food Centre | 6/6 | — |
| **Total** | **83/90** | **7 skipped** |

Full dish-name mapping is in `src/lib/menuItems.ts` (prefixes `abcb_`, `rhm_`,
`bmfc_`, `tbcfc_`, `hdmfc_`, `ppfc_`, `acmfc_`, `eclfv_`, `blpmfv_`, `hrcfc_`,
`tppmfc_`, `sgmfc_`, `svmfc_`, `tjmfc_`, `mtmfc_`). Notable mappings where the
brand's cuisine tag combined two dish concepts and one was picked as primary (same
approach as Batch AY's Eng Kee/Whampoa Soya Bean, but here 1 item per brand for
speed): "Kway Chap & Braised Duck" → Duck Set Kway Chap; "Mee Siam & Lontong" →
Mee Siam; "Tau Suan & Mango Milk Ice" → Tau Suan; "Fishball Noodle & Laksa" →
Fishball Noodles; "Prawn Noodle & Kway Chap" → Prawn Noodles; "Mee Pok & Sliced Fish
Soup" → Mee Pok.

## New dish types

- `Wanton Egg Noodles` — 🍜, Noodles, $4.5, 420 cal, 18g protein (same profile as
  Wanton Mee)
- `Bak Kwa` — 🥩, Chinese Roast, $8.0, 380 cal, 22g protein (BBQ dried meat slices,
  sold by weight; protein source not inferable from name alone — beef/chicken/pork
  bak kwa all exist)
- `Mee Pok` — 🍜, Noodles, $4.5, 460 cal, 20g protein (flat egg noodle, traditionally
  minced-pork-adjacent like Bak Chor Mee)
- `Rosti` — 🥔, Western, $6.5, 480 cal, 12g protein (Western-style potato dish)
- `Pizza` — 🍕, Western, $6.0, 600 cal, 22g protein (generic hawker-stall pizza)
- `Sichuan Grilled Fish` — 🐟, Sichuan, $8.5, 480 cal, 35g protein

## Diet tags (compatibleWith), set at creation time

Tagged: Satay Bee Hoon/Mee Siam/Satay/Roti Prata/Nasi Padang/Kebab Plate → halal +
no_pork; Nasi Lemak → halal + no_pork; Hainanese Chicken Rice/Duck Rice/Beef
Noodles/BBQ Chicken Wings/Yong Tau Foo/Rojak → no_pork; Tau Suan/Chwee Kueh/Bread →
no_pork + vegetarian (+ vegan for Tau Suan); Egg Prata → halal + no_pork +
vegetarian; North Indian Veg Set → halal + no_pork + vegetarian; Fish Soup/Oyster
Omelette/Fried Oyster/Sichuan Grilled Fish → no_pork + pescatarian; Hakka Thunder
Tea Rice → no_pork + vegetarian.

Left untagged (established conservative rules, pork-adjacent or ambiguous-protein
even when unnamed): Fried Hokkien Mee, Penang Laksa, Lor Mee, Fried Carrot Cake,
Laksa, Prawn Noodles, Fishball Noodles, Wanton Noodle/Wanton Egg Noodles, Porridge,
Roasted Meats, Duck Set Kway Chap, Xiao Long Bao, Bak Kwa (ambiguous protein), Popiah,
Char Kway Teow, Ban Mian, Bak Chor Mee, Pepper Rice (ambiguous protein), Rosti
(ambiguous egg/bacon topping), Pizza (ambiguous topping), Mee Pok, Ipoh Hor Fun,
Claypot Rice (ambiguous protein/sausage), Herbal Soup, Fried Kway Teow.

## Verification

- Item count: 2,087 → 2,170 (+83).
- 0 duplicate ids, 0 orphaned items, all 7 intentionally-skipped brands still
  zero-menu, 83 distinct brands covered by 83 items (1:1, no brand got 2 items this
  batch).
- Zero-menu-brand count: 541 → 458 (−83), total brand count unchanged at 1,749.
- Spot checks: Bak Chor Mee → no compatibleWith (correct), Sichuan Grilled Fish →
  `["no_pork", "pescatarian"]`.
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +83 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +6 dish types ("Batch BB additions" block).

## Follow-up worklist

The 7 generic-tag skips from this batch (Wow Wow West, Nusa & Tara, Kassim Stall,
Pondok Makan Indonesia, Kee Hiong Food Stall, Soon Heng Food Delights, Fang Kee) are
candidates for a future individual-research pass, same treatment as the
successfully-resolved generic-tag brands in Batches AV/AW/AX/AY (e.g. Warong Jawa,
Barakath International).
