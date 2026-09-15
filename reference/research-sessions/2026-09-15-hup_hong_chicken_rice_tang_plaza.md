# 2026-09-15 — Hup Hong Chicken Rice (Tang Plaza)

**Scheduled restaurant-track run.** Track: restaurant / food_court / hawker / coffeeshop / canteen.

## Target selection

Followed Phase 1's deterministic priority order. Re-verified the three top-priority
`food_court` operator entries directly against live `brands.ts`/`menuItems.ts` (not just
prior notes) before picking anything else, matching the precedent established across every
prior run this week:

- `kopitiam` (high) — still exactly 3 zero-menu `operatorId: 'kopitiam'` brands
  (`kopitiam_king_grouper` — needs a Brand-merge restructure, out of this task's write
  scope; `kopitiam_china_food` — bare "Cold dishes" scrape signal, needs Street View/
  in-person ID; `kopitiam_cheers` — permanently out of scope, non-food concession).
  Unchanged since 2026-08-31. No addressable gap.
- `koufu` (high) — 0 `operatorId: 'koufu'` brands; its 6+ standalone sub-brand chains are
  separately covered. No operator-container backlog exists. No addressable gap.
- `foodfare` (high) — 0 `operatorId: 'foodfare'` brands; remains deprioritized per the
  2026-08-23 user instruction (B2B institutional-catering scope finding). No addressable gap.

Fell through to `hawkers_street` (medium priority, 4th overall). Its own queue notes tracked
exactly 1 remaining named-but-unresearched lead as of the 2026-09-14 run: **Hup Hong Chicken
Rice (Tang Plaza)**. Confirmed via `grep` that no Brand/Premises/MenuItem for "Hup Hong"
existed anywhere in the database yet — a genuinely new Brand.

## Research (Phase 2)

