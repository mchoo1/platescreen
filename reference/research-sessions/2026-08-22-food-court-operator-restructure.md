# 2026-08-22 — Food-court operator restructure (Kopitiam/Koufu/Foodfare/Hawkers' Street)

**Trigger:** flagged in the previous usefulness audit as a data-structure decision — Kopitiam,
Koufu, and NTUC Foodfare were each modeled as a single Brand with 48–65 Premises rows, implying
one screenable "restaurant" with many branches (like McDonald's). That's wrong: each Premises row
is a different physical food-court *building* containing dozens of unrelated stalls with completely
different food. There is no single "Kopitiam menu."

## What the schema already says to do

`types/db.ts` already defines an `Operator` type for exactly this case (added 2026-08-20, evidently
never fully applied): "Generic, unnamed concessions inside an Operator's premises are intentionally
NOT modeled as their own Brand ... only named, identifiable chain concessions get their own
Brand+Premises." `operators.ts` already lists Kopitiam/Koufu/Foodfare/Hawkers' Street as Operators —
but its own header comment admits the workaround: "Kopitiam/Koufu/NTUC Foodfare's own Brand+Premises
rows ... are what actually renders," i.e. the flawed mega-Brand was kept as a stopgap.

Hawkers' Street already had the *correct* version built for 27 of its stalls (2026-08-20, tasks
"Append Hawkers' Street operator+brands+premises"): each real named stall (Tai Wah Pork Noodles,
Jason Penang Cuisine, Chef Wei HK Cheong Fun, etc.) is its own Brand with `operatorId:
"hawkers_street"` and its own Premises citing the specific mall. That pattern just hadn't been
applied to Kopitiam/Koufu/Foodfare, and Hawkers' Street itself was *also* still carrying a redundant
fake mega-Brand alongside its 27 correct ones.

## What changed

- Removed 4 Brand rows: `kopitiam`, `koufu`, `foodfare`, `hawkers_street` (0 MenuItems each, so they
  never rendered to a user anyway — `buildScreenerRows()` joins off MenuItems).
- Removed their 169 Premises rows (48 + 65 + 48 + 8) from `premises.ts`.
- **Nothing was lost**: all 169 real, SFA-sourced building addresses are preserved in the new
  `reference/data/food-court-venues.json`, keyed by `operatorId`, with a `concessionsResearched:
  false` flag — a research anchor list, not part of the screenable dataset.
- `operators.ts` is untouched — Kopitiam/Koufu/Foodfare/Hawkers' Street still exist as Operators,
  which is the correct place for them.
- The 27 already-correct Hawkers' Street named stalls (with `operatorId` set) are untouched. 4 of
  its 8 venues (Tampines 1, ION Orchard, Bukit Panjang Plaza, EastPoint Mall) already have at least
  one real stall; the other 4 venues still need concessions identified.
- Updated `researchQueue.ts`: Kopitiam/Koufu/Foodfare/Hawkers' Street/Banquet entries corrected from
  a stale `"researched"` status (which referred to generic "representative dish" fabrications —
  same pattern the project's "never fabricate" rule already targets, and which are no longer in the
  dataset) to `"pending"`, with notes describing the real work: find named concessions per venue,
  add each as its own Brand with the right `operatorId`, never re-add the operator itself as a
  Brand. Banquet has no venue addresses yet at all — flagged as a from-scratch item.

## What this doesn't do (yet)

This is the structural fix, not the content fix. Kopitiam/Koufu/Foodfare currently have **zero**
named concessions in the database — a real research pass (comparable in scope to the 9-hawker-centre
generic-name cleanup) is needed to visit each of the 161 venues and identify what's actually inside.
That's a large, multi-session effort and hasn't been started here.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. Confirmed via direct import check: all 4 operator
IDs absent from `BRANDS`, `OPERATORS` still has all 4, Hawkers' Street's 27 real stalls unchanged.
