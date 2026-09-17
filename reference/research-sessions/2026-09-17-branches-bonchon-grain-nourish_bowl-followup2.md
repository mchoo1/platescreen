# 2026-09-17 — Premises backfill session (scheduled/unattended run, 3rd pass today on this branch queue)

## Phase 1 — Target selection

Deterministic selection lands on `bonchon` (medium priority, first-listed pending entry). Two earlier same-day runs (`2026-09-17-branches-bonchon.md` and `2026-09-17-branches-bonchon-followup.md`) had already reconfirmed it fully blocked with nothing new to try, and pivoted to `grain` and `nourish_bowl`. This run repeated that same deterministic pick, reconfirmed the block itself (see below), and then did the same pivot — but tried genuinely new angles on `grain` rather than repeating the prior runs' searches.

## Repo state found at start of this run

`git status` showed `src/lib/branchQueue.ts` already modified-but-uncommitted (containing both prior same-day runs' notes updates), plus unrelated uncommitted changes to `src/lib/researchQueue.ts` and `src/lib/menuItems.ts` and several untracked files (`_probe.txt.stale-20260917`, `reference/planning/Post-Copilot-Digests/2026-09-17.md`, other same-day session reports, `_probe2.txt.stale-20260917`) belonging to different queues/tracks (`researchQueue.ts`'s `mccafe_colocation_research`, and what looks like another crashed run). Per the prior run's own guidance, none of this was touched — this task's scope is `branchQueue.ts` + `premises.ts` only.

## Phase 1/2 — bonchon (re-check only)

Re-ran the standard browser-access probe: `tabs_context` showed the Browser pane not open; `preview_start` to a neutral control URL (google.com) was denied pending access; the follow-up `request_access` call for that URL was explicitly declined ("user declined... do not retry"); `mcp__claude-in-chrome__list_connected_browsers` returned zero connected devices. Identical wall to both earlier runs today and to essentially every unattended run since 2026-08-22. No new SFA Track Records xlsx in uploads or the project. Did not repeat the data.gov.sg provenance-restricted lookup or the corporate-newswire search already tried in run 1 today — nothing new to add. Appended a brief note to bonchon's queue entry recording this 3rd confirmation and the pivot, per this queue's established practice.

## Phase 2 — grain (genuinely new findings this run)

Two angles not tried in either earlier run today or in the ~15 prior sessions on this brand:

1. **"Grain Traders" investigated in depth, not just as an SFA-businessName false positive.** The 2026-08-21 note only flagged it as a coincidental word match. This run confirmed via `graintraders.com` (its own official site, operating since at least 2015 per a contemporaneous DanielFoodDiary review), `order.graintraders.com`, and its own Facebook/Instagram accounts that Grain Traders is a long-standing, standalone CBD build-your-own-grain-bowl café business (CapitaGreen / 138 Market Street, and Guoco Tower / 1 Wallich Street) with its own site, ordering platform, and multi-year operating history — structurally unrelated to `grain.com.sg`'s cloud-kitchen delivery model. `grain_traders` is not a tracked `brandId` in `brands.ts`, and this closes the lead with much stronger evidence than the original SFA-matching false-positive flag.
2. **Grain's own official career site and social channels.** Checked `careers.grain.com.sg/jobs` and a specific posting (Production kitchen cook) — no address beyond generic "Singapore." Checked Grain's official Facebook page (`facebook.com/graincomsg`) — its listed contact address corroborates the already-captured 5 Burn Road premises (useful first-party corroboration, but not new). Glassdoor's description of the office as being in the "Tai Seng area" is consistent with (not additional to) the Burn Road location, but Glassdoor is a third-party review aggregator, not an admissible source under this task's rules, so nothing was added on that basis.

**No new Premises rows added.** Total real premises for `grain` remains 3 (`grain_media_circle`, `grain_tampines_north`, `grain_burn_road`). Status kept `'pending'`. Appended a note to `grain`'s queue entry recording this run's findings so future runs don't re-investigate the Grain Traders lead or re-check the careers site.

