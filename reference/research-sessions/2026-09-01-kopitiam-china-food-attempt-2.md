# 2026-09-01 — kopitiam_china_food, 2nd attempt this pass, no new MenuItems

**Track:** restaurants / food court / hawker / coffeeshop / canteen (`platescreen-research-restaurants`)
**Target selected (Phase 1):** `kopitiam` — first pending entry in priority order (high priority, first-listed), same entry every run in this backlog per its own notes.
**Outcome:** No new MenuItems added this run. `researchQueue.ts` notes updated on the `kopitiam` entry only. No Brand/Premises/MenuItem data changed.

## Context

This is the second pass on this entry today. The first pass today (documented inline on the entry and in `2026-09-01-kopitiam_culiang_yufen.md`) resolved `kopitiam_culiang_yufen`, leaving 3 of the original 4 zero-MenuItem `operatorId: "kopitiam"` brands unresolved:

- `kopitiam_cheers` — known non-food convenience-store concession, permanently out of scope (CLAUDE.md section 4.3-adjacent reasoning).
- `kopitiam_china_food` — only scrape signal is the bare category label "Cold dishes"; no dish-level source found across several prior passes (2026-08-31 3rd pass, 2026-09-01 1st pass).
- `kopitiam_king_grouper` — needs a Brand-merge/restructure (reassign its sole Premises row to `kopitiam_king_grouper_fish_soup` and delete this Brand), which is outside this task's write scope (Phase 4 only adds Brand/Premises/MenuItems and flips queue status; it doesn't merge or delete Brand rows).

This run targeted `kopitiam_china_food` specifically, since it's the only one of the 3 where more research (as opposed to a restructure or a permanent skip) is the documented next step.

## What was tried

Prior passes had already exhausted plain-text web search for "China Food" + the venue name/address (Blk 450 Clementi Ave 3, #01-271, Singapore 120450). This run deliberately avoided repeating that exact search and tried different angles instead:

1. **Browser-based visual/listing identification.** Attempted to navigate the in-app browser to Google Maps (to check Street View / place photos / reviews), Facebook (a business-page result literally titled "450 Clementi Ave 3 #01-271 stall 3" turned up in search), and FoodAdvisor's listing page for this Kopitiam. All three navigations were blocked — the browser tool requires interactive per-site approval, which isn't available in this unattended scheduled-task run (no user present to approve). This closes off the "visual identification" path that prior passes had flagged as the only remaining option; it isn't usable from this task's tooling in its current (unattended) form.
2. **Narrower WebSearch queries not tried before:** the exact unit number `"#01-271"` combined with the venue; `"China Food"` combined with cai fan / economy rice / cooked-food synonyms; a `site:openrice.com` search for the venue (OpenRice does list several individually-named stalls at this exact Kopitiam — Fish Soup Ramen, 450 Economic Rice Porridge, Johnson Duck, Ayesha's Kitchen Indian Food, Banana Leaf BBQ Seafood — which is a genuinely useful roster, but none of them is named "China Food" or a plausible alias of it).
3. **Direct fetches of pages surfaced by the above:** Burpple's full review list for "Kopitiam (450 Clementi)" (15 reviews — mentions Sambal Stingray, Beef Korean Porridge, Hainanese Curry Rice, a spicy popcorn-chicken 辣子鸡 dish, tze char/BBQ seafood, all attributed to other stalls or to the venue generally) and a 2020 food-blog post (`paulinmunchies.blogspot.com`) specifically about "Holy Flavour Palace," a mala stall at the same Kopitiam, found via search — again, a different named stall, not "China Food." The Facebook business-page hit for "stall 3" at the exact unit number returned no retrievable content (an empty/unclaimed auto-generated listing page), and Facebook navigation was separately blocked by the browser tool, so that lead couldn't be followed further either.

## Result

No source — official, review-site, or blog — names a stall called "China Food" at this Kopitiam or attributes any specific dish to it. The venue clearly has several distinct named stalls (now partially enumerated via OpenRice/Burpple), but "China Food" isn't identifiable among them from any text-searchable source. Per the project's never-fabricate rule (CLAUDE.md section 5), no MenuItems were added — guessing a generic "Chinese cooked food" menu for it would be exactly the kind of fabrication that rule exists to prevent.

This doesn't change the entry's status: visual identification (Street View or an in-person visit) remains the only unexhausted path, and it isn't available from this task's tooling in an unattended run.

## No fallback picked

Per this task's one-outlet-per-run rule and the prior 2026-08-31 full-queue sweep (see `2026-08-31-kopitiam-queue-audit-no-new-menuitems.md`), no other realistic single-outlet target currently exists in this track's pending queue — the remaining ~83 pending entries are the same mix of chain-duplicates-needing-a-Premises-merge-not-new-research (~34), bare SFA-licensee personal names needing Street View (~11), 2 orphaned queue entries, and the `koufu`/`foodfare`/`hawkers_street` operator entries (each already re-audited as having no further zero-menu backlog addressable by this task, or explicitly user-deprioritized). No fallback brand was picked this run.

## Verification

- `brands.ts`, `premises.ts`, `menuItems.ts`: unchanged (no edits made to any of these files).
- `researchQueue.ts`: only file modified — one appended note on the `kopitiam` entry. Re-parsed the file with a throwaway Node script (`module.exports =` swap + `require`) after editing to confirm it's still valid, well-formed JS/TS array syntax — no syntax errors.
- No `tsc`/`next build` run this pass since no `.ts` files under `src/lib` that feed the screener (`brands.ts`/`premises.ts`/`menuItems.ts`) were touched — only a string literal inside `researchQueue.ts`'s existing `notes` field was extended, which doesn't affect the screener build.

## Status / next steps

- `kopitiam` entry left `pending` — same 3 kopitiam-operator brands remain unresolved (`kopitiam_cheers` permanently out of scope, `kopitiam_china_food` needs Street View/in-person, `kopitiam_king_grouper` needs a Brand-merge pass).
- The Brand-merge cleanup pass and Street-View pass flagged in the 2026-08-31 audit are still the higher-leverage next steps for this queue as a whole.
- If a future scheduled run of this task has interactive browser access (a user present to approve site navigation), that would unblock the Google Maps Street View / Facebook page lead for `kopitiam_china_food` specifically.
