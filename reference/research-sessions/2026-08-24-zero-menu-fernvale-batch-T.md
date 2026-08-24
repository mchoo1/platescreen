# 2026-08-24 — Zero-menu-item cleanup, Batch T: Fernvale Hawker Centre & Market (task #65)

Twentieth batch of the zero-menu-item cleanup, eighteenth long-tail venue batch. Another
clean, routine 100%-Kopitiam batch.

## Selection

25 unique zero-menu brands across Fernvale Hawker Centre & Market and Fernvale 437 (two
locationContext labels, same operator), all `operatorId: "kopitiam"`, all real distinct
proper-noun stall names.

## Duplicate check

`kopitiam_kopi_kiosk` again has 2 Premises rows here (Fernvale Hawker Centre & Market +
Fernvale 437) — same pattern confirmed clean as in Senja (Batch S): a genuine two-outlet
presence of the already-covered 69-outlet chain, not a duplicate.

## Menu items

All 25 brands covered, 25 items, all sourced directly from
`reference/data/kopitiam-stall-dishes.json`. 4 new dish types added to
`dish-macro-lookup.py` (Galbi Pork Belly Set, Crispy Chicken, Curry Chicken Noodle, Pork Rib
Soup); the rest reused existing dish types, including Curry Fish Head (added just one batch
earlier, in Senja, and reused here for Tai Pai Tong Seafood).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,702 total menu items (1,677 + 25), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 25 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 949 → 924.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Parkway Parade (17), Changi Airport Terminal 3 (15), Hillion Mall (14), and onward down the
per-venue audit list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold.
