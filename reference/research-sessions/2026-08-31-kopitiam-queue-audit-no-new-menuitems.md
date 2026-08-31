# 2026-08-31 — Kopitiam queue audit (restaurant/food_court/hawker/coffeeshop/canteen track), no new MenuItems

**Track:** restaurants / food court / hawker / coffeeshop / canteen (`platescreen-research-restaurants`)
**Target selected (Phase 1):** `kopitiam` — first pending entry in priority order (high priority, first-listed).
**Outcome:** No new MenuItems added this run. 9 stale queue statuses corrected instead. Full findings documented inline on the affected `researchQueue.ts` entries.

## What happened, in order

### 1. Caught and reverted a duplicate-work mistake

An early throwaway audit script cached a copy of `researchQueue.ts`'s text in a temp file and a later script accidentally read that stale copy instead of the live file, so the `kopitiam` entry's most recent notes (from two prior runs earlier today) weren't visible yet. Working from the stale view, this run independently re-derived `kopitiam_king_grouper` (Hougang One, the only Brand+Premises among the 4 remaining zero-MenuItem `operatorId: "kopitiam"` brands with a real menu signal) as a candidate, researched it via `kinggrouperfishsoup.com` (official site — confirmed the Hougang One address is one of their listed outlets, with a real published menu), and added 2 MenuItems to it.

Before finishing, the live `researchQueue.ts` was re-read directly (not from cache), which surfaced the second pass from earlier today: it had already reached the identical `kopitiam_king_grouper` candidate, done the same official-site research, and *explicitly decided not to add MenuItems* — because Hougang One is the same real chain as the already-populated `kopitiam_king_grouper_fish_soup` Brand (5 other premises, same official menu), just scraped under a shortened signboard name. Adding a second, divergent set of MenuItems to `kopitiam_king_grouper` would have made the same real chain appear twice in the screener under two different names. That reasoning holds up — this run's addition was reverted (`menuItems.ts` is byte-identical to its pre-run state; verified via diff against the build mirror). The correct fix (reassign `kopitiam_king_grouper_p1` as a 6th Premises row under `kopitiam_king_grouper_fish_soup` and delete the `kopitiam_king_grouper` Brand) is a Brand-merge/restructure, outside this task's write scope, and stays flagged for a dedicated cleanup pass.

### 2. Researched the next real candidate: `kopitiam_china_food`

Web-searched "China Food" + Blk 450 Clementi Ave 3 (the Kopitiam venue this Brand is tied to). Found general coverage of that Kopitiam (Burpple, FoodAdvisor — Sambal Stingray, Beef Korean Porridge, Hainanese Curry Rice, a spicy popcorn-chicken dish at *other* stalls there), but nothing naming a stall called "China Food" or describing what it actually sells. The scrape's only signal for this Brand is the bare category label "Cold dishes" — not a specific dish name. Per the project's never-fabricate rule, left unresearched rather than guessed.

That leaves the `kopitiam` operator backlog exactly where the prior pass left it: `kopitiam_cheers` (non-food convenience store, never gets a MenuItem), `kopitiam_culiang_yufen` (known self-referential garbage scrape entry), `kopitiam_king_grouper` (needs a Brand-merge, not macro research), `kopitiam_china_food` (no credible dish-level source found yet, still open for a future individual-research attempt).

### 3. Re-audited koufu / foodfare / hawkers_street (the queue's 3 other "operator" entries)

- `koufu` and `foodfare`: 0 Brand rows currently carry `operatorId: "koufu"` or `"foodfare"` — their real sub-brands were added without an operatorId per the 2026-08-22/23 notes (standalone storefronts, not shared-building concessions), and `foodfare` is separately user-deprioritized. No zero-menu backlog remains under either entry's original framing.
- `hawkers_street`: all 27 `operatorId: "hawkers_street"` Brand rows now have ≥1 MenuItem. Its own flagged remaining work (identifying concessions at 4 newer venues) is Brand-creation work, not menu research, and needs in-person/Street View verification per its own notes.

### 4. Swept the rest of the pending queue for any other viable single-outlet target

Filtered all `status: "pending"` entries with `type` in restaurant/food_court/hawker/coffeeshop/canteen (92 entries after excluding the 4 operator entries), cross-referenced each against `brands.ts` and `menuItems.ts`. Result:

