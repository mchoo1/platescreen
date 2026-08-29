# Batch BK: scattered kopitiam_ broad-category sweep — 2026-08-29

Task #65. Follow-on from Batch BJ's methodology fix. After excluding the 5 Koufu
food-hall container brands, re-ran the cross-venue cherry-pick and found the
filter's "broad category" exclusion list (Western, Noodles, Seafood, Chinese
Roast, Korean, Indian, Coffeeshop Fare, etc.) was itself hiding 56 more
`operatorId: "kopitiam"` brands that never got resolved in Batches BF/BG/BH.
Those earlier batches only looked at kopitiam_ brands that were clustered into a
shared venue group (5 brands all sharing one venue's broad-category-tag
problem); these 56 are the same shape but scattered individually, one or two per
venue, spread across dozens of different venues — easy to miss without
specifically re-scanning every remaining kopitiam_ brand regardless of grouping.

## Method

Filtered all remaining uncovered brands for `operatorId === "kopitiam"` with a
broad-category (non-specific-dish) cuisine tag, then ran each brand's exact name
against `reference/data/kopitiam-stall-dishes.json` — the same site scrape used
in every kopitiam_ batch this segment. 56 of 56 resolved cleanly with real
per-stall dish data.

## Results (57 of 58 candidates covered)

56 kopitiam_ brands (full id/dish mapping in `src/lib/menuItems.ts`, prefix
`bkj2_`) plus 1 individually-researched non-kopitiam brand (Rosnah's Family
Kitchen, Ang Mo Kio 628 Market — sethlui confirms Lontong, Mee Rebus, and Mee
Soto as its most popular dishes; Lontong picked as flagship). 1 skip: Ding Dang
Guai (Bedok North Street 3 Blk 538) — search results only surfaced generic
venue-level info, no stall-specific dish found.

Notable picks: many "Roasted"/"Duck Rice"-family stalls (New HK Roast, Roasted,
Roasted Deligths, Ding Jian HK Style Charcoal Roasted, THUMBUPZ Roasted & Soup,
Ming Xiang, Char Meat, Braised Duck & Noodle) all mapped to the existing Duck
Rice dish type since that's the common thread across all their scraped listings.
Several "Korean & Japanese"-style stalls (Yes! Japanese Korean Cuisine, Xiang
Lian Korean and Japanese, Korean & Japanese, Korean & Japanese Food) all mapped
to Bibimbap, matching the identical scraped dish list each returned.

## Data-quality note

"Claypot Bak Kut Teh"'s scrape entry returned `["Salt Baked Chicken Rice"]` —
inconsistent with its own name, likely a scrape mismatch (adjacent-stall data
bleeding into the wrong key, a known risk with this JSON given its ~846 entries).
Given the brand's own name is unambiguous ("Claypot Bak Kut Teh"), it was trusted
over the possibly-wrong scrape result and mapped to the existing Bak Kut Teh dish
type instead — never a no_pork candidate either way.

"SingHK"'s scrape entry, `["Scrambled Egg w Garlic Park Chop"]`, is read as a
typo for "Pork Chop" (a known artifact pattern in this scrape — see "Roasted
Deligths" for "Delights" elsewhere) and mapped to the existing Pork Chop dish
type.

## New dish types

- `Chicken Pot` — 🍲, Chicken Rice/Poultry, $6.5, 480 cal, 30g protein.
- `Yang Zhou Fried Rice` — 🍚, Chinese Roast, $5.5, 580 cal, 20g protein
  (traditionally contains char siu/ham — ambiguous protein, left untagged).
- `BBQ Chicken Set` — 🍗, Japanese, $7.5, 550 cal, 32g protein.
- `Specialty Coffee` — ☕, Beverages, $4.0, 20 cal, 1g protein (black coffee,
  negligible macros).
- `Banh Mi` — 🥖, Vietnamese, $5.5, 480 cal, 20g protein (traditional Vietnamese
  banh mi commonly includes pork pate/cold cuts — left untagged).

## Diet tags (compatibleWith), set at creation time

Tagged: Duck Rice (×8, reused across every "Roasted"-family stall), Chicken Rice
(×3), Chicken Pot, Beef Bulgogi, Chicken Cutlet, Chicken Biryani, BBQ Chicken Set,
Curry Chicken Rice, Beef Roti, Herbal Chicken Soup → no_pork; Ayam Penyet, Roti
Prata (×2), Nasi Briyani, Nasi Padang, Mee Goreng, Lontong → halal + no_pork;
Fish Soup (×2) → no_pork + pescatarian; Coffee & Toast (×2), Vegetarian Bee Hoon
→ no_pork + vegetarian (+vegan for Vegetarian Bee Hoon); Specialty Coffee →
no_pork + vegetarian + vegan.

Left untagged (standing conservative rules): Curry Rice, Wanton Mee, Mala Xiang
Guo (×2), Fishball Noodles (×4), Lor Mee (×3), Ban Mian (×2), Mee Sua, Hor Fun,
Bibimbap (×5), Mee Hoon Kway, Yang Zhou Fried Rice, Banh Mi. Bak Kut Teh and Pork
Chop both carry no compatibleWith at all — same categorical exclusion applied to
every explicitly pork-named dish this session.

## Verification

- Item count: 2,462 → 2,519 (+57).
- 0 duplicate ids, 0 orphaned items, all 57 target brands confirmed covered
  (1:1), Ding Dang Guai confirmed still zero-menu.
- Zero-menu-brand count: 166 → 109 (−57), total brand count unchanged at 1,749.
- Spot checks: Bak Kut Teh (Claypot) → no compatibleWith, Pork Chop (SingHK) →
  no compatibleWith (both correct).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +57 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +5 dish types ("Batch BK additions" block).

## Status

All known kopitiam-operated broad-category-tag brands (clustered and scattered)
are now resolved. Remaining 109 zero-menu brands are corporate entities
(McDonald's, Cold Storage, Pizza Hut, KFC, Breadtalk, etc. — permanently out of
scope) or GENERIC "Local & Hawker" placeholder-name brands with no cuisine info
and no operator match — the only path forward for those is per-stall
identification (Google Maps/SFA licensee cross-reference), a substantially
heavier lift than any batch completed this session.
