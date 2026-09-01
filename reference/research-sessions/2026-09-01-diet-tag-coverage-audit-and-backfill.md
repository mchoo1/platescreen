# 2026-09-01 — Diet-tag coverage audit and backfill

## Why

`ROADMAP.md` and `CLAUDE.md` section 5.1 both flagged this as an open
decision: ~52% of MenuItems carried a diet tag, and it was explicitly
unclear whether the untagged ~48% were "legitimately untaggable" (on the
standing no-pork skip-list, or genuinely ambiguous) or simply "overlooked"
(a real dish with an obviously named protein that never got tagged). The
instruction was to sample and classify before running a blind backfill.

## Method

Loaded all `MENU_ITEMS`, split into tagged vs. untagged (`compatibleWith`
empty or absent), then classified every untagged item against CLAUDE.md
5.1's exact rules:

1. **On the standing no_pork skip-list** (Char Kway Teow, Lor Mee, Bak Chor
   Mee, Kway Chap, Wanton Mee/Noodle, Popiah, Fishball Noodles, Fried Carrot
   Cake, Prawn Mee/Noodles, Ban Mian, Mee Pok, Hor Fun, Claypot Rice, Roasted
   Meats, Xiao Long Bao, Ngoh Hiang, Bak Kwa, generic Porridge, Pepper Rice,
   Rosti, Pizza, Mala Xiang Guo, Meatball Noodles, Bibimbap, Yunnan Rice
   Noodles, Biang Biang Noodles, Sarawak Kolo Mee, Banh Mi, Yang Zhou Fried
   Rice, Mee Tai Mak, economic/mixed-vegetable rice, ABC Soup) → correctly
   left untagged, not touched.
2. **Explicitly named for pork/offal** (the categorical-exclusion list, plus
   a broader generic "pork"/"pig"/"lard"/"bacon"/"sausage"/"char siew"/"ham"
   sweep, with "chicken ham"/"turkey ham" exempted since those are common
   non-pork substitutes, not pork) → correctly left untagged, not touched.
3. **Named a clear, non-pork protein or was unambiguously plant/egg-only**,
   and matched neither list above → **backfill candidate**.
4. Everything else → left alone as genuinely ambiguous (see numbers below).

## Result

| | Count |
|---|---|
| Untagged before this pass | 1,234 (48.2%) |
| — correctly untagged (skip-list) | 440 |
| — correctly untagged (pork/offal-named) | 84 |
| — genuinely ambiguous, left untagged | 494 |
| — **backfill candidates found** | 216 |

