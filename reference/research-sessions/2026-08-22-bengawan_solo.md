# 2026-08-22 — Bengawan Solo (grab_go / grocery-track research)

## Selection

Scheduled `platescreen-research-grocery` run. Filtered `RESEARCH_QUEUE` to `status: 'pending'`
entries with `type` in `grab_go` / `ready_to_eat` / `supermarket`: 2 matched — `bengawan_solo`
(grab_go, priority low, array index 3) and `ok_convenience` (ready_to_eat, priority low, array
index 10). Both low priority, so array order decided it: Bengawan Solo was picked (first-listed
wins on tie). Confirmed `bengawan_solo` did not already exist as a `Brand.id` (an unrelated
string match on "Bengawan Solo Pte Ltd" — a hawker-centre stall licensee entity with different,
longer ids like `pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd` — showed up in `brands.ts`
but is not this brand).

## Brand researched

**Bengawan Solo** — Singapore heritage cake/kueh/confectionery chain (est. 1979), `grab_go` type,
`Nyonya Kueh` cuisine. Official site: bengawansolo.sg. No halal or other dietary certification
found on the official site, so `dietTags` was left empty rather than guessed.

## Sources used

- bengawansolo.sg — Signatures, Specialty Kueh category pages, and individual product pages
  (Ondeh-Ondeh, Pandan Chiffon (R), Pineapple Tarts (330g)) — official prices and package sizes.
- bengawansolo.sg/about-us — brand background (no dietary certification claims found).
- FatSecret Singapore (fatsecret.com.sg) — Bengawan Solo brand-specific listings (Platform API
  sourced) for Kueh Lapis (157 cal/33g slice), Lapis Sagu (120 cal/100g), and Pandan Chiffon Cake
  (97 cal/39g slice — ultimately not used, see "Dropped" below).
- MyNetDiary / CarbManager — Bengawan Solo Kueh Dardar listing (160 cal/piece) — ultimately not
  used, see "Dropped" below.
- SingaporeCalorie.com, NutriKaki, SnapCalorie, Hitung Kalori, MyLovelyRecipes, Food Network,
  Holland Bakery (via FatSecret) — generic/analog recipe nutrition data for Kueh Salat,
  Ondeh-Ondeh, Kueh Kosui, Egg Tart, Ang Ku Kueh (mung bean), and Lemper (chicken, used as an
  analog for Lemper Udang).

## Items added

**7 MenuItems** (all confirmed as individually-priced pieces on bengawansolo.sg):

| Item | Price | Confidence | Basis |
|---|---|---|---|
| Kueh Salat | $1.60 | community | Generic kueh salat recipe/nutrition average (SG sources); not Bengawan Solo-specific |
| Lapis Sagu | $1.50 | estimated | Bengawan Solo-specific per-100g (FatSecret), scaled to an assumed ~35g piece weight (not officially stated) |
| Ondeh-Ondeh | $0.70 | community | Generic ondeh-ondeh recipe nutrition |
| Kueh Kosui | $0.60 | community | Generic kueh kosui recipe nutrition |
| Egg Tart | $1.80 | community | Generic Chinese egg tart nutrition |
| Kueh Angku (Mung Bean) | $1.50 | community | Generic ang ku kueh (green bean filling) nutrition |
| Lemper Udang | $1.90 | estimated | No shrimp-specific data found; estimated from generic lemper (chicken-filling analog) per-100g figures scaled to an assumed ~50g piece |

**2 GroceryProducts** (first real rows in this table — previously empty):

| Item | Package | Confidence | Basis |
|---|---|---|---|
| Pineapple Tarts (330g) | 330g / $28.00 | community | Generic pineapple tart per-piece nutrition, scaled to per-100g |
| Kueh Lapis (0.6kg) | 600g / $42.00 | estimated | Bengawan Solo-specific per-slice data (FatSecret), scaled to per-100g |

Confidence breakdown: 0 verified, 4 estimated, 5 community. Nothing was rated `verified` because
Bengawan Solo has no official published nutrition panel and none of the products had a
Singapore-scanned Open Food Facts entry.

## Dropped (insufficient credible basis)

- **Kueh Dardar** — a Bengawan Solo-specific listing exists (MyNetDiary/CarbManager, 160 cal/piece)
  but the protein/carbs/fat breakdown returned as literal zeros on CarbManager, which reads as
  missing data rather than a real macro profile. Left out rather than fabricate the macro split.
- **Pandan Chiffon Cake (Regular)** — considered as a GroceryProduct (Bengawan Solo-specific
  per-slice macro data exists via FatSecret and scales cleanly to per-100g), but the official site
  doesn't state the whole cake's package weight for the "(R)" regular size, and no reliable
  secondary source for it was found. Rather than guess a package size, left out.
- Kueh Lapis Prune (1.2kg) and Pineapple Tarts (660g) were treated as near-duplicate size/flavour
  variants of items already added and skipped, consistent with the "skip S/M/L size variants"
  guidance.

## Verification

- Copied project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox,
  ran `npm install` then `npx tsc --noEmit` — **clean, no errors**.
- No duplicate `Brand.id` or `MenuItem.id` introduced by this session's additions (checked
  programmatically). Note: an unrelated pre-existing duplicate MenuItem id, `tb_set_a`, was
  found in `menuItems.ts` during this check — not touched, out of scope for this session, flagged
  here for visibility.
- `researchQueue.ts`: `bengawan_solo` entry flipped from `'pending'` to `'researched'`.

## Not touched

`C:\stride-app` was not accessed. No email was sent. No `git push` was run — commit is local only.
