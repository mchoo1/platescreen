# 2026-08-30 — Research session: McCafé colocation (grocery/ready-to-eat/supermarket track)

**Queue entry:** `mccafe_colocation_research` (Brand: `mccafe`, type: `grab_go`, priority: `medium`)

**Selection:** Filtered `RESEARCH_QUEUE` to `type` in {`grab_go`, `ready_to_eat`, `supermarket`} with `status: 'pending'`. Only two entries qualified: `mccafe_colocation_research` (medium priority) and `ok_convenience` (low priority). No `supermarket`-type entries exist in the queue at all. Per the deterministic priority-first rule, `mccafe_colocation_research` was selected. No `supermarket`/`grab_go`/`ready_to_eat` id collision found in `brands.ts` (the `mccafe` Brand already exists, which is expected — this entry is a location-research follow-up, not a new-Brand entry).

## What this entry actually needed

Unlike a typical queue entry, `mccafe` already has 10 real MenuItems from a prior session. The only outstanding gap was Premises: its one legacy Premises row (`mccafe_p19`, a non-address "Multiple outlets islandwide" placeholder) had already been removed in an earlier audit. The task as written was to identify the real subset of McDonald's outlets with a McCafé corner and add proper Premises rows for them.

## Research performed

- WebSearch for "McCafe McDonald's Singapore outlets list" and similar: consistently surfaced a "~43-46 of 136 outlets" and, contradictorily, "over 50 McCafé outlets" figure — both traced only to third-party aggregator/blog sites (e.g. mcdonaldsmenu.sg, which carries an explicit "not affiliated with McDonald's Singapore" disclaimer), never to an official, individually-verifiable outlet list.
- Fetched `https://mcdonaldsmenu.sg/outlets/` directly: a long unofficial outlet list with addresses and hours, but no per-outlet McCafé tag/flag at all — not usable for this purpose.
- Fetched the **official** `https://www.mcdonalds.com.sg/mccafe` page directly. It lists the current McCafé beverage lineup (Americano, Iced Americano, Latte, Iced Latte, Cappuccino, plus a running Caramel Banana Latte promo) and states plainly: **"Available at all restaurants islandwide."** No subset language, no store-locator filter for McCafé specifically.
- Attempted to reach the official store locator (`mcdonalds.com.sg/locate-us`) via the browser tool to check for a McCafé-specific filter/tag per listed outlet — navigation was denied/blocked at the browser level; could not inspect it interactively this session.

## Finding

The official McDonald's Singapore site directly contradicts the premise this queue entry was written on. It claims McCafé beverages are available islandwide at all restaurants, not at a specific ~43-46-outlet subset. No third-party source offers a credible, individually-verifiable list of "McCafé outlets" to cross-check against (nothing like the SFA Business Name matching that resolved the cold_storage/giant/7eleven banner ambiguity exists here).

Two plausible readings, and picking between them is a product decision, not a research one:

1. **McCafé really is everywhere now** — in which case the standalone `mccafe` Brand/Premises concept may not need its own location data at all (fold its 10 MenuItems into `mcdonalds` as a beverage category, or mirror all 136 `mcdonalds` Premises rows under `mccafe` too).
2. **"Islandwide" is marketing copy for ordering availability** (app/kiosk/delivery), not a claim that every physical restaurant has a distinct in-store McCafé service corner — a distinction McDonald's has drawn in some other markets. If so, the real subset still needs identifying, and the site's own copy can't be used to shortcut that.

Given this ambiguity and the total lack of a credible per-outlet source, I did not fabricate a hand-picked outlet list from blog mentions (Bishan Park, Bukit Batok, Canberra Plaza, etc., all sourced from the same unverifiable aggregator content) — doing so would repeat exactly the kind of unverifiable-source fabrication this project's rules exist to prevent.

## Action taken

- Appended a note to the `mccafe_colocation_research` entry in `researchQueue.ts` documenting this finding and flagging the two-option human decision, following the same "needs a human decision, not a guess" pattern used previously for the Foodfare institutional-catering scope question.
- **Left `status: 'pending'`.** No changes to `brands.ts`, `menuItems.ts`, `groceryProducts.ts`, or `premises.ts`.
- Per this run's task design (mirroring the "don't pick a fallback in the same run" rule), did not fall back to researching `ok_convenience` in this run.

## MenuItem / GroceryProduct counts this session

0 added (0 MenuItem, 0 GroceryProduct) — no Brand/menu work was in scope for this entry.

## Typecheck result

Ran `npx tsc --noEmit` against a sandboxed copy of the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`). **Passed cleanly, exit code 0.** The only edit this run was a string literal appended to an existing untyped `notes` field, so this was a low-risk check, but it was run per Phase 4 regardless.
