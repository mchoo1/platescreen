# 2026-09-01 — Grain: resolve Granary↔Grain SFA-licence ambiguity

**Brand:** `grain` (queue priority: medium, status stays `pending`)

## Context

This is the third `platescreen-research-branches` run today (2026-09-01). The first
two runs both attempted `bonchon` (the queue's first-listed medium-priority pending
entry, per deterministic Phase 1 selection) and hit the same wall each time: zero
connected Claude-in-Chrome browsers, and the built-in Claude Browser pane denying
navigation even to a neutral control URL (google.com), confirming an unattended-session
permission gate rather than a bonchon-specific block. This run re-verified that wall
is still up (see bonchon's own `branchQueue.ts` notes for the by-now seven-times-repeated
confirmation), then — following the precedent set by the last two runs — pivoted to a
different pending entry rather than repeat an identical blocked attempt with no new
information.

`grain`'s own notes (from earlier today) left one explicit next-step that did **not**
require a browser: confirming or refuting whether "THE GRANARY PTE. LTD." (the SFA
licensee found at 5 Burn Road #05-01, the same unit as Grain's own ACRA-registered
address) is the same legal entity as "GRAIN PTE. LTD." or an unrelated tenant.

## Method

Used `WebSearch` + `web_fetch` (no browser needed) to check RecordOwl
(recordowl.com/company/grain-pte-ltd), a Singapore business-registry aggregator that
mirrors ACRA data — the same class of source as opengovsg.com, already treated as
admissible in this queue's prior "acra_registered_address" entries.

RecordOwl's company timeline for GRAIN PTE. LTD. (UEN 201332903E) explicitly lists:

> **Formerly known as:** The Granary

This confirms "THE GRANARY PTE. LTD." is not a different company that happens to
share the unit — it is the *same legal entity, under its pre-rename registered name*.
The SFA licence (SE16186K000) issued to that name at 5 Burn Road #05-01 can therefore
be confidently attached to the `grain_burn_road` premises row.

## Result

- **Premises found:** 0 new (total remains 3: `grain_media_circle`, `grain_tampines_north`, `grain_burn_road`)
- **Premises upgraded:** 1 — `grain_burn_road`'s `sfa` field changed from `null` to
  `{ licenceNumber: "SE16186K000", licenseeName: "THE GRANARY PTE. LTD.", premisesAddress: "5 Burn Road #05-01, Tee Yih Jia Food Building, Singapore 369972" }`.
  `grade` was deliberately left unset — the data.gov.sg `datastore_search` API call
  needed to look it up requires a URL that has actually appeared in a prior
  WebSearch/user-message result (a hand-constructed query URL was rejected by
  `web_fetch`'s provenance check), and no search this run surfaced a working query
  URL for this specific licence. Not fabricated.
- **Geocoding:** unchanged (already geocoded in a prior run).
- **Typecheck:** `npx tsc --noEmit` passes clean in a fresh sandboxed copy
  (`npm install` + `tsc --noEmit`, no errors).
- **Status:** stays `pending` — coverage is still not confirmed exhaustive. Two open
  items remain, both requiring a browser or a first-party source not yet found:
  1. `grain.com.sg`'s own site is JS-rendered; plain fetch only returns nav/meta, not
     body content, so it hasn't been checked for additional kitchen mentions.
  2. "Grain (Upper Weld Road)" is repeated consistently across delivery-platform
     listings (foodpanda, GrabFood, FoodAdvisor, Burpple) but has no first-party or
     government-source confirmation, so it remains unadded per this task's sourcing
     rules.

## Next run

- If Claude in Chrome or the built-in Claude Browser pane becomes available (i.e. the
  unattended-session gate lifts, or a human runs this interactively), check
  `grain.com.sg` directly for additional kitchen mentions, and try to independently
  verify the Upper Weld Road address via a first-party source before adding it.
- Optionally, if a future WebSearch surfaces a working `data.gov.sg` `datastore_search`
  query URL for licence SE16186K000, fetch it to fill in the `grade` field.
- `bonchon` remains the deterministic first pick for Phase 1 selection once a browser
  is available again — its notes document 4 candidate malls (PLQ Mall, Compass One,
  Wisma Atria, Hillion Mall) awaiting first-party confirmation via
  `bonchon.sg/find-us/`.

## Commit

`git commit -m "Premises: extend grain (confirm Granary↔Grain SFA link)"` — not pushed,
per task rules.
