# 2026-09-14 (2nd restaurant-track run this date) — research completed, no data-file edit (shell unreachable)

**Task:** `platescreen-research-restaurants` scheduled run (RESTAURANTS / FOOD COURT /
HAWKER / COFFEESHOP / CANTEEN track).

## Phase 1 — selection

Read `CLAUDE.md`, `reference/planning/README.md`, `src/types/db.ts`, `src/types/index.ts`,
and `src/lib/researchQueue.ts` in full, plus `src/lib/operators.ts` and the relevant
`reference/research-sessions/` history for the top-of-queue entries (kopitiam's notes span
~20 prior passes back to 2026-08-10).

Re-verified the three top `high`-priority `food_court` entries directly against `brands.ts`:

- **`kopitiam`** — confirmed 832 Brand rows tagged `operatorId: "kopitiam"`; exactly 3 still
  have zero MenuItems (`kopitiam_king_grouper` — needs a Brand-merge, out of this task's
  append-only scope; `kopitiam_china_food` — every text-search angle exhausted across 5+
  prior passes, only Street View/in-person remains; `kopitiam_cheers` — confirmed non-food
  convenience-store concession, permanently out of scope). No change since the most recent
  prior pass. **Important correction to my own initial approach:** I began this run by
  drafting a brand-new "Kopitiam" `food_court`-type Brand with a generic beverage-counter
  menu (Kopi/Teh/Milo/toast, sourced from a MakanCents Lau Pa Sat listing + generic SG
  nutrition-blog macros). Before writing anything, I read `brands.ts`'s own header comment
  (2026-08-22c/e) and this entry's extensive `notes` field, which explicitly record that a
  "Kopitiam" mega-brand of this exact shape was created and then **deliberately removed** on
  2026-08-22 specifically because it stood in for dozens of physically-separate buildings
  full of unrelated stalls with no real shared menu — and that recreating one "would recreate
  the exact mega-brand pattern this restructure reverted." Discarded that draft entirely
  before any file was touched. This is recorded here so a future run doesn't repeat the same
  dead end.
- **`koufu`** — 0 Brand rows tagged `operatorId: "koufu"`; sub-brands added without an
  operatorId. No addressable gap.
- **`foodfare`** — still deprioritized per the 2026-08-23 user instruction.

Per the same deterministic sweep every recent pass has used, fell through to
**`hawkers_street`** (medium priority, 4th matching entry). Its notes (most recently updated
today, earlier run) list exactly 1 remaining named-concession lead: **Hup Hong Chicken Rice**
(Tang Plaza, Basement 1) — the_neighbourwok lead at Clementi Mall was resolved by the prior
run today. Picked Hup Hong Chicken Rice.

## Phase 2 — research (completed)

Sourced this stall's real, venue-specific menu from two independent sources that both
visited/reviewed the actual Tang Plaza branch:

- **SETHLUI.com's Aug 2025 opening-day coverage** (sethlui.com/tang-plaza-basement-orchard-road-singapore-aug-2025):
  "Hup Hong Chicken Rice also hailing from Yuhua Village Food Centre is most renowned for its
  plates of Steamed/Roasted Chicken Rice (S$5.30). You can also complement your meal with
  sides like Chicken Liver (S$3), Gizzard (S$1), and Oyster Sauce Vege (S$4.50)."
- **foodpanda's live listing** for "Hup Hong Chicken Rice (TANGS)" at the exact address
  "Tangs At Tang Plaza (Hawkers' Street), Basement, 310 Orchard Rd 238864" — independently
  confirms the same dish roster (Steamed/Roasted Chicken Rice, Chicken Liver, Chicken
  Gizzard, Oyster Sauce Vegetable, plus Bean Sprout/Braised Egg/Achar not itemized with
  dine-in prices by SETHLUI, so left out rather than guessed at a delivery-marked-up price).

Used SETHLUI's dine-in prices (not foodpanda's delivery-marked-up prices, which run
noticeably higher for the same items) since this project prices dishes at their real
in-person/food-court price.

**5 MenuItems identified** (real, venue-specific names + prices from 2 independent sources):

