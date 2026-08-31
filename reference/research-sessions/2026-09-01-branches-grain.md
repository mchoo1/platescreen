# Premises backfill — Grain — 2026-09-01

## Phase 1 selection

Deterministic selection (pending, priority-sorted, first-listed wins) picked **bonchon** (medium
priority, first-listed). Re-checked it first: `list_connected_browsers` (Claude in Chrome) returned
zero connected browsers, and the built-in Claude Browser pane denied navigation to both
`bonchon.sg/find-us/` and a neutral control URL (`google.com`) — confirming the same
unattended-session permission gate hit on 2026-08-22 (x2) and 2026-08-31 (x2). No new SFA Track
Records xlsx export was found in the project or uploads folder either. Following the precedent
already set in bonchon's own queue notes ("rather than repeat the exact same blocked attempt..."),
pivoted to **grain** (the next medium-priority pending entry) instead, since it had an unexplored
Option B angle (no browser dependency).

## What was found

`branchQueue.ts`'s "grain" entry was stale: it still read "still ALL false positives... needs the
official source" from 2026-08-21, but a separate 2026-08-24 commit (`12b73e0`, an address/lat-lng
pooling-bug-fix pass) had already quietly replaced the old `grain_p4` ("Multiple outlets
islandwide", `legacy_static_coordinate`) placeholder with two real central-kitchen premises
(`grain_media_circle`, `grain_tampines_north`, both `source: "web_research"`) — without updating
this queue entry to reflect it.

Confirmed via `grain.com.sg/home` (fetched directly — nav/meta content is available even though the
body is JS-rendered) that Grain is a delivery/catering-only "online restaurant": the site nav has
no store-locator or "find us" link, only About / Grain Catering / Our stories / Jobs. This matches
the brand's own copy elsewhere ("cloud kitchen model — utilizing unwanted real estate as kitchens")
and is consistent with the two existing premises both being JTC shared-kitchen-space addresses
rather than retail units. So there is no walk-in storefront network to enumerate for this brand —
the "premises" here are production kitchens.

**New premises added:** `grain_burn_road` — 5 Burn Road #05-01, Tee Yih Jia Food Building,
Singapore 369972. Source: ACRA (via opengovsg.com, a mirror of Singapore's official company
register) shows "GRAIN PTE. LTD." (UEN 201332903E, SSIC 56200 Food Caterers, status: live) is
registered at this exact address — a government source, admissible per this task's rules.
Geocoded via OneMap (single sequential request, succeeded first try): lat 1.335246636625769,
lng 103.885008398598.

**Flagged, not resolved:** SFA's licensed-establishment dataset shows a food licence
(`SE16186K000`) at the identical unit (#05-01, same building) held by a *different* company name,
"THE GRANARY PTE. LTD." — could be a trading-name variant of Grain Pte Ltd, could be an unrelated
tenant of the same unit at a different time. Not confirmed either way, so `sfa` was deliberately
left `null` on the new row rather than attaching that licence on a name-coincidence basis.

**Deliberately not added:** "Grain (Upper Weld Road)" (19 Upper Weld Road, S207376) — consistently
named across foodpanda, GrabFood, FoodAdvisor, and Burpple, but all four are third-party
delivery-platform/aggregator listings, not grain.com.sg itself or a government source, so not
admissible under this task's sourcing rules even though the platforms are operationally likely to
have the real kitchen address.

## Result

Premises count for `grain`: 2 → 3. `branchQueue.ts` status kept as `pending` (coverage still not
confirmed exhaustive — the Granary/Grain link and the Upper Weld Road lead remain open). Notes field
rewritten with full method, what was verified, what was rejected, and what to try next. Bonchon's
notes also updated to record today's repeat block (5th identical attempt) and the pivot rationale.

## Verification

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox
directory, ran `npm install` (55 packages) and `npx tsc --noEmit` — exit code 0, no errors.

## Status

Partial run — grain remains `pending` (3/3+ premises, coverage not confirmed complete). Committed
locally, not pushed.
