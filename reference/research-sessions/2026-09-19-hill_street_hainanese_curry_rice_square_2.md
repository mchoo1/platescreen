# 2026-09-19 (2nd restaurant-track run) — hill_street_hainanese_curry_rice: Square 2 Premises addition

## Outlet researched
`hawkers_street` queue entry (operator: Hawkers' Street). This run's concrete output: a new Square 2 Premises row on the existing `hill_street_hainanese_curry_rice` Brand. No new Brand and no new MenuItems — Phase 1 step 5 applies (Brand already exists with real MenuItems; this run's scope was closing a known Premises gap tracked on this same queue entry across many prior runs).

## Selection process (Phase 1)
Filtered `RESEARCH_QUEUE` for `status: 'pending'` and `type` in `restaurant`/`food_court`/`hawker`/`coffeeshop`/`canteen` — 39 matching entries, sorted by priority (high → medium → low, stable on original order).

Re-verified the top of the priority-sorted list directly against live `brands.ts`/`premises.ts`/`menuItems.ts` before picking anything (per this queue's established precedent of not trusting notes text alone):
- `kopitiam` (high) — no Brand of its own; its 3 remaining internal sub-brand gaps (`kopitiam_cheers`, `kopitiam_china_food`, `kopitiam_king_grouper`) are all previously-exhausted dead ends (non-food concession / needs Street View / needs a Brand-merge restructure out of this task's scope). No addressable gap.
- `koufu` (high) — 0 `operatorId:'koufu'` Brand rows with a menu gap; remaining leads (Pang Pang Kopi, Elemen) are 403'd/JS-locked per the 2026-08-23 note. No addressable gap.
- `foodfare` (high) — user-deprioritized 2026-08-23. Not touched.
- `hawkers_street` (medium) — found this run's target here. Live-file check found `pangs_hakka_ytf` (previously flagged as still needing MenuItems) already has 2 real MenuItems as of this run — a stale note, now corrected. Of the 3 chain Brands still needing a Square 2 Premises row per the 2026-09-17b note (`hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`, `hup_hong_chicken_rice_tang_plaza`), verified directly against `premises.ts` that all 3 genuinely still lack one. Picked the first-listed per the one-outlet-per-run rule.

Also noted (found already staged, uncommitted, in this checkout before this run started): an earlier restaurant-track run today had already completed a full Phase 1-6 pass on `tanglin_halt_market_lim_hang_tong` (negative result — no credible source names this SFA-licensee stall, correctly left `pending`, no data added) but had not reached its own git commit step. That work is included in this run's commit since it belongs to the same task/queue and was otherwise ready.

## Research / action (Phase 2/4)
`hill_street_hainanese_curry_rice` already carries a real MenuItem (`hshcr_curry_rice`, Hainanese Curry Rice with Pork Chop/Braised Pork/Cabbage) but had only 4 Premises rows (Tampines 1, Bukit Panjang Plaza, EastPoint Mall, 100AM Mall) — no Square 2 row, even though this operator's Square 2 venue (10 Sinaran Dr, Novena) was confirmed open and its 9-stall roster identified back on 2026-09-16 (Little Day Out / Eatbook.sg in-person coverage), and Hill Street Hainanese Curry Rice appears on that roster.

Added Premises row `hill_street_hainanese_curry_rice_p5`:
- label/locationContext: "Square 2"
- address: "10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506" (postal 307506 — the corrected value already established by this entry's prior Square 2 additions, not the 307606 typo still present on `tai_seng_fish_soup_p4`)
- lat/lng: 1.320705109568455 / 103.8441607096606 (reused verbatim from the venue's other Square 2 Premises rows: `pangs_hakka_ytf_p5`, `hill_street_coffee_shop_p5`, `king_of_fried_rice_hws_p4`, `545_whampoa_prawn_noodles_square_2_p1`, `lixin_teochew_fishball_noodle_clementi_mall_p2`)
- source: "web_research"
- sfa: null (no SFA lookup — existing Brand, food_court_stall inside a mall venue, same precedent used throughout this queue entry)

No new Brand, no new MenuItems: the existing `hshcr_curry_rice` MenuItem now applies at this new Premises via the standard chain-brand join (`screener.ts`'s brand+premises+menuItem model).

## SFA registration (Phase 3)
Not applicable — existing Brand, food_court_stall inside a mall venue (same no-SFA-lookup precedent used throughout the `hawkers_street` entry's history).

## Verification (Phase 5)
- Synced a build mirror to `/tmp/build/platescreen` (excluding `node_modules`, `.next`, `out`, `.git`, `reference`), `npm install` succeeded.
- `npx tsc --noEmit` — silent (no errors).
- `diff` between the mirror's `premises.ts` and the live file — byte-identical.
- Parsed `premises.ts` programmatically: 4,668 total `id:` occurrences, 0 duplicates; the new id (`hill_street_hainanese_curry_rice_p5`) appears exactly once; `brandId: "hill_street_hainanese_curry_rice"` resolves to an existing row in `brands.ts`.

## Files touched
- `src/lib/premises.ts` — added `hill_street_hainanese_curry_rice_p5`.
- `src/lib/researchQueue.ts` — appended this run's findings to the `hawkers_street` entry's `notes`. Status left `'pending'` (2 further Square-2-Premises leads remain: `jiak_song_mee_hoon_kway`, `hup_hong_chicken_rice_tang_plaza`).
- `reference/research-sessions/2026-09-19-hill_street_hainanese_curry_rice_square_2.md` — this report.
- (Committed alongside, from an earlier same-day run that had not yet committed: `reference/research-sessions/2026-09-19-tanglin_halt_market_lim_hang_tong.md` and its corresponding `researchQueue.ts` notes update.)

## Status / next steps
`hawkers_street` remains `pending`. Remaining backlog: Square 2 Premises rows still needed for `jiak_song_mee_hoon_kway` and `hup_hong_chicken_rice_tang_plaza`, plus the unrelated `kopitiam_china_food`/`kopitiam_king_grouper` items tracked on the `kopitiam` entry itself, plus the still-unfixed `tai_seng_fish_soup_p4` 307606 postal typo (out of this run's append-only scope).