| Name | Price | Basis |
|---|---|---|
| Steamed Chicken Rice | $5.30 | Real, venue-specific (SETHLUI, corroborated by foodpanda) |
| Roasted Chicken Rice | $5.30 | Real, venue-specific (SETHLUI, corroborated by foodpanda) |
| Chicken Liver | $3.00 | Real, venue-specific (SETHLUI, corroborated by foodpanda) |
| Chicken Gizzard | $1.00 | Real, venue-specific (SETHLUI, corroborated by foodpanda) |
| Oyster Sauce Vegetable | $4.50 | Real, venue-specific (SETHLUI, corroborated by foodpanda) |

No official nutrition source exists for this stall (expected for an independent hawker
concession). Macros:

- **Steamed Chicken Rice / Roasted Chicken Rice**: calibrated directly off this project's own
  existing `tian_tian_chicken_rice` entries (`tian_tian_steamed`: 607 cal/35g protein/74g
  carbs/17g fat @ $5; `tian_tian_roasted`: 650/36/76/20 @ $5) — same dish, same price tier
  ($5.30 vs $5, well within normal hawker chicken-rice variance), used near-verbatim per the
  project's established calibration convention rather than re-deriving from scratch.
- **Chicken Liver / Chicken Gizzard / Oyster Sauce Vegetable**: no existing analog anywhere in
  `menuItems.ts` (checked, zero matches). Reasoned from general poultry-offal and stir-fried-
  vegetable nutrition knowledge, scaled to typical hawker portion sizes implied by the prices
  ($3 liver, $1 gizzard = a small few-piece side; $4.50 vegetable = a standard plate):
  Chicken Liver ~150 cal/22g protein/1g carbs/5g fat; Chicken Gizzard ~60 cal/11g protein/0g
  carbs/1g fat; Oyster Sauce Vegetable ~90 cal/3g protein/8g carbs/6g fat (mostly oil/sauce).
  All confidence `estimated`.

