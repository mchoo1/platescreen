"""
Branch geocoding script — populates OUTLET_BRANCHES (src/lib/outletBranches.ts)
for multi-location chains, using each brand's official store-address list and
OneMap (Singapore Land Authority) for real lat/lng by postal code.

OneMap search endpoint (no API key needed for basic search, despite the
"Authentication token missing" notice it returns — that's a soft warning, the
results are still real and correct):
  https://www.onemap.gov.sg/api/common/elastic/search?searchVal=<postal_or_address>&returnGeom=Y&getAddrDetails=Y&pageNum=1

Set a real User-Agent header — requests without one get silently dropped by
OneMap after the first few calls in a burst (returns a response that fails to
parse, not a clean error). Retry failed lookups 3-4x with ~1s backoff before
falling back to a broader address-text search (drop the postal code, search
the building/street name instead) — this recovered the one entry postal-code
search couldn't resolve (NTU's N2.1 block) in the McDonald's run.

Workflow used for McDonald's SG (2026-08-20):
1. Fetched https://www.mcdonalds.com.sg/sites/default/files/2024-07/McDonald's%20Store%20Address.pdf
   (official store list, plain text extraction).
2. Parsed into {name, address, postal} records — split on "McDonald's ",
   extract trailing 6-digit postal code per record.
3. Geocoded each postal code via OneMap, took the top result's LATITUDE/LONGITUDE.
4. Wrote one OutletBranch record per branch, source: "official_store_list".

Result: 112/113 branches resolved on the first two passes (93 first pass,
+19 on retry with User-Agent fix, +1 via address-text fallback for NTU).

Re-run this same pattern for the next chain in the branch-backfill queue
(src/lib/branchQueue.ts): find the brand's official SG store-locator page or
downloadable address list first (never estimate branch counts or addresses
from memory), then geocode via OneMap the same way.
"""
