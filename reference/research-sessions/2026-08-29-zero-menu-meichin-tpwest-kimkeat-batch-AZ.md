# Batch AZ: Mei Chin Road Market + Toa Payoh West Market and Food Court + Kim Keat Palm Market and Food Centre — 2026-08-29

Task #65, continuing the multi-venue batching approach at the 6-brand tier (re-audit
after Batch AY: 573 zero-menu brands, 51 venues in the 6-brand tier).

## Venues and results

### Mei Chin Road Market (4 of 6 covered)

Two brands share the identical SFA licensee name "Goh Jee Tee" at adjacent units
(#02-22 and #02-23) — likely one hawker running two stalls, or two separate people
with the same name; the data doesn't distinguish. Web research found a July 2026
kopitiam.com.sg guide placing **Sin Kee Famous Chicken Rice** at #02-22 specifically
(unit-number match, same evidentiary standard used for prior licensee-name
resolutions this session) — added Chicken Rice for that one. Nothing was found for
#02-23, left as-is. **Lee Kee Yeo @Lee Lian Hong** (#02-09) — several stall-directory
sources cover this market in detail but skip straight past #02-09; nothing found,
left as-is.
- Shi Hui Yuan Hor Fun Specialty (cuisine: Ipoh Hor Fun) → Ipoh Hor Fun
- Xin Lu Teochew Fishball Noodle / Hup Kee Teochew Fishball Noodles (cuisine: Teochew
  Fishball Noodle, both) → Fishball Noodles

### Toa Payoh West Market and Food Court (5 of 6 covered)

- Chey Sua Carrot Cake → Fried Carrot Cake
- Come Daily Fried Hokkien Prawn Mee → Fried Hokkien Prawn Mee
- Da Cheng Kway Chap → Kway Chap
- Hong Kong Lung Hwa Roast Duck → Roast Duck
- Jia Le Man Fen Guo (cuisine tag lists "Fish Soup, Porridge & Mee Hoon Kueh," but the
  stall's own name literally contains "Fen Guo" — dialect for Mian Fen Guo, an
  existing dish type) → Mian Fen Guo
- **Chang Cheng Food Paradise Pte. Ltd.** — researched via ACRA/company records
  (UEN 200903588C): a 160+-outlet F&B *operating company*, not a stall — runs four
  house brands (Chang Cheng Chinese Vegetables Rice, Rong Kee Roasted Delights, Ming
  Kitchen Seafood Restaurant, Chang Cheng Mee Wah Coffeeshop) across Singapore. Its
  exact signboard at this specific unit couldn't be confirmed. **Skipped** — same
  operator-entity pattern as "New Century Food House @ 721 Pte Ltd" (Batch AV) and
  "Chang Cheng Food Paradise" fits that mold exactly: adding a dish here would be
  guessing which of four house brands (or something else) actually occupies the unit.

### Kim Keat Palm Market and Food Centre (5 of 6 covered)

- LiXin Chao Zhou Fishball Noodle → Fishball Noodles
- Hai Nan Xing Zhou Beef Noodle → Beef Noodles
- Min Kee Tanjong Rhu Wanton Noodle → Wanton Mee
- Old Long House Popiah → Popiah
- Ah Chuan Fried Oyster Omelette (cuisine tag also mentions Carrot Cake) → Oyster
  Omelette
- **Chang Lai Pte. Ltd.** — its SFA premises record lists the address "801 Lorong 7
  Toa Payoh #08-00 Wearnes Building," a different building entirely from the other 5
  brands at this venue (22 Lorong 7 Toa Payoh, confirmed via multiple independent
  hawker-centre sources). Its actual ACRA-registered address (UEN 201406315G) is 11
  Woodlands Close — a third, unrelated location. No source connects this company to
  Wearnes Building or to any stall at Kim Keat Palm. **Skipped** — this looks like a
  data-grouping error (a company record with a mismatched address got attributed to
  the wrong hawker centre's brand list), not a real stall to research a dish for.
  Flagged below as a data-quality issue rather than corrected in this batch.

## New dish types

None — all 14 dishes (Chicken Rice, Ipoh Hor Fun, Fishball Noodles, Fried Carrot
Cake, Fried Hokkien Prawn Mee, Kway Chap, Roast Duck, Mian Fen Guo, Beef Noodles,
Wanton Mee, Popiah, Oyster Omelette) already existed in dish-macro-lookup.py.

## Diet tags (compatibleWith), set at creation time

Chicken Rice → no_pork; Roast Duck → no_pork; Beef Noodles → no_pork; Oyster
Omelette → no_pork + pescatarian. Left untagged (established conservative rules):
Ipoh Hor Fun and Mian Fen Guo (generic noodle/soup base, protein/stock unstated),
Fishball Noodles / Fried Hokkien Prawn Mee / Kway Chap / Wanton Mee / Fried Carrot
Cake (traditionally pork-lard/pork-adjacent even when unnamed), Popiah (traditional
filling includes meat).

## New data-quality finding: mis-grouped premises record

"Chang Lai Pte. Ltd." at Kim Keat Palm is the second instance this session (after
Batch AY's licensee-name-duplicate finding) of a brand record that doesn't actually
belong where the data says it does — here, an address mismatch rather than a
duplicate-stall issue. Recommend a future pass cross-checking every brand whose
listed premises address doesn't match its venue-mates' addresses, since this pattern
likely recurs elsewhere in the SFA-derived long tail.

## Verification

- Item count: 2,055 → 2,069 (+14).
- 0 duplicate ids, 0 orphaned items, all 14 target brands covered, all 4 skipped
  brands (2x Mei Chin generic, Chang Cheng Food Paradise, Chang Lai) still zero-menu.
- Zero-menu-brand count: 573 → 559 (−14), total brand count unchanged at 1,749.
- Spot checks: Chicken Rice → `["no_pork"]`, Popiah → no compatibleWith (as
  intended).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for `menuItems.ts`
  (`dish-macro-lookup.py` untouched this batch — no new dish types needed).

## Files touched

- `src/lib/menuItems.ts` — +14 items, header comment updated with this batch's entry.
