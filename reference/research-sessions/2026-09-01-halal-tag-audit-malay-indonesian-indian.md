# 2026-09-01 — Halal tag audit: Malay/Indonesian/Indian dishes

## Why

Flagged as unfinished in the prior day's diet-tag coverage audit (see
`2026-09-01-diet-tag-coverage-audit-and-backfill.md`, "Not done" section):
the `Indonesian/Malay` and `Indian` category buckets (65 of the 494
"genuinely ambiguous" untagged items) likely contain real, unambiguous
halal dishes per CLAUDE.md 5.1 ("halal — only for unambiguous
Malay/Indonesian/Indian-Muslim dishes"), but that pass deliberately left
them untouched since cuisine-implies-halal is a different, higher-stakes
heuristic than "named protein implies no_pork" and needed its own audit.

## Method

Pulled all untagged `MenuItems` with `category === 'Indonesian/Malay'` or
`category === 'Indian'` — 77 items. Given a mislabeled `halal` tag is a
more consequential error than a missed `no_pork` tag (it's a religious
dietary-compliance claim, not just an ingredient inference), classification
was deliberately more conservative than the prior no_pork pass. Every item
was reviewed individually, not keyword-matched, against two tiers:

1. **Canonical dishes** — dish types that, in Singapore's hawker
   tradition, are essentially never sold by a non-Muslim operator (there is
   no non-Muslim tradition of a "Nasi Lemak" or "Roti Prata" stall — these
   dish categories effectively *are* the Malay/Indian-Muslim food
   category). Tagged halal regardless of the specific stall's name: Nasi
   Lemak, Ayam Penyet, Ayam Masak Merah, Ayam Berempah, Ayam Lemak Chilli
   Padi, Nasi Ayam, Nasi Goreng Ayam, Mee Rebus, Mee Soto/Mee Hoon Soto,
   Mee Goreng (from a Malay-context stall), Rendang/Nasi Rendang, Nasi
   Padang, Nasi Sambal Goreng, Indian Rojak/Indian Muslim Rojak, Roti
   Prata.
2. **Signal-dependent dishes** — dish types eaten across religious lines
   in Singapore (Biryani, Naan, generic "Goreng"/rice dishes, fusion
   plates), tagged halal only when the brand name itself carried an
   explicit Muslim/Malay/Indonesian signal (e.g. "Haji", "Muslim", "Deen",
   "Ihsan", "Hadramawt", "Taibah", "Indo Rampai", a Malay personal/place
   name like "Fatimah" or "Santapan Nadika").

Explicitly excluded regardless of dish name:
- Anything branded **"Vegetarian"** (Indian Vegetarian / Delhi Kitchen
  Indian Vegetarian / Su Man Yuan Vegetarian, etc.) — these read as
  Hindu-vegetarian-run stalls, not Muslim-run, and being meat-free doesn't
  make a kitchen halal-certified.
- **South Indian Banana Leaf Rice, Masala Dosa** — South Indian dishes
  that follow a Hindu-vegetarian culinary tradition in Singapore, not a
  Muslim one, despite sitting in the "Indian" category.
- **"Nyonya"-branded items** (Peranakan cuisine) — Peranakan/Nyonya food
  genuinely mixes halal and non-halal dishes (some use pork/lard), so a
  "Nyonya Nasi Lemak" or "Nyonya ... Ayam Curry Kapitan" doesn't get the
  same free pass as a plain Malay stall's Nasi Lemak.
- **Clearly Chinese-named stalls** ("Ah Bang", "Hup Lee", "Xuan Yuan Su
  Shi", "Le Man") even when the dish name itself is Malay/Indonesian
  (e.g. "Nasi Goreng") — a Chinese-operated version of a nominally Malay
  dish is not safely assumed halal.
- **"Fusion" combinations with a non-Malay/Muslim element** ("Fusion Nasi
  Briyani Chinese Rice", "Indian Punjab", generic biryani/naan with no
  brand-level signal either way).
- **Protein-choice items** ("1 Meat + 2 Veg") — same logic as the
  existing economic-rice skip-list: the actual protein varies by
  customer choice, so no single tag applies.

## Result

| | Count |
|---|---|
| Untagged Indonesian/Malay + Indian items reviewed | 77 |
| Tagged `halal` + `no_pork` | 54 |
| Left untagged (ambiguous per rules above) | 23 |

The 23 excluded, with reason: 3 explicitly "Vegetarian"-branded Indian
biryani/rice items (Hindu-coded, not halal-inferable), 1 "Banana Leaf
Briyani" (South Indian serving style, ambiguous), 2 South Indian Hindu
dishes (Masala Dosa, South Indian Banana Leaf Rice), 2 "Nyonya"-branded
items (Peranakan cuisine ambiguity — Nasi Lemak and Ayam Curry Kapitan
both excluded here for consistency even though "Nasi Lemak" alone would
normally qualify), 3 Chinese-named stalls serving nominally Malay/generic
dishes (Ah Bang's Nasi Goreng, Le Man's and Hup Lee's Fried Bee
Hoon/generic "economic" framing), 1 Chinese-branded item miscategorized
under "Indian" (Xuan Yuan Su Shi's Olive Fried Rice), 2 generic Naan
items with no Muslim/vegetarian signal either way, 1 "Indian Punjab"
(religiously mixed cuisine), 1 "Fusion Nasi Briyani Chinese Rice", 2
protein-choice items ("1 Meat + 2 Veg", "NJ Indian Classic Cuisine" Nasi
Briyani with no positive signal), 1 ambiguous "Rice Table" (colonial
rijsttafel concept, not clearly Muslim), 2 near-duplicate "Olive Fried
Rice" items with no cuisine signal beyond a stray category tag.

Full per-item candidate list and companion `no_pork` tagging is in
`/tmp/halal_candidates.tsv` (ephemeral sandbox file, not committed) — the
54 applied ids and reasoning are captured above by pattern; the git diff
on `menuItems.ts` is the definitive record of exactly which 54 changed.

Every tagged item also received `no_pork` alongside `halal` (halal
trivially implies no_pork), consistent with the existing pattern already
present in the file for earlier-batch items like Nasi Lemak
(`['halal', 'no_pork']`).

## Verification

- `npx tsc --noEmit`: clean.
- Runtime integrity check (`tsx`, evaluating the real exported arrays):
  - 0 duplicate ids across 2,559 `MenuItems`.
  - 0 orphaned `brandId` references.
  - All 54 candidate ids confirmed present with exactly `['halal',
    'no_pork']` set — 0 missing, 0 partially-applied.
  - Diet-tag coverage: 62.1% (1,590/2,559), up from 60.0% the prior day —
    consistent with +54 newly-tagged items and no regressions.
  - Total `halal`-tagged items in the dataset: 621 (up from 567 before
    this batch; the difference of 54 matches exactly).
  - Sanity check for pork-named items carrying `halal`/`no_pork`: 6 hits,
    all pre-existing from earlier batches, not touched by this pass, and
    all legitimate — McDonald's/Starbucks/Cheers "chicken ham" and
    "bacon" items where the named protein is explicitly chicken (e.g.
    "Chicken Bacon Egg McMuffin", "Chicken Ham Panwich") — "chicken
    ham"/"turkey bacon"-style products are common non-pork substitutes in
    Singapore and were already exempted under this exact reasoning in the
    prior day's audit. None of my 54 candidates are among these 6.
- Splice script reused the brace-depth object-boundary approach fixed in
  the prior diet-tag backfill (not the earlier buggy fixed-window search)
  — ran clean on the first attempt with a fully reconciled count (54
  candidates = 54 replaced + 0 inserted + 0 already-tagged + 0 missing).
- Full `npm run build` not run to completion in this sandbox (same
  resource-ceiling pattern as the prior two data-only changes this week);
  this change also touches only one data file with no page/component
  logic, so risk is low — confirm via the next Vercel deploy.

## Not done / left for a future pass

- **Task #85 — vegetarian tag backfill for ~44 plain coffee/tea/espresso
  items** (Starbucks, kopitiam drink counters) — still pending, separate
  from this halal pass, tracked in ROADMAP.md.
- The 23 excluded items above were deliberately left ambiguous rather
  than guessed. Two are worth a human decision rather than further
  automated inference: whether "Nyonya"-branded dishes should get their
  own case-by-case halal research (Peranakan cuisine is genuinely mixed,
  not a blanket yes/no), and whether the 3 "Vegetarian"-branded Indian
  items should instead get a `vegetarian` tag (a different, separate
  claim from `halal` that this pass didn't attempt since it was scoped
  to halal only).
- No web/individual research was done per item — this was a name-pattern
  classification pass, consistent with how the project's existing halal
  tags (from earlier batches) were already applied, and consistent with
  CLAUDE.md 5.1's own framing of the rule as "unambiguous
  Malay/Indonesian/Indian-Muslim dishes" (a naming-convention bar, not a
  per-stall certification lookup requirement).
