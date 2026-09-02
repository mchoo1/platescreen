# Branch queue research sweep — 2026-09-02 (scheduled/unattended run)

**Task:** platescreen-research-branches (premises-backfill agent), automated run.

## Selection

Deterministic Phase 1 pick: `bonchon` (first-listed medium-priority pending entry). Its own notes record 7 prior identical blocks (no connected browser in unattended runs); this run re-confirmed the block still holds (see below) and, per the pattern established in prior runs, pivoted remaining time across the queue's other pending entries rather than repeat an identical no-op attempt.

## Environment check

- `preview_start`/`navigate` to a neutral control URL (`google.com`) was denied in the in-app Browser pane before even attempting any target site — confirms this is the unattended-session permission gate seen on every prior scheduled run, not a site-specific block.
- No new SFA Track Records xlsx export found in the project or the uploads folder, so no new Business Name variants were available to try for bonchon/dosirak/grain.

## bonchon (medium, pending — no change)

Re-confirmed blocked (browser gate). Nothing new to try — no SFA export, and this entry's own notes already record 7 prior identical attempts including the one interactive session that got a real browser but was still denied for the bonchon.sg domain specifically. Left `pending`.

## dosirak (medium, pending — no change to premises count, notes updated)

Re-verified this entry's already-resolved locations and closed out two open leads:

- CapitaLand's own official tenant cross-reference page (`capitaland.com/.../stores/bibimbap-dosirak.html`, reachable via plain fetch — not JS-gated like the mall-level directory pages) lists only Bedok Mall + Bukit Panjang Plaza as this tenant's current CapitaLand-portfolio locations — matches `dosirak_p31`/`dosirak_p32` exactly.
- A fresh WebSearch surfaced "OUE Downtown Gallery" and "DUO Galleria" as candidate locations — confirmed these are **not new**, they're already `dosirak_p27` (6A Shenton Way, OUE Downtown) and `dosirak_p28` (7 Fraser Street, DUO Galleria). Corroborated via `dosirak.getz.co` (Dosirak's own ordering platform) defaulting to "Dosirak @ Shenton Way".
- "Raffles City Singapore" and "Funan Mall" (from aggregator-sourced AI search summaries) were checked against CapitaLand's own official per-mall store pages — **neither has a Bibimbap/Dosirak tenant**. Funan's Korean-bibimbap tenant is a different, unrelated brand ("Mincheng Bibimbap"). Also spotted "Paik's Bibimbap" as yet another distinct Korean bibimbap chain — noted to avoid future confusion.

Total real premises unchanged at 6. Still `pending` — the one open item (whether Suntec City's "Bibim Deli" is a Dosirak rebrand) still needs browser access.

## grain (medium, pending — no change)

- Licence SE16186K000's grade: tried via WebSearch first per the standing next-step note; only surfaced dataset landing pages, no fetchable filtered query URL. Not looked up.
- Upper Weld Road address: found one new source, `singaporehalaldirectory.com`, but it's a third-party halal-directory aggregator (not MUIS/SFA/ACRA/the brand's own site) — not admissible, and its page was empty via plain fetch anyway.
- `grain.com.sg/contact` re-confirmed still fully JS-rendered, no static address content.

Total real premises unchanged at 3.

## nourish_bowl (low, pending — no change)

4th independent research pass (after 3 prior passes across `researchQueue.ts` and this queue). Tried an ACRA/company-register-style WebSearch this time (the method that resolved Banquet's defunct status) — zero matching Singapore entity named "Nourish Bowl". A general restaurant-directory WebSearch also found nothing. This is a corroborating negative, not a confirmed-dissolved-entity signal like Banquet's, so the Brand was **not** removed. The `@nourish_bowl` Instagram account remains the one lead that could resolve this and is still unchecked (JS-rendered).

## mccafe (low, pending — skipped intentionally)

Not attempted this run. Its own notes (in both `branchQueue.ts` and `researchQueue.ts`'s `mccafe_colocation_research`) explicitly flag this as a schema/taxonomy decision requiring a human call (fold McCafé into `mcdonalds` Premises vs. copy all 136 rows), not a research gap — 6 consecutive prior scheduled runs reached the same conclusion and recommended excluding it from automated picks until a human decides.

## Files changed

- `src/lib/branchQueue.ts` — appended this run's findings to the `bonchon`, `dosirak`, `grain`, `nourish_bowl` notes.
- `src/lib/researchQueue.ts` — appended matching note to `nourish_bowl_existence_check` (kept in sync with the branch-queue entry).
- No changes to `premises.ts`, `brands.ts`, or `menuItems.ts` — no new admissible premises data was found this run.

## Verification

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox, `npm install`, `npx tsc --noEmit` — clean, no errors.

## Commit

Committed locally as `9610011` ("Branch-queue research: re-verify bonchon/dosirak/grain/nourish_bowl leads"). Not pushed, per task rules. Note: this repo's `.git` directory has a recurring filesystem quirk (seen across many prior runs' leftover `*.lock.bak-*`/`.old-*`/`.stale-*` files) where lock/temp-object files can't be `rm`'d directly (`Operation not permitted`) but git operations still complete successfully with a harmless warning; `mv` (rename) works as a workaround when a lock needs clearing before an operation. Did not attempt any deeper cleanup of this — out of scope for this task.
