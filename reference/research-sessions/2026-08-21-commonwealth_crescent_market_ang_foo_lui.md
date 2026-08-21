# Research Session — 2026-08-21 — Ang Foo Lui (Commonwealth Crescent Market)

**Track:** restaurants / food_court / hawker / coffeeshop / canteen (`platescreen-research-restaurants`)
**Queue entry:** `commonwealth_crescent_market_ang_foo_lui` (type: `hawker`, priority: `medium`)
**Outcome:** NO DATA WRITTEN. Queue entry left `pending`. No MenuItems added, no Brand/Premises changes, no queue-status flip.

## Selection (Phase 1)

594 pending entries matched the restaurant-track types (`restaurant`, `food_court`, `hawker`,
`coffeeshop`, `canteen`) out of 635 total `RESEARCH_QUEUE` entries. No `high`-priority entries
were pending (511 `medium`, 83 `low`). Among `medium`-priority entries, `commonwealth_crescent_market_ang_foo_lui`
was first in the array's existing order, so it was selected deterministically (no judgment used).

Checked `src/lib/brands.ts` and found `id: "commonwealth_crescent_market_ang_foo_lui"` already
present (name "Ang Foo Lui", type `hawker`, cuisine "Local & Hawker", emoji 🍜, no dietTags,
priceRange `$`). A matching `src/lib/premises.ts` row (`commonwealth_crescent_market_ang_foo_lui_p127`)
also already exists with a real SFA registration: licence `CW3079002`, licensee "ANG FOO LUI",
address "COMMONWEALTH CRESCENT MARKET Stall No 079", grade A, not suspended. Per Phase 1 step 5
this run's scope was Phase 2 + MenuItems only — no new Brand or Premises was in scope.

## Research (Phase 2) — stopped, no credible basis found

Searched for the outlet under multiple angles:
- `"Ang Foo Lui" Commonwealth Crescent Market hawker`
- `Ang Foo Lui Commonwealth Crescent noodle stall menu`
- `"Ang Foo Lui" Singapore`
- `"Ang Foo Lui" stall 079 / "#01-079" / "01-079" Commonwealth`
- `"Ang Foo Lui" burpple OR review OR menu`
- `Commonwealth Crescent Market stall list all stalls directory` / HawkerPedia's full "10 Popular
  Stalls" article for the centre (fetched directly)
- Direct fetch of the SG Hawker Centres Fandom wiki page for Commonwealth Crescent Market
  (returned no usable content) and a direct Google search fetch (returned no content — likely
  JS-rendered/blocked)

None of these returned any result mentioning "Ang Foo Lui" specifically, at Commonwealth Crescent
Market or elsewhere. The centre's well-documented popular stalls (Liang Liang Fried Carrot Cake,
Hong Kee Porridge, Foong Kee Charcoal Roast, Fai Kee Fish Head Bee Hoon, Macpherson Minced Meat
Noodle, Seng Kee Chicken Rice, Sek Tong Gai, Chinatown Ah Po Braised Duck, Jian Kang Noodles,
Authentic Cantonese Claypot Rice) do not include this stall, and no food blog, review site, or
directory turned up a match.

One structural clue: the SFA record's address format is "Stall No 079" rather than the "#02-XX"
unit-number format used by every food-centre stall found in secondary sources for this venue —
consistent with Commonwealth Crescent Market's wet-market wing (raw produce/meat/fish) rather
than its hawker food-centre wing, though this couldn't be confirmed either way. Without that
confirmation I don't even have a reliable food category to anchor an estimate on, let alone
dish-level macros.

**Per the task's Phase 2 step 5 rule:** "If you cannot find any credible basis for a dish's
macros, leave it out rather than guessing blind. If you can't build at least 3 credible items
for the outlet, do NOT add a half-formed entry — leave the queue entry 'pending', note why in
the session report, and stop (do not pick a fallback outlet in the same run)." Zero credible
items were found (not 1 or 2 — zero), so this session stops here per that instruction rather
than substituting a different queue entry.

## SFA registration (Phase 3)

Not applicable — the Brand/Premises already existed with real SFA data from the 2026-08-20
restructure; this run neither needed nor attempted new SFA matching.

## Write (Phase 4)

**None.** No edits made to `src/lib/brands.ts`, `src/lib/premises.ts`, or `src/lib/menuItems.ts`.
`src/lib/researchQueue.ts` entry `commonwealth_crescent_market_ang_foo_lui` left as `status: "pending"`
(unchanged) — flipping to `researched` would misrepresent that MenuItems exist for it, which they
don't.

## Verify (Phase 5)

No code/data changes were made, so `npx tsc --noEmit` was run against the untouched project as a
sanity check only (not because this session's edits needed verifying).

**Result: passed, no errors** (pre-existing clean state, confirmed unchanged).

## Commit

This report file is a new file (session documentation only — no `Brand`/`Premises`/`MenuItem`/
queue-status changes to commit). Committed locally per Phase 6; **not pushed**.

## Notes for future sessions

- This queue entry is part of the ~590-entry 2026-08-20 hawker-stall batch sourced from raw SFA
  licence data. It's a real, currently-licensed stall (Grade A, not suspended), but has
  essentially no public web footprint under this name — no food blog, review site, or directory
  mentions it. Worth flagging: an unknown but possibly non-trivial fraction of that batch may be
  low-profile/wet-market stalls like this one that are much harder to research than the famous
  stalls food blogs cover. A future session could try: (a) an in-person/photo-based check of
  Stall No 079 to confirm whether it's a wet-market produce stall or a cooked-food stall, (b)
  checking if a cached SFA Track Records xlsx export (with `businessName`) becomes available in
  `reference/` — none was found in the project as of this session, only the prior write-up at
  `reference/research-sessions/2026-08-21-sfa-track-records.md` describing that work, not the
  underlying data files — which might at least confirm a storefront name distinct from the
  licensee name "ANG FOO LUI".
- Recommend the next `platescreen-research-restaurants` run pick the next entry in order
  (`commonwealth_crescent_market_chin_she_thong_chin_sze_thong`) since this one remains blocked,
  not fallback-worthy in the same run per the task's own rule.
