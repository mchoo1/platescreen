# 2026-09-02 — Remove 28 duplicate Premises rows

## Why

Asked to re-check the earlier work in this session. The prior menu-item
dedup fix (`2026-09-02-menu-item-dedup-post-merge.md`) only checked for
duplicate *dishes* under the same brand — it didn't occur to check
whether the same brand-merge could also create duplicate *locations*.
Running the equivalent check (same `brandId` + same normalized `address`)
against `premises.ts` found 28 groups, more than expected and from two
different causes.

## Method

Grouped all Premises by `(brandId, normalized address)` and flagged every
group with more than one row, then checked whether the duplicates were
byte-for-byte identical (safe to auto-remove) or merely close (needs
judgment).

## Result

**24 pre-existing, fully-identical duplicates — unrelated to today's
merge work.** All under various `kopitiam_*` sub-brand ids (e.g.
`kopitiam_kopi_kiosk`, `kopitiam_royal_rojak`, `kopitiam_telur_thai`).
Every field matched exactly between the two rows in each pair (label,
address, postal, lat, lng, source, sfa) — only the `id` differed. This
predates this session entirely; most likely a residual artifact of the
2026-08-22 Kopitiam stall-sitemap scrape (1,441 stall pages scraped, some
apparently captured twice under slightly different generated ids before
dedup). Kept the first-listed id in each pair, removed the second.

**4 duplicates caused by this session's earlier brand merge**
(`e31b6ae`). When `kfc`, `pizza_hut`, `breadtalk`, and `dominos` each
absorbed a duplicate brand's single Premises row, that row turned out to
be the same physical outlet as one the target brand already had — same
address, slightly different (independently-geocoded) coordinates. Kept
the pre-existing, higher-precision id in each pair (`kfc_p1196`,
`pizza_hut_p1259`, `breadtalk_p1107`, `dominos_p1446` — all from a
bulk/API geocoding pass, 15 decimal places) and removed the newly-merged,
lower-precision duplicate (4-decimal-place coordinates, consistent with
the original single-outlet placeholder brand's less careful sourcing).

Full removal list (28 ids): `kopitiam_kopi_kiosk_p71`,
`kopitiam_royal_rojak_p4`, `kopitiam_flint_specialty_grill_p3`,
`kopitiam_ampang_ytf_p3`, `kopitiam_pepper_lunch_express_p4`,
`kopitiam_majulah_nasi_padang_p4`, `kopitiam_telur_thai_p2`,
`kopitiam_telur_thai_p12`, `kopitiam_hjh_maimunah_malay_snack_p2`,
`kopitiam_delibowl_rice_express_p2`, `kopitiam_japanese_p3`,
`kopitiam_seabay_delight_p4`, `kopitiam_filipino_cuisine_p3`,
`kopitiam_ban_mian_and_fish_soup_2_p4`, `kopitiam_korean_p5`,
`kopitiam_odeon_beef_noodles_p2`, `kopitiam_don_oyster_bar_p2`,
`kopitiam_carrot_cake_p3`, `kopitiam_bara_penyet_p3`,
`kopitiam_traditional_snack_p2`, `kopitiam_sai_kitchen_p2`,
`kopitiam_ampang_yong_tau_foo_p5`, `kopitiam_western_beradik_p2`,
`kopitiam_nasi_campur_p3`,
`tampines_round_market_and_food_centre_kentucky_fried_chicken_management_pte_ltd_p498`,
`tampines_round_market_and_food_centre_pizza_hut_singapore_pte_ltd_p500`,
`hougang_105_hainanese_village_centre_breadtalk_pte_ltd_p607`,
`ayer_rajah_market_domino_s_pizza_singapore_pte_ltd_p631`.

Total Premises: 4,683 → 4,655.

## Verification

- `npx tsc --noEmit`: clean.
- Runtime integrity check: 0 duplicate ids across Brands (1,716) /
  Premises (4,655) / MenuItems (2,557), 0 orphaned `brandId` references,
  all 28 removed ids confirmed absent, and a full re-scan for
  `(brandId, address)` duplicate groups now returns **zero**.
- Confirmed `MenuItem` has no `premisesId`/location-specific field
  (checked `types/db.ts`) — a MenuItem only ever references a `brandId`,
  so removing a Premises row cannot orphan any MenuItem. No repointing
  was needed for this fix, unlike the earlier menu-item dedup.

## Lesson

This is the second post-merge duplicate class found in as many checks
(dishes, then locations) from the same 2026-09-02 brand merge. Recommend
that any future brand/premises merge run **three** checks before being
called done, not one: duplicate ids (what was checked originally),
duplicate dish names within the merged brand, and duplicate addresses
within the merged brand. The 24 pre-existing Kopitiam duplicates were a
useful side-discovery from doing this properly — worth a broader sweep of
the other large batch-scraped brand sets (Koufu, Fei Siong, hawker-centre
batches) for the same pattern in a future session, since this was only
found by re-checking, not by the original batch's own verification.
