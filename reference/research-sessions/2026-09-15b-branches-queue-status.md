# 2026-09-15 (2nd run this date) — Branch queue status (scheduled/unattended run)

**Outcome: no new Premises rows added.** This is the second `platescreen-research-branches` invocation today (~1hr after the run documented in `2026-09-15-branches-queue-status.md`, committed 21:08). Re-ran Phase 1 selection fresh and tried a couple of genuinely untried angles for `bonchon` and `grain`; both came up empty. `nourish_bowl` and `mccafe` were not re-touched — the prior run today already exhausted `nourish_bowl`'s reachable leads (7th pass) and `mccafe` remains correctly parked pending a human taxonomy decision.

## Phase 1 — selection

Per deterministic rules (pending, sorted by priority, first-listed wins), `bonchon` (medium, first-listed) is next. Checked browser access first (this session had the built-in Browser pane tools loaded directly rather than deferred, unlike most prior runs — worth testing in case that changed anything). It didn't: `request_access` for a neutral control URL (`google.com`) was declined before any brand-site attempt, identical to every unattended run since 2026-08-22.

## Pre-checks

- **New SFA Track Records xlsx:** none found in `uploads/` or the project tree.
- **Browser access:** denied (see above).
- **Bash sandbox:** up and working.

## bonchon (medium, pending)

Tried one untried angle: bonchon's own Facebook page (`facebook.com/bonchonsg/`, a first-party source) via plain `web_fetch` — empty body, blocked by Facebook's standard unauthenticated-scraping wall, same failure mode as `bonchon.sg` itself. A fresh WebSearch re-surfaced the same 4 candidate malls (Compass One, Wisma Atria, Hillion Mall, Northpoint City/PLQ) via FoodAdvisor and SHOPSinSG aggregator pages — still inadmissible, and still directly contradicted by Northpoint City's own official directory search (zero results, checked 2026-09-02). No new premises added. Status unchanged (`pending`).

## grain (medium, pending)

Cross-checked foodpanda's own listings for any kitchen not yet captured: "Grain (Media Circle)" and "Grain (Burn Road)" are both already captured; "Grain Traders (Capita Green)" is the already-identified unrelated false-positive company; "Grain Corporate Catering" / "Grain Alley" read as listing-name variants with no distinct address shown, not confirmed as a 4th kitchen. No new premises added. Total remains 3. Status unchanged (`pending`).

## nourish_bowl / mccafe

Not re-touched — see the prior run's report and each entry's own notes; nothing changed since ~1hr ago that would open a new avenue for either.

## Typecheck

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox dir, ran `npm install --cache /tmp/npmcache` (394 packages, clean) and `npx tsc --noEmit` — passed with zero errors. Only `branchQueue.ts` notes strings were touched this run (no structural/type changes), consistent with the clean result.

## Commit

Committed locally (no push): `branchQueue.ts` notes updates for `bonchon` and `grain`, plus this report.
