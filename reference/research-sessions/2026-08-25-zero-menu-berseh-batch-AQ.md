# 2026-08-25 — Zero-menu-item cleanup, Batch AQ: Berseh Food Centre (task #65)

Forty-third batch of the zero-menu-item cleanup, seventh and final batch of the re-run fresh
audit's 9-brand tier. This closes out the tier entirely.

## Selection

9 unique zero-menu brands at Berseh Food Centre, `operatorId: undefined`, `type: "hawker"`.
These brands were already given real, specific proper-noun stall names with dish-descriptive
cuisine tags back in Batch 51 (the original generic-licensee-name cleanup for Chomp
Chomp/Berseh/Alexandra Village) — but Batch 51 only fixed the names, it did not add menu
items, so these 9 remained zero-menu until now.

## Sourcing

All 9 brands' dishes were derivable directly from their existing specific `cuisine` field
(Fuzhou Oyster Cake, Fish Soup, Thai Tom Yum, Kway Chap / Pig's Organ Soup, Turtle Soup &
Claypot Rice, Curry Chicken Noodle, Kopi & Toast, Yong Tau Foo, Malay Curry Puffs) — no
external research needed, matching the pattern from Tampines 1 (Batch AL).

## Menu items

All 9 brands covered, 9 items. **0 new dish types** — every dish (Oyster Cake, Fish Soup, Tom
Yum Soup, Kway Chap, Claypot Rice, Curry Chicken Noodle, Kaya Toast, Yong Tau Foo, Epok-Epok)
already existed in `dish-macro-lookup.py` from earlier batches.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,966 total menu items (1,957 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 669 → 660.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs
  (dish-macro-lookup.py unchanged this batch, already in sync from Batch AP).

## What's next

The re-run audit's 9-brand tier is now fully cleared (Batches AK through AQ: Bedok North 216,
Tampines 1, Changi General Hospital, Punggol 639, Jurong West Central 679, West Mall, Berseh).
Next: the 8-brand tier (Bagus @ Pasir Ris Mall, Bagus @ Paya Lebar Square, Kebun Baru Food
Centre, Adam Road Food Centre — all tied at 8); then the 7-brand tier (Teban Gardens Market and
Food Centre, Clementi West Street 2 Blk 726, Pasir Ris 527C, Haig Road Market & Food Centre,
Ghim Moh Market & Food Centre); then 6-brand and below, continuing down the 168-venue list.
Plus the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus
the long tail of true single-outlet stalls with no shared venue leverage.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
