# 2026-08-25 — Zero-menu-item cleanup, Batch AS: Bagus @ Paya Lebar Square (task #65)

Forty-fifth batch of the zero-menu-item cleanup, second batch of the re-run audit's 8-brand
tier. Clean, routine 100%-Kopitiam batch.

## Selection

8 unique zero-menu brands at Bagus @ Paya Lebar Square, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names.

## Sourcing

All 8 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. Two brands (Pak
Lum Malaysian Cuisine, Tornado Egg Curry Rice & Donburi) had multiple listed dishes; picked the
option already present in `dish-macro-lookup.py` (Char Kway Teow, Teppanyaki Chicken Omu Curry
Rice) to avoid unnecessary new entries.

## Menu items

All 8 brands covered, 8 items. 3 new dish types added to `dish-macro-lookup.py` (Indo Mie
Chicken Cutlet, Banana Fritters, Hey! Pepper Beef); the remaining 5 items reused existing dish
types (Char Kway Teow, Roasted Chicken Rice, Mala Xiang Guo, Ayam Penyet, Teppanyaki Chicken
Omu Curry Rice).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,982 total menu items (1,974 + 8), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 8 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 652 → 644.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's remaining 8-brand tier: Kebun Baru Food Centre, Adam Road Food Centre; then the
7-brand tier (Teban Gardens Market and Food Centre, Clementi West Street 2 Blk 726, Pasir Ris
527C, Haig Road Market & Food Centre, Ghim Moh Market & Food Centre); then 6-brand and below,
continuing down the 168-venue list. Plus the ~930 single/few-outlet Kopitiam concessions below
Batch B's >=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared
venue leverage.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
