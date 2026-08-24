# 2026-08-24 — Platforms data defaults fix (task #61)

Follow-up to `2026-08-24-platforms-ui-surfacing.md` (task #60). That change made the
`platforms` field visible/filterable in the UI; this change fixes the underlying data
quality problem the same audit found: 1,531 brands were stuck on an untouched
`["dine_in"]` default, and several major named chains were missing real, verifiable
platform options.

Per direct user instruction ("work on both, prioritize UI first"), this was sequenced
after task #60. The specific approach for the 1,531-brand fix was confirmed via
clarifying question — user selected "Apply as a documented default (Recommended)" over
"Leave them, only fix named chains."

## Two distinct categories of edit — kept separate deliberately

This file's data has, until now, been built entirely from individually verified facts
(a specific stall's address, a specific menu item's macros, a specific chain's real
website). This task introduces a new kind of edit that must not be confused with that
standard, so it's split into two clearly labeled parts, in code comments, here, and in
the commit message.

### 1. Documented default (not individually verified)

973 `food_court_stall` brands + 558 `hawker` brands (1,531 total) had `platforms` set to
exactly `["dine_in"]` — effectively an unfilled default from whenever they were first
added, not a researched fact. Per user approval, added `"grab_go"` to all 1,531, on the
reasoning that Singapore hawker/food-court stalls near-universally allow takeaway
("da bao"). This is a bulk structural default applied via script (match `type` in
`{food_court_stall, hawker}` AND `platforms === ["dine_in"]`), not a per-stall research
finding.

Verified via script: after the fix, 0 brands of type `food_court_stall`/`hawker` remain
at `["dine_in"]`-only; 1,694 brands now sit at exactly `[dine_in, grab_go]` (1,531 newly
fixed + 163 that already had that combination going in); 0 duplicate ids introduced;
1,772 total brands (unchanged — this only mutates existing `platforms` array values, no
brands added/removed).

### 2. Individually verified named-chain fix

The same audit flagged specific named chains as missing platforms they clearly do offer
in Singapore. Verified each via web search before applying:

- **McDonald's** (`mcd`) — had `[dine_in, grab_go]`, missing `delivery`. Confirmed
  available via GrabFood, foodpanda, and Deliveroo (McDonald's own Help Center
  documents all three as delivery partners). Added `delivery`.
- **KFC** (`kfc`) — had `[dine_in, grab_go]`, missing `delivery`. Confirmed available via
  GrabFood, foodpanda, and Deliveroo. Added `delivery`.
- **Subway** (`subway`) — had `[dine_in, grab_go]`, missing `delivery`. Confirmed
  available via GrabFood and foodpanda. Added `delivery`.
- **Saizeriya** (`saizeriya`) — had `[dine_in]` only, missing both `grab_go` and
  `delivery`. Confirmed GrabFood delivery is active, and takeaway/pickup is offered
  directly (per Saizeriya Singapore's own Facebook posts and menu-price sites). Added
  both.
- **`kopitiam_kfc`** (the food-court concession, `type: food_court_stall`) — picked up
  `grab_go` automatically from the bulk default in part 1, bringing it in line with the
  flagship `kfc` brand's base platforms. `delivery` was deliberately **not** added here —
  concession-stall-specific delivery availability wasn't independently verified, and
  should not inherit the flagship brand's individually-verified fact.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script confirmed: 0 duplicate ids, 0 remaining `["dine_in"]`-only
  food_court_stall/hawker brands, all 5 named-chain ids show the expected final
  `platforms` arrays.
- Live vs build-mirror `brands.ts` — byte-identical diff.
- No other files touched — this is a `platforms` field mutation on existing `brands.ts`
  entries only; `premises.ts` and `menuItems.ts` are unchanged.

## What this doesn't fix

The `platforms` field is now both visible (task #60) and reasonably accurate (task #61).
Still outstanding and untouched by this pair of tasks: the ~1,610 brands with zero
`MenuItem`s (the much larger macro-data coverage gap identified in the original status
audit), and the 79 remaining valid `sfaLicenceNo` entries in `researchQueue.ts`.
