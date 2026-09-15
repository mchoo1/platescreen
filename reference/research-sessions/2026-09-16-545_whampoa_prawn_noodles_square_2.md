# 2026-09-16 — 545 Whampoa Prawn Noodles (Square 2) + Square 2 stall-list discovery

**Scheduled restaurant-track run.** Track: restaurant / food_court / hawker / coffeeshop / canteen.

## Target selection

Followed Phase 1's deterministic priority order. Re-verified the three top-priority
`food_court` operator entries directly against live `brands.ts`/`menuItems.ts` (not just
prior notes), matching the precedent established across every prior run:

- `kopitiam` (high) — still exactly 3 zero-menu `operatorId: 'kopitiam'` brands
  (`kopitiam_king_grouper` — needs a Brand-merge restructure, out of this task's write
  scope; `kopitiam_china_food` — bare "Cold dishes" scrape signal, needs Street View/
  in-person ID; `kopitiam_cheers` — permanently out of scope). Unchanged since 2026-08-31.
- `koufu` (high) — 0 `operatorId: 'koufu'` brands; standalone sub-brands remain covered.
- `foodfare` (high) — 0 `operatorId: 'foodfare'` brands; still deprioritized (2026-08-23
  user instruction).

No addressable gap in any of the three. Fell through to `hawkers_street` (medium priority,
4th overall). Its last remaining named lead (Hup Hong Chicken Rice) was resolved on
2026-09-15; the only open item left was: **Square 2's stall list is unknown** (its own
queue notes: "eight famed stalls, four Michelin-recognised," no source naming them despite
several prior text-search attempts).

## Research (Phase 2) — Square 2 stall-list discovery

Tried a genuinely fresh search angle (the venue's own opening coverage, not the generic
"Square 2 Hawkers' Street stalls" query that had failed in every prior pass). This
surfaced two independent in-person write-ups of the venue's Sep 2025 opening:

