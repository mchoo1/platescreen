# 2026-08-22 — Kopitiam real stall scrape (1,441 pages, 839 brands added)

**Trigger:** direct user instruction — "use browser to search for stores within kopitiam, koufu,
food fare and all other major foodcourts/hawker centres in singapore," following the earlier
restructure that removed Kopitiam as a fake single mega-brand and an earlier pass that reported
Kopitiam's outlet finder as a dead end.

## The breakthrough

Kopitiam's outlet-finder page (`kopitiam.biz/our-outlets/`) really is a JS-only OneMap widget with
no usable REST/AJAX endpoint reachable from outside the page — that earlier finding held up under
a second look (network requests, inline scripts, `wp-json` all still come up empty).

But the site also ships a standard WordPress SEO sitemap, and it was never checked:
`sitemap_index.xml` lists a `stall-sitemap.xml` and `stall-sitemap2.xml` containing **1,441
individual stall detail pages** (e.g. `kopitiam.biz/stall/kopi-kiosk-changi-airport-terminal-3/`),
each server-rendered with clean schema.org `Restaurant` JSON-LD: name, `servesCuisine` (dish names),
full street address + postal code, phone, opening hours, and `branchOf.name` (the parent venue).
This is a completely different, fully public data source from the JS map widget, and it isn't
Cloudflare-protected — only the site's `/wp-admin/admin-ajax.php` map endpoint is.

## What was done

1. Fetched both sitemap files, collected all 1,441 stall URLs.
2. Fetched all 1,441 stall pages directly (Python + `concurrent.futures`, 20 workers — no browser
   needed once the sitemap was known; a handful hit transient Cloudflare rate-limiting and succeeded
   on retry with a delay). Parsed the JSON-LD off each page.
3. HTML-unescaped all fields (several venue names carried raw entities like `&#8211;`, which would
   have created accidental near-duplicate groups).
4. Deduplicated by stall name with the `(venue name)` suffix stripped — the same stall name recurs
   across many venues for Kopitiam's own house-brand kiosks and concessions (906 raw groups before
   filtering).
5. Filtered out 58 groups whose name is a bare cuisine/dish-category label with no distinguishing
   identity ("Chicken Rice", "Fish Soup", "Mala Xiang Guo", etc.) — full blocklist and reasoning in
   `reference/data/kopitiam-generic-filter.md`. This is the same "generic adds no value" principle
   from the 2026-08-22 database usefulness audit, applied at the individual-stall level this time.
6. Excluded 20 stall records belonging to 3 venues with no published address anywhere on the site
   (504 Yishun, 542B Serangoon North, Pasir Ris 735) rather than guessing coordinates — 8 of those
   stalls had no other location and so don't appear as Brands at all.
7. Geocoded all 75 remaining unique postal codes via OneMap (1 needed a street-address fallback
   query instead of postal-only).
8. Generated **839 Brand rows** (`operatorId: "kopitiam"`, `type: "food_court_stall"`) and **1,183
   Premises rows**, formatted to match the existing file conventions exactly, and appended to
   `brands.ts` / `premises.ts`.
9. Adding 839 brands pushed the flat `BRANDS` array over TypeScript's TS2590 complexity limit for
   the first time — **rechunked `brands.ts` into `BRANDS_1..4` (~400 each) + a spread export**,
   the same pattern `premises.ts` already used. Automated with a brace-depth parser so the existing
   747 brands were repartitioned losslessly (verified via `diff` after rechunking — no content
   change, purely a chunking-boundary change).
10. Preserved the real scraped dish names (no macros) in `reference/data/kopitiam-stall-dishes.json`
    for a future research pass, and updated the `kopitiam` entry in `researchQueue.ts` to describe
    exactly what's left instead of "start from scratch."

## What this doesn't do yet — the macro gap

None of the 839 new brands have `MenuItem` rows. The scraped data gives real dish **names** only —
never calories/protein/carbs/fat — and this project's `MenuItem` type requires real macro numbers
on every field (never fabricated). A `Brand` with zero `MenuItem`s doesn't render in the calorie/
protein screener (`buildScreenerRows()` joins off `MENU_ITEMS`), so these 839 stalls exist for
location/map purposes right now but won't appear in the app's core ranking view until a macro
research pass adds real dish data. This was surfaced to the user before building (given the 15-25x
scale jump over any single addition so far this session) and confirmed: add all 839 now, flag the
macro gap for later, rather than holding back on scale or fabricating numbers to make them render
immediately.

## Verification

`npx tsc --noEmit` clean (after the brands.ts rechunk), `npm run build` clean. Scripted checks:
1,586 total brands / 0 duplicate IDs, 4,449 total premises / 0 orphaned premises, all 1,183 new
Kopitiam premises have real lat/lng, `operators.ts` still lists Kopitiam correctly.

## Not done this pass

Koufu's remaining sub-brands (R&B Tea, Dough Culture, Nine Fresh, The Kitchen, The Green Hut,
Rasapura Master), NTUC Foodfare (still an open B2B-scope question), and the broader "other major
food courts/hawker centres in Singapore" (Banquet, Deli Hub, ABC Cooked Food, Chang Cheng Mee Wah,
Fei Siong Group, S11, Tenants Restaurant Management, etc.) are still outstanding — worth checking
each for the same kind of sitemap/JSON-LD shortcut before assuming a JS map widget is a dead end.
