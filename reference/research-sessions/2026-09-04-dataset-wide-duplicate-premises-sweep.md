# 2026-09-04 — Dataset-wide duplicate-Premises sweep (Koufu/Fei Siong/hawker-batch follow-up)

## Why

The 2026-09-02 premises-duplicate-cleanup writeup flagged that its
`(brandId, normalized address)` duplicate check had only been prompted by
that day's brand-merge work, and recommended "a broader sweep of the other
large batch-scraped brand sets (Koufu, Fei Siong, hawker-centre batches) for
the same pattern in a future session, since this was only found by
re-checking, not by the original batch's own verification." This run picked
up that exact recommendation from `ROADMAP.md` item 12's trailing note.

(Note: the prior day's `platescreen-improve-app` run, 2026-09-03, took no
action because its sandbox had no shell access at all and couldn't run the
mandatory verify pipeline. This run had shell access, confirmed working.)

## Method

Ran the same check as the 2026-09-02 cleanup, but across the **entire**
dataset rather than only the brands touched by that day's merge: grouped all
4,655 `Premises` rows by `(brandId, normalized address)` (lowercased,
punctuation stripped, whitespace collapsed) and flagged every group with
more than one row.

Rather than stopping at Koufu/Fei Siong/hawker-centre brand ids specifically,
the script swept every brand — a strict superset of the recommended scope,
and a cheap way to also confirm those three batches were in fact clean.

## Result

Only **2 duplicate groups found, both under `subway`** (not Koufu/Fei
Siong/hawker-centre — those three batches came back clean on this check).
Each pair was the same physical outlet, confirmed by **identical SFA licence
number** (a stronger signal than the 2026-09-02 check used, which only
compared byte-identity of the non-id fields):

| Kept id | Removed id | Licence # | Address | Why removed |
|---|---|---|---|---|
| `subway_p1524` | `subway_p1650` | `SW04110E000` | 1 Maritime Square #02-82, Harbourfront Centre | Same licence number, same address/postal; removed row had lower-precision coordinates (5 decimal places vs. kept row's 15) and an older licensee name (`ZEBULUN SUBS PRIVATE LIMITED` vs. kept row's `SUBWAY HARBOURFRONT PTE LTD`) |
| `subway_p1525` | `subway_p1587` | `NE14021V000` | 5 Tampines Avenue 3 #01-08, Tampines West Community Club | Same licence number, same address/postal; removed row had lower-precision coordinates (5 decimals vs. 15) and a different licensee name (`FLAX SUBS PRIVATE LIMITED` vs. kept row's `SUBWAY @ TAMPINES WEST CC PRIVATE LIMITED`) |

Kept the higher-precision, bulk-geocoded row in each pair (consistent with
the precedent set in the 2026-09-02 cleanup for this exact situation — a
duplicate pair where one row came from careful bulk/API geocoding and the
other from a less careful single-outlet pass). The differing `licenseeName`
values likely reflect the SFA dataset being scraped at two different points
in time under two different franchise operators for the same licensed unit —
not two different physical stalls (same licence number, same address).

No `MenuItem` was touched or needed repointing: `types/db.ts` has no
`premisesId` field, so a `MenuItem` only ever references a `brandId` —
removing a `Premises` row cannot orphan a `MenuItem` (same conclusion the
2026-09-02 writeup reached).

Total Premises: 4,655 → 4,653.

## Verification

- Build mirror sync note: this sandbox's default home/npm cache path
  (`/sessions/...`) was at 100% disk (a shared, session-external
  filesystem, not something this task's own file footprint could free up)
  and `npm install` failed with `ENOSPC` there. Worked around it by building
  the mirror and running `npm install`/`tsc`/`tsx` under `/var/tmp` instead
  (a different, mostly-empty filesystem in the same sandbox) — same repo
  content, same verification rigor, just a different scratch location. Not
  a data-quality concern; noting it in case a future run hits the same
  `ENOSPC` wall and wants the workaround.
- `npx tsc --noEmit` (via the `/var/tmp` mirror): clean.
- Re-ran the exact duplicate-group script post-edit: **0** `(brandId,
  address)` duplicate groups remain (down from 2), Premises count 4,655 →
  4,653 as expected.
- Full integrity check: 0 duplicate ids across Brands (1,717) / Premises
  (4,653) / MenuItems (2,572) / GroceryProducts (19); 0 orphaned `brandId`
  references (Premises or MenuItems). Confirmed `subway_p1650` and
  `subway_p1587` are absent and `subway_p1524`/`subway_p1525` are present
  post-edit.
- `diff` of the live `src/lib/premises.ts` against the mirror's copy: byte-
  identical.
- Deleted the two throwaway audit scripts from the mirror after use; nothing
  ephemeral was added to the live repo.

## Not done

- The Koufu/Fei Siong/hawker-centre batches specifically came back clean on
  this check — nothing to fix there, but also nothing further to
  investigate; the broader sweep this run did (all brands, not just those
  three) supersedes the narrower recommendation and can be considered
  closed out.
- Did not extend the check to a looser fuzzy-match (e.g. same brandId +
  same postal + coordinates within some radius, ignoring address string
  differences like "Ave" vs "Avenue") — that would need per-hit manual
  review to avoid false positives (two genuinely distinct stalls in the
  same mall on the same postal code), which is a larger, separate piece of
  work than this bounded pass.
- Did not investigate *why* the two Subway duplicates exist (e.g. whether
  they came from two different research-session scrapes, similar to the
  2026-08-22 Kopitiam sitemap scrape's known duplication pattern) — the SFA
  licence-number match was sufficient to safely resolve them without
  needing that history.
