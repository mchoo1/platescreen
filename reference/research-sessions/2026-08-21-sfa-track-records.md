# 2026-08-21 — SFA "Track Records" xlsx enhancement (Business Name field)

## What this addresses

The 2026-08-20 restructure matched brands against SFA/data.gov.sg's licensed-establishment
dataset by **licensee name** (the registered corporate entity) — precise, but blind to cases
where a corporate entity operates multiple public-facing banners (Cold Storage Singapore
(1983) Pte Ltd also holds licences for Giant, 7-Eleven, and other Dairy Farm banners) or where
the public brand name isn't in the entity name at all. 43 brands were left at zero coverage.

The user uploaded 8 xlsx exports from SFA's own "Track Records" tool
(sfa.gov.sg/tools-and-resources/track-records), one per licence grade bucket, 52,101 rows
total after decoding (`_x0020_`-style XML escapes were used for spaces/punctuation in the
raw cells). Critically, this export includes a **Business Name** field the data.gov.sg API
dataset does not — the storefront-facing name, distinct from the registered licensee.

## Method

For each target brand, searched `businessName` (not `licenseeName`) for the brand's public
name, then **sample-verified every match** (businessName + licenseeName + address) before
trusting it, per this project's standing "never bulk-trust a string match" rule. Rejected
brands whose matches turned out to be unrelated companies with a coincidentally similar name.

## Resolved (39 brands, 1,660 new premises, all businessName-confirmed)

| Brand | Premises | Brand | Premises |
|---|---|---|---|
| 7-Eleven | 392 | Popeyes | 22 |
| Subway | 146 (was 2) | Sushi Express | 22 |
| FairPrice (plain) | 124 (was 25, see correction below) | Don Don Donki | 21 |
| Sheng Siong | 90 (was 1) | Maki-San | 21 |
| KOI Thé | 88 | Aston's Specialities | 20 |
| Luckin Coffee | 88 | Toast Box | 19 |
| Old Chang Kee | 74 | Ichiban Boshi | 15 |
| Cold Storage | 52 (was 0 — see below) | Krispy Kreme | 15 |
| LiHo | 51 | Shake Shack | 12 |
| Mixue | 48 | Auntie Anne's | 12 |
| Boost Juice | 42 | SaladStop! | 12 |
| Stuffd | 42 | A&W | 10 |
| Chagee | 41 | Llaollao | 5 |
| MOS Burger | 27 | Project Açaí | 4 |
| FairPrice Finest | 27 | Carl's Jr. | 3 |
| Wingstop | 26 | Five Guys | 2 |
| Giant | 22 (was 0 — see below) | Dosirak | 2 (partial, see below) |
| Jollibee | 22 | The Saladbox | 1 |
| Guzman y Gomez | 23 | | |
| Dunkin' | 23 | | |

**Giant and Cold Storage — the key unblock.** Both were excluded on 2026-08-20 because their
shared licensee "Cold Storage Singapore (1983) Pte Ltd" also covers other Dairy Farm banners,
and address text gave no reliable hint which banner a given record actually was. Business Name
resolves this cleanly: records under that licensee say `businessName: "Giant"` /
`"Giant Supermarket"` or `"Cold Storage"` explicitly. Verified this isn't circular — checked a
sample of each and the businessName consistently matches the banner, independent of licensee.

## Data quality correction — FairPrice mislabeling found and fixed

Cross-checking the existing 25 "fairprice" premises from the 2026-08-20 session against this
new dataset (by licence number) surfaced a real bug: **4 of them were actually Cheers or
7-Eleven locations**, mislabeled as FairPrice because they share NTUC's licensee entity
(`fairprice_p1421` was businessName "7-Eleven"; `fairprice_p1423`, `fairprice_p1428`,
`fairprice_p1444` were "Cheers"/"Cheers Convenience Store"). Removed. A further **11 of the 25**
sit at petrol-station addresses (Esso/Mobil/ExxonMobil) — the same banner-ambiguity pattern
documented for Cold Storage/Giant, and this dataset's snapshot didn't include their licence
numbers to confirm either way — removed rather than guessed. The remaining 10 original +
124 newly-added (`businessName` exactly "FairPrice"/"Fairprice"/"FAIRPRICE", banner-excluded
from Xpress/Finest/hawker-centre variants) are the final 124.

