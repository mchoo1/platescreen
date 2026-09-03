# 2026-09-03 — Scheduled restaurant-track run: eighteen_chefs

**Task:** `platescreen-research-restaurants` scheduled task (restaurant/food_court/hawker/coffeeshop/canteen track).

## Phase 1 — Target selection

Filtered `RESEARCH_QUEUE` to pending entries of type `restaurant`/`food_court`/`hawker`/
`coffeeshop`/`canteen`, sorted by priority (high → medium → low, list order preserved
within a tier). The top of that list is the same handful of "operator" entries
(`kopitiam`, `koufu`, `foodfare` — high; `hawkers_street`, `food_junction`, and ~40
bare-SFA-licensee/chain-duplicate `hawker` entries — medium) that many consecutive
prior scheduled runs (2026-08-22 through 2026-09-02) have already exhaustively
re-confirmed have no addressable single-outlet Phase 2 gap this task's methodology can
close (browser-navigation denial is a session-level gate for this unattended task, not
a fact that changes day to day; the china_food/king_grouper/concession-identification
blockers are all still open items for a *different* kind of future pass, not menu
research). Rather than re-run that entire audit from scratch one day later, this run
took the prior audits' conclusions as still valid and moved to the next unaudited
low-priority `restaurant` entry in list order.

- `gen_korean_bbq` — already checked 2026-09-02, no credible SG basis found. Not
  re-attempted (no new information would change a same-week negative result).
- `tgi_fridays` — next in order, **not previously attempted**. Researched below;
  turned out to be defunct in Singapore. Closed out (see Phase 2).
- `eighteen_chefs` — next in order after `tgi_fridays` closed out. **This run's actual
  research target.** Real, currently-operating chain, no existing Brand/MenuItem rows
  (confirmed via grep — zero hits for `eighteen_chefs` in `brands.ts` before this run).

## Phase 2 — Research

### tgi_fridays (closed out, not a research target)

WebSearch confirmed Singapore has never sustained a lasting TGI Fridays presence:
3 outlets total across two eras (Penang Road, opened 1992; Orchard Road and East Coast
Road, both opened 2017) all closed within roughly two years of opening each time. A
2022 plan to open 4 more Singapore restaurants did not result in any current outlet.
The Yelp listing for the East Coast Rd address is explicitly marked "CLOSED". TGI
Fridays Inc. (the US parent) separately filed for Chapter 11 bankruptcy on 2 Nov 2024.
No current, credible menu/pricing/nutrition basis exists for a Singapore location — not
resolving via fabrication. Flipped `tgi_fridays` to `status: "researched"` with zero
MenuItems, same terminal-state precedent as `soulgreen`/`ok_convenience`/`ang_foo_lui`,
to stop it repeatedly re-blocking the queue.

### eighteen_chefs (this run's target)

Eighteen Chefs is a real, well-documented, currently-operating homegrown Singapore
Western-food chain (est. 2007 by Chef Benny Se Teo, a social enterprise —
en.wikipedia.org/wiki/Eighteen_Chefs). Confirmed currently operating via foodpanda
listings (Star Vista, The Clementi Mall outlets), its own online ordering site
(online.eighteenchefs.com), and a CapitaLand mall-directory listing (Bugis Junction).

**Menu/prices:** No official brand nutrition PDF and no HPB Nutrition Information
Centre entry exists for this chain. Dish names and SGD prices were cross-verified
across multiple independent third-party menu aggregators that repeat the same figures
for the same named dishes (sgmyfoodie.com, smpfoodies.com, sgpmenus.com, menu-sg.com,
sgrestaurantmenu.org, singmenus.org) — e.g. "Eighteen Beef Burger $15.48" and "Truffle
Cheese Fusilli $15.36" appear identically across independent sources, not a single
unconfirmed listing.

