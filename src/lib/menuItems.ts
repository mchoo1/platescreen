// Generated 2026-08-20 — one row per dish, FK to Brand.id (renamed from FoodOption/outletId).
// Untyped literal export (see MenuItem in types/db.ts) — screener.ts casts at the boundary.
// 2026-08-22: reassigned 2 items (tekka_roti_prata_egg, tekka_masala_prata) to the 2 new real
// Tekka prata brands split out during the generic-name cleanup (see brands.ts header note).
// 2026-08-24 (task #63, Batch A): added 35 menu items across the 5 Koufu in-house chains that
// had 0 MenuItems despite being real, consistent-menu brands with 84 outlets combined (Nine
// Fresh, Happy Hawkers, Dough Culture, R&B Tea, Grove) — first batch of the zero-menu-item
// cleanup (1,610 of 1,772 brands had none; see reference/research-sessions/
// 2026-08-24-zero-menu-koufu-batch-A.md). Dish names + prices are real, sourced per-brand
// (Dough Culture from Koufu's own site scrape, Nine Fresh/R&B Tea/Grove from their current
// public menus/reviews, Happy Hawkers from a PriceListo aggregation of an actual Koufu toast/
// beverage stall). Macros are estimated per dish type (confidence: "estimated"), same
// methodology used throughout this file - no macro here is an official published figure.
// 2026-08-24 (task #64, Batch B): added 64 menu items across 41 more zero-menu brands -
// 36 Kopitiam food-court concessions (dish names from reference/data/kopitiam-stall-dishes.json,
// Kopitiam's own site scrape) + 5 Hawkers' Street concessions (tai_wah_pork_noodle,
// tai_seng_fish_soup, hill_street_hainanese_curry_rice, pangs_hakka_ytf individually researched
// via web search - all real, some Michelin Bib Gourmand-recognised; hill_street_coffee_shop
// given generic kopi/toast items per the Happy Hawkers precedent, since it's a beverage/toast
// counter concept not a single dish). All 41 brands had >=4 outlets and zero MenuItems. Macros
// estimated per dish type per the same convention as Batch A. See reference/research-sessions/
// 2026-08-24-zero-menu-kopitiam-batch-B.md.
// 2026-08-24 (task #65, Batch C): added 128 menu items covering all 73 zero-menu stalls at
// Bedok Interchange Hawker Centre (the single highest-leverage remaining venue, per a
// per-venue audit of the ~1,460-brand long tail). Dish names are real, from
// reference/data/kopitiam-stall-dishes.json (Kopitiam's own site scrape). Macros/prices come
// from a dish-type lookup table (reference/data/dish-macro-lookup.py) built to keep this and
// future long-tail batches consistent - same dish type gets the same estimate everywhere in
// this file (e.g. every "Fried Carrot Cake" entry uses the same base figures), rather than
// re-eyeballing each one. See reference/research-sessions/2026-08-24-zero-menu-bedok-batch-C.md.
// 2026-08-24 (task #65, Batch D): added 103 menu items covering 61 of 62 zero-menu stalls at
// Lau Pa Sat (second-highest venue in the same per-venue audit). Dish names from
// reference/data/kopitiam-stall-dishes.json, macros from the same dish-macro-lookup.py table
// (extended with ~54 new dish types encountered here, e.g. Chilli Crab, Nasi Briyani, Beef
// Bulgogi). Two stalls (Omega Pork Noodle, Satay Noodz) had empty scrape entries - given a
// single dish inferred directly from the stall's own descriptive name rather than left
// uncovered. kopitiam_cheers (a convenience-store kiosk, not a food stall) was excluded
// entirely - out of scope for MenuItem. See reference/research-sessions/
// 2026-08-24-zero-menu-laupasat-batch-D.md.
// 2026-08-24 (task #65, Batch E): added 43 menu items covering all 41 zero-menu stalls at
// Bukit Canberra Hawker Centre (operator canopy_hawkers - not Kopitiam, so no cache hit;
// every stall individually researched via web search). Dish names/prices are real, sourced
// per-stall (foodpanda listings, sethlui/eatbook/danielfooddiary reviews, the venue's own
// site bukitcanberrahc.sg). Macros estimated per dish type via the same
// dish-macro-lookup.py table, extended with ~17 new dish types. See
// reference/research-sessions/2026-08-24-zero-menu-bukitcanberra-batch-E.md.
// 2026-08-24 (task #65, Batch F): added 36 menu items covering 34 zero-menu brands at Punggol
// Coast Hawker Centre (33 Kopitiam-cache matches + 1 individually-researched real prata chain,
// Srisun Prata). Also found and removed 5 duplicate Brand+Premises rows discovered during this
// batch (same address, same real stall, recorded twice under both a raw-SFA-licensee id and a
// cleaner Kopitiam-scrape id - kept the Kopitiam version). 1 brand (Cold Storage Singapore
// (1983) Pte Ltd) left zero-menu deliberately - looks like a stale generic-licensee-name
// artifact, not a real identifiable food stall; no menu items fabricated for it. See
// reference/research-sessions/2026-08-24-zero-menu-punggolcoast-batch-F.md.

export const MENU_ITEMS = [
  {
    id: "mcd_big_mac",
    brandId: "mcd",
    name: "Big Mac",
    emoji: "🍔",
    category: "Burgers",
    price: 6.75,
    calories: 558,
    protein: 28,
    carbs: 48,
    fat: 28,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_mcspicy",
    brandId: "mcd",
    name: "McSpicy",
    emoji: "🍔",
    category: "Burgers",
    price: 7.3,
    calories: 541,
    protein: 23,
    carbs: 50,
    fat: 28,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_double_mcspicy",
    brandId: "mcd",
    name: "Double McSpicy",
    emoji: "🍔",
    category: "Burgers",
    price: 8.15,
    calories: 833,
    protein: 38,
    carbs: 66,
    fat: 46,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_mcspicy_cheese",
    brandId: "mcd",
    name: "McSpicy with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 8.7,
    calories: 591,
    protein: 26,
    carbs: 51,
    fat: 32,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_double_mcspicy_cheese",
    brandId: "mcd",
    name: "Double McSpicy with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 9.45,
    calories: 883,
    protein: 41,
    carbs: 67,
    fat: 50,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_mcchicken",
    brandId: "mcd",
    name: "McChicken",
    emoji: "🍗",
    category: "Burgers",
    price: 3,
    calories: 391,
    protein: 15,
    carbs: 42,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_mcchicken_cheese",
    brandId: "mcd",
    name: "McChicken with Cheese",
    emoji: "🍗",
    category: "Burgers",
    price: 4.4,
    calories: 441,
    protein: 18,
    carbs: 43,
    fat: 22,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_cheeseburger",
    brandId: "mcd",
    name: "Cheeseburger",
    emoji: "🍔",
    category: "Burgers",
    price: 3.5,
    calories: 303,
    protein: 16,
    carbs: 32,
    fat: 12,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_double_cheeseburger",
    brandId: "mcd",
    name: "Double Cheeseburger",
    emoji: "🍔",
    category: "Burgers",
    price: 4.8,
    calories: 443,
    protein: 27,
    carbs: 34,
    fat: 22,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_triple_cheeseburger",
    brandId: "mcd",
    name: "Triple Cheeseburger",
    emoji: "🍔",
    category: "Burgers",
    price: 6.8,
    calories: 580,
    protein: 38,
    carbs: 34,
    fat: 32,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_hamburger",
    brandId: "mcd",
    name: "Hamburger",
    emoji: "🍔",
    category: "Burgers",
    price: 2.7,
    calories: 253,
    protein: 14,
    carbs: 31,
    fat: 8,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_quarter_pounder",
    brandId: "mcd",
    name: "Quarter Pounder with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 6.75,
    calories: 507,
    protein: 32,
    carbs: 38,
    fat: 25,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_double_quarter_pounder",
    brandId: "mcd",
    name: "Double Quarter Pounder with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 8.8,
    calories: 717,
    protein: 50,
    carbs: 39,
    fat: 40,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_mccrispy",
    brandId: "mcd",
    name: "McCrispy",
    emoji: "🍗",
    category: "Burgers",
    price: 7.4,
    calories: 638,
    protein: 24,
    carbs: 61,
    fat: 33,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_double_mccrispy",
    brandId: "mcd",
    name: "Double McCrispy",
    emoji: "🍗",
    category: "Burgers",
    price: 8.55,
    calories: 1004,
    protein: 41.2,
    carbs: 61,
    fat: 55.6,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_buttermilk_crispy",
    brandId: "mcd",
    name: "Buttermilk Crispy Chicken",
    emoji: "🍗",
    category: "Burgers",
    price: 7.75,
    calories: 739,
    protein: 26,
    carbs: 64,
    fat: 42,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_filet_o_fish",
    brandId: "mcd",
    name: "Filet-O-Fish",
    emoji: "🐟",
    category: "Burgers",
    price: 4.45,
    calories: 332,
    protein: 15,
    carbs: 38,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_double_filet",
    brandId: "mcd",
    name: "Double Filet-O-Fish",
    emoji: "🐟",
    category: "Burgers",
    price: 6.95,
    calories: 466,
    protein: 24,
    carbs: 48,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_nuggets_6pc",
    brandId: "mcd",
    name: "Chicken McNuggets (6pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 6.4,
    calories: 273,
    protein: 14,
    carbs: 17,
    fat: 16,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_nuggets_9pc",
    brandId: "mcd",
    name: "Chicken McNuggets (9pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 7.65,
    calories: 409,
    protein: 21,
    carbs: 26,
    fat: 24,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_mcwings_4pc",
    brandId: "mcd",
    name: "McWings (4pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 6.1,
    calories: 603,
    protein: 35,
    carbs: 25,
    fat: 41,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_egg_mcmuffin",
    brandId: "mcd",
    name: "Egg McMuffin",
    emoji: "🥪",
    category: "Breakfast",
    price: 4.55,
    calories: 289,
    protein: 18,
    carbs: 29,
    fat: 11,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_sausage_mcmuffin",
    brandId: "mcd",
    name: "Sausage McMuffin",
    emoji: "🥪",
    category: "Breakfast",
    price: 3.85,
    calories: 258,
    protein: 16,
    carbs: 29,
    fat: 9,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_sausage_mcmuffin_egg",
    brandId: "mcd",
    name: "Sausage McMuffin with Egg",
    emoji: "🥪",
    category: "Breakfast",
    price: 5.5,
    calories: 337,
    protein: 23,
    carbs: 30,
    fat: 14,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_double_sausage_mcmuffin",
    brandId: "mcd",
    name: "Double Sausage McMuffin",
    emoji: "🥪",
    category: "Breakfast",
    price: 5.1,
    calories: 327,
    protein: 23,
    carbs: 32,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_double_sausage_mcmuffin_egg",
    brandId: "mcd",
    name: "Double Sausage McMuffin with Egg",
    emoji: "🥪",
    category: "Breakfast",
    price: 6.6,
    calories: 406,
    protein: 30,
    carbs: 33,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_chicken_muffin",
    brandId: "mcd",
    name: "Chicken Muffin",
    emoji: "🥪",
    category: "Breakfast",
    price: 3.3,
    calories: 407,
    protein: 16,
    carbs: 38,
    fat: 21,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_chicken_muffin_egg",
    brandId: "mcd",
    name: "Chicken Muffin with Egg",
    emoji: "🥪",
    category: "Breakfast",
    price: 4.2,
    calories: 481,
    protein: 23,
    carbs: 39,
    fat: 26,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_scrambled_egg_chicken",
    brandId: "mcd",
    name: "Scrambled Egg Burger with Chicken",
    emoji: "🥪",
    category: "Breakfast",
    price: 5.7,
    calories: 556,
    protein: 30,
    carbs: 40,
    fat: 30,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_scrambled_egg_sausage",
    brandId: "mcd",
    name: "Scrambled Egg Burger with Sausage",
    emoji: "🥪",
    category: "Breakfast",
    price: 5.7,
    calories: 492,
    protein: 30,
    carbs: 33,
    fat: 26,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_hotcakes",
    brandId: "mcd",
    name: "Hotcakes",
    emoji: "🥞",
    category: "Breakfast",
    price: 5.65,
    calories: 557,
    protein: 9,
    carbs: 91,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_hotcakes_sausage",
    brandId: "mcd",
    name: "Hotcakes with Sausage",
    emoji: "🥞",
    category: "Breakfast",
    price: 6.8,
    calories: 619,
    protein: 16,
    carbs: 92,
    fat: 21,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_big_breakfast",
    brandId: "mcd",
    name: "Big Breakfast",
    emoji: "🍳",
    category: "Breakfast",
    price: 6.7,
    calories: 496,
    protein: 27,
    carbs: 47,
    fat: 22,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_breakfast_deluxe",
    brandId: "mcd",
    name: "Breakfast Deluxe",
    emoji: "🍳",
    category: "Breakfast",
    price: 7.3,
    calories: 805,
    protein: 31,
    carbs: 104,
    fat: 29,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_breakfast_wrap_ham",
    brandId: "mcd",
    name: "Breakfast Wrap (Chicken Ham)",
    emoji: "🌯",
    category: "Breakfast",
    price: 6.3,
    calories: 430,
    protein: 17,
    carbs: 43,
    fat: 21,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_breakfast_wrap_sausage",
    brandId: "mcd",
    name: "Breakfast Wrap (Chicken Sausage)",
    emoji: "🌯",
    category: "Breakfast",
    price: 6,
    calories: 472,
    protein: 22,
    carbs: 44,
    fat: 24,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_breakfast_burger_sausage",
    brandId: "mcd",
    name: "Breakfast Burger (Sausage)",
    emoji: "🥪",
    category: "Breakfast",
    price: 4.95,
    calories: 492,
    protein: 30,
    carbs: 33,
    fat: 26,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "mcd_breakfast_burger_ham",
    brandId: "mcd",
    name: "Breakfast Burger (Chicken Ham)",
    emoji: "🥪",
    category: "Breakfast",
    price: 4.95,
    calories: 430,
    protein: 17,
    carbs: 43,
    fat: 21,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "mcd_chicken_bacon_egg_mcmuffin",
    brandId: "mcd",
    name: "Chicken Bacon & Egg McMuffin",
    emoji: "🥪",
    category: "Breakfast",
    price: 5.5,
    calories: 526,
    protein: 27,
    carbs: 39,
    fat: 30,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "mcd_nuggets_20pc",
    brandId: "mcd",
    name: "Chicken McNuggets (20pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 14.1,
    calories: 910,
    protein: 46,
    carbs: 57,
    fat: 54,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_milo_iced_s",
    brandId: "mcd",
    name: "Iced Milo (S)",
    emoji: "🥛",
    category: "Drinks",
    price: 4.15,
    calories: 227,
    protein: 7,
    carbs: 36,
    fat: 6,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_milo_iced_m",
    brandId: "mcd",
    name: "Iced Milo (M)",
    emoji: "🥛",
    category: "Drinks",
    price: 5.2,
    calories: 322,
    protein: 10,
    carbs: 51,
    fat: 9,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_milo_hot",
    brandId: "mcd",
    name: "Hot Milo",
    emoji: "🥛",
    category: "Drinks",
    price: 3.85,
    calories: 192,
    protein: 5,
    carbs: 33,
    fat: 4,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_coffee",
    brandId: "mcd",
    name: "Premium Roast Coffee",
    emoji: "☕",
    category: "Drinks",
    price: 2,
    calories: 4,
    protein: 0,
    carbs: 1,
    fat: 0,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_americano",
    brandId: "mcd",
    name: "Americano",
    emoji: "☕",
    category: "Drinks",
    price: 2,
    calories: 1,
    protein: 0,
    carbs: 0,
    fat: 0,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_iced_americano",
    brandId: "mcd",
    name: "Iced Americano",
    emoji: "☕",
    category: "Drinks",
    price: 2,
    calories: 1,
    protein: 0,
    carbs: 0,
    fat: 0,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_latte",
    brandId: "mcd",
    name: "Latte",
    emoji: "☕",
    category: "Drinks",
    price: 2.5,
    calories: 97,
    protein: 10,
    carbs: 8,
    fat: 3,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_iced_latte",
    brandId: "mcd",
    name: "Iced Latte",
    emoji: "☕",
    category: "Drinks",
    price: 2.5,
    calories: 77,
    protein: 6,
    carbs: 9,
    fat: 2,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_cappuccino",
    brandId: "mcd",
    name: "Cappuccino",
    emoji: "☕",
    category: "Drinks",
    price: 2.5,
    calories: 74,
    protein: 5,
    carbs: 8,
    fat: 2,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_oreo_mcflurry",
    brandId: "mcd",
    name: "Oreo McFlurry",
    emoji: "🍦",
    category: "Desserts",
    price: 3.3,
    calories: 368,
    protein: 7,
    carbs: 56,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "mcd_hot_fudge_sundae",
    brandId: "mcd",
    name: "Hot Fudge Sundae",
    emoji: "🍦",
    category: "Desserts",
    price: 2.4,
    calories: 314,
    protein: 6,
    carbs: 49,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_strawberry_sundae",
    brandId: "mcd",
    name: "Strawberry Sundae",
    emoji: "🍦",
    category: "Desserts",
    price: 2.4,
    calories: 261,
    protein: 5,
    carbs: 47,
    fat: 6,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_vanilla_cone",
    brandId: "mcd",
    name: "Vanilla Cone",
    emoji: "🍦",
    category: "Desserts",
    price: 1,
    calories: 133,
    protein: 3,
    carbs: 22,
    fat: 4,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_apple_pie",
    brandId: "mcd",
    name: "Apple Pie",
    emoji: "🥧",
    category: "Desserts",
    price: 1.75,
    calories: 231,
    protein: 1,
    carbs: 29,
    fat: 12,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_hash_brown",
    brandId: "mcd",
    name: "Hash Brown",
    emoji: "🥔",
    category: "Breakfast",
    price: 3,
    calories: 149,
    protein: 1,
    carbs: 17,
    fat: 8,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "mcd_corn",
    brandId: "mcd",
    name: "Corn Cup",
    emoji: "🌽",
    category: "Breakfast",
    price: 2,
    calories: 100,
    protein: 4,
    carbs: 18,
    fat: 1,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "kfc_orig_1pc",
    brandId: "kfc",
    name: "Original Recipe Chicken (1 pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 3.8,
    calories: 320,
    protein: 29,
    carbs: 13,
    fat: 17,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kfc_crispy_1pc",
    brandId: "kfc",
    name: "Hot & Crispy Chicken (1 pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 3.8,
    calories: 330,
    protein: 27,
    carbs: 16,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "kfc_popcorn",
    brandId: "kfc",
    name: "Popcorn Chicken (Regular)",
    emoji: "🍿",
    category: "Chicken",
    price: 4.5,
    calories: 280,
    protein: 16,
    carbs: 24,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kfc_zinger",
    brandId: "kfc",
    name: "Zinger Burger",
    emoji: "🌶️",
    category: "Burgers",
    price: 7.2,
    calories: 500,
    protein: 28,
    carbs: 46,
    fat: 23,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kfc_twister",
    brandId: "kfc",
    name: "Twister (Original)",
    emoji: "🌯",
    category: "Burgers",
    price: 6.5,
    calories: 430,
    protein: 22,
    carbs: 42,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "kfc_coleslaw",
    brandId: "kfc",
    name: "Coleslaw",
    emoji: "🥗",
    category: "Sides",
    price: 1.5,
    calories: 110,
    protein: 1,
    carbs: 15,
    fat: 6,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kfc_mashed_potato",
    brandId: "kfc",
    name: "Mashed Potato",
    emoji: "🥔",
    category: "Sides",
    price: 2,
    calories: 130,
    protein: 2,
    carbs: 21,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kfc_corn",
    brandId: "kfc",
    name: "Corn on the Cob",
    emoji: "🌽",
    category: "Sides",
    price: 2.5,
    calories: 100,
    protein: 4,
    carbs: 18,
    fat: 2,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kfc_2pc_meal",
    brandId: "kfc",
    name: "2-pc Chicken Meal",
    emoji: "🍗",
    category: "Meals",
    price: 10.5,
    calories: 920,
    protein: 52,
    carbs: 89,
    fat: 36,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kfc_zinger_meal",
    brandId: "kfc",
    name: "Zinger Burger Meal",
    emoji: "🌶️",
    category: "Meals",
    price: 10.95,
    calories: 1050,
    protein: 44,
    carbs: 114,
    fat: 43,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kfc_snack_plate",
    brandId: "kfc",
    name: "Snack Plate",
    emoji: "🍱",
    category: "Meals",
    price: 7.95,
    calories: 670,
    protein: 30,
    carbs: 72,
    fat: 28,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_whopper",
    brandId: "bk",
    name: "Whopper",
    emoji: "🍔",
    category: "Burgers",
    price: 9.4,
    calories: 660,
    protein: 33,
    carbs: 49,
    fat: 40,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_double_whopper",
    brandId: "bk",
    name: "Double Whopper",
    emoji: "🍔",
    category: "Burgers",
    price: 11.4,
    calories: 870,
    protein: 51,
    carbs: 49,
    fat: 57,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_chicken_royale",
    brandId: "bk",
    name: "Chicken Royale",
    emoji: "🍗",
    category: "Burgers",
    price: 7.9,
    calories: 440,
    protein: 19,
    carbs: 40,
    fat: 25,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_mushroom_swiss",
    brandId: "bk",
    name: "Mushroom Swiss Burger",
    emoji: "🍄",
    category: "Burgers",
    price: 8.9,
    calories: 590,
    protein: 36,
    carbs: 43,
    fat: 32,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_onion_rings",
    brandId: "bk",
    name: "Onion Rings (Regular)",
    emoji: "🧅",
    category: "Sides",
    price: 3.2,
    calories: 330,
    protein: 5,
    carbs: 42,
    fat: 16,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_fries_m",
    brandId: "bk",
    name: "Classic Fries (M)",
    emoji: "🍟",
    category: "Sides",
    price: 3,
    calories: 310,
    protein: 4,
    carbs: 44,
    fat: 14,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_sundae",
    brandId: "bk",
    name: "Chocolate Sundae",
    emoji: "🍫",
    category: "Desserts",
    price: 2.5,
    calories: 250,
    protein: 5,
    carbs: 38,
    fat: 9,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_whopper_jr",
    brandId: "bk",
    name: "Whopper Jr",
    emoji: "🍔",
    category: "Burgers",
    price: 6.9,
    calories: 340,
    protein: 16,
    carbs: 31,
    fat: 17,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_tendercrisp",
    brandId: "bk",
    name: "TenderCrisp",
    emoji: "🍗",
    category: "Burgers",
    price: 10.5,
    calories: 750,
    protein: 35,
    carbs: 63,
    fat: 39,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_big_fish",
    brandId: "bk",
    name: "BK Big Fish",
    emoji: "🐟",
    category: "Burgers",
    price: 8.5,
    calories: 510,
    protein: 22,
    carbs: 55,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_fries_s",
    brandId: "bk",
    name: "Classic Fries (S)",
    emoji: "🍟",
    category: "Sides",
    price: 2.9,
    calories: 230,
    protein: 3,
    carbs: 29,
    fat: 12,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_fries_l",
    brandId: "bk",
    name: "Classic Fries (L)",
    emoji: "🍟",
    category: "Sides",
    price: 4.2,
    calories: 460,
    protein: 6,
    carbs: 61,
    fat: 22,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_nuggets_6",
    brandId: "bk",
    name: "Chicken Nuggets (6 pc)",
    emoji: "🍗",
    category: "Sides",
    price: 4.9,
    calories: 280,
    protein: 16,
    carbs: 17,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_nuggets_9",
    brandId: "bk",
    name: "Chicken Nuggets (9 pc)",
    emoji: "🍗",
    category: "Sides",
    price: 6.9,
    calories: 420,
    protein: 24,
    carbs: 26,
    fat: 24,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_apple_pie",
    brandId: "bk",
    name: "Apple Pie",
    emoji: "🥧",
    category: "Desserts",
    price: 2,
    calories: 240,
    protein: 3,
    carbs: 35,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bk_soft_serve",
    brandId: "bk",
    name: "Soft Serve Cone",
    emoji: "🍦",
    category: "Desserts",
    price: 1.5,
    calories: 150,
    protein: 4,
    carbs: 23,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_whopper_meal",
    brandId: "bk",
    name: "Whopper Meal",
    emoji: "🍔",
    category: "Meals",
    price: 12.9,
    calories: 1090,
    protein: 40,
    carbs: 116,
    fat: 51,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bk_tendercrisp_meal",
    brandId: "bk",
    name: "TenderCrisp Meal",
    emoji: "🍗",
    category: "Meals",
    price: 13.9,
    calories: 1370,
    protein: 43,
    carbs: 149,
    fat: 65,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "sub_chicken_breast",
    brandId: "subway",
    name: "Chicken Breast (6\")",
    emoji: "🍗",
    category: "6-inch Subs",
    price: 7.5,
    calories: 350,
    protein: 24,
    carbs: 47,
    fat: 5,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sub_roast_beef",
    brandId: "subway",
    name: "Roast Beef (6\")",
    emoji: "🥩",
    category: "6-inch Subs",
    price: 7.5,
    calories: 330,
    protein: 22,
    carbs: 45,
    fat: 5,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "sub_tuna",
    brandId: "subway",
    name: "Tuna (6\")",
    emoji: "🐟",
    category: "6-inch Subs",
    price: 7.9,
    calories: 430,
    protein: 20,
    carbs: 46,
    fat: 14,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sub_veggie_delight",
    brandId: "subway",
    name: "Veggie Delight (6\")",
    emoji: "🥗",
    category: "6-inch Subs",
    price: 6.5,
    calories: 230,
    protein: 10,
    carbs: 43,
    fat: 2,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sub_egg_mayo",
    brandId: "subway",
    name: "Egg Mayo (6\")",
    emoji: "🥚",
    category: "6-inch Subs",
    price: 6.5,
    calories: 380,
    protein: 18,
    carbs: 46,
    fat: 12,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sub_meatball",
    brandId: "subway",
    name: "Meatball Marinara (6\")",
    emoji: "🍝",
    category: "6-inch Subs",
    price: 7.5,
    calories: 430,
    protein: 22,
    carbs: 49,
    fat: 15,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sub_chicken_breast_ft",
    brandId: "subway",
    name: "Chicken Breast (Footlong)",
    emoji: "🍗",
    category: "Footlong Subs",
    price: 12,
    calories: 700,
    protein: 48,
    carbs: 94,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "sub_chicken_salad",
    brandId: "subway",
    name: "Chicken Breast Salad",
    emoji: "🥗",
    category: "Salads",
    price: 8.5,
    calories: 150,
    protein: 22,
    carbs: 10,
    fat: 3,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "sub_chicken_breast_meal",
    brandId: "subway",
    name: "Chicken Breast Sub Meal (6\")",
    emoji: "🥖",
    category: "Meals",
    price: 11.5,
    calories: 640,
    protein: 44,
    carbs: 78,
    fat: 14,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sub_tuna_meal",
    brandId: "subway",
    name: "Tuna Sub Meal (6\")",
    emoji: "🐟",
    category: "Meals",
    price: 11.5,
    calories: 700,
    protein: 30,
    carbs: 80,
    fat: 24,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "ock_curry_puff_chicken",
    brandId: "old_chang_kee",
    name: "Curry Puff (Chicken)",
    emoji: "🥟",
    category: "Curry Puffs",
    price: 1.5,
    calories: 210,
    protein: 6,
    carbs: 24,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ock_curry_puff_egg",
    brandId: "old_chang_kee",
    name: "Curry Puff (Egg)",
    emoji: "🥚",
    category: "Curry Puffs",
    price: 1.5,
    calories: 200,
    protein: 5,
    carbs: 23,
    fat: 10,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ock_chicken_roll",
    brandId: "old_chang_kee",
    name: "Chicken 'O'",
    emoji: "🍢",
    category: "Rolls & Sticks",
    price: 1.5,
    calories: 180,
    protein: 8,
    carbs: 17,
    fat: 9,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ock_otah_stick",
    brandId: "old_chang_kee",
    name: "Otah Stick",
    emoji: "🐟",
    category: "Rolls & Sticks",
    price: 1.2,
    calories: 90,
    protein: 9,
    carbs: 3,
    fat: 4,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ock_curry_puff_sardine",
    brandId: "old_chang_kee",
    name: "Curry Puff (Sardine)",
    emoji: "🐟",
    category: "Curry Puffs",
    price: 1.5,
    calories: 215,
    protein: 7,
    carbs: 22,
    fat: 11,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "ock_nuggets",
    brandId: "old_chang_kee",
    name: "Chicken Nuggets (6 pcs)",
    emoji: "🍗",
    category: "Snacks",
    price: 3.5,
    calories: 250,
    protein: 16,
    carbs: 18,
    fat: 12,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "yk_kaya_toast_thin",
    brandId: "ya_kun",
    name: "Kaya Butter Toast (Thin)",
    emoji: "🍞",
    category: "Toast",
    price: 2.2,
    calories: 200,
    protein: 5,
    carbs: 28,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yk_kaya_toast_thick",
    brandId: "ya_kun",
    name: "Kaya Butter Toast (Thick)",
    emoji: "🍞",
    category: "Toast",
    price: 2.5,
    calories: 230,
    protein: 6,
    carbs: 33,
    fat: 9,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yk_french_toast",
    brandId: "ya_kun",
    name: "French Toast",
    emoji: "🍳",
    category: "Toast",
    price: 3.5,
    calories: 320,
    protein: 8,
    carbs: 38,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "yk_soft_eggs",
    brandId: "ya_kun",
    name: "Soft-Boiled Eggs (2 pcs)",
    emoji: "🥚",
    category: "Eggs",
    price: 2,
    calories: 130,
    protein: 10,
    carbs: 1,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yk_kopi",
    brandId: "ya_kun",
    name: "Kopi (Coffee with Condensed Milk)",
    emoji: "☕",
    category: "Drinks",
    price: 1.8,
    calories: 85,
    protein: 1,
    carbs: 13,
    fat: 3,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yk_teh",
    brandId: "ya_kun",
    name: "Teh (Tea with Condensed Milk)",
    emoji: "🍵",
    category: "Drinks",
    price: 1.8,
    calories: 90,
    protein: 1,
    carbs: 15,
    fat: 3,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "yk_set_a",
    brandId: "ya_kun",
    name: "Set A (2 Toast + 2 Eggs + Drink)",
    emoji: "🍽️",
    category: "Sets",
    price: 6.5,
    calories: 455,
    protein: 17,
    carbs: 57,
    fat: 21,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yk_set_b",
    brandId: "ya_kun",
    name: "Set B (French Toast + 2 Eggs + Drink)",
    emoji: "🍽️",
    category: "Sets",
    price: 7,
    calories: 575,
    protein: 18,
    carbs: 65,
    fat: 30,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bt_floss_bun",
    brandId: "breadtalk",
    name: "Pork Floss Bun",
    emoji: "🥐",
    category: "Savoury Buns",
    price: 2.2,
    calories: 280,
    protein: 8,
    carbs: 42,
    fat: 9,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bt_cheese_sausage",
    brandId: "breadtalk",
    name: "Cheese Sausage Bun",
    emoji: "🌭",
    category: "Savoury Buns",
    price: 2.5,
    calories: 310,
    protein: 10,
    carbs: 39,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bt_tuna_mayo",
    brandId: "breadtalk",
    name: "Tuna Mayo Bun",
    emoji: "🐟",
    category: "Savoury Buns",
    price: 2.2,
    calories: 270,
    protein: 10,
    carbs: 36,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "bt_cocktail_bun",
    brandId: "breadtalk",
    name: "Cocktail Bun",
    emoji: "🫐",
    category: "Sweet Buns",
    price: 2,
    calories: 250,
    protein: 7,
    carbs: 37,
    fat: 9,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bt_raisin_walnut_slice",
    brandId: "breadtalk",
    name: "Raisin Walnut Loaf (per slice)",
    emoji: "🍞",
    category: "Loaves",
    price: 1.5,
    calories: 120,
    protein: 3,
    carbs: 19,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bt_chicken_floss",
    brandId: "breadtalk",
    name: "Chicken Floss Bun",
    emoji: "🥐",
    category: "Savoury Buns",
    price: 2.2,
    calories: 270,
    protein: 9,
    carbs: 41,
    fat: 8,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "gc_milk_tea_m",
    brandId: "gong_cha",
    name: "Milk Tea (M, 0% sugar)",
    emoji: "🧋",
    category: "Milk Tea",
    price: 4.2,
    calories: 150,
    protein: 3,
    carbs: 27,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gc_brown_sugar_m",
    brandId: "gong_cha",
    name: "Brown Sugar Milk Tea (M)",
    emoji: "🍮",
    category: "Milk Tea",
    price: 5.5,
    calories: 280,
    protein: 3,
    carbs: 56,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gc_taro_m",
    brandId: "gong_cha",
    name: "Taro Milk Tea (M)",
    emoji: "🟣",
    category: "Milk Tea",
    price: 5,
    calories: 240,
    protein: 3,
    carbs: 45,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gc_matcha_latte_m",
    brandId: "gong_cha",
    name: "Matcha Latte (M)",
    emoji: "🍵",
    category: "Specialty",
    price: 5,
    calories: 180,
    protein: 4,
    carbs: 30,
    fat: 5,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "gc_mango_green_m",
    brandId: "gong_cha",
    name: "Mango Green Tea (M)",
    emoji: "🥭",
    category: "Fruit Tea",
    price: 4.2,
    calories: 110,
    protein: 1,
    carbs: 26,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "gc_wintermelon_m",
    brandId: "gong_cha",
    name: "Wintermelon Tea (M)",
    emoji: "🍈",
    category: "Fruit Tea",
    price: 3.8,
    calories: 90,
    protein: 0,
    carbs: 22,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "7e_hotdog",
    brandId: "7eleven",
    name: "Big Bite Hot Dog",
    emoji: "🌭",
    category: "Hot Food",
    price: 2.5,
    calories: 320,
    protein: 12,
    carbs: 26,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "7e_chicken_pie",
    brandId: "7eleven",
    name: "Chicken Pie",
    emoji: "🥧",
    category: "Hot Food",
    price: 3.5,
    calories: 380,
    protein: 13,
    carbs: 36,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "7e_tuna_sandwich",
    brandId: "7eleven",
    name: "Tuna Sandwich",
    emoji: "🥪",
    category: "Sandwiches & Onigiri",
    price: 4.5,
    calories: 310,
    protein: 14,
    carbs: 38,
    fat: 9,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "7e_onigiri_tuna",
    brandId: "7eleven",
    name: "Onigiri — Tuna Mayo",
    emoji: "🍙",
    category: "Sandwiches & Onigiri",
    price: 2.8,
    calories: 180,
    protein: 8,
    carbs: 33,
    fat: 2,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "7e_onigiri_salmon",
    brandId: "7eleven",
    name: "Onigiri — Salmon",
    emoji: "🍙",
    category: "Sandwiches & Onigiri",
    price: 2.8,
    calories: 175,
    protein: 9,
    carbs: 32,
    fat: 2,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "7e_boiled_eggs",
    brandId: "7eleven",
    name: "Hard-Boiled Eggs (2 pcs)",
    emoji: "🥚",
    category: "Snacks",
    price: 2,
    calories: 130,
    protein: 12,
    carbs: 1,
    fat: 9,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "7e_slurpee_m",
    brandId: "7eleven",
    name: "Slurpee (M)",
    emoji: "🧊",
    category: "Drinks",
    price: 2.5,
    calories: 160,
    protein: 0,
    carbs: 42,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "7e_greek_yogurt",
    brandId: "7eleven",
    name: "Greek Yogurt (Meiji)",
    emoji: "🫙",
    category: "Chilled",
    price: 3.5,
    calories: 110,
    protein: 11,
    carbs: 12,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_grain_s_curry_chicken_stew_and_buns",
    brandId: "grain",
    name: "Grain's Curry Chicken Stew (and Buns)",
    emoji: "🍗",
    category: "Mains",
    price: 15,
    calories: 832,
    protein: 39,
    carbs: 70,
    fat: 44,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_marinara_fish_pasta",
    brandId: "grain",
    name: "Marinara Fish Pasta",
    emoji: "🐟",
    category: "Mains",
    price: 16,
    calories: 831,
    protein: 43,
    carbs: 68,
    fat: 43,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_ayam_kampung_masak_merah",
    brandId: "grain",
    name: "Ayam Kampung Masak Merah",
    emoji: "🥘",
    category: "Mains",
    price: 15.5,
    calories: 887,
    protein: 41,
    carbs: 75,
    fat: 47,
    compatibleWith: [
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_grilled_farm_fresh_chicken",
    brandId: "grain",
    name: "Grilled Farm Fresh Chicken",
    emoji: "🍗",
    category: "Mains",
    price: 15,
    calories: 772,
    protein: 51,
    carbs: 79,
    fat: 28,
    compatibleWith: [
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_honey_duo_mustard_chicken",
    brandId: "grain",
    name: "Honey Duo Mustard Chicken",
    emoji: "🍗",
    category: "Mains",
    price: 15.5,
    calories: 941,
    protein: 56,
    carbs: 87,
    fat: 41,
    compatibleWith: [
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_mentai_mayonnaise_aburi_salmon",
    brandId: "grain",
    name: "Mentai Mayonnaise Aburi Salmon",
    emoji: "🐟",
    category: "Mains",
    price: 20,
    calories: 796,
    protein: 41,
    carbs: 50,
    fat: 48,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_basil_thunder_tea_rice",
    brandId: "grain",
    name: "Basil Thunder Tea Rice",
    emoji: "🍵",
    category: "Mains",
    price: 14,
    calories: 627,
    protein: 27,
    carbs: 69,
    fat: 27,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_thai_fiesta_salad",
    brandId: "grain",
    name: "Thai Fiesta Salad",
    emoji: "🥗",
    category: "Mains",
    price: 15.5,
    calories: 541,
    protein: 16,
    carbs: 81,
    fat: 17,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "low_carb"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_impossible_ground_beef_hamburg_with_japanese_curry",
    brandId: "grain",
    name: "Impossible Ground Beef Hamburg with Japanese Curry",
    emoji: "🥘",
    category: "Mains",
    price: 21.5,
    calories: 747,
    protein: 30,
    carbs: 69,
    fat: 39,
    compatibleWith: [
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grain_grilled_forest_mushroom_salad",
    brandId: "grain",
    name: "Grilled Forest Mushroom Salad",
    emoji: "🥗",
    category: "Sides",
    price: 7,
    calories: 103,
    protein: 4,
    carbs: 16,
    fat: 5,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "low_carb"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_piri_piri_chicken_bites",
    brandId: "grain",
    name: "Piri-piri Chicken Bites",
    emoji: "🍗",
    category: "Sides",
    price: 8,
    calories: 199,
    protein: 27,
    carbs: 7,
    fat: 6,
    compatibleWith: [
      "low_carb",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_ondeh_ondeh_pandan_cake",
    brandId: "grain",
    name: "Ondeh Ondeh Pandan Cake",
    emoji: "🍰",
    category: "Desserts",
    price: 6.5,
    calories: 358,
    protein: 7,
    carbs: 46,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_greek_yoghurt_granola_cup",
    brandId: "grain",
    name: "Greek Yoghurt Granola Cup",
    emoji: "🍰",
    category: "Desserts",
    price: 7,
    calories: 475,
    protein: 14,
    carbs: 44,
    fat: 28,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_seasonal_fruit_parcel",
    brandId: "grain",
    name: "Seasonal Fruit Parcel",
    emoji: "🍰",
    category: "Desserts",
    price: 7,
    calories: 93,
    protein: 1,
    carbs: 20,
    fat: 1,
    compatibleWith: [
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_bandung_gao",
    brandId: "grain",
    name: "Bandung Gao",
    emoji: "🍵",
    category: "Drinks",
    price: 5.5,
    calories: 107,
    protein: 4,
    carbs: 12,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_teh_c_floral",
    brandId: "grain",
    name: "Teh C Floral",
    emoji: "🍵",
    category: "Drinks",
    price: 5.5,
    calories: 103,
    protein: 2,
    carbs: 15,
    fat: 3,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_honey_yuzu_tea",
    brandId: "grain",
    name: "Honey Yuzu Tea",
    emoji: "🍵",
    category: "Drinks",
    price: 5.5,
    calories: 100,
    protein: 0,
    carbs: 25,
    fat: 0,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_white_cold_brew",
    brandId: "grain",
    name: "White Cold Brew",
    emoji: "🍵",
    category: "Drinks",
    price: 6,
    calories: 91,
    protein: 0,
    carbs: 15,
    fat: 3,
    compatibleWith: [
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_straight_guava_oj",
    brandId: "grain",
    name: "Straight Guava OJ",
    emoji: "🍵",
    category: "Drinks",
    price: 6.5,
    calories: 118,
    protein: 2,
    carbs: 27,
    fat: 0,
    compatibleWith: [
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grain_watermelime_crush",
    brandId: "grain",
    name: "Watermelime Crush",
    emoji: "🍵",
    category: "Drinks",
    price: 6.5,
    calories: 99,
    protein: 0,
    carbs: 24,
    fat: 0,
    compatibleWith: [
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "stuffd_chicken_kebab",
    brandId: "stuffd",
    name: "Chicken Kebab",
    emoji: "🌯",
    category: "Kebabs",
    price: 9.9,
    calories: 442,
    protein: 21,
    carbs: 41,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "stuffd_chicken_rendang_kebab",
    brandId: "stuffd",
    name: "Chicken Rendang Kebab",
    emoji: "🌯",
    category: "Kebabs",
    price: 9.9,
    calories: 428,
    protein: 28,
    carbs: 40,
    fat: 15,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "stuffd_beef_kebab",
    brandId: "stuffd",
    name: "Beef Kebab",
    emoji: "🌯",
    category: "Kebabs",
    price: 9.9,
    calories: 409,
    protein: 16,
    carbs: 39,
    fat: 6,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "stuffd_chicken_burrito",
    brandId: "stuffd",
    name: "Chicken Burrito",
    emoji: "🌯",
    category: "Burritos",
    price: 12.9,
    calories: 633,
    protein: 25,
    carbs: 79,
    fat: 23,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "stuffd_beef_burrito",
    brandId: "stuffd",
    name: "Beef Burrito",
    emoji: "🌯",
    category: "Burritos",
    price: 12.9,
    calories: 633,
    protein: 25,
    carbs: 79,
    fat: 23,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "stuffd_chicken_rendang_daily_bowl",
    brandId: "stuffd",
    name: "Chicken Rendang Daily Bowl",
    emoji: "🥣",
    category: "Daily Bowls",
    price: 10.9,
    calories: 255,
    protein: 23,
    carbs: 8,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "stuffd_chicken_daily_bowl",
    brandId: "stuffd",
    name: "Chicken Daily Bowl",
    emoji: "🥣",
    category: "Daily Bowls",
    price: 10.9,
    calories: 255,
    protein: 23,
    carbs: 8,
    fat: 13,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_mozza_burger",
    brandId: "aw",
    name: "Mozza Burger",
    emoji: "🍔",
    category: "Signature Burgers",
    price: 7.5,
    calories: 620,
    protein: 27,
    carbs: 37,
    fat: 39,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_double_mozza_burger",
    brandId: "aw",
    name: "Double Mozza Burger",
    emoji: "🍔",
    category: "Signature Burgers",
    price: 9.1,
    calories: 800,
    protein: 42,
    carbs: 38,
    fat: 53,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_double_cheeseburger",
    brandId: "aw",
    name: "Double Cheeseburger",
    emoji: "🍔",
    category: "Signature Burgers",
    price: 7.2,
    calories: 680,
    protein: 40,
    carbs: 44,
    fat: 38,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_cheeseburger",
    brandId: "aw",
    name: "Cheeseburger",
    emoji: "🍔",
    category: "Signature Burgers",
    price: 5.2,
    calories: 400,
    protein: 20,
    carbs: 39,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_cream_cheese_chicken_burger",
    brandId: "aw",
    name: "Cream Cheese Chicken Burger",
    emoji: "🥪",
    category: "Cream Cheese Burgers",
    price: 7.9,
    calories: 580,
    protein: 23,
    carbs: 46,
    fat: 34,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_cream_cheese_beef_burger",
    brandId: "aw",
    name: "Cream Cheese Beef Burger",
    emoji: "🍔",
    category: "Cream Cheese Burgers",
    price: 7.9,
    calories: 680,
    protein: 28,
    carbs: 42,
    fat: 44,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_chubby_chicken_sandwich",
    brandId: "aw",
    name: "Chubby Chicken Sandwich",
    emoji: "🥪",
    category: "Golden Aroma Chicken",
    price: 6.9,
    calories: 490,
    protein: 21,
    carbs: 44,
    fat: 27,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_spicy_chicken_sandwich",
    brandId: "aw",
    name: "Spicy Chicken Sandwich",
    emoji: "🥪",
    category: "Golden Aroma Chicken",
    price: 6.9,
    calories: 500,
    protein: 21,
    carbs: 44,
    fat: 28,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_coney_dog",
    brandId: "aw",
    name: "A&W Coney Dog (Beef)",
    emoji: "🌭",
    category: "All American Coney",
    price: 5.2,
    calories: 340,
    protein: 14,
    carbs: 26,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_chicken_coney_dog",
    brandId: "aw",
    name: "Chicken Coney Dog",
    emoji: "🌭",
    category: "All American Coney",
    price: 5.2,
    calories: 300,
    protein: 16,
    carbs: 26,
    fat: 15,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_coney_cheese_dog",
    brandId: "aw",
    name: "Coney Cheese Dog",
    emoji: "🌭",
    category: "All American Coney",
    price: 5.7,
    calories: 400,
    protein: 16,
    carbs: 27,
    fat: 25,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_golden_aroma_chicken_1pc",
    brandId: "aw",
    name: "Golden Aroma Chicken (1 pc)",
    emoji: "🍗",
    category: "Golden Aroma Chicken",
    price: 3.2,
    calories: 260,
    protein: 22,
    carbs: 11,
    fat: 15,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_chicken_strips_3pc",
    brandId: "aw",
    name: "Chubby Chicken Strips (3 pc)",
    emoji: "🍗",
    category: "Golden Aroma Chicken",
    price: 7.9,
    calories: 300,
    protein: 20,
    carbs: 25,
    fat: 15,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_curly_fries_regular",
    brandId: "aw",
    name: "Curly Fries (Regular)",
    emoji: "🍟",
    category: "Snacks",
    price: 3.6,
    calories: 266,
    protein: 3,
    carbs: 34,
    fat: 14,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_onion_rings",
    brandId: "aw",
    name: "Onion Rings",
    emoji: "🧅",
    category: "Snacks",
    price: 3.9,
    calories: 250,
    protein: 4,
    carbs: 36,
    fat: 5,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_beef_coney_cheese_fries",
    brandId: "aw",
    name: "Beef Coney Cheese Fries",
    emoji: "🍟",
    category: "Snacks",
    price: 4.9,
    calories: 550,
    protein: 17,
    carbs: 48,
    fat: 33,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_chicken_coney_cheese_fries",
    brandId: "aw",
    name: "Chicken Coney Cheese Fries",
    emoji: "🍟",
    category: "Snacks",
    price: 4.9,
    calories: 530,
    protein: 16,
    carbs: 48,
    fat: 31,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_waffle_plain",
    brandId: "aw",
    name: "Waffle (Plain)",
    emoji: "🧇",
    category: "Waffles & Desserts",
    price: 3.9,
    calories: 310,
    protein: 7,
    carbs: 42,
    fat: 12,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_waffle_ice_cream",
    brandId: "aw",
    name: "Waffle with Ice Cream",
    emoji: "🧇",
    category: "Waffles & Desserts",
    price: 4.5,
    calories: 420,
    protein: 7,
    carbs: 58,
    fat: 17,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_waffle_sundae",
    brandId: "aw",
    name: "Waffle Sundae",
    emoji: "🧇",
    category: "Waffles & Desserts",
    price: 4.9,
    calories: 480,
    protein: 7,
    carbs: 66,
    fat: 20,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_root_beer_regular",
    brandId: "aw",
    name: "Root Beer (Regular)",
    emoji: "🥤",
    category: "Drinks",
    price: 4.15,
    calories: 170,
    protein: 0,
    carbs: 44,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_root_beer_zero",
    brandId: "aw",
    name: "Root Beer Zero Sugar",
    emoji: "🥤",
    category: "Drinks",
    price: 4.15,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegan",
      "vegetarian",
      "low_carb"
    ],
    confidence: "estimated"
  },
  {
    id: "aw_root_beer_float",
    brandId: "aw",
    name: "Root Beer Float",
    emoji: "🥤",
    category: "Drinks",
    price: 3.5,
    calories: 330,
    protein: 2,
    carbs: 45,
    fat: 6,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_mozza_combo",
    brandId: "aw",
    name: "Mozza Burger Combo",
    emoji: "🍔",
    category: "Combo Meals",
    price: 11.9,
    calories: 1056,
    protein: 30,
    carbs: 115,
    fat: 53,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_double_mozza_combo",
    brandId: "aw",
    name: "Double Mozza Burger Combo",
    emoji: "🍔",
    category: "Combo Meals",
    price: 13.5,
    calories: 1236,
    protein: 45,
    carbs: 116,
    fat: 67,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "aw_cream_cheese_chicken_combo",
    brandId: "aw",
    name: "Cream Cheese Chicken Combo",
    emoji: "🍔",
    category: "Combo Meals",
    price: 11.9,
    calories: 1016,
    protein: 26,
    carbs: 124,
    fat: 48,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aw_coney_dog_combo",
    brandId: "aw",
    name: "Coney Dog Combo",
    emoji: "🌭",
    category: "Combo Meals",
    price: 8.9,
    calories: 776,
    protein: 17,
    carbs: 104,
    fat: 34,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_1pc",
    brandId: "jollibee",
    name: "Chickenjoy (1 pc)",
    emoji: "🍗",
    category: "Chickenjoy",
    price: 5.5,
    calories: 340,
    protein: 22,
    carbs: 18,
    fat: 20,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_2pc",
    brandId: "jollibee",
    name: "Chickenjoy (2 pc) Meal",
    emoji: "🍗",
    category: "Chickenjoy",
    price: 9.7,
    calories: 680,
    protein: 44,
    carbs: 36,
    fat: 40,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_3pc",
    brandId: "jollibee",
    name: "Chickenjoy (3 pc) Meal",
    emoji: "🍗",
    category: "Chickenjoy",
    price: 12.4,
    calories: 1020,
    protein: 66,
    carbs: 54,
    fat: 60,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "jollibee_chickenjoy_6pc_bucket",
    brandId: "jollibee",
    name: "Chickenjoy (6 pc) Bucket",
    emoji: "🍗",
    category: "Chickenjoy",
    price: 22,
    calories: 2040,
    protein: 132,
    carbs: 108,
    fat: 120,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_8pc_bucket",
    brandId: "jollibee",
    name: "Chickenjoy (8 pc) Bucket",
    emoji: "🍗",
    category: "Chickenjoy",
    price: 27.9,
    calories: 2720,
    protein: 176,
    carbs: 144,
    fat: 160,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_yumburger",
    brandId: "jollibee",
    name: "Yumburger",
    emoji: "🍔",
    category: "Burgers",
    price: 4.2,
    calories: 250,
    protein: 10,
    carbs: 33,
    fat: 9,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "jollibee_yumburger_with_cheese",
    brandId: "jollibee",
    name: "Yumburger with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 4.9,
    calories: 410,
    protein: 16,
    carbs: 35,
    fat: 25,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_champ_burger",
    brandId: "jollibee",
    name: "Champ Burger",
    emoji: "🍔",
    category: "Burgers",
    price: 5.5,
    calories: 360,
    protein: 13,
    carbs: 30,
    fat: 21,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_sandwich",
    brandId: "jollibee",
    name: "Chickenjoy Sandwich",
    emoji: "🥪",
    category: "Chicken Sandwiches",
    price: 6.8,
    calories: 580,
    protein: 25,
    carbs: 48,
    fat: 28,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_aloha_chicken_sandwich",
    brandId: "jollibee",
    name: "Aloha Chicken Sandwich",
    emoji: "🥪",
    category: "Chicken Sandwiches",
    price: 8.3,
    calories: 650,
    protein: 41,
    carbs: 65,
    fat: 33,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_jolly_spaghetti",
    brandId: "jollibee",
    name: "Jolly Spaghetti",
    emoji: "🍝",
    category: "Pasta",
    price: 5.8,
    calories: 420,
    protein: 12,
    carbs: 62,
    fat: 12,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_jolly_hotdog",
    brandId: "jollibee",
    name: "Jolly Hotdog",
    emoji: "🌭",
    category: "Hotdogs & Sides",
    price: 3.6,
    calories: 386,
    protein: 12,
    carbs: 32,
    fat: 24,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "jollibee_crispy_fries_regular",
    brandId: "jollibee",
    name: "Jolly Crispy Fries (Regular)",
    emoji: "🍟",
    category: "Sides",
    price: 2.8,
    calories: 340,
    protein: 4,
    carbs: 41,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_crispy_fries_large",
    brandId: "jollibee",
    name: "Jolly Crispy Fries (Large)",
    emoji: "🍟",
    category: "Sides",
    price: 3.8,
    calories: 510,
    protein: 6,
    carbs: 48,
    fat: 27,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_peach_mango_pie",
    brandId: "jollibee",
    name: "Peach Mango Pie",
    emoji: "🥧",
    category: "Desserts",
    price: 2.2,
    calories: 270,
    protein: 3,
    carbs: 40,
    fat: 11,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_coke_regular",
    brandId: "jollibee",
    name: "Coca-Cola (Regular)",
    emoji: "🥤",
    category: "Beverages",
    price: 2.2,
    calories: 140,
    protein: 0,
    carbs: 39,
    fat: 0,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "jollibee_pineapple_quencher",
    brandId: "jollibee",
    name: "Pineapple Quencher",
    emoji: "🍹",
    category: "Beverages",
    price: 3.5,
    calories: 180,
    protein: 0,
    carbs: 45,
    fat: 0,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_iced_tea",
    brandId: "jollibee",
    name: "Iced Tea",
    emoji: "🧋",
    category: "Beverages",
    price: 2.5,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "jollibee_burger_steak",
    brandId: "jollibee",
    name: "Burger Steak",
    emoji: "🍽️",
    category: "Rice Meals",
    price: 7.2,
    calories: 520,
    protein: 28,
    carbs: 42,
    fat: 26,
    compatibleWith: [
      "halal",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_1pc_meal",
    brandId: "jollibee",
    name: "1-pc Chickenjoy Meal",
    emoji: "🍗",
    category: "Meals",
    price: 8.5,
    calories: 820,
    protein: 38,
    carbs: 86,
    fat: 32,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_chickenjoy_2pc_meal",
    brandId: "jollibee",
    name: "2-pc Chickenjoy Meal",
    emoji: "🍗",
    category: "Meals",
    price: 12.9,
    calories: 1140,
    protein: 62,
    carbs: 92,
    fat: 56,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jollibee_yumburger_meal",
    brandId: "jollibee",
    name: "Yumburger Meal",
    emoji: "🍔",
    category: "Meals",
    price: 7.5,
    calories: 730,
    protein: 26,
    carbs: 90,
    fat: 27,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "tb_kaya_toast_thin",
    brandId: "toast_box",
    name: "Traditional Kaya Toast (Thin)",
    emoji: "🍞",
    category: "Toast",
    price: 2.3,
    calories: 210,
    protein: 5,
    carbs: 30,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_kaya_toast_thick",
    brandId: "toast_box",
    name: "Thick Kaya Toast",
    emoji: "🍞",
    category: "Toast",
    price: 2.8,
    calories: 255,
    protein: 6,
    carbs: 36,
    fat: 10,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "tb_peanut_butter_toast",
    brandId: "toast_box",
    name: "Peanut Butter Kaya Toast (Thick)",
    emoji: "🥜",
    category: "Toast",
    price: 2.9,
    calories: 380,
    protein: 12,
    carbs: 48,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_french_toast",
    brandId: "toast_box",
    name: "French Toast",
    emoji: "🍳",
    category: "Toast",
    price: 3.5,
    calories: 340,
    protein: 9,
    carbs: 40,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_soft_eggs",
    brandId: "toast_box",
    name: "Soft-Boiled Eggs (2 pcs)",
    emoji: "🥚",
    category: "Eggs",
    price: 1.8,
    calories: 130,
    protein: 10,
    carbs: 1,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_set_a",
    brandId: "toast_box",
    name: "Set A (2 Kaya Toast + 2 Eggs + Hot Drink)",
    emoji: "🍽️",
    category: "Sets",
    price: 6.8,
    calories: 465,
    protein: 16,
    carbs: 59,
    fat: 22,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_kopi_o",
    brandId: "toast_box",
    name: "Kopi O (Black Coffee with Sugar)",
    emoji: "☕",
    category: "Drinks",
    price: 1.8,
    calories: 113,
    protein: 0,
    carbs: 28,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "dairy_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_kopi",
    brandId: "toast_box",
    name: "Kopi (Coffee with Condensed Milk)",
    emoji: "☕",
    category: "Drinks",
    price: 2,
    calories: 90,
    protein: 1,
    carbs: 14,
    fat: 3,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_teh",
    brandId: "toast_box",
    name: "Teh (Tea with Condensed Milk)",
    emoji: "🍵",
    category: "Drinks",
    price: 2,
    calories: 90,
    protein: 1,
    carbs: 15,
    fat: 3,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tb_milo_dinosaur",
    brandId: "toast_box",
    name: "Milo Dinosaur",
    emoji: "🦕",
    category: "Drinks",
    price: 4.5,
    calories: 290,
    protein: 6,
    carbs: 50,
    fat: 7,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_laksa_lemak",
    brandId: "toast_box",
    name: "Laksa Lemak",
    emoji: "🥣",
    category: "Noodles & Rice",
    price: 8,
    calories: 560,
    protein: 22,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_nasi_lemak",
    brandId: "toast_box",
    name: "Nasi Lemak Set",
    emoji: "🍛",
    category: "Noodles & Rice",
    price: 7.2,
    calories: 680,
    protein: 24,
    carbs: 82,
    fat: 27,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_mee_siam",
    brandId: "toast_box",
    name: "Mee Siam",
    emoji: "🍜",
    category: "Noodles & Rice",
    price: 7.5,
    calories: 420,
    protein: 16,
    carbs: 68,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tb_set_a2",
    brandId: "toast_box",
    name: "Set A (Toast + 2 Eggs + Drink)",
    emoji: "🍽️",
    category: "Sets",
    price: 6,
    calories: 430,
    protein: 16,
    carbs: 52,
    fat: 19,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tb_set_b",
    brandId: "toast_box",
    name: "Set B (French Toast + 2 Eggs + Drink)",
    emoji: "🍽️",
    category: "Sets",
    price: 7,
    calories: 560,
    protein: 18,
    carbs: 62,
    fat: 28,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sbux_caffe_latte_tall",
    brandId: "starbucks_sg",
    name: "Caffè Latte (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 7.5,
    calories: 217,
    protein: 10.6,
    carbs: 16,
    fat: 12.4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_iced_caffe_latte_tall",
    brandId: "starbucks_sg",
    name: "Iced Caffè Latte (Tall)",
    emoji: "🧊",
    category: "Espresso Beverages",
    price: 7.5,
    calories: 217,
    protein: 10.6,
    carbs: 16,
    fat: 12.1,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_cappuccino_tall",
    brandId: "starbucks_sg",
    name: "Cappuccino (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 7.5,
    calories: 220,
    protein: 10.6,
    carbs: 16,
    fat: 12.4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_flat_white_tall",
    brandId: "starbucks_sg",
    name: "Flat White (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 7.5,
    calories: 209,
    protein: 10.3,
    carbs: 15.6,
    fat: 11.7,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_caffe_americano_tall",
    brandId: "starbucks_sg",
    name: "Caffè Americano (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 5.5,
    calories: 7,
    protein: 0.7,
    carbs: 1.4,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_iced_americano_tall",
    brandId: "starbucks_sg",
    name: "Iced Americano (Tall)",
    emoji: "🧊",
    category: "Espresso Beverages",
    price: 5.5,
    calories: 11,
    protein: 0.7,
    carbs: 2.1,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_caffe_mocha_tall",
    brandId: "starbucks_sg",
    name: "Caffè Mocha (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 8,
    calories: 334,
    protein: 10.6,
    carbs: 30.2,
    fat: 18.8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_iced_mocha_tall",
    brandId: "starbucks_sg",
    name: "Iced Mocha (Tall)",
    emoji: "🧊",
    category: "Espresso Beverages",
    price: 8,
    calories: 383,
    protein: 10.3,
    carbs: 33,
    fat: 23.4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_vanilla_latte_tall",
    brandId: "starbucks_sg",
    name: "Vanilla Latte (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 7.5,
    calories: 259,
    protein: 9.2,
    carbs: 32.7,
    fat: 10.3,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_iced_vanilla_latte_tall",
    brandId: "starbucks_sg",
    name: "Iced Vanilla Latte (Tall)",
    emoji: "🧊",
    category: "Espresso Beverages",
    price: 7.5,
    calories: 277,
    protein: 9.2,
    carbs: 36.9,
    fat: 10.3,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_caramel_macchiato_tall",
    brandId: "starbucks_sg",
    name: "Caramel Macchiato (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 8,
    calories: 270,
    protein: 9.9,
    carbs: 30.2,
    fat: 12.4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_white_choc_mocha_tall",
    brandId: "starbucks_sg",
    name: "White Chocolate Mocha (Tall)",
    emoji: "☕",
    category: "Espresso Beverages",
    price: 8.5,
    calories: 422,
    protein: 10.6,
    carbs: 46.5,
    fat: 21.7,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_java_chip_frap_tall",
    brandId: "starbucks_sg",
    name: "Java Chip Frappuccino® (Tall)",
    emoji: "🍫",
    category: "Frappuccino",
    price: 9,
    calories: 291,
    protein: 5,
    carbs: 38,
    fat: 13.5,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_caramel_frap_tall",
    brandId: "starbucks_sg",
    name: "Caramel Frappuccino® (Tall)",
    emoji: "🍮",
    category: "Frappuccino",
    price: 8.5,
    calories: 259,
    protein: 4.6,
    carbs: 35.1,
    fat: 11.7,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_mocha_frap_tall",
    brandId: "starbucks_sg",
    name: "Mocha Frappuccino® (Tall)",
    emoji: "🍫",
    category: "Frappuccino",
    price: 8.5,
    calories: 245,
    protein: 4.3,
    carbs: 33,
    fat: 11,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_matcha_creme_frap_tall",
    brandId: "starbucks_sg",
    name: "Matcha Crème Frappuccino® (Tall)",
    emoji: "🍵",
    category: "Frappuccino",
    price: 8.5,
    calories: 248,
    protein: 5.3,
    carbs: 31.2,
    fat: 11.4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_dark_mocha_frap_tall",
    brandId: "starbucks_sg",
    name: "Dark Mocha Frappuccino® (Tall)",
    emoji: "🍫",
    category: "Frappuccino",
    price: 8.5,
    calories: 288,
    protein: 5.3,
    carbs: 35.9,
    fat: 13.8,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_ham_cheese_croissant",
    brandId: "starbucks_sg",
    name: "Ham & Cheese Croissant",
    emoji: "🥐",
    category: "Food",
    price: 6.5,
    calories: 350,
    protein: 18.9,
    carbs: 26,
    fat: 19,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_rosemary_chicken_croissant",
    brandId: "starbucks_sg",
    name: "Rosemary Chicken & Emmental Cheese Croissant",
    emoji: "🥐",
    category: "Food",
    price: 7,
    calories: 400,
    protein: 16.9,
    carbs: 28.4,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_scrambled_egg_brioche",
    brandId: "starbucks_sg",
    name: "Scrambled Egg & Cheese Brioche Sandwich",
    emoji: "🥚",
    category: "Food",
    price: 7,
    calories: 409,
    protein: 17.8,
    carbs: 35.1,
    fat: 21.9,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_chicken_ham_panwich",
    brandId: "starbucks_sg",
    name: "Chicken Ham & Cheese Panwich",
    emoji: "🥪",
    category: "Food",
    price: 7.5,
    calories: 526,
    protein: 19.4,
    carbs: 37.6,
    fat: 33,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_sriracha_chicken_pita",
    brandId: "starbucks_sg",
    name: "Sriracha Chicken Whole Wheat Pita",
    emoji: "🌶️",
    category: "Food",
    price: 7.5,
    calories: 368,
    protein: 17.5,
    carbs: 44.1,
    fat: 13.5,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sbux_chicken_ham_crepe_wrap",
    brandId: "starbucks_sg",
    name: "Chicken Ham & Cheese Egg Crepe Wrap",
    emoji: "🌯",
    category: "Food",
    price: 7.5,
    calories: 420,
    protein: 23,
    carbs: 28,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_buttery_croissant",
    brandId: "starbucks_sg",
    name: "Buttery Croissant",
    emoji: "🥐",
    category: "Bakery",
    price: 4.5,
    calories: 249,
    protein: 5.2,
    carbs: 28,
    fat: 12.9,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sbux_almond_croissant",
    brandId: "starbucks_sg",
    name: "Almond Croissant",
    emoji: "🥐",
    category: "Bakery",
    price: 5.5,
    calories: 422,
    protein: 8.5,
    carbs: 49.9,
    fat: 21,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sbux_banana_walnut_muffin",
    brandId: "starbucks_sg",
    name: "Banana Walnut Muffin",
    emoji: "🧁",
    category: "Bakery",
    price: 5.5,
    calories: 461,
    protein: 7.5,
    carbs: 45,
    fat: 30.8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sbux_blueberry_muffin",
    brandId: "starbucks_sg",
    name: "Blueberry Crumble Muffin",
    emoji: "🧁",
    category: "Bakery",
    price: 5.5,
    calories: 563,
    protein: 7.9,
    carbs: 60.4,
    fat: 34.6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sbux_bagel",
    brandId: "starbucks_sg",
    name: "Bagels",
    emoji: "🥯",
    category: "Bakery",
    price: 4.5,
    calories: 310,
    protein: 10,
    carbs: 68,
    fat: 1,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_chicken_thigh_mild",
    brandId: "popeyes",
    name: "Chicken Thigh — Classic",
    emoji: "🍗",
    category: "Chicken",
    price: 5.9,
    calories: 310,
    protein: 20,
    carbs: 12,
    fat: 21,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_chicken_thigh_spicy",
    brandId: "popeyes",
    name: "Chicken Thigh — Spicy",
    emoji: "🌶️",
    category: "Chicken",
    price: 5.9,
    calories: 320,
    protein: 20,
    carbs: 13,
    fat: 21,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_chicken_leg_mild",
    brandId: "popeyes",
    name: "Chicken Leg — Classic",
    emoji: "🍗",
    category: "Chicken",
    price: 4.9,
    calories: 200,
    protein: 14,
    carbs: 8,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_chicken_leg_spicy",
    brandId: "popeyes",
    name: "Chicken Leg — Spicy",
    emoji: "🌶️",
    category: "Chicken",
    price: 4.9,
    calories: 210,
    protein: 14,
    carbs: 9,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_chicken_breast_mild",
    brandId: "popeyes",
    name: "Chicken Breast — Classic",
    emoji: "🍗",
    category: "Chicken",
    price: 7.5,
    calories: 420,
    protein: 35,
    carbs: 19,
    fat: 24,
    compatibleWith: [
      "halal",
      "no_pork",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_chicken_breast_spicy",
    brandId: "popeyes",
    name: "Chicken Breast — Spicy",
    emoji: "🌶️",
    category: "Chicken",
    price: 7.5,
    calories: 430,
    protein: 35,
    carbs: 20,
    fat: 24,
    compatibleWith: [
      "halal",
      "no_pork",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_chicken_wing_mild",
    brandId: "popeyes",
    name: "Chicken Wing — Classic",
    emoji: "🍗",
    category: "Chicken",
    price: 4.5,
    calories: 150,
    protein: 11,
    carbs: 6,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_chicken_wing_spicy",
    brandId: "popeyes",
    name: "Chicken Wing — Spicy",
    emoji: "🌶️",
    category: "Chicken",
    price: 4.5,
    calories: 160,
    protein: 11,
    carbs: 7,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_tenders_3pc",
    brandId: "popeyes",
    name: "Chicken Tenders (3pc)",
    emoji: "🍗",
    category: "Tenders",
    price: 9.9,
    calories: 390,
    protein: 30,
    carbs: 21,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork",
      "high_protein"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_tenders_5pc",
    brandId: "popeyes",
    name: "Chicken Tenders (5pc)",
    emoji: "🍗",
    category: "Tenders",
    price: 14.9,
    calories: 650,
    protein: 50,
    carbs: 35,
    fat: 33,
    compatibleWith: [
      "halal",
      "no_pork",
      "high_protein"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_classic_chicken_burger",
    brandId: "popeyes",
    name: "Classic Chicken Burger",
    emoji: "🍔",
    category: "Burgers",
    price: 8.9,
    calories: 570,
    protein: 28,
    carbs: 48,
    fat: 30,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_spicy_chicken_burger",
    brandId: "popeyes",
    name: "Spicy Chicken Burger",
    emoji: "🌶️",
    category: "Burgers",
    price: 8.9,
    calories: 580,
    protein: 28,
    carbs: 49,
    fat: 30,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_coleslaw_reg",
    brandId: "popeyes",
    name: "Coleslaw (Regular)",
    emoji: "🥗",
    category: "Sides",
    price: 3.9,
    calories: 220,
    protein: 1,
    carbs: 14,
    fat: 18,
    compatibleWith: [
      "halal",
      "vegetarian",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_mashed_potato_gravy",
    brandId: "popeyes",
    name: "Mashed Potato with Gravy",
    emoji: "🥔",
    category: "Sides",
    price: 3.9,
    calories: 110,
    protein: 2,
    carbs: 17,
    fat: 4,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_cajun_rice",
    brandId: "popeyes",
    name: "Cajun Rice",
    emoji: "🍚",
    category: "Sides",
    price: 3.9,
    calories: 175,
    protein: 4,
    carbs: 29,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_corn_on_cob",
    brandId: "popeyes",
    name: "Corn on the Cob",
    emoji: "🌽",
    category: "Sides",
    price: 3.5,
    calories: 70,
    protein: 2,
    carbs: 14,
    fat: 2,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_red_beans_rice",
    brandId: "popeyes",
    name: "Red Beans & Rice",
    emoji: "🫘",
    category: "Sides",
    price: 3.9,
    calories: 230,
    protein: 5,
    carbs: 34,
    fat: 8,
    compatibleWith: [
      "halal",
      "vegetarian",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "pop_biscuit",
    brandId: "popeyes",
    name: "Buttermilk Biscuit",
    emoji: "🧁",
    category: "Sides",
    price: 2.5,
    calories: 260,
    protein: 4,
    carbs: 27,
    fat: 14,
    compatibleWith: [
      "halal",
      "vegetarian",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_2pc_chicken_meal",
    brandId: "popeyes",
    name: "2-pc Chicken Meal",
    emoji: "🍗",
    category: "Meals",
    price: 12.9,
    calories: 1030,
    protein: 54,
    carbs: 88,
    fat: 50,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pop_chicken_sandwich_meal",
    brandId: "popeyes",
    name: "Chicken Sandwich Meal",
    emoji: "🥪",
    category: "Meals",
    price: 12.5,
    calories: 970,
    protein: 42,
    carbs: 107,
    fat: 42,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_quarter_breast",
    brandId: "nandos",
    name: "1/4 Chicken — Breast & Wing",
    emoji: "🍗",
    category: "Chicken",
    price: 9.9,
    calories: 220,
    protein: 38,
    carbs: 1,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_quarter_thigh_leg",
    brandId: "nandos",
    name: "1/4 Chicken — Thigh & Leg",
    emoji: "🍗",
    category: "Chicken",
    price: 9.9,
    calories: 330,
    protein: 35,
    carbs: 2,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_half_chicken",
    brandId: "nandos",
    name: "1/2 Chicken",
    emoji: "🍗",
    category: "Chicken",
    price: 17.9,
    calories: 550,
    protein: 73,
    carbs: 3,
    fat: 27,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_whole_chicken",
    brandId: "nandos",
    name: "Whole Chicken",
    emoji: "🍗",
    category: "Chicken",
    price: 30.9,
    calories: 1100,
    protein: 146,
    carbs: 6,
    fat: 54,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nan_breast_fillet_burger",
    brandId: "nandos",
    name: "Chicken Breast Fillet Burger",
    emoji: "🍔",
    category: "Burgers",
    price: 14.9,
    calories: 540,
    protein: 37,
    carbs: 53,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_thigh_burger",
    brandId: "nandos",
    name: "Chicken Thigh Burger",
    emoji: "🍔",
    category: "Burgers",
    price: 14.9,
    calories: 600,
    protein: 32,
    carbs: 55,
    fat: 26,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "nan_pita_wrap",
    brandId: "nandos",
    name: "Fino Pitta (Chicken Wrap)",
    emoji: "🫓",
    category: "Wraps",
    price: 14.9,
    calories: 510,
    protein: 31,
    carbs: 53,
    fat: 17,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_chicken_livers",
    brandId: "nandos",
    name: "Chicken Livers",
    emoji: "🍲",
    category: "Starters",
    price: 11.9,
    calories: 290,
    protein: 34,
    carbs: 3,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_wings_4pc",
    brandId: "nandos",
    name: "PERi-PERi Chicken Wings (4 pc)",
    emoji: "🍗",
    category: "Starters",
    price: 14.9,
    calories: 380,
    protein: 28,
    carbs: 1,
    fat: 29,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_peri_chips",
    brandId: "nandos",
    name: "PERi-PERi Chips",
    emoji: "🍟",
    category: "Sides",
    price: 6.9,
    calories: 350,
    protein: 5,
    carbs: 47,
    fat: 15,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_corn_cob",
    brandId: "nandos",
    name: "Corn on the Cob",
    emoji: "🌽",
    category: "Sides",
    price: 4.9,
    calories: 175,
    protein: 4,
    carbs: 35,
    fat: 4,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_coleslaw",
    brandId: "nandos",
    name: "Coleslaw",
    emoji: "🥗",
    category: "Sides",
    price: 4.9,
    calories: 120,
    protein: 1,
    carbs: 14,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nan_garlic_bread",
    brandId: "nandos",
    name: "Garlic Bread",
    emoji: "🍞",
    category: "Sides",
    price: 4.9,
    calories: 200,
    protein: 5,
    carbs: 30,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "nan_portuguese_rice",
    brandId: "nandos",
    name: "Portuguese Rice",
    emoji: "🍚",
    category: "Sides",
    price: 4.9,
    calories: 260,
    protein: 5,
    carbs: 48,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nan_quarter_thigh_plate",
    brandId: "nandos",
    name: "1/4 Chicken Plate — Thigh & Leg",
    emoji: "🍗",
    category: "Plates",
    price: 16.9,
    calories: 800,
    protein: 41,
    carbs: 63,
    fat: 42,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_quarter_breast_plate",
    brandId: "nandos",
    name: "1/4 Chicken Plate — Breast & Wing",
    emoji: "🍗",
    category: "Plates",
    price: 16.9,
    calories: 690,
    protein: 44,
    carbs: 62,
    fat: 29,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "nan_half_chicken_plate",
    brandId: "nandos",
    name: "1/2 Chicken Plate",
    emoji: "🍗",
    category: "Plates",
    price: 24.9,
    calories: 1160,
    protein: 83,
    carbs: 98,
    fat: 47,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nan_burger_meal",
    brandId: "nandos",
    name: "Chicken Breast Fillet Burger + Chips",
    emoji: "🍔",
    category: "Plates",
    price: 20.9,
    calories: 890,
    protein: 42,
    carbs: 100,
    fat: 31,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ph_personal_pepperoni",
    brandId: "pizza_hut",
    name: "Personal Pan Pizza — Pepperoni",
    emoji: "🍕",
    category: "Personal Pizza",
    price: 14.9,
    calories: 660,
    protein: 28,
    carbs: 70,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ph_personal_hawaiian",
    brandId: "pizza_hut",
    name: "Personal Pan Pizza — Hawaiian",
    emoji: "🍕",
    category: "Personal Pizza",
    price: 14.9,
    calories: 620,
    protein: 26,
    carbs: 74,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ph_personal_mushroom",
    brandId: "pizza_hut",
    name: "Personal Pan Pizza — Mushroom",
    emoji: "🍕",
    category: "Personal Pizza",
    price: 13.9,
    calories: 580,
    protein: 20,
    carbs: 72,
    fat: 22,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ph_personal_bbq_chicken",
    brandId: "pizza_hut",
    name: "Personal Pan Pizza — BBQ Chicken",
    emoji: "🍕",
    category: "Personal Pizza",
    price: 14.9,
    calories: 640,
    protein: 30,
    carbs: 72,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ph_super_supreme_slice",
    brandId: "pizza_hut",
    name: "Super Supreme (per slice, Medium)",
    emoji: "🍕",
    category: "Pizza — Medium",
    price: 5.5,
    calories: 280,
    protein: 14,
    carbs: 28,
    fat: 13,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ph_pepperoni_lovers_slice",
    brandId: "pizza_hut",
    name: "Pepperoni Lovers (per slice, Medium)",
    emoji: "🍕",
    category: "Pizza — Medium",
    price: 5.5,
    calories: 310,
    protein: 14,
    carbs: 27,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ph_hawaiian_slice",
    brandId: "pizza_hut",
    name: "Hawaiian (per slice, Medium)",
    emoji: "🍕",
    category: "Pizza — Medium",
    price: 4.9,
    calories: 240,
    protein: 12,
    carbs: 28,
    fat: 9,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ph_bbq_chicken_slice",
    brandId: "pizza_hut",
    name: "BBQ Chicken (per slice, Medium)",
    emoji: "🍕",
    category: "Pizza — Medium",
    price: 4.9,
    calories: 255,
    protein: 13,
    carbs: 29,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ph_pasta_bolognese",
    brandId: "pizza_hut",
    name: "Baked Pasta — Bolognese",
    emoji: "🍝",
    category: "Pastas",
    price: 14.9,
    calories: 650,
    protein: 28,
    carbs: 72,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ph_pasta_creamy_mushroom",
    brandId: "pizza_hut",
    name: "Baked Pasta — Creamy Mushroom",
    emoji: "🍝",
    category: "Pastas",
    price: 13.9,
    calories: 680,
    protein: 19,
    carbs: 75,
    fat: 30,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ph_garlic_bread",
    brandId: "pizza_hut",
    name: "5 Cheese Garlic Bread",
    emoji: "🧄",
    category: "Sides",
    price: 8.9,
    calories: 380,
    protein: 12,
    carbs: 48,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ph_wings_8pc",
    brandId: "pizza_hut",
    name: "Chicken Wings (8 pc)",
    emoji: "🍗",
    category: "Sides",
    price: 14.9,
    calories: 560,
    protein: 48,
    carbs: 8,
    fat: 38,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_chicken_pepperoni_slice",
    brandId: "dominos",
    name: "Chicken Pepperoni (per slice, Regular)",
    emoji: "🍕",
    category: "Pizza — Regular",
    price: 2.9,
    calories: 250,
    protein: 12,
    carbs: 27,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_beef_mushroom_slice",
    brandId: "dominos",
    name: "Beef & Mushroom (per slice, Regular)",
    emoji: "🍕",
    category: "Pizza — Regular",
    price: 2.9,
    calories: 240,
    protein: 11,
    carbs: 27,
    fat: 9,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "dom_garden_fresh_slice",
    brandId: "dominos",
    name: "Garden Fresh (per slice, Regular)",
    emoji: "🍕",
    category: "Pizza — Regular",
    price: 2.5,
    calories: 210,
    protein: 8,
    carbs: 28,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dom_bbq_chicken_slice",
    brandId: "dominos",
    name: "BBQ Chicken (per slice, Regular)",
    emoji: "🍕",
    category: "Pizza — Regular",
    price: 2.9,
    calories: 255,
    protein: 12,
    carbs: 28,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_double_decadence_slice",
    brandId: "dominos",
    name: "Double Decadence (per slice, Regular)",
    emoji: "🍕",
    category: "Pizza — Regular",
    price: 3.5,
    calories: 320,
    protein: 15,
    carbs: 32,
    fat: 14,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "dom_personal_chicken_pepperoni",
    brandId: "dominos",
    name: "Personal Pizza — Chicken Pepperoni",
    emoji: "🍕",
    category: "Personal Pizza",
    price: 12.9,
    calories: 540,
    protein: 24,
    carbs: 58,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_personal_veg",
    brandId: "dominos",
    name: "Personal Pizza — Garden Fresh",
    emoji: "🍕",
    category: "Personal Pizza",
    price: 11.9,
    calories: 460,
    protein: 17,
    carbs: 61,
    fat: 15,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dom_wings_4pc",
    brandId: "dominos",
    name: "Chicken Wings (4 pc)",
    emoji: "🍗",
    category: "Sides",
    price: 9.9,
    calories: 350,
    protein: 28,
    carbs: 1,
    fat: 26,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_boneless_chicken_6pc",
    brandId: "dominos",
    name: "Boneless Chicken (6 pc)",
    emoji: "🍗",
    category: "Sides",
    price: 9.9,
    calories: 380,
    protein: 24,
    carbs: 22,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_garlic_twists",
    brandId: "dominos",
    name: "Garlic Twists (8 pc)",
    emoji: "🧄",
    category: "Sides",
    price: 5.9,
    calories: 350,
    protein: 8,
    carbs: 56,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_lava_cake",
    brandId: "dominos",
    name: "Lava Cake (2 pc)",
    emoji: "🍫",
    category: "Desserts",
    price: 8.9,
    calories: 420,
    protein: 6,
    carbs: 56,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dom_pasta_bolognese",
    brandId: "dominos",
    name: "Pasta — Bolognese",
    emoji: "🍝",
    category: "Pastas",
    price: 9.9,
    calories: 580,
    protein: 24,
    carbs: 72,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "ws_wings_6pc_hot",
    brandId: "wingstop",
    name: "Classic Wings 6 pc — Classic Hot",
    emoji: "🍗",
    category: "Wings",
    price: 14.9,
    calories: 570,
    protein: 48,
    carbs: 3,
    fat: 38,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_wings_6pc_lemon_pepper",
    brandId: "wingstop",
    name: "Classic Wings 6 pc — Lemon Pepper",
    emoji: "🍗",
    category: "Wings",
    price: 14.9,
    calories: 600,
    protein: 42,
    carbs: 6,
    fat: 42,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_wings_6pc_garlic_parm",
    brandId: "wingstop",
    name: "Classic Wings 6 pc — Garlic Parmesan",
    emoji: "🍗",
    category: "Wings",
    price: 14.9,
    calories: 660,
    protein: 42,
    carbs: 12,
    fat: 46,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "ws_wings_6pc_cajun",
    brandId: "wingstop",
    name: "Classic Wings 6 pc — Cajun",
    emoji: "🍗",
    category: "Wings",
    price: 14.9,
    calories: 540,
    protein: 48,
    carbs: 3,
    fat: 36,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "ws_wings_6pc_mango_habanero",
    brandId: "wingstop",
    name: "Classic Wings 6 pc — Mango Habanero",
    emoji: "🌶️",
    category: "Wings",
    price: 14.9,
    calories: 750,
    protein: 42,
    carbs: 42,
    fat: 42,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_wings_10pc_hot",
    brandId: "wingstop",
    name: "Classic Wings 10 pc — Classic Hot",
    emoji: "🍗",
    category: "Wings",
    price: 22.9,
    calories: 950,
    protein: 80,
    carbs: 5,
    fat: 63,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_boneless_6pc_hot",
    brandId: "wingstop",
    name: "Boneless Wings 6 pc — Classic Hot",
    emoji: "🍗",
    category: "Wings",
    price: 13.9,
    calories: 520,
    protein: 34,
    carbs: 38,
    fat: 24,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "ws_seasoned_fries_reg",
    brandId: "wingstop",
    name: "Seasoned Fries (Regular)",
    emoji: "🍟",
    category: "Sides",
    price: 5.9,
    calories: 430,
    protein: 6,
    carbs: 57,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_cajun_fries_reg",
    brandId: "wingstop",
    name: "Cajun Fries (Regular)",
    emoji: "🍟",
    category: "Sides",
    price: 5.9,
    calories: 445,
    protein: 6,
    carbs: 58,
    fat: 21,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_coleslaw",
    brandId: "wingstop",
    name: "Coleslaw",
    emoji: "🥗",
    category: "Sides",
    price: 3.9,
    calories: 110,
    protein: 1,
    carbs: 14,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ws_corn",
    brandId: "wingstop",
    name: "Corn on the Cob",
    emoji: "🌽",
    category: "Sides",
    price: 3.9,
    calories: 180,
    protein: 4,
    carbs: 32,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "ws_6pc_combo",
    brandId: "wingstop",
    name: "6 Classic Wings Combo",
    emoji: "🍗",
    category: "Wing Combos",
    price: 19.9,
    calories: 1000,
    protein: 54,
    carbs: 60,
    fat: 58,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_10pc_combo",
    brandId: "wingstop",
    name: "10 Classic Wings Combo",
    emoji: "🍗",
    category: "Wing Combos",
    price: 27.9,
    calories: 1380,
    protein: 86,
    carbs: 62,
    fat: 83,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ws_boneless_6pc_combo",
    brandId: "wingstop",
    name: "6 Boneless Wings Combo",
    emoji: "🍗",
    category: "Wing Combos",
    price: 18.9,
    calories: 950,
    protein: 40,
    carbs: 95,
    fat: 44,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "gyg_burrito_chicken",
    brandId: "gyg",
    name: "Burrito — Grilled Chicken",
    emoji: "🌯",
    category: "Burritos",
    price: 13.9,
    calories: 830,
    protein: 45,
    carbs: 82,
    fat: 32,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gyg_burrito_beef",
    brandId: "gyg",
    name: "Burrito — Pulled Beef",
    emoji: "🌯",
    category: "Burritos",
    price: 14.9,
    calories: 890,
    protein: 42,
    carbs: 84,
    fat: 38,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gyg_bowl_chicken",
    brandId: "gyg",
    name: "Bowl — Grilled Chicken",
    emoji: "🥗",
    category: "Bowls",
    price: 13.9,
    calories: 650,
    protein: 48,
    carbs: 58,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gyg_bowl_beef",
    brandId: "gyg",
    name: "Bowl — Pulled Beef",
    emoji: "🥗",
    category: "Bowls",
    price: 14.9,
    calories: 710,
    protein: 44,
    carbs: 60,
    fat: 28,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gyg_tacos_2pc_chicken",
    brandId: "gyg",
    name: "Tacos 2 pc — Grilled Chicken",
    emoji: "🌮",
    category: "Tacos",
    price: 12.9,
    calories: 640,
    protein: 36,
    carbs: 64,
    fat: 24,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gyg_taco_1pc_chicken",
    brandId: "gyg",
    name: "Taco 1 pc — Grilled Chicken",
    emoji: "🌮",
    category: "Tacos",
    price: 6.9,
    calories: 320,
    protein: 18,
    carbs: 32,
    fat: 12,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "gyg_quesadilla_chicken",
    brandId: "gyg",
    name: "Quesadilla — Grilled Chicken",
    emoji: "🫓",
    category: "Quesadillas",
    price: 13.9,
    calories: 580,
    protein: 35,
    carbs: 45,
    fat: 28,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "gyg_nachos_chicken",
    brandId: "gyg",
    name: "Nachos — Grilled Chicken",
    emoji: "🧀",
    category: "Nachos",
    price: 13.9,
    calories: 850,
    protein: 35,
    carbs: 90,
    fat: 38,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "gyg_chips_guac",
    brandId: "gyg",
    name: "Chips & Guacamole",
    emoji: "🥑",
    category: "Sides",
    price: 7.9,
    calories: 380,
    protein: 5,
    carbs: 38,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gyg_churros",
    brandId: "gyg",
    name: "Churros (3 pc)",
    emoji: "🍩",
    category: "Desserts",
    price: 6.9,
    calories: 280,
    protein: 4,
    carbs: 42,
    fat: 11,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_shackburger",
    brandId: "shake_shack",
    name: "ShackBurger",
    emoji: "🍔",
    category: "Burgers",
    price: 12.9,
    calories: 500,
    protein: 24,
    carbs: 40,
    fat: 27,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_double_shackburger",
    brandId: "shake_shack",
    name: "Double ShackBurger",
    emoji: "🍔",
    category: "Burgers",
    price: 17.9,
    calories: 790,
    protein: 45,
    carbs: 41,
    fat: 50,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_smokeshack",
    brandId: "shake_shack",
    name: "SmokeShack",
    emoji: "🥓",
    category: "Burgers",
    price: 14.9,
    calories: 600,
    protein: 34,
    carbs: 41,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_shackmeister",
    brandId: "shake_shack",
    name: "ShackMeister",
    emoji: "🍄",
    category: "Burgers",
    price: 14.9,
    calories: 610,
    protein: 32,
    carbs: 43,
    fat: 33,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ss_shroom_burger",
    brandId: "shake_shack",
    name: "'Shroom Burger",
    emoji: "🍄",
    category: "Burgers",
    price: 13.9,
    calories: 490,
    protein: 19,
    carbs: 39,
    fat: 28,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_chickn_shack",
    brandId: "shake_shack",
    name: "Chick'n Shack",
    emoji: "🍗",
    category: "Burgers",
    price: 13.9,
    calories: 560,
    protein: 31,
    carbs: 45,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_chickn_bites_6pc",
    brandId: "shake_shack",
    name: "Chick'n Bites (6 pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 9.9,
    calories: 380,
    protein: 26,
    carbs: 26,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ss_crinkle_fries",
    brandId: "shake_shack",
    name: "Crinkle Cut Fries",
    emoji: "🍟",
    category: "Sides",
    price: 6.9,
    calories: 420,
    protein: 5,
    carbs: 57,
    fat: 19,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_cheese_fries",
    brandId: "shake_shack",
    name: "Cheese Fries",
    emoji: "🧀",
    category: "Sides",
    price: 8.9,
    calories: 550,
    protein: 12,
    carbs: 62,
    fat: 26,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_vanilla_shake",
    brandId: "shake_shack",
    name: "Vanilla Shake",
    emoji: "🥛",
    category: "Shakes",
    price: 10.9,
    calories: 680,
    protein: 14,
    carbs: 86,
    fat: 31,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_chocolate_shake",
    brandId: "shake_shack",
    name: "Chocolate Shake",
    emoji: "🍫",
    category: "Shakes",
    price: 10.9,
    calories: 720,
    protein: 15,
    carbs: 92,
    fat: 32,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_strawberry_shake",
    brandId: "shake_shack",
    name: "Strawberry Shake",
    emoji: "🍓",
    category: "Shakes",
    price: 10.9,
    calories: 690,
    protein: 13,
    carbs: 91,
    fat: 28,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_shackburger_meal",
    brandId: "shake_shack",
    name: "ShackBurger Meal",
    emoji: "🍔",
    category: "Shack Meals",
    price: 22.9,
    calories: 1070,
    protein: 29,
    carbs: 135,
    fat: 46,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_double_shackburger_meal",
    brandId: "shake_shack",
    name: "Double ShackBurger Meal",
    emoji: "🍔",
    category: "Shack Meals",
    price: 27.9,
    calories: 1360,
    protein: 50,
    carbs: 136,
    fat: 69,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ss_smokeshack_meal",
    brandId: "shake_shack",
    name: "SmokeShack Meal",
    emoji: "🍔",
    category: "Shack Meals",
    price: 24.9,
    calories: 1170,
    protein: 39,
    carbs: 136,
    fat: 51,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_chickn_shack_meal",
    brandId: "shake_shack",
    name: "Chick'n Shack Meal",
    emoji: "🍔",
    category: "Shack Meals",
    price: 23.9,
    calories: 1130,
    protein: 36,
    carbs: 140,
    fat: 47,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fg_hamburger",
    brandId: "five_guys",
    name: "Hamburger",
    emoji: "🍔",
    category: "Burgers",
    price: 16.9,
    calories: 700,
    protein: 41,
    carbs: 40,
    fat: 43,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fg_cheeseburger",
    brandId: "five_guys",
    name: "Cheeseburger",
    emoji: "🍔",
    category: "Burgers",
    price: 17.9,
    calories: 840,
    protein: 51,
    carbs: 41,
    fat: 55,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fg_bacon_cheeseburger",
    brandId: "five_guys",
    name: "Bacon Cheeseburger",
    emoji: "🥓",
    category: "Burgers",
    price: 19.9,
    calories: 920,
    protein: 57,
    carbs: 41,
    fat: 62,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fg_little_hamburger",
    brandId: "five_guys",
    name: "Little Hamburger",
    emoji: "🍔",
    category: "Burgers",
    price: 13.9,
    calories: 480,
    protein: 23,
    carbs: 39,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fg_little_cheeseburger",
    brandId: "five_guys",
    name: "Little Cheeseburger",
    emoji: "🍔",
    category: "Burgers",
    price: 14.9,
    calories: 550,
    protein: 28,
    carbs: 39,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fg_veggie_sandwich",
    brandId: "five_guys",
    name: "Veggie Sandwich",
    emoji: "🥬",
    category: "Burgers",
    price: 12.9,
    calories: 440,
    protein: 11,
    carbs: 60,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "fg_hot_dog",
    brandId: "five_guys",
    name: "Hot Dog",
    emoji: "🌭",
    category: "Hot Dogs",
    price: 13.9,
    calories: 530,
    protein: 21,
    carbs: 40,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fg_fries_little",
    brandId: "five_guys",
    name: "Little Fries",
    emoji: "🍟",
    category: "Sides",
    price: 6.9,
    calories: 320,
    protein: 5,
    carbs: 43,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "fg_fries_regular",
    brandId: "five_guys",
    name: "Regular Fries",
    emoji: "🍟",
    category: "Sides",
    price: 8.9,
    calories: 530,
    protein: 8,
    carbs: 70,
    fat: 23,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fg_large_fries",
    brandId: "five_guys",
    name: "Large Fries",
    emoji: "🍟",
    category: "Sides",
    price: 10.9,
    calories: 953,
    protein: 15,
    carbs: 131,
    fat: 41,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "fg_vanilla_shake",
    brandId: "five_guys",
    name: "Vanilla Milkshake",
    emoji: "🥛",
    category: "Shakes",
    price: 12.9,
    calories: 680,
    protein: 16,
    carbs: 79,
    fat: 35,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kk_original_glazed",
    brandId: "krispy_kreme",
    name: "Original Glazed Doughnut",
    emoji: "🍩",
    category: "Classic Doughnuts",
    price: 2.9,
    calories: 190,
    protein: 2,
    carbs: 22,
    fat: 11,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_chocolate_iced",
    brandId: "krispy_kreme",
    name: "Chocolate Iced Glazed",
    emoji: "🍩",
    category: "Classic Doughnuts",
    price: 3.2,
    calories: 240,
    protein: 3,
    carbs: 32,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_strawberry_sprinkles",
    brandId: "krispy_kreme",
    name: "Strawberry Sprinkles",
    emoji: "🍓",
    category: "Classic Doughnuts",
    price: 3.2,
    calories: 220,
    protein: 2,
    carbs: 28,
    fat: 11,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kk_chocolate_kreme_filled",
    brandId: "krispy_kreme",
    name: "Chocolate Kreme Filled",
    emoji: "🍩",
    category: "Filled Doughnuts",
    price: 3.5,
    calories: 300,
    protein: 3,
    carbs: 34,
    fat: 17,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_original_kreme_filled",
    brandId: "krispy_kreme",
    name: "Original Kreme Filled",
    emoji: "🍩",
    category: "Filled Doughnuts",
    price: 3.5,
    calories: 290,
    protein: 3,
    carbs: 33,
    fat: 17,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kk_biscoff_kreme",
    brandId: "krispy_kreme",
    name: "Biscoff Kreme Doughnut",
    emoji: "🍪",
    category: "Specialty Doughnuts",
    price: 3.9,
    calories: 340,
    protein: 3,
    carbs: 42,
    fat: 17,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_matcha",
    brandId: "krispy_kreme",
    name: "Matcha Doughnut",
    emoji: "🍵",
    category: "Specialty Doughnuts",
    price: 3.9,
    calories: 280,
    protein: 3,
    carbs: 34,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_glazed_cruller",
    brandId: "krispy_kreme",
    name: "Glazed Cruller",
    emoji: "🍩",
    category: "Classic Doughnuts",
    price: 3.2,
    calories: 220,
    protein: 3,
    carbs: 26,
    fat: 13,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kk_dozen_original",
    brandId: "krispy_kreme",
    name: "Dozen Original Glazed",
    emoji: "📦",
    category: "Boxes",
    price: 29.9,
    calories: 2280,
    protein: 24,
    carbs: 264,
    fat: 132,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_hot_latte",
    brandId: "krispy_kreme",
    name: "Original Glazed Hot Latte",
    emoji: "☕",
    category: "Beverages",
    price: 7.9,
    calories: 280,
    protein: 10,
    carbs: 36,
    fat: 11,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kk_iced_latte",
    brandId: "krispy_kreme",
    name: "Original Glazed Iced Latte",
    emoji: "🧋",
    category: "Beverages",
    price: 7.9,
    calories: 310,
    protein: 10,
    carbs: 42,
    fat: 11,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dd_glazed",
    brandId: "dunkin",
    name: "Glazed Doughnut",
    emoji: "🍩",
    category: "Classic Doughnuts",
    price: 2.4,
    calories: 270,
    protein: 4,
    carbs: 32,
    fat: 14,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_chocolate_frosted",
    brandId: "dunkin",
    name: "Chocolate Frosted Doughnut",
    emoji: "🍩",
    category: "Classic Doughnuts",
    price: 2.6,
    calories: 310,
    protein: 4,
    carbs: 38,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_strawberry_frosted",
    brandId: "dunkin",
    name: "Strawberry Frosted Doughnut",
    emoji: "🍓",
    category: "Classic Doughnuts",
    price: 2.6,
    calories: 300,
    protein: 4,
    carbs: 36,
    fat: 15,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dd_boston_kreme",
    brandId: "dunkin",
    name: "Boston Kreme",
    emoji: "🍩",
    category: "Filled Doughnuts",
    price: 2.8,
    calories: 300,
    protein: 4,
    carbs: 36,
    fat: 15,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_jelly",
    brandId: "dunkin",
    name: "Jelly Doughnut",
    emoji: "🍩",
    category: "Filled Doughnuts",
    price: 2.6,
    calories: 280,
    protein: 4,
    carbs: 33,
    fat: 14,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dd_munchkins_5pc",
    brandId: "dunkin",
    name: "Munchkins Doughnut Holes (5 pc)",
    emoji: "🍩",
    category: "Munchkins",
    price: 3.5,
    calories: 280,
    protein: 4,
    carbs: 36,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_original_coffee_med",
    brandId: "dunkin",
    name: "Original Blend Coffee (Medium)",
    emoji: "☕",
    category: "Coffee",
    price: 3.9,
    calories: 15,
    protein: 1,
    carbs: 2,
    fat: 0,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_caramel_latte_med",
    brandId: "dunkin",
    name: "Caramel Swirl Latte (Medium)",
    emoji: "☕",
    category: "Coffee",
    price: 6.5,
    calories: 280,
    protein: 9,
    carbs: 38,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_iced_coffee_med",
    brandId: "dunkin",
    name: "Iced Coffee (Medium)",
    emoji: "🧋",
    category: "Coffee",
    price: 5.5,
    calories: 230,
    protein: 7,
    carbs: 35,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dd_egg_cheese_croissant",
    brandId: "dunkin",
    name: "Egg & Cheese Croissant",
    emoji: "🥐",
    category: "Food",
    price: 6.9,
    calories: 380,
    protein: 14,
    carbs: 32,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dd_hash_browns",
    brandId: "dunkin",
    name: "Hash Browns (3 pc)",
    emoji: "🥔",
    category: "Food",
    price: 3.5,
    calories: 200,
    protein: 2,
    carbs: 22,
    fat: 12,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_original_pretzel",
    brandId: "auntie_annes",
    name: "Original Pretzel",
    emoji: "🥨",
    category: "Pretzels",
    price: 5.9,
    calories: 340,
    protein: 9,
    carbs: 72,
    fat: 2,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_cinnamon_sugar_pretzel",
    brandId: "auntie_annes",
    name: "Cinnamon Sugar Pretzel",
    emoji: "🥨",
    category: "Pretzels",
    price: 6.5,
    calories: 470,
    protein: 9,
    carbs: 84,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_almond_pretzel",
    brandId: "auntie_annes",
    name: "Almond Pretzel",
    emoji: "🥨",
    category: "Pretzels",
    price: 6.5,
    calories: 400,
    protein: 9,
    carbs: 72,
    fat: 9,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aa_cheese_pretzel",
    brandId: "auntie_annes",
    name: "Cheese Pretzel",
    emoji: "🧀",
    category: "Pretzels",
    price: 6.5,
    calories: 360,
    protein: 11,
    carbs: 62,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_garlic_pretzel",
    brandId: "auntie_annes",
    name: "Garlic Pretzel",
    emoji: "🧄",
    category: "Pretzels",
    price: 6.5,
    calories: 340,
    protein: 10,
    carbs: 68,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aa_sour_cream_onion_pretzel",
    brandId: "auntie_annes",
    name: "Sour Cream & Onion Pretzel",
    emoji: "🥨",
    category: "Pretzels",
    price: 6.5,
    calories: 310,
    protein: 9,
    carbs: 58,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aa_pretzel_dog",
    brandId: "auntie_annes",
    name: "Pretzel Dog",
    emoji: "🌭",
    category: "Pretzel Dogs",
    price: 6.9,
    calories: 360,
    protein: 15,
    carbs: 45,
    fat: 12,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_pretzel_bites",
    brandId: "auntie_annes",
    name: "Pretzel Bites (Original)",
    emoji: "🥨",
    category: "Pretzel Bites",
    price: 5.9,
    calories: 390,
    protein: 10,
    carbs: 77,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_cinnamon_sugar_bites",
    brandId: "auntie_annes",
    name: "Pretzel Bites (Cinnamon Sugar)",
    emoji: "🥨",
    category: "Pretzel Bites",
    price: 5.9,
    calories: 510,
    protein: 9,
    carbs: 92,
    fat: 10,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aa_nuggets_4pc",
    brandId: "auntie_annes",
    name: "Pretzel Nuggets (4 pc)",
    emoji: "🥨",
    category: "Pretzel Bites",
    price: 4.5,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "aa_lemonade",
    brandId: "auntie_annes",
    name: "Dutch Ice Lemonade",
    emoji: "🍋",
    category: "Beverages",
    price: 5.9,
    calories: 180,
    protein: 0,
    carbs: 45,
    fat: 0,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aa_dipping_cheese",
    brandId: "auntie_annes",
    name: "Cheese Dipping Sauce",
    emoji: "🧀",
    category: "Extras",
    price: 1.5,
    calories: 80,
    protein: 3,
    carbs: 5,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_orig_1pc_thigh",
    brandId: "texas_chicken",
    name: "Original Recipe — Thigh (1 pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 4.8,
    calories: 330,
    protein: 22,
    carbs: 14,
    fat: 21,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_orig_1pc_breast",
    brandId: "texas_chicken",
    name: "Original Recipe — Breast (1 pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 5.2,
    calories: 370,
    protein: 35,
    carbs: 15,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "tc_spicy_1pc_thigh",
    brandId: "texas_chicken",
    name: "Spicy — Thigh (1 pc)",
    emoji: "🌶️",
    category: "Chicken",
    price: 4.8,
    calories: 340,
    protein: 22,
    carbs: 15,
    fat: 22,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_tenders_3pc",
    brandId: "texas_chicken",
    name: "Chicken Tenders (3 pc)",
    emoji: "🍗",
    category: "Chicken",
    price: 8.9,
    calories: 390,
    protein: 30,
    carbs: 24,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_chicken_sandwich",
    brandId: "texas_chicken",
    name: "Chicken Sandwich",
    emoji: "🍔",
    category: "Burgers",
    price: 8.5,
    calories: 560,
    protein: 28,
    carbs: 54,
    fat: 26,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_honey_butter_biscuit",
    brandId: "texas_chicken",
    name: "Honey Butter Biscuit",
    emoji: "🧇",
    category: "Sides",
    price: 2.5,
    calories: 260,
    protein: 4,
    carbs: 34,
    fat: 12,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_coleslaw",
    brandId: "texas_chicken",
    name: "Coleslaw",
    emoji: "🥗",
    category: "Sides",
    price: 3,
    calories: 150,
    protein: 1,
    carbs: 18,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "tc_mashed_potato",
    brandId: "texas_chicken",
    name: "Mashed Potato & Gravy",
    emoji: "🥔",
    category: "Sides",
    price: 3.5,
    calories: 140,
    protein: 3,
    carbs: 20,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "tc_fries_regular",
    brandId: "texas_chicken",
    name: "Seasoned Fries (Regular)",
    emoji: "🍟",
    category: "Sides",
    price: 3.5,
    calories: 320,
    protein: 4,
    carbs: 42,
    fat: 15,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_corn_cobette",
    brandId: "texas_chicken",
    name: "Corn Cobette",
    emoji: "🌽",
    category: "Sides",
    price: 2.5,
    calories: 140,
    protein: 3,
    carbs: 26,
    fat: 3,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tc_1pc_thigh_meal",
    brandId: "texas_chicken",
    name: "1pc Chicken Meal (Thigh)",
    emoji: "🍗",
    category: "Meal Sets",
    price: 9.9,
    calories: 910,
    protein: 30,
    carbs: 90,
    fat: 48,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_1pc_breast_meal",
    brandId: "texas_chicken",
    name: "1pc Chicken Meal (Breast)",
    emoji: "🍗",
    category: "Meal Sets",
    price: 10.5,
    calories: 950,
    protein: 43,
    carbs: 91,
    fat: 47,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tc_tenders_meal",
    brandId: "texas_chicken",
    name: "Chicken Tenders (3pc) Meal",
    emoji: "🍗",
    category: "Meal Sets",
    price: 12.9,
    calories: 970,
    protein: 38,
    carbs: 100,
    fat: 47,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tc_sandwich_meal",
    brandId: "texas_chicken",
    name: "Chicken Sandwich Meal",
    emoji: "🍔",
    category: "Meal Sets",
    price: 12.9,
    calories: 1030,
    protein: 32,
    carbs: 134,
    fat: 41,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "cj_western_bacon",
    brandId: "carl_jr",
    name: "Western Bacon Cheeseburger",
    emoji: "🍔",
    category: "Burgers",
    price: 14.9,
    calories: 710,
    protein: 38,
    carbs: 65,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cj_famous_star",
    brandId: "carl_jr",
    name: "Famous Star with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 12.9,
    calories: 660,
    protein: 32,
    carbs: 49,
    fat: 39,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cj_super_star",
    brandId: "carl_jr",
    name: "Super Star with Cheese",
    emoji: "🍔",
    category: "Burgers",
    price: 15.9,
    calories: 910,
    protein: 50,
    carbs: 52,
    fat: 55,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "cj_beyond_famous_star",
    brandId: "carl_jr",
    name: "Beyond Famous Star",
    emoji: "🌱",
    category: "Burgers",
    price: 14.9,
    calories: 700,
    protein: 36,
    carbs: 58,
    fat: 38,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "cj_chicken_sandwich",
    brandId: "carl_jr",
    name: "Charbroiled Chicken Club Sandwich",
    emoji: "🍗",
    category: "Burgers",
    price: 13.9,
    calories: 550,
    protein: 40,
    carbs: 44,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "cj_fries_medium",
    brandId: "carl_jr",
    name: "Natural-Cut Fries (Medium)",
    emoji: "🍟",
    category: "Sides",
    price: 4.5,
    calories: 430,
    protein: 5,
    carbs: 56,
    fat: 20,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cj_onion_rings",
    brandId: "carl_jr",
    name: "Fried Zucchini / Onion Rings",
    emoji: "🧅",
    category: "Sides",
    price: 5.9,
    calories: 390,
    protein: 5,
    carbs: 51,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "cj_vanilla_shake",
    brandId: "carl_jr",
    name: "Vanilla Shake",
    emoji: "🥛",
    category: "Shakes",
    price: 7.9,
    calories: 710,
    protein: 15,
    carbs: 103,
    fat: 27,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "mos_mos_burger",
    brandId: "mos_burger",
    name: "MOS Burger",
    emoji: "🍔",
    category: "Burgers",
    price: 8.5,
    calories: 360,
    protein: 18,
    carbs: 38,
    fat: 15,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_teriyaki_chicken",
    brandId: "mos_burger",
    name: "Teriyaki Chicken Burger",
    emoji: "🍔",
    category: "Burgers",
    price: 8.5,
    calories: 400,
    protein: 22,
    carbs: 42,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_spicy_chicken",
    brandId: "mos_burger",
    name: "Spicy Chicken Burger",
    emoji: "🌶️",
    category: "Burgers",
    price: 8.5,
    calories: 430,
    protein: 22,
    carbs: 44,
    fat: 18,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_fish_burger",
    brandId: "mos_burger",
    name: "Fish Burger",
    emoji: "🐟",
    category: "Burgers",
    price: 7.9,
    calories: 340,
    protein: 16,
    carbs: 38,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "mos_rice_burger_chicken",
    brandId: "mos_burger",
    name: "Rice Burger — Teriyaki Chicken",
    emoji: "🍚",
    category: "Rice Burgers",
    price: 9.5,
    calories: 410,
    protein: 20,
    carbs: 56,
    fat: 12,
    compatibleWith: [
      "halal",
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_onion_rings",
    brandId: "mos_burger",
    name: "Onion Rings",
    emoji: "🧅",
    category: "Sides",
    price: 3.9,
    calories: 270,
    protein: 4,
    carbs: 34,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_fries",
    brandId: "mos_burger",
    name: "French Fries",
    emoji: "🍟",
    category: "Sides",
    price: 3.5,
    calories: 310,
    protein: 4,
    carbs: 41,
    fat: 14,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "mos_corn_soup",
    brandId: "mos_burger",
    name: "Corn Soup",
    emoji: "🌽",
    category: "Sides",
    price: 3.9,
    calories: 120,
    protein: 3,
    carbs: 18,
    fat: 4,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "mos_mos_burger_set",
    brandId: "mos_burger",
    name: "MOS Burger Set",
    emoji: "🍔",
    category: "Sets",
    price: 12.9,
    calories: 820,
    protein: 22,
    carbs: 117,
    fat: 29,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_teriyaki_chicken_set",
    brandId: "mos_burger",
    name: "Teriyaki Chicken Burger Set",
    emoji: "🍔",
    category: "Sets",
    price: 12.9,
    calories: 860,
    protein: 26,
    carbs: 121,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mos_spicy_chicken_set",
    brandId: "mos_burger",
    name: "Spicy Chicken Burger Set",
    emoji: "🍔",
    category: "Sets",
    price: 12.9,
    calories: 890,
    protein: 26,
    carbs: 123,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "mos_rice_burger_set",
    brandId: "mos_burger",
    name: "Rice Burger Set (Teriyaki Chicken)",
    emoji: "🍚",
    category: "Sets",
    price: 13.9,
    calories: 680,
    protein: 23,
    carbs: 112,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_beef_bowl_reg",
    brandId: "yoshinoya",
    name: "Beef Bowl (Regular)",
    emoji: "🍱",
    category: "Beef Bowls",
    price: 8.9,
    calories: 640,
    protein: 26,
    carbs: 88,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_beef_bowl_large",
    brandId: "yoshinoya",
    name: "Beef Bowl (Large)",
    emoji: "🍱",
    category: "Beef Bowls",
    price: 11.5,
    calories: 860,
    protein: 35,
    carbs: 118,
    fat: 26,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "yoshi_chicken_bowl_reg",
    brandId: "yoshinoya",
    name: "Chicken Bowl (Regular)",
    emoji: "🍗",
    category: "Chicken Bowls",
    price: 8.9,
    calories: 620,
    protein: 30,
    carbs: 84,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_cheese_beef_bowl",
    brandId: "yoshinoya",
    name: "Cheese Beef Bowl (Regular)",
    emoji: "🧀",
    category: "Beef Bowls",
    price: 10.5,
    calories: 730,
    protein: 30,
    carbs: 90,
    fat: 28,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_salmon_bowl",
    brandId: "yoshinoya",
    name: "Salmon Bowl (Regular)",
    emoji: "🐟",
    category: "Other Bowls",
    price: 11.5,
    calories: 590,
    protein: 32,
    carbs: 78,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "yoshi_egg",
    brandId: "yoshinoya",
    name: "Onsen Egg",
    emoji: "🥚",
    category: "Extras",
    price: 1.5,
    calories: 70,
    protein: 6,
    carbs: 1,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_miso_soup",
    brandId: "yoshinoya",
    name: "Miso Soup",
    emoji: "🍜",
    category: "Sides",
    price: 1.5,
    calories: 40,
    protein: 3,
    carbs: 4,
    fat: 1,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_potato_salad",
    brandId: "yoshinoya",
    name: "Japanese Potato Salad",
    emoji: "🥔",
    category: "Sides",
    price: 3.5,
    calories: 180,
    protein: 3,
    carbs: 22,
    fat: 9,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "yoshi_beef_bowl_set_reg",
    brandId: "yoshinoya",
    name: "Beef Bowl Set (Regular)",
    emoji: "🥩",
    category: "Bowl Sets",
    price: 11.9,
    calories: 680,
    protein: 29,
    carbs: 92,
    fat: 21,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_beef_bowl_set_large",
    brandId: "yoshinoya",
    name: "Beef Bowl Set (Large)",
    emoji: "🥩",
    category: "Bowl Sets",
    price: 14.5,
    calories: 900,
    protein: 38,
    carbs: 122,
    fat: 27,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "yoshi_chicken_bowl_set",
    brandId: "yoshinoya",
    name: "Chicken Bowl Set (Regular)",
    emoji: "🍗",
    category: "Bowl Sets",
    price: 11.9,
    calories: 660,
    protein: 33,
    carbs: 88,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yoshi_cheese_beef_set",
    brandId: "yoshinoya",
    name: "Cheese Beef Bowl Set",
    emoji: "🧀",
    category: "Bowl Sets",
    price: 13.5,
    calories: 840,
    protein: 39,
    carbs: 95,
    fat: 34,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "saiz_margherita",
    brandId: "saizeriya",
    name: "Margherita Pizza",
    emoji: "🍕",
    category: "Pizza",
    price: 7.9,
    calories: 680,
    protein: 22,
    carbs: 96,
    fat: 22,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_pepperoni",
    brandId: "saizeriya",
    name: "Pepperoni Pizza",
    emoji: "🍕",
    category: "Pizza",
    price: 8.9,
    calories: 790,
    protein: 28,
    carbs: 98,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_aglio_olio",
    brandId: "saizeriya",
    name: "Aglio e Olio Spaghetti",
    emoji: "🍝",
    category: "Pasta",
    price: 6.9,
    calories: 680,
    protein: 17,
    carbs: 96,
    fat: 26,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_carbonara",
    brandId: "saizeriya",
    name: "Carbonara",
    emoji: "🍝",
    category: "Pasta",
    price: 7.9,
    calories: 820,
    protein: 24,
    carbs: 98,
    fat: 36,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_bolognese",
    brandId: "saizeriya",
    name: "Meat Sauce Spaghetti (Bolognese)",
    emoji: "🍝",
    category: "Pasta",
    price: 7.5,
    calories: 760,
    protein: 26,
    carbs: 100,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "saiz_grilled_chicken",
    brandId: "saizeriya",
    name: "Grilled Chicken with Herb",
    emoji: "🍗",
    category: "Mains",
    price: 8.9,
    calories: 340,
    protein: 38,
    carbs: 4,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "saiz_caesar_salad",
    brandId: "saizeriya",
    name: "Caesar Salad",
    emoji: "🥗",
    category: "Salads",
    price: 5.9,
    calories: 290,
    protein: 8,
    carbs: 16,
    fat: 22,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "saiz_tiramisu",
    brandId: "saizeriya",
    name: "Tiramisu",
    emoji: "🍰",
    category: "Desserts",
    price: 4.9,
    calories: 310,
    protein: 5,
    carbs: 34,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_garlic_bread",
    brandId: "saizeriya",
    name: "Garlic Bread",
    emoji: "🧄",
    category: "Sides",
    price: 3.9,
    calories: 290,
    protein: 6,
    carbs: 40,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_milano_doria",
    brandId: "saizeriya",
    name: "Milano Doria",
    emoji: "🍚",
    category: "Doria & Rice",
    price: 5.9,
    calories: 547,
    protein: 17,
    carbs: 76,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "saiz_hamburger",
    brandId: "saizeriya",
    name: "Hamburger (Beef, Demi Sauce)",
    emoji: "🍔",
    category: "Grill",
    price: 6.5,
    calories: 540,
    protein: 31,
    carbs: 17,
    fat: 39,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "saiz_arugula_chicken_salad",
    brandId: "saizeriya",
    name: "Arugula Chicken Salad",
    emoji: "🥗",
    category: "Salads",
    price: 4.9,
    calories: 235,
    protein: 27,
    carbs: 14,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "saiz_sauteed_spinach_bacon",
    brandId: "saizeriya",
    name: "Sautéed Spinach with Bacon",
    emoji: "🥬",
    category: "Appetiser",
    price: 4.9,
    calories: 223,
    protein: 9,
    carbs: 9,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "genki_salmon_nigiri",
    brandId: "genki_sushi",
    name: "Salmon Nigiri (2 pc)",
    emoji: "🍣",
    category: "Nigiri",
    price: 3.5,
    calories: 160,
    protein: 10,
    carbs: 22,
    fat: 4,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "genki_tuna_nigiri",
    brandId: "genki_sushi",
    name: "Tuna Nigiri (2 pc)",
    emoji: "🍣",
    category: "Nigiri",
    price: 3.5,
    calories: 140,
    protein: 12,
    carbs: 22,
    fat: 1,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "genki_ebi_nigiri",
    brandId: "genki_sushi",
    name: "Prawn Nigiri (2 pc)",
    emoji: "🍤",
    category: "Nigiri",
    price: 3.5,
    calories: 130,
    protein: 9,
    carbs: 22,
    fat: 1,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "genki_salmon_aburi",
    brandId: "genki_sushi",
    name: "Aburi Salmon (2 pc)",
    emoji: "🔥",
    category: "Aburi",
    price: 5.5,
    calories: 190,
    protein: 11,
    carbs: 22,
    fat: 7,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "genki_salmon_roll",
    brandId: "genki_sushi",
    name: "Salmon Roll (6 pc)",
    emoji: "🍣",
    category: "Rolls",
    price: 5.9,
    calories: 280,
    protein: 12,
    carbs: 38,
    fat: 8,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "genki_spicy_tuna_roll",
    brandId: "genki_sushi",
    name: "Spicy Tuna Roll (6 pc)",
    emoji: "🌶️",
    category: "Rolls",
    price: 5.9,
    calories: 290,
    protein: 14,
    carbs: 36,
    fat: 8,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "genki_edamame",
    brandId: "genki_sushi",
    name: "Edamame",
    emoji: "🫘",
    category: "Sides",
    price: 3.5,
    calories: 120,
    protein: 10,
    carbs: 8,
    fat: 5,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "genki_miso_soup",
    brandId: "genki_sushi",
    name: "Miso Soup",
    emoji: "🍜",
    category: "Sides",
    price: 2.5,
    calories: 40,
    protein: 3,
    carbs: 4,
    fat: 1,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "genki_karaage",
    brandId: "genki_sushi",
    name: "Chicken Karaage (3 pc)",
    emoji: "🍗",
    category: "Hot Food",
    price: 5.9,
    calories: 280,
    protein: 18,
    carbs: 16,
    fat: 16,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_latte",
    brandId: "mccafe",
    name: "Café Latte (Medium)",
    emoji: "☕",
    category: "Hot Coffee",
    price: 5.4,
    calories: 140,
    protein: 7,
    carbs: 14,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_cappuccino",
    brandId: "mccafe",
    name: "Cappuccino (Medium)",
    emoji: "☕",
    category: "Hot Coffee",
    price: 5.4,
    calories: 110,
    protein: 6,
    carbs: 11,
    fat: 4,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_americano",
    brandId: "mccafe",
    name: "Americano (Medium)",
    emoji: "☕",
    category: "Hot Coffee",
    price: 4.5,
    calories: 10,
    protein: 1,
    carbs: 1,
    fat: 0,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "mccafe_mocha",
    brandId: "mccafe",
    name: "Mocha (Medium)",
    emoji: "☕",
    category: "Hot Coffee",
    price: 5.9,
    calories: 200,
    protein: 7,
    carbs: 28,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_frappe_mocha",
    brandId: "mccafe",
    name: "Frappe Mocha (Medium)",
    emoji: "🥤",
    category: "Blended",
    price: 6.5,
    calories: 370,
    protein: 6,
    carbs: 58,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_frappe_caramel",
    brandId: "mccafe",
    name: "Frappe Caramel (Medium)",
    emoji: "🥤",
    category: "Blended",
    price: 6.5,
    calories: 380,
    protein: 5,
    carbs: 62,
    fat: 13,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "mccafe_chocolate_muffin",
    brandId: "mccafe",
    name: "Double Chocolate Muffin",
    emoji: "🧁",
    category: "Bakery",
    price: 3.5,
    calories: 430,
    protein: 6,
    carbs: 58,
    fat: 20,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_blueberry_muffin",
    brandId: "mccafe",
    name: "Blueberry Muffin",
    emoji: "🧁",
    category: "Bakery",
    price: 3.5,
    calories: 390,
    protein: 6,
    carbs: 56,
    fat: 16,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "mccafe_choc_chip_cookie",
    brandId: "mccafe",
    name: "Chocolate Chip Cookie",
    emoji: "🍪",
    category: "Bakery",
    price: 2,
    calories: 170,
    protein: 2,
    carbs: 24,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mccafe_hot_chocolate",
    brandId: "mccafe",
    name: "Hot Chocolate (Medium)",
    emoji: "🍫",
    category: "Hot Drinks",
    price: 4.9,
    calories: 250,
    protein: 8,
    carbs: 36,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "cbtl_ice_blended_original",
    brandId: "coffee_bean",
    name: "Original Ice Blended® (Medium)",
    emoji: "🥤",
    category: "Ice Blended",
    price: 8.5,
    calories: 360,
    protein: 4,
    carbs: 68,
    fat: 8,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cbtl_ice_blended_chocolate",
    brandId: "coffee_bean",
    name: "Chocolate Ice Blended® (Medium)",
    emoji: "🥤",
    category: "Ice Blended",
    price: 8.5,
    calories: 380,
    protein: 6,
    carbs: 72,
    fat: 9,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cbtl_ice_blended_matcha",
    brandId: "coffee_bean",
    name: "Matcha Latte Ice Blended® (Medium)",
    emoji: "🍵",
    category: "Ice Blended",
    price: 9,
    calories: 340,
    protein: 5,
    carbs: 60,
    fat: 9,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cbtl_latte",
    brandId: "coffee_bean",
    name: "Latte (Medium)",
    emoji: "☕",
    category: "Hot Coffee",
    price: 7,
    calories: 150,
    protein: 8,
    carbs: 14,
    fat: 6,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cbtl_cold_brew",
    brandId: "coffee_bean",
    name: "Cold Brew Coffee (Medium)",
    emoji: "🧊",
    category: "Cold Coffee",
    price: 7.5,
    calories: 20,
    protein: 1,
    carbs: 2,
    fat: 0,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cbtl_earl_grey",
    brandId: "coffee_bean",
    name: "Earl Grey Tea Latte (Hot)",
    emoji: "🫖",
    category: "Tea",
    price: 6.5,
    calories: 130,
    protein: 6,
    carbs: 16,
    fat: 4,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "cbtl_croissant",
    brandId: "coffee_bean",
    name: "Butter Croissant",
    emoji: "🥐",
    category: "Bakery",
    price: 4.5,
    calories: 280,
    protein: 6,
    carbs: 30,
    fat: 15,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cbtl_choc_cake",
    brandId: "coffee_bean",
    name: "Chocolate Fudge Cake (slice)",
    emoji: "🍰",
    category: "Cakes",
    price: 8.5,
    calories: 480,
    protein: 6,
    carbs: 62,
    fat: 24,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "astons_ribeye",
    brandId: "astons",
    name: "Ribeye Steak (180g)",
    emoji: "🥩",
    category: "Steaks",
    price: 18.9,
    calories: 480,
    protein: 44,
    carbs: 0,
    fat: 32,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "astons_sirloin",
    brandId: "astons",
    name: "Sirloin Steak (180g)",
    emoji: "🥩",
    category: "Steaks",
    price: 16.9,
    calories: 380,
    protein: 46,
    carbs: 0,
    fat: 20,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "astons_chicken_chop",
    brandId: "astons",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Chicken",
    price: 13.9,
    calories: 420,
    protein: 40,
    carbs: 8,
    fat: 24,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "astons_fish_chips",
    brandId: "astons",
    name: "Fish & Chips",
    emoji: "🐟",
    category: "Seafood",
    price: 14.9,
    calories: 560,
    protein: 28,
    carbs: 52,
    fat: 26,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "astons_salmon",
    brandId: "astons",
    name: "Grilled Salmon",
    emoji: "🐟",
    category: "Seafood",
    price: 17.9,
    calories: 440,
    protein: 42,
    carbs: 4,
    fat: 26,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "astons_mashed_potato",
    brandId: "astons",
    name: "Mashed Potato",
    emoji: "🥔",
    category: "Sides",
    price: 0,
    calories: 180,
    protein: 3,
    carbs: 26,
    fat: 7,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "astons_coleslaw",
    brandId: "astons",
    name: "Coleslaw",
    emoji: "🥗",
    category: "Sides",
    price: 0,
    calories: 130,
    protein: 1,
    carbs: 14,
    fat: 8,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "astons_fries",
    brandId: "astons",
    name: "Steak Fries",
    emoji: "🍟",
    category: "Sides",
    price: 0,
    calories: 280,
    protein: 4,
    carbs: 38,
    fat: 13,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_chicken_mushroom",
    brandId: "soup_spoon",
    name: "Chicken & Mushroom Soup (Large)",
    emoji: "🥣",
    category: "Soups",
    price: 9.9,
    calories: 220,
    protein: 18,
    carbs: 16,
    fat: 8,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_cream_mushroom",
    brandId: "soup_spoon",
    name: "Cream of Mushroom (Large)",
    emoji: "🍄",
    category: "Soups",
    price: 9.9,
    calories: 280,
    protein: 5,
    carbs: 18,
    fat: 20,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_tomato_basil",
    brandId: "soup_spoon",
    name: "Tomato Basil Soup (Large)",
    emoji: "🍅",
    category: "Soups",
    price: 8.9,
    calories: 180,
    protein: 4,
    carbs: 22,
    fat: 8,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_lobster_bisque",
    brandId: "soup_spoon",
    name: "Lobster Bisque (Large)",
    emoji: "🦞",
    category: "Soups",
    price: 13.9,
    calories: 310,
    protein: 10,
    carbs: 18,
    fat: 22,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_minestrone",
    brandId: "soup_spoon",
    name: "Minestrone (Large)",
    emoji: "🥣",
    category: "Soups",
    price: 8.9,
    calories: 160,
    protein: 6,
    carbs: 26,
    fat: 4,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_clam_chowder",
    brandId: "soup_spoon",
    name: "New England Clam Chowder (Large)",
    emoji: "🥣",
    category: "Soups",
    price: 11.9,
    calories: 330,
    protein: 12,
    carbs: 24,
    fat: 20,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_sourdough",
    brandId: "soup_spoon",
    name: "Sourdough Bread (side)",
    emoji: "🍞",
    category: "Sides",
    price: 2.5,
    calories: 180,
    protein: 6,
    carbs: 34,
    fat: 2,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_caesar_salad",
    brandId: "soup_spoon",
    name: "Caesar Salad",
    emoji: "🥗",
    category: "Salads",
    price: 9.9,
    calories: 310,
    protein: 12,
    carbs: 18,
    fat: 22,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "tdc_chicken_rice",
    brandId: "daily_cut",
    name: "Grilled Chicken Thigh Bowl (Brown Rice)",
    emoji: "🥗",
    category: "Signature Bowls",
    price: 14.9,
    calories: 520,
    protein: 40,
    carbs: 52,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tdc_salmon_rice",
    brandId: "daily_cut",
    name: "Teriyaki Salmon Bowl (Brown Rice)",
    emoji: "🐟",
    category: "Signature Bowls",
    price: 17.9,
    calories: 560,
    protein: 38,
    carbs: 54,
    fat: 18,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tdc_beef_rice",
    brandId: "daily_cut",
    name: "Slow-Cooked Beef Bowl (Brown Rice)",
    emoji: "🥩",
    category: "Signature Bowls",
    price: 16.9,
    calories: 580,
    protein: 42,
    carbs: 50,
    fat: 20,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tdc_chicken_quinoa",
    brandId: "daily_cut",
    name: "Grilled Chicken Thigh Bowl (Quinoa)",
    emoji: "🥗",
    category: "Signature Bowls",
    price: 15.9,
    calories: 490,
    protein: 42,
    carbs: 44,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tdc_salad_base",
    brandId: "daily_cut",
    name: "Grilled Chicken Salad (Greens base)",
    emoji: "🥗",
    category: "Salads",
    price: 14.9,
    calories: 380,
    protein: 38,
    carbs: 16,
    fat: 16,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tdc_tofu_bowl",
    brandId: "daily_cut",
    name: "Pan-Fried Tofu Bowl (Brown Rice)",
    emoji: "🌱",
    category: "Signature Bowls",
    price: 13.9,
    calories: 440,
    protein: 22,
    carbs: 54,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "tdc_protein_smoothie",
    brandId: "daily_cut",
    name: "Protein Smoothie",
    emoji: "🥤",
    category: "Drinks",
    price: 9.5,
    calories: 240,
    protein: 22,
    carbs: 28,
    fat: 4,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "pacai_classic_bowl",
    brandId: "project_acai",
    name: "Classic Açaí Bowl",
    emoji: "🫐",
    category: "Açaí Bowls",
    price: 12.9,
    calories: 420,
    protein: 8,
    carbs: 68,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pacai_protein_bowl",
    brandId: "project_acai",
    name: "Protein Açaí Bowl",
    emoji: "💪",
    category: "Açaí Bowls",
    price: 15.9,
    calories: 480,
    protein: 24,
    carbs: 62,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pacai_pitaya_bowl",
    brandId: "project_acai",
    name: "Pitaya (Dragon Fruit) Bowl",
    emoji: "🐉",
    category: "Açaí Bowls",
    price: 14.9,
    calories: 380,
    protein: 6,
    carbs: 72,
    fat: 6,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pacai_green_bowl",
    brandId: "project_acai",
    name: "Green Detox Bowl",
    emoji: "🥝",
    category: "Açaí Bowls",
    price: 14.9,
    calories: 360,
    protein: 8,
    carbs: 60,
    fat: 10,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "pacai_smoothie_acai",
    brandId: "project_acai",
    name: "Açaí Smoothie (regular)",
    emoji: "🥤",
    category: "Smoothies",
    price: 9.9,
    calories: 280,
    protein: 4,
    carbs: 48,
    fat: 8,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pacai_pb_bowl",
    brandId: "project_acai",
    name: "Peanut Butter Açaí Bowl",
    emoji: "🥜",
    category: "Açaí Bowls",
    price: 15.9,
    calories: 560,
    protein: 18,
    carbs: 62,
    fat: 26,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "liho_cheese_ggt",
    brandId: "liho",
    name: "Cheese Green Tea (M, 70% sugar)",
    emoji: "🧋",
    category: "Cheese Tea",
    price: 5.5,
    calories: 220,
    protein: 4,
    carbs: 40,
    fat: 5,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "liho_cheese_oolong",
    brandId: "liho",
    name: "Cheese Oolong Tea (M, 70% sugar)",
    emoji: "🧋",
    category: "Cheese Tea",
    price: 5.5,
    calories: 210,
    protein: 4,
    carbs: 38,
    fat: 5,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "liho_milk_tea",
    brandId: "liho",
    name: "Classic Milk Tea (M, 70% sugar, with pearls)",
    emoji: "🧋",
    category: "Milk Tea",
    price: 4.2,
    calories: 320,
    protein: 3,
    carbs: 60,
    fat: 6,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "liho_brown_sugar_milk",
    brandId: "liho",
    name: "Brown Sugar Pearl Fresh Milk (M)",
    emoji: "🧋",
    category: "Fresh Milk",
    price: 5.8,
    calories: 360,
    protein: 8,
    carbs: 64,
    fat: 8,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "liho_matcha_milk",
    brandId: "liho",
    name: "Matcha Latte (M, 70% sugar)",
    emoji: "🍵",
    category: "Milk Tea",
    price: 5.5,
    calories: 240,
    protein: 5,
    carbs: 42,
    fat: 6,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "liho_passionfruit_tea",
    brandId: "liho",
    name: "Passionfruit Green Tea (M, 70% sugar)",
    emoji: "🍹",
    category: "Fruit Tea",
    price: 4.5,
    calories: 160,
    protein: 0,
    carbs: 38,
    fat: 0,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "koi_oolong_milk_tea",
    brandId: "koi",
    name: "KOI Milk Tea (M, 70% sugar, with pearls)",
    emoji: "🧋",
    category: "Milk Tea",
    price: 4.5,
    calories: 310,
    protein: 3,
    carbs: 58,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "koi_3q",
    brandId: "koi",
    name: "3Q Milk Tea (M, 70% sugar)",
    emoji: "🧋",
    category: "Milk Tea",
    price: 5.5,
    calories: 370,
    protein: 4,
    carbs: 70,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "koi_fresh_milk_tea",
    brandId: "koi",
    name: "Fresh Milk Tea (M, 70% sugar)",
    emoji: "🧋",
    category: "Fresh Milk Tea",
    price: 5.2,
    calories: 240,
    protein: 6,
    carbs: 42,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "koi_matcha_milk",
    brandId: "koi",
    name: "Matcha Milk (M, 70% sugar)",
    emoji: "🍵",
    category: "Milk Tea",
    price: 5.5,
    calories: 230,
    protein: 5,
    carbs: 40,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "koi_passionfruit_green",
    brandId: "koi",
    name: "Passionfruit, Peach & Green Tea (M, 70% sugar)",
    emoji: "🍹",
    category: "Fruit Tea",
    price: 4.8,
    calories: 180,
    protein: 0,
    carbs: 44,
    fat: 0,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "koi_brown_sugar",
    brandId: "koi",
    name: "Brown Sugar Milk with Pearl (M)",
    emoji: "🧋",
    category: "Fresh Milk",
    price: 5.8,
    calories: 340,
    protein: 7,
    carbs: 60,
    fat: 7,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "chagee_jasmine_milk",
    brandId: "chagee",
    name: "Jasmine Milk Green Tea (M, standard sugar)",
    emoji: "🍵",
    category: "Milk Tea",
    price: 5.8,
    calories: 240,
    protein: 4,
    carbs: 44,
    fat: 5,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "chagee_bawang_oolong",
    brandId: "chagee",
    name: "BAWANG Oolong Milk Tea (M, standard sugar)",
    emoji: "🍵",
    category: "Milk Tea",
    price: 6.5,
    calories: 260,
    protein: 4,
    carbs: 48,
    fat: 5,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "chagee_cheese_milk_tea",
    brandId: "chagee",
    name: "Cheese Milk Tea (M, standard sugar)",
    emoji: "🧋",
    category: "Cheese Tea",
    price: 6.9,
    calories: 290,
    protein: 6,
    carbs: 48,
    fat: 8,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "chagee_puremax_latte",
    brandId: "chagee",
    name: "Puremax Tea Latte (M, standard sugar)",
    emoji: "☕",
    category: "Tea Latte",
    price: 6.2,
    calories: 200,
    protein: 5,
    carbs: 34,
    fat: 5,
    compatibleWith: [
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "chagee_fruit_tea",
    brandId: "chagee",
    name: "Seasonal Fruit Tea (M)",
    emoji: "🍹",
    category: "Fruit Tea",
    price: 5.5,
    calories: 150,
    protein: 0,
    carbs: 36,
    fat: 0,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "mixue_soft_serve",
    brandId: "mixue",
    name: "Vanilla Soft Serve",
    emoji: "🍦",
    category: "Ice Cream",
    price: 1.5,
    calories: 130,
    protein: 3,
    carbs: 18,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mixue_milk_tea",
    brandId: "mixue",
    name: "Classic Milk Tea (M, standard sugar, with pearls)",
    emoji: "🧋",
    category: "Milk Tea",
    price: 3.5,
    calories: 290,
    protein: 3,
    carbs: 54,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mixue_strawberry_lemonade",
    brandId: "mixue",
    name: "Strawberry Lemonade (M)",
    emoji: "🍓",
    category: "Fruit Tea",
    price: 3.8,
    calories: 140,
    protein: 0,
    carbs: 34,
    fat: 0,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mixue_mango_tea",
    brandId: "mixue",
    name: "Mango Green Tea (M)",
    emoji: "🥭",
    category: "Fruit Tea",
    price: 3.5,
    calories: 160,
    protein: 0,
    carbs: 38,
    fat: 0,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mixue_matcha_latte",
    brandId: "mixue",
    name: "Matcha Latte (M)",
    emoji: "🍵",
    category: "Milk Tea",
    price: 4,
    calories: 220,
    protein: 4,
    carbs: 40,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "mixue_sundae",
    brandId: "mixue",
    name: "Chocolate Soft Serve Sundae",
    emoji: "🍨",
    category: "Ice Cream",
    price: 2.5,
    calories: 200,
    protein: 4,
    carbs: 30,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dosirak_bulgogi_set",
    brandId: "dosirak",
    name: "Bulgogi Beef Rice Set",
    emoji: "🍱",
    category: "Rice Sets",
    price: 9.9,
    calories: 620,
    protein: 28,
    carbs: 86,
    fat: 16,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dosirak_spicy_chicken_set",
    brandId: "dosirak",
    name: "Spicy Chicken Rice Set",
    emoji: "🌶️",
    category: "Rice Sets",
    price: 9.9,
    calories: 590,
    protein: 30,
    carbs: 80,
    fat: 14,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dosirak_kimchi_fried_rice",
    brandId: "dosirak",
    name: "Kimchi Fried Rice",
    emoji: "🍚",
    category: "Rice",
    price: 8.5,
    calories: 520,
    protein: 14,
    carbs: 88,
    fat: 12,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dosirak_army_stew",
    brandId: "dosirak",
    name: "Budae Jjigae (Army Stew)",
    emoji: "🍲",
    category: "Stews",
    price: 13.9,
    calories: 480,
    protein: 26,
    carbs: 48,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dosirak_tteokbokki",
    brandId: "dosirak",
    name: "Tteokbokki",
    emoji: "🌶️",
    category: "Sides",
    price: 8.9,
    calories: 380,
    protein: 8,
    carbs: 72,
    fat: 6,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dosirak_japchae",
    brandId: "dosirak",
    name: "Japchae (Glass Noodles)",
    emoji: "🍜",
    category: "Noodles",
    price: 9.5,
    calories: 420,
    protein: 12,
    carbs: 68,
    fat: 10,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "dosirak_kimchi_side",
    brandId: "dosirak",
    name: "Kimchi (side)",
    emoji: "🥬",
    category: "Sides",
    price: 2,
    calories: 30,
    protein: 1,
    carbs: 4,
    fat: 0,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "makisan_classic_6pc",
    brandId: "makisan",
    name: "Classic Sushi Roll (6 pc)",
    emoji: "🌯",
    category: "Classic Rolls",
    price: 8.5,
    calories: 280,
    protein: 10,
    carbs: 44,
    fat: 6,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "makisan_salmon_6pc",
    brandId: "makisan",
    name: "Salmon Sushi Roll (6 pc)",
    emoji: "🍣",
    category: "Classic Rolls",
    price: 9.5,
    calories: 310,
    protein: 14,
    carbs: 42,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "makisan_spicy_tuna_6pc",
    brandId: "makisan",
    name: "Spicy Tuna Roll (6 pc)",
    emoji: "🌶️",
    category: "Classic Rolls",
    price: 9.5,
    calories: 300,
    protein: 15,
    carbs: 40,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "makisan_veg_6pc",
    brandId: "makisan",
    name: "Vegetable Roll (6 pc)",
    emoji: "🥑",
    category: "Classic Rolls",
    price: 7.5,
    calories: 220,
    protein: 5,
    carbs: 42,
    fat: 4,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "makisan_sashimi_bowl",
    brandId: "makisan",
    name: "Sashimi Don (Rice Bowl)",
    emoji: "🍱",
    category: "Rice Bowls",
    price: 12.9,
    calories: 450,
    protein: 28,
    carbs: 56,
    fat: 8,
    compatibleWith: [
      "halal",
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "makisan_edamame",
    brandId: "makisan",
    name: "Edamame",
    emoji: "🫘",
    category: "Sides",
    price: 3,
    calories: 120,
    protein: 10,
    carbs: 8,
    fat: 5,
    compatibleWith: [
      "halal",
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nb_chicken_bowl",
    brandId: "nourish_bowl",
    name: "Grilled Chicken Power Bowl",
    emoji: "🥗",
    category: "Power Bowls",
    price: 14.9,
    calories: 500,
    protein: 38,
    carbs: 52,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nb_salmon_bowl",
    brandId: "nourish_bowl",
    name: "Salmon Teriyaki Bowl",
    emoji: "🐟",
    category: "Power Bowls",
    price: 17.9,
    calories: 540,
    protein: 36,
    carbs: 54,
    fat: 18,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nb_vegan_bowl",
    brandId: "nourish_bowl",
    name: "Vegan Buddha Bowl",
    emoji: "🌱",
    category: "Power Bowls",
    price: 13.9,
    calories: 420,
    protein: 16,
    carbs: 58,
    fat: 14,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nb_smoothie",
    brandId: "nourish_bowl",
    name: "Green Smoothie",
    emoji: "🥤",
    category: "Smoothies",
    price: 8.5,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 4,
    compatibleWith: [
      "no_pork",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nb_beef_bowl",
    brandId: "nourish_bowl",
    name: "Teriyaki Beef Bowl",
    emoji: "🥩",
    category: "Power Bowls",
    price: 16.9,
    calories: 560,
    protein: 40,
    carbs: 52,
    fat: 20,
    compatibleWith: [
      "no_pork",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  
  
  
  
  
  {
    id: "boost_mango_magic",
    brandId: "boost_juice",
    name: "Mango Magic (Original)",
    emoji: "🥭",
    category: "Smoothies",
    price: 6.9,
    calories: 420,
    protein: 10,
    carbs: 85,
    fat: 7,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "boost_all_berry_bang",
    brandId: "boost_juice",
    name: "All Berry Bang (Original)",
    emoji: "🫐",
    category: "Smoothies",
    price: 6.9,
    calories: 344,
    protein: 7,
    carbs: 72,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "boost_strawberry_squeeze",
    brandId: "boost_juice",
    name: "Strawberry Squeeze (Original)",
    emoji: "🍓",
    category: "Smoothies",
    price: 6.9,
    calories: 371,
    protein: 8,
    carbs: 75,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "boost_protein_supreme",
    brandId: "boost_juice",
    name: "Protein Supreme (Original)",
    emoji: "💪",
    category: "Protein & Energy",
    price: 8.6,
    calories: 566,
    protein: 30,
    carbs: 77,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "boost_watermelon_lychee_crush",
    brandId: "boost_juice",
    name: "Watermelon Lychee Crush (Original)",
    emoji: "🍉",
    category: "Crushes",
    price: 5.5,
    calories: 219,
    protein: 2,
    carbs: 51,
    fat: 1,
    compatibleWith: [
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cheers_treats_roast_chicken_sandwich",
    brandId: "cheers",
    name: "Treats Roasted Chicken with Herbs Sandwich",
    emoji: "🥪",
    category: "Sandwiches",
    price: 3.2,
    calories: 191,
    protein: 16,
    carbs: 27,
    fat: 4,
    compatibleWith: [
      "halal"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "cheers_treats_egg_mayo_sandwich",
    brandId: "cheers",
    name: "Treats Egg Mayo Sandwich",
    emoji: "🥚",
    category: "Sandwiches",
    price: 2.8,
    calories: 315,
    protein: 12,
    carbs: 32,
    fat: 14,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cheers_treats_honey_chicken_ham_sandwich",
    brandId: "cheers",
    name: "Treats Honey Chicken Ham Sandwich",
    emoji: "🥪",
    category: "Sandwiches",
    price: 2.8,
    calories: 227,
    protein: 14,
    carbs: 26,
    fat: 7,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "cheers_treats_chicken_rendang_bento",
    brandId: "cheers",
    name: "Treats Chicken Rendang Biryani Rice",
    emoji: "🍱",
    category: "Bento & Rice",
    price: 4.2,
    calories: 490,
    protein: 22,
    carbs: 68,
    fat: 16,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cheers_treats_ayam_bakar_bento",
    brandId: "cheers",
    name: "Treats Ayam Bakar & Braised Cabbage",
    emoji: "🍱",
    category: "Bento & Rice",
    price: 4.2,
    calories: 390,
    protein: 26,
    carbs: 42,
    fat: 12,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cheers_chicken_hotdog",
    brandId: "cheers",
    name: "Chicken Hot Dog",
    emoji: "🌭",
    category: "Hot Food",
    price: 2.5,
    calories: 275,
    protein: 11,
    carbs: 29,
    fat: 12,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fpx_treats_chicken_rice_bento",
    brandId: "fairprice_xpress",
    name: "Treats Chicken Rice Bento",
    emoji: "🍱",
    category: "Bento & Rice",
    price: 4.2,
    calories: 420,
    protein: 25,
    carbs: 54,
    fat: 10,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fpx_grab_go_tuna_sandwich",
    brandId: "fairprice_xpress",
    name: "Grab & Go Tuna Sandwich",
    emoji: "🥪",
    category: "Sandwiches",
    price: 3.5,
    calories: 280,
    protein: 16,
    carbs: 28,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fpx_yoghurt_parfait",
    brandId: "fairprice_xpress",
    name: "Yoghurt Parfait",
    emoji: "🍨",
    category: "Chilled Snacks",
    price: 3.8,
    calories: 185,
    protein: 7,
    carbs: 28,
    fat: 5,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "fpx_fresh_fruit_cup",
    brandId: "fairprice_xpress",
    name: "Fresh Fruit Salad Cup",
    emoji: "🍓",
    category: "Chilled Snacks",
    price: 3.5,
    calories: 80,
    protein: 1,
    carbs: 19,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "fpx_chicken_skewer",
    brandId: "fairprice_xpress",
    name: "Chicken Skewer (per stick)",
    emoji: "🍢",
    category: "Hot Food",
    price: 1,
    calories: 80,
    protein: 8,
    carbs: 2,
    fat: 4,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fpx_hard_boiled_eggs",
    brandId: "fairprice_xpress",
    name: "Hard Boiled Eggs (2 pcs)",
    emoji: "🥚",
    category: "Chilled Snacks",
    price: 1.5,
    calories: 124,
    protein: 11,
    carbs: 1,
    fat: 9,
    compatibleWith: [
      "vegetarian",
      "halal",
      "gluten_free",
      "keto"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_tuna_san",
    brandId: "saladstop",
    name: "Tuna San (Signature Bowl)",
    emoji: "🐟",
    category: "Signature Bowls",
    price: 12.9,
    calories: 374,
    protein: 22,
    carbs: 33,
    fat: 19,
    compatibleWith: [
      "gluten_free",
      "lactose_free"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "ss_hail_caesar",
    brandId: "saladstop",
    name: "Hail Caesar (Signature Bowl)",
    emoji: "🥗",
    category: "Signature Bowls",
    price: 12.9,
    calories: 558,
    protein: 35,
    carbs: 24,
    fat: 35,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_harvest_bowl",
    brandId: "saladstop",
    name: "Harvest Bowl (Warm)",
    emoji: "🍲",
    category: "Warm Protein Bowls",
    price: 13.9,
    calories: 580,
    protein: 38,
    carbs: 48,
    fat: 22,
    compatibleWith: [
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_sabai_sabai",
    brandId: "saladstop",
    name: "Sabai Sabai Grain Bowl",
    emoji: "🌾",
    category: "Warm Protein Bowls",
    price: 13.9,
    calories: 520,
    protein: 30,
    carbs: 52,
    fat: 18,
    compatibleWith: [
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_smoosha_acai",
    brandId: "saladstop",
    name: "Smoosha Açaí Bowl",
    emoji: "🫐",
    category: "Smoosha Bowls",
    price: 9.9,
    calories: 420,
    protein: 8,
    carbs: 62,
    fat: 16,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_cyo_starter",
    brandId: "saladstop",
    name: "CYO Starter Bowl",
    emoji: "🥙",
    category: "Create Your Own",
    price: 10.9,
    calories: 350,
    protein: 20,
    carbs: 30,
    fat: 14,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "pb_almond_croissant",
    brandId: "paris_baguette",
    name: "Almond Croissant",
    emoji: "🥐",
    category: "Pastries",
    price: 4.5,
    calories: 480,
    protein: 14,
    carbs: 52,
    fat: 27,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "verified",
    isPopular: true
  },
  {
    id: "pb_croissant",
    brandId: "paris_baguette",
    name: "Butter Croissant",
    emoji: "🥐",
    category: "Pastries",
    price: 3.5,
    calories: 280,
    protein: 5,
    carbs: 28,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "pb_ham_cheese_baguette",
    brandId: "paris_baguette",
    name: "Ham & Cheese Baguette",
    emoji: "🥖",
    category: "Sandwiches",
    price: 7.5,
    calories: 450,
    protein: 22,
    carbs: 42,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pb_tuna_sandwich",
    brandId: "paris_baguette",
    name: "Tuna Sandwich",
    emoji: "🥪",
    category: "Sandwiches",
    price: 7.5,
    calories: 430,
    protein: 22,
    carbs: 38,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "pb_strawberry_cake",
    brandId: "paris_baguette",
    name: "Strawberry Yoghurt Cream Cake (slice)",
    emoji: "🍰",
    category: "Cakes",
    price: 8.5,
    calories: 380,
    protein: 6,
    carbs: 52,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "pb_americano",
    brandId: "paris_baguette",
    name: "Americano",
    emoji: "☕",
    category: "Beverages",
    price: 4.5,
    calories: 10,
    protein: 0,
    carbs: 2,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "keto"
    ],
    confidence: "estimated"
  },
  {
    id: "pb_matcha_latte",
    brandId: "paris_baguette",
    name: "Matcha Latte",
    emoji: "🍵",
    category: "Beverages",
    price: 7.5,
    calories: 220,
    protein: 8,
    carbs: 32,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "se_salmon_nigiri",
    brandId: "sushi_express",
    name: "Salmon Nigiri (2 pc plate)",
    emoji: "🍣",
    category: "Nigiri",
    price: 2.5,
    calories: 120,
    protein: 12,
    carbs: 16,
    fat: 3,
    compatibleWith: [
      "lactose_free",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "se_tuna_nigiri",
    brandId: "sushi_express",
    name: "Tuna Nigiri (2 pc plate)",
    emoji: "🍣",
    category: "Nigiri",
    price: 2,
    calories: 100,
    protein: 12,
    carbs: 14,
    fat: 1,
    compatibleWith: [
      "lactose_free",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "se_ebi_nigiri",
    brandId: "sushi_express",
    name: "Ebi Nigiri (2 pc plate)",
    emoji: "🍤",
    category: "Nigiri",
    price: 2,
    calories: 105,
    protein: 10,
    carbs: 15,
    fat: 1,
    compatibleWith: [
      "lactose_free",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "se_tamago",
    brandId: "sushi_express",
    name: "Tamago Sushi (2 pc plate)",
    emoji: "🥚",
    category: "Nigiri",
    price: 1.5,
    calories: 115,
    protein: 3,
    carbs: 22,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "se_california_roll",
    brandId: "sushi_express",
    name: "California Roll (4 pc plate)",
    emoji: "🌀",
    category: "Maki",
    price: 2,
    calories: 150,
    protein: 4,
    carbs: 26,
    fat: 4,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "se_salmon_maki",
    brandId: "sushi_express",
    name: "Salmon Maki (4 pc plate)",
    emoji: "🌀",
    category: "Maki",
    price: 2,
    calories: 130,
    protein: 8,
    carbs: 18,
    fat: 3,
    compatibleWith: [
      "lactose_free",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "se_karaage",
    brandId: "sushi_express",
    name: "Karaage Chicken (3 pc plate)",
    emoji: "🍗",
    category: "Hot Food",
    price: 2.5,
    calories: 230,
    protein: 15,
    carbs: 14,
    fat: 12,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "se_chawanmushi",
    brandId: "sushi_express",
    name: "Chawanmushi",
    emoji: "🍮",
    category: "Hot Food",
    price: 2,
    calories: 80,
    protein: 6,
    carbs: 8,
    fat: 2,
    compatibleWith: [
      "lactose_free",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "se_edamame",
    brandId: "sushi_express",
    name: "Edamame",
    emoji: "🫘",
    category: "Sides",
    price: 1.5,
    calories: 90,
    protein: 8,
    carbs: 8,
    fat: 3,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "lactose_free",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "sb_cajun_chicken",
    brandId: "saladbox",
    name: "Cajun Chicken Salad",
    emoji: "🍗",
    category: "Salads",
    price: 10.9,
    calories: 382,
    protein: 28,
    carbs: 22,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sb_crispy_caesar",
    brandId: "saladbox",
    name: "Crispy Caesar Salad",
    emoji: "🥗",
    category: "Salads",
    price: 8.9,
    calories: 368,
    protein: 20,
    carbs: 22,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sb_teriyaki_chicken",
    brandId: "saladbox",
    name: "Teriyaki Chicken Salad",
    emoji: "🍗",
    category: "Salads",
    price: 10.5,
    calories: 396,
    protein: 24,
    carbs: 36,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sb_rainbow_salad",
    brandId: "saladbox",
    name: "Rainbow Salad",
    emoji: "🌈",
    category: "Salads",
    price: 13.8,
    calories: 468,
    protein: 30,
    carbs: 38,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sb_tofu_salad",
    brandId: "saladbox",
    name: "Tofu Salad",
    emoji: "🧆",
    category: "Salads",
    price: 8.2,
    calories: 369,
    protein: 14,
    carbs: 32,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "sb_garden_salad",
    brandId: "saladbox",
    name: "Garden Salad",
    emoji: "🌱",
    category: "Salads",
    price: 8.2,
    calories: 156,
    protein: 4,
    carbs: 28,
    fat: 4,
    compatibleWith: [
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "sb_immune_booster",
    brandId: "saladbox",
    name: "Immune Booster Juice",
    emoji: "🧃",
    category: "Drinks",
    price: 4.9,
    calories: 144,
    protein: 2,
    carbs: 32,
    fat: 1,
    compatibleWith: [
      "vegan",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "fp_rotisserie_quarter",
    brandId: "fairprice",
    name: "Rotisserie Chicken (Quarter)",
    emoji: "🍗",
    category: "Hot Food",
    price: 3.9,
    calories: 290,
    protein: 27,
    carbs: 0,
    fat: 19,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fp_rotisserie_half",
    brandId: "fairprice",
    name: "Rotisserie Chicken (Half)",
    emoji: "🍗",
    category: "Hot Food",
    price: 7.5,
    calories: 580,
    protein: 54,
    carbs: 0,
    fat: 38,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fp_sushi_6pc",
    brandId: "fairprice",
    name: "Freshly Made Sushi (6pc)",
    emoji: "🍱",
    category: "Sushi",
    price: 5.5,
    calories: 350,
    protein: 12,
    carbs: 60,
    fat: 5,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fp_bento",
    brandId: "fairprice",
    name: "Ready Bento Box",
    emoji: "🍱",
    category: "Bento",
    price: 4.9,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fp_salad_pack",
    brandId: "fairprice",
    name: "Pre-packed Salad",
    emoji: "🥗",
    category: "Salads",
    price: 3.5,
    calories: 180,
    protein: 5,
    carbs: 18,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "fp_sandwich",
    brandId: "fairprice",
    name: "Sandwich (Chicken / Egg)",
    emoji: "🥪",
    category: "Sandwiches",
    price: 2.8,
    calories: 280,
    protein: 12,
    carbs: 30,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "fp_inari_sushi",
    brandId: "fairprice",
    name: "Inari Sushi (2pc)",
    emoji: "🍱",
    category: "Sushi",
    price: 1.8,
    calories: 200,
    protein: 5,
    carbs: 38,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "fp_onigiri",
    brandId: "fairprice",
    name: "Onigiri (Rice Ball)",
    emoji: "🍙",
    category: "Snacks",
    price: 1.5,
    calories: 185,
    protein: 5,
    carbs: 38,
    fat: 2,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "fpf_rotisserie_quarter",
    brandId: "fairprice_finest",
    name: "Rotisserie Chicken (Quarter)",
    emoji: "🍗",
    category: "Hot Food",
    price: 4.5,
    calories: 290,
    protein: 27,
    carbs: 0,
    fat: 19,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fpf_salad_bar_200g",
    brandId: "fairprice_finest",
    name: "Salad Bar (200g)",
    emoji: "🥗",
    category: "Salads",
    price: 4,
    calories: 200,
    protein: 6,
    carbs: 18,
    fat: 12,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fpf_bento",
    brandId: "fairprice_finest",
    name: "Ready Bento Box (Premium)",
    emoji: "🍱",
    category: "Bento",
    price: 7.9,
    calories: 520,
    protein: 26,
    carbs: 58,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "fpf_sushi_set",
    brandId: "fairprice_finest",
    name: "Freshly Made Sushi Set (8pc)",
    emoji: "🍣",
    category: "Sushi",
    price: 8.9,
    calories: 460,
    protein: 16,
    carbs: 80,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cs_rotisserie_quarter",
    brandId: "cold_storage",
    name: "Rotisserie Chicken (Quarter)",
    emoji: "🍗",
    category: "Hot Food",
    price: 4.5,
    calories: 290,
    protein: 27,
    carbs: 0,
    fat: 19,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cs_deli_salad_200g",
    brandId: "cold_storage",
    name: "Deli Salad Bar (200g)",
    emoji: "🥗",
    category: "Salads",
    price: 5,
    calories: 200,
    protein: 8,
    carbs: 15,
    fat: 12,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cs_ready_meal",
    brandId: "cold_storage",
    name: "Ready Meal Bento",
    emoji: "🍱",
    category: "Bento",
    price: 7,
    calories: 520,
    protein: 24,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "cs_sandwich",
    brandId: "cold_storage",
    name: "Gourmet Sandwich",
    emoji: "🥪",
    category: "Sandwiches",
    price: 4.5,
    calories: 340,
    protein: 15,
    carbs: 36,
    fat: 13,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "cs_sushi_8pc",
    brandId: "cold_storage",
    name: "Freshly Made Sushi (8pc)",
    emoji: "🍣",
    category: "Sushi",
    price: 9.9,
    calories: 460,
    protein: 16,
    carbs: 80,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "giant_rotisserie_quarter",
    brandId: "giant",
    name: "Rotisserie Chicken (Quarter)",
    emoji: "🍗",
    category: "Hot Food",
    price: 3.8,
    calories: 290,
    protein: 27,
    carbs: 0,
    fat: 19,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "giant_bento",
    brandId: "giant",
    name: "Ready Bento Box",
    emoji: "🍱",
    category: "Bento",
    price: 4.5,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 16,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "giant_sandwich",
    brandId: "giant",
    name: "Sandwich",
    emoji: "🥪",
    category: "Sandwiches",
    price: 2.5,
    calories: 270,
    protein: 11,
    carbs: 28,
    fat: 10,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "ss_roast_chicken_quarter",
    brandId: "sheng_siong",
    name: "Roast Chicken (Quarter)",
    emoji: "🍗",
    category: "Hot Food",
    price: 3.5,
    calories: 290,
    protein: 27,
    carbs: 0,
    fat: 19,
    compatibleWith: [
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_bento",
    brandId: "sheng_siong",
    name: "Ready Bento Box",
    emoji: "🍱",
    category: "Bento",
    price: 4.2,
    calories: 460,
    protein: 20,
    carbs: 55,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ss_roast_pork",
    brandId: "sheng_siong",
    name: "Char Siu / Roast Pork Slice",
    emoji: "🍖",
    category: "Hot Food",
    price: 4,
    calories: 340,
    protein: 22,
    carbs: 8,
    fat: 24,
    compatibleWith: [
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "ddk_takoyaki_6pc",
    brandId: "don_don_donki",
    name: "Takoyaki (6 pieces)",
    emoji: "🐙",
    category: "Hot Food",
    price: 4.9,
    calories: 265,
    protein: 10,
    carbs: 28,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_karaage_5pc",
    brandId: "don_don_donki",
    name: "Karaage Chicken (5 pieces)",
    emoji: "🍗",
    category: "Hot Food",
    price: 5.9,
    calories: 345,
    protein: 22,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_gyoza_5pc",
    brandId: "don_don_donki",
    name: "Gyoza (5 pieces)",
    emoji: "🥟",
    category: "Hot Food",
    price: 4.9,
    calories: 220,
    protein: 10,
    carbs: 24,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_onigiri",
    brandId: "don_don_donki",
    name: "Onigiri",
    emoji: "🍙",
    category: "Snacks",
    price: 2.2,
    calories: 185,
    protein: 5,
    carbs: 38,
    fat: 2,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_sushi_8pc",
    brandId: "don_don_donki",
    name: "Sushi Set (8 pieces)",
    emoji: "🍣",
    category: "Sushi",
    price: 8.9,
    calories: 420,
    protein: 15,
    carbs: 72,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_melon_bread",
    brandId: "don_don_donki",
    name: "Melon Bread",
    emoji: "🍞",
    category: "Bakery",
    price: 2.5,
    calories: 280,
    protein: 6,
    carbs: 48,
    fat: 7,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_soft_serve",
    brandId: "don_don_donki",
    name: "Soft Serve Ice Cream",
    emoji: "🍦",
    category: "Desserts",
    price: 2,
    calories: 130,
    protein: 3,
    carbs: 22,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ddk_ramen_cup",
    brandId: "don_don_donki",
    name: "Hot Ramen Cup",
    emoji: "🍜",
    category: "Noodles",
    price: 3.9,
    calories: 380,
    protein: 12,
    carbs: 55,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tian_tian_steamed",
    brandId: "tian_tian_chicken_rice",
    name: "Steamed Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 5,
    calories: 607,
    protein: 35,
    carbs: 74,
    fat: 17,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tian_tian_roasted",
    brandId: "tian_tian_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 5,
    calories: 650,
    protein: 36,
    carbs: 76,
    fat: 20,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tian_tian_char_siew",
    brandId: "tian_tian_chicken_rice",
    name: "Char Siew Rice",
    emoji: "🍖",
    category: "Rice",
    price: 4.5,
    calories: 660,
    protein: 30,
    carbs: 76,
    fat: 20,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "max_wonton_mee",
    brandId: "maxwell_wonton_mee",
    name: "Wonton Mee (Dry)",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 434,
    protein: 22,
    carbs: 58,
    fat: 12,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_laksa",
    brandId: "maxwell_laksa",
    name: "Laksa",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 589,
    protein: 27,
    carbs: 68,
    fat: 22,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "max_char_kway_teow",
    brandId: "maxwell_char_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_popiah",
    brandId: "maxwell_popiah",
    name: "Fresh Popiah",
    emoji: "🌯",
    category: "Snacks",
    price: 1.6,
    calories: 195,
    protein: 8,
    carbs: 28,
    fat: 5,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_carrot_cake_black",
    brandId: "maxwell_carrot_cake",
    name: "Carrot Cake (Black)",
    emoji: "🍳",
    category: "Sides",
    price: 4,
    calories: 371,
    protein: 9,
    carbs: 50,
    fat: 14,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "max_carrot_cake_white",
    brandId: "maxwell_carrot_cake",
    name: "Carrot Cake (White)",
    emoji: "🍳",
    category: "Sides",
    price: 4,
    calories: 338,
    protein: 9,
    carbs: 47,
    fat: 13,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_oyster_omelette",
    brandId: "maxwell_oyster_omelette",
    name: "Oyster Omelette",
    emoji: "🦪",
    category: "Sides",
    price: 5,
    calories: 396,
    protein: 18,
    carbs: 35,
    fat: 19,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "max_rojak",
    brandId: "maxwell_rojak",
    name: "Rojak",
    emoji: "🥗",
    category: "Sides",
    price: 4,
    calories: 290,
    protein: 7,
    carbs: 44,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_tau_huay",
    brandId: "maxwell_drinks_desserts",
    name: "Tau Huay",
    emoji: "🫙",
    category: "Desserts",
    price: 1.2,
    calories: 115,
    protein: 6,
    carbs: 17,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_kopi",
    brandId: "maxwell_drinks_desserts",
    name: "Kopi",
    emoji: "☕",
    category: "Drinks",
    price: 1.2,
    calories: 130,
    protein: 3,
    carbs: 22,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "max_kopi_o",
    brandId: "maxwell_drinks_desserts",
    name: "Kopi O",
    emoji: "☕",
    category: "Drinks",
    price: 1.1,
    calories: 40,
    protein: 0,
    carbs: 8,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "max_barley",
    brandId: "maxwell_drinks_desserts",
    name: "Barley Water",
    emoji: "🥤",
    category: "Drinks",
    price: 1.2,
    calories: 80,
    protein: 1,
    carbs: 19,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_satay_chicken",
    brandId: "lau_pa_sat_satay_street",
    name: "Chicken Satay (5 sticks)",
    emoji: "🍢",
    category: "Grill",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_satay_beef",
    brandId: "lau_pa_sat_satay_street",
    name: "Beef Satay (5 sticks)",
    emoji: "🍢",
    category: "Grill",
    price: 7,
    calories: 360,
    protein: 28,
    carbs: 18,
    fat: 20,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_otah",
    brandId: "lau_pa_sat_satay_street",
    name: "Otah (2 pieces)",
    emoji: "🐟",
    category: "Grill",
    price: 3.5,
    calories: 170,
    protein: 14,
    carbs: 6,
    fat: 10,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_oyster_omelette",
    brandId: "lau_pa_sat_oyster_omelette",
    name: "Oyster Omelette",
    emoji: "🦪",
    category: "Eggs",
    price: 7,
    calories: 396,
    protein: 18,
    carbs: 35,
    fat: 19,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_sk_hokkien_mee",
    brandId: "lau_pa_sat_seng_kee",
    name: "Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 6.8,
    calories: 558,
    protein: 28,
    carbs: 64,
    fat: 18,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_sk_laksa",
    brandId: "lau_pa_sat_seng_kee",
    name: "Laksa",
    emoji: "🍲",
    category: "Noodles",
    price: 6.8,
    calories: 589,
    protein: 22,
    carbs: 70,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_sk_ckt",
    brandId: "lau_pa_sat_seng_kee",
    name: "Fried Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 6,
    calories: 620,
    protein: 18,
    carbs: 80,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_lfz_black_ckt",
    brandId: "lau_pa_sat_lao_fu_zi_ckt",
    name: "Black Fried Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 7.5,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_lfz_white_ckt",
    brandId: "lau_pa_sat_lao_fu_zi_ckt",
    name: "White Fried Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 7.5,
    calories: 600,
    protein: 22,
    carbs: 76,
    fat: 20,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_lfz_laksa",
    brandId: "lau_pa_sat_lao_fu_zi_ckt",
    name: "Laksa",
    emoji: "🍲",
    category: "Noodles",
    price: 7.5,
    calories: 589,
    protein: 22,
    carbs: 70,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_prawn_noodles",
    brandId: "lau_pa_sat_prawn_noodles",
    name: "Prawn Noodles (Soup)",
    emoji: "🦐",
    category: "Noodles",
    price: 6,
    calories: 420,
    protein: 24,
    carbs: 58,
    fat: 8,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_bak_chor_mee",
    brandId: "lau_pa_sat_bak_chor_mee",
    name: "Bak Chor Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 492,
    protein: 25,
    carbs: 62,
    fat: 14,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_chicken_rice",
    brandId: "lau_pa_sat_chicken_rice",
    name: "Steamed Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 5,
    calories: 607,
    protein: 35,
    carbs: 74,
    fat: 17,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_roast_chicken_rice",
    brandId: "lau_pa_sat_chicken_rice",
    name: "Roast Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 5.5,
    calories: 650,
    protein: 36,
    carbs: 74,
    fat: 20,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_rojak",
    brandId: "lau_pa_sat_rojak",
    name: "Rojak",
    emoji: "🥗",
    category: "Sides",
    price: 4,
    calories: 290,
    protein: 7,
    carbs: 44,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_bc_egg_tart",
    brandId: "lau_pa_sat_butter_cream",
    name: "Original Egg Tart",
    emoji: "🥮",
    category: "Desserts",
    price: 2.6,
    calories: 220,
    protein: 5,
    carbs: 26,
    fat: 10,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_bc_salted_egg_tart",
    brandId: "lau_pa_sat_butter_cream",
    name: "Salted Egg Lava Tart",
    emoji: "🥮",
    category: "Desserts",
    price: 2.9,
    calories: 250,
    protein: 6,
    carbs: 28,
    fat: 13,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_bc_hokkaido_doffin",
    brandId: "lau_pa_sat_butter_cream",
    name: "Hokkaido Doffin",
    emoji: "🍩",
    category: "Desserts",
    price: 3.2,
    calories: 300,
    protein: 6,
    carbs: 40,
    fat: 13,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_bc_oreo_doffin",
    brandId: "lau_pa_sat_butter_cream",
    name: "Oreo Doffin",
    emoji: "🍩",
    category: "Desserts",
    price: 2.9,
    calories: 310,
    protein: 5,
    carbs: 42,
    fat: 14,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_cc_single_gelato",
    brandId: "lau_pa_sat_creme_cone",
    name: "Single Gelato (Cup)",
    emoji: "🍦",
    category: "Desserts",
    price: 5.3,
    calories: 180,
    protein: 4,
    carbs: 28,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_cc_double_gelato",
    brandId: "lau_pa_sat_creme_cone",
    name: "Double Gelato (Cup)",
    emoji: "🍦",
    category: "Desserts",
    price: 9.7,
    calories: 360,
    protein: 8,
    carbs: 56,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_cc_pastry",
    brandId: "lau_pa_sat_creme_cone",
    name: "Gourmet Tart / Cheesecake",
    emoji: "🍰",
    category: "Desserts",
    price: 7.9,
    calories: 340,
    protein: 6,
    carbs: 38,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_wps_mee_soto",
    brandId: "lau_pa_sat_warong_pak_sapari",
    name: "Original Mee Soto",
    emoji: "🍜",
    category: "Noodles",
    price: 5.8,
    calories: 450,
    protein: 22,
    carbs: 58,
    fat: 12,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_wps_mee_rebus",
    brandId: "lau_pa_sat_warong_pak_sapari",
    name: "Original Mee Rebus",
    emoji: "🍜",
    category: "Noodles",
    price: 5.3,
    calories: 520,
    protein: 20,
    carbs: 78,
    fat: 13,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_wps_nasi_soto",
    brandId: "lau_pa_sat_warong_pak_sapari",
    name: "Nasi Soto",
    emoji: "🍚",
    category: "Rice",
    price: 6.5,
    calories: 550,
    protein: 25,
    carbs: 72,
    fat: 14,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_tal_nasi_lemak",
    brandId: "lau_pa_sat_taliwang",
    name: "Nasi Lemak Ayam Taliwang",
    emoji: "🍛",
    category: "Rice",
    price: 8.5,
    calories: 780,
    protein: 36,
    carbs: 74,
    fat: 36,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_tal_curry_rice",
    brandId: "lau_pa_sat_taliwang",
    name: "Chicken Fillet Curry Rice",
    emoji: "🍛",
    category: "Rice",
    price: 6.9,
    calories: 620,
    protein: 30,
    carbs: 74,
    fat: 18,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_maya_briyani",
    brandId: "lau_pa_sat_maya_veggie",
    name: "Vegetarian Briyani",
    emoji: "🍛",
    category: "Rice",
    price: 7,
    calories: 550,
    protein: 16,
    carbs: 85,
    fat: 14,
    compatibleWith: [
      "vegetarian",
      "halal"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_maya_palak_paneer",
    brandId: "lau_pa_sat_maya_veggie",
    name: "Palak Paneer",
    emoji: "🫕",
    category: "Mains",
    price: 6,
    calories: 380,
    protein: 16,
    carbs: 22,
    fat: 24,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_maya_kadhai_paneer",
    brandId: "lau_pa_sat_maya_veggie",
    name: "Kadhai Paneer",
    emoji: "🫕",
    category: "Mains",
    price: 6,
    calories: 360,
    protein: 16,
    carbs: 20,
    fat: 23,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_maya_veg_butter_chicken",
    brandId: "lau_pa_sat_maya_veggie",
    name: "Veg Butter Chicken",
    emoji: "🍛",
    category: "Mains",
    price: 8,
    calories: 420,
    protein: 22,
    carbs: 36,
    fat: 18,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "lps_lx_fishball_noodles",
    brandId: "lau_pa_sat_lixin_fishball",
    name: "Fishball Noodles",
    emoji: "🍢",
    category: "Noodles",
    price: 6,
    calories: 450,
    protein: 22,
    carbs: 68,
    fat: 8,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_lx_folks_favourite",
    brandId: "lau_pa_sat_lixin_fishball",
    name: "The Folks' Favourite",
    emoji: "🍢",
    category: "Noodles",
    price: 8.9,
    calories: 520,
    protein: 28,
    carbs: 72,
    fat: 10,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_fx_herbal_bkt",
    brandId: "lau_pa_sat_feng_xiang_bkt",
    name: "Herbal Bak Kut Teh",
    emoji: "🍲",
    category: "Soups",
    price: 8.5,
    calories: 350,
    protein: 28,
    carbs: 8,
    fat: 22,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_fx_organ_porridge",
    brandId: "lau_pa_sat_feng_xiang_bkt",
    name: "Mixed Pig Organ Fried Porridge",
    emoji: "🍚",
    category: "Rice",
    price: 7.5,
    calories: 480,
    protein: 22,
    carbs: 68,
    fat: 10,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_satay_chicken",
    brandId: "newton_satay_stall",
    name: "Chicken Satay (5 sticks)",
    emoji: "🍢",
    category: "Grill",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "newt_satay_beef",
    brandId: "newton_satay_stall",
    name: "Beef Satay (5 sticks)",
    emoji: "🍢",
    category: "Grill",
    price: 7,
    calories: 360,
    protein: 28,
    carbs: 18,
    fat: 20,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_bbq_chicken_wings",
    brandId: "newton_bbq_seafood",
    name: "BBQ Chicken Wings (2 pcs)",
    emoji: "🍗",
    category: "Grill",
    price: 7,
    calories: 280,
    protein: 22,
    carbs: 4,
    fat: 20,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "newt_stingray",
    brandId: "newton_bbq_seafood",
    name: "BBQ Stingray",
    emoji: "🐟",
    category: "Seafood",
    price: 12,
    calories: 320,
    protein: 38,
    carbs: 8,
    fat: 14,
    compatibleWith: [
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "newt_otah",
    brandId: "newton_bbq_seafood",
    name: "Otah (2 pieces)",
    emoji: "🐠",
    category: "Seafood",
    price: 4,
    calories: 170,
    protein: 14,
    carbs: 6,
    fat: 10,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_hokkien_mee",
    brandId: "newton_hokkien_mee",
    name: "Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 6,
    calories: 558,
    protein: 28,
    carbs: 64,
    fat: 18,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "newt_prawn_noodles",
    brandId: "newton_prawn_noodles",
    name: "Prawn Noodles",
    emoji: "🦐",
    category: "Noodles",
    price: 6,
    calories: 420,
    protein: 24,
    carbs: 58,
    fat: 8,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "newt_oyster_omelette",
    brandId: "newton_oyster_omelette",
    name: "Oyster Omelette",
    emoji: "🦪",
    category: "Sides",
    price: 7,
    calories: 396,
    protein: 18,
    carbs: 35,
    fat: 19,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_carrot_cake_white",
    brandId: "newton_carrot_cake",
    name: "Carrot Cake (White)",
    emoji: "🍳",
    category: "Sides",
    price: 4.5,
    calories: 338,
    protein: 9,
    carbs: 47,
    fat: 13,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_char_kway_teow",
    brandId: "newton_char_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_kopi_o",
    brandId: "newton_drinks_stall",
    name: "Kopi O",
    emoji: "☕",
    category: "Drinks",
    price: 1.2,
    calories: 40,
    protein: 0,
    carbs: 8,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "newt_bandung",
    brandId: "newton_drinks_stall",
    name: "Bandung (Rose Milk)",
    emoji: "🌸",
    category: "Drinks",
    price: 2,
    calories: 155,
    protein: 3,
    carbs: 30,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_duck_rice",
    brandId: "cc_roast_meats_stall",
    name: "Roast Duck Rice",
    emoji: "🦆",
    category: "Rice",
    price: 5,
    calories: 688,
    protein: 36,
    carbs: 72,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cc_char_siew_rice",
    brandId: "cc_roast_meats_stall",
    name: "Char Siew Rice",
    emoji: "🍖",
    category: "Rice",
    price: 4.5,
    calories: 660,
    protein: 30,
    carbs: 76,
    fat: 20,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_claypot_rice",
    brandId: "cc_claypot_rice_stall",
    name: "Claypot Rice",
    emoji: "🍚",
    category: "Rice",
    price: 7,
    calories: 720,
    protein: 30,
    carbs: 88,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cc_kway_chap",
    brandId: "cc_kway_chap_stall",
    name: "Kway Chap",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 490,
    protein: 28,
    carbs: 52,
    fat: 18,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cc_wonton_mee",
    brandId: "cc_wonton_mee_stall",
    name: "Wonton Mee (Dry)",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 434,
    protein: 22,
    carbs: 58,
    fat: 12,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_ban_mian",
    brandId: "cc_ban_mian_stall",
    name: "Ban Mian Soup",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 22,
    carbs: 52,
    fat: 10,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_bak_chor_mee",
    brandId: "cc_bak_chor_mee_stall",
    name: "Bak Chor Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 492,
    protein: 25,
    carbs: 62,
    fat: 14,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_char_kway_teow",
    brandId: "cc_char_kway_teow_stall",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_chee_cheong_fun",
    brandId: "cc_rice_noodle_rolls",
    name: "Chee Cheong Fun",
    emoji: "🍜",
    category: "Snacks",
    price: 3,
    calories: 295,
    protein: 10,
    carbs: 48,
    fat: 7,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_popiah",
    brandId: "cc_rice_noodle_rolls",
    name: "Popiah (Fresh)",
    emoji: "🌯",
    category: "Snacks",
    price: 2,
    calories: 195,
    protein: 8,
    carbs: 28,
    fat: 5,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_ice_kachang",
    brandId: "cc_desserts_stall",
    name: "Ice Kachang",
    emoji: "🍧",
    category: "Desserts",
    price: 2.5,
    calories: 208,
    protein: 4,
    carbs: 44,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_tau_huay",
    brandId: "cc_desserts_stall",
    name: "Tau Huay",
    emoji: "🫙",
    category: "Desserts",
    price: 1.2,
    calories: 115,
    protein: 6,
    carbs: 17,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_chendol",
    brandId: "cc_desserts_stall",
    name: "Chendol",
    emoji: "🍮",
    category: "Desserts",
    price: 2.8,
    calories: 278,
    protein: 3,
    carbs: 54,
    fat: 6,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "cc_kopi_o",
    brandId: "cc_kopi_stall",
    name: "Kopi O",
    emoji: "☕",
    category: "Drinks",
    price: 1.1,
    calories: 40,
    protein: 0,
    carbs: 8,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_roti_prata_plain",
    brandId: "tekka_prata_stall",
    name: "Roti Prata (Plain)",
    emoji: "🫓",
    category: "Indian Breads",
    price: 1.3,
    calories: 280,
    protein: 7,
    carbs: 40,
    fat: 10,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tekka_roti_prata_egg",
    brandId: "tekka_jom_makan_prata",
    name: "Roti Prata (Egg)",
    emoji: "🫓",
    category: "Indian Breads",
    price: 1.8,
    calories: 355,
    protein: 13,
    carbs: 41,
    fat: 15,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tekka_masala_prata",
    brandId: "tekka_ar_rahman_cafe",
    name: "Masala Prata",
    emoji: "🫓",
    category: "Indian Breads",
    price: 2.5,
    calories: 270,
    protein: 8,
    carbs: 32,
    fat: 13,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_thosai",
    brandId: "tekka_thosai_stall",
    name: "Thosai (Plain)",
    emoji: "🫓",
    category: "Indian Breads",
    price: 1.2,
    calories: 195,
    protein: 6,
    carbs: 36,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_vadai",
    brandId: "tekka_thosai_stall",
    name: "Vadai",
    emoji: "🍩",
    category: "Indian Breads",
    price: 1,
    calories: 125,
    protein: 5,
    carbs: 14,
    fat: 6,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_murtabak",
    brandId: "tekka_murtabak_stall",
    name: "Murtabak (Chicken)",
    emoji: "🫓",
    category: "Indian Breads",
    price: 6,
    calories: 450,
    protein: 22,
    carbs: 48,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_nasi_briyani",
    brandId: "tekka_briyani_stall",
    name: "Nasi Briyani (Chicken)",
    emoji: "🍛",
    category: "Rice",
    price: 7,
    calories: 680,
    protein: 38,
    carbs: 72,
    fat: 22,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tekka_nasi_lemak",
    brandId: "tekka_nasi_lemak_stall",
    name: "Nasi Lemak Set",
    emoji: "🍛",
    category: "Rice",
    price: 4,
    calories: 700,
    protein: 21,
    carbs: 82,
    fat: 28,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_lontong",
    brandId: "tekka_nasi_lemak_stall",
    name: "Lontong",
    emoji: "🍲",
    category: "Rice",
    price: 4,
    calories: 480,
    protein: 14,
    carbs: 68,
    fat: 18,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_mee_goreng",
    brandId: "tekka_mee_goreng_stall",
    name: "Mee Goreng",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 520,
    protein: 18,
    carbs: 72,
    fat: 16,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_rojak",
    brandId: "tekka_rojak_stall",
    name: "Rojak",
    emoji: "🥗",
    category: "Sides",
    price: 4,
    calories: 290,
    protein: 7,
    carbs: 44,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_teh_tarik",
    brandId: "tekka_drinks_stall",
    name: "Teh Tarik",
    emoji: "🍵",
    category: "Drinks",
    price: 1.5,
    calories: 112,
    protein: 4,
    carbs: 18,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_bandung",
    brandId: "tekka_drinks_stall",
    name: "Bandung (Rose Milk)",
    emoji: "🌸",
    category: "Drinks",
    price: 2,
    calories: 155,
    protein: 3,
    carbs: 30,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "tekka_coconut_water",
    brandId: "tekka_drinks_stall",
    name: "Fresh Coconut Water",
    emoji: "🥥",
    category: "Drinks",
    price: 2.5,
    calories: 60,
    protein: 1,
    carbs: 14,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_char_kway_teow",
    brandId: "oar_char_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "oar_hokkien_mee",
    brandId: "oar_hokkien_mee",
    name: "Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 558,
    protein: 28,
    carbs: 64,
    fat: 18,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "oar_prawn_noodles",
    brandId: "oar_prawn_noodles",
    name: "Prawn Noodles (Soup)",
    emoji: "🦐",
    category: "Noodles",
    price: 5,
    calories: 420,
    protein: 24,
    carbs: 58,
    fat: 8,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "oar_bak_chor_mee",
    brandId: "oar_bak_chor_mee",
    name: "Bak Chor Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 492,
    protein: 25,
    carbs: 62,
    fat: 14,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_duck_rice",
    brandId: "oar_roast_duck_rice",
    name: "Roast Duck Rice",
    emoji: "🦆",
    category: "Rice",
    price: 6,
    calories: 688,
    protein: 36,
    carbs: 72,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "oar_economic_rice",
    brandId: "oar_economic_rice",
    name: "Economic Rice (2 sides)",
    emoji: "🍱",
    category: "Rice",
    price: 4,
    calories: 480,
    protein: 20,
    carbs: 65,
    fat: 13,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_fried_rice",
    brandId: "oar_economic_rice",
    name: "Fried Rice",
    emoji: "🍳",
    category: "Rice",
    price: 4.5,
    calories: 480,
    protein: 15,
    carbs: 72,
    fat: 14,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_laksa",
    brandId: "oar_laksa",
    name: "Laksa",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 589,
    protein: 27,
    carbs: 68,
    fat: 22,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_wonton_mee",
    brandId: "oar_wonton_mee",
    name: "Wonton Mee (Dry)",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 434,
    protein: 22,
    carbs: 58,
    fat: 12,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_popiah",
    brandId: "oar_popiah",
    name: "Fresh Popiah",
    emoji: "🌯",
    category: "Snacks",
    price: 1.6,
    calories: 195,
    protein: 8,
    carbs: 28,
    fat: 5,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_oyster_omelette",
    brandId: "oar_oyster_omelette",
    name: "Oyster Omelette",
    emoji: "🦪",
    category: "Sides",
    price: 6,
    calories: 396,
    protein: 18,
    carbs: 35,
    fat: 19,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_ice_kachang",
    brandId: "oar_desserts_drinks",
    name: "Ice Kachang",
    emoji: "🍧",
    category: "Desserts",
    price: 2.5,
    calories: 208,
    protein: 4,
    carbs: 44,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_teh_tarik",
    brandId: "oar_desserts_drinks",
    name: "Teh Tarik",
    emoji: "🍵",
    category: "Drinks",
    price: 1.5,
    calories: 112,
    protein: 4,
    carbs: 18,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "oar_kopi",
    brandId: "oar_desserts_drinks",
    name: "Kopi",
    emoji: "☕",
    category: "Drinks",
    price: 1.2,
    calories: 130,
    protein: 3,
    carbs: 22,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_chicken_rice",
    brandId: "gmfc_chicken_rice",
    name: "Hainanese Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 5,
    calories: 607,
    protein: 35,
    carbs: 74,
    fat: 17,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gmfc_bak_kut_teh",
    brandId: "gmfc_bak_kut_teh",
    name: "Bak Kut Teh",
    emoji: "🍲",
    category: "Rice",
    price: 7,
    calories: 450,
    protein: 36,
    carbs: 12,
    fat: 28,
    compatibleWith: [
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gmfc_char_kway_teow",
    brandId: "gmfc_char_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gmfc_hokkien_mee",
    brandId: "gmfc_hokkien_mee",
    name: "Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 558,
    protein: 28,
    carbs: 64,
    fat: 18,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_laksa",
    brandId: "gmfc_laksa",
    name: "Laksa",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 589,
    protein: 27,
    carbs: 68,
    fat: 22,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_prawn_noodles",
    brandId: "gmfc_prawn_noodles",
    name: "Prawn Noodles",
    emoji: "🦐",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 24,
    carbs: 58,
    fat: 8,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gmfc_satay_chicken",
    brandId: "gmfc_satay_stall",
    name: "Chicken Satay (5 sticks)",
    emoji: "🍢",
    category: "Grill",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_oyster_cake",
    brandId: "gmfc_snacks_stall",
    name: "Fuzhou Oyster Cake",
    emoji: "🦪",
    category: "Snacks",
    price: 2,
    calories: 245,
    protein: 10,
    carbs: 28,
    fat: 10,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_carrot_cake",
    brandId: "gmfc_snacks_stall",
    name: "Carrot Cake (Black)",
    emoji: "🍳",
    category: "Sides",
    price: 3.5,
    calories: 371,
    protein: 9,
    carbs: 50,
    fat: 14,
    compatibleWith: [
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_peanut_soup",
    brandId: "gmfc_desserts_drinks",
    name: "Ah Balling Peanut Soup",
    emoji: "🫙",
    category: "Desserts",
    price: 3,
    calories: 280,
    protein: 8,
    carbs: 42,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_kopi",
    brandId: "gmfc_desserts_drinks",
    name: "Kopi",
    emoji: "☕",
    category: "Drinks",
    price: 1.3,
    calories: 130,
    protein: 3,
    carbs: 22,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "gmfc_kopi_o",
    brandId: "gmfc_desserts_drinks",
    name: "Kopi O",
    emoji: "☕",
    category: "Drinks",
    price: 1.1,
    calories: 40,
    protein: 0,
    carbs: 8,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_nasi_lemak",
    brandId: "gsm_nasi_lemak_stall",
    name: "Nasi Lemak Set",
    emoji: "🍛",
    category: "Rice",
    price: 4.5,
    calories: 700,
    protein: 21,
    carbs: 82,
    fat: 28,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gsm_nasi_briyani",
    brandId: "gsm_briyani_stall",
    name: "Nasi Briyani (Chicken)",
    emoji: "🍛",
    category: "Rice",
    price: 7,
    calories: 680,
    protein: 38,
    carbs: 72,
    fat: 22,
    compatibleWith: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gsm_nasi_padang",
    brandId: "gsm_nasi_padang_stall",
    name: "Nasi Padang",
    emoji: "🍛",
    category: "Rice",
    price: 6,
    calories: 650,
    protein: 30,
    carbs: 65,
    fat: 28,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_ayam_penyet",
    brandId: "gsm_ayam_penyet_stall",
    name: "Ayam Penyet",
    emoji: "🍗",
    category: "Rice",
    price: 8,
    calories: 620,
    protein: 42,
    carbs: 52,
    fat: 26,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_lontong",
    brandId: "gsm_lontong_stall",
    name: "Lontong",
    emoji: "🍲",
    category: "Rice",
    price: 4,
    calories: 480,
    protein: 14,
    carbs: 68,
    fat: 18,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_murtabak",
    brandId: "gsm_murtabak_stall",
    name: "Murtabak (Chicken)",
    emoji: "🫓",
    category: "Indian Breads",
    price: 6,
    calories: 450,
    protein: 22,
    carbs: 48,
    fat: 20,
    compatibleWith: [
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_mee_goreng",
    brandId: "gsm_mee_stall",
    name: "Mee Goreng",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 520,
    protein: 18,
    carbs: 72,
    fat: 16,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "gsm_mee_siam",
    brandId: "gsm_mee_stall",
    name: "Mee Siam",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 394,
    protein: 16,
    carbs: 62,
    fat: 8,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_economy_beehoon",
    brandId: "gsm_beehoon_stall",
    name: "Economy Beehoon",
    emoji: "🍝",
    category: "Noodles",
    price: 3,
    calories: 336,
    protein: 10,
    carbs: 52,
    fat: 9,
    compatibleWith: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_rojak",
    brandId: "gsm_rojak_stall",
    name: "Rojak",
    emoji: "🥗",
    category: "Sides",
    price: 4,
    calories: 290,
    protein: 7,
    carbs: 44,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_bubur_hitam",
    brandId: "gsm_desserts_drinks",
    name: "Bubur Hitam",
    emoji: "🍮",
    category: "Desserts",
    price: 2,
    calories: 230,
    protein: 4,
    carbs: 46,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_teh_tarik",
    brandId: "gsm_desserts_drinks",
    name: "Teh Tarik",
    emoji: "🍵",
    category: "Drinks",
    price: 1.5,
    calories: 112,
    protein: 4,
    carbs: 18,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "gsm_bandung",
    brandId: "gsm_desserts_drinks",
    name: "Bandung (Rose Milk)",
    emoji: "🌸",
    category: "Drinks",
    price: 2,
    calories: 155,
    protein: 3,
    carbs: 30,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_chicken_rice",
    brandId: "whampoa_chicken_rice",
    name: "Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 4.5,
    calories: 607,
    protein: 35,
    carbs: 74,
    fat: 17,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "whampoa_economy_rice",
    brandId: "whampoa_economic_rice",
    name: "Economic Rice (2 sides)",
    emoji: "🍱",
    category: "Rice",
    price: 3.5,
    calories: 480,
    protein: 20,
    carbs: 65,
    fat: 13,
    compatibleWith: [
      "halal",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_laksa",
    brandId: "whampoa_laksa",
    name: "Laksa",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 589,
    protein: 27,
    carbs: 68,
    fat: 22,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "whampoa_bak_chor_mee",
    brandId: "whampoa_bak_chor_mee",
    name: "Bak Chor Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 492,
    protein: 25,
    carbs: 62,
    fat: 14,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "whampoa_ban_mian",
    brandId: "whampoa_ban_mian",
    name: "Ban Mian Soup",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 22,
    carbs: 52,
    fat: 10,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_wonton_mee",
    brandId: "whampoa_wonton_mee",
    name: "Wonton Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 434,
    protein: 22,
    carbs: 58,
    fat: 12,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_char_kway_teow",
    brandId: "whampoa_char_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Noodles",
    price: 4,
    calories: 660,
    protein: 20,
    carbs: 82,
    fat: 26,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_hokkien_mee",
    brandId: "whampoa_hokkien_mee",
    name: "Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 558,
    protein: 28,
    carbs: 64,
    fat: 18,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_roti_prata",
    brandId: "whampoa_prata_stall",
    name: "Roti Prata (Egg)",
    emoji: "🫓",
    category: "Indian Breads",
    price: 1.8,
    calories: 355,
    protein: 13,
    carbs: 41,
    fat: 15,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_tau_huay",
    brandId: "whampoa_desserts_drinks",
    name: "Tau Huay",
    emoji: "🫙",
    category: "Desserts",
    price: 1.2,
    calories: 115,
    protein: 6,
    carbs: 17,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_kopi",
    brandId: "whampoa_desserts_drinks",
    name: "Kopi",
    emoji: "☕",
    category: "Drinks",
    price: 1.2,
    calories: 130,
    protein: 3,
    carbs: 22,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_kopi_o",
    brandId: "whampoa_desserts_drinks",
    name: "Kopi O",
    emoji: "☕",
    category: "Drinks",
    price: 1.1,
    calories: 40,
    protein: 0,
    carbs: 8,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "whampoa_teh_tarik",
    brandId: "whampoa_desserts_drinks",
    name: "Teh Tarik",
    emoji: "🍵",
    category: "Drinks",
    price: 1.3,
    calories: 112,
    protein: 4,
    carbs: 18,
    fat: 3,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "luckin_americano_m",
    brandId: "luckin_coffee",
    name: "Americano (M)",
    emoji: "☕",
    category: "Espresso",
    price: 4.2,
    calories: 10,
    protein: 0,
    carbs: 2,
    fat: 0,
    compatibleWith: [
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "luckin_latte_m",
    brandId: "luckin_coffee",
    name: "Latte (M)",
    emoji: "☕",
    category: "Espresso",
    price: 5,
    calories: 130,
    protein: 6,
    carbs: 12,
    fat: 5,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "luckin_cold_brew_latte_m",
    brandId: "luckin_coffee",
    name: "Cold Brew Latte (M)",
    emoji: "🧊",
    category: "Cold Brew",
    price: 5.5,
    calories: 100,
    protein: 5,
    carbs: 9,
    fat: 4,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "luckin_raw_coconut_latte_m",
    brandId: "luckin_coffee",
    name: "Raw Coconut Latte (M)",
    emoji: "🥥",
    category: "Signature",
    price: 5.8,
    calories: 200,
    protein: 4,
    carbs: 22,
    fat: 9,
    compatibleWith: [
      "vegan",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "luckin_velvet_latte_m",
    brandId: "luckin_coffee",
    name: "Velvet Latte (M)",
    emoji: "🫗",
    category: "Signature",
    price: 5.5,
    calories: 160,
    protein: 7,
    carbs: 16,
    fat: 6,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "luckin_matcha_latte_m",
    brandId: "luckin_coffee",
    name: "Matcha Latte (M)",
    emoji: "🍵",
    category: "Matcha",
    price: 5.5,
    calories: 170,
    protein: 5,
    carbs: 22,
    fat: 6,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "luckin_cheese_tea_m",
    brandId: "luckin_coffee",
    name: "Cheese Tea (M)",
    emoji: "🫧",
    category: "Cheese Tea",
    price: 5.8,
    calories: 185,
    protein: 5,
    carbs: 24,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bonchon_wings_rice_set",
    brandId: "bonchon",
    name: "Wings & Rice Set (4pc)",
    emoji: "🍱",
    category: "Sets",
    price: 17.9,
    calories: 800,
    protein: 45,
    carbs: 78,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bonchon_drums_rice_set",
    brandId: "bonchon",
    name: "Drums & Rice Set (4pc)",
    emoji: "🍱",
    category: "Sets",
    price: 17.9,
    calories: 830,
    protein: 50,
    carbs: 76,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bonchon_wings_sg_6pc",
    brandId: "bonchon",
    name: "Wings Soy Garlic (6pc)",
    emoji: "🍗",
    category: "Wings",
    price: 16.9,
    calories: 580,
    protein: 40,
    carbs: 32,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bonchon_wings_spicy_6pc",
    brandId: "bonchon",
    name: "Wings Spicy (6pc)",
    emoji: "🌶️",
    category: "Wings",
    price: 16.9,
    calories: 575,
    protein: 39,
    carbs: 32,
    fat: 27,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bonchon_drums_sg_6pc",
    brandId: "bonchon",
    name: "Drums Soy Garlic (6pc)",
    emoji: "🍗",
    category: "Drums",
    price: 16.9,
    calories: 640,
    protein: 48,
    carbs: 28,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bonchon_tenders_5pc",
    brandId: "bonchon",
    name: "Tenders (5pc)",
    emoji: "🍗",
    category: "Tenders",
    price: 14.9,
    calories: 450,
    protein: 36,
    carbs: 30,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bonchon_bibimbap",
    brandId: "bonchon",
    name: "Bibimbap",
    emoji: "🍚",
    category: "Rice",
    price: 16.9,
    calories: 620,
    protein: 28,
    carbs: 80,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "bonchon_tteokbokki",
    brandId: "bonchon",
    name: "Tteokbokki",
    emoji: "🍢",
    category: "Snacks",
    price: 12.9,
    calories: 380,
    protein: 10,
    carbs: 68,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "llao_tarrina_s",
    brandId: "llaollao",
    name: "Tarrina S",
    emoji: "🍦",
    category: "Plain",
    price: 4.2,
    calories: 90,
    protein: 4,
    carbs: 17,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "llao_sanum_s",
    brandId: "llaollao",
    name: "Sanum S",
    emoji: "🍦",
    category: "Sanum",
    price: 5.9,
    calories: 150,
    protein: 6,
    carbs: 28,
    fat: 1,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "llao_sanum_m",
    brandId: "llaollao",
    name: "Sanum M",
    emoji: "🍦",
    category: "Sanum",
    price: 8.5,
    calories: 230,
    protein: 9,
    carbs: 42,
    fat: 2,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "llao_sanum_l",
    brandId: "llaollao",
    name: "Sanum L",
    emoji: "🍦",
    category: "Sanum",
    price: 11.5,
    calories: 340,
    protein: 13,
    carbs: 62,
    fat: 3,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "llao_granola_s",
    brandId: "llaollao",
    name: "Granola S",
    emoji: "🌾",
    category: "Granola",
    price: 7.5,
    calories: 220,
    protein: 7,
    carbs: 40,
    fat: 3,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "llao_signature",
    brandId: "llaollao",
    name: "Llaollao (Signature)",
    emoji: "🍦",
    category: "Signature",
    price: 14.9,
    calories: 480,
    protein: 17,
    carbs: 88,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  
  
  
  
  
  
  
  
  {
    id: "ing_chicken_breast",
    brandId: "fairprice",
    name: "Chicken Breast (skinless)",
    emoji: "🍗",
    category: "Ingredients",
    price: 6.5,
    calories: 825,
    protein: 155,
    carbs: 0,
    fat: 18,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "verified"
  },
  {
    id: "ing_chicken_thigh",
    brandId: "fairprice",
    name: "Chicken Thigh (boneless, skinless)",
    emoji: "🍗",
    category: "Ingredients",
    price: 5,
    calories: 895,
    protein: 100,
    carbs: 0,
    fat: 55,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "verified"
  },
  {
    id: "ing_eggs_10",
    brandId: "fairprice",
    name: "Eggs (Local Farm)",
    emoji: "🥚",
    category: "Ingredients",
    price: 2.8,
    calories: 700,
    protein: 60,
    carbs: 5,
    fat: 50,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "verified"
  },
  {
    id: "ing_canned_tuna",
    brandId: "fairprice",
    name: "Tuna in Water (Ayam Brand)",
    emoji: "🐟",
    category: "Ingredients",
    price: 2.2,
    calories: 140,
    protein: 30,
    carbs: 0,
    fat: 1,
    compatibleWith: [
      "gluten_free"
    ],
    confidence: "verified"
  },
  {
    id: "ing_silken_tofu",
    brandId: "fairprice",
    name: "Silken Tofu (Unicurd)",
    emoji: "🫘",
    category: "Ingredients",
    price: 1.2,
    calories: 150,
    protein: 15,
    carbs: 6,
    fat: 7.5,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_greek_yogurt",
    brandId: "fairprice",
    name: "Low-fat Greek Yogurt (Meiji)",
    emoji: "🫙",
    category: "Ingredients",
    price: 5.5,
    calories: 295,
    protein: 50,
    carbs: 18,
    fat: 2,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "verified"
  },
  {
    id: "ing_jasmine_rice",
    brandId: "fairprice",
    name: "Jasmine Rice (Fragrant)",
    emoji: "🍚",
    category: "Ingredients",
    price: 12,
    calories: 18000,
    protein: 350,
    carbs: 4000,
    fat: 25,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_brown_rice",
    brandId: "fairprice",
    name: "Brown Rice (SunWhite)",
    emoji: "🍚",
    category: "Ingredients",
    price: 4.5,
    calories: 3700,
    protein: 75,
    carbs: 770,
    fat: 27,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_rolled_oats",
    brandId: "fairprice",
    name: "Rolled Oats (Quaker)",
    emoji: "🌾",
    category: "Ingredients",
    price: 3.5,
    calories: 1900,
    protein: 65,
    carbs: 335,
    fat: 35,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_sweet_potato",
    brandId: "fairprice",
    name: "Sweet Potato (Orange)",
    emoji: "🍠",
    category: "Ingredients",
    price: 2,
    calories: 430,
    protein: 8,
    carbs: 100,
    fat: 0.5,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_canned_chickpeas",
    brandId: "fairprice",
    name: "Chickpeas, canned (Ayam Brand)",
    emoji: "🫘",
    category: "Ingredients",
    price: 2,
    calories: 288,
    protein: 17,
    carbs: 48,
    fat: 5,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_banana",
    brandId: "fairprice",
    name: "Banana (Cavendish)",
    emoji: "🍌",
    category: "Ingredients",
    price: 0.4,
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_baby_spinach",
    brandId: "fairprice",
    name: "Baby Spinach",
    emoji: "🥬",
    category: "Ingredients",
    price: 2.5,
    calories: 28,
    protein: 3.6,
    carbs: 4.2,
    fat: 0.5,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_broccoli",
    brandId: "fairprice",
    name: "Broccoli",
    emoji: "🥦",
    category: "Ingredients",
    price: 2.5,
    calories: 119,
    protein: 10.5,
    carbs: 24.5,
    fat: 1.4,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_whole_milk",
    brandId: "fairprice",
    name: "Full Cream Milk (Meiji)",
    emoji: "🥛",
    category: "Ingredients",
    price: 3,
    calories: 610,
    protein: 32,
    carbs: 48,
    fat: 33,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "verified"
  },
  {
    id: "ing_light_soy_sauce",
    brandId: "fairprice",
    name: "Light Soy Sauce (Kikkoman)",
    emoji: "🍶",
    category: "Ingredients",
    price: 3.5,
    calories: 60,
    protein: 6,
    carbs: 6,
    fat: 0,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "ing_sesame_oil",
    brandId: "fairprice",
    name: "Sesame Oil",
    emoji: "🫙",
    category: "Ingredients",
    price: 4,
    calories: 1700,
    protein: 0,
    carbs: 0,
    fat: 194,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "verified"
  },
  {
    id: "rec_chicken_rice_bowl",
    brandId: "home_cooked",
    name: "High-Protein Chicken Rice Bowl",
    emoji: "🍱",
    category: "High Protein",
    price: 5.3,
    calories: 390,
    protein: 42,
    carbs: 32,
    fat: 7,
    compatibleWith: [
      "halal",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "rec_tuna_oat_salad",
    brandId: "home_cooked",
    name: "Tuna Spinach Salad with Oats",
    emoji: "🥗",
    category: "Quick & Easy",
    price: 3.1,
    calories: 320,
    protein: 36,
    carbs: 28,
    fat: 4,
    compatibleWith: [
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "rec_egg_fried_rice",
    brandId: "home_cooked",
    name: "High-Protein Egg Fried Rice",
    emoji: "🍳",
    category: "Budget Meal",
    price: 2.5,
    calories: 360,
    protein: 18,
    carbs: 52,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "rec_overnight_oats",
    brandId: "home_cooked",
    name: "Overnight Oats with Banana",
    emoji: "🌙",
    category: "Meal Prep",
    price: 2.2,
    calories: 330,
    protein: 14,
    carbs: 52,
    fat: 7,
    compatibleWith: [
      "vegetarian",
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "rec_tofu_veggie_stir_fry",
    brandId: "home_cooked",
    name: "Tofu & Veggie Stir Fry",
    emoji: "🥦",
    category: "Vegetarian",
    price: 3.6,
    calories: 280,
    protein: 18,
    carbs: 28,
    fat: 10,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "halal",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "rec_chickpea_sweet_potato_bowl",
    brandId: "home_cooked",
    name: "Chickpea & Sweet Potato Bowl",
    emoji: "🍠",
    category: "Vegetarian",
    price: 4.1,
    calories: 350,
    protein: 16,
    carbs: 58,
    fat: 5,
    compatibleWith: [
      "vegetarian",
      "gluten_free",
      "halal"
    ],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_chicken_katsu_don",
    brandId: "ichiban_boshi",
    name: "Chicken Katsu Don",
    emoji: "🍛",
    category: "Donburi",
    price: 18.18,
    calories: 820,
    protein: 32,
    carbs: 88,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ichiban_boshi_chicken_teriyaki_don",
    brandId: "ichiban_boshi",
    name: "Chicken Teriyaki Don",
    emoji: "🍛",
    category: "Donburi",
    price: 14.01,
    calories: 650,
    protein: 34,
    carbs: 78,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ichiban_boshi_beef_teriyaki_don",
    brandId: "ichiban_boshi",
    name: "Beef Teriyaki Don",
    emoji: "🍛",
    category: "Donburi",
    price: 16.36,
    calories: 700,
    protein: 30,
    carbs: 75,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_black_pepper_salmon_don",
    brandId: "ichiban_boshi",
    name: "Black Pepper Salmon Don",
    emoji: "🍣",
    category: "Donburi",
    price: 21.07,
    calories: 680,
    protein: 30,
    carbs: 68,
    fat: 26,
    compatibleWith: [
      "pescatarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_unajyu",
    brandId: "ichiban_boshi",
    name: "Unajyu (Grilled Eel Rice)",
    emoji: "🍱",
    category: "Donburi",
    price: 30.48,
    calories: 750,
    protein: 26,
    carbs: 95,
    fat: 22,
    compatibleWith: [
      "pescatarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_salmon_sashimi_salad",
    brandId: "ichiban_boshi",
    name: "Salmon Sashimi Salad",
    emoji: "🥗",
    category: "Salad",
    price: 17.54,
    calories: 320,
    protein: 22,
    carbs: 14,
    fat: 18,
    compatibleWith: [
      "pescatarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_tori_karaage",
    brandId: "ichiban_boshi",
    name: "Tori Karaage",
    emoji: "🍗",
    category: "Bento Sides",
    price: 9.3,
    calories: 420,
    protein: 22,
    carbs: 24,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ichiban_boshi_tempura_udon",
    brandId: "ichiban_boshi",
    name: "Tempura Udon",
    emoji: "🍜",
    category: "Udon & Soba",
    price: 18.71,
    calories: 600,
    protein: 18,
    carbs: 82,
    fat: 18,
    compatibleWith: [
      "pescatarian"
    ],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_chirashi_jyu",
    brandId: "ichiban_boshi",
    name: "Chirashi Jyu",
    emoji: "🍣",
    category: "Jyu",
    price: 23.42,
    calories: 540,
    protein: 34,
    carbs: 68,
    fat: 10,
    compatibleWith: [
      "pescatarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "ichiban_boshi_edamame",
    brandId: "ichiban_boshi",
    name: "Edamame",
    emoji: "🌱",
    category: "Bento Sides",
    price: 5.77,
    calories: 120,
    protein: 11,
    carbs: 9,
    fat: 5,
    compatibleWith: [
      "vegan",
      "vegetarian",
      "gluten_free",
      "dairy_free",
      "nut_free"
    ],
    confidence: "community"
  },
  {
    id: "coffeesmith_espresso",
    brandId: "coffeesmith",
    name: "Espresso",
    emoji: "☕",
    category: "Espresso",
    price: 4.95,
    calories: 5,
    protein: 0,
    carbs: 1,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "keto",
      "dairy_free",
      "low_carb",
      "nut_free"
    ],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_americano",
    brandId: "coffeesmith",
    name: "Cafe Americano",
    emoji: "☕",
    category: "Coffee",
    price: 5.5,
    calories: 10,
    protein: 1,
    carbs: 2,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "keto",
      "dairy_free",
      "low_carb",
      "nut_free"
    ],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_cafe_latte",
    brandId: "coffeesmith",
    name: "Cafe Latte",
    emoji: "☕",
    category: "Coffee",
    price: 7.15,
    calories: 190,
    protein: 10,
    carbs: 15,
    fat: 7,
    compatibleWith: [
      "vegetarian",
      "gluten_free",
      "nut_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "coffeesmith_cappuccino",
    brandId: "coffeesmith",
    name: "Cafe Cappuccino",
    emoji: "☕",
    category: "Coffee",
    price: 7.15,
    calories: 120,
    protein: 7,
    carbs: 10,
    fat: 5,
    compatibleWith: [
      "vegetarian",
      "gluten_free",
      "nut_free"
    ],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_cafe_mocha",
    brandId: "coffeesmith",
    name: "Cafe Mocha",
    emoji: "☕",
    category: "Coffee",
    price: 7.7,
    calories: 290,
    protein: 9,
    carbs: 35,
    fat: 11,
    compatibleWith: [
      "vegetarian",
      "gluten_free",
      "nut_free"
    ],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_iced_caramel_macchiato",
    brandId: "coffeesmith",
    name: "Iced Cafe Caramel Macchiato",
    emoji: "🧊",
    category: "Coffee",
    price: 8.8,
    calories: 240,
    protein: 7,
    carbs: 38,
    fat: 7,
    compatibleWith: [
      "vegetarian",
      "gluten_free",
      "nut_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "coffeesmith_croissant",
    brandId: "coffeesmith",
    name: "Croissant",
    emoji: "🥐",
    category: "Bakery",
    price: 5,
    calories: 230,
    protein: 5,
    carbs: 26,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_ham_cheese_croissant",
    brandId: "coffeesmith",
    name: "Ham & Cheese Croissant",
    emoji: "🥐",
    category: "Croissant",
    price: 12,
    calories: 420,
    protein: 18,
    carbs: 30,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_smith_waffle",
    brandId: "coffeesmith",
    name: "Smith Waffle",
    emoji: "🧇",
    category: "Bakery",
    price: 12,
    calories: 450,
    protein: 8,
    carbs: 55,
    fat: 22,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "coffeesmith_injeolmi_toast",
    brandId: "coffeesmith",
    name: "Injeolmi Toast",
    emoji: "🍞",
    category: "Injeolmi Toast",
    price: 8.7,
    calories: 380,
    protein: 9,
    carbs: 62,
    fat: 11,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "coffeesmith_chocolate_truffle_cake",
    brandId: "coffeesmith",
    name: "Chocolate Truffle Cake",
    emoji: "🍰",
    category: "Cakes",
    price: 9.35,
    calories: 420,
    protein: 5,
    carbs: 45,
    fat: 24,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "coffeesmith_strawberry_ade",
    brandId: "coffeesmith",
    name: "Strawberry Ade",
    emoji: "🍓",
    category: "Smith Ade",
    price: 6.6,
    calories: 180,
    protein: 0,
    carbs: 45,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "dairy_free",
      "nut_free"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_bubble_milk_tea",
    brandId: "hollin",
    name: "Bubble Milk Tea",
    emoji: "🧋",
    category: "Milk Tea",
    price: 4.7,
    calories: 340,
    protein: 3,
    carbs: 62,
    fat: 5,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hollin_oolong_milk_tea",
    brandId: "hollin",
    name: "Oolong Milk Tea",
    emoji: "🧋",
    category: "Milk Tea",
    price: 3.9,
    calories: 210,
    protein: 3,
    carbs: 38,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_earl_grey_milk_tea",
    brandId: "hollin",
    name: "Earl Grey Milk Tea",
    emoji: "🧋",
    category: "Milk Tea",
    price: 3.9,
    calories: 200,
    protein: 3,
    carbs: 36,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_honey_milk_tea",
    brandId: "hollin",
    name: "Honey Milk Tea",
    emoji: "🍯",
    category: "Milk Tea",
    price: 4.3,
    calories: 230,
    protein: 3,
    carbs: 42,
    fat: 4,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_black_tea_rsm",
    brandId: "hollin",
    name: "Signature Black Tea Rock Salt Macchiato",
    emoji: "🧂",
    category: "Rock Salt Macchiato",
    price: 4,
    calories: 210,
    protein: 3,
    carbs: 30,
    fat: 8,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hollin_matcha_rsm",
    brandId: "hollin",
    name: "Matcha Rock Salt Macchiato",
    emoji: "🍵",
    category: "Rock Salt Macchiato",
    price: 5,
    calories: 260,
    protein: 4,
    carbs: 34,
    fat: 9,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hollin_yakult_green_tea",
    brandId: "hollin",
    name: "Yakult Green Tea",
    emoji: "🥤",
    category: "Yakult Series",
    price: 4.7,
    calories: 150,
    protein: 1,
    carbs: 34,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_lychee_yakult",
    brandId: "hollin",
    name: "Lychee Yakult",
    emoji: "🍈",
    category: "Yakult Series",
    price: 5.4,
    calories: 180,
    protein: 1,
    carbs: 42,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_mango_green_tea",
    brandId: "hollin",
    name: "Mango Green Tea",
    emoji: "🥭",
    category: "Refreshing & Fruity",
    price: 4.2,
    calories: 150,
    protein: 0,
    carbs: 37,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_lychee_oolong_tea",
    brandId: "hollin",
    name: "Lychee Oolong Tea",
    emoji: "🍵",
    category: "Refreshing & Fruity",
    price: 3.9,
    calories: 140,
    protein: 0,
    carbs: 34,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_black_tea_latte",
    brandId: "hollin",
    name: "Signature Black Tea Latte",
    emoji: "☕",
    category: "Tea Latte",
    price: 4.1,
    calories: 190,
    protein: 4,
    carbs: 28,
    fat: 6,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_matcha_latte",
    brandId: "hollin",
    name: "Shizuoka Matcha Latte",
    emoji: "🍵",
    category: "Tea Latte",
    price: 5.1,
    calories: 260,
    protein: 5,
    carbs: 32,
    fat: 9,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hollin_dirty_brown_sugar",
    brandId: "hollin",
    name: "Dirty Brown Sugar with Pearls",
    emoji: "🍮",
    category: "Dirty Drink Series",
    price: 5.2,
    calories: 400,
    protein: 4,
    carbs: 70,
    fat: 8,
    compatibleWith: [
      "halal",
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hollin_signature_black_tea",
    brandId: "hollin",
    name: "Signature Black Tea",
    emoji: "🍵",
    category: "Refreshing Tea",
    price: 3,
    calories: 80,
    protein: 0,
    carbs: 20,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "hollin_honey_green_tea",
    brandId: "hollin",
    name: "Honey Green Tea",
    emoji: "🍵",
    category: "Refreshing Tea",
    price: 3.8,
    calories: 110,
    protein: 0,
    carbs: 27,
    fat: 0,
    compatibleWith: [
      "halal",
      "vegetarian",
      "vegan"
    ],
    confidence: "estimated"
  },
  {
    id: "four_leaves_hokkaido_dome",
    brandId: "four_leaves",
    name: "Hokkaido Dome",
    emoji: "🍞",
    category: "Buns",
    price: 2.5,
    calories: 220,
    protein: 5,
    carbs: 34,
    fat: 7,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "four_leaves_an_pan",
    brandId: "four_leaves",
    name: "An Pan (Red Bean Bun)",
    emoji: "🍞",
    category: "Buns",
    price: 2.2,
    calories: 210,
    protein: 5,
    carbs: 38,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "four_leaves_tuna_bun",
    brandId: "four_leaves",
    name: "Tuna Bun",
    emoji: "🥪",
    category: "Buns",
    price: 2.8,
    calories: 240,
    protein: 9,
    carbs: 28,
    fat: 10,
    compatibleWith: [
      "pescatarian"
    ],
    confidence: "estimated"
  },
  {
    id: "four_leaves_strawberry_shortcake",
    brandId: "four_leaves",
    name: "Strawberry Shortcake (Slice)",
    emoji: "🍰",
    category: "Cakes",
    price: 6,
    calories: 280,
    protein: 3,
    carbs: 33,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "four_leaves_mille_feuille",
    brandId: "four_leaves",
    name: "Mille Feuille",
    emoji: "🥐",
    category: "Pastries",
    price: 5.5,
    calories: 350,
    protein: 5,
    carbs: 37,
    fat: 20,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "four_leaves_garlic_cream_cheese_bread",
    brandId: "four_leaves",
    name: "Garlic Cream Cheese Bread",
    emoji: "🧄",
    category: "Bread",
    price: 2.4,
    calories: 310,
    protein: 7,
    carbs: 37,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bengawan_solo_kueh_salat",
    brandId: "bengawan_solo",
    name: "Kueh Salat",
    emoji: "🍡",
    category: "Kueh",
    price: 1.6,
    calories: 171,
    protein: 3,
    carbs: 26,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "community",
    isPopular: true
  },
  {
    id: "bengawan_solo_lapis_sagu",
    brandId: "bengawan_solo",
    name: "Lapis Sagu",
    emoji: "🍮",
    category: "Kueh",
    price: 1.5,
    calories: 40,
    protein: 0,
    carbs: 8,
    fat: 1,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bengawan_solo_ondeh_ondeh",
    brandId: "bengawan_solo",
    name: "Ondeh-Ondeh",
    emoji: "🟢",
    category: "Kueh",
    price: 0.7,
    calories: 60,
    protein: 1,
    carbs: 10,
    fat: 2,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "community"
  },
  {
    id: "bengawan_solo_kueh_kosui",
    brandId: "bengawan_solo",
    name: "Kueh Kosui",
    emoji: "🍥",
    category: "Kueh",
    price: 0.6,
    calories: 91,
    protein: 0,
    carbs: 20,
    fat: 1,
    compatibleWith: [
      "vegetarian",
      "vegan"
    ],
    confidence: "community"
  },
  {
    id: "bengawan_solo_egg_tart",
    brandId: "bengawan_solo",
    name: "Egg Tart",
    emoji: "🥧",
    category: "Tarts",
    price: 1.8,
    calories: 193,
    protein: 4,
    carbs: 18,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "community"
  },
  {
    id: "bengawan_solo_kueh_angku_mung_bean",
    brandId: "bengawan_solo",
    name: "Kueh Angku (Mung Bean)",
    emoji: "🟥",
    category: "Kueh",
    price: 1.5,
    calories: 156,
    protein: 3,
    carbs: 28,
    fat: 4,
    compatibleWith: [
      "vegetarian",
      "vegan"
    ],
    confidence: "community"
  },
  {
    id: "bengawan_solo_lemper_udang",
    brandId: "bengawan_solo",
    name: "Lemper Udang",
    emoji: "🍙",
    category: "Savoury Kueh",
    price: 1.9,
    calories: 100,
    protein: 3,
    carbs: 15,
    fat: 3,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kopikiosk_kaya_toast",
    brandId: "kopitiam_kopi_kiosk",
    name: "Kaya Toast",
    emoji: "🍞",
    category: "Toast",
    price: 1.6,
    calories: 220,
    protein: 5,
    carbs: 32,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kopikiosk_kaya_butter_toast",
    brandId: "kopitiam_kopi_kiosk",
    name: "Kaya Butter Toast",
    emoji: "🍞",
    category: "Toast",
    price: 2,
    calories: 300,
    protein: 6,
    carbs: 38,
    fat: 13,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kopikiosk_kopi",
    brandId: "kopitiam_kopi_kiosk",
    name: "Kopi",
    emoji: "☕",
    category: "Drinks",
    price: 1.5,
    calories: 130,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kopikiosk_teh",
    brandId: "kopitiam_kopi_kiosk",
    name: "Teh",
    emoji: "🍵",
    category: "Drinks",
    price: 1.5,
    calories: 140,
    protein: 2,
    carbs: 23,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kopikiosk_ice_kacang",
    brandId: "kopitiam_kopi_kiosk",
    name: "Ice Kacang",
    emoji: "🍧",
    category: "Desserts",
    price: 2.8,
    calories: 290,
    protein: 5,
    carbs: 68,
    fat: 5,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kopikiosk_kaya_butter_set_meal",
    brandId: "kopitiam_kopi_kiosk",
    name: "Kaya Butter Set Meal",
    emoji: "🍽️",
    category: "Sets",
    price: 5.2,
    calories: 560,
    protein: 20,
    carbs: 63,
    fat: 23,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "chinatownroasted_char_siew_rice",
    brandId: "kopitiam_chinatown_roasted",
    name: "Char Siew Rice",
    emoji: "🍖",
    category: "Rice",
    price: 4.5,
    calories: 660,
    protein: 30,
    carbs: 76,
    fat: 20,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "chinatownroasted_roast_duck_rice",
    brandId: "kopitiam_chinatown_roasted",
    name: "Roast Duck Rice",
    emoji: "🦆",
    category: "Rice",
    price: 6,
    calories: 688,
    protein: 36,
    carbs: 72,
    fat: 24,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "chinatownroasted_roasted_chicken_rice",
    brandId: "kopitiam_chinatown_roasted",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Rice",
    price: 5,
    calories: 650,
    protein: 36,
    carbs: 76,
    fat: 20,
    compatibleWith: [
      "lactose_free"
    ],
    confidence: "estimated"
  },
  {
    id: "beradikwestern_chicken_chop",
    brandId: "kopitiam_beradik_western",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Chicken",
    price: 6.5,
    calories: 650,
    protein: 34,
    carbs: 55,
    fat: 30,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "beradikwestern_fish_and_chips",
    brandId: "kopitiam_beradik_western",
    name: "Fish & Chips",
    emoji: "🐟",
    category: "Seafood",
    price: 6.8,
    calories: 680,
    protein: 26,
    carbs: 60,
    fat: 32,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "beradikwestern_chicken_chop_aglio_olio",
    brandId: "kopitiam_beradik_western",
    name: "Chicken Chop Aglio Olio",
    emoji: "🍝",
    category: "Pasta",
    price: 7.5,
    calories: 720,
    protein: 36,
    carbs: 70,
    fat: 28,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "beradikwestern_crispy_chicken_cutlet_rice",
    brandId: "kopitiam_beradik_western",
    name: "Crispy Chicken Cutlet With Rice",
    emoji: "🍗",
    category: "Chicken",
    price: 6,
    calories: 700,
    protein: 32,
    carbs: 75,
    fat: 26,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "beradikwestern_grilled_chicken_steak",
    brandId: "kopitiam_beradik_western",
    name: "Grilled Chicken Steak",
    emoji: "🍗",
    category: "Chicken",
    price: 7,
    calories: 480,
    protein: 42,
    carbs: 30,
    fat: 18,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "beradikwestern_chicken_bolognese",
    brandId: "kopitiam_beradik_western",
    name: "Chicken Bolognese",
    emoji: "🍝",
    category: "Pasta",
    price: 6.5,
    calories: 620,
    protein: 28,
    carbs: 78,
    fat: 18,
    compatibleWith: [
      "no_pork"
    ],
    confidence: "estimated"
  },
  {
    id: "hh_kaya_butter_toast",
    brandId: "koufu_happy_hawkers",
    name: "Kaya Butter Toast",
    emoji: "🍞",
    category: "Breakfast",
    price: 2.2,
    calories: 190,
    protein: 4,
    carbs: 26,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hh_kaya_butter_french_loaf",
    brandId: "koufu_happy_hawkers",
    name: "Kaya Butter French Loaf",
    emoji: "🥖",
    category: "Breakfast",
    price: 2,
    calories: 230,
    protein: 5,
    carbs: 32,
    fat: 9,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hh_kaya_toast_set_c",
    brandId: "koufu_happy_hawkers",
    name: "Kaya Butter Toast Set C (Toast + Eggs + Kopi)",
    emoji: "🍽️",
    category: "Breakfast",
    price: 4.6,
    calories: 430,
    protein: 15,
    carbs: 44,
    fat: 20,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hh_soft_boiled_eggs",
    brandId: "koufu_happy_hawkers",
    name: "Soft Boiled Eggs (2pc)",
    emoji: "🥚",
    category: "Breakfast",
    price: 2,
    calories: 140,
    protein: 12,
    carbs: 1,
    fat: 10,
    compatibleWith: [
      "vegetarian",
      "gluten_free"
    ],
    confidence: "estimated"
  },
  {
    id: "hh_kopi_o_hot",
    brandId: "koufu_happy_hawkers",
    name: "Kopi O (Hot)",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 70,
    protein: 0,
    carbs: 18,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "hh_kopi_hot",
    brandId: "koufu_happy_hawkers",
    name: "Kopi (Hot, with condensed milk)",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "hh_kopi_o_iced_22oz",
    brandId: "koufu_happy_hawkers",
    name: "Kopi O (Iced, 22oz)",
    emoji: "🧊",
    category: "Beverages",
    price: 2.7,
    calories: 90,
    protein: 0,
    carbs: 23,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nf_signature",
    brandId: "koufu_nine_fresh",
    name: "Nine Fresh Signature",
    emoji: "🍮",
    category: "Desserts",
    price: 3.5,
    calories: 280,
    protein: 6,
    carbs: 50,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nf_grass_jelly_special",
    brandId: "koufu_nine_fresh",
    name: "Grass Jelly Special",
    emoji: "🍧",
    category: "Desserts",
    price: 2.8,
    calories: 180,
    protein: 2,
    carbs: 40,
    fat: 1,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nf_pearly_bean_curd",
    brandId: "koufu_nine_fresh",
    name: "Pearly Bean Curd",
    emoji: "🍮",
    category: "Desserts",
    price: 3.5,
    calories: 250,
    protein: 8,
    carbs: 42,
    fat: 5,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "nf_fruity_ai_yu_jelly",
    brandId: "koufu_nine_fresh",
    name: "Fruity Ai-Yu Jelly",
    emoji: "🍧",
    category: "Desserts",
    price: 3.8,
    calories: 150,
    protein: 1,
    carbs: 36,
    fat: 0.5,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nf_black_sugar_ai_yu_jelly",
    brandId: "koufu_nine_fresh",
    name: "Black Sugar Ai-Yu Jelly",
    emoji: "🍧",
    category: "Desserts",
    price: 3.8,
    calories: 220,
    protein: 1,
    carbs: 52,
    fat: 0.5,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "nf_goodness_cup",
    brandId: "koufu_nine_fresh",
    name: "Goodness Cup (Taro Ball Signature)",
    emoji: "🍡",
    category: "Desserts",
    price: 4,
    calories: 320,
    protein: 5,
    carbs: 62,
    fat: 7,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nf_golden_cup",
    brandId: "koufu_nine_fresh",
    name: "Golden Cup (Mixed Base)",
    emoji: "🍮",
    category: "Desserts",
    price: 3.9,
    calories: 300,
    protein: 5,
    carbs: 58,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "nf_earl_grey_milk_tea",
    brandId: "koufu_nine_fresh",
    name: "Earl Grey Milk Tea",
    emoji: "🧋",
    category: "Beverages",
    price: 3.5,
    calories: 180,
    protein: 3,
    carbs: 30,
    fat: 5,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dc_you_tiao",
    brandId: "koufu_dough_culture",
    name: "You Tiao",
    emoji: "🥖",
    category: "Snacks",
    price: 1.1,
    calories: 160,
    protein: 3,
    carbs: 18,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dc_curry_puff",
    brandId: "koufu_dough_culture",
    name: "Curry Puff",
    emoji: "🥟",
    category: "Snacks",
    price: 1.5,
    calories: 180,
    protein: 4,
    carbs: 20,
    fat: 9,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "dc_samosa",
    brandId: "koufu_dough_culture",
    name: "Samosa",
    emoji: "🥟",
    category: "Snacks",
    price: 1.5,
    calories: 150,
    protein: 4,
    carbs: 16,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "dc_carrot_cake",
    brandId: "koufu_dough_culture",
    name: "Carrot Cake (Fried, piece)",
    emoji: "🍘",
    category: "Snacks",
    price: 1.1,
    calories: 120,
    protein: 2,
    carbs: 14,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dc_yam_cake",
    brandId: "koufu_dough_culture",
    name: "Yam Cake",
    emoji: "🍘",
    category: "Snacks",
    price: 1.3,
    calories: 140,
    protein: 2,
    carbs: 16,
    fat: 7,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dc_spring_roll",
    brandId: "koufu_dough_culture",
    name: "Spring Roll",
    emoji: "🥢",
    category: "Snacks",
    price: 1.4,
    calories: 130,
    protein: 3,
    carbs: 15,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "dc_sweet_potato_slice",
    brandId: "koufu_dough_culture",
    name: "Sweet Potato Slice",
    emoji: "🍠",
    category: "Snacks",
    price: 1.3,
    calories: 110,
    protein: 1,
    carbs: 18,
    fat: 4,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "dc_tau_suan",
    brandId: "koufu_dough_culture",
    name: "Tau Suan",
    emoji: "🥣",
    category: "Desserts",
    price: 2,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 4,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "rb_brown_sugar_boba_cheese_brulee",
    brandId: "koufu_rb_tea",
    name: "Brown Sugar Boba Milk with Cheese Brulee",
    emoji: "🧋",
    category: "Milk Tea",
    price: 4.9,
    calories: 420,
    protein: 6,
    carbs: 62,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "rb_brown_sugar_boba_milk",
    brandId: "koufu_rb_tea",
    name: "Brown Sugar Boba Milk",
    emoji: "🧋",
    category: "Milk Tea",
    price: 3.9,
    calories: 350,
    protein: 5,
    carbs: 55,
    fat: 14,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "rb_classic_milk_tea",
    brandId: "koufu_rb_tea",
    name: "Classic Milk Tea",
    emoji: "🧋",
    category: "Milk Tea",
    price: 2.8,
    calories: 300,
    protein: 6,
    carbs: 45,
    fat: 10,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "rb_peachy_crystal",
    brandId: "koufu_rb_tea",
    name: "Peachy Crystal",
    emoji: "🍑",
    category: "Fruit Tea",
    price: 4.3,
    calories: 200,
    protein: 1,
    carbs: 50,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "rb_ceylon_black_tea_cheese_cream",
    brandId: "koufu_rb_tea",
    name: "Ceylon Black Tea with Cheese Cream",
    emoji: "🧋",
    category: "Milk Tea",
    price: 4.5,
    calories: 320,
    protein: 6,
    carbs: 45,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "rb_roasted_oolong_milk_tea",
    brandId: "koufu_rb_tea",
    name: "Roasted Oolong Milk Tea",
    emoji: "🧋",
    category: "Milk Tea",
    price: 2.8,
    calories: 290,
    protein: 5,
    carbs: 42,
    fat: 10,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "rb_mango_yogi",
    brandId: "koufu_rb_tea",
    name: "Mango Yogi (Low Fat)",
    emoji: "🥭",
    category: "Beverages",
    price: 5.2,
    calories: 220,
    protein: 4,
    carbs: 45,
    fat: 2,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grove_lu_rou_la_mian",
    brandId: "koufu_grove",
    name: "Braised Mushroom (Lu Rou) La Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 6.8,
    calories: 480,
    protein: 16,
    carbs: 65,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "grove_herbal_la_mian",
    brandId: "koufu_grove",
    name: "Herbal La Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 7.8,
    calories: 420,
    protein: 14,
    carbs: 58,
    fat: 12,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grove_laksa_la_mian",
    brandId: "koufu_grove",
    name: "Laksa La Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 7.8,
    calories: 520,
    protein: 15,
    carbs: 62,
    fat: 22,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grove_dry_truffle_noodle",
    brandId: "koufu_grove",
    name: "Dry Truffle Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 8.8,
    calories: 460,
    protein: 13,
    carbs: 60,
    fat: 16,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "grove_dry_kung_pao_noodle",
    brandId: "koufu_grove",
    name: "Dry Kung Pao Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 6.8,
    calories: 440,
    protein: 14,
    carbs: 58,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "xcm_bak_chor_mee",
    brandId: "kopitiam_xiang_chi_mian",
    name: "Bak Chor Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 22,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "xcm_laksa",
    brandId: "kopitiam_xiang_chi_mian",
    name: "Laksa",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 550,
    protein: 20,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tt_basil_chicken_rice",
    brandId: "kopitiam_telur_thai",
    name: "Thai Basil Chicken Rice",
    emoji: "🍛",
    category: "Thai",
    price: 5.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tt_pad_thai",
    brandId: "kopitiam_telur_thai",
    name: "Pad Thai",
    emoji: "🍜",
    category: "Thai",
    price: 5.5,
    calories: 500,
    protein: 18,
    carbs: 65,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tt_tom_yum_soup",
    brandId: "kopitiam_telur_thai",
    name: "Tom Yum Soup",
    emoji: "🍲",
    category: "Thai",
    price: 6,
    calories: 280,
    protein: 20,
    carbs: 15,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fcr_roasted_chicken_rice",
    brandId: "kopitiam_fitra_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 30,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fcr_curry_chicken_noodles",
    brandId: "kopitiam_fitra_chicken_rice",
    name: "Curry Chicken Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "wb_chicken_chop",
    brandId: "kopitiam_western_boy",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 35,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "wb_chicken_aglio_olio",
    brandId: "kopitiam_western_boy",
    name: "Chicken Steak Aglio Olio",
    emoji: "🍝",
    category: "Western",
    price: 6.8,
    calories: 580,
    protein: 28,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "rr_signature_rojak",
    brandId: "kopitiam_royal_rojak",
    name: "Signature Rojak",
    emoji: "🥗",
    category: "Local Hawker",
    price: 4,
    calories: 320,
    protein: 6,
    carbs: 45,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "rr_traditional_popiah",
    brandId: "kopitiam_royal_rojak",
    name: "Traditional Popiah",
    emoji: "🌯",
    category: "Local Hawker",
    price: 3.5,
    calories: 260,
    protein: 8,
    carbs: 38,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "acp_signature_popiah",
    brandId: "kopitiam_ann_chin_popiah",
    name: "Signature Popiah",
    emoji: "🌯",
    category: "Local Hawker",
    price: 3.5,
    calories: 260,
    protein: 8,
    carbs: 38,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cc_chicken_chop",
    brandId: "kopitiam_confirm_chop",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 35,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "cc_fish_and_chips",
    brandId: "kopitiam_confirm_chop",
    name: "Fish and Chips",
    emoji: "🐟",
    category: "Western",
    price: 7,
    calories: 620,
    protein: 28,
    carbs: 60,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "jkc_bibimbap",
    brandId: "kopitiam_japanese_and_korean_cuisine",
    name: "Bibimbap",
    emoji: "🍚",
    category: "Korean",
    price: 6.5,
    calories: 550,
    protein: 20,
    carbs: 75,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jkc_kimchi_soup",
    brandId: "kopitiam_japanese_and_korean_cuisine",
    name: "Kimchi Jjigae (Kimchi Soup)",
    emoji: "🍲",
    category: "Korean",
    price: 6.8,
    calories: 380,
    protein: 22,
    carbs: 20,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "hjbm_ban_mian",
    brandId: "kopitiam_hao_jia_ban_mian",
    name: "Ban Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 480,
    protein: 20,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "nlat_nasi_lemak_ayam_taliwang",
    brandId: "kopitiam_nasi_lemak_ayam_taliwang",
    name: "Nasi Lemak Ayam Taliwang",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 5.5,
    calories: 620,
    protein: 28,
    carbs: 70,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "twpn_bcm_small",
    brandId: "tai_wah_pork_noodle",
    name: "Bak Chor Mee (Dry, Small)",
    emoji: "🍜",
    category: "Noodles",
    price: 7,
    calories: 380,
    protein: 20,
    carbs: 45,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "twpn_bcm_large",
    brandId: "tai_wah_pork_noodle",
    name: "Bak Chor Mee (Dry, Large)",
    emoji: "🍜",
    category: "Noodles",
    price: 11,
    calories: 580,
    protein: 30,
    carbs: 68,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kdb_beef_bulgogi",
    brandId: "kopitiam_kim_dae_bak",
    name: "Beef Bulgogi Rice Set",
    emoji: "🍚",
    category: "Korean",
    price: 7.5,
    calories: 600,
    protein: 30,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kdb_sundubu_jjigae",
    brandId: "kopitiam_kim_dae_bak",
    name: "Chicken Sundubu Jigae",
    emoji: "🍲",
    category: "Korean",
    price: 6.8,
    calories: 380,
    protein: 20,
    carbs: 20,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ap_ayam_penyet",
    brandId: "kopitiam_ayam_penyet",
    name: "Ayam Penyet",
    emoji: "🍗",
    category: "Indonesian/Malay",
    price: 5.5,
    calories: 580,
    protein: 30,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kgfs_sliced_fish_soup",
    brandId: "kopitiam_king_grouper_fish_soup",
    name: "Sliced Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kgfs_fried_fish_soup",
    brandId: "kopitiam_king_grouper_fish_soup",
    name: "Fried Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6.5,
    calories: 420,
    protein: 26,
    carbs: 30,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ple_pepper_rice",
    brandId: "kopitiam_pepper_lunch_express",
    name: "Beef Pepper Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 7.5,
    calories: 650,
    protein: 28,
    carbs: 70,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "wtf_grilled_fish",
    brandId: "kopitiam_what_the_fish",
    name: "Grilled Fish with Rice",
    emoji: "🐟",
    category: "Seafood",
    price: 7,
    calories: 480,
    protein: 32,
    carbs: 50,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mw_fried_kway_teow",
    brandId: "kopitiam_mini_wok",
    name: "Signature Fried Kway Teow",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mw_sambal_fried_rice",
    brandId: "kopitiam_mini_wok",
    name: "Sambal Fried Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 4.5,
    calories: 480,
    protein: 12,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "mp_peanut_pancake",
    brandId: "kopitiam_munchi_pancakes",
    name: "Peanut Pancake (Min Jiang Kueh)",
    emoji: "🥞",
    category: "Snacks",
    price: 1.8,
    calories: 220,
    protein: 5,
    carbs: 30,
    fat: 9,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sf_chilli_crab",
    brandId: "kopitiam_seafood",
    name: "Chilli Crab",
    emoji: "🦀",
    category: "Seafood",
    price: 18,
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sf_claypot_fish_head",
    brandId: "kopitiam_seafood",
    name: "Claypot Fish Head Curry",
    emoji: "🐟",
    category: "Seafood",
    price: 12,
    calories: 550,
    protein: 40,
    carbs: 30,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "rg_economic_rice",
    brandId: "kopitiam_rice_garden",
    name: "Economic Rice (3 Dishes + Rice)",
    emoji: "🍱",
    category: "Local Hawker",
    price: 4.5,
    calories: 550,
    protein: 25,
    carbs: 65,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bmfs_ban_mian_2",
    brandId: "kopitiam_ban_mian_and_fish_soup_2",
    name: "Ban Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 480,
    protein: 20,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bmfs_sliced_fish_soup_2",
    brandId: "kopitiam_ban_mian_and_fish_soup_2",
    name: "Sliced Fish Soup",
    emoji: "🍲",
    category: "Noodles",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kr_bibimbap",
    brandId: "kopitiam_korean",
    name: "Bibimbap",
    emoji: "🍚",
    category: "Korean",
    price: 6.5,
    calories: 550,
    protein: 20,
    carbs: 75,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kr_hotplate_chicken",
    brandId: "kopitiam_korean",
    name: "Hotplate Chicken",
    emoji: "🍗",
    category: "Korean",
    price: 7,
    calories: 500,
    protein: 32,
    carbs: 40,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "clyf_sliced_fish_bee_hoon",
    brandId: "kopitiam_cu_liang_yu_fen",
    name: "Signature Sliced Fish Bee Hoon",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 420,
    protein: 28,
    carbs: 45,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ykd_dumpling_noodles",
    brandId: "kopitiam_yuen_kee_dumpling",
    name: "Dumplings (10pc)",
    emoji: "🥟",
    category: "Local Hawker",
    price: 5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "aytf_yong_tau_foo",
    brandId: "kopitiam_ampang_yong_tau_foo",
    name: "Yong Tau Foo (Noodle Soup, Mixed, 8pc)",
    emoji: "🍲",
    category: "Local Hawker",
    price: 4.5,
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "qlbm_big_prawn_umee",
    brandId: "kopitiam_qiu_lian_ban_mian",
    name: "Big Prawn U-Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 6.5,
    calories: 550,
    protein: 25,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pwccf_chee_cheong_fun",
    brandId: "kopitiam_pin_wei_chee_cheong_fun",
    name: "Chee Cheong Fun",
    emoji: "🥟",
    category: "Dim Sum",
    price: 3.5,
    calories: 320,
    protein: 6,
    carbs: 55,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mhp_mala_xiang_guo",
    brandId: "kopitiam_mala_hot_pot",
    name: "Mala Xiang Guo (Dry Pot, Medium)",
    emoji: "🌶️",
    category: "Mala/Hotpot",
    price: 8,
    calories: 550,
    protein: 25,
    carbs: 35,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mnp_beef_rendang_set",
    brandId: "kopitiam_majulah_nasi_padang",
    name: "Beef Rendang Set",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 6.5,
    calories: 620,
    protein: 28,
    carbs: 65,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dl_spicy_chicken_rice",
    brandId: "kopitiam_dan_lao",
    name: "Signature Spicy Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 580,
    protein: 28,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dl_char_siew_rice",
    brandId: "kopitiam_dan_lao",
    name: "Char Siew Rice",
    emoji: "🍚",
    category: "Chicken Rice/Poultry",
    price: 5,
    calories: 550,
    protein: 25,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "amcm_handmade_fishball_noodle",
    brandId: "kopitiam_ah_ma_chi_mian",
    name: "Handmade Fishball Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 20,
    carbs: 55,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kw_chicken_chop",
    brandId: "kopitiam_western",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 35,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kw_fish_n_chips",
    brandId: "kopitiam_western",
    name: "Fish N Chips",
    emoji: "🐟",
    category: "Western",
    price: 7,
    calories: 620,
    protein: 28,
    carbs: 60,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kmp2_peanut_pancake",
    brandId: "kopitiam_munchi_pancake",
    name: "Peanut Pancake (Min Jiang Kueh)",
    emoji: "🥞",
    category: "Snacks",
    price: 1.8,
    calories: 220,
    protein: 5,
    carbs: 30,
    fat: 9,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jke_grilled_galbi",
    brandId: "kopitiam_jin_kimchi_express",
    name: "Grilled Galbi Pork Belly Set",
    emoji: "🍖",
    category: "Korean",
    price: 8.5,
    calories: 650,
    protein: 30,
    carbs: 55,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sd_fried_kway_teow",
    brandId: "kopitiam_seabay_delight",
    name: "Signature Fried Kway Teow",
    emoji: "🍜",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sd_hokkien_prawn_mee",
    brandId: "kopitiam_seabay_delight",
    name: "Hokkien Prawn Mee",
    emoji: "🍜",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 520,
    protein: 22,
    carbs: 55,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kd_kaya_toast",
    brandId: "kopitiam_dessert",
    name: "Kaya Toast",
    emoji: "🍞",
    category: "Desserts",
    price: 2.2,
    calories: 190,
    protein: 4,
    carbs: 26,
    fat: 8,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kd_ice_kacang",
    brandId: "kopitiam_dessert",
    name: "Ice Kacang",
    emoji: "🍧",
    category: "Desserts",
    price: 3.5,
    calories: 320,
    protein: 4,
    carbs: 65,
    fat: 6,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "kd_tau_suan",
    brandId: "kopitiam_dessert",
    name: "Tau Suan",
    emoji: "🥣",
    category: "Desserts",
    price: 2,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 4,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated"
  },
  {
    id: "hbm_dried_chili_la_mian",
    brandId: "kopitiam_haus_ban_mian",
    name: "Signature Dried Chili La Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 500,
    protein: 20,
    carbs: 65,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tsfs_mixed_fish_soup",
    brandId: "tai_seng_fish_soup",
    name: "Mixed Fish Soup",
    emoji: "🍲",
    category: "Fish Soup",
    price: 6.3,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tsfs_fish_head_soup",
    brandId: "tai_seng_fish_soup",
    name: "Fish Head Soup",
    emoji: "🍲",
    category: "Fish Soup",
    price: 6.3,
    calories: 350,
    protein: 30,
    carbs: 20,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "hshcr_curry_rice",
    brandId: "hill_street_hainanese_curry_rice",
    name: "Hainanese Curry Rice (Pork Chop, Braised Pork, Cabbage)",
    emoji: "🍛",
    category: "Hainanese Curry Rice",
    price: 6.5,
    calories: 650,
    protein: 30,
    carbs: 70,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hsc_kopi_o",
    brandId: "hill_street_coffee_shop",
    name: "Kopi O (Hot)",
    emoji: "☕",
    category: "Coffeeshop / Kopi",
    price: 1.6,
    calories: 70,
    protein: 0,
    carbs: 18,
    fat: 0,
    compatibleWith: [
      "vegetarian",
      "vegan",
      "dairy_free"
    ],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "hsc_kaya_toast_set",
    brandId: "hill_street_coffee_shop",
    name: "Kaya Toast Set (Toast + Eggs + Kopi)",
    emoji: "🍽️",
    category: "Coffeeshop / Kopi",
    price: 3,
    calories: 350,
    protein: 10,
    carbs: 40,
    fat: 15,
    compatibleWith: [
      "vegetarian"
    ],
    confidence: "estimated"
  },
  {
    id: "phytf_signature_ytf",
    brandId: "pangs_hakka_ytf",
    name: "Signature Hakka Yong Tau Foo (Soup)",
    emoji: "🍲",
    category: "Hakka",
    price: 6.3,
    calories: 420,
    protein: 26,
    carbs: 35,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "phytf_curry_ytf_noodles",
    brandId: "pangs_hakka_ytf",
    name: "Signature Curry Hakka Yong Tau Foo Noodles",
    emoji: "🍜",
    category: "Hakka",
    price: 6.8,
    calories: 520,
    protein: 24,
    carbs: 55,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kin_khao_yang_thai_food_basil_chicken_rice",
    brandId: "kopitiam_kin_khao_yang_thai_food",
    name: "Basil Chicken Rice",
    emoji: "🍛",
    category: "Thai",
    price: 5.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kin_khao_yang_thai_food_pad_thai",
    brandId: "kopitiam_kin_khao_yang_thai_food",
    name: "Pad Thai",
    emoji: "🍜",
    category: "Thai",
    price: 5.5,
    calories: 500,
    protein: 18,
    carbs: 65,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "wan_gui_beverages_coffee",
    brandId: "kopitiam_wan_gui_beverages",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "wan_gui_beverages_kopi",
    brandId: "kopitiam_wan_gui_beverages",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "yu_yi_teochew_fish_soup_fried_fish_soup",
    brandId: "kopitiam_yu_yi_teochew_fish_soup",
    name: "Fried Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6.5,
    calories: 420,
    protein: 26,
    carbs: 30,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yu_yi_teochew_fish_soup_seafood_soup",
    brandId: "kopitiam_yu_yi_teochew_fish_soup",
    name: "Seafood Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 7,
    calories: 320,
    protein: 26,
    carbs: 20,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tiong_fong_fatt_hainanes_roasted_chicken_rice",
    brandId: "kopitiam_tiong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tiong_fong_fatt_hainanes_steamed_chicken_rice",
    brandId: "kopitiam_tiong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Steamed Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 530,
    protein: 28,
    carbs: 63,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "su_yuan_vegetarian_suyuan_set_2_veg_meat_1_veg",
    brandId: "kopitiam_su_yuan_vegetarian",
    name: "Suyuan Set (2 Veg Meat + 1 Veg)",
    emoji: "🥗",
    category: "Local Hawker",
    price: 4,
    calories: 380,
    protein: 14,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "su_yuan_vegetarian_veg_mixed_rice",
    brandId: "kopitiam_su_yuan_vegetarian",
    name: "Veg Mixed Rice",
    emoji: "🥗",
    category: "Local Hawker",
    price: 3.8,
    calories: 400,
    protein: 12,
    carbs: 58,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "xin_kee_signature_curry__curry_chicken_cutlet_rice",
    brandId: "kopitiam_xin_kee_signature_curry_house",
    name: "Curry Chicken Cutlet Rice",
    emoji: "🍛",
    category: "Seafood",
    price: 5,
    calories: 550,
    protein: 25,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "xin_kee_signature_curry__curry_fish_cutlet_rice",
    brandId: "kopitiam_xin_kee_signature_curry_house",
    name: "Curry Fish Cutlet Rice",
    emoji: "🍛",
    category: "Seafood",
    price: 5.5,
    calories: 520,
    protein: 26,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "ping_xiang_chicken_rice_roasted_chicken_rice",
    brandId: "kopitiam_ping_xiang_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ping_xiang_chicken_rice_signature_tofu",
    brandId: "kopitiam_ping_xiang_chicken_rice",
    name: "Signature Tofu",
    emoji: "🍢",
    category: "Chicken Rice/Poultry",
    price: 3.5,
    calories: 220,
    protein: 10,
    carbs: 15,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "curry_mixed_veg_rice_curry_chicken_rice",
    brandId: "kopitiam_curry_mixed_veg_rice",
    name: "Curry Chicken Rice",
    emoji: "🍛",
    category: "Chicken Rice/Poultry",
    price: 5,
    calories: 550,
    protein: 25,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mei_xiang_prawn_noodle_l_lor_mee",
    brandId: "kopitiam_mei_xiang_prawn_noodle_lor_mee",
    name: "Lor Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 480,
    protein: 18,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "mei_xiang_prawn_noodle_l_prawn_mee",
    brandId: "kopitiam_mei_xiang_prawn_noodle_lor_mee",
    name: "Prawn Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 500,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "yong_li_coffee_station_coffee",
    brandId: "kopitiam_yong_li_coffee_station",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yong_li_coffee_station_kopi",
    brandId: "kopitiam_yong_li_coffee_station",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "shun_heng_pig_trotter_ri_pig_trotter_rice",
    brandId: "kopitiam_shun_heng_pig_trotter_rice",
    name: "Pig Trotter Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 5.5,
    calories: 580,
    protein: 25,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "shun_heng_pig_trotter_ri_pork_belly_rice",
    brandId: "kopitiam_shun_heng_pig_trotter_rice",
    name: "Pork Belly rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 5.5,
    calories: 600,
    protein: 24,
    carbs: 55,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "pontian_wanton_noodles_wanton_mee",
    brandId: "kopitiam_pontian_wanton_noodles",
    name: "Wanton Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pontian_wanton_noodles_wanton_noodle",
    brandId: "kopitiam_pontian_wanton_noodles",
    name: "Wanton Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bedok_prawn_noodle_prawn_mee",
    brandId: "kopitiam_bedok_prawn_noodle",
    name: "Prawn Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 500,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bedok_prawn_noodle_prawn_noodles",
    brandId: "kopitiam_bedok_prawn_noodle",
    name: "Prawn Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 500,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "renqi_cheng_tng",
    brandId: "kopitiam_renqi",
    name: "Cheng Tng",
    emoji: "🥣",
    category: "Desserts",
    price: 2,
    calories: 180,
    protein: 3,
    carbs: 40,
    fat: 1,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "renqi_tau_suan",
    brandId: "kopitiam_renqi",
    name: "Tau Suan",
    emoji: "🥣",
    category: "Desserts",
    price: 2,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "freshly_roast_on_site_char_siew_rice",
    brandId: "kopitiam_freshly_roast_on_site",
    name: "Char Siew Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 550,
    protein: 25,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "freshly_roast_on_site_duck_rice",
    brandId: "kopitiam_freshly_roast_on_site",
    name: "Duck Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 520,
    protein: 26,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "meeting_point_cafe_coffee",
    brandId: "kopitiam_meeting_point_cafe",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "meeting_point_cafe_kopi",
    brandId: "kopitiam_meeting_point_cafe",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bedok_chee_kuek_chwee_kueh",
    brandId: "kopitiam_bedok_chee_kuek",
    name: "Chwee Kueh",
    emoji: "🥟",
    category: "Local Hawker",
    price: 2.5,
    calories: 320,
    protein: 6,
    carbs: 45,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "happy_dessert_black_glutinous_rice",
    brandId: "kopitiam_happy_dessert",
    name: "Black Glutinous Rice",
    emoji: "🍚",
    category: "Desserts",
    price: 2.2,
    calories: 220,
    protein: 4,
    carbs: 42,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "happy_dessert_tau_suan",
    brandId: "kopitiam_happy_dessert",
    name: "Tau Suan",
    emoji: "🥣",
    category: "Desserts",
    price: 2,
    calories: 220,
    protein: 6,
    carbs: 38,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fatt_soon_kuek_peng_kueh",
    brandId: "kopitiam_fatt_soon_kuek",
    name: "Peng Kueh",
    emoji: "🥟",
    category: "Local Hawker",
    price: 1.5,
    calories: 150,
    protein: 4,
    carbs: 20,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fatt_soon_kuek_soon_kueh",
    brandId: "kopitiam_fatt_soon_kuek",
    name: "Soon Kueh",
    emoji: "🥟",
    category: "Local Hawker",
    price: 1.5,
    calories: 150,
    protein: 4,
    carbs: 20,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "yang_sen_tung_dan_abc_chicken_soup",
    brandId: "kopitiam_yang_sen_tung_dan",
    name: "ABC Chicken Soup",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 320,
    protein: 22,
    carbs: 20,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "yang_sen_tung_dan_peanut_chicken_feet_soup",
    brandId: "kopitiam_yang_sen_tung_dan",
    name: "Peanut Chicken Feet Soup",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 340,
    protein: 20,
    carbs: 25,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "new_world_mutton_soup_mutton_mixture",
    brandId: "kopitiam_new_world_mutton_soup",
    name: "Mutton Mixture",
    emoji: "🍲",
    category: "Local Hawker",
    price: 6.5,
    calories: 400,
    protein: 28,
    carbs: 15,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "new_world_mutton_soup_mutton_soup",
    brandId: "kopitiam_new_world_mutton_soup",
    name: "Mutton Soup",
    emoji: "🍲",
    category: "Local Hawker",
    price: 6,
    calories: 380,
    protein: 28,
    carbs: 15,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "poh_kee_traditional_want_wanton_mee",
    brandId: "kopitiam_poh_kee_traditional_wanton_noodle",
    name: "Wanton Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "poh_kee_traditional_want_wanton_noodle",
    brandId: "kopitiam_poh_kee_traditional_wanton_noodle",
    name: "Wanton Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "pearl_rice_porridge_fish_congee",
    brandId: "kopitiam_pearl_rice_porridge",
    name: "Fish Congee",
    emoji: "🥣",
    category: "Seafood",
    price: 4.5,
    calories: 280,
    protein: 18,
    carbs: 35,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pearl_rice_porridge_pork_congee",
    brandId: "kopitiam_pearl_rice_porridge",
    name: "Pork Congee",
    emoji: "🥣",
    category: "Seafood",
    price: 4.5,
    calories: 300,
    protein: 18,
    carbs: 38,
    fat: 7,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "shan_dong_dong_ji_la_mia_beef_noodles",
    brandId: "kopitiam_shan_dong_dong_ji_la_mian_xiao_long_bao",
    name: "Beef Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 6,
    calories: 500,
    protein: 25,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "shan_dong_dong_ji_la_mia_pork_ribs_noodles",
    brandId: "kopitiam_shan_dong_dong_ji_la_mian_xiao_long_bao",
    name: "Pork Ribs Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 6,
    calories: 520,
    protein: 24,
    carbs: 60,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "sin_food_26_spring_onion_diced_chicken_set_meal",
    brandId: "kopitiam_sin_food_26",
    name: "Spring Onion Diced Chicken Set Meal",
    emoji: "🍚",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 550,
    protein: 25,
    carbs: 55,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "sin_food_26_sweet_sour_pork_set_meal",
    brandId: "kopitiam_sin_food_26",
    name: "Sweet & Sour Pork Set Meal",
    emoji: "🍚",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 580,
    protein: 22,
    carbs: 60,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "katong_liu_kee_fried_oys_black_carrot_cake",
    brandId: "kopitiam_katong_liu_kee_fried_oyster",
    name: "Black Carrot Cake",
    emoji: "🍘",
    category: "Bakery/Dessert",
    price: 4,
    calories: 450,
    protein: 10,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "katong_liu_kee_fried_oys_fried_carrot_cake",
    brandId: "kopitiam_katong_liu_kee_fried_oyster",
    name: "Fried Carrot Cake",
    emoji: "🍘",
    category: "Bakery/Dessert",
    price: 4,
    calories: 450,
    protein: 10,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "yu_kee_duck_rice_duck_rice",
    brandId: "kopitiam_yu_kee_duck_rice",
    name: "Duck Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 520,
    protein: 26,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "he_li_economical_bee_hoo_fried_bee_hoon",
    brandId: "kopitiam_he_li_economical_bee_hoon_and_nasi_lemak",
    name: "Fried Bee Hoon",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 3.5,
    calories: 380,
    protein: 10,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "he_li_economical_bee_hoo_fried_mee",
    brandId: "kopitiam_he_li_economical_bee_hoon_and_nasi_lemak",
    name: "Fried Mee",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4,
    calories: 420,
    protein: 12,
    carbs: 58,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "xue_hua_fei_hot_and_cold_ice_kachang",
    brandId: "kopitiam_xue_hua_fei_hot_and_cold_drinks",
    name: "Ice Kachang",
    emoji: "🍧",
    category: "Local Hawker",
    price: 3.5,
    calories: 320,
    protein: 4,
    carbs: 65,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "xue_hua_fei_hot_and_cold_watermelon_fruit_cocktail",
    brandId: "kopitiam_xue_hua_fei_hot_and_cold_drinks",
    name: "Watermelon Fruit Cocktail",
    emoji: "🍉",
    category: "Local Hawker",
    price: 2,
    calories: 120,
    protein: 1,
    carbs: 28,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "long_xiang_hainanese_cur_curry_chicken_set",
    brandId: "kopitiam_long_xiang_hainanese_curry_rice",
    name: "Curry Chicken Set",
    emoji: "🍛",
    category: "Western",
    price: 5.5,
    calories: 550,
    protein: 25,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "long_xiang_hainanese_cur_pork_chop_set",
    brandId: "kopitiam_long_xiang_hainanese_curry_rice",
    name: "Pork Chop Set",
    emoji: "🍽️",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 32,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "kopi_meow_coffee",
    brandId: "kopitiam_kopi_meow",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "kopi_meow_kopi",
    brandId: "kopitiam_kopi_meow",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "yong_hua_delights_fishball_noodles",
    brandId: "kopitiam_yong_hua_delights",
    name: "Fishball Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 20,
    carbs: 55,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "feng_fried_rice_kampung_suasage_egg_fried_rice",
    brandId: "kopitiam_feng_fried_rice",
    name: "Kampung Suasage Egg Fried Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 4,
    calories: 480,
    protein: 14,
    carbs: 65,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "feng_fried_rice_plain_egg_fried_rice",
    brandId: "kopitiam_feng_fried_rice",
    name: "Plain Egg Fried Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 3.5,
    calories: 450,
    protein: 10,
    carbs: 65,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "min_hui_nasi_lemak_nasi_lemak_set",
    brandId: "kopitiam_min_hui_nasi_lemak",
    name: "Nasi Lemak Set",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 5,
    calories: 550,
    protein: 22,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "song_zhou_fried_carrot_c_black_carrot_cake",
    brandId: "kopitiam_song_zhou_fried_carrot_cake",
    name: "Black Carrot Cake",
    emoji: "🍘",
    category: "Bakery/Dessert",
    price: 4,
    calories: 450,
    protein: 10,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "song_zhou_fried_carrot_c_fried_carrot_cake",
    brandId: "kopitiam_song_zhou_fried_carrot_cake",
    name: "Fried Carrot Cake",
    emoji: "🍘",
    category: "Bakery/Dessert",
    price: 4,
    calories: 450,
    protein: 10,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "dan_shi_fu_herbal_soup_black_chicken_soup",
    brandId: "kopitiam_dan_shi_fu_herbal_soup",
    name: "Black Chicken Soup",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 6.5,
    calories: 340,
    protein: 28,
    carbs: 10,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "dan_shi_fu_herbal_soup_du_zhong_pigs_tail_soup",
    brandId: "kopitiam_dan_shi_fu_herbal_soup",
    name: "Du Zhong Pig’s Tail Soup",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 6.5,
    calories: 360,
    protein: 26,
    carbs: 12,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bedok_pau_dim_sum_bbq_pork_bun",
    brandId: "kopitiam_bedok_pau_dim_sum",
    name: "BBQ Pork Bun",
    emoji: "🥟",
    category: "Dim Sum",
    price: 1.8,
    calories: 220,
    protein: 8,
    carbs: 30,
    fat: 7,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bedok_pau_dim_sum_fun_choy",
    brandId: "kopitiam_bedok_pau_dim_sum",
    name: "Fun Choy",
    emoji: "🥬",
    category: "Dim Sum",
    price: 4,
    calories: 280,
    protein: 10,
    carbs: 35,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "pin_wei_dessert_cheng_teng",
    brandId: "kopitiam_pin_wei_dessert",
    name: "Cheng Teng",
    emoji: "🥣",
    category: "Bakery/Dessert",
    price: 2,
    calories: 180,
    protein: 3,
    carbs: 40,
    fat: 1,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pin_wei_dessert_ice_kachang",
    brandId: "kopitiam_pin_wei_dessert",
    name: "Ice Kachang",
    emoji: "🍧",
    category: "Local Hawker",
    price: 3.5,
    calories: 320,
    protein: 4,
    carbs: 65,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "g_meal_spring_chicken_w_fries_rice",
    brandId: "kopitiam_g_meal",
    name: "Spring Chicken w Fries / Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 6.5,
    calories: 600,
    protein: 35,
    carbs: 50,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "quan_wei_hor_fun",
    brandId: "kopitiam_quan_wei",
    name: "Hor Fun",
    emoji: "🍜",
    category: "Local Hawker",
    price: 5,
    calories: 500,
    protein: 18,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "teochew_fish_porridge_da_fried_fish_soup",
    brandId: "kopitiam_teochew_fish_porridge_da_pai_dang",
    name: "Fried Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6.5,
    calories: 420,
    protein: 26,
    carbs: 30,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "teochew_fish_porridge_da_sliced_fish_soup",
    brandId: "kopitiam_teochew_fish_porridge_da_pai_dang",
    name: "Sliced Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "quan_ji_teochew_mee_fishball_noodles",
    brandId: "kopitiam_quan_ji_teochew_mee",
    name: "Fishball Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 20,
    carbs: 55,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "wah_kee_coffee_shop_coffee",
    brandId: "kopitiam_wah_kee_coffee_shop",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "wah_kee_coffee_shop_kopi",
    brandId: "kopitiam_wah_kee_coffee_shop",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "zhong_xin_ban_mian_ban_mian",
    brandId: "kopitiam_zhong_xin_ban_mian",
    name: "Ban Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 480,
    protein: 20,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "zhong_xin_ban_mian_mee_hoon_kueh",
    brandId: "kopitiam_zhong_xin_ban_mian",
    name: "Mee Hoon Kueh",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 470,
    protein: 19,
    carbs: 58,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "jimmy_people_s_park_frie_char_kway_teow",
    brandId: "kopitiam_jimmy_people_s_park_fried_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jimmy_people_s_park_frie_fried_kway_teow",
    brandId: "kopitiam_jimmy_people_s_park_fried_kway_teow",
    name: "Fried Kway Teow",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bai_nian_yong_tau_foo_chicken_wing_set",
    brandId: "kopitiam_bai_nian_yong_tau_foo",
    name: "Chicken Wing Set",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 5.5,
    calories: 500,
    protein: 25,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bai_nian_yong_tau_foo_yong_tau_foo",
    brandId: "kopitiam_bai_nian_yong_tau_foo",
    name: "Yong Tau Foo",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "zai_vegetarian_food_cai_fan",
    brandId: "kopitiam_zai_vegetarian_food",
    name: "Cai Fan",
    emoji: "🍱",
    category: "Local Hawker",
    price: 4.5,
    calories: 500,
    protein: 22,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "zai_vegetarian_food_econ_rice",
    brandId: "kopitiam_zai_vegetarian_food",
    name: "Econ Rice",
    emoji: "🍱",
    category: "Local Hawker",
    price: 4.5,
    calories: 500,
    protein: 22,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "gim_chew_fried_hokkien_n_fried_hokkien_mee",
    brandId: "kopitiam_gim_chew_fried_hokkien_noodle",
    name: "Fried Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 550,
    protein: 20,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ma_la_xiang_guo_chongqing_grilled_fish",
    brandId: "kopitiam_ma_la_xiang_guo",
    name: "Chongqing Grilled Fish",
    emoji: "🐟",
    category: "Seafood",
    price: 15,
    calories: 550,
    protein: 40,
    carbs: 25,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tea_cafe_kaya_butter_toast",
    brandId: "kopitiam_tea_cafe",
    name: "Kaya Butter Toast",
    emoji: "🍞",
    category: "Coffeeshop Fare",
    price: 2.2,
    calories: 190,
    protein: 4,
    carbs: 26,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tea_cafe_kaya_toast",
    brandId: "kopitiam_tea_cafe",
    name: "Kaya Toast",
    emoji: "🍞",
    category: "Coffeeshop Fare",
    price: 2.2,
    calories: 190,
    protein: 4,
    carbs: 26,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "shun_xing_braised_duck_r_duck_rice",
    brandId: "kopitiam_shun_xing_braised_duck_rice_noodle_kway_chap",
    name: "Duck Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 520,
    protein: 26,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "shun_xing_braised_duck_r_kway_chap",
    brandId: "kopitiam_shun_xing_braised_duck_rice_noodle_kway_chap",
    name: "Kway Chap",
    emoji: "🍲",
    category: "Chinese Roast",
    price: 5.5,
    calories: 500,
    protein: 25,
    carbs: 45,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lao_jie_spinach_soup_spinach_seafood_soup",
    brandId: "kopitiam_lao_jie_spinach_soup",
    name: "Spinach Seafood Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 280,
    protein: 25,
    carbs: 15,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jit_sing_satay_satay",
    brandId: "kopitiam_jit_sing_satay",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ali_shan_cai_fan",
    brandId: "kopitiam_ali_shan",
    name: "Cai Fan",
    emoji: "🍱",
    category: "Local Hawker",
    price: 4.5,
    calories: 500,
    protein: 22,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "ali_shan_econ_rice",
    brandId: "kopitiam_ali_shan",
    name: "Econ Rice",
    emoji: "🍱",
    category: "Local Hawker",
    price: 4.5,
    calories: 500,
    protein: 22,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "guan_heng_cafe_sugar_cane_juice",
    brandId: "kopitiam_guan_heng_cafe",
    name: "Sugar Cane Juice",
    emoji: "🥤",
    category: "Coffeeshop Fare",
    price: 2,
    calories: 180,
    protein: 0,
    carbs: 45,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bedok_western_food_chicken_chop",
    brandId: "kopitiam_bedok_western_food",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 35,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bedok_western_food_pork_chop",
    brandId: "kopitiam_bedok_western_food",
    name: "Pork Chop",
    emoji: "🍽️",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 32,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "fu_cheng_homemade_spring_rojak",
    brandId: "kopitiam_fu_cheng_homemade_spring_roll",
    name: "Rojak",
    emoji: "🥗",
    category: "Local Hawker",
    price: 4,
    calories: 320,
    protein: 6,
    carbs: 45,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fu_cheng_homemade_spring_spring_roll",
    brandId: "kopitiam_fu_cheng_homemade_spring_roll",
    name: "Spring Roll",
    emoji: "🥢",
    category: "Local Hawker",
    price: 1.4,
    calories: 130,
    protein: 3,
    carbs: 15,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "hock_hai_hong_lim_curry__curry_chicken_noodles",
    brandId: "kopitiam_hock_hai_hong_lim_curry_chicken_noodle",
    name: "Curry Chicken Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "fruits_and_juice_bedok_fruit_juice",
    brandId: "kopitiam_fruits_and_juice_bedok",
    name: "Fruit juice",
    emoji: "🥤",
    category: "Local Hawker",
    price: 2.5,
    calories: 150,
    protein: 1,
    carbs: 35,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lee_kee_banana_fritter",
    brandId: "kopitiam_lee_kee",
    name: "Banana Fritter",
    emoji: "🍌",
    category: "Local Hawker",
    price: 1.5,
    calories: 180,
    protein: 2,
    carbs: 28,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lee_kee_sweet_potato",
    brandId: "kopitiam_lee_kee",
    name: "Sweet Potato",
    emoji: "🍠",
    category: "Local Hawker",
    price: 1.3,
    calories: 110,
    protein: 1,
    carbs: 18,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "99_dessert_in_cup_coffee",
    brandId: "kopitiam_99_dessert_in_cup",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "99_dessert_in_cup_kopi",
    brandId: "kopitiam_99_dessert_in_cup",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "alsalam_teh_tarik_corner_coffee",
    brandId: "kopitiam_alsalam_teh_tarik_corner",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "alsalam_teh_tarik_corner_kopi",
    brandId: "kopitiam_alsalam_teh_tarik_corner",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "inspirasi_mee_rebus",
    brandId: "kopitiam_inspirasi",
    name: "Mee Rebus",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 450,
    protein: 18,
    carbs: 55,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "inspirasi_mee_soto",
    brandId: "kopitiam_inspirasi",
    name: "Mee Soto",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 420,
    protein: 20,
    carbs: 50,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "g_k_murthy_coffee",
    brandId: "kopitiam_g_k_murthy",
    name: "Coffee",
    emoji: "☕",
    category: "Beverages",
    price: 1.8,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "g_k_murthy_kopi",
    brandId: "kopitiam_g_k_murthy",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "jefri_nasi_ayam",
    brandId: "kopitiam_jefri",
    name: "Nasi Ayam",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 5,
    calories: 550,
    protein: 25,
    carbs: 65,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "jefri_nasi_goreng_ayam",
    brandId: "kopitiam_jefri",
    name: "Nasi Goreng Ayam",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 5.5,
    calories: 580,
    protein: 25,
    carbs: 68,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "wak_din_mee_hoon_soto",
    brandId: "kopitiam_wak_din",
    name: "Mee Hoon Soto",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 420,
    protein: 20,
    carbs: 50,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "wak_din_mee_soto",
    brandId: "kopitiam_wak_din",
    name: "Mee Soto",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 420,
    protein: 20,
    carbs: 50,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "merah_delimah_stall_ayam_masak_merah",
    brandId: "kopitiam_merah_delimah_stall",
    name: "Ayam Masak Merah",
    emoji: "🍗",
    category: "Indonesian/Malay",
    price: 5.5,
    calories: 520,
    protein: 28,
    carbs: 45,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "salam_indian_muslim_food_chicken_bryani",
    brandId: "kopitiam_salam_indian_muslim_food_corner",
    name: "Chicken Bryani",
    emoji: "🍛",
    category: "Indian",
    price: 5.5,
    calories: 600,
    protein: 25,
    carbs: 75,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "salam_indian_muslim_food_egg_prata",
    brandId: "kopitiam_salam_indian_muslim_food_corner",
    name: "Egg Prata",
    emoji: "🫓",
    category: "Indian",
    price: 2,
    calories: 270,
    protein: 9,
    carbs: 32,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "tong_fong_fatt_hainanese_chicken_rice",
    brandId: "kopitiam_tong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "tong_fong_fatt_hainanese_roasted_chicken_rice",
    brandId: "kopitiam_tong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "steven_fried_rice_kampung_suasage_egg_fried_rice",
    brandId: "kopitiam_steven_fried_rice",
    name: "Kampung Suasage Egg Fried Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 4,
    calories: 480,
    protein: 14,
    carbs: 65,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "steven_fried_rice_plain_egg_fried_rice",
    brandId: "kopitiam_steven_fried_rice",
    name: "Plain Egg Fried Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 3.5,
    calories: 450,
    protein: 10,
    carbs: 65,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "foo_hing_laksa_yong_tau__yong_tau_foo",
    brandId: "kopitiam_foo_hing_laksa_yong_tau_foo",
    name: "Yong Tau Foo",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "zhao_zhou_fish_porridge__sliced_fish_soup",
    brandId: "kopitiam_zhao_zhou_fish_porridge_daipadang",
    name: "Sliced Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "zhao_zhou_fish_porridge__teochew_sliced_fish_porridge",
    brandId: "kopitiam_zhao_zhou_fish_porridge_daipadang",
    name: "Teochew Sliced Fish Porridge",
    emoji: "🥣",
    category: "Seafood",
    price: 5,
    calories: 300,
    protein: 20,
    carbs: 32,
    fat: 7,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bedok_chwee_kuek_chwee_kueh",
    brandId: "kopitiam_bedok_chwee_kuek",
    name: "Chwee Kueh",
    emoji: "🥟",
    category: "Local Hawker",
    price: 2.5,
    calories: 320,
    protein: 6,
    carbs: 45,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_flint_specialty_grill_chicken_chop",
    brandId: "kopitiam_flint_specialty_grill",
    name: "Chicken Chop",
    emoji: "🍗",
    category: "Western",
    price: 6.5,
    calories: 650,
    protein: 35,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_flint_specialty_grill_grilled_chicken_chop_with_brown_sauce",
    brandId: "kopitiam_flint_specialty_grill",
    name: "Grilled Chicken Chop with Brown Sauce",
    emoji: "🍗",
    category: "Western",
    price: 7,
    calories: 650,
    protein: 35,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_kallang_airport_wanton_noo_wanton_mee",
    brandId: "kopitiam_kallang_airport_wanton_noodle",
    name: "Wanton Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_kallang_airport_wanton_noo_wanton_noodle",
    brandId: "kopitiam_kallang_airport_wanton_noodle",
    name: "Wanton Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_mexican_and_chinese_cuisin_japanese_taco",
    brandId: "kopitiam_mexican_and_chinese_cuisine",
    name: "Japanese Taco",
    emoji: "🌮",
    category: "Japanese",
    price: 5,
    calories: 320,
    protein: 14,
    carbs: 30,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_mexican_and_chinese_cuisin_singapore_taco",
    brandId: "kopitiam_mexican_and_chinese_cuisine",
    name: "Singapore Taco",
    emoji: "🌮",
    category: "Japanese",
    price: 5,
    calories: 340,
    protein: 15,
    carbs: 32,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_259_prawn_noodle_fried_carrot_cake",
    brandId: "kopitiam_259_prawn_noodle",
    name: "Fried Carrot Cake",
    emoji: "🍘",
    category: "Bakery/Dessert",
    price: 4,
    calories: 450,
    protein: 10,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_259_prawn_noodle_fried_hokkien_mee",
    brandId: "kopitiam_259_prawn_noodle",
    name: "Fried Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 550,
    protein: 20,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_delhi_express_indian_cuisi_butter_chicken",
    brandId: "kopitiam_delhi_express_indian_cuisine",
    name: "Butter Chicken",
    emoji: "🍛",
    category: "Indian",
    price: 7,
    calories: 550,
    protein: 28,
    carbs: 35,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_delhi_express_indian_cuisi_naan",
    brandId: "kopitiam_delhi_express_indian_cuisine",
    name: "Naan",
    emoji: "🫓",
    category: "Indian",
    price: 2,
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 7,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_sing_hk_braised_pork_belly_noodle",
    brandId: "kopitiam_sing_hk",
    name: "Braised Pork Belly Noodle",
    emoji: "🍜",
    category: "Western",
    price: 6,
    calories: 580,
    protein: 24,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_sing_hk_signature_scramble_egg_with_pork_chop_rice",
    brandId: "kopitiam_sing_hk",
    name: "Signature Scramble Egg with Pork Chop Rice",
    emoji: "🍚",
    category: "Western",
    price: 6.5,
    calories: 620,
    protein: 28,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_qiu_lian_ban_mee_ban_mian",
    brandId: "kopitiam_qiu_lian_ban_mee",
    name: "Ban Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 480,
    protein: 20,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_qiu_lian_ban_mee_big_prawn_u_mee",
    brandId: "kopitiam_qiu_lian_ban_mee",
    name: "Big Prawn U-Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 6.5,
    calories: 550,
    protein: 25,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_thunder_tea_rice_green_tea_rice",
    brandId: "kopitiam_thunder_tea_rice",
    name: "Green Tea Rice",
    emoji: "🍵",
    category: "Local Hawker",
    price: 4.5,
    calories: 380,
    protein: 10,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_thunder_tea_rice_thunder_tea_rice",
    brandId: "kopitiam_thunder_tea_rice",
    name: "Thunder Tea Rice",
    emoji: "🍵",
    category: "Local Hawker",
    price: 4.5,
    calories: 400,
    protein: 12,
    carbs: 55,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_golden_shoe_hokkien_mee_fried_hokkien_mee",
    brandId: "kopitiam_golden_shoe_hokkien_mee",
    name: "Fried Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 550,
    protein: 20,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_golden_shoe_hokkien_mee_fried_kway_tiao",
    brandId: "kopitiam_golden_shoe_hokkien_mee",
    name: "Fried Kway Tiao",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_butter_and_cream_berries_muffin",
    brandId: "kopitiam_butter_and_cream",
    name: "Berries Muffin",
    emoji: "🧁",
    category: "Bakery/Dessert",
    price: 3.5,
    calories: 320,
    protein: 5,
    carbs: 45,
    fat: 13,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_butter_and_cream_blueberry_muffin",
    brandId: "kopitiam_butter_and_cream",
    name: "Blueberry Muffin",
    emoji: "🧁",
    category: "Bakery/Dessert",
    price: 3.5,
    calories: 320,
    protein: 5,
    carbs: 45,
    fat: 13,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_fu_xiao_fish_soup_double_fish_soup",
    brandId: "kopitiam_fu_xiao_fish_soup",
    name: "Double Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 7.5,
    calories: 400,
    protein: 32,
    carbs: 25,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_fu_xiao_fish_soup_fish_soup",
    brandId: "kopitiam_fu_xiao_fish_soup",
    name: "Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_ming_yen_halal_chicken_ric_roasted_chicken_rice",
    brandId: "kopitiam_ming_yen_halal_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_ming_yen_halal_chicken_ric_steamed_chicken_rice",
    brandId: "kopitiam_ming_yen_halal_chicken_rice",
    name: "Steamed Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 530,
    protein: 28,
    carbs: 63,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_fragrance_chicken_rice_roasted_chicken_rice",
    brandId: "kopitiam_fragrance_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_fragrance_chicken_rice_steamed_chicken_rice",
    brandId: "kopitiam_fragrance_chicken_rice",
    name: "Steamed Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 530,
    protein: 28,
    carbs: 63,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_biryani_point_nasi_briyani",
    brandId: "kopitiam_biryani_point",
    name: "Nasi Briyani",
    emoji: "🍛",
    category: "Indian",
    price: 5.5,
    calories: 600,
    protein: 25,
    carbs: 75,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_city_satay_pork_belly",
    brandId: "kopitiam_city_satay",
    name: "Pork Belly",
    emoji: "🥓",
    category: "Local Hawker",
    price: 6,
    calories: 450,
    protein: 22,
    carbs: 10,
    fat: 38,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_city_satay_pork_satay",
    brandId: "kopitiam_city_satay",
    name: "Pork Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 28,
    carbs: 20,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_dim_sum_and_bak_kwa_bak_kwa_bao",
    brandId: "kopitiam_dim_sum_and_bak_kwa",
    name: "Bak Kwa Bao",
    emoji: "🥟",
    category: "Dim Sum",
    price: 2.5,
    calories: 250,
    protein: 10,
    carbs: 32,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_dim_sum_and_bak_kwa_har_gao_prawn_dumpling",
    brandId: "kopitiam_dim_sum_and_bak_kwa",
    name: "Har Gao Prawn Dumpling",
    emoji: "🥟",
    category: "Dim Sum",
    price: 4,
    calories: 180,
    protein: 10,
    carbs: 18,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_indian_and_chinese_vegetar_olive_fried_rice",
    brandId: "kopitiam_indian_and_chinese_vegetarian",
    name: "Olive Fried Rice",
    emoji: "🍚",
    category: "Indian",
    price: 4.5,
    calories: 480,
    protein: 10,
    carbs: 65,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_indian_and_chinese_vegetar_vegetarian_biryani",
    brandId: "kopitiam_indian_and_chinese_vegetarian",
    name: "Vegetarian Biryani",
    emoji: "🍛",
    category: "Indian",
    price: 5.5,
    calories: 550,
    protein: 14,
    carbs: 85,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_best_satay_satay",
    brandId: "kopitiam_best_satay",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_china_cuisine_beef_noodles",
    brandId: "kopitiam_china_cuisine",
    name: "Beef Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 6,
    calories: 500,
    protein: 25,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_china_cuisine_fried_sliced_pork",
    brandId: "kopitiam_china_cuisine",
    name: "Fried Sliced Pork",
    emoji: "🍖",
    category: "Noodles",
    price: 6,
    calories: 480,
    protein: 22,
    carbs: 30,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_archipelago_beer",
    brandId: "kopitiam_archipelago",
    name: "Beer",
    emoji: "🍺",
    category: "Local Hawker",
    price: 8,
    calories: 150,
    protein: 1,
    carbs: 12,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_archipelago_cold_beverages",
    brandId: "kopitiam_archipelago",
    name: "Cold Beverages",
    emoji: "🥤",
    category: "Local Hawker",
    price: 2.5,
    calories: 150,
    protein: 0,
    carbs: 38,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_spinach_soup_grilled_tiger_prawn",
    brandId: "kopitiam_spinach_soup",
    name: "Grilled Tiger Prawn",
    emoji: "🦐",
    category: "Seafood",
    price: 9,
    calories: 220,
    protein: 28,
    carbs: 4,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_spinach_soup_spinach_seafood_soup",
    brandId: "kopitiam_spinach_soup",
    name: "Spinach Seafood Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 280,
    protein: 25,
    carbs: 15,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_hong_kong_street_black_pepper_crab",
    brandId: "kopitiam_hong_kong_street",
    name: "Black Pepper Crab",
    emoji: "🦀",
    category: "Seafood",
    price: 25,
    calories: 500,
    protein: 38,
    carbs: 20,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_hong_kong_street_chilli_crab",
    brandId: "kopitiam_hong_kong_street",
    name: "Chilli Crab",
    emoji: "🦀",
    category: "Seafood",
    price: 25,
    calories: 480,
    protein: 36,
    carbs: 32,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_warong_pak_sapari_mee_rebus",
    brandId: "kopitiam_warong_pak_sapari",
    name: "Mee Rebus",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 450,
    protein: 18,
    carbs: 55,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_warong_pak_sapari_mee_soto",
    brandId: "kopitiam_warong_pak_sapari",
    name: "Mee Soto",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 420,
    protein: 20,
    carbs: 50,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_partea_express_amber_pearl_milk_tea",
    brandId: "kopitiam_partea_express",
    name: "Amber Pearl Milk Tea",
    emoji: "🧋",
    category: "Local Hawker",
    price: 3.9,
    calories: 350,
    protein: 5,
    carbs: 55,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_partea_express_mango_green_tea",
    brandId: "kopitiam_partea_express",
    name: "Mango Green Tea",
    emoji: "🥭",
    category: "Local Hawker",
    price: 3.8,
    calories: 200,
    protein: 1,
    carbs: 50,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_shanghai_fried_xiao_long_b_sheng_jian_bao",
    brandId: "kopitiam_shanghai_fried_xiao_long_bao",
    name: "Sheng Jian Bao",
    emoji: "🥟",
    category: "Bakery/Dessert",
    price: 4.5,
    calories: 320,
    protein: 10,
    carbs: 38,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_shanghai_fried_xiao_long_b_xiao_long_bao",
    brandId: "kopitiam_shanghai_fried_xiao_long_bao",
    name: "Xiao Long Bao",
    emoji: "🥟",
    category: "Bakery/Dessert",
    price: 5,
    calories: 300,
    protein: 12,
    carbs: 32,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_ming_yen_bbq_seafood_black_pepper_crab",
    brandId: "kopitiam_ming_yen_bbq_seafood",
    name: "Black Pepper Crab",
    emoji: "🦀",
    category: "Seafood",
    price: 25,
    calories: 500,
    protein: 38,
    carbs: 20,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_ming_yen_bbq_seafood_chilli_crab",
    brandId: "kopitiam_ming_yen_bbq_seafood",
    name: "Chilli Crab",
    emoji: "🦀",
    category: "Seafood",
    price: 25,
    calories: 480,
    protein: 36,
    carbs: 32,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_bbq_chicken_wings_fried_spring_chicken",
    brandId: "kopitiam_bbq_chicken_wings",
    name: "Fried Spring Chicken",
    emoji: "🍗",
    category: "Seafood",
    price: 7,
    calories: 550,
    protein: 32,
    carbs: 35,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_bbq_chicken_wings_seafood_platter",
    brandId: "kopitiam_bbq_chicken_wings",
    name: "Seafood Platter",
    emoji: "🍤",
    category: "Seafood",
    price: 15,
    calories: 480,
    protein: 38,
    carbs: 25,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_captain_satay_satay",
    brandId: "kopitiam_captain_satay",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_beer_and_drinks_beer",
    brandId: "kopitiam_beer_and_drinks",
    name: "Beer",
    emoji: "🍺",
    category: "Local Hawker",
    price: 8,
    calories: 150,
    protein: 1,
    carbs: 12,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_beer_and_drinks_cold_beverages",
    brandId: "kopitiam_beer_and_drinks",
    name: "Cold Beverages",
    emoji: "🥤",
    category: "Local Hawker",
    price: 2.5,
    calories: 150,
    protein: 0,
    carbs: 38,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_power_satay_satay",
    brandId: "kopitiam_power_satay",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_teh_tarik_sugarcane",
    brandId: "kopitiam_teh_tarik",
    name: "Sugarcane",
    emoji: "🥤",
    category: "Local Hawker",
    price: 2,
    calories: 180,
    protein: 0,
    carbs: 45,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_teh_tarik_teh_tarik",
    brandId: "kopitiam_teh_tarik",
    name: "Teh Tarik",
    emoji: "🍵",
    category: "Coffeeshop Fare",
    price: 1.8,
    calories: 150,
    protein: 2,
    carbs: 30,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_geylang_serai_satay_satay",
    brandId: "kopitiam_geylang_serai_satay",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_satay_14_satay",
    brandId: "kopitiam_satay_14",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_satay_19_satay",
    brandId: "kopitiam_satay_19",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_xi_xiang_taste_of_hunan_fried_pork_intestines_with_pickled_cabbage",
    brandId: "kopitiam_xi_xiang_taste_of_hunan",
    name: "Fried Pork Intestines with Pickled Cabbage",
    emoji: "🥘",
    category: "Local Hawker",
    price: 7,
    calories: 420,
    protein: 25,
    carbs: 15,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_xi_xiang_taste_of_hunan_stir_fried_pork_with_chillies",
    brandId: "kopitiam_xi_xiang_taste_of_hunan",
    name: "Stir-Fried Pork with Chillies",
    emoji: "🥘",
    category: "Local Hawker",
    price: 7,
    calories: 450,
    protein: 28,
    carbs: 20,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_monster_western_chicken_steak_aglio_olio",
    brandId: "kopitiam_monster_western",
    name: "Chicken Steak Aglio Olio",
    emoji: "🍝",
    category: "Western",
    price: 6.8,
    calories: 580,
    protein: 28,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_monster_western_western_food",
    brandId: "kopitiam_monster_western",
    name: "Western Food",
    emoji: "🍽️",
    category: "Western",
    price: 6.5,
    calories: 600,
    protein: 28,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_nasi_campur_1_meat_2_veg",
    brandId: "kopitiam_nasi_campur",
    name: "1 Meat + 2 Veg",
    emoji: "🍱",
    category: "Indonesian/Malay",
    price: 4.5,
    calories: 480,
    protein: 20,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_nasi_campur_ayam_lemak_chilli_padi_set",
    brandId: "kopitiam_nasi_campur",
    name: "Ayam Lemak Chilli Padi Set",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 6,
    calories: 550,
    protein: 26,
    carbs: 55,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_chef_lup_roasted_delight_char_siew",
    brandId: "kopitiam_chef_lup_roasted_delight",
    name: "Char Siew",
    emoji: "🍖",
    category: "Chinese Roast",
    price: 5,
    calories: 400,
    protein: 24,
    carbs: 25,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_chef_lup_roasted_delight_roast_duck",
    brandId: "kopitiam_chef_lup_roasted_delight",
    name: "Roast Duck",
    emoji: "🦆",
    category: "Chinese Roast",
    price: 6,
    calories: 480,
    protein: 30,
    carbs: 30,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_moon_chay_signature_vegan_bbq_pork_patties",
    brandId: "kopitiam_moon_chay",
    name: "Signature Vegan BBQ Pork & Patties",
    emoji: "🌱",
    category: "Local Hawker",
    price: 6.5,
    calories: 420,
    protein: 20,
    carbs: 35,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_moon_chay_vegan_bun_bo_hu",
    brandId: "kopitiam_moon_chay",
    name: "Vegan Bun Bo Hu",
    emoji: "🍜",
    category: "Local Hawker",
    price: 6.5,
    calories: 450,
    protein: 16,
    carbs: 58,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_turkish_lezzet_doner_roll",
    brandId: "kopitiam_turkish_lezzet",
    name: "Doner Roll",
    emoji: "🌯",
    category: "Local Hawker",
    price: 6,
    calories: 480,
    protein: 25,
    carbs: 45,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_turkish_lezzet_iskender",
    brandId: "kopitiam_turkish_lezzet",
    name: "Iskender",
    emoji: "🍽️",
    category: "Local Hawker",
    price: 9,
    calories: 600,
    protein: 32,
    carbs: 40,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_gerry_express_fried_fish",
    brandId: "kopitiam_gerry_express",
    name: "Fried Fish",
    emoji: "🐟",
    category: "Seafood",
    price: 6.5,
    calories: 450,
    protein: 28,
    carbs: 30,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_gold_xiang_curry_puff_curry_puff",
    brandId: "kopitiam_gold_xiang_curry_puff",
    name: "Curry Puff",
    emoji: "🥟",
    category: "Bakery/Dessert",
    price: 1.5,
    calories: 180,
    protein: 4,
    carbs: 20,
    fat: 9,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_warisan_satay_barbecue_prawn",
    brandId: "kopitiam_warisan_satay",
    name: "Barbecue Prawn",
    emoji: "🦐",
    category: "Local Hawker",
    price: 8,
    calories: 220,
    protein: 26,
    carbs: 6,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_warisan_satay_barbecue_squid",
    brandId: "kopitiam_warisan_satay",
    name: "Barbecue Squid",
    emoji: "🦑",
    category: "Local Hawker",
    price: 8,
    calories: 240,
    protein: 28,
    carbs: 8,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_heyya_braised_duck_and_kwa_duck_rice",
    brandId: "kopitiam_heyya_braised_duck_and_kway_chap",
    name: "Duck Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 520,
    protein: 26,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_heyya_braised_duck_and_kwa_duck_set_kway_chap",
    brandId: "kopitiam_heyya_braised_duck_and_kway_chap",
    name: "Duck Set Kway Chap",
    emoji: "🍲",
    category: "Chinese Roast",
    price: 6,
    calories: 520,
    protein: 26,
    carbs: 45,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_nj_indian_classic_cuisine_nasi_briyani",
    brandId: "kopitiam_nj_indian_classic_cuisine",
    name: "Nasi Briyani",
    emoji: "🍛",
    category: "Indian",
    price: 5.5,
    calories: 600,
    protein: 25,
    carbs: 75,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_king_dae_bak_korean_cuisin_beef_bulgogi",
    brandId: "kopitiam_king_dae_bak_korean_cuisine",
    name: "Beef Bulgogi",
    emoji: "🥩",
    category: "Korean",
    price: 7.5,
    calories: 580,
    protein: 30,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_butter_and_cream_bakery_gochujang_burger",
    brandId: "kopitiam_butter_and_cream_bakery",
    name: "Gochujang Burger",
    emoji: "🍔",
    category: "Korean",
    price: 7,
    calories: 600,
    protein: 26,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_butter_and_cream_bakery_mentaiko_ribeye_rice_bowl",
    brandId: "kopitiam_butter_and_cream_bakery",
    name: "Mentaiko Ribeye Rice Bowl",
    emoji: "🍚",
    category: "Korean",
    price: 8.5,
    calories: 620,
    protein: 30,
    carbs: 60,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_satay_one_satay",
    brandId: "kopitiam_satay_one",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_nana_currry_curry",
    brandId: "kopitiam_nana_currry",
    name: "Curry",
    emoji: "🍛",
    category: "Local Hawker",
    price: 5,
    calories: 480,
    protein: 20,
    carbs: 45,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_lao_fu_zi_fried_kway_teow_black_char_kway_teow",
    brandId: "kopitiam_lao_fu_zi_fried_kway_teow",
    name: "Black Char Kway Teow",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_lao_fu_zi_fried_kway_teow_white_char_kway_teow",
    brandId: "kopitiam_lao_fu_zi_fried_kway_teow",
    name: "White Char Kway Teow",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 500,
    protein: 14,
    carbs: 62,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_delhi_kitchen_indian_veget_shreebhaavan_special_meals",
    brandId: "kopitiam_delhi_kitchen_indian_vegetarian_cuisine",
    name: "Shreebhaavan Special Meals",
    emoji: "🍛",
    category: "Indian",
    price: 6,
    calories: 600,
    protein: 18,
    carbs: 85,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_delhi_kitchen_indian_veget_vegetarian_biryani",
    brandId: "kopitiam_delhi_kitchen_indian_vegetarian_cuisine",
    name: "Vegetarian Biryani",
    emoji: "🍛",
    category: "Indian",
    price: 5.5,
    calories: 550,
    protein: 14,
    carbs: 85,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_putian_heng_hwa_cuisine_heng_hwa_fried_bee_hoon",
    brandId: "kopitiam_putian_heng_hwa_cuisine",
    name: "Heng Hwa Fried Bee Hoon",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 14,
    carbs: 55,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_putian_heng_hwa_cuisine_pu_tian_lo_mee",
    brandId: "kopitiam_putian_heng_hwa_cuisine",
    name: "Pu Tian Lo Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 480,
    protein: 16,
    carbs: 60,
    fat: 17,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_ampang_yong_tau_foo_and_od_beef_noodle",
    brandId: "kopitiam_ampang_yong_tau_foo_and_odeon_beef_noodle",
    name: "Beef Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 6,
    calories: 500,
    protein: 25,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_ampang_yong_tau_foo_and_od_yong_tau_foo",
    brandId: "kopitiam_ampang_yong_tau_foo_and_odeon_beef_noodle",
    name: "Yong Tau Foo",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_hao_zai_lai_teochew_porrid_teochew_porridge",
    brandId: "kopitiam_hao_zai_lai_teochew_porridge",
    name: "Teochew Porridge",
    emoji: "🥣",
    category: "Local Hawker",
    price: 4,
    calories: 280,
    protein: 15,
    carbs: 42,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_kokoro_izakaya_japanese_cuisine",
    brandId: "kopitiam_kokoro_izakaya",
    name: "Japanese cuisine",
    emoji: "🍱",
    category: "Japanese",
    price: 7,
    calories: 500,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_kinaroy_thai_cuisine_thai_zha_chai",
    brandId: "kopitiam_kinaroy_thai_cuisine",
    name: "Thai Zha Chai",
    emoji: "🥗",
    category: "Thai",
    price: 4.5,
    calories: 180,
    protein: 4,
    carbs: 20,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_lao_fan_ji_bak_kut_teh_and_bak_kut_teh",
    brandId: "kopitiam_lao_fan_ji_bak_kut_teh_and_claypot",
    name: "Bak Kut Teh",
    emoji: "🍲",
    category: "Local Hawker",
    price: 6.5,
    calories: 420,
    protein: 28,
    carbs: 10,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_lao_fan_ji_bak_kut_teh_and_claypot_rice",
    brandId: "kopitiam_lao_fan_ji_bak_kut_teh_and_claypot",
    name: "Claypot Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 6.5,
    calories: 600,
    protein: 25,
    carbs: 75,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_thai_lamoon_signature_basil_chicken_rice",
    brandId: "kopitiam_thai_lamoon_signature",
    name: "Basil Chicken Rice",
    emoji: "🍛",
    category: "Thai",
    price: 5.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_thai_lamoon_signature_pad_thai",
    brandId: "kopitiam_thai_lamoon_signature",
    name: "Pad Thai",
    emoji: "🍜",
    category: "Thai",
    price: 5.5,
    calories: 500,
    protein: 18,
    carbs: 65,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "lps_lixin_fish_ball_noodle_fishball_noodles",
    brandId: "kopitiam_lixin_fish_ball_noodle",
    name: "Fishball Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 20,
    carbs: 55,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_omega_pork_noodle_bak_chor_mee",
    brandId: "kopitiam_omega_pork_noodle",
    name: "Pork Noodle (Bak Chor Mee style)",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 22,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "lps_satay_noodz_satay_noodles",
    brandId: "kopitiam_satay_noodz",
    name: "Satay Noodles",
    emoji: "🍜",
    category: "Local Hawker",
    price: 5.5,
    calories: 480,
    protein: 22,
    carbs: 58,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_haha_family_hainanese_bee_hoon",
    brandId: "canopy_bukit_canberra_haha_family",
    name: "Hainanese Bee Hoon",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 380,
    protein: 15,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_shi_nian_pig_trotter_rice_with_onsen_egg",
    brandId: "canopy_bukit_canberra_shi_nian",
    name: "Pig Trotter Rice with Onsen Egg",
    emoji: "🍚",
    category: "Local Hawker",
    price: 6.9,
    calories: 580,
    protein: 26,
    carbs: 55,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_changi_village_fried_hokki_fried_hokkien_mee",
    brandId: "canopy_bukit_canberra_changi_village_fried_hokkien_mee",
    name: "Fried Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 550,
    protein: 20,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_the_cheeky_chick_crispy_fried_chicken_wings_with_fries",
    brandId: "canopy_bukit_canberra_the_cheeky_chick",
    name: "Crispy Fried Chicken Wings with Fries",
    emoji: "🍗",
    category: "Western",
    price: 7,
    calories: 650,
    protein: 30,
    carbs: 55,
    fat: 30,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_lao_guang_ji_claypot_rice_claypot_rice",
    brandId: "canopy_bukit_canberra_lao_guang_ji_claypot_rice",
    name: "Claypot Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 6.5,
    calories: 600,
    protein: 25,
    carbs: 75,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_pangkor_island_nasi_lemak_nasi_lemak_set",
    brandId: "canopy_bukit_canberra_pangkor_island_nasi_lemak",
    name: "Nasi Lemak Set",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 5,
    calories: 550,
    protein: 22,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_xin_fa_melaka_bbq_seafood_bbq_seafood_platter",
    brandId: "canopy_bukit_canberra_xin_fa_melaka_bbq_seafood",
    name: "BBQ Seafood Platter",
    emoji: "🍤",
    category: "Seafood",
    price: 12,
    calories: 500,
    protein: 32,
    carbs: 25,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_king_grouper_fish_soup_sliced_fish_soup",
    brandId: "canopy_bukit_canberra_king_grouper_fish_soup",
    name: "Sliced Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_hock_gooi_hainanese_curry_rice_pork_chop",
    brandId: "canopy_bukit_canberra_hock_gooi",
    name: "Hainanese Curry Rice (Pork Chop)",
    emoji: "🍛",
    category: "Western",
    price: 6,
    calories: 620,
    protein: 28,
    carbs: 65,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_zhen_de_bbq_le_bbq_pork_rice",
    brandId: "canopy_bukit_canberra_zhen_de_bbq_le",
    name: "BBQ Pork Rice",
    emoji: "🍖",
    category: "Chinese Roast",
    price: 5.5,
    calories: 550,
    protein: 26,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_kopi_tan_kopi",
    brandId: "canopy_bukit_canberra_kopi_tan",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_kopi_tan_teh",
    brandId: "canopy_bukit_canberra_kopi_tan",
    name: "Teh",
    emoji: "🍵",
    category: "Beverages",
    price: 1.7,
    calories: 140,
    protein: 2,
    carbs: 28,
    fat: 3,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bc_lau_pa_sat_congee_pork_congee",
    brandId: "canopy_bukit_canberra_lau_pa_sat_congee",
    name: "Pork Congee",
    emoji: "🥣",
    category: "Seafood",
    price: 4.5,
    calories: 300,
    protein: 18,
    carbs: 38,
    fat: 7,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_berempah_bros_ayam_berempah_with_coconut_rice",
    brandId: "canopy_bukit_canberra_berempah_bros",
    name: "Ayam Berempah with Coconut Rice",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 7.5,
    calories: 550,
    protein: 30,
    carbs: 55,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_twenty6_gusto_house_western_food",
    brandId: "canopy_bukit_canberra_twenty6_gusto_house",
    name: "Western Food",
    emoji: "🍽️",
    category: "Western",
    price: 6.5,
    calories: 600,
    protein: 28,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_hock_kee_teochew_noodle_teochew_noodle",
    brandId: "canopy_bukit_canberra_hock_kee_teochew_noodle",
    name: "Teochew Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_liu_kou_shui_caramelised_char_siew_don",
    brandId: "canopy_bukit_canberra_liu_kou_shui",
    name: "Caramelised Char Siew Don",
    emoji: "🍚",
    category: "Japanese",
    price: 7.5,
    calories: 580,
    protein: 24,
    carbs: 70,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_pinky_s_kitchen_nakhon_si_pad_thai",
    brandId: "canopy_bukit_canberra_pinky_s_kitchen_nakhon_si",
    name: "Pad Thai",
    emoji: "🍜",
    category: "Thai",
    price: 5.5,
    calories: 500,
    protein: 18,
    carbs: 65,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_lixin_fish_ball_noodles_fishball_noodles",
    brandId: "canopy_bukit_canberra_lixin_fish_ball_noodles",
    name: "Fishball Noodles",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 400,
    protein: 20,
    carbs: 55,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_arabest_halal_shawarma_plate",
    brandId: "canopy_bukit_canberra_arabest_halal",
    name: "Shawarma Plate",
    emoji: "🥙",
    category: "Local Hawker",
    price: 8,
    calories: 550,
    protein: 30,
    carbs: 40,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_mr_ab_prata_and_mee_goreng_roti_prata",
    brandId: "canopy_bukit_canberra_mr_ab_prata_and_mee_goreng",
    name: "Roti Prata",
    emoji: "🫓",
    category: "Indian",
    price: 1.2,
    calories: 200,
    protein: 5,
    carbs: 28,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_mr_ab_prata_and_mee_goreng_mee_goreng",
    brandId: "canopy_bukit_canberra_mr_ab_prata_and_mee_goreng",
    name: "Mee Goreng",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 4,
    calories: 450,
    protein: 12,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "bc_teochew_fish_soup_fish_soup",
    brandId: "canopy_bukit_canberra_teochew_fish_soup",
    name: "Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_zhong_guo_la_mian_xiao_lon_xiao_long_bao",
    brandId: "canopy_bukit_canberra_zhong_guo_la_mian_xiao_long_bao",
    name: "Xiao Long Bao",
    emoji: "🥟",
    category: "Bakery/Dessert",
    price: 5,
    calories: 300,
    protein: 12,
    carbs: 32,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_ah_heng_char_kway_teow_char_kway_teow",
    brandId: "canopy_bukit_canberra_ah_heng_char_kway_teow",
    name: "Char Kway Teow",
    emoji: "🍜",
    category: "Local Hawker",
    price: 4.5,
    calories: 550,
    protein: 15,
    carbs: 65,
    fat: 25,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_xing_yu_korean_cuisine_bibimbap",
    brandId: "canopy_bukit_canberra_xing_yu_korean_cuisine",
    name: "Bibimbap",
    emoji: "🍚",
    category: "Korean",
    price: 6.5,
    calories: 550,
    protein: 20,
    carbs: 75,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_maxwell_chicken_rice_roasted_chicken_rice",
    brandId: "canopy_bukit_canberra_maxwell_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_golden_boat_beef_boat_noodle",
    brandId: "canopy_bukit_canberra_golden_boat",
    name: "Beef Boat Noodle",
    emoji: "🍜",
    category: "Thai",
    price: 6,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_jia_le_yong_tau_foo_yong_tau_foo",
    brandId: "canopy_bukit_canberra_jia_le_yong_tau_foo",
    name: "Yong Tau Foo",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_2112_snack_delight_soon_kueh",
    brandId: "canopy_bukit_canberra_2112_snack_delight",
    name: "Soon Kueh",
    emoji: "🥟",
    category: "Local Hawker",
    price: 1.5,
    calories: 150,
    protein: 4,
    carbs: 20,
    fat: 6,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_la_kopi_kopi",
    brandId: "canopy_bukit_canberra_la_kopi",
    name: "Kopi",
    emoji: "☕",
    category: "Beverages",
    price: 1.7,
    calories: 120,
    protein: 2,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_le_man_seafood_seafood_platter",
    brandId: "canopy_bukit_canberra_le_man_seafood",
    name: "Seafood Platter",
    emoji: "🍤",
    category: "Seafood",
    price: 15,
    calories: 480,
    protein: 38,
    carbs: 25,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_le_man_econ_bee_hoon_fried_bee_hoon",
    brandId: "canopy_bukit_canberra_le_man_econ_bee_hoon",
    name: "Fried Bee Hoon",
    emoji: "🍜",
    category: "Indonesian/Malay",
    price: 3.5,
    calories: 380,
    protein: 10,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_yew_kee_duck_rice_duck_rice",
    brandId: "canopy_bukit_canberra_yew_kee_duck_rice",
    name: "Duck Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 520,
    protein: 26,
    carbs: 60,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_snack_that_food_up_chicken_quesadilla",
    brandId: "canopy_bukit_canberra_snack_that_food_up",
    name: "Chicken Quesadilla",
    emoji: "🌮",
    category: "Local Hawker",
    price: 6.2,
    calories: 480,
    protein: 22,
    carbs: 40,
    fat: 24,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_muffin_homme_blueberry_muffin",
    brandId: "canopy_bukit_canberra_muffin_homme",
    name: "Blueberry Muffin",
    emoji: "🧁",
    category: "Bakery/Dessert",
    price: 3.5,
    calories: 320,
    protein: 5,
    carbs: 45,
    fat: 13,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_add_more_mala_hot_pot_mala_xiang_guo",
    brandId: "canopy_bukit_canberra_add_more_mala_hot_pot",
    name: "Mala Xiang Guo",
    emoji: "🌶️",
    category: "Mala/Hotpot",
    price: 8,
    calories: 550,
    protein: 25,
    carbs: 35,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_tanjong_rhu_wanton_noodle_wanton_mee",
    brandId: "canopy_bukit_canberra_tanjong_rhu_wanton_noodle",
    name: "Wanton Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_day_night_herbal_soup_black_chicken_soup",
    brandId: "canopy_bukit_canberra_day_night_herbal_soup",
    name: "Black Chicken Soup",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 6.5,
    calories: 340,
    protein: 28,
    carbs: 10,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_al_usroh_ayam_merah_red_chicken_rice",
    brandId: "canopy_bukit_canberra_al_usroh",
    name: "Ayam Merah (Red Chicken) Rice",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 6,
    calories: 580,
    protein: 28,
    carbs: 55,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_scissors_paper_stone_beer",
    brandId: "canopy_bukit_canberra_scissors_paper_stone",
    name: "Beer",
    emoji: "🍺",
    category: "Local Hawker",
    price: 8,
    calories: 150,
    protein: 1,
    carbs: 12,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_tong_xin_vegetarian_veg_mixed_rice",
    brandId: "canopy_bukit_canberra_tong_xin_vegetarian",
    name: "Veg Mixed Rice",
    emoji: "🥗",
    category: "Local Hawker",
    price: 3.8,
    calories: 400,
    protein: 12,
    carbs: 58,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "bc_danlao_scrambled_egg_rice_scrambled_egg_rice",
    brandId: "canopy_bukit_canberra_danlao_scrambled_egg_rice",
    name: "Scrambled Egg Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 5,
    calories: 480,
    protein: 18,
    carbs: 55,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_cinta_hainanese_chicken_ri_roasted_chicken_rice",
    brandId: "kopitiam_cinta_hainanese_chicken_rice",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_chang_cheng_economical_rice",
    brandId: "kopitiam_chang_cheng",
    name: "Economical Rice",
    emoji: "🍱",
    category: "Local Hawker",
    price: 4.5,
    calories: 500,
    protein: 22,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_master_tang_ginseng_chicken_classic",
    brandId: "kopitiam_master_tang",
    name: "Ginseng Chicken Classic",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 7,
    calories: 380,
    protein: 30,
    carbs: 15,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_claypot_king_claypot_rice",
    brandId: "kopitiam_claypot_king",
    name: "Claypot Rice",
    emoji: "🍚",
    category: "Local Hawker",
    price: 6.5,
    calories: 600,
    protein: 25,
    carbs: 75,
    fat: 20,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_uncle_jim_fresh_fruit_juic_sugar_cane_juice",
    brandId: "kopitiam_uncle_jim_fresh_fruit_juice",
    name: "Sugar Cane Juice",
    emoji: "🥤",
    category: "Coffeeshop Fare",
    price: 2,
    calories: 180,
    protein: 0,
    carbs: 45,
    fat: 0,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_huay_kwang_thai_wanton_mee_wanton_mee",
    brandId: "kopitiam_huay_kwang_thai_wanton_mee_ubi",
    name: "Wanton Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_sj_sickander_ammal_muslim__roti_prata",
    brandId: "kopitiam_sj_sickander_ammal_muslim_food",
    name: "Roti Prata",
    emoji: "🫓",
    category: "Indian",
    price: 1.2,
    calories: 200,
    protein: 5,
    carbs: 28,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_yummy_delights_econ_bee_hoon",
    brandId: "kopitiam_yummy_delights",
    name: "Econ Bee Hoon",
    emoji: "🍜",
    category: "Local Hawker",
    price: 3.5,
    calories: 380,
    protein: 10,
    carbs: 55,
    fat: 12,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_mama_fish_soup_sliced_fish_soup",
    brandId: "kopitiam_mama_fish_soup",
    name: "Sliced Fish Soup",
    emoji: "🍲",
    category: "Seafood",
    price: 6,
    calories: 320,
    protein: 28,
    carbs: 25,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_deen_mee_combo_house_indian_goreng",
    brandId: "kopitiam_deen_mee_combo_house",
    name: "Indian Goreng",
    emoji: "🍜",
    category: "Indian",
    price: 4.5,
    calories: 460,
    protein: 14,
    carbs: 60,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_hee_hee_hee_steamed_fish_a_steamed_fish",
    brandId: "kopitiam_hee_hee_hee_steamed_fish_and_seafood",
    name: "Steamed Fish",
    emoji: "🐟",
    category: "Seafood",
    price: 8,
    calories: 380,
    protein: 35,
    carbs: 10,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_south_buona_vista_braised__braised_duck",
    brandId: "kopitiam_south_buona_vista_braised_duck",
    name: "Braised Duck",
    emoji: "🦆",
    category: "Chinese Roast",
    price: 5.5,
    calories: 500,
    protein: 26,
    carbs: 55,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_you_fu_ban_mian_and_pao_fa_ban_mian",
    brandId: "kopitiam_you_fu_ban_mian_and_pao_fan",
    name: "Ban Mian",
    emoji: "🍜",
    category: "Noodles",
    price: 4.5,
    calories: 480,
    protein: 20,
    carbs: 60,
    fat: 15,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_hock_hai_curry_chicken_noo_curry_noodle",
    brandId: "kopitiam_hock_hai_curry_chicken_noodle",
    name: "Curry Noodle",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 480,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_monster_chili_mala_hotpot_mala_xiang_guo",
    brandId: "kopitiam_monster_chili_mala_hotpot",
    name: "Mala Xiang Guo",
    emoji: "🌶️",
    category: "Mala/Hotpot",
    price: 8,
    calories: 550,
    protein: 25,
    carbs: 35,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_kebabs_corner_kebab_plate",
    brandId: "kopitiam_kebabs_corner",
    name: "Kebab Plate",
    emoji: "🥙",
    category: "Local Hawker",
    price: 7,
    calories: 550,
    protein: 28,
    carbs: 45,
    fat: 26,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_hakka_leipopo_thunder_tea_rice",
    brandId: "kopitiam_hakka_leipopo",
    name: "Thunder Tea Rice",
    emoji: "🍵",
    category: "Local Hawker",
    price: 4.5,
    calories: 400,
    protein: 12,
    carbs: 55,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_12_roasted_roasted_chicken_rice",
    brandId: "kopitiam_12_roasted",
    name: "Roasted Chicken Rice",
    emoji: "🍗",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_12_roasted_char_siew_rice",
    brandId: "kopitiam_12_roasted",
    name: "Char Siew Rice",
    emoji: "🍚",
    category: "Chinese Roast",
    price: 5,
    calories: 550,
    protein: 25,
    carbs: 65,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "pgc_swee_traditional_prawn_noo_prawn_mee",
    brandId: "kopitiam_swee_traditional_prawn_noodle",
    name: "Prawn Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5.5,
    calories: 500,
    protein: 22,
    carbs: 55,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_ubi_le_sheng_yong_tau_fu_yong_tau_foo",
    brandId: "kopitiam_ubi_le_sheng_yong_tau_fu",
    name: "Yong Tau Foo",
    emoji: "🍲",
    category: "Chicken Rice/Poultry",
    price: 4.5,
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_chicky_papa_western_food",
    brandId: "kopitiam_chicky_papa",
    name: "Western Food",
    emoji: "🍽️",
    category: "Western",
    price: 6.5,
    calories: 600,
    protein: 28,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_old_nyonya_laksa",
    brandId: "kopitiam_old_nyonya",
    name: "Laksa",
    emoji: "🍜",
    category: "Local Hawker",
    price: 5.5,
    calories: 550,
    protein: 20,
    carbs: 55,
    fat: 28,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_tidjai_thai_food_pad_thai",
    brandId: "kopitiam_tidjai_thai_food",
    name: "Pad Thai",
    emoji: "🍜",
    category: "Thai",
    price: 5.5,
    calories: 500,
    protein: 18,
    carbs: 65,
    fat: 16,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_dosa_delight_masala_dosa",
    brandId: "kopitiam_dosa_delight",
    name: "Masala Dosa",
    emoji: "🫓",
    category: "Indian",
    price: 4,
    calories: 320,
    protein: 8,
    carbs: 50,
    fat: 10,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_what_the_puff_curry_puff",
    brandId: "kopitiam_what_the_puff",
    name: "Curry Puff",
    emoji: "🥟",
    category: "Bakery/Dessert",
    price: 1.5,
    calories: 180,
    protein: 4,
    carbs: 20,
    fat: 9,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_jin_deng_pig_s_organ_soup_pig_organ_soup",
    brandId: "kopitiam_jin_deng_pig_s_organ_soup",
    name: "Pig Organ Soup",
    emoji: "🍲",
    category: "Local Hawker",
    price: 6,
    calories: 380,
    protein: 28,
    carbs: 10,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_jade_s_chicken_korean_fried_chicken",
    brandId: "kopitiam_jade_s_chicken",
    name: "Korean Fried Chicken",
    emoji: "🍗",
    category: "Korean",
    price: 7.5,
    calories: 650,
    protein: 32,
    carbs: 45,
    fat: 32,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_grab_n_go_satay",
    brandId: "kopitiam_grab_n_go",
    name: "Satay",
    emoji: "🍢",
    category: "Local Hawker",
    price: 6,
    calories: 375,
    protein: 30,
    carbs: 20,
    fat: 18,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_singapore_fried_hokkien_me_fried_hokkien_mee",
    brandId: "kopitiam_singapore_fried_hokkien_mee",
    name: "Fried Hokkien Mee",
    emoji: "🍜",
    category: "Noodles",
    price: 5,
    calories: 550,
    protein: 20,
    carbs: 60,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_75_ah_balling_peanut_soup_glutinous_rice_ball_dessert",
    brandId: "kopitiam_75_ah_balling_peanut_soup",
    name: "Glutinous Rice Ball Dessert",
    emoji: "🥣",
    category: "Bakery/Dessert",
    price: 2.2,
    calories: 220,
    protein: 4,
    carbs: 42,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_black_and_white_rojak_and__rojak",
    brandId: "kopitiam_black_and_white_rojak_and_popiah",
    name: "Rojak",
    emoji: "🥗",
    category: "Local Hawker",
    price: 4,
    calories: 320,
    protein: 6,
    carbs: 45,
    fat: 14,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_black_and_white_rojak_and__popiah",
    brandId: "kopitiam_black_and_white_rojak_and_popiah",
    name: "Popiah",
    emoji: "🌯",
    category: "Local Hawker",
    price: 3.5,
    calories: 260,
    protein: 8,
    carbs: 38,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated"
  },
  {
    id: "pgc_one_soy_soya_bean_drink",
    brandId: "kopitiam_one_soy",
    name: "Soya Bean Drink",
    emoji: "🥤",
    category: "Bakery/Dessert",
    price: 1.6,
    calories: 140,
    protein: 6,
    carbs: 20,
    fat: 4,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_dapur_abang_nasi_lemak_set",
    brandId: "kopitiam_dapur_abang",
    name: "Nasi Lemak Set",
    emoji: "🍛",
    category: "Indonesian/Malay",
    price: 5,
    calories: 550,
    protein: 22,
    carbs: 65,
    fat: 22,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  },
  {
    id: "pgc_srisun_prata_com_food_hold_roti_prata",
    brandId: "punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd",
    name: "Roti Prata",
    emoji: "🫓",
    category: "Indian",
    price: 1.2,
    calories: 200,
    protein: 5,
    carbs: 28,
    fat: 8,
    compatibleWith: [],
    confidence: "estimated",
    isPopular: true
  }
];