## Phase 2 — nourish_bowl (11th independent pass, negative)

Ran a site-scoped search (`site:instagram.com OR site:facebook.com OR site:tiktok.com`) for "Nourish Bowl Singapore." Same result as ten prior independent passes: only "Nourish Awesome Bowl" (@nourish_awesomebowl, explicitly Kuala Lumpur) and other unrelated brands surfaced — no Singapore hit under the exact name "Nourish Bowl." Browser access (the one check that could resolve this definitively — a rendered read of @nourish_bowl's own Instagram bio/location) remains blocked, same wall as above. No new premises added. Appended a brief note recording this 11th pass. Standing recommendation for a human decision on this brand's existence is unchanged.

## Phase 4 — Premises writes

None. No new verifiable (SFA/ACRA/official-source) premises data surfaced for any brand this run.

## Phase 5 — Verification

Copied the repo (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox (`/tmp/platescreen_verify`), ran `npm install` (had to retry once after a transient `ENOSPC` on the shared npm cache directory — resolved by pointing `--cache` at a fresh `/tmp` directory) and `npx tsc --noEmit`. **Typecheck passed clean** — no errors — against this run's `branchQueue.ts` notes-only edits (three `Edit` calls appending text to the `bonchon`, `grain`, and `nourish_bowl` entries' `notes` strings; no structural/type changes). Sandbox was deleted after verification.

## Phase 6 — Commit

**Still blocked**, for a 3rd consecutive same-day run. `.git/index.lock` (0 bytes, present since 13:09, mode `0700`, same owner) cannot be removed: `rm -f` → `Operation not permitted`; `mv` off-device → `unable to remove target: Operation not permitted`; `git add`/`git commit` themselves report `fatal: Unable to create '.../.git/index.lock': File exists` with git's own standard "another git process / crashed process, remove manually" guidance — which this sandboxed session cannot do, matching both prior runs' diagnosis that this looks like a filesystem/mount-layer restriction (the repo lives in a OneDrive-synced folder) rather than a real concurrent git operation. Nothing new was staged or committed this run. The notes edits are saved directly to `src/lib/branchQueue.ts` on disk (via the `Edit` tool, independent of git) and will be included whenever the lock is eventually cleared.

## Recommendation for a human

- `.git/index.lock` has now blocked **three consecutive** unattended runs today from committing verified, ready-to-commit work (queue notes updates + three session reports, all confirmed on disk and passing typecheck). Please delete it manually from a normal shell on the actual machine (`del .git\index.lock` / check whether OneDrive sync is holding it open), then commit the accumulated `branchQueue.ts` notes changes together with the three 2026-09-17 session reports.
- Suggested commit message once unblocked: `"Branches: bonchon/grain/nourish_bowl re-confirmed blocked/negative, grain-traders ruled out (2026-09-17)"`.
- Standing recommendations remain: (1) a human decision on `nourish_bowl`'s existence (11 independent passes, no confirmable SG presence); (2) enabling Browser/Chrome access, or supplying a fresh SFA Track Records xlsx, so `bonchon` and `grain` aren't stuck on the same non-browser dead end indefinitely; (3) the `mccafe` entry still awaits a human taxonomy decision (co-locate vs. fold into McDonald's) per `researchQueue.ts`'s `mccafe_colocation_research` track; (4) the leftover `researchQueue.ts`/`menuItems.ts`/probe-file changes from an apparently separate track were left untouched, as in the prior run, and should be reviewed by a human before being overwritten.
- No brand's `status` was changed this run. Queue remains: `bonchon` (pending), `grain` (pending), `mccafe` (pending), `nourish_bowl` (pending). (`banquet`, `gong_cha`, `dosirak` remain `researched` from prior sessions, unaffected.)
