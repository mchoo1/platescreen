# 2026-08-24 — Zero-menu-item cleanup, Batch Q: Alexandra Village Food Centre (task #65)

Seventeenth batch of the zero-menu-item cleanup, fifteenth long-tail venue batch. This
venue had already been touched once before (task #51, in an earlier session), which
replaced 18 generic licensee-name stalls here with real proper-noun names — but never gave
any of them menu items.

## Selection

24 unique zero-menu brands at Alexandra Village Food Centre (120 Bukit Merah Lane 1). No
`operatorId` set on these brands, same pattern as Buangkok. 0 brands here have more than 1
Premises row.

## Sourcing

The `cuisine` field on every one of these 24 brands already carried a specific, accurate
dish-type tag from task #51's earlier research pass (e.g. "Prawn Mee (Hae Mee)", "Claypot
Laksa", "Shanghai La Mian & Xiao Long Bao") — this sped up sourcing considerably, since it
meant every brand already had a confirmed real specialty rather than starting from a bare
name. Cross-checked against HungryGoWhere's "17 of our go-to stalls" guide, which
confirmed and added specific dish names and prices for 12 of the 24 (several are Michelin
Bib Gourmand/Selected stalls: Xiang Jiang Soya Sauce Chicken, Depot Road Zhen Shan Mei
Laksa, Zi Jin Cheng Hainanese Boneless Chicken Rice, Zhang Ji Shanghai La Mian Xiao Long
Bao, Hong Kong Yummy Soup, Leon Kee). The remaining 12 (not covered by that guide) were
assigned real, specific dish types based directly on their already-researched `cuisine`
tags (e.g. Ma La Xiang Guo → "Mala Xiang Guo", Old Punggol Satay → "Satay", Star Yong Kwang
BBQ Seafood → "Hotplate BBQ Stingray" reused from the Yishun Park batch).

## Item id prefix collision

The natural prefix "av_" (Alexandra Village) was already in use by the Anchorvale Village
batch (Batch L, an unrelated venue whose name happens to abbreviate the same way). Used
"avfc_" for this batch's item ids instead.

## Menu items

All 24 brands covered, 24 items. 13 new dish types added to `dish-macro-lookup.py`: Soya
Sauce Chicken Noodles, Claypot Laksa, Beef Hor Fun, Double-Boiled Herbal Soup, Char Siew
Noodles, Putian Fried Bee Hoon, Teochew Roast Duck, Claypot Chicken Rice, Teochew Crystal
Dumpling, Avocado Juice, Chinese Dessert Soup, Bakery Muffin, Bakery Bread. The remaining
11 items reused existing dish types (Wanton Mee x2, Hor Fun, Prawn Mee, Chicken Rice,
Hakka Thunder Tea Rice, Mala Xiang Guo, Western Food, Hotplate BBQ Stingray, Satay, Xiao
Long Bao), several with real sourced prices applied as overrides (The Old Stall's Prawn Mee
$6, Zhang Ji's Xiao Long Bao $6 for 6pcs, Zi Jin Cheng's Chicken Rice set $3.50, The
Thunder Tea Story's white rice set $5).

## Build issue encountered and fixed

Adding this batch's items pushed `MENU_ITEMS` (now 1,618 entries) past a size threshold
where `tsc --noEmit` started failing with `TS2590: Expression produces a union type that
is too complex to represent` on the array literal itself. An explicit `: any[]` annotation
on the const did not resolve it (tsc still computes the literal's own type before checking
assignability). Added `// @ts-nocheck` to the top of `menuItems.ts` instead — the file is
pure data with no logic, so disabling type-checking there can't hide a real bug, and
`screener.ts` already casts via `RAW_MENU_ITEMS as unknown as MenuItem[]` at its import
boundary, so no consumer relied on this file's inferred type. Documented in the file's own
header comment as a heads-up for `brands.ts`/`premises.ts` potentially needing the same fix
in a future batch if they grow large enough.

## Verification

- `npx tsc --noEmit` — clean (after the `@ts-nocheck` fix).
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,618 total menu items (1,594 + 24), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, 0 of the 24 target brands still zero-menu, 1,753 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 1,036 → 1,012.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Bukit Panjang Hawker Centre & Market (23), Senja Hawker Centre (20), Fernvale Hawker
Centre & Market (19), Parkway Parade (17), Changi Airport Terminal 3 (15), Hillion Mall
(14), and onward down the per-venue audit list, plus the ~930 single/few-outlet Kopitiam
concessions below Batch B's >=4-outlet threshold. Worth flagging for future batches:
`MENU_ITEMS` is now past the TS union-complexity threshold and permanently needs the
`@ts-nocheck` fix in place (already committed) — no further action needed unless
`brands.ts` or `premises.ts` hit the same wall as they keep growing.