**FairPrice Xpress and FairPrice Finest** — previously undifferentiated (the old dataset had
no way to split banners under NTUC's shared licensee) — are now split cleanly using
businessName ("FairPrice Xpress" vs "FairPrice Finest" vs plain), 8 and 27 premises
respectively.

## Rejected — confirmed false positives, still zero coverage

- **Grain** — 18/28 businessName hits across two sessions now, all unrelated companies
  (Hundred Grains, Grains & Co., Grain Traders, Natural Grain Pte Ltd) coincidentally
  containing the word "grain." Not resolvable via this method.
- **Wendy's** — 3 hits, all unrelated small operators ("Aunty Wendy" school canteen stall,
  home-based "Wendy's kitchen"/"Wendy's Snack"). The actual Wendy's burger chain does not
  appear to be currently SFA-licensed in Singapore under any matchable name.
- **Banquet** — 38 hits, all hotel banquet/catering service listings (Raffles Sentosa,
  Pullman Hotel central kitchen), none the Banquet foodcourt chain.
- **Gong Cha** — zero hits, consistent with most bubble-tea chains registering each outlet
  under a distinct franchisee shell with no shared identifiable string.
- **Bonchon** — zero hits this round (the 1 premises found on 2026-08-20 isn't in this
  dataset's grade buckets — possibly a licence renewal gap). Still 1 total.

## Judgment calls made — flagged for anyone reviewing this data

- **Aston's Specialities** — folded "Andes by Astons," "Astons Prime," "Astons Steak & Salad,"
  and plain "Astons Specialities" all under the single existing `astons` Brand, since the
  database doesn't yet model Astons' sub-concepts separately. All are confirmed real Aston
  Food & Beverage Specialities Pte Ltd locations. A future pass could split these into
  distinct Brands if that granularity becomes useful. Excluded 2 "Gaston Pte Ltd" records —
  a coincidental substring match ("Aston" inside "Gaston"), an unrelated restaurant.
- **Ichiban Boshi** — included 2 records that are shared listings with sister R&S Group
  brands ("Idaten Udon / Kuriya Japanese Market / Ichiban Boshi") — these are real
  co-located Ichiban Boshi premises, just sharing a kitchen/listing with other brands.
- **Mixue** — included one outlier record (licensee "Wei Min F&B," businessName "mixue")
  that breaks the pattern of Mixue's other franchisee shell-company names — checked it has
  no other unrelated listings under that licensee, so trusted the businessName signal.
- **Dosirak** — only added 2 premises (businessName exactly "DOSIRAK"). Deliberately excluded
  ~7 "Bibimbap/Dosirak" listings under a different licensee (Teng Sheng Brothers) — that's a
  dual-branded combo concept name, and it's unconfirmed whether it's the same Dosirak brand
  in this database or an unrelated bibimbap concept that happens to share the word. Left in
  `branchQueue.ts` for manual confirmation.

## Geocoding

1,660 new addresses geocoded via OneMap, sequential single-worker requests per the
established rate-limit lesson (concurrent requests degrade success sharply). 1,642/1,660
succeeded (98.9%) across repeated small batches; 18 addresses couldn't be geocoded (mostly
newer or oddly-formatted addresses not in OneMap's index) — left with `lat`/`lng` null.

## Numbers

| | Before this session | After |
|---|---|---|
| Brands | 776 | 776 (unchanged — only added premises to existing brands) |
| Premises | 1,788 | 3,404 |
| Branch queue (brands still needing research) | 46 | 9 |

## Verification

- `npx tsc --noEmit` — clean
- `npm run build` — compiled successfully, 4/4 static pages
- 0 orphaned premises (every `brandId` resolves to a real Brand)
- 0 duplicate premises ids
- 3,386/3,404 premises have coordinates

## Files touched

- `src/lib/premises.ts` — regenerated in full (chunked into 9 `PREMISES_N` arrays now, up
  from 5) rather than hand-edited, given the scale of additions/removals
- `src/lib/branchQueue.ts` — resolved entries removed, remaining 9 entries' notes updated
  with this session's findings

## CSV exports

`PlateScreen_brands_2026-08-21b.csv`, `PlateScreen_premises_2026-08-21b.csv`,
`PlateScreen_menu_items_2026-08-21b.csv`, `PlateScreen_operators_2026-08-21b.csv` — written to
the user's Desktop (suffixed `b` since same-day files from the earlier Hawkers' Street export
already existed).
