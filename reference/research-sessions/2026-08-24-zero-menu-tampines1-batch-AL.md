# 2026-08-24 — Zero-menu-item cleanup, Batch AL: Tampines 1 (task #65)

Thirty-eighth batch of the zero-menu-item cleanup, second batch of the re-run fresh audit.
Clean, routine batch — first non-Kopitiam batch in this tier (Hawkers' Street operator).

## Selection

9 zero-menu brands at Tampines 1, all `operatorId: "hawkers_street"`, all real distinct
proper-noun stall names.

## Sourcing

All 9 brands' dishes were derivable directly from their existing specific `cuisine` field
(Hainanese Chicken Rice, Penang / Malaysian, Fried Rice, Japanese Ramen, Wanton Mee, Teochew,
Nasi Lemak, Western, Kway Chap) — no external research needed, since these tags were already
specific real dish/cuisine descriptions rather than generic placeholders.

## Menu items

All 9 brands covered, 9 items. 2 new dish types added to `dish-macro-lookup.py` (Hainanese
Chicken Rice, Penang Laksa); the remaining 7 items reused existing dish types (Fried Rice,
Tonkotsu Chashu Ramen, Wanton Mee, Satay Bee Hoon, Nasi Lemak, Mixed Grill, Kway Chap).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,921 total menu items (1,912 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 714 → 705.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's remaining 9-brand tier: Changi General Hospital, Punggol 639, Jurong West
Central 679, West Mall, Berseh Food Centre; then the 8-brand tier and onward down the
168-venue list. Plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared venue
leverage.

**Note:** mid-session, discovered that this repo's 78+ commits (including all zero-menu-item
cleanup work) had never been pushed to `origin/main`, so none of it was live on the deployed
Vercel app. The user has since begun pushing from their own machine (this sandbox has no
GitHub credentials to push directly).