**Halal status:** confirmed via multiple independent sources — a Zabihah listing,
singaporehalaldirectory.com, asiahalaldirectory.com, halalboleh.com, and a Facebook
post from founder Chef Benny Se Teo stating all outlets are halal. Applied `"halal"`
at Brand level and to every MenuItem (matching the existing `mcd`/`kfc`/`swensen_s`
convention); no redundant `no_pork` tag added alongside `halal`.

**Items added (6, all confidence `"estimated"` — no official macro source exists):**

| Item | Price | Cal | Protein | Carbs | Fat | Basis |
|---|---|---|---|---|---|---|
| Eighteen Beef Burger | $15.48 | 650 | 35g | 42g | 38g | Interpolated between `ss_shackburger` (500/24/40/27 @ $12.90) and `ss_double_shackburger` (790/45/41/50 @ $17.90) by price position |
| Truffle Cheese Fusilli | $15.36 | 700 | 18g | 70g | 34g | Cheese/truffle cream pasta, no named protein — reasoned richer than plain aglio olio baseline |
| Shimeji Mushroom & Asparagus Aglio Olio | $12.96 | 650 | 16g | 82g | 24g | Scaled up from `saiz_aglio_olio` (680/17/96/26 @ $6.90) for a larger full-service portion |
| Aglio Olio Mushroom Chicken | $13.80 | 640 | 30g | 68g | 24g | Scaled from `wb_chicken_aglio_olio` (580/28/65/22 @ $6.80) |
| Salted Egg Fries | $6.90 | 420 | 6g | 48g | 22g | Generic rich fried-potato + salted-egg-sauce side, no direct analog in DB |
| Ribeye with 3 Pcs Prawns & 4 Pcs Calamari Rings | $30.96 | 820 | 55g | 30g | 48g | Highest-uncertainty item — no existing steak+seafood analog in DB; reasoned from typical ribeye + battered-seafood composition |

**Deliberately excluded:**
- Salted Egg Snack Platter ($20.28) — ambiguous multi-item "platter" composition, no
  credible single-dish basis without guessing contents.
- Dory Breaded Fish & Chips — dish confirmed to exist (online.eighteenchefs.com,
  eighteenchefs.com/menu) but no price surfaced across any source checked; left out
  per the never-guess-a-price rule.

**Diet tags (`compatibleWith`):** `halal` on all 6 items (see above); `vegetarian`
added to Shimeji Mushroom & Asparagus Aglio Olio and Salted Egg Fries (no meat named
in either dish). Truffle Cheese Fusilli left without `vegetarian` — composition
(possible bacon bits in some truffle-fusilli preparations) is not confirmable from the
name alone, so not guessed, per CLAUDE.md §5.1.

## Phase 3 — SFA registration

Skipped. `eighteen_chefs` is `type: "restaurant"`, not `hawker`/`food_court_stall` —
out of Phase 3's scope per the task's own instructions.

## Phase 4 — Records written

