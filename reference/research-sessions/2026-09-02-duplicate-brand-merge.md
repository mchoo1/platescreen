# 2026-09-02 — Merge 32 duplicate SFA-licensee-suffix brands

## Why

While looking for the next data-quality item to work on, an audit of Brand
display names for corporate-suffix patterns (`Pte Ltd`, `Holdings`,
`Management`, etc.) turned up 60 hits — names like "Mcdonald'S Restaurants
Pte. Ltd." and "Cold Storage Singapore (1983) Pte Ltd" that look like the
raw SFA `licensee_name`/`businessName` field was used as the display name
directly, rather than the real trading name. This is exactly the pattern
CLAUDE.md and `researchQueue.ts`'s own header comments have flagged before
("licensee_name values... are personal/legal names, not real trading
names") — but this specific set had not been audited.

Cross-checking each of the 60 against the existing Brand list found that
32 of them are not just badly-named — they are **exact duplicates** of a
chain that already has its own proper Brand row elsewhere in the dataset.
For example, `toa_payoh_lorong_4_blk_93_mcdonald_s_restaurants_pte_ltd`
("Mcdonald'S Restaurants Pte. Ltd.") and the existing `mcd` Brand
("McDonald's") are the same real-world restaurant chain, represented as
two separate Brand rows — meaning that specific outlet's data was
invisible to anything that queries by the `mcd` brand (search, filters,
brand pages) and instead sat under a single-outlet, badly-named,
undiscoverable duplicate.

## Method

Normalized every suspect Brand's name (stripped corporate suffixes:
`Pte Ltd`, `Holdings`, `Management`, `International`, `Concepts`, `F&B`,
year-in-parens, etc.) and compared it against every other Brand's
normalized name, looking for exact or substring matches to an
already-established, cleanly-named Brand (i.e. one whose `id` is a real
slug like `mcd`, not a hawker-centre-prefixed one). This surfaced 8
distinct real chains with 32 duplicate rows between them:

| Real brand | Duplicates found | Merged premises added |
|---|---|---|
| `cold_storage` (Cold Storage) | 16 | 16 |
| `mcd` (McDonald's) | 4 | 4 |
| `bengawan_solo` (Bengawan Solo) | 3 | 3 |
| `pizza_hut` (Pizza Hut) | 2 | 2 |
| `dominos` (Domino's Pizza) | 2 | 2 |
| `cheers` (Cheers) | 2 | 2 |
| `breadtalk` (BreadTalk) | 2 | 2 |
| `kfc` (KFC) | 1 | 1 |

Each duplicate had exactly 1 Premises row and 0–1 MenuItems. For each of
the 32: repointed its Premises row's `brandId` field from the duplicate id
to the real brand's id (kept the Premises `id` as-is — already globally
unique, no collision risk), repointed any MenuItem's `brandId` the same
way (7 MenuItems affected, all under `bengawan_solo`/`dominos`/`mcd`
duplicates that had a menu item), then deleted the 32 duplicate Brand
objects from `brands.ts` entirely. Used the brace-depth object-boundary
splice approach (scan backward from an `id`/`brandId` match to the
enclosing `{`, track depth forward to the matching `}`, edit or delete
only within that exact span) — the same proven method from the diet-tag
and halal audits — rather than line-based or naive text replacement,
since `brands.ts` entries have highly variable-length `notes` fields that
would make a fixed-window approach unsafe.

No macro/address/price data was invented or altered — this is a pure
re-pointing of existing, already-real data to its correct parent Brand,
identical in spirit to how `cold_storage`/`giant`/`7-eleven` were
originally disambiguated from a shared licensee back on 2026-08-21.

## Result

32 duplicate Brand rows removed. Total brands: 1,748 → 1,716. No Premises
or MenuItems were deleted — all 32 Premises rows and 7 MenuItems now
belong to the correct, real, already-existing Brand instead of an
invisible duplicate. Post-merge counts for the 8 real brands (premises /
menuItems): `cold_storage` 68/5, `mcd` 145/57, `pizza_hut` 67/12,
`dominos` 24/14, `cheers` 114/6, `breadtalk` 98/7, `bengawan_solo` 3/10,
`kfc` 84/11 — each grew by exactly the number of duplicates merged into
it.

## Verification

- `npx tsc --noEmit`: clean.
- Runtime integrity check (`tsx`, evaluating the real exported arrays): 0
  duplicate ids across Brands (1,716)/Premises (4,683)/MenuItems, 0
  orphaned `brandId` references in either Premises or MenuItems, all 32
  duplicate Brand ids confirmed absent, each target brand's post-merge
  premises/menuItem count confirmed to match the expected merge count
  exactly.
- Full `npm run build` not run to completion in this sandbox (same
  resource-ceiling pattern as prior data-only changes this week); this
  change touches only data files (`brands.ts`, `premises.ts`,
  `menuItems.ts`) with no page/component logic — confirm via the next
  Vercel deploy.

## Not done / left for later

- The remaining ~28 "Pte Ltd"-named Brand rows (e.g. "Big Bern'S American
  Grill Xpolis Pte. Ltd.", "E&P Cafeteria Pte. Ltd.", "Fei Siong (F&B)
  Holdings Pte. Ltd.") do **not** match any existing clean Brand — they
  appear to be genuine standalone/independent stalls whose corporate
  licensee name leaked into the display name, not duplicates of a chain
  that already exists elsewhere. These need a **display-name cleanup**
  pass (strip the corporate suffix, keep the real trading name — e.g.
  "Big Bern's American Grill", not a duplicate-merge), which is a
  different, lower-risk task than what this session did. Not attempted
  here to keep this pass scoped to the clear, well-corroborated duplicate
  case.
- Did not investigate whether any of the 28 non-duplicate cases are
  *themselves* duplicates of each other or of some other differently-named
  existing brand (e.g. "Fei Siong (F&B) Holdings Pte. Ltd." vs the
  `fei_siong` operator referenced elsewhere in the codebase) — flagged as
  worth a closer look in a future pass, not confirmed either way here.
