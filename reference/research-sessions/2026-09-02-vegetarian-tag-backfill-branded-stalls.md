# 2026-09-02 — Vegetarian tag backfill: explicitly "Vegetarian"-branded stalls

## Why

Two prior sessions flagged this as an unresolved human decision rather than
acting on it: the 2026-09-01 diet-tag coverage audit scoped a "genuinely
ambiguous" bucket that included `Indian`/`Local Hawker` items it deliberately
left untagged, and the 2026-09-01 halal audit (`2026-09-01-halal-tag-audit-
malay-indonesian-indian.md`) explicitly excluded 3 "Vegetarian"-branded
Indian items from `halal` tagging and flagged, in its "Not done" section:
"whether the 3 'Vegetarian'-branded Indian items should instead get a
`vegetarian` tag ... a different, separate claim from `halal` that this pass
didn't attempt since it was scoped to halal only." This session picks that up
and extends it dataset-wide (not just the 3 from the Indian/Malay bucket the
halal audit happened to review).

This fits CLAUDE.md 5.1's `vegetarian` rule ("only for unambiguous zero-meat
items") via a stronger signal than dish-name inference: a stall whose own
**brand name** self-identifies as "Vegetarian" (a Singapore hawker/food-court
convention, typically Buddhist "zhai" or Hindu-vegetarian-run stalls selling
exclusively meat-free food under that explicit label) is a more reliable
unambiguous-zero-meat signal than inferring from a single dish's name alone.

## Method

1. Loaded `BRANDS` + `MENU_ITEMS` in the build mirror, joined by `brandId`,
   and filtered every `MenuItem` where `brand.name` or the dish's own `name`
   contains "vegetarian" (case-insensitive) — 26 items dataset-wide.
2. Of those, 15 did not yet carry a `vegetarian` tag in `compatibleWith`
   (the other 11 already had it from earlier batches).
3. **Manually reviewed all 15 candidates individually** (not a blind
   keyword-apply) — checked each item's brand name, brand `cuisine` field,
   brand `dietTags`, dish name, and price/calorie values for internal
   consistency before tagging. All 15 brands unambiguously self-identify as
   vegetarian: `Su Yuan Vegetarian`, `Zai Vegetarian Food`, `Indian & Chinese
   Vegetarian`, `Delhi Kitchen Indian Vegetarian Cuisine`, `Tong Xin
   Vegetarian` (brand already carried `dietTags: ["vegetarian"]`), `Shu Shi
   Piao Xiang Vegetarian` (brand `cuisine: "Vegetarian Food"`), `Just Greens
   vegetarian`, `Indian Vegetarian (Northpoint City)`, `Su Man Yuan
   Vegetarian`, `Indian Vegetarian Green Leaf Cuisine`, `Guang Yuan
   Vegetarian`. No dish name named a meat/fish protein; several dish names
   are themselves explicit ("Vegetarian Biryani", "Vegetarian Rice",
   "Vegetarian"). One item's name ("2 Veg Meat + 1 Veg") uses "Veg Meat" —
   confirmed this refers to mock/mock-meat (common at vegetarian Chinese
   stalls), consistent with the brand's own all-vegetarian identity, not a
   real meat item.
4. Deliberately **did not** add `vegan` — several of these are Indian
   vegetarian kitchens where ghee/dairy/paneer is common and not excludable
   from a brand-name signal alone, so `vegan` would be an unverified claim.
   Also added `no_pork` alongside `vegetarian` for all 15, consistent with
   the existing pattern already used throughout the file (vegetarian
   trivially implies no_pork) — matches how e.g. `svmfc2_1` ("Nyonya Kueh")
   already carries `["no_pork","vegetarian"]`.
5. Applied via a Python splice script following the brace-depth
   object-boundary approach from the diet-tag/halal audits (scans backward
   from each `id:` match to the object's opening `{`, forward to its own
   matching `}`, and rewrites `compatibleWith` only within that exact
   object span) — not naive text search-and-replace, to avoid the class of
   bug documented in the 2026-09-01 diet-tag audit (an earlier fixed-window
   search that could spill into a neighboring item).

## Result

| | Count |
|---|---|
| Items with "vegetarian" in brand or dish name | 26 |
| Already tagged `vegetarian` (untouched) | 11 |
| Backfill candidates found | 15 |
| Manually reviewed and applied | 15 |
| Excluded after review | 0 |