**The ROADMAP question is answered: the ~48% gap was mostly legitimate, not
overlooked** — 524 of the 1,234 untagged items (42%) are correctly excluded
by the existing rules, and another 494 (40%) are genuinely ambiguous
(mostly `Local Hawker`, `Noodles`, `Indonesian/Malay`, `Indian`, and
beverage-category items where no ingredient list is available — see "Not
done" below). Only 216 (18%) were real gaps.

**Applied 211 of the 216 candidates** (5 were caught by manual review before
applying and excluded — see below):

- 122 tagged `no_pork` only (named chicken/beef/duck/mutton, e.g. "1/2
  Chicken Plate", "Beef Bowl Set").
- 60 tagged `no_pork` + `pescatarian` (fish/seafood-only, e.g. "Sliced Fish
  Soup", "Chilli Crab").
- 29 tagged `no_pork` + `vegetarian` (plant/egg-only with no meat or fish
  named, e.g. "Scrambled Egg Rice", "Rainbow Salad", "Signature Tofu").

**Caught and excluded 5 items during manual review that the keyword
heuristic misclassified** — this is exactly the kind of error a blind
automated pass would have shipped:

- `bc_shi_nian_pig_trotter_rice_with_onsen_egg` ("Pig Trotter Rice with
  Onsen Egg") and two `..._pig_stomach_chicken_soup` items — all three name
  a pig part (trotter/stomach) alongside a non-pork protein (egg/chicken).
  The keyword pass matched on the non-pork half and missed "pig" entirely.
  Left untagged — these belong with the categorical pork/offal exclusions,
  not the backfill.
- `feng_fried_rice_kampung_suasage_egg_fried_rice` and
  `steven_fried_rice_kampung_suasage_egg_fried_rice` ("Kampung Suasage[sic]
  Egg Fried Rice") — a misspelling of "sausage" that dodged the pork-keyword
  filter. A generic "sausage" in a Singapore hawker context is genuinely
  ambiguous (could be pork, beef, or chicken frankfurter-style) without more
  specificity — left untagged rather than guessed.

## Verification

- `npx tsc --noEmit`: clean.
- Runtime check: 0 duplicate ids across 2,559 `MenuItems`. Diet-tag coverage
  60.0% (was 51.6% as of the prior day's stats, before also accounting for
  same-day automated additions/removals from other tasks).
- Confirmed programmatically: 0 pork-named items anywhere in the dataset
  carry a `no_pork` tag; the 9 skip-list-pattern dishes that *do* carry
  `no_pork` (e.g. "Beef Hor Fun", "Vegetarian Wanton Mee", "Fish Porridge")
  were all pre-existing from earlier batches, not touched by this pass —
  they're legitimate named-protein overrides of the generic skip-list base
  dish, not violations.
- Confirmed the 5 excluded items above still have `compatibleWith: []`.
- Spot-checked the 5 items whose `compatibleWith` field was missing
  entirely (rather than present-but-empty) — `yp_16`, `avfc_17`, `cgh_5`,
  `pg639_8`, `hdmfc_5` — got the field correctly inserted rather than
  silently skipped.
- **A first version of the splice script had a real bug**: it searched for
  `compatibleWith: []` in an 800-character window after each item's `id:`
  field rather than within that item's own object boundary, which for
  short single-line entries could spill into a *different, later* item's
  already-populated tag array and misreport it as "already tagged." Caught
  this by manually reading the "already tagged" exceptions it produced,
  reverted the change (`git checkout`), and rewrote it to track `{`/`}`
  brace depth and scope every match strictly to the one object between an
  `id:` field and its own closing brace. Re-ran and got a clean, reconciled
  count (211 processed = 206 replaced + 5 inserted, 0 unexplained) before
  trusting the output.
- Full `npm run build` not run to completion in this sandbox (same
  resource-ceiling pattern as the two prior data-only changes this week);
  this change also touches only one data file with no page/component logic,
  so risk is low — confirm via the next Vercel deploy.

## Not done / left for a future pass

- The 494 "genuinely ambiguous" items were deliberately not touched. Rough
  breakdown by category: 136 `Local Hawker`, 56 `Noodles`, 33
  `Indonesian/Malay`, 32 `Indian`, 27 `Beverages`, 22 `Bakery/Dessert`, 19
  `Dim Sum`, plus smaller Thai/Japanese/Korean/Western/Burger buckets. Two
  sub-patterns worth a dedicated future look rather than blind heuristics:
  - **Halal candidates**: the `Indonesian/Malay` and `Indian` buckets likely
    contain real, unambiguous halal dishes (per section 5.1, "unambiguous
    Malay/Indonesian/Indian-Muslim dishes") that this pass didn't attempt —
    name-pattern matching for cuisine-implies-halal is a different, riskier
    heuristic than "named protein implies no_pork" and deserves its own
    audit rather than folding into this one.
  - **Beverages** (27 + 12 Espresso + 5 Frappuccino = 44 items): plain
    coffee/tea drinks are unambiguously zero-meat and could reasonably carry
    `vegetarian`, but this pass stayed scoped to the "named protein" rule
    already established in CLAUDE.md rather than introducing a new
    category-based inference rule unilaterally — flagging as a candidate
    for a human decision, not doing it here.
  - Nasi Lemak / Laksa / Mee Siam were treated cautiously (left untagged)
    despite not being on the official skip-list, since some hawker
    renditions use lard or pork-based stock — this is *more* conservative
    than the documented rule requires, not a rule violation, but worth
    someone double-checking whether they belong on the official skip-list
    or can be liberally tagged like other named dishes.
