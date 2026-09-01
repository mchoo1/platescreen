# 2026-09-02 — Bonchon/Dosirak: resolving leads with a connected browser

## Why

`branchQueue.ts`'s `bonchon` entry had been stuck for six consecutive
automated runs (2026-08-22 through 2026-09-01) on the same wall: every
`platescreen-research-branches` run is unattended, so neither Claude in
Chrome nor the built-in Browser pane is connected — bonchon.sg's
JS-rendered store locator can't be read, and even a neutral control URL
(google.com) was being denied, confirming a session-level permission gate
rather than a site-specific block. `dosirak` had two smaller open leads
(Suntec City, 313@Somerset) flagged as needing the same capability. This
is an interactive session with the in-app Browser pane actually
available, so this run picks both up.

## Method

Confirmed the browser works generally (google.com loaded immediately).
`bonchon.sg/find-us/` itself was still denied/failed even in this
interactive session — a site-specific block, not the general gate seen in
prior runs. Rather than give up, checked the 4 candidate malls already
named in the queue's notes (PLQ, Compass One, Wisma Atria, Hillion Mall)
plus one new candidate surfaced by a fresh web search (Northpoint City)
directly against **their own official store directories** — arguably a
stronger source than bonchon.sg's own blog posts anyway, since these are
first-party, current, and several have live store-name search covering
their full tenant list (not a partial scrape).

For dosirak, rendered Suntec City's dining directory and 313@Somerset's
full-catalog store-name search directly, resolving the two leads its
notes had been waiting on a browser to check.

## Result

**Bonchon** — checked 5 malls' official directories/search, zero hits on
all 5:
- PLQ Mall (payalebarquarter.com) — 0 results, corroborating a third-party
  "permanently closed" flag with a first-party source.
- Compass One (compassone.sg/?s=Bonchon) — 0 results.
- Wisma Atria (wismaonline.com/?s=Bonchon) — 0 results.
- Hillion Mall (hillionmall.com.sg) — 0 matches across the full 168-entry
  directory (checked via DOM, not just the visible slice).
- Northpoint City (northpointcity.com.sg/stores) — 0 results ("There are
  no store listings at the moment").

This directly contradicts a WebSearch AI-summary claim of "5 active
Bonchon locations in Singapore" — that summary turned out to be sourced
from Yelp/FoodAdvisor/hungrycat aggregator pages, exactly the source
class this project's rules have been correctly declining to use. Today's
official-source spot-check shows why: the aggregator claim doesn't hold
up against the malls' own current directories. No new Premises rows
added — the confirmed count stays at 1 (`bonchon_p1560`, Bugis+) — but
confidence is now much higher that this may genuinely be Bonchon
Singapore's entire current footprint, not an under-researched gap.

**Dosirak** — resolved both previously-open leads with a definitive
negative:
- Suntec City's dining directory does list unit #B1-172, but under the
  name "Bibim Deli" — not Dosirak/Bibimbap, and a different unit number
  from the blog-claimed B1-170. Not treated as a match.
- 313@Somerset's own full-catalog store search returns "No results for
  this query" for both "Dosirak" and "Bibim".

Total confirmed premises unchanged at 6 — this closes out two open
questions as resolved-negative rather than leaving them as recurring
"needs a browser" leads.

## Verification

- `npx tsc --noEmit`: clean.
- This change is pure documentation/comments inside `branchQueue.ts` (a
  research work-queue, not a data table) — no `Brand`/`Premises`/
  `MenuItem` rows were added, removed, or modified, so the usual
  duplicate-id/orphaned-reference runtime check doesn't apply here.
- Every negative finding above was checked against the mall's *own*
  domain (payalebarquarter.com, compassone.sg, wismaonline.com,
  hillionmall.com.sg, northpointcity.com.sg, sunteccity.com.sg,
  313somerset.com.sg) directly in a rendered browser, not inferred from a
  search snippet or aggregator claim — consistent with this project's
  "official source" bar.

## Not done / left for later

- bonchon.sg itself remains unreachable even in this interactive session
  (site-specific block, confirmed distinct from the general unattended-
  session gate seen in prior runs) — if it ever becomes reachable, read
  `/find-us/` directly for the authoritative list rather than continuing
  to infer from malls.
- bugismall.com (to re-verify the one already-confirmed Bugis+ premises)
  was also denied this run — not re-checked, but that record's original
  source (2026-08-20 SFA licensee-name match) is a stronger source than
  today's checks anyway, so this doesn't weaken it.
- Suntec City's "Bibim Deli" remains a genuine open question — worth a
  future check (e.g. an official source confirming or denying it's a
  Dosirak rebrand) but not assumed either way here.