- **Brand** added to `src/lib/brands.ts` (`BRANDS_4` chunk, appended before the closing
  `];`): id `eighteen_chefs`, type `restaurant`, cuisine `Western`, dietTags `["halal"]`,
  priceRange `"$"` (matching `astons`' positioning), platforms `dine_in`/`grab_go`/
  `delivery`.
- **6 MenuItems** added to `src/lib/menuItems.ts` (single array, appended before the
  closing `];`), each `brandId: "eighteen_chefs"`.
- **No Premises added.** This run's Browser pane (`mcp__Claude_Browser`) was tested
  directly — `preview_start` to `sgpmenus.com` returned "navigation ... was denied or
  failed" — the same unattended-session browser gate documented throughout
  `researchQueue.ts` (kopitiam/swensen_s/mccafe entries, among others). Without a
  working browser or OneMap access, no address could be verified/geocoded without
  guessing coordinates, so none was added. Flagged for a future pass with browser
  access, same open item as `swensen_s`.
- `researchQueue.ts`: `tgi_fridays` flipped to `researched` (terminal, zero items,
  defunct-brand rationale documented on the entry). `eighteen_chefs` flipped to
  `researched` (6 MenuItems added, rationale documented on the entry).

## Phase 5 — Verification

**Could not run `tsc --noEmit` or `npm run build`.** This scheduled/unattended
session's shell tool (`mcp__workspace__bash`) returned "Permission to use
mcp__workspace__bash has been denied" on every attempt this run — no shell access was
available at all, so the build-mirror sync + typecheck + build steps CLAUDE.md §6 and
this task's own Phase 5 call for could not be performed. This is a session-permission
gap, not a decision to skip verification.

In its place, the following were checked manually via Read/Grep against the live files:

- **Duplicate ids:** `grep -c 'id: "eighteen_chefs"'` in `brands.ts` → 1. Each of the 6
  new MenuItem ids (`eighteenchefs_beef_burger`, `eighteenchefs_truffle_cheese_fusilli`,
  `eighteenchefs_shimeji_asparagus_aglio_olio`, `eighteenchefs_aglio_olio_mushroom_chicken`,
  `eighteenchefs_salted_egg_fries`, `eighteenchefs_ribeye_prawn_calamari`) → exactly 1
  occurrence each in `menuItems.ts`. No collisions with any pre-existing id.
  `eighteen_chefs` did not exist as a Brand id before this run (confirmed by grep
  before editing).
- **No orphaned brandId:** all 6 new MenuItems reference `brandId: "eighteen_chefs"`,
  which exactly matches the new Brand's `id`.
- **Type/enum validity (checked by hand against `src/types/db.ts` and
  `src/types/index.ts`):** `type: "restaurant"` is a valid `OutletType`; `"halal"` and
  `"vegetarian"` are valid `DietaryFlag` values; `priceRange: "$"` is a valid
  `PriceRange`; `platforms` values (`dine_in`/`grab_go`/`delivery`) are valid
  `Platform` values; `confidence: "estimated"` is valid on every MenuItem.
- **Syntax/bracket balance:** re-read both edited regions after writing (`brands.ts`
  lines 29438-29462, `menuItems.ts` lines 26370-26380) — both files' arrays close
  cleanly with `];` immediately after the new entries, no stray/missing commas or
  braces visible in the appended blocks.
- **File-level diff was not run** (no shell access) — the Edit tool's own
  old_string/new_string match confirms the intended text was inserted at the intended
  location in both files, but a full `diff`-against-mirror step per CLAUDE.md §6 could
  not be completed this run.

**This is a real gap relative to the task's normal verification bar** (no live `tsc`/
`npm run build` confirmation) and should be flagged to a human or a future
shell-enabled run to close: run `npx tsc --noEmit` and `npm run build` in the build
mirror against the current `brands.ts`/`menuItems.ts`/`researchQueue.ts` to confirm
this run's edits compile cleanly.

## Commit

Per task instructions, commit locally with message `Research: add eighteen_chefs` —
**not pushed** (pushing is the user's job, per CLAUDE.md §8). Commit could not be run
this session for the same reason as Phase 5 (no shell/bash access) — flagged below.

## Status / next steps for whoever picks this up next

- `tsc`/`npm run build` verification (Phase 5) and the local `git commit` (Phase 6)
  could not be executed this run due to a shell-permission gap in this scheduled
  session — both should be run manually or by a future run with shell access before
  trusting this batch as fully verified/committed.
- `eighteen_chefs` needs Premises (real outlet addresses) — same open item as
  `swensen_s`, blocked on browser/OneMap access in this unattended session.
- `eighteen_chefs` also has an unpriced menu item (Dory Breaded Fish & Chips) and an
  unresearched sharing platter (Salted Egg Snack Platter) that a future pass with
  better source access could resolve.
- The broader kopitiam/koufu/foodfare/hawkers_street/food_junction backlog is
  unchanged from the 2026-09-02 audit — still blocked on the same browser-navigation
  gate and concession-identification work that is out of this task's Phase 2 scope.
