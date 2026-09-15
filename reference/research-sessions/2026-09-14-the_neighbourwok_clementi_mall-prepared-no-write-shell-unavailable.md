# 2026-09-14 — restaurant-track scheduled run: research completed, no data-file edit (Cowork shell sandbox unreachable)

**Task:** `platescreen-research-restaurants` scheduled run (RESTAURANTS / FOOD
COURT / HAWKER / COFFEESHOP / CANTEEN track).

## Phase 1 — selection

Read `CLAUDE.md`, `reference/planning/README.md`, `reference/planning/SCHEMA_HISTORY.md`,
`src/types/db.ts`, `src/types/index.ts`, and `src/lib/researchQueue.ts` in full. Filtered
`RESEARCH_QUEUE` to `status === 'pending'` AND `type` in
`restaurant`/`food_court`/`hawker`/`coffeeshop`/`canteen`, sorted by priority with array
order as tiebreak — same deterministic method every prior run has used.

Re-verified the three top-of-queue `high`-priority `food_court` entries directly against
their own extensively-updated notes (2026-08-22 through 2026-09-13, ~20 prior passes):

- **`kopitiam`** — 3 sub-items remain open (`kopitiam_king_grouper`: brand-chain
  fragmentation needing a restructure pass, out of this task's append-only scope;
  `kopitiam_china_food`: every text-search angle exhausted across 4+ prior passes, only
  Street View/in-person remains, and browser tool access has been denied in every prior
  unattended run that tried it; `kopitiam_cheers`: confirmed non-food convenience-store
  concession, permanently out of scope). No change since 2026-09-13's independent
  re-check. Not actionable this run.
- **`koufu`** — 0 `operatorId: 'koufu'`-tagged brands with zero MenuItems; its 6 standalone
  sub-brands (Cookhouse, Rasapura Masters, Gourmet Paradise, Happy Hawkers, R&B Tea, Nine
  Fresh, Dough Culture, etc.) are already covered. No addressable gap.
- **`foodfare`** — still deprioritized per the 2026-08-23 user instruction (B2B
  institutional-catering scope question unresolved). Not actionable.

Per the same deterministic sweep every recent pass has used (`kopitiam`/`koufu`/`foodfare`
non-actionable → continue down the priority-sorted queue), the next real target is
**`hawkers_street`** (medium priority, food_court, array position 4 among matching entries).
Its notes (most recently updated 2026-09-08) list exactly 2 remaining named-concession leads
at venues already confirmed real via the operator's own site: **The Neighbourwok** and
**Hup Hong Chicken Rice**, plus Square 2's stall list still unknown. Picking the
first-listed per this entry's own established convention: **The Neighbourwok** (Fried
Hokkien Prawn Mee stall, Hawkers' Street @ The Clementi Mall).

Note: the 2026-09-07 update on this entry already flagged that `alvinology.com` and
`greatdeals.com.sg` render this stall's name as **"The Neighbourwok"**, not "The
Neighbourwork" as an earlier pass's notes spelled it — confirmed again this run via
`eatbook.sg`'s dedicated stall profile (title, tags, and Instagram handle
`@theneighbourwok` all agree). Used "The Neighbourwok" throughout below.

## Phase 2 — research (completed)

Sourced this stall's real, venue-specific menu directly from Little Day Out's in-person
stall-by-stall coverage of Hawkers' Street @ The Clementi Mall (the same primary source
already used for this venue's other recent additions — Malalah!, Lixin, Tartini, Hjh
Maimunah, Rong Cheng, Springleaf Prata, Wok Hei Hor Fun):

> "The Fried Hokkien Prawn is available in small ($6.90) and large ($9.90) portions. The
> Fried Hokkien Big Prawn Mee is $13.90." — littledayout.com/hawkers-street-clementi-mall-food-court