- [Little Day Out](https://www.littledayout.com/novena-square-2-food-court/) — full
  stall-by-stall coverage with photos, confirms **9 stalls** (not 8 as the older "eight
  famed stalls" phrasing suggested — that phrasing pre-dated this venue's actual opening).
- [Eatbook.sg](https://eatbook.sg/hawkers-street-novena-square/) — corroborates the same
  9-stall roster and the "4 Michelin-recognised" claim.

**Square 2's 9 stalls:** Hill Street Hainanese Curry Rice, Hakka Yong Tau Foo, Hup Hong
Chicken Rice, Tai Seng Fish Soup, 545 Whampoa Prawn Noodles, Jiak Song Mee Hoon Kway, King
of Fried Rice, Lixin Teochew Fishball Noodle, Hill Street Coffeeshop. The 4
Michelin-recognised names: Lixin Teochew Fishball Noodle, Tai Seng Fish Soup, Hup Hong
Chicken Rice, 545 Whampoa Prawn Noodles.

### Cross-check against the live database

- **6 already exist as zero-menu Brand rows** from this operator's original 27-stall
  batch, at other venues: `tai_seng_fish_soup`, `king_of_fried_rice_hws`,
  `hill_street_coffee_shop`, `pangs_hakka_ytf` (= "Hakka Yong Tau Foo"),
  `hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`. None currently has a
  Premises row at Square 2 — per CLAUDE.md §4.1's chain model (one Brand, many Premises)
  and the 2026-08-31 `kopitiam_king_grouper` lesson (prefer adding a Premises row to an
  existing Brand over creating a fragmented duplicate), these need a **Square 2 Premises
  row added to their existing brandId**, not a new Brand. Not done this run (out of
  one-outlet-per-run scope) — flagged in the queue entry for a future pass.
- **Hup Hong Chicken Rice** at Square 2 is the same real chain already added as
  `hup_hong_chicken_rice_tang_plaza` on 2026-09-15 (Michelin flagship at Yuhua Village).
  Same Premises-merge situation as above — flagged, not acted on.
- **Lixin Teochew Fishball Noodle** at Square 2 is a Michelin-recognised chain with 4+
  other same-named Brand rows already in this database at other venues, none confirmed
  as common ownership. Per this project's own precedent at
  `lixin_teochew_fishball_noodle_clementi_mall` (CLAUDE.md §4.2: same name at a different
  venue is not automatically the same business without an SFA or other identifier), this
  needs its own fresh venue-specific research — a real remaining lead, not done this run.
- **545 Whampoa Prawn Noodles** — no Brand anywhere in the database (confirmed via
  `grep -n "545"` on `brands.ts`, zero matches). Genuinely new and cleanly researchable
  this run.

## Records added — 545 Whampoa Prawn Noodles

Third-generation prawn-noodle ("hae mee") stall, operating since the 1950s at its original
Whampoa location, now also a concession at Hawkers' Street Square 2 (opened 26 Sep 2025).
Sourced from Little Day Out's and Eatbook.sg's independent Square 2 opening coverage
(both name this stall and its Square 2-specific prices).

**Brand** `545_whampoa_prawn_noodles_square_2` (type `food_court_stall`, cuisine "Prawn
Noodles", `operatorId: 'hawkers_street'`). No `dietTags` — uses pork lard in its stock per
both sources, no halal evidence.

**Premises** `545_whampoa_prawn_noodles_square_2_p1` — Square 2, 10 Sinaran Dr #04-14 to
16, postal **307506** (per littledayout.com and eatbook.sg, both independently). Note:
this corrects a 307606 postal typo carried in `reference/data/food-court-venues.json`'s
older koufu-sourced Square 2 anchor entry — not fixed in that file this run, since it's a
non-build research anchor, out of this run's scope. Coordinates (1.320705, 103.844161)
reused from that same anchor entry (a real SFA/OneMap-geocoded point for the same 10
Sinaran Drive building).

**MenuItems** (3, all `confidence: "estimated"`):

| Item | Price | Cal | Protein | Carbs | Fat | Basis |
|---|---|---|---|---|---|---|
| Prawn Noodles | $6.90 | 500 | 22g | 55g | 18g | Reused verbatim from this DB's existing "Prawn Noodles" calibration (used across ~10 other stalls at $5.50); price is this stall's own, from both sources |
| Pig Tail Prawn Noodle | $8.90 | 680 | 30g | 55g | 34g | Base bowl + a fatty/collagen-rich pig-tail portion, reasoned from generic cut-level nutrition data (no DB analog, no outlet-specific source) |
| Pork Liver Prawn Noodle | $8.50 | 615 | 39g | 57g | 21g | Base bowl + a lean/high-protein pork-liver portion, reasoned the same way |

`compatibleWith` omitted on all three: base "Prawn Mee/Noodles" is on CLAUDE.md §5.1's
`no_pork` skip-list (may contain pork/lard despite not being named for it); the two
variants are explicitly pork-named (pig tail, liver) so also get no `no_pork` tag — neither
is on §5.1's exact categorical-exclusion list, so left simply untagged rather than
force-cleared to an empty array, consistent with today's earlier diet-tag audit's
exact-match reading of that list.

`reference/data/dish-macro-lookup.py` updated with a `Batch 2026-09-16` block: base Prawn
Noodles added under a disambiguated `"(545 Whampoa)"` key (price differs from the generic
entry, same convention as the 2026-09-15 Hup Hong batch); the two pork variants as new keys.

No SFA lookup — `food_court_stall` inside a mall venue, per this queue entry's established
Phase 3 precedent.

## Verification (Phase 5)

`/sessions` was at 100% full (20M free), same ENOSPC condition as every recent session.
Routed the build mirror through `/tmp` instead:

```
rsync -a --delete src/ reference/ /tmp/ps-mirror/{src,reference}/
cp package.json package-lock.json tsconfig.json next.config.js tailwind.config.ts \
   postcss.config.js next-env.d.ts /tmp/ps-mirror/
cd /tmp/ps-mirror && npm_config_cache=/tmp/npm-cache npm install --cache /tmp/npm-cache
./node_modules/.bin/tsc --noEmit        # exit 0, silent
```

`/` had only ~526M free after `npm install` (tighter than the 2026-09-15/16 reports found,
which had 1.1-3.4G) — not enough headroom to also `npm run build`'s static export or even
`npx tsx` (ENOSPC installing the extra `tsx` package). Instead compiled just the 3 data
files to plain JS with the already-installed `tsc` (`--outDir`, no new packages) and ran a
Node integrity check against the compiled output:

- 1,727 brands / 4,663 premises / 2,668 menu items.
- 0 duplicate ids (brands/premises/menuItems), 0 orphaned `brandId` references (premises,
  menuItems).
- Target brand confirmed present with exactly 1 Premises and 3 MenuItems, values matching
  what was written.

`diff`'d `brands.ts`, `premises.ts`, `menuItems.ts`, and `dish-macro-lookup.py` between the
live repo and the `/tmp` mirror — byte-identical on all four. Deleted the mirror,
`node_modules`, and npm cache afterward (scratch-only, not part of the repo). Did **not**
run `npm run build` this session — `tsc --noEmit` clean plus the integrity check are the
verification gate given the tighter disk headroom this run (per the 2026-09-16
disk-workaround note's own guidance that `tsc --noEmit` is the real gate, not the full
static export).

## Status / next steps

`hawkers_street`'s queue entry note updated with this run's findings. Remaining work on
this entry:

1. Add a Square 2 Premises row to each of the 7 existing chain brands identified above
   (`tai_seng_fish_soup`, `king_of_fried_rice_hws`, `hill_street_coffee_shop`,
   `pangs_hakka_ytf`, `hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`,
   `hup_hong_chicken_rice_tang_plaza`) rather than re-researching them as new brands.
2. Research Lixin Teochew Fishball Noodle's Square 2 concession as its own fresh
   venue-specific Brand (same pattern as its Clementi Mall counterpart).
3. The pre-existing `kopitiam_china_food` / `kopitiam_king_grouper` items noted in the
   `kopitiam` entry remain unresolved, unchanged by this run.

Files touched: `src/lib/brands.ts`, `src/lib/premises.ts`, `src/lib/menuItems.ts`,
`reference/data/dish-macro-lookup.py`, `src/lib/researchQueue.ts` (this entry's notes),
this report.

## Commit (Phase 6)

`.git/index.lock` was again present at session start (stale, dated 02:37 today) and could
not be `rm`'d directly (`Operation not permitted`, same chronic symptom documented in the
2026-09-15 report and many `.git/index.lock.bak-*`/`.stale-*` files going back to August).
Unlike those prior sessions, **`mv .git/index.lock .git/index.lock.bak-20260916b` succeeded
this time** (even though `rm`, `chmod`+`rm`, and Python `os.remove` on the same file all
still failed) — worth flagging for future sessions hitting this same wall: try `mv`-ing the
lock aside before giving up on committing. After clearing it, `git add` succeeded, and
`git commit` completed successfully despite printing several
`warning: unable to unlink '.git/objects/.../tmp_obj_*'` and one
`unable to unlink '.git/HEAD.lock'` messages (the same underlying OneDrive-mount unlink
restriction, but non-fatal this time) — commit `e2bc865` landed with the expected 5 files
changed. Did not push (per standing rule — commits are local only; the user runs
`git push` themselves).