- **~34 entries** are per-location duplicates of chains that already have their own consolidated Brand elsewhere in this database (Cold Storage ×16, McDonald's ×4, Pizza Hut ×2, Domino's ×2, Bengawan Solo ×3, Bee Cheng Hiang ×1, NTUC Foodfare ×2, etc.) — the exact same "append as a Premises row to the existing chain Brand, don't research as a new standalone Brand" situation as `kopitiam_king_grouper`. Individually flagged on the affected queue entries (see the McDonald's/Domino's/Bengawan Solo notes) for a future Brand-merge pass, same shape as the existing McDonald's/Anchorvale Village Hawker Centre fix in `premises.ts` history.
- **~11 entries** are bare SFA-licensee personal names (Lee Len Tong, Goh Poo Huat, Kwek Ah Heoh, Lee Jim Pong, Lim Hang Tong, Goh Jee Tee (2nd), Lee Kee Yeo @Lee Lian Hong, Au Jiahao Alex, Chan Cheow Teck, Chan Kok Hee (Tian Guoxi), Chong Yo Private Limited) — this matches CLAUDE.md's documented ~12-entry "task #29" bucket almost exactly: text search can't resolve a name that never appeared on a signboard. Needs Street View or an in-person visit, not available in this run.
- **2 entries are orphaned**: `eunos_crescent_blk_4a_teo_kiang_huat` and `tanglin_halt_market_ngern_jwee_chye` have no matching Brand row in `brands.ts` at all (likely missed by the 2026-08-24 staleness sweep). Left as-is (not deleted) — flagging here for that sweep's owner to reconcile, since deleting queue entries wasn't asked for in this task.
- **9 entries were simply stale**: already had 1-2 real MenuItems in `menuItems.ts` from earlier, untracked work, but still showed `status: "pending"`. Individually re-verified against `menuItems.ts` and flipped to `"researched"` this run (see list below). No macro research was performed on any of them — this is a bookkeeping correction only.

### Stale-status fixes made this run (verified, not researched)

| id | existing MenuItems |
|---|---|
| `clementi_ave_3_blk_448_lee_guat_hoon` | Kopi |
| `eunos_crescent_blk_4a_tiong_lee_lim` | Soya Bean Drink, Tau Huay |
| `ayer_rajah_food_centre_big_bern_s_american_grill_xpolis_pte_ltd` | Big Bern's Cheese Burger |
| `mei_chin_road_market_goh_jee_tee` | Chicken Rice |
| `pasir_ris_central_hawker_centre_bee_cheng_hiang_concept_pte_ltd` | Sliced Bak Kwa (100g) |
| `pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd` | Kueh Lapis |
| `bedok_north_street_1_blk_216_bengawan_solo_pte_ltd` | Kueh Lapis |
| `bedok_north_street_1_blk_216_domino_s_pizza_singapore_pte_ltd` | Pepperoni Pizza |
| `bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd` | Big Mac |

## Verification

- `menuItems.ts`, `brands.ts`, `premises.ts`: **unchanged** this run (byte-identical to pre-run state; the one addition made was reverted before finishing).
- `researchQueue.ts`: only file modified — 9 `status` flips + notes on those 9 entries + an updated note on the `kopitiam` entry documenting this run.
- Synced `src/` and `reference/` to a build mirror (`~/build/platescreen`), ran `npm install`.
- `npx tsc --noEmit`: silent (pass).
- `npm run build`: succeeded, all 4,313 static pages generated.
- Counts unchanged from pre-run baseline: 1,747 Brands / 4,680 Premises / 2,560 MenuItems. 0 duplicate ids across all three arrays. 0 orphaned MenuItems or Premises (every `brandId` resolves to a real Brand).
- `diff` of `researchQueue.ts`, `menuItems.ts`, `brands.ts`, `premises.ts` between the live repo and the mirror: identical.

## Status / next steps for whoever picks this up next

- `kopitiam` entry left `pending` — 4 kopitiam-operator brands remain genuinely unresolved (2 permanently out of scope, 1 needs a Brand-merge, 1 needs further individual research that hasn't turned up anything yet).
- A dedicated **Brand-merge cleanup pass** would resolve ~35 entries at once (the `kopitiam_king_grouper` case plus the ~34 chain-duplicate entries found in this sweep) — same pattern as the existing McDonald's/Anchorvale Village fix in `premises.ts` history. This is probably higher-leverage than continuing to pick off entries one at a time from this queue.
- A **Street View / in-person pass** is the only remaining path for the ~11 bare-licensee-name entries (task #29).
- The 2 orphaned queue entries (`eunos_crescent_blk_4a_teo_kiang_huat`, `tanglin_halt_market_ngern_jwee_chye`) should be reconciled by whoever owns the staleness-sweep process.

No commit-worthy dish/macro data was produced this run; the commit contains only the queue-status corrections and this report.
