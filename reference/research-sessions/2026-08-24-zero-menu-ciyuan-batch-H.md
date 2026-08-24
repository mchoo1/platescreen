# 2026-08-24 — Zero-menu-item cleanup, Batch H: Ci Yuan Hawker Centre (task #65)

Eighth batch of the zero-menu-item cleanup, sixth long-tail venue batch. First venue
operated by Fei Siong rather than Kopitiam/Koufu/Canopy Hawkers — no cached dish data
available, but the operator's own site turned out to have solid per-stall detail.

## Selection

37 unique zero-menu brands at Ci Yuan Hawker Centre, all `operatorId: "fei_siong"`
(Brand/Premises records for these were added earlier this session under task #48; this
batch adds the MenuItems that were never attached).

## Sourcing

Primary source: the venue's own site, `ciyuanhawker.com.sg/index.php/our-stalls`, which
lists real per-stall names and dish descriptions for most of the 37 stalls. 30 stalls
matched a page entry directly (e.g. Ah Koon Authentic Hainanese Chicken Rice, HK Wanton
Noodle, Teochew Handmade Fishball Noodle, Yew Kee Duck Rice, Traditional Prawn Noodle).

7 stalls had thin or no page detail and were given a single dish inferred from the
stall's own descriptive/trading name, flagged here as lower-certainty per the Batch D
convention:
- `fei_siong_chang_cheng` -> Economical Rice
- `fei_siong_indo_rampai` -> Nasi Campur
- `fei_siong_unnamed` (文冬口茶餐室) -> Kopi
- `fei_siong_xiang_guo_shi_dai` -> Mala Xiang Guo
- `fei_siong_ipoh_cuisine` -> Ipoh Hor Fun
- `fei_siong_munchies_pancake` -> Peanut Pancake
- `fei_siong_daun_pisang` -> South Indian Banana Leaf Rice

## Menu items

All 37 brands covered, 39 items (2 stalls given 2 items each: the soya bean/you tiao
stall, and the cheong fun/porridge stall). 9 new dish types added to
`dish-macro-lookup.py` (Steamed Pau, Watercress Pork Ribs Soup, Meatball Minced Meat
Noodle, Salted Egg Shrimp Ball, Chicken Oyako Don, Cheong Fun, ABC Juice, Ipoh Hor Fun,
South Indian Banana Leaf Rice), plus 2 more added mid-batch when the generator first ran
(You Tiao, Nasi Lemak Ayam Taliwang).

**Incidental fix**: found a pre-existing typo in `dish-macro-lookup.py` itself —
`"Fried Osyter"` — while wiring up the Mei Shi Quan stall's dish. Confirmed via `grep`
that it had never been used in a shipped `MenuItem` (`0` matches in `menuItems.ts`), so
this was a clean fix rather than a rename requiring cross-file updates: corrected the key
to `"Fried Oyster"` and its category from `Bakery/Dessert` to `Local Hawker`, which fits
the dish better.

**Process note**: mid-batch, the item-splice script was first run against the build
mirror path instead of the live repo path, then a later "copy live -> mirror" step
clobbered that work before it was caught. Caught immediately via the verify script
showing an unchanged item count (1,327 instead of the expected 1,366) and zero `cy_`
items in either file; re-ran the splice against the correct live path and re-verified
before proceeding. Also hit a missing-comma issue at the splice point, since the last
item before the insertion point had no trailing comma (house style) — fixed by adding
the comma before the new block rather than changing house style.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,366 total menu items (1,327 + 39), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, 0 of the 37 Ci Yuan target brands still zero-menu.
- Zero-menu-item brand count: 1,312 → 1,275.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

One Punggol Hawker Centre (35, previously blocked by inconsistent redirects per
`2026-08-23-bukit-canberra-yishun-park-hawker-centres.md` — worth retrying), Kopitiam @
Our Tampines Hub (35), Kopitiam @ Northpoint City (33), Kopitiam Square (33), Bukit
Panjang Hawker Centre & Market (27), Yishun Park Hawker Centre (27), Senja Hawker Centre
(25), Buangkok Hawker Centre (25), Alexandra Village Food Centre (24), Fernvale Hawker
Centre & Market (23), Parkway Parade (20), and onward down the per-venue audit list, plus
the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold.
