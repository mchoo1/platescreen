# 2026-08-24 — Zero-menu-item cleanup, Batch AO: Jurong West Central 679 (task #65)

Forty-first batch of the zero-menu-item cleanup, fifth batch of the re-run fresh audit. Clean,
routine 100%-Kopitiam batch.

## Selection

9 unique zero-menu brands at Jurong West Central 679, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names — including "Drink Counter",
which reads generic but is a real stall with its own listed breakfast/drink dishes in the
Kopitiam data (not skipped, since it has an actual, specific dish set).

## Sourcing

All 9 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. Several brands
(NKS Indian Muslim Food, Drink Counter, Chang Cheng Mixed Rice) had multiple listed dishes;
picked the option already present in `dish-macro-lookup.py` where possible (Roti Prata, Kaya
Toast, Economical Rice) to avoid unnecessary new entries.

## Menu items

All 9 brands covered, 9 items. 2 new dish types added to `dish-macro-lookup.py` (Roasted Duck,
Claypot Bak Kut Teh); the remaining 7 items reused existing dish types (Roti Prata, Curry Fish
head, Ban Mian, Nasi Lemak, Kaya Toast, Economical Rice, Bimbimbap).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,948 total menu items (1,939 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 687 → 678.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's remaining 9-brand tier: West Mall, Berseh Food Centre; then the 8-brand tier
(Pasir Ris 527C, Keat Hong Food Centre and Market, Bagus @ Pasir Ris Mall, Bagus @ Paya Lebar
Square, Kebun Baru Food Centre, Adam Road Food Centre); then the 7-brand tier and below,
continuing down the 168-venue list. Plus the ~930 single/few-outlet Kopitiam concessions below
Batch B's >=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared
venue leverage.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
