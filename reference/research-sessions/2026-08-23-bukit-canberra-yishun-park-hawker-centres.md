# 2026-08-23 (3rd pass) — Bukit Canberra & Yishun Park Hawker Centres

**Trigger:** direct user instruction — "do the same for hawker centers in singapore," following
the Food Junction/Fei Siong/Koufu batches earlier this session. This applies the same
sitemap-discovery technique to independent NEA hawker centres, not just food-court chains.

## Starting point

103 hawker centres already existed in premises.ts from the 2026-08-20 SFA-licensee restructure,
each with 6 real (but not deeply researched) named stalls. 9 of those had already been deep-
researched with 8-43 real stalls each in an earlier session (Tekka, Maxwell, Lau Pa Sat, Newton,
Chinatown Complex, Old Airport Road, Golden Mile, Geylang Serai, Whampoa, plus Ci Yuan from
earlier this session). This pass targeted the rest — specifically the newer NEA "Hawker Centre
3.0" venues, which are run by private operators (unlike traditional NEA-managed centres) and
often have their own dedicated website.

## What was checked

The NEA's official operator-list PDF has moved and could not be located at a working URL, so
operators were identified via web search instead: Canopy Hawkers Group (Bukit Canberra, and
reportedly taking over Yishun Park from Jul 2026), Timbre+ Hawkers (One Punggol, historically
Yishun Park), FairPrice Group Hawker Centre Pte Ltd (Pasir Ris Central). Domain-pattern probing
found working sites for Bukit Canberra (bukitcanberrahc.sg), One Punggol (onepunggolhc.sg), and
Yishun Park (yishunparkhc.sg). No dedicated site was found for Pasir Ris Central, Anchorvale
Village, Jurong West, Bukit Panjang, Margaret Drive, or Market Street hawker centres.

## Bukit Canberra Hawker Centre (Canopy Hawkers Group)

WordPress site with a `wp-sitemap-posts-portfolio_page-1.xml` sitemap listing all 44 stalls as
individual pages. Each page's `<title>` tag holds the real trading name (e.g. "Bukit Canberra
Hawker Centre | The Cheeky Chick"), plus a "Stall Number" custom field with the unit. The URL
slug for each page is a cuisine-category label assigned when the post was first created — several
no longer match the current tenant at all (slug `porridge` → title "Teochew Fish Soup", slug
`indian-rojak` → title "Hock Kee Teochew Noodle", slug `mixed-vegetarian-rice` → title
"Al-usroh"). Because of this, cuisine text and dietTags were derived from the stall's own
name/title wherever it conflicted with the slug, rather than trusting the slug — this matters
most for dietTags (halal/vegetarian), where trusting a stale slug could mislabel a stall's diet
suitability. 2 units ("Coming Soon") were excluded as not yet real. 41 real Brand rows added, 42
Premises rows (Kopi Tan occupies 2 adjacent units, #01-22 and #01-23). Address: 21 Canberra Link,
Singapore 756973, geocoded once for the building. New Operator `canopy_hawkers`.

## Yishun Park Hawker Centre (Timbre+ Hawkers)

Same WordPress pattern, different custom post type (`hawkers-sitemap.xml`, 34 stall pages). A
meaningful difference from Bukit Canberra: 9 of the 34 slugs cleanly 302-redirect to the
homepage instead of serving stale content — read as retired/renamed stalls and excluded, no
content-mismatch risk here since WordPress correctly redirects away from unpublished/trashed
posts rather than serving something wrong. The remaining 25 pages each have a real trading name
plus a "name / cuisine / #unit" block in the visible page body — cuisine text here is the
operator's own phrasing, not slug-derived, so it was trusted directly. 25 real Brand rows, 27
Premises rows (XinLongXing Modern Tze Char spans 3 adjacent units, #01-28/29/30; Tuck Shop spans
one compound unit, #01-44/45). Address: 51 Yishun Avenue 11, Singapore 768867, geocoded once.

New Operator `timbre_plus_hawkers` rather than reusing `canopy_hawkers`: the site's own branding
throughout is Timbre+ Hawkers Pte Ltd (nav bar says "Timbre App," footer contact is
@timbregroup.asia), even though press coverage reports Canopy Hawkers Group taking over
operations from July 2026. The data reflects what the source site itself says, not the reported
handover — worth revisiting once/if the site itself updates its branding and stall roster.

## Not completed: One Punggol Hawker Centre

Same operator family (ex-Timbre+), same sitemap pattern (31 stall slugs found), but every
individual stall page inconsistently 302-redirects to the homepage regardless of User-Agent,
Referer, or cookies tried. One attempt with an arbitrary test cookie returned a 200 once, but was
not reproducible on retry — looks like server-side bot detection or a caching quirk rather than a
clean per-post redirect like Yishun Park's stale slugs. Not pursued further with raw curl; a
future attempt could try browser automation instead.

## Also retried: Buangkok Hawker Centre

Retried again this pass (per the standing "revisit later" note) — still a consistent HTTP 500,
unchanged from every prior attempt.

## What this doesn't do yet

Same macro gap as every batch this session: real names, units, and addresses only — no MenuItem
rows, since no real calorie/protein/carb/fat data was available from any of these sources and
none was fabricated.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. Scripted checks: 1,699 total brands (0 duplicate
IDs), 4,631 total premises (0 orphaned), canopy_hawkers: 41 brands / 42 premises (0 missing
lat/lng), timbre_plus_hawkers: 25 brands / 27 premises (0 missing lat/lng).