Hup Hong Chicken Rice is a Michelin Guide-listed Hainanese chicken rice stall, flagship at
Yuhua Village Market & Food Centre (Blk 254 Jurong East #01-51). Confirmed operating a
concession inside Hawkers' Street's Tang Plaza venue (TANGS, 310 Orchard Rd, Basement 1) via:

- [HungryGoWhere](https://hungrygowhere.com/food-news/hawkers-street-tang-plaza/) — lists
  Hup Hong Chicken Rice among the venue's 6 Michelin-recognised names.
- [The Ordinary Patrons](https://ordinarypatrons.com/2025/08/28/hawkers-street-tang-plaza-stalls-menus-and-prices/) —
  in-person stall-by-stall coverage of the Tang Plaza venue, includes Hup Hong Chicken Rice
  with photos of its menu board.
- [TANGS' own store directory](https://tangs.com/store/tang-plaza/store-hup-hong-chicken-rice) —
  confirms the concession at this exact address.
- [foodpanda](https://www.foodpanda.sg/restaurant/shzv/hup-hong-chicken-rice-tangs) — the
  branch's own delivery listing, address "Tangs At Tang Plaza (Hawkers' Street), Basement, 310
  Orchard Rd 238864" — an exact match to this Premises row (already established by
  `springleaf_prata_place`'s Premises row, reused here).
- [the.fat.guide](https://the.fat.guide/singapore/eat/hup-hong-chicken-rice/) and
  [DanielFoodDiary](https://danielfooddiary.com/2023/08/17/huphongchickenrice/) — corroborate
  the flagship (Yuhua) identity and general dish shape (steamed/roasted chicken rice,
  wing/drumstick options, handmade achar).

## Records added

**Brand** `hup_hong_chicken_rice_tang_plaza` (type `food_court_stall`, cuisine "Chicken
Rice", `operatorId: 'hawkers_street'`). No `dietTags` — no halal certification found for this
stall.

**Premises** `hup_hong_chicken_rice_tang_plaza_p1` — Tang Plaza, reusing the exact
address/coordinates already established by `springleaf_prata_place_p1` (same venue, same
building). No SFA lookup performed — `food_court_stall` inside a mall venue, per this
queue entry's own established Phase 3 precedent (SFA licensing doesn't apply the same way to
a food-court concession as a hawker-centre stall).

**MenuItems** (6, all `confidence: "estimated"`), real dish names and this branch's own SGD
prices sourced directly from the foodpanda Tang-Plaza-specific listing:

| Item | Price | Cal | Protein | Carbs | Fat | Basis |
|---|---|---|---|---|---|---|
| Steamed Chicken Rice | $7.20 | 607 | 35g | 74g | 17g | Calibrated off this DB's existing `tian_tian_chicken_rice`/`lau_pa_sat_chicken_rice` steamed calibration (607/35/74/17) |
| Roasted Chicken Rice | $7.20 | 650 | 36g | 76g | 20g | Same calibration, roasted (650/36/76/20) |
| Duo Chicken Rice | $8.60 | 628 | 35g | 75g | 18g | Averaged between steamed/roasted (same plate size, split between two styles, not a double portion) |
| Chicken Wing Rice (2pc) | $8.00 | 580 | 30g | 66g | 22g | Reasoned down from base rice values — bone-in wing has a smaller/fattier meat yield than sliced breast |
| Chicken Drumstick Rice | $8.60 | 620 | 34g | 68g | 20g | Reasoned down from base rice values — bone-in drumstick, similar logic |
| Braised Egg | $1.70 | 78 | 6g | 1g | 5g | Standard single soy-braised hawker egg (≈1 large egg), generic well-established value, not outlet-specific |

All `compatibleWith: ["no_pork"]` on chicken items per CLAUDE.md §5.1 (named chicken protein,
not on the skip-list); Braised Egg also tagged `vegetarian` per this DB's existing convention
for egg-based sides. No `halal` tag — no certification evidence found.

**Deliberately skipped** (no credible macro basis / no DB analog found, left out per the
never-fabricate rule rather than guessed): Chicken Liver, Chicken Gizzard, Oyster Sauce
Vegetable, Bean Sprout, Achar, and the plain à-la-carte "Chicken Rice" (rice-only) line item
from the foodpanda menu.

`reference/data/dish-macro-lookup.py`'s `DISH_DB` updated with a `Batch 2026-09-15` block.
The two chicken-rice items were added under disambiguated `"... (Hup Hong)"` keys rather than
overwriting the pre-existing generic `"Steamed/Roasted Chicken Rice"` entries (which predate
this DB's tian_tian-based calibration and are still used elsewhere).

## Verification (Phase 5)

The repo's own `/sessions` filesystem was at 100% (23M free) — same ENOSPC condition flagged
in the 2026-09-03 session report, not caused by this run. Routed the build mirror through
`/tmp` (a separate filesystem with 3.4G free) instead of `~/build`:

```
rsync -a --delete src/ reference/ /tmp/build/platescreen/{src,reference}/
cp package.json package-lock.json tsconfig.json next.config.js tailwind.config.ts postcss.config.js next-env.d.ts /tmp/build/platescreen/
cd /tmp/build/platescreen && npm install --cache /tmp/npm-cache
./node_modules/.bin/tsc --noEmit        # silent, no errors
./node_modules/.bin/next build          # ✓ Compiled successfully, 4388 static pages generated
```

Additional checks (all passed): 0 duplicate ids across brands/premises/menuItems, 0 orphaned
premises/menuItems (every `brandId` resolves to a real Brand), target brand has exactly 1
Premises and 6 MenuItems. `diff`'d `brands.ts`, `premises.ts`, `menuItems.ts`, and
`dish-macro-lookup.py` between the live repo and the `/tmp` mirror — byte-identical on all
four. Deleted the temporary verify script and the `/tmp/build` mirror is scratch-only (not
part of the repo).

## Status / next steps

`hawkers_street`'s queue entry note updated: its last previously-known lead (Hup Hong Chicken
Rice) is now resolved. **Square 2's stall list is still unknown** — no source naming its
"eight famed stalls, four Michelin-recognised" has been found across any prior pass. That is
the only remaining named gap on this queue entry; a future run should attempt a fresh search
angle for Square 2 specifically (its own mall directory, or an in-person/Street-View
identification pass, since text search for "Square 2 Hawkers' Street stalls" has not
surfaced a stall-by-stall source in prior attempts).

Files touched: `src/lib/brands.ts`, `src/lib/premises.ts`, `src/lib/menuItems.ts`,
`reference/data/dish-macro-lookup.py`, `src/lib/researchQueue.ts` (this entry's notes),
this report.

## Commit (Phase 6) — blocked, not this run's fault

`git add`/`git commit` failed: `.git/index.lock` (dated 2026-09-13 06:13, i.e. stale by
~2 days) cannot be removed — `rm`, `chmod`, Python `os.remove`, and `mv` all return
`Operation not permitted` even though the file is owned by this session's own user with
`0700` permissions and no process holds it open (`lsof` found nothing, no `git` process in
`ps aux`). `lsattr` isn't supported on this mount, consistent with the underlying OneDrive-
synced folder's filesystem doing something nonstandard with this specific file rather than a
live lock contention. The `.git/` directory already contains dozens of timestamped
`index.lock.bak-*` / `index.lock.stale-*` / `index.lock.tryrename-*` files going back to
August, evidence that many prior sessions hit this exact same unremovable-lock condition and
tried (and exhausted) every reasonable workaround already. Not re-litigated further here —
all code changes above are correctly written to disk and independently verified via the
`/tmp` build mirror (tsc/build/diff all clean), just not committed. A future session with a
different execution environment (or the user running `git status`/`git commit` locally,
where the OS-level restriction may not apply) should be able to commit this working tree
as-is; nothing here needs to be redone.
