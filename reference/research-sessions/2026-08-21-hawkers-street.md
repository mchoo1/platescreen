# 2026-08-21 — Hawkers' Street: named brands within an operator, at multiple operator premises

## What this addresses

The Brand/Premises schema already supported this case in principle (`Brand.operatorId` existed since the 2026-08-20 restructure) but nothing had ever populated it — kopitiam/koufu/foodfare were only modeled as the *operator's own* generic presence, with zero named concession brands underneath them. Hawkers' Street (hawkersstreet.com.sg, run by Select Group) is a clean real-world example of the gap the user flagged: unlike a generic "Western Stall" inside a Koufu food court, Hawkers' Street's internal stalls are real, named, independently-branded businesses (Tai Wah Pork Noodles, Fei Fei Roasted Noodle, etc.) that **each appear at multiple Hawkers' Street mall locations** — a proper N:M relationship between stall-brand and physical premises, same shape as a franchise chain, except scoped to one operator's premises network.

## Data added (sourced from hawkersstreet.com.sg/brands/ and /outlets/, both fetched directly — nothing fabricated)

- **1 new Operator**: `hawkers_street` (Select Group)
- **1 new operator-level Brand**: `hawkers_street` itself (type `food_court`, zero menu items — same treatment as kopitiam/koufu/foodfare), with **8 real Premises** — the physical mall locations, addresses taken directly from the operator's own outlets page and geocoded via OneMap:

  | Premises | Address |
  |---|---|
  | ION Orchard | 2 Orchard Turn, #B4-66, S238801 |
  | 100AM Mall | 100 Tras St, #04-05/06, S079027 |
  | Tampines 1 | Tampines Central 1, #05-05/06/07, S529536 |
  | Bukit Panjang Plaza | 1 Jelebu Road, #03-08, S677743 |
  | EastPoint Mall | 3 Simei Street 6, #03-06-07, S528833 |
  | Tang Plaza | 310 Orchard Rd, Basement 1, S238864 |
  | Square 2 | 10 Sinaran Dr, #04-14 to 80 (various units), S307606 |
  | The Clementi Mall | 3155 Commonwealth Ave W, #04-20/21/22, S129588 |

- **27 new named stall Brands**, each `type: food_court_stall`, `operatorId: hawkers_street`, with a real cuisine tag and description sourced from its own hawkersstreet.com.sg page. Two (Kaki Makan, Thai Makan by Thai Dynasty) are tagged `halal` — their own pages explicitly state this. Raja Wok's page only says "halal-friendly" (not an explicit certification claim) — deliberately NOT tagged, left for the research queue to verify properly.
- **59 new Premises** — one row per (stall-brand, mall) pair the brand's own page listed under its "LOCATION" section, e.g. Tai Wah Pork Noodles → 5 Premises (Tampines 1, Bukit Panjang Plaza, EastPoint Mall, Tang Plaza, 100AM Mall).
- **27 new RESEARCH_QUEUE entries** — Brand+Premises exist for all 27, but zero MenuItems (no prices/macros were on the source pages, only marketing descriptions and signature-dish mentions) — queued for the existing daily research task, same treatment as the 590 hawker stalls from the prior restructure.

## What was deliberately left out

The outlets page also showed several additional stall logos (e.g. "Hwa Heng Beef Noodle", "Da Po", "545 Original", "Ricky R", "Chinatown Tan's Tutu Kueh", "The Neighbourwok", and a few others) that don't have a corresponding described entry on the brands page — no name confirmation beyond a filename, no description, nothing to verify against. Rather than guess a name from an image filename, these are left out entirely. A future pass revisiting hawkersstreet.com.sg (their site appears to be actively adding new stalls) could pick these up once they get proper brand-page entries.

Top 1 Home Made Noodle's own brand page lists only EastPoint Mall, but the Tang Plaza outlet page's brand list also shows its logo — a likely second location not yet reflected on its own page (or a site inconsistency). Left at 1 Premises (trusting the brand's own stated location) rather than guessing; worth re-checking in a future pass.

## Generalization

This same pattern (Operator → own generic Brand+Premises, PLUS real named concession Brands with `operatorId` set, each with their own Premises at every operator location they appear in) is exactly how Koufu/Kopitiam/Foodfare's real named concessions (Ajisen Ramen inside a Koufu food court, etc.) should eventually be modeled too, once/if that research gets done — the schema doesn't need to change again, just more data.

## Verification

- `npx tsc --noEmit` — clean
- `npm run build` — compiled successfully, 4/4 static pages
- 776 total brands (was 748, +28), 1,788 total premises (was 1,721, +67), 4 operators (was 3, +1)
- 0 orphaned premises
- Spot-checked: Tai Wah Pork Noodles resolves to exactly 5 distinct Premises rows, matching its own page's stated locations
