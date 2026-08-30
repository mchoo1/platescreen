# Schema history

The current data model — `Brand` / `Premises` / `MenuItem` (+ the unpopulated
`GroceryProduct`) — is documented in full in `../../CLAUDE.md` section 4.
This file only records *why* it looks the way it does, for anyone curious
about the prior design.

## The 2026-08-20 restructure

Before 2026-08-20, PlateScreen used a single flat `Outlet` type that
conflated brand identity (name, cuisine, menu) with physical premises
(address, coordinates, licence) into one row. That broke down once real
Singapore SFA data was involved, because the food/retail landscape has
several genuinely different shapes a single flat row can't represent well:
a standalone restaurant (1 brand = 1 place), a chain (1 brand, many
branches, each usually separately licensed), an individually-licensed
hawker stall (brand and premises really are the same tiny business), a
food-court concession (the SFA licence belongs to the *operator* for the
whole premises, not the stall), and a grocery/supermarket chain (a product
catalog, not a dish menu). Forcing all five into one `Outlet` shape produced
concrete bugs at the time: fabricated placeholder "food_court_stall"
outlets with no real premises or menu, `fairprice`/`store_fairprice`
existing as two separate rows for one real brand, and chain branches living
as a nested array that couldn't be queried or edited as their own rows.

The fix was the current three-table split — `Brand` (identity), `Premises`
(one row per real physical location, branches included), `MenuItem`
(renamed from `FoodOption`, FK to `Brand`) — plus a `GroceryProduct` type
reserved for packaged SKUs (never populated; see `ROADMAP.md`). This is now
the live, implemented schema, not a proposal.

**Full original proposal (all five real-world shapes it identified, the
concrete bugs found, and the schema options considered before settling on
this one) is preserved at `archive/database-restructure-proposal-2026-08-20.md`**
— read it if you want the complete reasoning rather than this summary.

## Status

Done, implemented, stable. No open schema-restructure work — `GroceryProduct`
remaining unpopulated is a data-coverage gap (real per-SKU research
unstarted), not a schema problem.
