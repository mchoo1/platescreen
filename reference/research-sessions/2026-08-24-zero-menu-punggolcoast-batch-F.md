# 2026-08-24 — Zero-menu-item cleanup, Batch F: Punggol Coast Hawker Centre (task #65)

Sixth batch of the zero-menu-item cleanup, fourth long-tail venue batch. Punggol Coast
Hawker Centre turned out to be a mixed venue: mostly Kopitiam-operated (cache hit),
plus a few non-Kopitiam entries that turned out to be a genuine pre-existing data bug.

## Selection and an unexpected find

40 unique zero-menu brands at this venue. 34 had `operatorId: "kopitiam"` and matched
`reference/data/kopitiam-stall-dishes.json` directly. The remaining 6 did not — and on
inspection, 5 of those 6 turned out to be **duplicates**: the exact same real stall,
same address (84 Punggol Way, #02-55, Singapore 829911), recorded under two different
brand ids — once from raw SFA-licensee data (id like
`punggol_coast_hawker_centre_singapore_fried_hokkien_mee`, name taken verbatim from the
licensee record) and once from the Kopitiam site scrape (id like
`kopitiam_singapore_fried_hokkien_mee`, cleaner trading name). Confirmed via matching
premises addresses/postals for all 5 pairs before touching anything.

**Fixed rather than worked around**: removed the 5 duplicate (SFA-licensee-derived)
Brand rows and their Premises rows entirely — neither had any MenuItems, and neither
carried data the Kopitiam-scrape version didn't already have better. Kept the
Kopitiam-scrape version of each; those 5 are covered by real dish data below.
1,772 → 1,767 brands.

The 6th non-Kopitiam brand, **`punggol_coast_hawker_centre_cold_storage_singapore_1983_pte_ltd`**,
is different — its name is the literal corporate registration name of the Cold Storage
supermarket chain's operating company, `type: "hawker"`, with no matching Kopitiam
cache entry and no obvious real food-stall identity to research. This looks like the
same kind of stale generic-licensee-name artifact that earlier sessions (tasks
#31/#51/#52) swept up elsewhere, that slipped through here. Left as zero-menu
deliberately rather than fabricate a dish for an entity that may not even be a food
stall — flagging for a future generic-name audit pass rather than guessing now.

The 7th brand, `punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd`,
is also a corporate-registration-style name, but it maps to a real, identifiable prata
chain (Srisun Prata) — given a real Roti Prata item.

## Menu items

34 brands covered (33 Kopitiam-cache + Srisun Prata), 36 items, using the same
dish-macro-lookup.py convention. 12 new dish types added (Ginseng Chicken Classic,
Masala Dosa, Korean Fried Chicken, Pig Organ Soup, etc.), plus 2 dish types
(`Popiah`, `Laksa`) that had been defined ad hoc in earlier batches' inline scripts but
never actually saved to the persisted lookup file — added properly this time so future
batches can reuse them too.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,767 total brands (1,772 − 5 removed), 0 duplicate brand ids, 0
  orphaned premises/menu items after the removal. 1,288 total menu items (1,252 + 36),
  0 duplicate item ids. Only 1 Punggol Coast brand remains zero-menu
  (`..._cold_storage_...`, intentional).
- Zero-menu-item brand count: 1,389 → 1,350 (34 newly covered + 5 removed entirely).
- Live vs build-mirror `menuItems.ts`, `brands.ts`, `premises.ts`,
  `dish-macro-lookup.py` — all byte-identical diffs.

## What's next

Kampung Admiralty Hawker Centre (38), Ci Yuan Hawker Centre (37 — check overlap with
earlier research first), One Punggol Hawker Centre (35), Kopitiam @ Our Tampines Hub
(35). Worth doing a quick operator check per venue going forward before diving in, given
what this batch found — cheaper to catch a duplicate-brand pattern early than after
menu items are already attached to the wrong id.
