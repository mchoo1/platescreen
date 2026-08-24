# 2026-08-24 — Zero-menu-item cleanup, Batch I: One Punggol Hawker Centre (task #65)

Ninth batch of the zero-menu-item cleanup, seventh long-tail venue batch. This venue had
been blocked in an earlier session (per
`2026-08-23-bukit-canberra-yishun-park-hawker-centres.md`) by inconsistent HTTP redirects
on its site - retried this session and it worked cleanly.

## Selection

35 unique zero-menu brands at One Punggol Hawker Centre (managed by Timbre Group, opened
2022), the single highest-leverage remaining venue per the per-venue audit re-run at the
top of this batch.

## Sourcing

Primary source: the venue's own site, `onepunggolhc.sg/hawker-heroes/`, which lists a
real category/dish tag for every one of its 34 active stalls (e.g. "Wanton Noodle",
"Herbal Bak Ku Teh", "Claypot Rice", "Japanese Teppanyaki Bento") - the cleanest official
per-stall source found so far for a non-Kopitiam venue. Cross-checked against Daniel Food
Diary, Little Day Out, Eatbook, and SethLui review articles for specific prices and dish
names where available (e.g. Kwang Kee's Sliced Fish Porridge $6.50, OBBA Jjajang's
Jjajangmyeon $6.80, No. 25's Signature Minced Meat Noodle $8, Uncle Penyet's Ayam Penyet
Set $6.50).

**Excluded**: `one_punggol_hawker_centre_cold_storage_singapore_1983_pte_ltd` - the same
stale generic-licensee-name artifact pattern first identified at Punggol Coast in Batch F
(the supermarket chain's corporate registration name, not a real food stall). Left
zero-menu deliberately, consistent with that precedent.

## Menu items

34 of 35 brands covered, 35 items (the drinks stall, Tuckshop, given 2 items - Kopi and
Teh, per the Happy Hawkers/hill_street_coffee_shop precedent from Batches A/B for
beverage-only concepts). 13 new dish types added to `dish-macro-lookup.py` (Ayam Penyet
Set, Chicken Wings, Dim Sum, Nasi Rendang, Herbal Bak Kut Teh, Jjajangmyeon, XL Chicken
Cutlet, Tang Yuan Peanut Soup, Kimchi Jjigae, Minced Meat Noodle, Hakka Thunder Tea Rice,
Teppanyaki Bento, Butter Chicken Naan Set), plus 5 more added mid-batch once specific
dish names were confirmed (Signature Minced Meat Noodle, Sliced Fish Porridge, Century
Egg w Lean Meat Porridge, Cut Fruits, Roasted Duck Pizza).

**Process note**: applied the Batch H lesson directly this time - spliced the new items
into the live repo path first (not the build mirror), and had the splice script detect
whether a trailing comma was needed at the insertion point automatically rather than
assuming one convention, avoiding both mistakes that batch made.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,401 total menu items (1,366 + 35), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, only 1 of the 35 One Punggol target brands still zero-menu (the
  intentionally-excluded Cold Storage entry).
- Zero-menu-item brand count: 1,275 → 1,241.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Pasir Ris Central Hawker Centre (33), Kopitiam @ Our Tampines Hub (33), Anchorvale
Village Hawker Centre (32), Kopitiam @ Northpoint City (30), Kopitiam Square (28), Yishun
Park Hawker Centre (25), Buangkok Hawker Centre (25), Alexandra Village Food Centre (24),
Bukit Panjang Hawker Centre & Market (23), Senja Hawker Centre (20), Fernvale Hawker
Centre & Market (19), Parkway Parade (17), Changi Airport Terminal 3 (15), Hillion Mall
(14), and onward down the per-venue audit list, plus the ~930 single/few-outlet Kopitiam
concessions below Batch B's >=4-outlet threshold.
