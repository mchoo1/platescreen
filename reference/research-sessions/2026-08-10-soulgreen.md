# Research Session — Soulgreen track (2026-08-10)

**Track:** grab_go / ready_to_eat / supermarket (automated scheduled run)

## Selection

Filtered `RESEARCH_QUEUE` to `status: 'pending'` entries with `type` in
`grab_go`/`ready_to_eat`/`supermarket`: `coffeesmith` (low), `hollin` (low),
`four_leaves` (low), `bengawan_solo` (low), `ok_convenience` (low), `grain`
(high), `saladbox` (medium), `soulgreen` (medium).

Sorted by priority, highest first:

1. **`grain`** (high) — cross-checked against `outlets.ts` and found `id:
   "grain"` **already present** (a "Grain" `Outlet` record, type
   `restaurant`, exists at line ~183). Per Phase 1 step 5, flipped its queue
   status to `'researched'` (no new record added — it already has one) and
   moved to the next candidate.
2. **`saladbox`** (medium, next in priority order) — same situation: `id:
   "saladbox"` already present in `outlets.ts` (line ~1041). Flipped to
   `'researched'`, moved to the next candidate.
3. **`soulgreen`** (medium) — `id: "soulgreen"` confirmed **not** present in
   `outlets.ts`. Selected as the actual research target for this session.

## Research: Soulgreen

Searched extensively for a Singapore grab-and-go "Soulgreen" / "Soul Green"
healthy-food chain (the queue entry's `cuisine: "Healthy"` and `grab_go`
type suggested something in the same category as Grain/Saladbox/SaladStop).

No such chain exists in current search results. The only Singapore business
matching the name is **"Soul Green"**, a single-outlet fresh fruit & fruit
juice shop that operated at Eastpoint Mall, 3 Simei Street 6 #01-16
(Simei), selling juices such as star fruit, carrot, pear, apple, orange,
kiwi, strawberry, celery, watermelon, pineapple, and mango juice, plus
yogurt drinks. Per SHOPSinSG and corroborating search results, **this
outlet closed in 2023**. No official nutrition panel, HPB entry, Open Food
Facts listing, delivery-platform menu (GrabFood/foodpanda), or pricing was
found anywhere — reasonable given fresh-squeezed juice from an independent
shop is unlikely to ever have had a published macro breakdown, and the shop
is no longer trading regardless.

**Decision: left `soulgreen` as `'pending'`.** Per task rules, if fewer
than 5 credible items can be built for an outlet, don't add a half-formed
record and don't fabricate macros or prices with no basis — leaving the
queue entry untouched (aside from a note explaining the finding) is the
correct outcome. No `Outlet` or `FoodOption` records were added for
`soulgreen`. Per instructions, no fallback outlet was substituted in this
same run.

A `notes` field was added to the `soulgreen` queue entry documenting this
finding so a future run (or a human) doesn't repeat the same dead-end
search.

## Files changed

- `src/lib/researchQueue.ts`:
  - `grain` — `status: 'pending'` → `'researched'` (id already existed in
    `outlets.ts`; note appended)
  - `saladbox` — `status: 'pending'` → `'researched'` (id already existed
    in `outlets.ts`; note appended)
  - `soulgreen` — unchanged status (`'pending'`), `notes` field added
    explaining the closed-shop finding
- `src/lib/outlets.ts` — no changes
- `src/lib/foodOptions.ts` — no changes

## Typecheck

Copied project (excluding `node_modules`, `.next`, `out`, `.git`,
`reference`) to a sandbox dir, ran `npm install` (394 packages, clean) then
`npx tsc --noEmit`. **Result: passed, no errors.**

## Next candidates for a future grocery-track run

With `grain`, `saladbox`, and (still) `soulgreen` out of the high/medium
tier, the remaining pending grab_go/ready_to_eat/supermarket entries are
all `low` priority, in array order: `coffeesmith`, `hollin`, `four_leaves`,
`bengawan_solo`, `ok_convenience`.
