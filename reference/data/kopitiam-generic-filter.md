# Kopitiam stall-name generic filter (2026-08-22)

Kopitiam's site (via its `stall-sitemap.xml` / `stall-sitemap2.xml` — 1,441 individual stall pages,
each with schema.org JSON-LD) names some concessions with a real, distinct business name (e.g.
"Heavenly Wang", "HJH Maimunah", "Ann Chin Popiah") and others with a bare cuisine/dish-category
label used as a placeholder when the concession has no branded identity (e.g. "Chicken Rice", "Fish
Soup", "Mala Xiang Guo"). The latter carry no more information than the dish itself and match this
project's standing "generic entries add no value" rule from the 2026-08-22 database usefulness audit
— so they were excluded from `brands.ts`/`premises.ts` rather than added as 58 more empty-identity
Brand rows.

## Exact blocklist applied (case-insensitive, exact match after whitespace normalization)

```
chicken rice, fish soup, steamed fish, western cuisine, western food, korean cuisine, thai cuisine,
indian cuisine, vietnamese cuisine, vietnam cuisine, japanese food, japanese cuisine, chinese cuisine,
indonesian cuisine, indonesian bbq, taiwanese cuisine, taiwan cuisine, mala xiang guo, mala hotpot,
mala, ban mian, ban mian / spinach, yong tau foo, yong taufoo, herbal soup, nasi lemak, bak chor mee,
wanton noodle, wanton mee, econ rice, economical rice, mixed rice, cai fan, chee cheong fan,
chee cheong fun, curry puff, pig organ soup, pig's organ soup, steamboat, hotpot, vegetarian,
vegetarian food, popiah, rojak, fried rice, fried noodle, prawn noodle, prawn mee, laksa, porridge,
dim sum, briyani, nasi briyani, nasi padang, hainanese chicken rice, roasted delight, mixed veg rice,
japanese and korean cuisine, handmade ndl, fried items & noodles, veggie food, hot/cold drink,
chicken hot pot, chicken pot, steamed gourmet, steamed gourmet & herbal soup, western gourmet,
indonesian food, malay food, chinese food, local food, local delight, local cuisine, grilled fish,
teppanyaki, fried hokkien mee, hokkien mee, bee hoon, pepper soup, beef noodle, beef noodles, dosai,
satay, fish head curry, curry fish head, tze char, spicy seoul classic, spicy seoul hotpot,
dry handmade noodle, kaya toast
```

58 stall groups matched this list and were dropped (full list preserved below). Everything else —
including borderline dish-derived names that still carry a distinguishing word or proper noun (e.g.
"What The Fish", "Old Hup Kee", "Confirm & Chop", "Kopi Kiosk") — was kept. This is a judgment call,
not a mechanical one; a future pass could review edge cases like "Ayam Penyet" (kept — arguably as
generic as "Chicken Rice", but reads more like a dish-as-brand-name at hawker stalls generally) if
the bar needs tightening further.

## Dropped (58)

Bak Chor Mee, Ban Mian, Ban Mian / Spinach, Chee Cheong Fan, Chee Cheong Fun, Chicken Hot Pot,
Chicken Rice, Curry Puff, Dim Sum, Econ Rice, Fish Soup, Fried Items & Noodles, Fried Rice,
Handmade NDL, Herbal Soup, Hokkien Mee, Hot/Cold Drink, Indian Cuisine, Indonesian BBQ, Indonesian
Cuisine, Japanese Cuisine, Japanese Food, Japanese and Korean Cuisine, Korean Cuisine, Local
Delight, Mala, Mala Hotpot, Mala Xiang Guo, Mixed Rice, Mixed Veg Rice, Nasi Lemak, Nasi Padang,
Pepper Soup, Pig Organ Soup, Porridge, Prawn Noodle, Roasted Delight, Rojak, Spicy Seoul Hotpot,
Steamboat, Steamed Fish, Steamed Gourmet, Steamed Gourmet & Herbal Soup, Taiwan Cuisine, Taiwanese
Cuisine, Teppanyaki, Thai Cuisine, Tze Char, Vegetarian, Vegetarian Food, Veggie Food, Vietnam
Cuisine, Vietnamese Cuisine, Wanton Noodle, Western Cuisine, Western Food, Western Gourmet, Yong
Tau Foo.

## Also excluded: unpublished-address venues

3 brand-new venues (504 Yishun, 542B Serangoon North, Pasir Ris 735) have no address anywhere on
Kopitiam's site yet (confirmed against both the stall pages and the `kpt_load_stalls` map-marker
endpoint — both return blank). Rather than guess coordinates, their 20 stall records were excluded
entirely. 8 of those stalls had no other location and so don't appear as Brands at all: Mr Prata,
Fried Chicken, Savoury Seafood, Hao You Ji Roasted Delights, Hao La Wei Mix Rice, Hao Lai Ke Lamian,
Tandoori House, Yong Li Coffee Station. Revisit once Kopitiam publishes these venues' addresses.
