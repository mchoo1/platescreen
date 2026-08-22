# 2026-08-22 — Generic hawker-stall name cleanup

**Trigger:** user flagged (with screenshots) that the live app showed "Roti Prata Stall (Tekka Market)"
instead of a real, named business, and pointed to Google Places proof that Jom Makan, Ar-Rahman Cafe,
and Syed Mee & Prata Place all exist at that exact address.

**Scope found:** 81 Brand entries across 9 hawker centres (Maxwell, Lau Pa Sat, Newton, Chinatown
Complex, Tekka, Old Airport Road, Golden Mile Food Centre, Geylang Serai Market, Whampoa) were named
by dish-type-at-centre archetype (e.g. `newton_hokkien_mee` → "Hokkien Mee (Newton FC)") rather than a
real, specifically identified stall, with `source: "legacy_static_coordinate"` (rough centre centroid
only, no real per-stall address). Of the 81, 9 at Lau Pa Sat already had real specific names (Seng Kee
Local Delights, Warong Pak Sapari, etc.) despite the placeholder source tag, so only 72 needed a name
fix.

**Method:** for each hawker centre, searched published hawker-centre guides (DanielFoodDiary, Eatbook,
SETHLUI, Miss Tam Chiak, HungryGoWhere, JointHawker, and similar) for the specific real stall serving
that dish, cross-checked the name against at least one additional independent source (a directory
listing, OpenRice, Yelp, or a second guide), and used the address/unit number where a source gave one.

**Result:** 56 brands renamed to a real, sourced stall name + address (`source` changed from
`legacy_static_coordinate` to `hawker_directory_named`). The Tekka roti prata slot was split into its
3 real vendors (Syed Mee & Prata Place, Jom Makan, Ar-Rahman Cafe & Royal Prata) exactly matching the
user's own example — 2 new Brand + Premises rows added, and 2 of the slot's 3 existing MenuItem rows
reassigned to the new brands so each of the 3 real stalls carries at least one dish.

**Still generic — not renamed, not fabricated (16 entries):** no independent source could confirm one
specific real stall for these dish/centre combinations within this pass, so the name was left as-is
rather than guessed:
`newton_char_kway_teow`, `cc_ban_mian_stall`, `cc_bak_chor_mee_stall`, `cc_char_kway_teow_stall`,
`cc_desserts_stall`, `oar_laksa`, `oar_desserts_drinks`, `gmfc_bak_kut_teh`, `gsm_nasi_lemak_stall`,
`gsm_murtabak_stall`, `gsm_beehoon_stall`, `whampoa_economic_rice`, `whampoa_laksa`,
`whampoa_wonton_mee`, `whampoa_prata_stall`, `whampoa_desserts_drinks`.

**Follow-up:** a smaller, separate issue was also spotted — a handful of brands (e.g.
`maxwell_carrot_cake`, `gmfc_chicken_rice`, `gmfc_char_kway_teow`, `gmfc_desserts_drinks`,
`tekka_mee_goreng_stall`, `cc_rice_noodle_rolls`, `lau_pa_sat_taliwang`, `gsm_desserts_drinks`) already
have real SFA-sourced Premises data but still carry a generic-style Brand name (e.g. "Carrot Cake Stall
(Maxwell FC)"). Not touched in this pass — flagged for a future cleanup since it's a naming-only fix,
not a data-sourcing one.

**Confidence:** MenuItem `confidence` fields were left as `"estimated"` — knowing the real business name
doesn't give us its actual nutrition panel, so macros are still not claimed as verified.
