# 2026-09-05 — Restaurant-track scheduled run: wok_hei_hor_fun

**Track:** restaurant/food_court/hawker/coffeeshop/canteen (scheduled task
`platescreen-research-restaurants`).

## Selection (Phase 1)

Filtered `RESEARCH_QUEUE` to `status: 'pending'` entries of type
`restaurant`/`food_court`/`hawker`/`coffeeshop`/`canteen` — 72 matching
entries. Sorted by priority (high → medium → low), array order preserved
within a tier. Top 3 (`kopitiam`, `koufu`, `foodfare`, all `high` priority)
were re-checked first, per the deterministic first-entry rule:

- **kopitiam** — its own notes (extensively updated across ~15 prior passes)
  show exactly 3 unresolved sub-brands remain: `kopitiam_cheers` (confirmed
  non-food convenience-store concession, never gets a MenuItem),
  `kopitiam_china_food` (bare "Cold dishes" scrape signal only — this run
  tried one more fresh angle, a targeted WebSearch for "China Food" + the
  venue's exact unit number, and got the same result as every prior attempt:
  real named dishes at that Kopitiam belong to other, separately-named
  stalls, none attributable to "China Food"), and `kopitiam_king_grouper`
  (needs a Brand-merge/restructure, out of this task's write scope — flagged
  for a dedicated cleanup pass, not macro research). In-app browser
  navigation to foodadvisor.com.sg was attempted for a possible visual/
  listing lead and denied at the tool level (unattended scheduled-session
  gate — consistent with every prior run's finding). No addressable gap this
  run.
- **koufu** — re-verified against the live `brands.ts`/`menuItems.ts`
  directly (not just notes): of its 11 `koufu_*` brands, 5 are food-court
  "container" brands per CLAUDE.md §4.3 (`koufu_fork_spoon`,
  `koufu_1983_taste_of_nanyang`, `koufu_cookhouse`, `koufu_rasapura_masters`,
  `koufu_gourmet_paradise`) that must never get a MenuItem, and the other 6
  (`koufu_happy_hawkers`, `koufu_grove`, `koufu_1983_coffee_toast`,
  `koufu_rb_tea`, `koufu_nine_fresh`, `koufu_dough_culture`) already have
  MenuItems (1–8 each). No addressable gap this run.
- **foodfare** — deprioritized per standing 2026-08-23 user instruction
  (B2B-catering scope question, unresolved). Skipped.

Swept further down the priority-sorted list to **hawkers_street** (`medium`
priority, 4th overall). Its own notes: 27 of its Brand rows already have
MenuItems (re-verified directly against `brands.ts`/`menuItems.ts` — all 27
have ≥1 item); its only remaining work is identifying named concessions at 4
newer venues (Square 2, The Clementi Mall, Tang Plaza, EastPoint Mall) that
a 2026-08-22 pass found image-filename hints for but declined to add without
text confirmation.

## Research (Phase 2)

WebSearched for text-based (not filename-inference) confirmation of
Hawkers' Street's newer-venue stall rosters. Found **Little Day Out**'s
in-person writeup of The Clementi Mall venue (opened 28 Oct 2025,
16 stalls, [littledayout.com/hawkers-street-clementi-mall-food-court](https://www.littledayout.com/hawkers-street-clementi-mall-food-court/)),
which names and prices every stall. Cross-referenced against the existing
27 `hawkers_street` Brand rows:

- 9 of the 16 were already in the database (Chef Wei HK Cheong Fun, Tiong
  Bahru Hainanese [Boneless] Chicken Rice, Jiak Song Mee Hoon Kway [Fish
  Soup], Jason Penang Cuisine, Koung's Wan Tan Mee, Pang's Hakka Yong Tau
  Foo, Beach Road Scissor-Cut Curry Rice, Hill Street Coffee Shop, Old
  Teochew [Satay Bee Hoon & Mee Siam]) — confirms this venue draws heavily
  from the same roster as Tampines 1, not an all-new set.
- 7 were genuinely new names: Hjh Maimunah, Tartini Grill & Pasta, Rong
  Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The
  Neighbourwork Fried Hokkien Prawn Mee, and **Wok Hei Hor Fun**.

Also found a HungryGoWhere/Time Out pair confirming Hawkers' Street's Tang
Plaza venue's 6 Michelin-recognised stalls (Fei Fei Roasted Noodle, Hup Hong
Chicken Rice, Loong Kee Yong Tau Fu, Springleaf Prata Place, Tai Seng Fish
Soup, Tai Wah Pork Noodle) — 4 already exist; Hup Hong Chicken Rice and
Springleaf Prata Place are new leads, not researched this run (one-outlet-
per-run rule).

Picked **Wok Hei Hor Fun** as this run's outlet — of the 7 new Clementi Mall
names, this was the only one directly corroborating a specific 2026-08-22
image-filename guess ("Wok Hei Hor Fun" was one of the names inferred from a
storefront-logo filename that pass declined to trust without text
confirmation), and it had the richest, best-verified sourcing: confirmed as
a genuine Michelin Bib Gourmand (2026) stall via three independent sources
(SETHLUI.com, DanielFoodDiary.com, Little Day Out), with a real flagship
address (Redhill Food Centre, 85 Redhill Lane #01-94, Singapore 150085) and
real, priced dishes at both its flagship and the Clementi Mall branch.

**Menu (6 items, all confidence "estimated" — no official nutrition source
exists for this hawker stall):**

| Dish | Price | Source |
|---|---|---|
| Assorted Hor Fun | $6.90 | Little Day Out (Clementi Mall branch) |
| Sliced Fish Hor Fun | $7.90 | Little Day Out |
| Assorted Bee Hoon | $6.90 | Little Day Out |
| Ginger Onion Pork Rice | $6.90 | Little Day Out |
| Lala Assorted White Bee Hoon | $7.90 | Little Day Out |
| Fried Prawn Paste Chicken (6 pc) | $9.00 | Little Day Out |

Prices are the Clementi Mall branch's own (per the Premises row added this
run), not the flagship Redhill prices (which run $6–$8 for largely the same
dishes per SETHLUI.com — a mall-food-court markup over the original hawker-
centre stall, consistent with this project's existing branch-price handling
elsewhere).

Macros have no official basis and were calibrated against this project's own
existing analogs already in `menuItems.ts`:

- **Assorted Hor Fun / Sliced Fish Hor Fun** — against
  `alexandra_village_food_centre_hor_fun_premium`'s Beef Hor Fun (540/24/58/20)
  and `margaret_drive_hawker_centre_xins_tzechar`'s Seafood Hor Fun
  (520/26/60/18), scaled for the stall's Michelin-tier "hugeee" portion size
  (per SETHLUI.com's review) and the assorted/fish protein split.
- **Assorted Bee Hoon** — same Hor Fun family, fried (not white/soup) style,
  ambiguous/mixed protein.
- **Ginger Onion Pork Rice** — against the existing BBQ Pork Rice entries
  (550/26/60/22).
- **Lala Assorted White Bee Hoon** — near-direct analog to the existing
  Seafood White Bee Hoon entries (480/28/50/16), used as-is: SETHLUI.com's
  own review of this exact dish describes pork slices, sliced fish, prawns
  and lala/clams, matching that entry's composition closely.
- **Fried Prawn Paste Chicken** — against the existing Prawn Paste Chicken
  (Sin Ho, 480/26/20/28) and Har Cheong Gai (480/24/20/32) entries, scaled
  up slightly for the 6-piece full-dish portion (vs. those being smaller
  sides).

Full price/macro/emoji/category tuples were added to
`reference/data/dish-macro-lookup.py`'s `DISH_DB` under a new
`# --- Batch 2026-09-05 additions (wok_hei_hor_fun ...) ---` header.

### Diet tags (CLAUDE.md §5.1)

- Hor Fun is on the standing never-tag-`no_pork` skip-list (confirmed live
  by SETHLUI.com's own review: the stall offers pork lard with its hor fun)
  — both Hor Fun items left with `compatibleWith: []`.
- Assorted Bee Hoon has an unnamed/ambiguous protein mix — left `[]` rather
  than guessed.
- Ginger Onion Pork Rice is named for pork but isn't one of the exact dish
  names on CLAUDE.md's categorical-exclusion list (Bak Kut Teh, Pork
  Congee, etc.) — followed the same convention as this file's existing BBQ
  Pork Rice entries (`compatibleWith: []`, key present, not omitted).
- Lala Assorted White Bee Hoon explicitly contains pork per its own
  description (unlike the seafood-only "Seafood White Bee Hoon" precedent it
  was calibrated against) — left `[]`, not tagged `no_pork`/`pescatarian`.
- Fried Prawn Paste Chicken is named for chicken only — tagged `["no_pork"]`.
  No `halal` claim (Chinese hawker stall, no certification evidence).

## SFA registration (Phase 3)

Skipped. This Brand's type is `food_court_stall` with `operatorId:
"hawkers_street"` — a mall-food-court concession, not an independently
SFA-licensed hawker-centre stall. Every existing analog `hawkers_street`
Premises row in this database (`tai_wah_pork_noodle`, `jason_penang_cuisine`,
`old_teochew_satay_beehoon`, etc.) already carries `sfa: null` for the same
reason (the mall/food-court operator holds one master licence covering the
whole unit, not per-concession licences discoverable via data.gov.sg's
per-stall dataset). Followed the same convention.

The stall's real, independent hawker-centre flagship (Redhill Food Centre
#01-94, 85 Redhill Lane, Singapore 150085 — confirmed via SETHLUI.com/
DanielFoodDiary.com) *would* be SFA-matchable, but was deliberately **not**
added as a second Premises row this run — this run's scope was specifically
the Hawkers' Street newer-venue research task, and the existing
`old_teochew_satay_beehoon` precedent in this same queue entry only
documents its Hawkers'-Street-sourced Premises, not its other independently-
known locations. Flagged as a good candidate for a future run (add
Redhill Food Centre as `wok_hei_hor_fun_p2`, with a real SFA lookup since
that address is a genuine NEA hawker centre).

## Records written (Phase 4)

- **Brand** (`brands.ts`, `BRANDS_4`): `wok_hei_hor_fun` — type
  `food_court_stall`, cuisine "Hor Fun", `operatorId: "hawkers_street"`,
  priceRange `$`, platforms `["dine_in", "grab_go"]`.
- **Premises** (`premises.ts`, `PREMISES_13`): `wok_hei_hor_fun_p1` — The
  Clementi Mall, address/postal/lat/lng copied from this project's existing
  `hawkers_street` Clementi Mall Premises rows (same venue), `sfa: null`.
- **MenuItems** (`menuItems.ts`): `whf_1`–`whf_6`, 6 items, all
  `confidence: "estimated"`.
- **`reference/data/dish-macro-lookup.py`**: new `DISH_DB` batch for these 6
  dish names.
- **`researchQueue.ts`**: appended a dated UPDATE to the `hawkers_street`
  entry's notes documenting this run's findings (including the 8 remaining
  unresearched leads — 6 at Clementi Mall, 2 at Tang Plaza, plus Square 2's
  unknown roster). Status left `pending` (more newer-venue concessions
  remain unidentified).

## Verify (Phase 5)

This sandbox's shared `/sessions` filesystem was at 100% capacity (other
concurrent sessions' data, not this project) and could not fit a full
`npm install` for the documented `~/build/platescreen` mirror + `next
build` pipeline (repeated `ENOSPC` even after clearing this session's own
cache). Adapted the verification within that constraint:

1. Found a pre-existing global TypeScript install on the sandbox's root
   filesystem (`/usr/local/lib/node_modules_global`, unrelated to the full
   `node_modules`) and ran `tsc --noEmit` directly against the 4 edited
   files (`brands.ts`, `premises.ts`, `menuItems.ts`, `researchQueue.ts`)
   plus their type dependencies (`types/db.ts`, `types/index.ts`), using the
   project's own `tsconfig.json` compiler options — **silent, 0 errors**.
2. Loaded the live `BRANDS`/`MENU_ITEMS`/`PREMISES` arrays in Node and
   verified: 0 duplicate ids across all three arrays; 0 orphaned
   `brandId` references (every MenuItem and Premises row resolves to a real
   Brand); the new Brand has exactly 1 Premises and 6 MenuItems as intended;
   item count deltas match (brands 1717→1718, menu 2601→2607, premises
   4653→4654).

This does not substitute for the full `next build` static-export check the
methodology calls for, since the disk-space constraint made that
impossible this run — flagging this as a known gap for whoever next has
sandbox capacity to re-verify with a full build.

## Status

`wok_hei_hor_fun` is new and fully populated (Brand + 1 Premises + 6
MenuItems, all "estimated" confidence, no fabrication — every dish name and
price traces to a real, cited source). `hawkers_street` queue entry left
`pending` with 8 further leads recorded for a future run.