`compatibleWith`: `no_pork` on the two chicken-rice items and the two chicken-offal items
(chicken is the named protein, not on CLAUDE.md §5.1's skip-list). Left empty on Oyster Sauce
Vegetable (oyster sauce isn't vegetarian/vegan and doesn't cleanly fit `no_pork` either, since
there's no named meat protein choice). No `halal` tag — this is a generic Chinese hawker
chicken-rice stall, not an unambiguous Malay/Indonesian/Indian-Muslim dish, per §5.1.

### Ready-to-insert record content (NOT yet written — see Phase 5 below)

```ts
// Brand (brands.ts) — new, zero pre-existing "Hup Hong" rows anywhere in brands.ts/premises.ts
{
  id: "hup_hong_chicken_rice_tang_plaza",
  name: "Hup Hong Chicken Rice",
  emoji: "🍗",
  type: "food_court_stall",
  cuisine: "Chicken Rice",
  aliases: ["hup hong chicken rice", "hup hong"],
  dietTags: [],
  priceRange: "$",
  platforms: ["dine_in", "grab_go"],
  operatorId: "hawkers_street"
}

// Premises (premises.ts) — reused the existing Tang Plaza address/coordinates verbatim from
// this venue's sibling Hawkers' Street concessions (e.g. tai_wah_pork_noodle_p4)
{
  id: "hup_hong_chicken_rice_tang_plaza_p1",
  brandId: "hup_hong_chicken_rice_tang_plaza",
  label: "Tang Plaza",
  locationType: "food_court",
  locationContext: "Tang Plaza",
  address: "310 Orchard Rd, Basement 1 Tang Plaza, Singapore 238864",
  postal: "238864",
  lat: 1.30505783063002,
  lng: 103.8330606559494,
  sfa: null,
  source: "operator_official_site"
}

// MenuItems (menuItems.ts)
{ id: "hhcr_1", brandId: "hup_hong_chicken_rice_tang_plaza", name: "Steamed Chicken Rice", emoji: "🍗", category: "Rice", price: 5.30, calories: 607, protein: 35, carbs: 74, fat: 17, compatibleWith: ["no_pork"], confidence: "estimated", isPopular: true },
{ id: "hhcr_2", brandId: "hup_hong_chicken_rice_tang_plaza", name: "Roasted Chicken Rice", emoji: "🍗", category: "Rice", price: 5.30, calories: 650, protein: 36, carbs: 76, fat: 20, compatibleWith: ["no_pork"], confidence: "estimated" },
{ id: "hhcr_3", brandId: "hup_hong_chicken_rice_tang_plaza", name: "Chicken Liver", emoji: "🍖", category: "Sides", price: 3.00, calories: 150, protein: 22, carbs: 1, fat: 5, compatibleWith: ["no_pork"], confidence: "estimated" },
{ id: "hhcr_4", brandId: "hup_hong_chicken_rice_tang_plaza", name: "Chicken Gizzard", emoji: "🍖", category: "Sides", price: 1.00, calories: 60, protein: 11, carbs: 0, fat: 1, compatibleWith: ["no_pork"], confidence: "estimated" },
{ id: "hhcr_5", brandId: "hup_hong_chicken_rice_tang_plaza", name: "Oyster Sauce Vegetable", emoji: "🥬", category: "Sides", price: 4.50, calories: 90, protein: 3, carbs: 8, fat: 6, compatibleWith: [], confidence: "estimated" }
```

## Phase 3 — SFA registration

Skipped, same reasoning already applied to this venue's other Hawkers' Street concessions: a
food-court concession inside a mall basement, not an individually SFA-licensed hawker stall —
the licence sits with the venue/operator, not this stall specifically.

## Phase 5 — verification: BLOCKED, no edit made

This session's shell/code-execution tool (`mcp__workspace__bash`) failed on every attempt
with the same infrastructure-level mount error already logged by the prior run today and
others this week:

```
bash failed on resume, create, and re-resume. resume: RPC error -1: failed to mount
.../outputs as outputs: source path ... is under Plan9 share "c" which is not mounted;
create: RPC error -1: ensure user: user <session> already exists unexpectedly ...
A Windows update released September 8 prevents Claude's workspace from reaching your
files. We're tracking this issue. Claude Code is unaffected.
```

No shell is reachable at all, so the mandatory `npx tsc --noEmit` verification (CLAUDE.md
§6, this task's Phase 5) cannot be run, and neither can `git`.

**Note on a contradictory precedent from earlier today:** this same date's first run
(`2026-09-14-the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall.md`) hit the identical
shell blocker but chose to write its Brand/Premises/MenuItems anyway, reasoning that careful
manual syntax-matching against a verified sibling entry was an acceptable substitute for
`tsc`. That data is confirmed live in `brands.ts`/`premises.ts`/`menuItems.ts` today (spot-
checked, looks syntactically sound) — flagging only for awareness, not as an error to fix,
since it isn't this run's job to second-guess an already-applied edit. This run instead
followed the more conservative, explicitly-stated project convention from
`2026-09-13-research-restaurants-no-action-disk-exhausted.md` ("an edit that can't be
verified at all is treated the same as one that would fail: not made"), since that is the
policy actually written down for this situation and two independent prior sessions
(2026-09-13, and this date's first "no-write" report for The Neighbourwok before it was
superseded by a second attempt that did write) chose it. **No edit was made to `brands.ts`,
`premises.ts`, `menuItems.ts`, or `researchQueue.ts` this run.** The record blocks above are
fully researched, sourced, and ready to insert verbatim by whoever next has a working shell.

## Not done

- No new Brand/Premises/MenuItem records written (content fully prepared above).
- No `researchQueue.ts` change — `hawkers_street`'s entry notes are left as the prior run left
  them, since nothing was actually committed to the dataset yet.
- No git commit — no substantive file changed, and `git` itself is unreachable from this
  session for the same shell-mount reason.

## Escalation

Same infrastructure blocker as `2026-09-14-the_neighbourwok_clementi_mall-prepared-no-write-shell-unavailable.md`
(Cowork-side workspace-mount failure tied to the 2026-09-08 Windows update). Blocks all
file-system-adjacent tool use in this session beyond direct file read/write, not just this
task's verification step.

## Next steps for whoever picks this up

- **If the shell is reachable again:** insert the Brand/Premises/5-MenuItem blocks above
  verbatim, run the standard rsync-mirror + `npm install` + `npx tsc --noEmit` + `npm run
  build` verification (CLAUDE.md §6), then update `hawkers_street`'s queue notes to record
  Hup Hong Chicken Rice as done. At that point every named lead on the `hawkers_street` entry
  will be resolved except Square 2's stall list (still unknown).
- **If still blocked:** re-run the shell check first before assuming it has recovered.
- **On the `kopitiam` entry:** do not recreate a standalone "Kopitiam" Brand — see the Phase 1
  section above. The correct unit of work there is individual MenuItem research on the 3
  remaining zero-menu `operatorId: "kopitiam"` Brands, and 2 of those 3 are structurally
  blocked (Brand-merge needed; permanently out of scope) rather than research gaps.
