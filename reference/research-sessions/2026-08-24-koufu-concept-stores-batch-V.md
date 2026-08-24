# 2026-08-24 (Batch V) — Cracking the remaining Koufu sub-brands

Resolves the 6 Koufu-family brands flagged as unresolved in
`2026-08-22-food-court-website-research.md`: R&B Tea, Dough Culture, Nine Fresh, The
Kitchen, The Green Hut, Rasapura Master. All 6 are now settled — 2 new real premises
added, 4 confirmed as either already-complete or not-real, 0 fabricated.

## The breakthrough: koufu.com.sg now has server-rendered pages for its concept stores

Previously these three (R&B Tea, Dough Culture, Nine Fresh) only had JS/SPA store
locators on their own external domains (rbtea.com.sg, doughculture.com, ninefresh.com),
which returned empty content on static fetch. This pass found that koufu.com.sg's own
"Concept Stores" and "Food Halls" pages now carry dedicated, fully server-rendered
per-brand outlet pages:
- `koufu.com.sg/our-brands/concept-stores/rb-tea/` — 13 outlets with addresses.
- `koufu.com.sg/our-brands/concept-stores/dough-culture/` — 18 outlets (17 open + 1
  "Coming Soon" at The Woodleigh Mall, excluded).
- `koufu.com.sg/our-brands/food-halls/rasapura-masters/` — 1 outlet (Marina Bay Sands).
- `ninefresh.com/locate-us.html` (the brand's own site) turned out to be server-rendered
  too, despite the homepage being image/JS-heavy — 25 outlets with full addresses.

## What was actually new vs. already covered

Cross-checking these fresh lists against the live dataset turned up a surprise: **Dough
Culture and Nine Fresh were already 100% covered** — every outlet from the fresh
koufu.com.sg/ninefresh.com fetch matched an existing `koufu_dough_culture_p*` /
`koufu_nine_fresh_p*` premises row by postal code (source: `operator_official_site`,
added in an earlier session not reflected in the 08-22 research doc I was working from).
No changes made to either.

**R&B Tea had partial overlap**: 12 of the 13 outlets from the fresh koufu.com.sg fetch
matched existing entries, but 2 were genuinely new — **Nanyang Technological University**
(76 Nanyang Drive, North Spine Plaza #02-03, within the Koufu foodcourt, Singapore 637331)
and **Tampines MRT** (#01-18, Singapore 529538). Conversely, the existing dataset has 2
outlets (Changi City Point, Tengah Plantation Plaza) that didn't appear on this fetch of
the koufu.com.sg page — left untouched since they were presumably sourced from a still-valid
observation. Added the 2 new outlets, bringing R&B Tea to 16 premises total.

## A duplicate-brand-id bug caught mid-batch

Initially generated fresh `Brand` entries for all three chains (`koufu_rb_tea`,
`koufu_dough_culture`, `koufu_nine_fresh`) alongside the new premises, following the
"new venue" batch pattern used for Buangkok/One Punggol. `tsx verifyV.ts` caught 3
duplicate brand IDs — these brands already existed (as `type: "grab_go"` stubs from the
original operator-restructure pass) with premises already attached under the same IDs.
Removed the duplicate brand definitions entirely and the fully-redundant premises
(all of Dough Culture and Nine Fresh's new rows, 11 of R&B Tea's 13), keeping only the 2
genuinely new R&B Tea premises. This is the second insertion-tooling bug caught this
session (see Batch U for the first) — worth remembering that "new brand" isn't a safe
assumption for any Koufu-family name without grepping first.

## The Kitchen, The Green Hut, Rasapura Master

- **The Kitchen** and **The Green Hut**: no longer appear on koufu.com.sg's Food Halls or
  Concept Stores pages at all (both pages fetched and enumerated in full this pass) —
  reconfirms the 2026-08-22 finding that these are discontinued/rebranded, not a research
  gap.
- **Rasapura Master**: already correctly in the dataset as `koufu_rasapura_masters` (1
  outlet, Marina Bay Sands) from an earlier session — the koufu.com.sg page for it
  confirms the same single Marina Bay Sands location, no changes needed.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added for any of these chains.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,721 → 1,774 (Batch U) → 1,774 brands
(unchanged this batch, 0 new brands), 4,706 → 4,708 premises (net +2, the two new R&B Tea
outlets) — 0 duplicate brand IDs, 0 orphaned premises, 0 missing lat/lng (confirmed via a
temporary `verifyV.ts` script, deleted after use). Build-mirror diff confirms live and
mirror `brands.ts`/`premises.ts` are byte-identical.
