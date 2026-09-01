# 2026-09-01 — Scheduled branches run (2nd run this date): queue cleanup + nourish_bowl first pass

## Phase 1 selection

Filtered `branchQueue.ts` for `status: "pending"`, sorted by priority. `bonchon` (medium) is
first-listed and was picked deterministically, same as every prior run.

## `bonchon` — re-confirmed blocked (6th consecutive attempt)

- `mcp__claude-in-chrome` `list_connected_browsers` → zero connected browsers.
- Built-in Claude Browser pane → `navigate` to a neutral control URL (`google.com`) was denied
  before even attempting `bonchon.sg`, confirming this is the same unattended-session permission
  gate documented in every prior run (2026-08-22 x2, 2026-08-31 x2, 2026-09-01 1st run), not a
  bonchon-specific block.
- No new SFA Track Records xlsx export found in the project or uploads folder.
- Nothing new to try — per this entry's own notes, the only remaining paths are a connected
  browser or a fresh SFA export, neither available this run. Left `pending`, notes updated with
  today's re-confirmation.

Rather than burn the rest of the run re-attempting an identical, now six-times-documented block,
used the remaining time on two other things:

## Queue hygiene: removed `wendys` and `superfood_kitchen`

While reviewing the queue, checked whether every `brandId` still resolves to a real `Brand` in
`brands.ts` (a basic integrity check, not previously done as a standalone pass). Found two
that don't:

- `wendys` — zero hits in `brands.ts` or `premises.ts`.
- `superfood_kitchen` — zero hits in `brands.ts` or `premises.ts`.

`brands.ts`'s own changelog comment (2026-08-24, "defunct chains") explains why: both brands
were deliberately deleted in full (Brand + Premises + MenuItems) after being confirmed defunct
in Singapore. `branchQueue.ts` was never updated to match, leaving two entries whose `brandId`
pointed at nothing — a violation of `BranchQueueEntry.brandId`'s own "must match an existing
Brand.id" contract, and a trap for a future run that might otherwise spend time researching
premises for a brand the project has already decided doesn't exist here.

Removed both entries and added a dated note to the queue's header comment explaining the removal
and how to reverse it (re-add fresh, alongside a new Brand row, if either chain re-enters the SG
market — not by reverting this commit).

## `nourish_bowl` — first research pass (entry previously had no notes)

This entry had zero notes despite a sibling entry, `nourish_bowl_existence_check` in
`researchQueue.ts` (a separate MenuItems-focused queue), already flagging on 2026-08-24 that:
- its only Premises row was removed as an unverifiable "Multiple outlets islandwide" placeholder;
- two WebSearch rounds found no current Singapore presence under this exact name, only a
  differently-named "Nourish Table" (Botanic Gardens) and "Nourish Awesome Bowl" (Kuala Lumpur).

Ran a third independent pass this run (three separate WebSearches: general outlets, salad-bar
context, Instagram) — same result. No Singapore outlet, address, or official site found under
"Nourish Bowl". Surfaced an Instagram handle, `@nourish_bowl`, but `instagram.com/nourish_bowl/`
returns an empty body via plain fetch (JS-rendered, needs a logged-in/rendered browser to read
the bio/location — blocked this run, same wall as bonchon above).

Not adding any Premises row without a verified source. Left `pending`; notes now record all
three passes and recommend a human either confirm the brand via the Instagram account directly,
or — if it's genuinely defunct — remove it from `brands.ts` and this queue, mirroring the
Wendy's/Superfood Kitchen cleanup done above.

## Outcome

- Premises added: 0.
- `branchQueue.ts`: removed 2 stale entries (`wendys`, `superfood_kitchen`), added notes to
  `nourish_bowl` (previously blank) and `bonchon` (re-confirmation), added a header-comment
  changelog entry.
- `premises.ts`: untouched.
- Typecheck: sandbox copy (excluding `node_modules`/`.next`/`out`/`.git`/`reference`), `npm
  install`, `npx tsc --noEmit` — **passed, 0 errors**.
- Committed locally, not pushed, per task rules.

## Sources

- [Nourish Awesome Bowl — Facebook](https://www.facebook.com/p/Nourish-Awesome-Bowl-100085046125963/) (Kuala Lumpur, ruled out as a different market)
- [Nourish Table (@nourishtable.sg) — Instagram](https://www.instagram.com/nourishtable.sg/) (different brand, Botanic Gardens)
- [Nourish Bowl (@nourish_bowl) — Instagram](https://www.instagram.com/nourish_bowl/) (handle found, page unreadable via plain fetch — JS-rendered)
- `brands.ts` internal changelog comment, 2026-08-24 "defunct chains" entry (repo-internal source for the wendys/superfood_kitchen removal)
