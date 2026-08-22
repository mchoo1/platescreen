# Research session — 2026-08-23

**Track:** Restaurants / Food Court / Hawker / Coffeeshop / Canteen
**Queue entry selected:** `kopitiam` (id `kopitiam`, type `food_court`, priority `high`) — first pending entry in this track by the deterministic priority-then-order rule.

## Scope note (read this first)

The `kopitiam` queue entry does not describe a single orderable outlet. Per its notes, "Kopitiam" was deliberately removed as a Brand on 2026-08-22 because it was a mega-brand row standing in for 48 unrelated food-court buildings. The real unit of work described by this entry's notes is a backlog: 839 real, already-existing Brand+Premises rows (`operatorId: "kopitiam"`, added during the 2026-08-22 stall scrape) with **zero MenuItems** among all of them.

Adding a new "Kopitiam" Brand row to satisfy the letter of Phase 1/4 would recreate the exact anti-pattern the 2026-08-22 restructure reverted (confirmed: no Brand with `id: "kopitiam"` exists, and this is intentional per the notes). So this run instead treated the entry's real task as: pick one of the 839 no-MenuItems kopitiam-operator brands (deterministically, first in `brands.ts` array order among those with zero MenuItems) and research its menu, consistent with "one outlet per run."

## Outlet researched

**Kopi Kiosk** (`kopitiam_kopi_kiosk`) — type `food_court_stall`, cuisine "Coffeeshop Fare", operatorId `kopitiam`. Brand and 3 Premises rows already existed from the 2026-08-22 scrape; only MenuItems were added this run (no new Brand/Premises — Phase 3 SFA lookup skipped per the skill's rule for already-existing brands).

Real dish names came from `reference/data/kopitiam-stall-dishes.json` (scraped from Kopitiam's own stall pages, key "Kopi Kiosk"): Ice Kacang, Kaya Butter Set Meal, Kaya Butter Toast, Kaya Toast, Kopi, Signature Breakfast Set, Teh.

## Menu items added (6)

None of these are outlet-specific sources (no official Kopi Kiosk nutrition data exists) — every item is confidence `estimated`, reasoned from generic Singapore coffeeshop-drink/toast nutrition aggregators (SingaporeCalorie, SnapCalorie, FatSecret SG) cross-checked against this project's own existing Ya Kun Kaya Toast entries (`yk_kaya_toast_thin/thick`, `yk_kopi`, `yk_teh`, `yk_set_a`) as a same-category calibration anchor, since kopitiam-style stalls typically run slightly heavier (more condensed milk/butter) than a chain cafe.

| Item | Price | Cal | Protein | Carbs | Fat | Confidence |
|---|---|---|---|---|---|---|
| Kaya Toast | $1.60 | 220 | 5g | 32g | 8g | estimated |
| Kaya Butter Toast | $2.00 | 300 | 6g | 38g | 13g | estimated |
| Kopi | $1.50 | 130 | 2g | 20g | 4g | estimated |
| Teh | $1.50 | 140 | 2g | 23g | 4g | estimated |
| Ice Kacang | $2.80 | 290 | 5g | 68g | 5g | estimated |
| Kaya Butter Set Meal | $5.20 | 560 | 20g | 63g | 23g | estimated |

All tagged `vegetarian` in `compatibleWith`, matching this project's existing convention for identical Ya Kun items (eggs/dairy treated as vegetarian-compatible here). No other dietary flags applied — halal/vegan/etc. status for this specific stall is unconfirmed, so left unset per the never-guess rule.

**Skipped:** "Signature Breakfast Set" — the scraped dish list gives no detail distinguishing it from "Kaya Butter Set Meal" (both appear to be a toast+eggs+drink combo), and inventing a macro difference between two same-shaped "set" items would be fabrication. Left out per Phase 2 step 2 (near-duplicate rule).

## SFA registration

Skipped — Phase 3 only applies when creating a new hawker/food_court_stall Brand, and `kopitiam_kopi_kiosk` already existed with its own Premises rows from the prior session.

## Typecheck

Copied project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox, ran `npm install` then `npx tsc --noEmit` — passed with no errors.

## Queue update

Left `kopitiam`'s `status` as `"pending"` (not flipped to `"researched"`) — 838 of the 839 kopitiam-operator brands still have zero MenuItems, so marking this entry done would misrepresent the state. Appended a dated note to the entry documenting this run's progress and flagging that, at one-stall-per-run, this backlog will take a very long time to clear — a future session should consider whether this specific entry warrants a higher per-run batch size than the normal one-outlet convention.

## Commit

Committed locally (`git add -A && git commit`), not pushed.
