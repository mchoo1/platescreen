# 2026-09-02 — Fix duplicate menu items caused by the earlier brand merge

## Why

Found during a live UI review requested right after the duplicate-brand
merge (`2026-09-02-duplicate-brand-merge.md`): McDonald's brand page
(`/brand/mcd`) showed "Big Mac" listed **twice** with conflicting values
(558 cal/$6.75 vs 550 cal/$7.20). This is a regression from that merge —
when a duplicate brand's single MenuItem was repointed to the real
brand's id, it wasn't checked against the real brand's existing catalog
for a same-name collision.

A full scan for `(brandId, name)` pairs appearing more than once turned up
exactly 4 groups, all traceable to the same merge:

| Brand | Dish | Surviving item | Removed item (source) |
|---|---|---|---|
| `mcd` | Big Mac | `mcd_big_mac` (558cal/$6.75, verified) | `bn216_3` (550cal/$7.20, estimated — from the merged `bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd`) |
| `breadtalk` | Pork Floss Bun | `bt_floss_bun` (280cal/$2.20, estimated, isPopular) | `hg105_3` (240cal/$2.20, estimated — from the merged `hougang_105_hainanese_village_centre_breadtalk_pte_ltd`) |
| `bengawan_solo` | Kueh Lapis | `pr_bengawan_solo_pte_ltd_kueh_lapis` (220cal/$2.00) | `hg105_2` + `bn216_1` (both identical 220cal/$2.00 — from the merged Hougang and Bedok North duplicates) |
| `dominos` | Pepperoni Pizza | `arf_13` (700cal/$9.90) | `bn216_2` (identical 700cal/$9.90 — from the merged Bedok North duplicate) |

The `bengawan_solo` and `dominos` cases weren't visually "conflicting"
(identical values) but were still exact duplicate rows that would have
shown the same dish twice on those brand pages.

## Method

Kept the higher-confidence/original entry in each group (all 4 survivors
were either `confidence: "verified"` or the pre-existing, better-
categorized entry) and removed the 5 redundant rows using the same
brace-depth object-boundary deletion approach used for the earlier
duplicate-brand merge. Checked each removed item's `compatibleWith`
before deleting — all 5 had none, so no tag data was lost by keeping the
surviving item instead.

## Result

5 duplicate MenuItem rows removed (`bn216_1`, `bn216_2`, `bn216_3`,
`hg105_2`, `hg105_3`). Total MenuItems: 2,562 → 2,557.

## Verification

- `npx tsc --noEmit`: clean.
- Runtime integrity check: 0 duplicate ids across Brands (1,716) /
  Premises (4,683) / MenuItems (2,557), 0 orphaned `brandId` references,
  all 5 removed ids confirmed absent, and a full re-scan for
  `(brandId, name)` duplicate groups now returns **zero** — this was the
  only source of this bug pattern in the current dataset.
- Diet-tag coverage: 64.5% (1,650/2,557) — unchanged in percentage terms
  from before this fix (1,652/2,562), consistent with removing 5
  already-untagged rows.

## Lesson for future brand merges

When merging a duplicate Brand's MenuItems into an existing Brand (as in
the 2026-09-02 duplicate-brand-merge session), check the target brand's
existing item names for a collision *before* repointing — don't just
verify no orphaned/duplicate *ids* afterward. Id-uniqueness and
name-collision are different checks; this session's original merge
verification only caught the former. Recommend adding a
same-brand-same-name scan to the standard verification checklist for any
future brand-merge or Premises/MenuItem-repointing work.
