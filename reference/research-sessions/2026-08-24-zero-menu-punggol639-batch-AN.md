# 2026-08-24 — Zero-menu-item cleanup, Batch AN: Punggol 639 (task #65)

Fortieth batch of the zero-menu-item cleanup, fourth batch of the re-run fresh audit. Clean,
routine 100%-Kopitiam batch.

## Selection

9 unique zero-menu brands at Punggol 639, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names.

## Sourcing

All 9 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. Two brands
(Ak Sait Restaurant, Kimly Dim Sum) had multiple listed dishes; picked the option already
present in `dish-macro-lookup.py` (Nasi Briyani, Dim Sum) to avoid unnecessary new entries.

## Menu items

All 9 brands covered, 9 items. 4 new dish types added to `dish-macro-lookup.py` (Nasi Sambal
Goreng, Asam Steamed Fish, Salted Egg Yolk Cutlet, Salted Egg Fried Chicken); the remaining 5
items reused existing dish types (Yong Tau Foo, Nasi Briyani, Dim Sum, Wanton Mee, Seafood
White Bee Hoon).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,939 total menu items (1,930 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 696 → 687.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's remaining 9-brand tier: Jurong West Central 679, West Mall, Berseh Food Centre;
then the 8-brand tier (Pasir Ris 527C, Keat Hong Food Centre and Market, Bagus @ Pasir Ris
Mall, Bagus @ Paya Lebar Square, Kebun Baru Food Centre, Adam Road Food Centre); then the
7-brand tier and below, continuing down the 168-venue list. Plus the ~930 single/few-outlet
Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long tail of true
single-outlet stalls with no shared venue leverage.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user is pushing separately from their own machine.
