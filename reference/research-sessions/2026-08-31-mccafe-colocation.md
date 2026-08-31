# 2026-08-31 — McCafé colocation research (grab_go/ready_to_eat/supermarket track)

## Entry selected
`mccafe_colocation_research` (medium priority) — the only pending entry in this track other than `ok_convenience` (low priority); picked deterministically per the task's priority-first rule. This is a re-pick of the same entry the 2026-08-30 run picked and left `pending`.

## What this entry actually is
Not a fresh menu/macro research job — the `mccafe` Brand already exists with 10 real MenuItems (confidence: estimated/verified from earlier runs). The open problem is that `mccafe` has **zero Premises rows**, so it doesn't appear as a location anywhere in the app. The 2026-08-30 run traced this to a genuine ambiguity: is McCafé available at a specific subset of McDonald's outlets (~43-46 of 136, per third-party aggregator blogs), or at all of them (per McDonald's own site copy)? That run flagged it as needing a human decision and left it untouched.

## New finding this run
Searched McDonald's Singapore's own Help Center (custcare.mcdonalds.com.sg) and found three directly relevant FAQ titles:
- "Will McCafé be removed in McDonald's islandwide? If so, when will this happen?"
- "Is McCafé removed from McDonald's islandwide? If so, when will this happen?"
- "Why is the McCafé I visit regularly being removed? Can I still get my McCafé beverages and food items from the main counter?"

The article bodies are behind a JS-rendered Zendesk help center — direct fetch returned empty, and the in-app browser could not navigate to mcdonalds.com.sg in this unattended session (same block the 2026-08-30 run hit). A targeted WebSearch surfaced their substance: **from 27 March 2026, McDonald's Singapore discontinued barista-made McCafé beverages islandwide**, removing the dedicated McCafé service-counter format entirely. Select beverages (cited: Premium Roast Coffee, Americano, Latte, Cappuccino, Frappe) continue to be served from the **main counter** at every restaurant.

This resolves the empirical half of the ambiguity: the "~43-46 outlet subset" figure wasn't a case of the researcher picking the wrong number — it described a physical service-counter format that no longer exists anywhere. Re-fetched `www.mcdonalds.com.sg/mccafe` live (current, Aug-2026-dated seasonal content) and it still reads "Available at all restaurants islandwide" directly under the beverage lineup — consistent with the post-counter-removal model, not a leftover contradiction.

Side note, not acted on: the live page's current core lineup is Americano / Iced Americano / Latte / Iced Latte / Cappuccino only — no Mocha, no Frappe — while the existing 10 MenuItems include `mccafe_mocha`, `mccafe_frappe_mocha`, `mccafe_frappe_caramel`. These may be discontinued along with the barista format, or may simply be off this particular promo page. Flagged for a future pass; not changed here without more direct confirmation.

## What's still unresolved (still a human call, not a lookup)
`Premises` in this schema is one-`brandId`-per-row with no shared/multi-brand mechanism. Representing "McCafé beverages exist everywhere McDonald's does" requires picking between:
- **(a)** Copy all ~136 existing `mcdonalds` Premises rows as new `mccafe` Premises rows, or
- **(b)** Drop the standalone `mccafe` Brand and fold its MenuItems into `mcdonalds` as a beverage category.

Today's finding makes (b) read as the more accurate model (McCafé is now confirmed to be a menu line off the same counter, not a separate corner), but it changes an existing, populated Brand's taxonomy — a bigger structural call than this task's normal per-outlet scope, so left for a human to decide.

## Outcome
- `researchQueue.ts`: `mccafe_colocation_research` notes updated with the finding above; `status` left `pending`.
- No Brand / MenuItem / GroceryProduct / Premises files touched.
- Typecheck: not re-run (notes-only string edit inside an existing untyped array literal; no structural change to any of `brands.ts`/`menuItems.ts`/`groceryProducts.ts`/`premises.ts`).
- Per this task's rule against picking a fallback outlet once an entry is selected, `ok_convenience` was **not** picked this run despite being processable — it remains the next candidate for a future run once `mccafe_colocation_research` is resolved by a human, or if a future run judges the fallback rule doesn't apply to a non-content queue entry like this one.

## Sources
- https://www.mcdonalds.com.sg/mccafe (fetched live, 2026-08-31)
- https://custcare.mcdonalds.com.sg/hc/en-us/articles/44718006321049 (title/existence confirmed via search; body not directly fetchable this session)
- https://custcare.mcdonalds.com.sg/hc/en-us/articles/45872472349465 (title/existence confirmed via search; body not directly fetchable this session)
- https://custcare.mcdonalds.com.sg/hc/en-us/articles/44717028044313 (title/existence confirmed via search; body not directly fetchable this session)
