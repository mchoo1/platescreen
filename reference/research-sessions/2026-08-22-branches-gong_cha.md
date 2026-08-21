# 2026-08-22 — platescreen-research-branches: Gong Cha (resolved — brand not currently operating)

## Selection

`src/lib/branchQueue.ts` filtered to `status === 'pending'`, sorted by priority
(high → medium → low), first-listed within tier. **Gong Cha** (`gong_cha`) was again
the only `high`-priority entry (the other 8 — bonchon, banquet, mccafe, dosirak,
nourish_bowl, superfood_kitchen, wendys, grain — are `medium`/`low`), so it was
selected deterministically, same as the 2026-08-21b run.

## What was already known

Gong Cha had been checked three times before this run, all dead ends:
- 2026-08-20 licensee-name matching against data.gov.sg — no resolution.
- 2026-08-21 (same day) — zero `businessName` hits against the 52,101-row SFA
  Track Records export.
- 2026-08-21b — official store locator (gongcha.com.sg) blocked by a TLS
  certificate mismatch (serving a cert for `ahmadalbab30.pw`, not the real
  domain). Entry left `pending` with an explicit instruction not to retry the
  same domain until the cert issue was confirmed resolved, and to try a
  different official source (app, social/help-center page) next.

No new SFA Track Records xlsx export was found in `uploads/` this run (only the
`SKILL.md` task file is present), so re-running Business Name matching wasn't
an option — went straight to re-verifying the cert and then searching for an
alternative official source per the prior run's note.

## What changed this run

1. Re-checked the TLS cert via `curl -v`: **still** serving `CN=ahmadalbab30.pw`
   for `www.gongcha.com.sg`, unresolved — did not attempt the domain again via
   browser, consistent with the standing instruction.
2. Searched for alternative official sources (Gong Cha's app, official
   Instagram/Facebook, help-center) as suggested. This surfaced the real
   explanation:

   **Gong Cha closed every single Singapore outlet on 2026-10-02** in a
   complete franchisee exit — confirmed by multiple independent news sources
   (Time Out Singapore, Mothership, AsiaOne, STOMP, VnExpress, Retail News
   Asia). A Gong Cha spokesperson stated at the time that the brand's
   Singapore website, social media accounts, and delivery-platform presence
   were deliberately wiped as part of the exit, and that it plans to return
   in 2026 under a new franchisee ("Gong Cha 2.0"). As of this run's date
   (2026-08-22), that relaunch has **not** happened. Instead, the vacated
   outlets have been taken over by a *different, unrelated* new brand called
   **Cai Ca** (采茶), founded by Gong Cha SG's former franchisee CEO, currently
   trading at 6 locations (Lot One, Bugis Junction, NUS UTown, King Albert
   Park, Northpoint City, Century Square).

   This fully explains every prior dead end: there is no active SFA licence
   to match (no outlets = no licences), and the domain is squatted/mismatched
   because Gong Cha SG itself wiped and abandoned it during the exit.

3. **Cai Ca is not Gong Cha** — did not attach Cai Ca's locations to the
   `gong_cha` brand. If PlateScreen wants to track Cai Ca as a food option,
   that needs its own new Brand row and a separate research entry, not a
   substitution here.
4. Removed the stale `gong_cha_p2` premises row (`"Multiple outlets
   islandwide"`, `source: "legacy_static_coordinate"`) from `premises.ts`.
   This placeholder predates the closure and is now confirmed actively
   misleading (it implies the brand is currently operating everywhere) rather
   than merely unresearched, so it was deleted outright — the same treatment
   the 2026-08-21 session gave to 29 other stale `legacy_static_coordinate`
   rows once real data superseded them. Here the "real data" is the
   confirmed fact that zero real premises currently exist.

## Outcome

- `gong_cha` premises count: **0** (was 1 placeholder, now correctly 0).
- `branchQueue.ts` entry flipped `status: "pending"` → `"researched"` — zero
  premises is complete/accurate coverage of current reality, the same
  "genuinely no physical presence" exception the task instructions already
  carve out for single-location/no-fixed-presence brands.
- Note field rewritten with the full explanation and an explicit instruction
  for a future run: if news of an actual Gong Cha SG relaunch appears, flip
  the entry back to `pending` and research the new franchisee's premises
  fresh — the pre-exit addresses should not be assumed to still apply.
- No fabricated addresses or coordinates were added.

## Typecheck

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`,
`reference`) into a sandbox, `npm install` (394 packages), `npx tsc --noEmit`
— **clean, exit 0.**

## Commit

Committed locally only (no push), covering `premises.ts` (placeholder removal
+ header note) and `branchQueue.ts` (status flip + notes rewrite).
