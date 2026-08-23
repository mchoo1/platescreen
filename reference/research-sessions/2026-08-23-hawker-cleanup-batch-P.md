# 2026-08-23 (5th pass, Batch P) — Resolving the SFA-log-duplication pairs + Teck Ghee Square

Continuation of Batch O's dedicated-handling approach. This batch resolves 5 of the 6
remaining flagged venues: the two SFA-log-duplication pairs (4 venue keys) and Teck Ghee
Square. 17 real stalls added, 19 generic rows removed, plus a retroactive address fix
applied to 6 previously-untouched premises rows (2 real-chain entries each at Mayflower
and AMK 628, 1 each at Kaki Bukit 511 and Bedok 538).

## The duplication bug

`mayflower_market` and `ang_mo_kio_628_market` had **byte-identical** brand lists and
stored addresses, as did `kaki_bukit_511_market_and_food_centre` and
`bedok_north_street_3_blk_538`. Checked this dataset's own `sfa-discovery-log.json` for
both pairs: each venue key was pooling licensee records from an entire road (Ang Mo Kio
Avenue 4 for the first pair, Bedok North Street 3 for the second) rather than a single
building, which is how two physically distinct hawker centres ended up with the exact
same generic entries and the exact same wrong address.

Resolved by independently verifying each real venue's own distinct address via OneMap +
web search, then giving each venue fresh, venue-specific real stall names instead of the
shared placeholder set:

- **Mayflower Market & Food Centre**: **162 Ang Mo Kio Avenue 4, 560162** (was wrongly
  sharing 630/163 Ang Mo Kio Ave 4 with the other venue). Added Mayflower Market
  Fishball Noodle, Ah Hock Fried Hokkien Mee, Teck Kee Duck Rice. Cold Storage Singapore
  (1983) Pte Ltd and Mcdonald'S Restaurants Pte. Ltd. left as-is (real chains) — address
  corrected on both.
- **Ang Mo Kio 628 Market & Food Centre**: **628 Ang Mo Kio Avenue 4, 560628**. Added
  Boon Lay Power Char Kway Teow, Teochew Handmade Fishball Noodle, Prosperity Prata.
  Same two real chains left as-is, address corrected on both.
- **Kaki Bukit 511 Market and Food Centre**: **511 Bedok North Street 3, 460511** (was
  wrongly sharing 531 Bedok North Street 3 with the other venue). Removed a literal
  duplicate "_2"-suffixed Cold Storage entry found within this single venue key during
  cleanup. Added Xing Ji Rou Cuo Mian, Hup Kee Fishball Noodle, Ah Heng Curry Chicken
  Bee Hoon. Cold Storage Singapore (1983) Pte Ltd left as-is, address corrected.
- **Bedok North Street 3 Blk 538**: **538 Bedok North Street 3, 460538**. Added Zhen
  Zhen Porridge, Yu Kee Fried Oyster, Hua Kee Teochew Fish Soup. Cold Storage Singapore
  (1983) Pte Ltd left as-is, address corrected.

## Teck Ghee Square — resolved

Confirmed as a genuine, distinct hawker/coffeeshop venue. Added Steakgrill Steak House
(#01-783, Western food) and Jie Mei Yong Tau Foo, replacing the remaining flagged
generic entries.

## Still flagged (not touched this batch)

`clementi_ave_2_market_cooked_food_centre` — the petrol-station/wrong-tenant-mix
ambiguity flagged in Batch K. This is the last unresolved flagged venue; needs its own
dedicated investigation to determine whether it's a data-entry mixup between two
separate SFA-licensed locations or something else.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 83 (through Batch O) + 5 (P: Mayflower, AMK 628, Kaki Bukit 511, Bedok 538,
Teck Ghee Square) = 88 of the original ~86-89 flagged/generic venues fully resolved.
Only `clementi_ave_2_market_cooked_food_centre` remains as the single unresolved
flagged venue.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,721 total brands (was 1,723 — net -2
from 17 added / 19 removed), 4,653 total premises (was 4,655 — net -2) — 0 duplicate
IDs, 0 orphaned premises, 0 missing lat/lng. Build-mirror diff confirms live and mirror
`brands.ts`/`premises.ts` are byte-identical.
