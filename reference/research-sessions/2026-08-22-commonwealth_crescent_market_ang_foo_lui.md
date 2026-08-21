# Research Session — 2026-08-22 — Ang Foo Lui (Commonwealth Crescent Market)

**Track:** restaurants / food_court / hawker / coffeeshop / canteen (`platescreen-research-restaurants`)
**Queue entry:** `commonwealth_crescent_market_ang_foo_lui` (type: `hawker`, priority: `medium`)
**Outcome:** NO DATA WRITTEN. Queue entry left `pending`. No MenuItems added, no Brand/Premises changes, no queue-status flip.

## Selection (Phase 1)

594 pending entries matched the restaurant-track types (`restaurant`, `food_court`, `hawker`,
`coffeeshop`, `canteen`) out of 635 total `RESEARCH_QUEUE` entries (511 `medium`, 83 `low`, 0
`high`). `commonwealth_crescent_market_ang_foo_lui` is still first in array order among
`medium`-priority pending entries, so Phase 1's deterministic rule selects it again — this is
the same entry a prior run (`2026-08-21-commonwealth_crescent_market_ang_foo_lui.md`) already
researched and left `pending` for lack of any credible source.

Re-confirmed `src/lib/brands.ts` / `src/lib/premises.ts` state is unchanged since that session:
Brand `commonwealth_crescent_market_ang_foo_lui` (name "Ang Foo Lui", type `hawker`) and Premises
`commonwealth_crescent_market_ang_foo_lui_p127` (SFA licence `CW3079002`, licensee "ANG FOO LUI",
address "COMMONWEALTH CRESCENT MARKET Stall No 079", grade A, not suspended) both already exist.
Per Phase 1 step 5 this run's scope was Phase 2 + MenuItems only.

## Research (Phase 2) — stopped again, no credible basis found

Before repeating web research, checked whether an SFA Track Records xlsx export (with
`businessName`) had since been added to the project, per the prior session's suggestion —
searched `reference/` for any `.xlsx` or "track record" file. **None found**; only the prior
write-up (`reference/research-sessions/2026-08-21-sfa-track-records.md`) describing that dataset
exists in this project, not the underlying files. That avenue remains unavailable.

Ran fresh web searches (new angles from the prior session's, not just repeats):
- `"Ang Foo Lui" Commonwealth Crescent` — no results connecting the two; every hit was
  Commonwealth Crescent Food Centre content unrelated to this stall (Sek Tong Gai, Daniel Food
  Diary's "10 Best" roundup, SethLui's "10 Stalls" guide, the SG Hawker Centres Fandom wiki,
  Time Out, c.h.e.f blog, The Fat Guide).
- `Commonwealth Crescent Market wet market stall list vegetable meat fish vendors` — surfaced a
  2015 "To Market, To Market" wet-market writeup and an NHB wet-markets heritage PDF, but no
  stall-by-stall directory and no mention of "Ang Foo Lui" — consistent with the prior session's
  hypothesis that "Stall No 079" sits in the market's wet-market wing (raw produce/meat/fish)
  rather than the food-centre wing that food blogs cover, though still unconfirmed either way.

Zero credible items found — same result as the prior run. **Per Phase 2 step 5:** "If you cannot
find any credible basis for a dish's macros, leave it out rather than guessing blind. If you
can't build at least 3 credible items for the outlet, do NOT add a half-formed entry — leave the
queue entry 'pending', note why in the session report, and stop (do not pick a fallback outlet in
the same run)." This session stops here rather than substituting a different queue entry.

## SFA registration (Phase 3)

Not applicable — Brand/Premises already existed with real SFA data from the 2026-08-20
restructure.

## Write (Phase 4)

**None.** No edits to `src/lib/brands.ts`, `src/lib/premises.ts`, or `src/lib/menuItems.ts`.
`src/lib/researchQueue.ts` entry left as `status: "pending"` (unchanged).

## Verify (Phase 5)

No data changes were made; `npx tsc --noEmit` was not re-run since nothing in the project changed
from this session's work (prior session confirmed clean state on 2026-08-21).

## Commit

This report file is a new file (documentation only — no `Brand`/`Premises`/`MenuItem`/
queue-status changes to commit). Committed locally per Phase 6; **not pushed**.

## Notes for future sessions

- **This queue entry is now blocked across two consecutive runs (2026-08-21, 2026-08-22) with
  identical findings.** Because Phase 1's selection rule is purely mechanical (first pending
  `medium` entry in array order) and this session's own rule forbids picking a fallback within
  a run, this entry will keep being selected — and keep dead-ending — on every future run until
  either (a) new external data becomes available (an SFA Track Records xlsx with `businessName`,
  or an in-person confirmation of what Stall No 079 actually sells), or (b) a human decides to
  manually deprioritize/skip it (e.g. set `priority: 'low'`, or add a note flagging it as
  currently unresearchable) so the deterministic selection moves on.
  Recommend flagging this to the project owner rather than having a third consecutive run repeat
  the same dead end.
- If unblocked, the next in-order entry is `commonwealth_crescent_market_chin_she_thong_chin_sze_thong`.

## Sources checked (no usable data from any)

- [Sek Tong Gai @ Commonwealth Crescent — johorkaki.blogspot.com](https://johorkaki.blogspot.com/2025/04/sek-tong-gai-commonwealth-crescent.html)
- [10 Best Commonwealth Crescent Food Centre To Try — DanielFoodDiary.com](https://danielfooddiary.com/2024/01/24/commonwealthcrescentfood/)
- [10 Stalls That You Have To Try at Commonwealth Crescent Market — SETHLUI.com](https://sethlui.com/commonwealth-crescent-market-food-guide-singapore/)
- [Commonwealth Crescent Market — SG Hawker Centres Wiki | Fandom](https://sg-hawker-centres.fandom.com/wiki/Commonwealth_Crescent_Market)
- [Commonwealth Crescent — Time Out Singapore](https://www.timeout.com/singapore/restaurants-and-cafes/commonwealth-crescent)
- [To Market, To Market: Commonwealth Crescent Market — Owls Well](https://owlswellblog.wordpress.com/2015/08/17/to-market-to-market-commonwealth-crescent-market/)
- [Commonwealth Crescent Market: 10 Popular Stalls Worth Visiting — HawkerPedia](https://hawkerpedia.com.sg/commonwealth-crescent-market/)
- [WET MARKETS COMMUNITY HERITAGE SERIES II — NHB](https://www.nhb.gov.sg/~/media/nhb/files/resources/publications/ebooks/nhb_ebook_wet_markets.pdf)
