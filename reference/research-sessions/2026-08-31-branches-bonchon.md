# 2026-08-31 — Branch queue: Bonchon (no progress, still pending)

## Selection

Per `branchQueue.ts` Phase 1 (filter pending, sort by priority, first-listed wins):
pending medium-priority entries in list order were bonchon, dosirak, grain — bonchon is
first, so it was this run's target. (Note: `branchQueue.ts` shows dosirak was already
updated today under a separate automation commit — `e48d28f`, 09:45 — from what appears to
be a different run of this same scheduled task or a related one. This run re-derived the
target independently from the queue's current on-disk state per the task's deterministic
rule, landing on bonchon since it is still `pending` and still first in list order.)

## Method tried

**Option A (SFA Business Name matching):** No new SFA Track Records xlsx export found in
the project or the uploads folder — nothing to re-run. No new businessName variants tested.
(Flagging for a future run with a fresh export: only the single-word "BONCHON" was tried in
the 2026-08-21 session per `reference/research-sessions/2026-08-21-sfa-track-records.md`;
the two-word "BON CHON" variant has not been tried.)

**Option B (official source):**
- Checked both browsers available in this environment: Claude in Chrome
  (`list_connected_browsers` → zero connected) and the built-in Claude Browser pane
  (`navigate()` denied for both `bonchon.sg` and a neutral control URL, `google.com` —
  confirming this is an unattended-run permission gate with no user present to approve site
  access, not a bonchon-specific block). No way to render JavaScript this run.
- `bonchon.sg/` (root) now fetches cleanly via `web_fetch` — no more HTTP 403 (the
  2026-08-22 run had seen a 403; bot-protection posture appears to have relaxed again) —
  but returns only the homepage's static marketing copy, no address data.
- `bonchon.sg/find-us/` and `bonchon.sg/contact-us/` both still return an empty body (client
  JS-rendered store locator, consistent with every prior run).
- New lead checked and ruled out: the global corporate site `bonchon.com/international-locations`
  does **not** list Singapore among Bonchon's international markets at all (only Cambodia,
  Myanmar, Philippines, Taiwan, Thailand, Laos, Vietnam are linked from there) — bonchon.sg is
  evidently run by an independent local operator not surfaced on the global corporate site.
  This is a dead end, not a signal that the SG business has closed (bonchon.sg's own blog is
  still actively posting).
- Also checked `locations.bonchon.com` — empty body, same JS-locator pattern (and likely
  North-America-scoped regardless).
- Web search again surfaced three/four candidate current outlets — Compass One
  (unit #01-14/15, 1 Sengkang Square), Wisma Atria (unit #01-37/38, 435 Orchard Road), and
  PLQ Mall (unit #02-09, 10 Paya Lebar Rd — though one aggregator, islifearecipe.net, flags
  this one "permanently closed 2026", unconfirmed) — but every source for these addresses is
  a third-party aggregator (Burpple, SingMalls, hungrycat, fastfoodsg, islifearecipe.net),
  which this task's rules explicitly treat as inadmissible. None were added.

## Result

Zero new Premises rows. `branchQueue.ts` entry for `bonchon` kept at `status: "pending"`,
notes extended with this run's findings and a clearer next-step pointer (needs either a
connected browser in an attended/interactive session, or a fresh SFA Track Records xlsx to
test the untried "BON CHON" two-word variant).

## Verification

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a
sandbox, `npm install`, `npx tsc --noEmit` — clean, no errors. Only `branchQueue.ts`'s notes
string was edited; no `premises.ts` changes this run.

## Files touched

- `src/lib/branchQueue.ts` — bonchon entry notes extended (no status change)
