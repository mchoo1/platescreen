# 2026-08-24 — Zero-menu-item cleanup, Batch J: Pasir Ris Central Hawker Centre (task #65)

Tenth batch of the zero-menu-item cleanup, eighth long-tail venue batch. Checked the
operator mix first this time as standard practice since Batch F.

## Selection

33 unique zero-menu brands at Pasir Ris Central Hawker Centre - a mixed venue like
Punggol Coast: 26 Kopitiam-operated concessions (cache hit) plus 7 non-Kopitiam brands,
one of which turned out to be another duplicate.

## Sourcing

26 Kopitiam stalls matched `reference/data/kopitiam-stall-dishes.json` directly. The
remaining 7 non-Kopitiam brands were individually researched:
- Bee Cheng Hiang (real bak kwa/dried-meat chain) - Sliced Bak Kwa (100g), ~$7.50/100g
  per current CNY 2026 pricing coverage.
- Bengawan Solo (real Nyonya kueh/cake chain) - Kueh Lapis.
- Prawnaholic - Special Prawn Noodles ($6.50).
- Ayam Penyet (standalone brand, distinct from the Kopitiam concession of the same
  concept name) - Ayam Penyet ($6).
- Siap Lah! - Thai Boat Noodles.
- Daburu (Japanese) - Hamburg Hot Bun ($7.90).
- **Wild Olives** - turned out to be a duplicate (see below), not given new items.

**Duplicate found and removed**: `pasir_ris_central_hawker_centre_wild_olives` (raw
SFA-licensee-derived, generic cuisine "Western Grill") and `kopitiam_wild_olives`
(Kopitiam site scrape, operatorId set) are the same real stall - same name, same
address/postal (110 Pasir Ris Central, Singapore 519641), both zero-menu. Same exact
pattern as the 5 duplicates found at Punggol Coast in Batch F. Removed the SFA-licensee
version's Brand and Premises rows; kept the Kopitiam-scrape version, which is covered
below with a real dish (Grilled Chicken with Mushroom Sauce, from the Kopitiam cache).
1,767 → 1,766 brands.

## Menu items

32 of 33 target brands covered (32 items; the removed duplicate accounts for the 33rd).
18 new dish types added to `dish-macro-lookup.py` (Ayam Penyet, Nasi Sambal Goreng Set,
Indian Muslim Rojak, Signature Claypot Herbal Mutton Soup, Traditional Lor Mee,
Signature Braised Pork Rice Combo, Chicken Cutlet, Cafe Latte, Longan Walnut Muffin,
Flying Dragon Noodles, Grilled Chicken with Mushroom Sauce, Nasi Lemak with Chicken Wing
Set, Ayam Curry Kapitan Set, Sliced Bak Kwa (100g), Kueh Lapis, Special Prawn Noodles,
Thai Boat Noodles, Hamburg Hot Bun).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,766 total brands (1,767 − 1 removed), 0 duplicate brand ids, 1,433
  total menu items (1,401 + 32), 0 duplicate item ids, 0 orphaned items/premises, all 32
  covered target brands confirmed, the removed duplicate confirmed gone and the kept
  Kopitiam version confirmed present.
- Zero-menu-item brand count: 1,241 → 1,208.
- Live vs build-mirror `menuItems.ts`, `brands.ts`, `premises.ts`,
  `dish-macro-lookup.py` — all byte-identical diffs.

## What's next

Kopitiam @ Our Tampines Hub (33), Anchorvale Village Hawker Centre (32), Kopitiam @
Northpoint City (30), Kopitiam Square (28), Yishun Park Hawker Centre (25), Buangkok
Hawker Centre (25), Alexandra Village Food Centre (24), Bukit Panjang Hawker Centre &
Market (23), Senja Hawker Centre (20), Fernvale Hawker Centre & Market (19), Parkway
Parade (17), Changi Airport Terminal 3 (15), Hillion Mall (14), and onward down the
per-venue audit list, plus the ~930 single/few-outlet Kopitiam concessions below Batch
B's >=4-outlet threshold. Worth continuing the operator-mix check per venue - two
duplicate-brand clusters found so far (Batches F and J) both involved a raw
SFA-licensee-derived id alongside a Kopitiam-scrape id for the same real stall.