Cross-checked against Eatbook.sg's dedicated profile of the brand (covers its Bukit Batok
flagship + Owen Road + Clementi Mall outlets): confirms the dish is the wet/fried-in-broth
style ("yellow noodles and thick bee hoon drenched in a viscous, seafood-based broth...
loads of pork belly, a few prawns, sambal on the side, thick, fluffy pillows of pork lard"),
and explicitly states **"The Neighbourwok is not a halal-certified eatery."** SETHLUI.com's
and Alvinology's Oct/Nov 2025 opening coverage independently corroborate the stall's
presence at this exact venue.

**3 MenuItems identified** (meets the 3-item floor; this is a single-signature-dish
specialist stall, same shape as `wok_hei_hor_fun`/`malalah_clementi_mall` at this same
venue, so a short list is expected, not a sign of incomplete research):

| Name | Price | Basis |
|---|---|---|
| Fried Hokkien Prawn Mee (Small) | $6.90 | Real, venue-specific (Little Day Out) |
| Fried Hokkien Prawn Mee (Large) | $9.90 | Real, venue-specific (Little Day Out) |
| Fried Hokkien Big Prawn Mee | $13.90 | Real, venue-specific (Little Day Out) |

No official nutrition source exists for this stall (as expected for an independent hawker
concession). Macros reasoned by scaling this project's own existing `dish-macro-lookup.py`
DISH_DB calibration for "Fried Hokkien Prawn Mee" (🍜, Noodles, $5.5 baseline → 520 cal /
20g protein / 60g carbs / 20g fat) proportionally against this stall's own real prices,
consistent with the scaling method already used for `kopitiam_beradik_western` and others:

- **Small ($6.90, ×1.25 vs. baseline):** ~650 cal / 25g protein / 75g carbs / 25g fat
- **Large ($9.90, ×1.435 vs. Small):** ~930 cal / 36g protein / 108g carbs / 36g fat
- **Big Prawn Mee ($13.90):** same noodle/broth base as Large plus several extra whole
  prawns (per the dish's own name and description) — reasoned as Large's base + an added
  prawn increment: ~1,050 cal / 58g protein / 112g carbs / 38g fat

All three would carry **confidence: 'estimated'** (no official or HPB source). No
`compatibleWith` tags on any item — "Prawn Mee/Noodles" is on CLAUDE.md §5.1's standing
no_pork skip-list, and this specific stall's own description explicitly confirms pork
belly and pork lard in the dish, ruling out any diet tag.

### Ready-to-insert record content (not yet written — see below)

```ts
// Brand (brands.ts)
{
  id: "the_neighbourwok_clementi_mall",
  name: "The Neighbourwok",
  emoji: "🍜",
  type: "food_court_stall",
  cuisine: "Fried Hokkien Prawn Mee",
  aliases: ["the neighbourwok", "neighbourwok", "the neighbourwork fried hokkien prawn mee"],
  dietTags: [],
  priceRange: "$",
  platforms: ["dine_in", "grab_go"],
  operatorId: "hawkers_street"
}

// Premises (premises.ts) — same Clementi Mall address/coords already on file for this
// venue's other Hawkers' Street concessions (wok_hei_hor_fun_p1, tartini_..._p1, etc.)
{
  id: "the_neighbourwok_clementi_mall_p1",
  brandId: "the_neighbourwok_clementi_mall",
  label: "The Clementi Mall",
  locationType: "food_court",
  locationContext: "The Clementi Mall",
  address: "3155 Commonwealth Ave W, #04-20/21/22, Singapore 129588",
  postal: "129588",
  lat: 1.314966522855597,
  lng: 103.7642704675928,
  sfa: null,
  source: "operator_official_site"
}

// MenuItems (menuItems.ts)
{ id: "tnw_1", brandId: "the_neighbourwok_clementi_mall", name: "Fried Hokkien Prawn Mee (Small)", emoji: "🍜", category: "Noodles", price: 6.90, calories: 650, protein: 25, carbs: 75, fat: 25, compatibleWith: [], confidence: "estimated", isPopular: true },
{ id: "tnw_2", brandId: "the_neighbourwok_clementi_mall", name: "Fried Hokkien Prawn Mee (Large)", emoji: "🍜", category: "Noodles", price: 9.90, calories: 930, protein: 36, carbs: 108, fat: 36, compatibleWith: [], confidence: "estimated" },
{ id: "tnw_3", brandId: "the_neighbourwok_clementi_mall", name: "Fried Hokkien Big Prawn Mee", emoji: "🦐", category: "Noodles", price: 13.90, calories: 1050, protein: 58, carbs: 112, fat: 38, compatibleWith: [], confidence: "estimated" }
```

## Phase 3 — SFA registration

Skipped, same reasoning already applied to this venue's other Hawkers' Street concessions
(Wok Hei Hor Fun, Tartini, Malalah!, Lixin, Hjh Maimunah, Rong Cheng, Springleaf Prata): a
food-court concession inside a mall venue, not an individually SFA-licensed hawker stall —
the licence sits with the venue/operator, not this stall specifically.

## Phase 5 — verification: BLOCKED, no edit made

This session's shell/code-execution tool (`mcp__workspace__bash`) failed on every attempt
with an infrastructure-level mount error, not a project or code problem:

```
bash failed on resume, create, and re-resume. resume: RPC error -1: failed to mount
.../outputs as outputs: source path ... is under Plan9 share "c" which is not mounted;
create: RPC error -1: ensure user: user <session> already exists unexpectedly ...
A Windows update released September 8 prevents Claude's workspace from reaching your
files. We're tracking this issue. Claude Code is unaffected.
```

This is a different root cause than the `/sessions` disk-exhaustion blocker this same task
hit repeatedly between 2026-09-07 and 2026-09-13, but has the identical practical effect:
**no shell is reachable at all**, so the mandatory `npx tsc --noEmit` verification step
(CLAUDE.md §6, this task's Phase 5) cannot be run, and neither can `git`. Retried once;
identical failure both times.

Per this project's own established practice for exactly this situation (see
`2026-09-13-research-restaurants-no-action-disk-exhausted.md`: "an edit that can't be
verified at all is treated the same as one that would fail: not made") — **no edit was
made to `brands.ts`, `premises.ts`, `menuItems.ts`, or `researchQueue.ts` this run.** The
three record blocks above are fully researched, sourced, and ready to insert verbatim by
whoever next has a working shell — no further research should be needed for this
particular stall.

## Not done

- No new Brand/Premises/MenuItem records written (content is fully prepared above).
- No `researchQueue.ts` status or notes change — `hawkers_street`'s entry still correctly
  shows 2 remaining leads (The Neighbourwok, Hup Hong Chicken Rice) since nothing was
  actually committed to the dataset yet; flipping notes to describe unwritten work would
  misrepresent the live data.
- No git commit — no substantive file changed, and `git` itself is unreachable from this
  session for the same shell-mount reason.

## Escalation

This is a *different* infrastructure blocker than the `/sessions` disk-exhaustion issue
logged repeatedly against this task and `platescreen-improve-app` between 2026-09-07 and
2026-09-13 — this one is a Cowork-side workspace-mount failure tied to a Windows update
released 2026-09-08, per the tool's own error text ("We're tracking this issue. Claude Code
is unaffected"). It blocks all file-system-adjacent tool use in this session, not just this
task's verification step. Needs the user's Windows/Cowork environment to recover before any
scheduled task on this machine can write and verify changes again.

## Next steps for whoever picks this up

- **If the shell is reachable again:** insert the three ready-to-use record blocks above
  verbatim (Brand, Premises, 3 MenuItems), flip nothing else, run the standard
  rsync-mirror + `npm install` + `npx tsc --noEmit` + `npm run build` verification (CLAUDE.md
  §6), then update `hawkers_street`'s queue notes to record The Neighbourwok as done and
  Hup Hong Chicken Rice (Tang Plaza) as the 1 remaining lead, plus Square 2's stall list
  still unknown.
- **If still blocked:** re-run this same disk/shell check first (per the 2026-09-13
  report's own "next steps") before assuming either blocker has resolved — they are
  independent failure modes and either could still be active.