All 15 tagged `['no_pork', 'vegetarian']`:

`su_yuan_vegetarian_suyuan_set_2_veg_meat_1_veg`,
`su_yuan_vegetarian_veg_mixed_rice`, `zai_vegetarian_food_cai_fan`,
`zai_vegetarian_food_econ_rice`, `lps_indian_and_chinese_vegetar_olive_
fried_rice`, `lps_indian_and_chinese_vegetar_vegetarian_biryani`,
`lps_delhi_kitchen_indian_veget_shreebhaavan_special_meals`,
`lps_delhi_kitchen_indian_veget_vegetarian_biryani`,
`bc_tong_xin_vegetarian_veg_mixed_rice`, `cy_shu_shi_piao_xiang_vegetar_
veg_mixed_rice`, `tph_just_greens_vegetarian_vegetarian_rice`,
`np_indian_vegetarian_northpoi_nasi_briyani`, `ks_su_man_yuan_vegetarian_
olive_fried_rice`, `ks_indian_vegetarian_green_le_north_indian_veg_set`,
`ks_guang_yuan_vegetarian_vegetarian`.

The splice script's own reconciliation: 15 candidates = 15 replaced + 0
already-tagged + 0 missing (fully accounted for, matching the pattern the
2026-09-01 diet-tag audit established as the trust bar before treating
output as correct).

Diet-tag coverage: 63.9% → est. 64.5% (1,634 → 1,649 of 2,559 MenuItems with
≥1 tag) — **not confirmed by the runtime script this run, see Verification
below**; this is computed by hand from the known prior baseline (63.9%,
1,634/2,559 per ROADMAP.md) plus these 15 newly-tagged items, since none of
the 15 previously carried any tag.

## Verification — INCOMPLETE this run, flagged prominently

Every prior batch in this project's history ran a mandatory `tsc --noEmit` +
runtime integrity check (0 dup ids, 0 orphaned `brandId`s, exact candidate
reconciliation) before treating a change as done. **That could not happen
this run**: partway through the mirror sync/install step, the sandbox shell
became completely unresponsive — not the previously-documented "`npm run
build` hits a resource ceiling but `tsc` still runs" pattern seen in the
2026-08-31/09-01 sessions, but a full failure of the shell tool itself (7
consecutive timeouts, including on a bare `echo`), which made `tsc`, the
runtime integrity script, and `git commit` all unreachable this run.

What **was** done instead, using tools that don't depend on the shell:

- Read the live `menuItems.ts` directly (via grep/read, not the shell) and
  visually confirmed, for **all 15** edited entries, that: the object
  boundary is intact (`{` ... `id: "..."` ... `compatibleWith: ['no_pork',
  'vegetarian']` ... `}` immediately followed by a comma and the next
  object's own `{`), no neighboring object's fields were altered, and the
  array syntax is valid. Full grep output cross-checked against the splice
  script's own reconciliation log — the ids, brand names, and dish names
  matched exactly what was intended.
- This is a narrower guarantee than a compiler run (it doesn't catch, e.g., a
  stray syntax error thousands of lines away unrelated to these 15 objects),
  but the change touches nothing except an existing string array literal
  inside 15 pre-existing objects — no new objects, no structural edits — so
  the risk surface is small.

**This change is applied to the live working tree but has NOT been
committed** (git was unreachable). It should be treated as pending until a
future session (the next scheduled run, or the user directly) can:

1. Sync the mirror and run `npx tsc --noEmit` — expect clean, consistent
   with the narrow nature of this edit.
2. Run a runtime integrity check confirming 0 duplicate ids, 0 orphaned
   `brandId`s, and all 15 listed ids carrying exactly `['no_pork',
   'vegetarian']`.
3. Commit locally with a message referencing this report (not push).

## Not done

- Did not add `vegan` to any of the 15 (see Method step 4 — dairy/ghee not
  excludable from a brand-name signal alone).
- Did not revisit the 11 items that already carried `vegetarian` — out of
  scope, not touched.
- Did not attempt the other open follow-on from the 2026-09-01 halal audit
  ("Nyonya"-branded items needing dedicated per-item research) — that needs
  individual web research per item, a separate, larger piece of work, not
  bundled into this pass.
- **tsc/build verification and git commit — see "Verification" above, the
  main open item from this run.**
