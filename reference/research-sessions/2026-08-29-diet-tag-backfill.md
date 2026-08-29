# Diet-tag (`compatibleWith`) retroactive backfill — 2026-08-29

## Why

App review (2026-08-28/29) found that only 794 of the app's *displayed* menu items had
any usable `compatibleWith` value (many more items existed but the field was simply
absent), meaning the "Halal" / "Vegetarian" / "No Pork" filters in `FilterPanel.tsx`
were silently returning near-nothing for a large slice of the catalog. Root cause: the
per-batch splice script used throughout the zero-menu-item cleanup (task #65) never
populated `compatibleWith`, so every item added across ~40 batches was missing it.

## What this pass actually found (corrects an earlier mid-session estimate)

A prior estimate in this session guessed 1,245 of 2,039 items were missing
`compatibleWith` (496 in the single-line splice format + an assumed 749 more in the
older multi-line format). Direct AST inspection before patching showed that estimate
was wrong: **every one of the 1,543 older-format items already has a `compatibleWith`
property** (sometimes `[]`, but always present); **all 496 missing-field items are
exactly the single-line splice-format ones** added by task #65's batches. So the real
gap was 496 items, not 1,245 — smaller and fully addressable in one pass.

## Method

1. Parsed `src/lib/menuItems.ts` with the TypeScript Compiler API (`ts.createSourceFile`
   + AST walk over the `MENU_ITEMS` array's object-literal elements) rather than regex,
   so detection of "has `compatibleWith`" is structural, not format-dependent.
2. For each of the 496 items missing the property, looked up its `name` in a hand-built
   dish-name → tag dictionary (267 dish names, covering every splice-batch dish this
   session judged confidently classifiable).
3. For the 267 matched items, surgically inserted `compatibleWith: [...], ` as raw text
   immediately before the `confidence` property, computing all insertion offsets first
   and applying them in reverse file-order so earlier insertions never shift later
   offsets. Zero reformatting elsewhere in the file.
4. The remaining 229 items (dish names not in the dictionary) were left completely
   untouched — no property added, no guess made.

## Classification rules (conservative, asymmetric — same spirit as the "never fabricate"
rule used throughout the menu-item backfill)

- **`halal`** — only for dishes belonging to an unambiguous Malay/Indonesian/Indian-Muslim
  naming tradition where pork and alcohol are essentially never used (Nasi Lemak, Roti
  Prata, Mee Rebus, Mee Soto, Ayam Penyet, Nasi Briyani/Kandar/Padang, Rendang, Satay,
  Teh Tarik, Masala Dosa, Naan, kebab/shawarma/doner). This is a naming-tradition
  inference, **not** a halal-certification claim.
- **`no_pork`** — more liberal, ingredient-literal: tagged whenever the dish's own named
  protein is clearly not pork (chicken, beef, duck, fish, seafood, vegetables, desserts,
  drinks) — including at Chinese roast-meat stalls that also sell pork elsewhere on the
  same menu. This is an ingredient-level claim only; it does **not** assert anything
  about shared-kitchen cross-contamination or certification.
- **`vegetarian` / `vegan`** — only for dishes with zero named meat/fish/poultry (plain
  bread, desserts, drinks, explicitly "Vegetarian"/"Vegan"-named dishes). `vegan` further
  requires no implied dairy/egg (Kopi/Teh/Cafe Latte are vegetarian but not vegan).
- **`pescatarian`** — fish/seafood-based dishes with no other meat.
- **`gluten_free` / `dairy_free` / `nut_free` / `lactose_free`** — not attempted; too
  recipe/preparation-dependent to infer safely from a dish name alone.
- **Deliberately skipped whole categories** rather than guess: anything traditionally
  pork-adjacent even when not named "pork" (Char Kway Teow, Lor Mee, Bak Chor Mee, Kway
  Chap, Hokkien Mee, Popiah, Prawn Mee/Noodle — all traditionally use pork lard, pork
  ribs stock, or pork mince even though the name doesn't say "pork"); self-serve mixed
  dishes where the protein varies (Economical/Mixed Rice, Cai Fan, Zi Char, Claypot Rice,
  generic "Curry"/"Noodle"/"Porridge"); ambiguous Korean/Japanese dishes that commonly
  include pork/ham (Bibimbap, Army Stew, Kimchi Jjigae); dim sum/dumplings/buns where
  filling is unstated. 229 of 496 previously-bare items fell into this "leave alone"
  bucket for exactly this reason.

## Result

- 496 items were missing `compatibleWith` before this pass; 267 now have it (matched
  by dish name against the classification dictionary above), 229 remain untouched.
- 0 pre-existing `compatibleWith` values were overwritten (verified: total
  `compatibleWith` occurrences in the file went from 1,543 → 1,810, exactly
  +267; item count unchanged at 2,039).
- Spot-checked: Nasi Lemak → `["halal", "no_pork"]`; all 12 Bak Kut Teh items → no
  `compatibleWith` change, none tagged halal; all Lor Mee items with previously no tag
  remain untouched.
- `npx tsc --noEmit` silent; `npm run build` succeeded (4/4 static pages).
- Live repo and `~/build/platescreen` mirror confirmed byte-identical after the patch.

## Caveat

All 267 newly-added tags are **estimated inferences from dish name only** — same
"estimated, not verified" status as the macro data throughout this database. They
should eventually be spot-checked against each brand's actual halal certification /
ingredient list before being treated as authoritative for someone with a strict
dietary or religious requirement. The remaining 229 untagged items, plus the ~229
categories of dish deliberately skipped above, are still open for a future, more
careful pass (e.g. actually checking each Char Kway Teow stall's menu for a
non-pork/vegetarian option rather than blanket-skipping the whole dish name).

## Files touched

- `src/lib/menuItems.ts` — 267 items gained a `compatibleWith` array; nothing else
  changed (line count identical: 25,827 lines before and after).

## Not done in this pass

- The zero-menu-brand UI fallback (fix #2 of the "Both" request) — separate,
  independent change to `screener.ts`/`ScreenerApp.tsx`, tracked separately.
- The 229 unmatched dish names and the deliberately-skipped ambiguous categories above
  remain untagged; a future pass could research specific stalls individually rather
  than relying on dish-name-only inference.
