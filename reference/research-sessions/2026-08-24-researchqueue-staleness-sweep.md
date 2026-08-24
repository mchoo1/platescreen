# 2026-08-24 — researchQueue.ts staleness sweep + brands.ts header docs

Task #56: the last of the four "focus on fixing the outlets first" sub-priorities. Cleans
up bookkeeping debt left behind by the generic-licensee-name cleanup (Batches A through V)
rather than adding new outlet data.

## The staleness problem

`researchQueue.ts` has two kinds of entries: type 1 (a chain/venue/operator not yet added
to brands.ts at all — no `sfaLicenceNo` field) and type 2 (a real hawker stall whose Brand
row already exists — tagged with `sfaLicenceNo`, only needs menu/macro follow-up). Type 2
entries were created by copying the `id` of an existing Brand row at the time the queue was
built (2026-08-20).

Every hawker-cleanup batch since then (the generic-licensee-name replacement project,
Batches A through T, plus the Buangkok/One Punggol/Koufu work in Batches U and V) deletes
the generic-name Brand row it replaces. That silently orphans any type-2 queue entry
pointing at the deleted id — the entry still exists, still says "pending," but there's no
Brand left for the eventual macro-research task to attach a MenuItem to.

## What was found and removed

Wrote a script cross-referencing every `sfaLicenceNo`-tagged, non-`researched` entry's `id`
against the current `brands.ts`. Of 572 such entries, **493 (86%) were stale** — the
underlying Brand no longer exists. Removed all 493 via the same brace-depth-aware
object-splitter used throughout this project's brands.ts/premises.ts edits (matched by
top-level `id`, not string-replace, to avoid any risk of partial-match corruption).

The 79 remaining `sfaLicenceNo` entries still reference real, currently-existing Brand rows
and are legitimate outstanding macro-research work — left untouched. The ~50 type-1 entries
(no `sfaLicenceNo` — new chains/operators/venues not yet added) were also left untouched;
a missing-brand check doesn't apply to them by design, since they're expected to predate
their own Brand row.

Net: **622 → 129 entries**. Did not add new type-2 entries for the ~500+ real stall names
added across Batches A-V, per the same policy already established in the 2026-08-23 header
update (avoid the "one row per stall" scale problem already flagged for the 839-stall
Kopitiam backlog) — their macro research is deferred to the same future batched pass.

## brands.ts header docs

The header comment block documented restructure history through "2026-08-22f" and a
partial "2026-08-23 (4th pass)" entry, but was never updated for the ~20 hawker-cleanup
batches (A through T) that ran after that, nor for Batches U (Buangkok/One Punggol) and V
(Koufu sub-brands) from this session. Appended three new entries:
- **2026-08-23/24 (5th-6th pass, Batches A-T)**: summarizes the full generic-licensee-name
  cleanup completion, the 3 SFA-log-duplication-bug instances found and fixed, and the
  wrong-address pattern found repeatedly.
- **2026-08-24 (Batch U)**: Buangkok (new venue, 25 stalls) and One Punggol (28 new stalls
  + 2 address fixes) retries.
- **2026-08-24 (Batch V)**: the Koufu sub-brand resolution, including the duplicate-brand-id
  bug caught and corrected mid-batch.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean on both `brands.ts` (header comment only,
no data change) and `researchQueue.ts` (493 entries removed, syntax re-validated via the
TS compiler importing the file — a malformed brace or trailing comma would have failed this
step). 129 unique ids confirmed (no duplicates introduced by the removal), 0 remaining
stale `sfaLicenceNo` entries after the sweep. Build-mirror diff confirms live and mirror
files are byte-identical.
