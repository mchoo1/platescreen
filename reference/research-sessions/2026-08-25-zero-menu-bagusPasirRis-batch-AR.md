# 2026-08-25 — Zero-menu-item cleanup, Batch AR: Bagus @ Pasir Ris Mall (task #65)

Forty-fourth batch of the zero-menu-item cleanup, first batch of the re-run audit's 8-brand
tier. Clean, routine 100%-Kopitiam batch.

## Selection

8 unique zero-menu brands at Bagus @ Pasir Ris Mall, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names.

## Sourcing

All 8 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. One brand (Hong
Le Korean Cuisine) had multiple listed dishes; picked the option already present in
`dish-macro-lookup.py` (Bimbimbap) to avoid an unnecessary new entry.

## Menu items

All 8 brands covered, 8 items. 2 new dish types added to `dish-macro-lookup.py` (Prawn Paste
Chicken Cutlet Fried Rice, Teppanyaki Chicken Omu Curry Rice); the remaining 6 items reused
existing dish types (Sliced Fish Soup, Bimbimbap, Roasted Chicken Rice, Mala Xiang Guo,
Scrambled Egg Rice, Beef Roti).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,974 total menu items (1,966 + 8), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 8 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 660 → 652.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's remaining 8-brand tier: Bagus @ Paya Lebar Square, Kebun Baru Food Centre, Adam
Road Food Centre; then the 7-brand tier (Teban Gardens Market and Food Centre, Clementi West
Street 2 Blk 726, Pasir Ris 527C, Haig Road Market & Food Centre, Ghim Moh Market & Food
Centre); then 6-brand and below, continuing down the 168-venue list. Plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long tail
of true single-outlet stalls with no shared venue leverage.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
