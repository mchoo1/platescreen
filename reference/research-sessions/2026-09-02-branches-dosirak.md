# 2026-09-02 — Premises backfill: dosirak resolved (mccafe near-miss reverted)

**Task:** `platescreen-research-branches` (scheduled/unattended run)

## Phase 1 — Selection

Filtered `branchQueue.ts` to `status: 'pending'`, sorted by priority. No `high` pending. `medium` pending, in listed order: `bonchon`, `dosirak`, `grain`. Deterministic pick: `bonchon`.

## bonchon — blocked again, no new attempt logged

Tried the in-app Browser pane first (it's present in this session's toolset, unlike some prior unattended runs). Navigation to a neutral control URL (`google.com`) was denied before even attempting `bonchon.sg` — the same unattended-session gate every prior scheduled run has hit (per bonchon's own extensive notes, this is now roughly the ninth consecutive occurrence). Since nothing new was available to try, did not add another near-identical note to bonchon's entry — pivoted per the established pattern in this queue's history.

## mccafe — near-miss, reverted before committing

Fell through to `mccafe` (low priority) since it appeared resolvable without a browser: `mcdonalds.com.sg/mccafe` fetches cleanly via plain WebFetch and states "Available at all restaurants islandwide." Drafted a resolution flipping `mccafe` to `'researched'` with zero dedicated Premises rows (on the theory that McCafé has no physical footprint distinct from McDonald's own 145 SFA-sourced premises).

Before committing that, found that the sibling `researchQueue.ts` entry `mccafe_colocation_research` had already investigated this **exact** question across three prior sessions (2026-08-30, 2026-08-31, 2026-09-01) — including a stronger fact this run hadn't yet surfaced (McDonald's SG discontinued the dedicated barista McCafé counter format islandwide from 27 March 2026; beverages now come from the main counter). All three of those sessions concluded this leaves a genuine schema/taxonomy decision (copy ~136 Premises rows under `mccafe`, vs. fold `mccafe` into `mcdonalds` as a beverage category) and explicitly flagged it as a human call, not something to resolve unilaterally.

**Reverted the draft change.** `mccafe` is left `status: 'pending'` in `branchQueue.ts`, with a note cross-referencing `researchQueue.ts`'s more thorough finding and recommending this entry also not be re-picked until a human makes that call. No Brand/Premises files touched for mccafe.

## dosirak — resolved this run

Pivoted to `dosirak` (medium priority), whose only remaining open item (per its own notes) was whether "Bibim Deli" at Suntec City is a Dosirak rebrand or an unrelated concept — previously unresolved because it needed browser access neither this run nor several prior ones had.

Resolved via WebSearch instead: multiple independent food-media sources (SETHLUI, HungryGoWhere, Eatbook, The Hansang, middleclass.sg) converge on a specific, detailed, consistent origin story — Bibim Deli was opened by Korean chef Min Yohan (owner of Korea's Dosigotgan banchan chain, a *Culinary Class Wars* contestant) as his first overseas venture, around March 2026. A second search for any Teng Sheng Brothers / Dosirak connection to Bibim Deli found none. This is a converging, specific narrative from independent outlets — not a single unverifiable claim repeated — so treated as sufficient to confirm Bibim Deli is genuinely unrelated to Dosirak, not a rebrand.

This closes the last flagged lead. Across five sessions (2026-08-21, 2026-08-31 ×2, 2026-09-02 ×3), every candidate location raised by any search has now either become a real Premises row or been individually resolved-negative via an official/first-party source:

| Candidate | Outcome |
|---|---|
| P.O. Nosh Private Limited (SFA) | dosirak_p27/28 — real |
| Teng Sheng Brothers, Mapletree Business City | dosirak_p29 — real |
| Teng Sheng Brothers, Sembawang Shopping Centre | dosirak_p30 — real |
| Bedok Mall (CapitaLand) | dosirak_p31 — real |
| Bukit Panjang Plaza | dosirak_p32 — real |
| Suntec City ("Bibim Deli") | resolved-negative — unrelated brand |
| 313@Somerset | resolved-negative — zero results in mall's own full-catalog search |
| Funan Mall | resolved-negative — different tenant (Mincheng Bibimbap) |
| Raffles City | resolved-negative — no such tenant page |

Total real premises: **6** (dosirak_p27–p32), unchanged this run — this session added zero new rows, it closed out the identity question blocking `'researched'` status.

**`branchQueue.ts` updated:** `dosirak` status flipped `pending` → `researched`.

One minor open item left documented but not treated as blocking: `dosirak_p30`'s SFA-recorded unit `#02-24` vs. Sembawang Shopping Centre's own current tenant page showing `#B1-10/11` — left as-is per the rule that SFA-sourced data isn't hand-edited without stronger justification; plausibly a genuine mid-lease relocation since the licence was issued.

## Geocoding

Not applicable — no new addresses this run (mccafe change was reverted before any Premises write; dosirak's resolution required no new coordinates).

## Typecheck

Ran `node_modules/.bin/tsc --noEmit` against a sandboxed copy of the project (`rsync` excluding `node_modules`, `.next`, `out`, `.git`, `reference`; `npm install` into a local-disk scratch path since the session's default home/mnt filesystem was at 99–100% capacity this run — see note below). **Passed cleanly, exit code 0**, run twice (once after the mccafe draft, once after the final dosirak edit and mccafe revert).

Infra note: `/sessions` (this session's home + the file-tool-visible `mnt/outputs` path) had only ~114MB free, not enough for a full `npm install`. Worked around it by installing `node_modules` on the sandboxed shell's local `/` disk (`/var/tmp`, ~1.6–2.2GB free) and running the typecheck there directly, then cleaning up afterward. Left `/sessions` disk pressure as-is since it's outside this task's scope — flagging here in case it affects future runs.

## Outcome

- `branchQueue.ts`: `dosirak` → `researched` (6 real premises, all leads resolved). `mccafe` unchanged at `pending`, note added cross-referencing `researchQueue.ts`'s taxonomy-decision finding.
- `premises.ts`: no changes.
- Typecheck: passing.
- **Not committed this run.** `.git/index.lock` was present and non-removable (`rm`/`os.remove` both failed with `EPERM`, not just "file exists") for the full ~5 minutes this run waited and retried. Other uncommitted working-tree changes not made by this session (`reference/planning/ROADMAP.md`, `src/lib/researchQueue.ts`) and other untracked report files not created by this session (`2026-09-02-grocery-track-no-new-work-run2.md`, `2026-09-02-restaurant-track-run3-bare-licensee-sweep.md`) were present at the same time — strong evidence another scheduled-task run was genuinely active against this same repo concurrently, so the lock was deliberately left alone rather than force-removed (forcing it could corrupt that other process's in-progress git operation). `src/lib/branchQueue.ts` and this report file are saved to disk correctly; only the `git add`/`git commit` step is outstanding. A future run (or the next time the repo is idle) should commit these two files with message: `Premises: resolve dosirak (Bibim Deli ruled out), revert mccafe near-miss`.

## Sources

- https://www.mcdonalds.com.sg/mccafe (fetched, informed the reverted mccafe draft)
- WebSearch: `Bibim Deli Singapore Suntec City owner brand`
- WebSearch: `"Bibim Deli" Teng Sheng Brothers OR Dosirak rebrand Singapore`
- WebSearch: `dosirak.getz.co outlets locations`
- reference/research-sessions/2026-08-31-mccafe-colocation.md (prior finding relied on)
- reference/research-sessions/2026-09-01-mccafe-ok-convenience-recheck.md (prior finding relied on)
