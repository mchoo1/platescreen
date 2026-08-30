# PlateScreen Growth Content Queue

Rotating leaderboard/post themes for `platescreen-post-copilot`. Each theme is computed live from
`src/lib/brands.ts` / `premises.ts` / `menuItems.ts` / `groceryProducts.ts` at post-draft time —
never hardcode numbers here, this file only tracks WHICH theme to cover and WHEN it was last used.
See `reference/planning/growth-strategy-2026-08-22.md` for the overall strategy this supports.

Status values: `pending` (never used) | `used` (posted, see `lastUsed` + `subreddit`).

```
- id: fastfood_protein_per_dollar
  title: "Protein-per-dollar ranking across major SG fast food chains"
  computation: "Join MENU_ITEMS to BRANDS where type in [restaurant] and platforms includes dine_in/grab_go, filter confidence != 'estimated' unless clearly labeled, compute protein/price per item, rank top 15-20, group by brand for readability"
  status: pending

- id: hawker_protein_under_5
  title: "Highest-protein hawker dishes under $5"
  computation: "Join MENU_ITEMS to PREMISES via BRANDS where Brand.type == 'hawker', filter price <= 5, filter confidence in ['verified','community'] with SFA-backed Premises preferred, rank by protein descending"
  status: pending

- id: bubble_tea_calorie_ranking
  title: "Calorie ranking of SG bubble tea chains (same standard order, apples-to-apples)"
  computation: "Filter BRANDS by cuisine/aliases matching bubble tea chains (koi, liho, chagee, mixue, etc.), find a comparable standard menu item (e.g. classic milk tea, standard sugar/ice) per chain, rank by calories"
  status: pending

- id: grocery_protein_per_dollar
  title: "Best protein-per-dollar packaged grocery items (FairPrice / Cold Storage / Giant)"
  computation: "Use GROCERY_PRODUCTS once populated — proteinPer100 / (packagePrice / (packageSize/100)) — skip this theme entirely if GROCERY_PRODUCTS is still empty, do not force it"
  status: pending

- id: cheapest_150g_protein_day
  title: "Cheapest realistic way to hit 150g protein in a day eating out in Singapore"
  computation: "Combinatorial: pick 3 real MenuItems (breakfast/lunch/dinner) from different brands whose combined protein >= 150g, minimizing combined price, from the verified/community-confidence subset only"
  status: pending

- id: newly_added_chain_spotlight
  title: "Spotlight a chain PlateScreen just added real per-branch SFA data for"
  computation: "Pull the most recently resolved entry from branchQueue.ts history (git log on premises.ts) or the latest reference/research-sessions/*.md — feature its protein/$ standouts as a mini-post, credit the real SFA source"
  status: pending

- id: mrt_line_protein_map
  title: "Protein-per-dollar by MRT line / area (e.g. best options along the East-West line)"
  computation: "Group PREMISES by rough geographic area (lat/lng clustering or postal-code district prefix), rank top protein/$ items per cluster — only run once PREMISES coverage in that area is dense enough to be a real comparison, not a single data point"
  status: pending
```

## Rules for the post-copilot when using this file

- Pick the oldest `pending` theme (array order = priority), or the least-recently-`used` theme if all are used, so themes rotate rather than repeat back-to-back.
- Never post two themes to the same subreddit within a rolling 14-day window — check the digest history for this.
- If a theme's `computation` can't currently produce at least 8-10 solid rows from real, non-fabricated data, skip it and try the next theme in this run rather than posting a thin list — note the skip in the digest and leave its status as `pending`.
- After a theme is actually posted (confirmed by the user later, not by this task, since posting itself is human-gated), a future manual/task update should flip its `status` to `used` and set `lastUsed`/`subreddit` — the copilot itself only reads this file, it doesn't need to write status changes since it never confirms an actual publish happened.
