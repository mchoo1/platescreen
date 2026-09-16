# 2026-09-16 — Lixin Teochew Fishball Noodle @ Hawkers' Street Square 2 (restaurant-track scheduled run, 2nd pass today)

## Target selection

Followed Phase 1's deterministic priority order: `kopitiam` / `koufu` / `foodfare` (all
high-priority, food_court/operator entries) re-verified directly against live
`brands.ts`/`menuItems.ts` — no addressable single-outlet gap in any of the three, unchanged
from every prior pass since 2026-08-31 (kopitiam: 3 zero-menu operatorId-tagged brands, all
documented dead-ends or out of this task's write-scope; koufu: 0 operatorId-tagged brands,
standalone sub-brands fully covered; foodfare: still deprioritized per the 2026-08-23 user
instruction on its B2B-scope finding).

Fell through to `hawkers_street` (medium priority, 4th overall pending entry). This entry's
own notes (updated earlier today by the first restaurant-track run) flagged "Lixin Teochew
Fishball Noodle at Square 2 needs its own fresh venue-specific research" as the one
remaining named lead not yet resolved at the newly-identified Square 2 venue.

## Research

- `lixinfishball.com/locations/` (the chain's own official site): lists 17 official branches,
  including **"Novena Square 2" — Hawkers' Street, 10 Sinaran Drive #04-14/15/16, Singapore
  307506** — confirming this is a real, currently-operating branch of the same LiXin Teochew
  Fishball Noodles chain already in the database as `lixin_teochew_fishball_noodle_clementi_mall`.
- foodpanda has a *separate* delivery listing for this branch, "Lixin Teochew Fishball Noodle
  (Square 2)" (restaurant id `jqan`, foodpanda.sg/restaurant/jqan/lixin-teochew-fishball-noodle-square-2),
  whose footer address confirms "Novena Square 2 (Hawkers' Street), #04-14-16 / 63-70 / 76-80
  307506". Its full menu and every price are **identical** to the existing Clementi Mall
  branch's foodpanda-sourced menu already in `menuItems.ts` (ltfn_1–ltfn_7): Traditional
  Fishball Noodle $8.80, Lixin Signature Noodle $11.70, Mushroom Minced Meat Noodle $10.60,
  Fish Dumpling Soup $8.80, Fishball Soup $6.50, Fishcake $5.20, Sambal Meat Dumplings $7.10
  (plus a few items not currently in the DB: Sambal Mushroom Meat Dumpling Noodle $10.60,
  Handmade Meatball Soup $6.50, Handmade Meat Dumpling Soup $6.80, Crispy Fishcake Fritters
  from $1.40, Ribbon Meat Spring Rolls from $2.20 — a standing chain-wide catalogue, not a
  venue-specific one).

## Conclusion / action taken

This is a **chain-branch case**, not the CLAUDE.md §4.2 "same name, different venue, needs
its own identifier" ambiguity that the entry's earlier note assumed by default (correctly
cautious at the time, since no research had been done on this specific lead yet). The
official locations page plus the identical chain-wide menu are the "SFA or other identifier"
that §4.2 asks for. This is the same shape as the `hup_hong_chicken_rice_tang_plaza` /
6-existing-chain-brand cases already flagged on this entry earlier today, and the same
lesson already learned from the `kopitiam_king_grouper` precedent: prefer adding a Premises
row to the existing Brand over fragmenting into a duplicate Brand when the same chain is
confirmed at a new address.

**Added:** one new Premises row to the *existing* Brand `lixin_teochew_fishball_noodle_clementi_mall`:

```
{
  id: "lixin_teochew_fishball_noodle_clementi_mall_p2",
  brandId: "lixin_teochew_fishball_noodle_clementi_mall",
  label: "Novena Square 2 (Hawkers' Street)",
  locationType: "food_court",
  locationContext: "Square 2",
  address: "10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506",
  postal: "307506",
  lat: 1.320705109568455,
  lng: 103.8441607096606,
  sfa: null,
  source: "operator_official_site"
}
```

Lat/lng reused from this morning's `545_whampoa_prawn_noodles_square_2_p1` Premises row (same
building/unit range, sourced from littledayout.com/eatbook.sg's opening coverage).

**Not added:** no new Brand, no new MenuItems — the brand's existing 7 items (ltfn_1–ltfn_7)
now correctly surface at both premises via the standard chain join (`screener.ts`'s
`PREMISES_BY_BRAND` map; the same "Multiple outlets islandwide" pattern already used for
McDonald's, KFC, and every other multi-branch chain in this database). No SFA lookup
performed — Phase 3 only applies when creating a new Brand of type hawker/food_court_stall,
and this run didn't create one; consistent with every other Hawkers' Street Premises row
(`sfa: null`, `source: "web_research"`/`"operator_official_site"` — this operator's
concessions aren't individually SFA-matched).

## Queue update

Appended an UPDATE to the `hawkers_street` queue entry in `researchQueue.ts` documenting the
above. Status left `'pending'` — this is a long-running multi-part backlog entry, not a
single-outlet target. Remaining work flagged on that entry: add Square-2 Premises rows to the
6 *other* existing chain brands identified in the prior update (`tai_seng_fish_soup`,
`king_of_fried_rice_hws`, `hill_street_coffee_shop`, `pangs_hakka_ytf`,
`hill_street_hainanese_curry_rice`, `jiak_song_mee_hoon_kway`,
`hup_hong_chicken_rice_tang_plaza`) — out of this run's one-outlet scope. The
`kopitiam_china_food`/`kopitiam_king_grouper` items remain tracked on the separate `kopitiam`
queue entry, unrelated to this one.

## Verification (Phase 5)

- Mirrored `src/`+config (excluding `node_modules`/`.next`/`out`/`.git`/`reference`) to
  `/tmp/build/platescreen` — routed through `/tmp` rather than the `/sessions` mount, which
  was at 100% disk (23M free), same disk workaround used by the 2026-09-15 run.
- `npm install --cache /tmp/npm-cache`: succeeded (394 packages).
- `npx tsc --noEmit`: silent, no errors.
- `npm run build`: succeeded, 4401 static pages generated (up from 4400 — the one new
  Premises page).
- 0 duplicate Premises ids (checked via grep across all `_p<N>` ids); both
  `lixin_teochew_fishball_noodle_clementi_mall_p1` and `_p2` present exactly once each.
- `diff` confirms the `/tmp` mirror and live repo are byte-identical on the touched files
  (`premises.ts`, `researchQueue.ts`) and the untouched ones (`brands.ts`, `menuItems.ts`).

## Files touched

- `src/lib/premises.ts` — added 1 Premises row.
- `src/lib/researchQueue.ts` — appended an UPDATE note to the `hawkers_street` entry (status
  unchanged, still `'pending'`).
- This report.

No Brand or MenuItem changes this run. No email sent, no `git push` run, `C:\stride-app` not
touched.
