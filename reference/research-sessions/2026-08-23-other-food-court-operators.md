# 2026-08-23 — Other major SG food-court/hawker-centre operators (Food Junction, Fei Siong/Ci Yuan)

**Trigger:** continuation of the same-week instruction to cover "all other major foodcourts/
hawker centres in Singapore" beyond the original 4 (Kopitiam, Koufu, NTUC Foodfare, Hawkers'
Street). NTUC Foodfare was explicitly skipped per direct user instruction this session (see
`researchQueue.ts` UPDATE note) — this batch covers other candidates instead.

## Candidates checked

- **Food Junction** (BreadTalk Group's food-court chain) — real find, added.
- **Fei Siong Group** — real find, added (and turns out to also operate Hawkers' Street,
  already in the database as a separate operator entry).
- **Banquet** — confirmed defunct. Widely reported as bankrupt/closed; its former locations are
  now largely operated as "Bagus"/"Bagus Food Hall" under Kopitiam. Intentionally left out as an
  operator rather than added as a dead one.
- **Deli Hub** — B2B catering/distribution only, no consumer-facing outlets to list.
- **S11** — old Flash-era site, effectively dead, no usable data.
- **Woodleigh Village Hawker Centre** — not yet operational. Its own homepage says the stall
  application period has closed and future availability will be posted later. Correctly zero
  stalls to add — a "nothing found" result, not a scraping failure.
- **Buangkok Hawker Centre** (buangkokhawker.com.sg) — returned a consistent HTTP 500 (empty
  body, no challenge page) across 3+ retries with varied headers and delays. Read as a likely
  real server-side outage rather than a WAF block. Left as a "revisit later" item.

## Food Junction — what was found

Food Junction's own "Our Brands" page lists named house-brand concessions operating inside its
food-court venues (not just generic stalls) — 4 brands: Go Teppan Go, Toast Junction, Ke/Quench,
and Fireyaki. 3 of the 4 had their venue clearly tagged on the source page; Fireyaki's venue tag
was missing from the page's own text (verified against raw HTML — the page genuinely jumps from
Fireyaki's "Must Try" list straight to the footer, no omission on my end). Cross-verified
Fireyaki's location independently via a foodpanda listing ("Fireyaki (Food Junction - Junction
8)"), which matched the same venue as the other 3 Junction 8 brands, so it was added with that
venue rather than left out or guessed.

**Added:** new Operator `food_junction`. 4 Brand rows (`type: "food_court_stall"`,
`operatorId: "food_junction"`), 10 Premises rows across Food Junction's Singapore venues, all
geocoded via OneMap.

## Fei Siong Group — what was found

Fei Siong Group operates several hawker-centre-format sites under its own sub-domains. Of its
sub-sites, **Ci Yuan Hawker Centre** (ciyuanhawker.com.sg) has a plain static "Our Stalls" page —
no JS, no map widget — listing all stalls as text with unit number, stall name, cuisine, and
operating hours. 38 stalls found; 1 dropped as a bare generic label ("Hot & Cold Drink Stall",
consistent with the same generic-name blocklist principle used for the Kopitiam scrape). 37 kept.

Fei Siong Group is also confirmed to be the operator behind **Hawkers' Street**, which was
already a separate operator entry in this database from an earlier session — no changes made to
that existing data, just noted for context.

**Added:** new Operator `fei_siong`. 37 Brand rows (`type: "food_court_stall"`,
`operatorId: "fei_siong"`), 37 Premises rows (Ci Yuan Hawker Centre), all geocoded via OneMap.

## What this doesn't do yet — the macro gap

Same gap as every other batch this session: real stall names, real addresses, no MenuItem rows
(no calories/protein/carbs/fat data was available from any of these sources, and none was
fabricated). None of these 41 new brands will appear in the app's core calorie/protein screener
until a future macro-research pass adds real dish data.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. Scripted checks: 1,630 total brands (0
duplicate IDs), 4,553 total premises (0 orphaned), all 47 new premises (10 Food Junction + 37 Ci
Yuan) have real lat/lng, `operators.ts` lists all 6 operators correctly (kopitiam, koufu,
foodfare, hawkers_street, food_junction, fei_siong).

## Still outstanding

Buangkok Hawker Centre (HTTP 500, retry later); Koufu's remaining food-court-format brands (The
Kitchen, The Green Hut, Rasapura Master — guessed URL slugs still 404, need the actual link from
Koufu's Our Brands listing page); the macro-research pass across every brand added this session
(Kopitiam's 839, Koufu's 3 sub-brands, Food Junction's 4, Fei Siong/Ci Yuan's 37); NTUC Foodfare's
scope question (explicitly deprioritized per user instruction, not to be revisited without new
direction).
