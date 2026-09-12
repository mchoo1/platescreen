# 2026-09-13 — Search box: apostrophe-insensitive + multi-word/cross-field matching

## Why

Asked directly to review and improve the screener search feature (the
"Search item or restaurant..." box in `FilterPanel.tsx`, backed by
`filters.q` / `filters.location` in `screener.ts`).

The existing match logic did a plain
`f.q.trim().toLowerCase()` then `.includes()` against `row.name` /
`row.restaurantName` (same pattern for `filters.location` against
`row.location` / `row.restaurantName`). This silently fails for any brand
name containing an apostrophe, because the query and the stored name only
match when typed with the *exact* punctuation. A live count against
`brands.ts` found **65 of 1,724 brands (3.8%)** have an apostrophe in their
name, including several of the highest-traffic chains: McDonald's, Nando's,
Domino's Pizza, Dunkin', Auntie Anne's, Carl's Jr., and more. Typing
"mcdonalds" — the near-universal convention when typing on a phone
keyboard, with no apostrophe key readily offered — returned **zero**
results against "McDonald's".

A second, smaller gap: the old logic checked the *entire* query string as
one substring against each field independently, so a multi-word query
spanning two fields (e.g. "big mac mcdonalds", dish name + restaurant name)
never matched anything, since neither field alone contains the full string.

## Method

Added two exported helpers to `src/lib/screener.ts`:

```ts
export function normalizeSearchText(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’‘`]/g, '')      // strip apostrophes/smart quotes entirely
    .replace(/[^\w\s]/g, ' ')    // other punctuation -> space
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = normalizeSearchText(query);
  if (!q) return true;
  const combined = fields.map(normalizeSearchText).join(' ');
  return q.split(' ').filter(Boolean).every((token) => combined.includes(token));
}
```

Apostrophes are removed rather than replaced with a space (`"mcdonald's"` →
`"mcdonalds"`, not `"mcdonald s"`), matching how people actually type. Every
other punctuation character (periods, ampersands, parens) becomes a space,
so e.g. "Carl's Jr." and "carls jr" both normalize the same way.

`matchesQuery` takes any number of fields, normalizes and joins them, splits
the query into whitespace tokens, and requires every token to appear
somewhere in the combined text (order-independent AND-of-tokens). This
fixes the cross-field multi-word case as a side effect of fixing the
apostrophe case, since "big mac" and "mcdonalds" just need to both be found
somewhere in the combined `name + restaurantName` text now, not in one
field alone.

Rewired both filter functions to use it:

- `applyFilters`: `matchesQuery(f.q, row.name, row.restaurantName)` and
  `matchesQuery(f.location, row.location, row.restaurantName)`, replacing
  the old manual `q`/`loc` extraction + `.includes()` checks.
- `applyUncoveredFilters`: same pattern against `UncoveredBrandRow`'s
  `name`/`location` fields.

## Result

Before → after, live-data test script run against the full
`buildScreenerRows()` output:

| Query | Before | After |
|---|---|---|
| `mcdonalds` | 0 | 56 |
| `dominos` | 0 | 13 |
| `nandos` | 0 | 18 |
| `big mac mcdonalds` (multi-word, cross-field) | 0 | 1 (correct row) |
| `chicken rice` (regression check) | 128 | 128 |
| `laksa` (regression check) | 28 | 28 |

Ordinary single-word, no-punctuation searches are unaffected — the
normalization is a no-op for text that was already plain lowercase
alphanumerics.

## Verification

- `npx tsc --noEmit` in the build mirror (`~/build/platescreen`, synced via
  `rsync -a --delete src/ ~/build/platescreen/src/`): clean.
- Dedicated verification script (`search_check.ts` / `verify_search_fix.ts`,
  written in the mirror, not committed) ran the before/after table above
  directly against `buildScreenerRows()` + `applyFilters`.
- No data files (`brands.ts`, `premises.ts`, `menuItems.ts`,
  `groceryProducts.ts`) touched — this is a pure filter-logic change in
  `screener.ts`.

## Not done / follow-ups

- `FilterPanel.tsx` itself is unchanged — no UI copy or placeholder-text
  update was needed, since the existing placeholder ("Search item or
  restaurant...") already describes the intended behavior; it just wasn't
  living up to it before this fix.
- Did not attempt fuzzy/typo-tolerant matching (e.g. Levenshtein distance)
  — out of scope for this pass; apostrophe-insensitivity and multi-word
  AND-matching were the two concrete, verifiable gaps found.
- Standing items from the 2026-09-02 UI/DB review (`Brand.dietTags` dead
  code, `GroceryProduct` UI, mobile card reflow, targeted diet-tag coverage
  push) remain open and untouched by this change.
