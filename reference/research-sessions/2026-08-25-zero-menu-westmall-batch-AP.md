# 2026-08-25 — Zero-menu-item cleanup, Batch AP: West Mall (task #65)

Forty-second batch of the zero-menu-item cleanup, sixth batch of the re-run fresh audit.
Clean, routine 100%-Kopitiam batch.

## Selection

9 unique zero-menu brands at West Mall, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names (including one with an
apostrophe, Tracy's Sarawak Kolo Mee, and one with an idiomatic name, Sorrowful Romance
Claypot Rice — both confirmed real via the Kopitiam stall-dishes cache).

## Sourcing

All 9 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. Two brands
(Ampang Yong Tau Foo/Wen Xiang Yuan, Hao Wei Mixed Rice) had multiple listed dishes; picked
the option already present in `dish-macro-lookup.py` (Yong Tau Foo, Economical Rice) to avoid
unnecessary new entries.

## Menu items

All 9 brands covered, 9 items. 2 new dish types added to `dish-macro-lookup.py` (Char Seow
Kolomee, Sorrowful Romance Claypot Rice); the remaining 7 items reused existing dish types
(Steamboat, Yong Tau Foo, Roasted Chicken Rice, Ayam Penyet, Beef Bulgogi, Mala Xiang Guo,
Economical Rice).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,957 total menu items (1,948 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 678 → 669.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's remaining 9-brand tier: Berseh Food Centre; then the 8-brand tier (Pasir Ris
527C, Keat Hong Food Centre and Market, Bagus @ Pasir Ris Mall, Bagus @ Paya Lebar Square,
Kebun Baru Food Centre, Adam Road Food Centre); then the 7-brand tier and below, continuing
down the 168-venue list. Plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared venue
leverage.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
