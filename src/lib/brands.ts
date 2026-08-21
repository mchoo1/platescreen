// Generated 2026-08-20 — see reference/planning/database-restructure-proposal-2026-08-20.md
// and reference/migration-scripts/ for the restructure this replaced (Outlet -> Brand+Premises).
// Untyped literal export (see Brand in types/db.ts) — screener.ts casts once at the boundary,
// matching the outlets.ts/foodOptions.ts convention (avoids TS2590 on a large array literal).

export const BRANDS = [
  {
    id: "mcd",
    name: "McDonald's",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "mcdonald",
      "mcdonalds",
      "mcdonald's",
      "mcd",
      "mac"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kfc",
    name: "KFC",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "kfc",
      "kentucky fried chicken",
      "kentucky"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bk",
    name: "Burger King",
    emoji: "👑",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "burger king",
      "burgerking",
      "bk",
      "burger king sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "subway",
    name: "Subway",
    emoji: "🥖",
    type: "restaurant",
    cuisine: "Sandwiches",
    aliases: [
      "subway"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "old_chang_kee",
    name: "Old Chang Kee",
    emoji: "🥟",
    type: "grab_go",
    cuisine: "Local Snacks",
    aliases: [
      "old chang kee",
      "ock",
      "old chang"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ya_kun",
    name: "Ya Kun Kaya Toast",
    emoji: "🍞",
    type: "restaurant",
    cuisine: "Local Cafe",
    aliases: [
      "ya kun",
      "yakun",
      "ya kun kaya"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "breadtalk",
    name: "BreadTalk",
    emoji: "🥐",
    type: "grab_go",
    cuisine: "Bakery",
    aliases: [
      "breadtalk",
      "bread talk"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "gong_cha",
    name: "Gong Cha",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "gong cha",
      "gongcha",
      "gong-cha"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "7eleven",
    name: "7-Eleven",
    emoji: "🏪",
    type: "ready_to_eat",
    cuisine: "Convenience Store",
    aliases: [
      "7-eleven",
      "7 eleven",
      "7eleven",
      "seven eleven"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "grain",
    name: "Grain",
    emoji: "🥘",
    type: "restaurant",
    cuisine: "Healthy Meals",
    aliases: [
      "grain",
      "grain sg",
      "grain.com.sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "stuffd",
    name: "Stuffd",
    emoji: "🌯",
    type: "restaurant",
    cuisine: "Kebabs & Wraps",
    aliases: [
      "stuffd",
      "stuffd sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "aw",
    name: "A&W",
    emoji: "🍟",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "a&w",
      "a and w",
      "aw",
      "aw restaurants",
      "a&w restaurants"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jollibee",
    name: "Jollibee",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "jollibee",
      "jolly bee",
      "jb"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "toast_box",
    name: "Toast Box",
    emoji: "🍞",
    type: "restaurant",
    cuisine: "Kopitiam",
    aliases: [
      "toast box",
      "toastbox",
      "toast box sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "starbucks_sg",
    name: "Starbucks",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Cafe",
    aliases: [
      "starbucks",
      "sbux",
      "starbucks singapore",
      "starbucks sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "popeyes",
    name: "Popeyes",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "popeyes",
      "popeyes louisiana kitchen",
      "popeyes sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "nandos",
    name: "Nando's",
    emoji: "🔥",
    type: "restaurant",
    cuisine: "Portuguese / Grilled Chicken",
    aliases: [
      "nandos",
      "nando's",
      "nandos peri peri",
      "nando's peri-peri"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "pizza_hut",
    name: "Pizza Hut",
    emoji: "🍕",
    type: "restaurant",
    cuisine: "Pizza",
    aliases: [
      "pizza hut",
      "pizzahut",
      "pizza hut sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "delivery",
      "grab_go"
    ]
  },
  {
    id: "dominos",
    name: "Domino's Pizza",
    emoji: "🍕",
    type: "grab_go",
    cuisine: "Pizza",
    aliases: [
      "dominos",
      "domino's",
      "domino's pizza",
      "dominos pizza"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "delivery",
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "wingstop",
    name: "Wingstop",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Wings",
    aliases: [
      "wingstop",
      "wing stop"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "gyg",
    name: "Guzman y Gomez",
    emoji: "🌯",
    type: "restaurant",
    cuisine: "Mexican",
    aliases: [
      "guzman y gomez",
      "gyg",
      "guzman",
      "guzman gomez"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "shake_shack",
    name: "Shake Shack",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Burgers",
    aliases: [
      "shake shack",
      "shakeshack",
      "shack"
    ],
    dietTags: [],
    priceRange: "$$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "five_guys",
    name: "Five Guys",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Burgers",
    aliases: [
      "five guys",
      "fiveguys"
    ],
    dietTags: [],
    priceRange: "$$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "krispy_kreme",
    name: "Krispy Kreme",
    emoji: "🍩",
    type: "grab_go",
    cuisine: "Doughnuts",
    aliases: [
      "krispy kreme",
      "krispykreme",
      "kk doughnuts"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "grab_go",
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "dunkin",
    name: "Dunkin'",
    emoji: "🍩",
    type: "grab_go",
    cuisine: "Doughnuts & Coffee",
    aliases: [
      "dunkin",
      "dunkin donuts",
      "dunkin' donuts",
      "dd"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go",
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "auntie_annes",
    name: "Auntie Anne's",
    emoji: "🥨",
    type: "grab_go",
    cuisine: "Pretzels",
    aliases: [
      "auntie anne's",
      "auntie annes",
      "auntie anne",
      "aunty annes"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "texas_chicken",
    name: "Texas Chicken",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "texas chicken",
      "texas fried chicken",
      "texas chicken sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "carl_jr",
    name: "Carl's Jr.",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "carl's jr",
      "carls jr",
      "carl jr",
      "hardees"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "mos_burger",
    name: "MOS Burger",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Japanese Fast Food",
    aliases: [
      "mos burger",
      "mos",
      "mossburger"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "yoshinoya",
    name: "Yoshinoya",
    emoji: "🍱",
    type: "restaurant",
    cuisine: "Japanese Fast Food",
    aliases: [
      "yoshinoya",
      "yoshinoya beef bowl",
      "yoshi"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "saizeriya",
    name: "Saizeriya",
    emoji: "🍝",
    type: "restaurant",
    cuisine: "Italian Casual",
    aliases: [
      "saizeriya",
      "saizeria"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "genki_sushi",
    name: "Genki Sushi",
    emoji: "🍣",
    type: "restaurant",
    cuisine: "Japanese / Sushi",
    aliases: [
      "genki sushi",
      "genki",
      "genkisushi"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "mccafe",
    name: "McCafé",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Café / Coffee",
    aliases: [
      "mccafe",
      "mc cafe",
      "mcdonald's cafe"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "coffee_bean",
    name: "The Coffee Bean & Tea Leaf",
    emoji: "☕",
    type: "restaurant",
    cuisine: "Café / Coffee",
    aliases: [
      "coffee bean",
      "cbtl",
      "the coffee bean",
      "coffee bean tea leaf"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "astons",
    name: "Aston's Specialities",
    emoji: "🥩",
    type: "restaurant",
    cuisine: "Western Casual",
    aliases: [
      "astons",
      "aston's",
      "aston specialities",
      "astons specialities"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "soup_spoon",
    name: "The Soup Spoon",
    emoji: "🥣",
    type: "restaurant",
    cuisine: "Healthy / Soups",
    aliases: [
      "soup spoon",
      "the soup spoon",
      "soupspoon"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "daily_cut",
    name: "The Daily Cut",
    emoji: "🥗",
    type: "restaurant",
    cuisine: "Healthy / Bowls",
    aliases: [
      "daily cut",
      "the daily cut",
      "tdc"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "project_acai",
    name: "Project Açaí",
    emoji: "🫐",
    type: "grab_go",
    cuisine: "Healthy / Açaí",
    aliases: [
      "project acai",
      "project açaí",
      "projectacai"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "liho",
    name: "LiHo",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "liho",
      "li ho",
      "liho tea"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koi",
    name: "KOI Thé",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "koi",
      "koi the",
      "koi cafe",
      "koi thé"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chagee",
    name: "Chagee",
    emoji: "🍵",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "chagee",
      "霸王茶姬",
      "cha gee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mixue",
    name: "Mixue",
    emoji: "🍦",
    type: "grab_go",
    cuisine: "Bubble Tea / Ice Cream",
    aliases: [
      "mixue",
      "mix xue",
      "蜜雪冰城"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dosirak",
    name: "Dosirak",
    emoji: "🍱",
    type: "restaurant",
    cuisine: "Korean",
    aliases: [
      "dosirak",
      "도시락"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "makisan",
    name: "Maki-San",
    emoji: "🌯",
    type: "grab_go",
    cuisine: "Japanese / Sushi Rolls",
    aliases: [
      "maki san",
      "makisan",
      "maki-san"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "nourish_bowl",
    name: "Nourish Bowl",
    emoji: "🥗",
    type: "restaurant",
    cuisine: "Healthy / Bowls",
    aliases: [
      "nourish bowl",
      "nourishbowl",
      "nourish"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "superfood_kitchen",
    name: "Superfood Kitchen",
    emoji: "🥬",
    type: "restaurant",
    cuisine: "Healthy / Bowls",
    aliases: [
      "superfood kitchen",
      "sfk",
      "superfoodkitchen"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "boost_juice",
    name: "Boost Juice",
    emoji: "🥤",
    type: "grab_go",
    cuisine: "Juice Bar",
    aliases: [
      "boost",
      "boost juice",
      "boost juice bar",
      "boost juice bars"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "cheers",
    name: "Cheers",
    emoji: "🏪",
    type: "ready_to_eat",
    cuisine: "Convenience Store",
    aliases: [
      "cheers",
      "cheers convenience",
      "cheers store"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "fairprice_xpress",
    name: "FairPrice Xpress",
    emoji: "🏪",
    type: "ready_to_eat",
    cuisine: "Convenience Store",
    aliases: [
      "fairprice xpress",
      "fp xpress",
      "fpx",
      "ntuc xpress",
      "fairprice express"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "saladstop",
    name: "SaladStop!",
    emoji: "🥗",
    type: "grab_go",
    cuisine: "Salads & Grain Bowls",
    aliases: [
      "saladstop",
      "salad stop",
      "saladstop!"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "paris_baguette",
    name: "Paris Baguette",
    emoji: "🥐",
    type: "grab_go",
    cuisine: "French Bakery & Café",
    aliases: [
      "paris baguette",
      "parisbaguette",
      "pb"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "sushi_express",
    name: "Sushi Express",
    emoji: "🍣",
    type: "restaurant",
    cuisine: "Japanese (Kaiten)",
    aliases: [
      "sushi express",
      "sushiexpress"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "saladbox",
    name: "The Salad Box",
    emoji: "🥗",
    type: "grab_go",
    cuisine: "Healthy Salads",
    aliases: [
      "salad box",
      "saladbox",
      "the salad box",
      "thesaladbox"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "fairprice",
    name: "FairPrice",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "fairprice",
      "ntuc fairprice",
      "ntuc",
      "fair price",
      "fp"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "fairprice_finest",
    name: "FairPrice Finest",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "fairprice finest",
      "ntuc finest",
      "fp finest"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "cold_storage",
    name: "Cold Storage",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "cold storage",
      "cs fresh",
      "cold storage supermarket"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "giant",
    name: "Giant",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "giant",
      "giant supermarket",
      "giant hypermart",
      "giant hyper"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "sheng_siong",
    name: "Sheng Siong",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "sheng siong",
      "shengsiong",
      "sheng siong supermarket"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "don_don_donki",
    name: "Don Don Donki",
    emoji: "🐧",
    type: "supermarket",
    cuisine: "Japanese Supermarket",
    aliases: [
      "don don donki",
      "donki",
      "don quijote",
      "ppih",
      "dqe"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "tian_tian_chicken_rice",
    name: "Tian Tian Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "tian tian",
      "tian tian chicken rice",
      "maxwell chicken rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_wonton_mee",
    name: "Wonton Mee (Maxwell FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "maxwell wonton mee",
      "wonton mee maxwell"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_laksa",
    name: "Laksa Stall (Maxwell FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_char_kway_teow",
    name: "Char Kway Teow (Maxwell FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell char kway teow",
      "maxwell ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_popiah",
    name: "Popiah Stall (Maxwell FC)",
    emoji: "🌯",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell popiah"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_carrot_cake",
    name: "Carrot Cake Stall (Maxwell FC)",
    emoji: "🍳",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell carrot cake"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_oyster_omelette",
    name: "Oyster Omelette (Maxwell FC)",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell oyster omelette",
      "maxwell orh luak"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_rojak",
    name: "Rojak (Maxwell FC)",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell rojak"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_drinks_desserts",
    name: "Desserts & Drinks (Maxwell FC)",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell kopi",
      "maxwell drinks",
      "maxwell tau huay"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_satay_street",
    name: "Satay Street (Lau Pa Sat)",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "lau pa sat satay",
      "satay street",
      "lps satay"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_oyster_omelette",
    name: "Oyster Omelette (Lau Pa Sat)",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "lau pa sat oyster omelette",
      "lps orh luak"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_seng_kee",
    name: "Seng Kee Local Delights",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "lau pa sat hokkien mee",
      "lps hokkien",
      "seng kee lau pa sat",
      "lps seng kee",
      "lau pa sat seng kee local delights"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "lau_pa_sat_lao_fu_zi_ckt",
    name: "Lao Fu Zi Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat char kway teow",
      "lps ckt",
      "lao fu zi lau pa sat",
      "lao fu zi fried kway teow",
      "lps lao fu zi",
      "lao fu zi ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "lau_pa_sat_prawn_noodles",
    name: "Prawn Noodles (Lau Pa Sat)",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat prawn noodles",
      "lps prawn mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_bak_chor_mee",
    name: "Bak Chor Mee (Lau Pa Sat)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat bak chor mee",
      "lps bcm"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_chicken_rice",
    name: "Ipoh Hainanese Chicken Rice Halal",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "lau pa sat chicken rice",
      "lps chicken rice",
      "ipoh hainanese chicken rice",
      "ipoh chicken rice halal",
      "lau pa sat ipoh chicken rice"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_rojak",
    name: "Rojak (Lau Pa Sat)",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "lau pa sat rojak",
      "lps rojak"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_butter_cream",
    name: "Butter & Cream",
    emoji: "🥐",
    type: "hawker",
    cuisine: "Bakery",
    aliases: [
      "lau pa sat butter cream",
      "lps butter cream",
      "butter and cream lau pa sat",
      "lps bakery",
      "lps desserts",
      "butter cream bakery lau pa sat"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_creme_cone",
    name: "Creme & Cone",
    emoji: "🍦",
    type: "hawker",
    cuisine: "Desserts",
    aliases: [
      "lau pa sat gelato",
      "lps gelato",
      "creme and cone lau pa sat",
      "lps ice cream",
      "lau pa sat creme cone"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_warong_pak_sapari",
    name: "Warong Pak Sapari",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "lau pa sat mee soto",
      "lps mee soto",
      "warong pak sapari lau pa sat",
      "lps pak sapari",
      "pak sapari lau pa sat",
      "lau pa sat mee rebus"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "lau_pa_sat_taliwang",
    name: "Nasi Lemak Ayam Taliwang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "lau pa sat nasi lemak",
      "lps nasi lemak",
      "ayam taliwang lau pa sat",
      "lps taliwang",
      "lau pa sat ayam taliwang",
      "taliwang lau pa sat"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "lau_pa_sat_maya_veggie",
    name: "Maya Indian Veggie Delight",
    emoji: "🫕",
    type: "hawker",
    cuisine: "Indian Vegetarian",
    aliases: [
      "lau pa sat vegetarian",
      "lps vegetarian",
      "maya veggie lau pa sat",
      "maya indian lau pa sat",
      "lps maya",
      "lau pa sat indian veggie"
    ],
    dietTags: [
      "vegetarian",
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "lau_pa_sat_lixin_fishball",
    name: "LiXin Teochew Fishball Noodles",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat fishball noodles",
      "lps fishball",
      "lixin lau pa sat",
      "li xin fishball",
      "lixin teochew lau pa sat",
      "lps lixin"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "lau_pa_sat_feng_xiang_bkt",
    name: "Feng Xiang Bak Kut Teh",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Chinese",
    aliases: [
      "lau pa sat bak kut teh",
      "lps bkt",
      "feng xiang lau pa sat",
      "lps feng xiang",
      "lau pa sat bkt",
      "feng xiang bkt lau pa sat"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "newton_satay_stall",
    name: "Satay Stall (Newton FC)",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "newton satay",
      "newton food centre satay"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_bbq_seafood",
    name: "BBQ Seafood (Newton FC)",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Seafood",
    aliases: [
      "newton bbq",
      "newton stingray",
      "newton seafood",
      "newton bbq wings"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_hokkien_mee",
    name: "Hokkien Mee (Newton FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "newton hokkien mee",
      "newton fc hokkien"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_prawn_noodles",
    name: "Prawn Noodles (Newton FC)",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "newton prawn noodles",
      "newton prawn mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_oyster_omelette",
    name: "Oyster Omelette (Newton FC)",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "newton oyster omelette",
      "newton orh luak"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_carrot_cake",
    name: "Carrot Cake (Newton FC)",
    emoji: "🍳",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "newton carrot cake"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_char_kway_teow",
    name: "Char Kway Teow (Newton FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "newton char kway teow",
      "newton ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_drinks_stall",
    name: "Drinks Stall (Newton FC)",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "newton kopi",
      "newton drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_roast_meats_stall",
    name: "Roast Meats (Chinatown Complex)",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown roast duck",
      "chinatown complex roast",
      "cc roast meats"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_claypot_rice_stall",
    name: "Claypot Rice (Chinatown Complex)",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown claypot rice",
      "cc claypot"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_kway_chap_stall",
    name: "Kway Chap (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown kway chap",
      "cc kway chap"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_wonton_mee_stall",
    name: "Wonton Mee (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown wonton mee",
      "cc wonton mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_ban_mian_stall",
    name: "Ban Mian (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown ban mian",
      "cc ban mian"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_bak_chor_mee_stall",
    name: "Bak Chor Mee (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown bak chor mee",
      "cc bcm"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_char_kway_teow_stall",
    name: "Char Kway Teow (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown char kway teow",
      "cc ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_rice_noodle_rolls",
    name: "Chee Cheong Fun & Popiah (Chinatown)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Snacks",
    aliases: [
      "chinatown chee cheong fun",
      "chinatown popiah",
      "cc ccf"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_desserts_stall",
    name: "Desserts (Chinatown Complex)",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown ice kachang",
      "chinatown desserts",
      "cc chendol"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_kopi_stall",
    name: "Kopi Stall (Chinatown Complex)",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown complex kopi",
      "cc kopi"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_prata_stall",
    name: "Roti Prata Stall (Tekka Market)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka prata",
      "tekka roti prata",
      "little india prata"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_thosai_stall",
    name: "Thosai & Vadai Stall (Tekka)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka thosai",
      "tekka vadai",
      "little india thosai"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_murtabak_stall",
    name: "Murtabak Stall (Tekka Market)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka murtabak",
      "little india murtabak"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_briyani_stall",
    name: "Nasi Briyani (Tekka Market)",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka briyani",
      "tekka nasi briyani",
      "little india briyani"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_nasi_lemak_stall",
    name: "Nasi Lemak & Lontong (Tekka)",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "tekka nasi lemak",
      "tekka lontong",
      "little india nasi lemak"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_mee_goreng_stall",
    name: "Mee Goreng (Tekka Market)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka mee goreng",
      "little india mee goreng"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_rojak_stall",
    name: "Rojak (Tekka Market)",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "tekka rojak"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_drinks_stall",
    name: "Drinks Stall (Tekka Market)",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "tekka teh tarik",
      "tekka drinks",
      "little india drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_char_kway_teow",
    name: "Char Kway Teow (Old Airport Rd)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road char kway teow",
      "oar ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_hokkien_mee",
    name: "Hokkien Mee (Old Airport Rd)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road hokkien mee",
      "oar hokkien"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_prawn_noodles",
    name: "Prawn Noodles (Old Airport Rd)",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road prawn noodles",
      "oar prawn mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_bak_chor_mee",
    name: "Bak Chor Mee (Old Airport Rd)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road bak chor mee",
      "oar bcm"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_roast_duck_rice",
    name: "Roast Duck Rice (Old Airport Rd)",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road roast duck",
      "oar duck rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_economic_rice",
    name: "Economic Rice (Old Airport Rd)",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road economy rice",
      "oar economic rice"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_laksa",
    name: "Laksa (Old Airport Rd)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road laksa",
      "oar laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_wonton_mee",
    name: "Wonton Mee (Old Airport Rd)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road wonton mee",
      "oar wonton"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_popiah",
    name: "Popiah (Old Airport Rd)",
    emoji: "🌯",
    type: "hawker",
    cuisine: "Snacks",
    aliases: [
      "old airport road popiah",
      "oar popiah"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_oyster_omelette",
    name: "Oyster Omelette (Old Airport Rd)",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road oyster omelette",
      "oar orh luak"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_desserts_drinks",
    name: "Desserts & Drinks (Old Airport Rd)",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road ice kachang",
      "oar drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_chicken_rice",
    name: "Chicken Rice (Golden Mile FC)",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile chicken rice",
      "gmfc chicken rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_bak_kut_teh",
    name: "Bak Kut Teh (Golden Mile FC)",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile bak kut teh",
      "gmfc bkt"
    ],
    dietTags: [
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_char_kway_teow",
    name: "Char Kway Teow (Golden Mile FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile char kway teow",
      "gmfc ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_hokkien_mee",
    name: "Hokkien Mee (Golden Mile FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile hokkien mee",
      "gmfc hokkien"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_laksa",
    name: "Laksa (Golden Mile FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile laksa",
      "gmfc laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_prawn_noodles",
    name: "Prawn Noodles (Golden Mile FC)",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile prawn noodles",
      "gmfc prawn mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_satay_stall",
    name: "Satay (Golden Mile FC)",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "golden mile satay",
      "gmfc satay"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_snacks_stall",
    name: "Oyster Cake & Carrot Cake (Golden Mile)",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile oyster cake",
      "golden mile carrot cake",
      "gmfc snacks"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_desserts_drinks",
    name: "Desserts & Drinks (Golden Mile FC)",
    emoji: "🫙",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile peanut soup",
      "golden mile kopi",
      "gmfc drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_nasi_lemak_stall",
    name: "Nasi Lemak (Geylang Serai)",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai nasi lemak",
      "gsm nasi lemak"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_briyani_stall",
    name: "Nasi Briyani (Geylang Serai)",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indian/Malay",
    aliases: [
      "geylang serai briyani",
      "gsm briyani"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_nasi_padang_stall",
    name: "Nasi Padang (Geylang Serai)",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai nasi padang",
      "gsm nasi padang"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_ayam_penyet_stall",
    name: "Ayam Penyet (Geylang Serai)",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai ayam penyet",
      "gsm ayam penyet"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_lontong_stall",
    name: "Lontong (Geylang Serai)",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai lontong",
      "gsm lontong"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_murtabak_stall",
    name: "Murtabak (Geylang Serai)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian/Malay",
    aliases: [
      "geylang serai murtabak",
      "gsm murtabak"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_mee_stall",
    name: "Mee Goreng & Mee Siam (Geylang Serai)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai mee goreng",
      "gsm mee goreng",
      "geylang serai mee siam"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_beehoon_stall",
    name: "Economy Beehoon (Geylang Serai)",
    emoji: "🍝",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai beehoon",
      "gsm beehoon"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_rojak_stall",
    name: "Rojak (Geylang Serai)",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "geylang serai rojak",
      "gsm rojak"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_desserts_drinks",
    name: "Desserts & Drinks (Geylang Serai)",
    emoji: "🍮",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai bubur hitam",
      "gsm teh tarik",
      "gsm drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_chicken_rice",
    name: "Chicken Rice (Whampoa)",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "whampoa chicken rice",
      "whampoa makan chicken rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_economic_rice",
    name: "Economic Rice (Whampoa)",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "whampoa economy rice",
      "whampoa economic rice"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_laksa",
    name: "Laksa (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa laksa",
      "whampoa makan laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_bak_chor_mee",
    name: "Bak Chor Mee (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa bak chor mee",
      "whampoa bcm"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_ban_mian",
    name: "Ban Mian (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa ban mian"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_wonton_mee",
    name: "Wonton Mee (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa wonton mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_char_kway_teow",
    name: "Char Kway Teow (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa char kway teow",
      "whampoa ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_hokkien_mee",
    name: "Hokkien Mee (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa hokkien mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_prata_stall",
    name: "Roti Prata (Whampoa)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "whampoa prata",
      "whampoa roti prata"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_desserts_drinks",
    name: "Desserts & Drinks (Whampoa)",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "whampoa kopi",
      "whampoa tau huay",
      "whampoa drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "luckin_coffee",
    name: "Luckin Coffee",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Coffee",
    aliases: [
      "luckin",
      "luckin coffee",
      "luckincoffee"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "bonchon",
    name: "Bonchon",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Korean Fried Chicken",
    aliases: [
      "bonchon",
      "bon chon"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "llaollao",
    name: "Llaollao",
    emoji: "🍦",
    type: "grab_go",
    cuisine: "Frozen Yogurt",
    aliases: [
      "llaollao",
      "llao llao",
      "llao"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "wendys",
    name: "Wendy's",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "wendy's",
      "wendys",
      "wendy"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "home_cooked",
    name: "Home Cooked",
    emoji: "🍳",
    type: "home_cooked",
    cuisine: "Home Cooking",
    aliases: [
      "home cooked",
      "homemade",
      "self cook"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "self_cook"
    ]
  },
  {
    id: "ichiban_boshi",
    name: "Ichiban Boshi",
    emoji: "🍣",
    type: "restaurant",
    cuisine: "Japanese",
    aliases: [
      "ichiban boshi",
      "ichiban"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "commonwealth_crescent_market_ang_foo_lui",
    name: "Ang Foo Lui",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang foo lui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_chin_she_thong_chin_sze_thong",
    name: "Chin She Thong @Chin Sze Thong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chin she thong @chin sze thong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_eddie_bin_osman_zaieuddin",
    name: "Eddie Bin Osman Zaieuddin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "eddie bin osman zaieuddin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_heng_meng_leng",
    name: "Heng Meng Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "heng meng leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_johari_bin_sualman",
    name: "Johari Bin Sualman",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "johari bin sualman"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_lee_lak_muay_lee_lay_muay",
    name: "Lee Lak Muay @Lee Lay Muay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee lak muay @lee lay muay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_ang_swee_kong",
    name: "Ang Swee Kong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang swee kong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_boo_geok_beng",
    name: "Boo Geok Beng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "boo geok beng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_chan_lai_ee",
    name: "Chan Lai Ee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan lai ee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_chan_lai_ee_2",
    name: "Chan Lai Ee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan lai ee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_chan_pak_seng",
    name: "Chan Pak Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan pak seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_chan_siew_tien",
    name: "Chan Siew Tien",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan siew tien"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_chia_song_kim",
    name: "Chia Song Kim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia song kim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_chua_chye_lian",
    name: "Chua Chye Lian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua chye lian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_kee_hock_seng",
    name: "Kee Hock Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kee hock seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_kway_kim_seng",
    name: "Kway Kim Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kway kim seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_lim_khai_ngee",
    name: "Lim Khai Ngee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim khai ngee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_neo_aik_huat",
    name: "Neo Aik Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "neo aik huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_chan_ah_muay",
    name: "Chan Ah Muay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan ah muay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_goh_meow_koon",
    name: "Goh Meow Koon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh meow koon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_pua_shu_mei",
    name: "Pua Shu Mei",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pua shu mei"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_tay_puay_seh",
    name: "Tay Puay Seh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tay puay seh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_yong_chiou_mei_koh_chiou_mei",
    name: "Yong Chiou Mei @Koh Chiou Mei",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "yong chiou mei @koh chiou mei"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_chen_ling",
    name: "Chen Ling",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen ling"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_chan_ah_kim",
    name: "Chan Ah Kim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan ah kim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_goh_ah_mui",
    name: "Goh Ah Mui",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh ah mui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_jumila_binte_kamari",
    name: "Jumila Binte Kamari",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jumila binte kamari"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_lim_sar_hoe",
    name: "Lim Sar Hoe",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim sar hoe"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_lim_then_poh",
    name: "Lim Then Poh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim then poh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_mohd_hanafiah_bin_mohd_idris",
    name: "Mohd Hanafiah Bin Mohd Idris",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mohd hanafiah bin mohd idris"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_barakath_ali_s_o_k_e_abdul_majeed",
    name: "Barakath Ali S/O K E Abdul Majeed",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "barakath ali s/o k e abdul majeed"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_chan_lye_seng",
    name: "Chan Lye Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan lye seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_chen_min_hong",
    name: "Chen Min Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen min hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_chua_cheng_ann_chua_cheng_huay",
    name: "Chua Cheng Ann @ Chua Cheng Huay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua cheng ann @ chua cheng huay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_koh_chee_seng",
    name: "Koh Chee Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh chee seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_kuah_liang_chuan",
    name: "Kuah Liang Chuan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kuah liang chuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_chew_boon_teck",
    name: "Chew Boon Teck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chew boon teck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_goh_chye_lee",
    name: "Goh Chye Lee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh chye lee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_goh_yeow_seng",
    name: "Goh Yeow Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh yeow seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_ho_chew_teck_vincent",
    name: "Ho Chew Teck Vincent",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho chew teck vincent"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_jenny_wen_chang",
    name: "Jenny Wen Chang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jenny wen chang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_kang_leang_chua",
    name: "Kang Leang Chua",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kang leang chua"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_choo_siew_luan",
    name: "Choo Siew Luan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "choo siew luan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_hapsah_binti_mohd_yusof",
    name: "Hapsah Binti Mohd Yusof",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hapsah binti mohd yusof"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_kamaria_binte_sukarjo",
    name: "Kamaria Binte Sukarjo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kamaria binte sukarjo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_koh_kok_ann",
    name: "Koh Kok Ann",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh kok ann"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_lau_kum_sang",
    name: "Lau Kum Sang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lau kum sang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_lee_len_tong",
    name: "Lee Len Tong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee len tong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_9_plus_redhill_pte_ltd",
    name: "9 Plus Redhill Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "9 plus redhill pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_er_see_liang",
    name: "Er See Liang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "er see liang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_9_plus_cafe_pte_ltd",
    name: "9 Plus Cafe Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "9 plus cafe pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_pang_jee_fong",
    name: "Pang Jee Fong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pang jee fong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_siti_azizah_bt_yaakop",
    name: "Siti Azizah Bt Yaakop",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "siti azizah bt yaakop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_wong_yong_khoon",
    name: "Wong Yong Khoon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "wong yong khoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teck_ghee_square_commonwealth_retail_concepts_pte_ltd",
    name: "Commonwealth Retail Concepts Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "commonwealth retail concepts pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_chia_teck_huat_xie_defa",
    name: "Chia Teck Huat (Xie Defa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia teck huat (xie defa)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_chong_nagh_hong",
    name: "Chong Nagh Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong nagh hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_ho_yin_fong",
    name: "Ho Yin Fong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho yin fong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_koh_lian_teng",
    name: "Koh Lian Teng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh lian teng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_leong_ah_loy",
    name: "Leong Ah Loy",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "leong ah loy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_lim_boon_kwang",
    name: "Lim Boon Kwang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim boon kwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_chang_kay_hwee",
    name: "Chang Kay Hwee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang kay hwee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_chang_kwee_teck",
    name: "Chang Kwee Teck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang kwee teck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_chew_eng_suan",
    name: "Chew Eng Suan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chew eng suan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_chia_geok_tin",
    name: "Chia Geok Tin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia geok tin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_goh_poo_huat",
    name: "Goh Poo Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh poo huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_kwek_ah_heoh",
    name: "Kwek Ah Heoh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kwek ah heoh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_aw_li_seng_benjamin",
    name: "Aw Li Seng Benjamin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "aw li seng benjamin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_chen_hsien_yi",
    name: "Chen Hsien Yi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen hsien yi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_chiam_chee_meng",
    name: "Chiam Chee Meng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chiam chee meng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_khor_lye_hong",
    name: "Khor Lye Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "khor lye hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_koh_heong_choo",
    name: "Koh Heong Choo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh heong choo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_kok_kuan_yen",
    name: "Kok Kuan Yen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kok kuan yen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ci_yuan_hawker_centre_ang_teck_huat",
    name: "Ang Teck Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang teck huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ci_yuan_hawker_centre_ang_yi_jie",
    name: "Ang Yi Jie",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang yi jie"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ci_yuan_hawker_centre_chng_huang_wang",
    name: "Chng Huang Wang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chng huang wang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ci_yuan_hawker_centre_chye_mui_see",
    name: "Chye Mui See",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chye mui see"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ci_yuan_hawker_centre_fei_siong_food_management_pte_ltd",
    name: "Fei Siong Food Management Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fei siong food management pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ci_yuan_hawker_centre_fei_siong_food_management_pte_ltd_2",
    name: "Fei Siong Food Management Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fei siong food management pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_ang_boon_hiang",
    name: "Ang Boon Hiang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang boon hiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_chang_sow_chun",
    name: "Chang Sow Chun",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang sow chun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_ching_show_fee",
    name: "Ching Show Fee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ching show fee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_chua_gek_eng",
    name: "Chua Gek Eng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua gek eng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_gee_kim_hai",
    name: "Gee Kim Hai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gee kim hai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_ho_soo_lee_he_shuli",
    name: "Ho Soo Lee (He Shuli)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho soo lee (he shuli)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_ding_kwong_leung",
    name: "Ding Kwong Leung",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ding kwong leung"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_easah_bte_mageed",
    name: "Easah Bte Mageed",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "easah bte mageed"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_fung_king_san",
    name: "Fung King San",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fung king san"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_koh_teck_chuan_xu_dechuan",
    name: "Koh Teck Chuan (Xu Dechuan)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh teck chuan (xu dechuan)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_lee_guat_hoon",
    name: "Lee Guat Hoon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee guat hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_lee_jim_pong",
    name: "Lee Jim Pong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee jim pong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_goh_ah_loy_goh_kim_ngoh",
    name: "Goh Ah Loy @Goh Kim Ngoh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh ah loy @goh kim ngoh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_sulaiman_s_o_kuriya_abdulla",
    name: "Sulaiman S/O Kuriya Abdulla",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "sulaiman s/o kuriya abdulla"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_tan_geok_eng",
    name: "Tan Geok Eng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan geok eng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_tan_yong_kee",
    name: "Tan Yong Kee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan yong kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_teo_kiang_huat",
    name: "Teo Kiang Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "teo kiang huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_tiong_lee_lim",
    name: "Tiong Lee Lim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tiong lee lim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_andhra_heritage_pte_ltd",
    name: "Andhra Heritage Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "andhra heritage pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_big_bern_s_american_grill_xpolis_pte_ltd",
    name: "Big Bern'S American Grill Xpolis Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "big bern's american grill xpolis pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_crown_empire_pte_limited",
    name: "Crown Empire Pte. Limited",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "crown empire pte. limited"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_mcbistro_pte_ltd",
    name: "Mcbistro Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcbistro pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_two_wings_organisation_pte_ltd",
    name: "Two Wings Organisation Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "two wings organisation pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_chin_shen_khye",
    name: "Chin Shen Khye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chin shen khye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_panipak_yong",
    name: "Panipak Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "panipak yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_tock_poh_lian",
    name: "Tock Poh Lian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tock poh lian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_ang_kor_huat",
    name: "Ang Kor Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang kor huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_anthony_tay_seng_boon",
    name: "Anthony Tay Seng Boon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "anthony tay seng boon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_chang_chee_keong",
    name: "Chang Chee Keong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang chee keong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_chee_yew_khuen",
    name: "Chee Yew Khuen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chee yew khuen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_abd_latiff_bin_kunji_ahmad",
    name: "Abd Latiff Bin Kunji Ahmad",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abd latiff bin kunji ahmad"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_ee_eng_leong",
    name: "Ee Eng Leong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ee eng leong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_how_jee_kim",
    name: "How Jee Kim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "how jee kim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_lai_kum_yip_lai_kum_yoke",
    name: "Lai Kum Yip @ Lai Kum Yoke",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lai kum yip @ lai kum yoke"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_lim_geok_sim",
    name: "Lim Geok Sim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim geok sim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_lim_poh_hua",
    name: "Lim Poh Hua",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim poh hua"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_goh_leng_hua",
    name: "Goh Leng Hua",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh leng hua"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_goh_lum_eng",
    name: "Goh Lum Eng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh lum eng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_goh_miah_liang",
    name: "Goh Miah Liang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh miah liang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_ho_kian_tat",
    name: "Ho Kian Tat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho kian tat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_kenlee_tan_soon_wah",
    name: "Kenlee Tan Soon Wah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kenlee tan soon wah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_khng_lee_po_alice_chung_yoke_lan",
    name: "Khng Lee Po Alice @Chung Yoke Lan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "khng lee po alice @chung yoke lan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_ang_siau_lai",
    name: "Ang Siau Lai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang siau lai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_chan_siah_leng",
    name: "Chan Siah Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan siah leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_chhua_youu_kian",
    name: "Chhua Youu Kian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chhua youu kian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_chua_chwee_lian",
    name: "Chua Chwee Lian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua chwee lian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_goh_boon_heng_wu_wenxing",
    name: "Goh Boon Heng (Wu Wenxing)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh boon heng (wu wenxing)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_isnin_bin_salim",
    name: "Isnin Bin Salim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "isnin bin salim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_ab_ghani_bin_ma_asin",
    name: "Ab Ghani Bin Ma'Asin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ab ghani bin ma'asin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_catherine_chng_ah_heng",
    name: "Catherine Chng Ah Heng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "catherine chng ah heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_chew_teng_ann_zhou_ting_an",
    name: "Chew Teng Ann (Zhou Ting'An)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chew teng ann (zhou ting'an)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_chia_poh_cheng",
    name: "Chia Poh Cheng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia poh cheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_chin_chun_yoong",
    name: "Chin Chun Yoong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chin chun yoong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_chin_hon_yin",
    name: "Chin Hon Yin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chin hon yin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_ang_char_boh",
    name: "Ang Char Boh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang char boh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_chua_gek_yong",
    name: "Chua Gek Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua gek yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_lai_seow_ching",
    name: "Lai Seow Ching",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lai seow ching"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_lim_chin_sing",
    name: "Lim Chin Sing",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim chin sing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_lim_hang_tong",
    name: "Lim Hang Tong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim hang tong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_ngern_jwee_chye",
    name: "Ngern Jwee Chye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ngern jwee chye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_chua_chow_yong",
    name: "Chua Chow Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua chow yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_ee_hoe_soon",
    name: "Ee Hoe Soon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ee hoe soon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_foo_see_tong",
    name: "Foo See Tong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "foo see tong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_goh_rong_jie_billy_wu_rongjie",
    name: "Goh Rong Jie, Billy (Wu Rongjie)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh rong jie, billy (wu rongjie)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_goh_rong_jie_billy_wu_rongjie_2",
    name: "Goh Rong Jie, Billy (Wu Rongjie)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh rong jie, billy (wu rongjie)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_kong_kam_yau",
    name: "Kong Kam Yau",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kong kam yau"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_chan_sook_kheng",
    name: "Chan Sook Kheng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan sook kheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_chong_yik_hwee_chong_chin_yew",
    name: "Chong Yik Hwee @ Chong Chin Yew",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong yik hwee @ chong chin yew"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_chow_kum_yew",
    name: "Chow Kum Yew",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chow kum yew"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_gan_bee_guat",
    name: "Gan Bee Guat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gan bee guat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_koh_kia_wui_xu_jiawei",
    name: "Koh Kia Wui (Xu Jiawei)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh kia wui (xu jiawei)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_koufu_gourmet_pte_ltd",
    name: "Koufu Gourmet Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koufu gourmet pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_ho_yuen_khow",
    name: "Ho Yuen Khow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho yuen khow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_lou_boh_seng",
    name: "Lou Boh Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lou boh seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_ng_pee_tee",
    name: "Ng Pee Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng pee tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_phua_swee_gek",
    name: "Phua Swee Gek",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "phua swee gek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_tan_toh_huat",
    name: "Tan Toh Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan toh huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_teo_soo_choo",
    name: "Teo Soo Choo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "teo soo choo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_koh_jee_wan",
    name: "Koh Jee Wan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh jee wan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_tee_hock_ban",
    name: "Tee Hock Ban",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tee hock ban"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_abdul_rahim_bin_mohd_sana",
    name: "Abdul Rahim Bin Mohd Sana",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul rahim bin mohd sana"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_abdul_rahman_bin_suradi",
    name: "Abdul Rahman Bin Suradi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul rahman bin suradi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_abdulaleem_s_o_abdul_latiff",
    name: "Abdulaleem S/O Abdul Latiff",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdulaleem s/o abdul latiff"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_ang_cheng_yong",
    name: "Ang Cheng Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang cheng yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_ashraf_hamdon_abdelaleim_hussein",
    name: "Ashraf Hamdon Abdelaleim Hussein",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ashraf hamdon abdelaleim hussein"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_chan_chee_khuen",
    name: "Chan Chee Khuen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan chee khuen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_goh_jee_tee",
    name: "Goh Jee Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh jee tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_goh_jee_tee_2",
    name: "Goh Jee Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh jee tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_koh_cheun_meng",
    name: "Koh Cheun Meng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh cheun meng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_lee_kee_yeo_lee_lian_hong",
    name: "Lee Kee Yeo @Lee Lian Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee kee yeo @lee lian hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_abdul_rahim_bin_noor_mohamed",
    name: "Abdul Rahim Bin Noor Mohamed",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul rahim bin noor mohamed"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_akbar_ali_bin_abdul_hameed",
    name: "Akbar Ali Bin Abdul Hameed",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "akbar ali bin abdul hameed"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_ang_hwee_choo",
    name: "Ang Hwee Choo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang hwee choo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_au_jiahao_alex",
    name: "Au Jiahao, Alex",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "au jiahao, alex"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_chan_cheow_teck",
    name: "Chan Cheow Teck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan cheow teck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_chan_kok_hee_tian_guoxi",
    name: "Chan Kok Hee (Tian Guoxi)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan kok hee (tian guoxi)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_chow_sai_peng",
    name: "Chow Sai Peng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chow sai peng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_eng_kwang_chiang",
    name: "Eng Kwang Chiang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "eng kwang chiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_halilur_rahman",
    name: "Halilur Rahman",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "halilur rahman"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_koh_tah_leng",
    name: "Koh Tah Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh tah leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_lee_kia_fook",
    name: "Lee Kia Fook",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee kia fook"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_lee_seng_tiong",
    name: "Lee Seng Tiong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee seng tiong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_tan_boon_kwang",
    name: "Tan Boon Kwang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan boon kwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_akberali_bin_a_p_abdul_hameed",
    name: "Akberali Bin A P Abdul Hameed",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "akberali bin a p abdul hameed"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_faziah_binte_sa_at",
    name: "Faziah Binte Sa'At",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "faziah binte sa'at"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_jasmine_yap_ming_teng",
    name: "Jasmine Yap Ming Teng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jasmine yap ming teng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_lee_shing",
    name: "Lee Shing",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee shing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_leong_yim_ying",
    name: "Leong Yim Ying",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "leong yim ying"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_lim_swee_hiok",
    name: "Lim Swee Hiok",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim swee hiok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_chen_shaozhen",
    name: "Chen Shaozhen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen shaozhen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_ng_guek_eng",
    name: "Ng Guek Eng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng guek eng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc foodfare co-operative ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_poh_chee_geok",
    name: "Poh Chee Geok",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "poh chee geok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_shahul_hameed_raikan_beevi",
    name: "Shahul Hameed Raikan Beevi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "shahul hameed raikan beevi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_tan_lucy",
    name: "Tan Lucy",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan lucy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_chan_puay_hng",
    name: "Chan Puay Hng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan puay hng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_li_yuzhen",
    name: "Li Yuzhen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "li yuzhen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_ng_aik_hoong",
    name: "Ng Aik Hoong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng aik hoong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_pek_kian_seng",
    name: "Pek Kian Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pek kian seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_tan_siang_keow",
    name: "Tan Siang Keow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan siang keow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_wong_toa_mui",
    name: "Wong Toa Mui",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "wong toa mui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_ang_wah_tee",
    name: "Ang Wah Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang wah tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_haslinah_bte_mohd_khair",
    name: "Haslinah Bte Mohd Khair",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "haslinah bte mohd khair"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_lim_chin_kwang",
    name: "Lim Chin Kwang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim chin kwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_teo_boon_sing",
    name: "Teo Boon Sing",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "teo boon sing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_ng_tee_meng",
    name: "Ng Tee Meng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng tee meng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_ong_yuan_jun",
    name: "Ong Yuan Jun",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ong yuan jun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_chan_mun_yew_chen_wenyao",
    name: "Chan Mun Yew (Chen Wenyao)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan mun yew (chen wenyao)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_martin_yip_jia_hong",
    name: "Martin Yip Jia Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "martin yip jia hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_neo_cheng_leong",
    name: "Neo Cheng Leong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "neo cheng leong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_ong_ting_kang",
    name: "Ong Ting Kang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ong ting kang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_yeo_yoke_gen",
    name: "Yeo Yoke Gen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "yeo yoke gen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_abdul_hamid_bin_dollah",
    name: "Abdul Hamid Bin Dollah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul hamid bin dollah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_ang_lau_aik",
    name: "Ang Lau Aik",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang lau aik"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_chee_ah_eng",
    name: "Chee Ah Eng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chee ah eng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_chew_ban_koon",
    name: "Chew Ban Koon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chew ban koon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_chng_yiam_nguen",
    name: "Chng Yiam Nguen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chng yiam nguen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_ng_ah_boo",
    name: "Ng Ah Boo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng ah boo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_ong_kim_tee",
    name: "Ong Kim Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ong kim tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_chan_nung_kiang",
    name: "Chan Nung Kiang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan nung kiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_chan_yeok_kin",
    name: "Chan Yeok Kin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan yeok kin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_chia_geok_tin",
    name: "Chia Geok Tin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia geok tin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_chua_wee_liang",
    name: "Chua Wee Liang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua wee liang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_er_soo_liang",
    name: "Er Soo Liang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "er soo liang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_foo_choon_yee",
    name: "Foo Choon Yee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "foo choon yee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_aw_cher_ngang",
    name: "Aw Cher Ngang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "aw cher ngang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_ng_son_yan",
    name: "Ng Son Yan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng son yan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_ow_cher_hong",
    name: "Ow Cher Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ow cher hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_tan_ai_lin",
    name: "Tan Ai Lin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan ai lin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_tan_yat_hoon",
    name: "Tan Yat Hoon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan yat hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_ang_ann_chye",
    name: "Ang Ann Chye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang ann chye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_creme_works_private_limited",
    name: "Creme Works Private Limited",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "creme works private limited"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_ang_seng_yong",
    name: "Ang Seng Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang seng yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_chan_mei_chui",
    name: "Chan Mei Chui",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan mei chui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_chen_ying",
    name: "Chen Ying",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen ying"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_chen_youyun",
    name: "Chen Youyun",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen youyun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_chong_kwai_choy",
    name: "Chong Kwai Choy",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong kwai choy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_ahmad_tarmizi_bin_masderbari",
    name: "Ahmad Tarmizi Bin Masderbari",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ahmad tarmizi bin masderbari"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_cai_jiaming",
    name: "Cai Jiaming",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cai jiaming"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_chan_chu_kwang",
    name: "Chan Chu Kwang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan chu kwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_chng_eng_pin",
    name: "Chng Eng Pin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chng eng pin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_chng_siew_leng",
    name: "Chng Siew Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chng siew leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_erh_chiang_ngiap",
    name: "Erh Chiang Ngiap",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "erh chiang ngiap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_choy_mee_leng",
    name: "Choy Mee Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "choy mee leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_kwa_hian_tiong",
    name: "Kwa Hian Tiong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kwa hian tiong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_lai_ah_noi",
    name: "Lai Ah Noi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lai ah noi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_lee_wai_ming",
    name: "Lee Wai Ming",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee wai ming"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_lim_ah_hwee",
    name: "Lim Ah Hwee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim ah hwee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_low_hua_boon",
    name: "Low Hua Boon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "low hua boon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_chan_kin_song",
    name: "Chan Kin Song",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan kin song"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_chan_mui_choo",
    name: "Chan Mui Choo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan mui choo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_chew_boon_heng",
    name: "Chew Boon Heng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chew boon heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_eu_yam_heng",
    name: "Eu Yam Heng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "eu yam heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_goh_choong_ling",
    name: "Goh Choong Ling",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh choong ling"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_goh_liang_joo",
    name: "Goh Liang Joo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh liang joo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_azizah_abdullah_hazizah_binte_haji_abdul_razak",
    name: "Azizah Abdullah @Hazizah Binte Haji Abdul Razak",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "azizah abdullah @hazizah binte haji abdul razak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_chan_chong_meng",
    name: "Chan Chong Meng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan chong meng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_cheang_leong_peng",
    name: "Cheang Leong Peng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheang leong peng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_chee_cheong_lan",
    name: "Chee Cheong Lan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chee cheong lan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_chua_geok_kee",
    name: "Chua Geok Kee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua geok kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_danis_lim_eng_thiam",
    name: "Danis Lim Eng Thiam",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "danis lim eng thiam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_aminah_bte_bakar",
    name: "Aminah Bte Bakar",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "aminah bte bakar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_aminuddin_bin_hashim",
    name: "Aminuddin Bin Hashim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "aminuddin bin hashim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_asnah_bte_slamat",
    name: "Asnah Bte Slamat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "asnah bte slamat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_bajar_rahman_syed_abuthahir",
    name: "Bajar Rahman Syed Abuthahir",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bajar rahman syed abuthahir"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_chang_ah_say",
    name: "Chang Ah Say",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang ah say"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_chua_eng_hock",
    name: "Chua Eng Hock",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua eng hock"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_khoo_tong_boon",
    name: "Khoo Tong Boon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "khoo tong boon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_low_ying_hin_liu_yanxing",
    name: "Low Ying Hin (Liu Yanxing)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "low ying hin (liu yanxing)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_tan_kwang_chai",
    name: "Tan Kwang Chai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan kwang chai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_chia_hung_yong",
    name: "Chia Hung Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia hung yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_chin_tchin_moi_chin_chin_moi",
    name: "Chin Tchin Moi @ Chin Chin Moi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chin tchin moi @ chin chin moi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_chua_meow_ching",
    name: "Chua Meow Ching",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua meow ching"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_kan_tiang_huat",
    name: "Kan Tiang Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kan tiang huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_leo_mui_lin",
    name: "Leo Mui Lin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "leo mui lin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_ng_hock_loo",
    name: "Ng Hock Loo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng hock loo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_ng_lay_hoon",
    name: "Ng Lay Hoon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng lay hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc foodfare co-operative ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_peh_hoon_hui",
    name: "Peh Hoon Hui",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "peh hoon hui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_chan_tuck_cheong",
    name: "Chan Tuck Cheong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan tuck cheong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_hui_tee_ying",
    name: "Hui Tee Ying",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hui tee ying"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_lee_bee_lan",
    name: "Lee Bee Lan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee bee lan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_lin_shiying",
    name: "Lin Shiying",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lin shiying"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_minah_binte_ahmad",
    name: "Minah Binte Ahmad",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "minah binte ahmad"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_ng_geok_lian",
    name: "Ng Geok Lian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng geok lian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc foodfare co-operative ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_alan_lim",
    name: "Alan Lim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alan lim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_ha_siew_hong",
    name: "Ha Siew Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ha siew hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_henny",
    name: "Henny",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "henny"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_hon_siang_long",
    name: "Hon Siang Long",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hon siang long"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_kang_soh_chye",
    name: "Kang Soh Chye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kang soh chye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_alias_bin_suradi",
    name: "Alias Bin Suradi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alias bin suradi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_cher_kay_hiong",
    name: "Cher Kay Hiong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cher kay hiong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_chu_hung_peng",
    name: "Chu Hung Peng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chu hung peng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_chu_nam_kiu",
    name: "Chu Nam Kiu",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chu nam kiu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_chua_kian_teck",
    name: "Chua Kian Teck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua kian teck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_huang_jialin",
    name: "Huang Jialin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "huang jialin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_china_square_food_centre_pte_ltd",
    name: "China Square Food Centre Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "china square food centre pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_crema_hound_pte_ltd",
    name: "Crema & Hound Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "crema & hound pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_e_p_cafeteria_pte_ltd",
    name: "E&P Cafeteria Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "e&p cafeteria pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_fresh_fire_pte_ltd",
    name: "Fresh Fire Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fresh fire pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_goh_chai_seng",
    name: "Goh Chai Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh chai seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_jex_pte_ltd",
    name: "Jex Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jex pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_abdul_rahman_bin_abu",
    name: "Abdul Rahman Bin Abu",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul rahman bin abu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_chen_kok_keong",
    name: "Chen Kok Keong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen kok keong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_chiang_poh_nai",
    name: "Chiang Poh Nai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chiang poh nai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_chin_lee_fung",
    name: "Chin Lee Fung",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chin lee fung"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_chong_fu_voon",
    name: "Chong Fu Voon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong fu voon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_eng_siak_yong",
    name: "Eng Siak Yong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "eng siak yong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "11_telok_blangah_crescent_market_and_food_centre_alvin_loke_yin_lum_loke_wing_kh",
    name: "Alvin Loke Yin Lum @Loke Wing Kheong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alvin loke yin lum @loke wing kheong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "11_telok_blangah_crescent_market_and_food_centre_chan_huaya_edmond",
    name: "Chan Huaya, Edmond",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan huaya, edmond"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "11_telok_blangah_crescent_market_and_food_centre_chang_ai_nee",
    name: "Chang Ai Nee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang ai nee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "11_telok_blangah_crescent_market_and_food_centre_ho_poh_chee_ang_lay_hua",
    name: "Ho Poh Chee @Ang Lay Hua",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho poh chee @ang lay hua"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "11_telok_blangah_crescent_market_and_food_centre_lee_su_hing",
    name: "Lee Su Hing",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee su hing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "11_telok_blangah_crescent_market_and_food_centre_liew_bok_choon",
    name: "Liew Bok Choon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "liew bok choon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_ang_siew_tin",
    name: "Ang Siew Tin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang siew tin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_chan_kim_siong",
    name: "Chan Kim Siong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan kim siong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_chan_sock_chin",
    name: "Chan Sock Chin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan sock chin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_chan_teng_kok",
    name: "Chan Teng Kok",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan teng kok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_chau_yok_cheng",
    name: "Chau Yok Cheng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chau yok cheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_chen_kin_fatt",
    name: "Chen Kin Fatt",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen kin fatt"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_115_bukit_merah_view_market_and_food_centre_ahamed_ansari",
    name: "Ahamed Ansari",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ahamed ansari"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_115_bukit_merah_view_market_and_food_centre_ang_hock_peng",
    name: "Ang Hock Peng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang hock peng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_115_bukit_merah_view_market_and_food_centre_arbiah_binte_abdul_karim",
    name: "Arbiah Binte Abdul Karim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "arbiah binte abdul karim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_115_bukit_merah_view_market_and_food_centre_bahera_binti_misal",
    name: "Bahera Binti Misal",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bahera binti misal"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_115_bukit_merah_view_market_and_food_centre_boo_yew_chye",
    name: "Boo Yew Chye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "boo yew chye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_115_bukit_merah_view_market_and_food_centre_check_yeng_chew",
    name: "Check Yeng Chew",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "check yeng chew"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_chua_tai_tha",
    name: "Chua Tai Tha",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua tai tha"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_huang_yin",
    name: "Huang Yin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "huang yin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_lek_cha_boh",
    name: "Lek Cha Boh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lek cha boh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_ng_thian_kuang",
    name: "Ng Thian Kuang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng thian kuang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_tan_song_peow",
    name: "Tan Song Peow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tan song peow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_yeo_siang_cheng",
    name: "Yeo Siang Cheng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "yeo siang cheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_abdul_rahman_bin_ismail",
    name: "Abdul Rahman Bin Ismail",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul rahman bin ismail"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_ang_nam_seng",
    name: "Ang Nam Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang nam seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_athabor_rahaman",
    name: "Athabor Rahaman",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "athabor rahaman"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_cheng_chang_boo_chiang_chang_boo",
    name: "Cheng Chang Boo @Chiang Chang Boo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheng chang boo @chiang chang boo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_chong_siew_keong",
    name: "Chong Siew Keong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong siew keong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_eng_kow_muay",
    name: "Eng Kow Muay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "eng kow muay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_ang_poh_huat",
    name: "Ang Poh Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang poh huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_ang_siew_tee",
    name: "Ang Siew Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang siew tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_ceng_a_kiaw",
    name: "Ceng A Kiaw",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ceng a kiaw"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_chan_swee_pheow",
    name: "Chan Swee Pheow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan swee pheow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_chee_wei_liang_xu_weiliang",
    name: "Chee Wei Liang (Xu Weiliang)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chee wei liang (xu weiliang)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_chew_choh_khian",
    name: "Chew Choh Khian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chew choh khian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_chan_sasithon",
    name: "Chan Sasithon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan sasithon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_cheah_yin_hoi",
    name: "Cheah Yin Hoi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheah yin hoi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_cheong_siew_heng",
    name: "Cheong Siew Heng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheong siew heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_chok_leng_leng",
    name: "Chok Leng Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chok leng leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_hong_hee_seng",
    name: "Hong Hee Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hong hee seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_hoon_siew_chiew_angeline_hong_xiuqiu",
    name: "Hoon Siew Chiew, Angeline @ Hong Xiuqiu, Angeline",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hoon siew chiew, angeline @ hong xiuqiu, angeline"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_4a_jalan_batu_hawker_centre_market_chua_chung_hui_wah",
    name: "Chua Chung Hui Wah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua chung hui wah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_4a_jalan_batu_hawker_centre_market_fatana_bte_fatah",
    name: "Fatana Bte Fatah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fatana bte fatah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_4a_jalan_batu_hawker_centre_market_kam_siew_choo",
    name: "Kam Siew Choo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kam siew choo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_4a_jalan_batu_hawker_centre_market_kang_choon_chuan",
    name: "Kang Choon Chuan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kang choon chuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_4a_jalan_batu_hawker_centre_market_lee_geok_hong",
    name: "Lee Geok Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee geok hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_4a_jalan_batu_hawker_centre_market_lee_say_chai",
    name: "Lee Say Chai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee say chai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_112_jalan_bukit_merah_market_and_food_centre_hia_kok_soon_jason",
    name: "Hia Kok Soon, Jason",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hia kok soon, jason"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_112_jalan_bukit_merah_market_and_food_centre_leow_eng_kuan",
    name: "Leow Eng Kuan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "leow eng kuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_112_jalan_bukit_merah_market_and_food_centre_lim_choong_wah",
    name: "Lim Choong Wah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim choong wah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_112_jalan_bukit_merah_market_and_food_centre_lim_lay_hong",
    name: "Lim Lay Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim lay hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_112_jalan_bukit_merah_market_and_food_centre_phua_choon_lan",
    name: "Phua Choon Lan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "phua choon lan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_112_jalan_bukit_merah_market_and_food_centre_abdalifu_rajeedkhan",
    name: "Abdalifu Rajeedkhan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdalifu rajeedkhan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_abdul_ghani_bin_abdullah",
    name: "Abdul Ghani Bin Abdullah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdul ghani bin abdullah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_chai_kee_bee",
    name: "Chai Kee Bee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chai kee bee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_chia_pheng_meng",
    name: "Chia Pheng Meng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia pheng meng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_chong_how_siong",
    name: "Chong How Siong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong how siong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_kalsom_binte_ali_hasnah_binte_ali",
    name: "Kalsom Binte Ali @Hasnah Binte Ali",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kalsom binte ali @hasnah binte ali"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_kok_fu_chuen",
    name: "Kok Fu Chuen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kok fu chuen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jalan_leban_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jalan_leban_food_centre_lim_bock_seng",
    name: "Lim Bock Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim bock seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jalan_leban_food_centre_postre_casa_pte_ltd",
    name: "Postre Casa Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "postre casa pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jalan_leban_food_centre_yam_s_kitchen_pte_ltd",
    name: "Yam'S Kitchen Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "yam's kitchen pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jalan_leban_food_centre_cocoba_pte_ltd",
    name: "Cocoba Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cocoba pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jalan_leban_food_centre_lai_fak_nian",
    name: "Lai Fak Nian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lai fak nian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_goh_puan_huay",
    name: "Goh Puan Huay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh puan huay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_hayiyah_bte_hafid",
    name: "Hayiyah Bte Hafid",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hayiyah bte hafid"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_istimaya_isdalrina",
    name: "Istimaya Isdalrina",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "istimaya isdalrina"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_jaliha_binte_hodari",
    name: "Jaliha Binte Hodari",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jaliha binte hodari"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_koh_bee_lan",
    name: "Koh Bee Lan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh bee lan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_ang_boh_tan",
    name: "Ang Boh Tan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang boh tan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_azehar_bin_a_ghafar",
    name: "Azehar Bin A Ghafar",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "azehar bin a ghafar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_chua_ah_hiong",
    name: "Chua Ah Hiong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua ah hiong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_eng_hui",
    name: "Eng Hui",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "eng hui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_hap_ah_lam",
    name: "Hap Ah Lam",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hap ah lam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_julaiah_binte_samin",
    name: "Julaiah Binte Samin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "julaiah binte samin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_artemis_grill_pte_ltd",
    name: "Artemis Grill Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "artemis grill pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_asmah_binte_aman",
    name: "Asmah Binte Aman",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "asmah binte aman"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_blue_magnolia_pte_ltd",
    name: "Blue Magnolia Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "blue magnolia pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_chan_lee_choo",
    name: "Chan Lee Choo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan lee choo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_curry_san_pte_ltd",
    name: "Curry San Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "curry san pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_dimbulah_coffee_s_pte_ltd",
    name: "Dimbulah Coffee (S) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "dimbulah coffee (s) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_abdus_salam_s_o_akber_ali",
    name: "Abdus Salam S/O Akber Ali",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "abdus salam s/o akber ali"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_bachmann_japanese_restaurant_pte_ltd",
    name: "Bachmann Japanese Restaurant Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bachmann japanese restaurant pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_beach_cabana_pte_ltd",
    name: "Beach Cabana Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "beach cabana pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_bee_cheng_hiang_concept_pte_ltd",
    name: "Bee Cheng Hiang Concept Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bee cheng hiang concept pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_benfris_glory_pte_ltd",
    name: "Benfris Glory Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "benfris glory pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bengawan solo pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_fu_chan_f_b_group_pte_ltd",
    name: "Fu Chan F&B Group Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fu chan f&b group pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_hoon_kee_meng",
    name: "Hoon Kee Meng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hoon kee meng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_kentucky_fried_chicken_management_pte_ltd",
    name: "Kentucky Fried Chicken Management Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kentucky fried chicken management pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_ng_bee_bee",
    name: "Ng Bee Bee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng bee bee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_pizza_hut_singapore_pte_ltd",
    name: "Pizza Hut Singapore Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pizza hut singapore pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_ang_song_kiau",
    name: "Ang Song Kiau",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang song kiau"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_barakath_international_pte_ltd",
    name: "Barakath International Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "barakath international pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_chua_choon_lim",
    name: "Chua Choon Lim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua choon lim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_ho_yew_keong",
    name: "Ho Yew Keong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ho yew keong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_koh_loo_peng",
    name: "Koh Loo Peng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "koh loo peng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_al_borgo_pte_ltd",
    name: "Al Borgo Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "al borgo pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_chen_shaozhen",
    name: "Chen Shaozhen",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chen shaozhen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_ng_guek_eng",
    name: "Ng Guek Eng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng guek eng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc foodfare co-operative ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_poh_chee_geok",
    name: "Poh Chee Geok",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "poh chee geok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_shahul_hameed_raikan_beevi",
    name: "Shahul Hameed Raikan Beevi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "shahul hameed raikan beevi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_128_choices_eating_house_pte_ltd",
    name: "128 Choices Eating House Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "128 choices eating house pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_8lit_pte_ltd",
    name: "8Lit Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "8lit pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_a_thousand_blessings_pte_ltd",
    name: "A Thousand Blessings Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "a thousand blessings pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_agatha_tan_poh_tin",
    name: "Agatha Tan Poh Tin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "agatha tan poh tin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_chai_wai_keng",
    name: "Chai Wai Keng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chai wai keng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd",
    name: "Chang Cheng Food Paradise Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang cheng food paradise pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_balance_delight_pte_ltd",
    name: "Balance Delight Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "balance delight pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_khoo_lor_huat",
    name: "Khoo Lor Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "khoo lor huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_lim_hock_leong_lin_fulong",
    name: "Lim Hock Leong (Lin Fulong)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim hock leong (lin fulong)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_matson_food_beverage_pte_ltd",
    name: "Matson Food & Beverage Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "matson food & beverage pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_pizza_hut_singapore_pte_ltd",
    name: "Pizza Hut Singapore Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pizza hut singapore pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_angeledevi_d_o_p_m_p_ganesan",
    name: "Angeledevi D/O P M P Ganesan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "angeledevi d/o p m p ganesan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_chang_lai_pte_ltd",
    name: "Chang Lai Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang lai pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_haslina_bt_hassan",
    name: "Haslina Bt Hassan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "haslina bt hassan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_how_ah_lai",
    name: "How Ah Lai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "how ah lai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_lim_bee_yoong",
    name: "Lim Bee Yoong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim bee yoong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_lim_yen_lin",
    name: "Lim Yen Lin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim yen lin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_amk443_eating_house_pte_ltd",
    name: "Amk443 Eating House Pte.Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "amk443 eating house pte.ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_chee_kiat_hoe_xu_jiehe",
    name: "Chee Kiat Hoe (Xu Jiehe)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chee kiat hoe (xu jiehe)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheers holdings (2004) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_chow_chee_peng_jason_zou_zhiping",
    name: "Chow Chee Peng Jason (Zou Zhiping)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chow chee peng jason (zou zhiping)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_cold_storage_singapore_1983_pte_ltd_2",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_amk443_eating_house_pte_ltd",
    name: "Amk443 Eating House Pte.Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "amk443 eating house pte.ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_chee_kiat_hoe_xu_jiehe",
    name: "Chee Kiat Hoe (Xu Jiehe)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chee kiat hoe (xu jiehe)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheers holdings (2004) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_chow_chee_peng_jason_zou_zhiping",
    name: "Chow Chee Peng Jason (Zou Zhiping)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chow chee peng jason (zou zhiping)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_cold_storage_singapore_1983_pte_ltd_2",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_chua_swee_soon",
    name: "Chua Swee Soon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua swee soon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_elixir_juice_pte_ltd",
    name: "Elixir Juice Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "elixir juice pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_gim_tim_pte_ltd",
    name: "Gim Tim Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gim tim pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_ng_get_lian",
    name: "Ng Get Lian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng get lian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_chua_swee_soon",
    name: "Chua Swee Soon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua swee soon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_elixir_juice_pte_ltd",
    name: "Elixir Juice Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "elixir juice pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_gim_tim_pte_ltd",
    name: "Gim Tim Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gim tim pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_ng_get_lian",
    name: "Ng Get Lian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng get lian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_alvin_sabai",
    name: "Alvin Sabai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alvin sabai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_ang_hwei_ling_hong_huiling",
    name: "Ang Hwei Ling ( Hong Huiling )",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang hwei ling ( hong huiling )"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_cafe_galilee_pte_ltd",
    name: "Cafe Galilee Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cafe galilee pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_choo_siew_ping",
    name: "Choo Siew Ping",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "choo siew ping"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_chu_sing_kuang",
    name: "Chu Sing Kuang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chu sing kuang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bengawan solo pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_domino_s_pizza_singapore_pte_ltd",
    name: "Domino'S Pizza Singapore Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "domino's pizza singapore pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_foo_choong_yin",
    name: "Foo Choong Yin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "foo choong yin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_ntuc_club",
    name: "Ntuc Club",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc club"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_pin_xiang_yan_holding_pte_ltd",
    name: "Pin Xiang Yan Holding Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pin xiang yan holding pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheers holdings (2004) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_cold_storage_singapore_1983_pte_ltd_2",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_elfyzawaty_binte_sulaiman_ibrahim",
    name: "Elfyzawaty Binte Sulaiman Ibrahim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "elfyzawaty binte sulaiman ibrahim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_gptg_management_pte_ltd",
    name: "Gptg Management Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gptg management pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_j_c_unity_pte_ltd",
    name: "J&C Unity Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "j&c unity pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheers holdings (2004) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_cold_storage_singapore_1983_pte_ltd_2",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_elfyzawaty_binte_sulaiman_ibrahim",
    name: "Elfyzawaty Binte Sulaiman Ibrahim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "elfyzawaty binte sulaiman ibrahim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_gptg_management_pte_ltd",
    name: "Gptg Management Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gptg management pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_j_c_unity_pte_ltd",
    name: "J&C Unity Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "j&c unity pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_bangkok_street_mookata_pte_ltd",
    name: "Bangkok Street Mookata Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bangkok street mookata pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_boss_junior_group_private_limited",
    name: "Boss Junior Group Private Limited",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "boss junior group private limited"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_fortune_food_s_pte_ltd",
    name: "Fortune Food (S) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fortune food (s) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_frozt_pte_ltd",
    name: "Frozt Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "frozt pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_j_k_kings_prata_pte_ltd",
    name: "J K Kings Prata Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "j k kings prata pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_wonderful_management_pte_ltd",
    name: "Wonderful Management Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "wonderful management pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_chevron_singapore_pte_ltd",
    name: "Chevron Singapore Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chevron singapore pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_d_successo_pte_ltd",
    name: "D'' Successo Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "d'' successo pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_gateau_pte_ltd",
    name: "Gateau Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "gateau pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_jojerie_pte_ltd",
    name: "Jojerie Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jojerie pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_pang_sook_leng",
    name: "Pang Sook Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pang sook leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_qeetrade_singapore_pte_ltd",
    name: "Qeetrade (Singapore) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "qeetrade (singapore) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_naranjan_singh_s_o_jaswant_singh",
    name: "Naranjan Singh S/O Jaswant Singh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "naranjan singh s/o jaswant singh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_new_century_food_house_721_pte_ltd",
    name: "New Century Food House @ 721 Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "new century food house @ 721 pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_cheong_lok_food_marketing_pte_ltd",
    name: "Cheong Lok Food Marketing Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheong lok food marketing pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_chia_kok_wah",
    name: "Chia Kok Wah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia kok wah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_ee_chye_teck",
    name: "Ee Chye Teck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ee chye teck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd",
    name: "Alpha Subs Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alpha subs pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_berrylite_parkway_pte_ltd",
    name: "Berrylite Parkway Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "berrylite parkway pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_bliss_restaurant_pte_ltd",
    name: "Bliss Restaurant Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bliss restaurant pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_breadtalk_pte_ltd",
    name: "Breadtalk Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "breadtalk pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_chong_yo_private_limited",
    name: "Chong Yo Private Limited",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong yo private limited"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_ang_hwee_cheng",
    name: "Ang Hwee Cheng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang hwee cheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_anytime_food_pte_ltd",
    name: "Anytime Food Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "anytime food pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd",
    name: "Bachmann Japanese Restaurant Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bachmann japanese restaurant pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bengawan solo pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_breadtalk_pte_ltd",
    name: "Breadtalk Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "breadtalk pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_casey_tan_kar_huat",
    name: "Casey Tan Kar Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "casey tan kar huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_a_esa_binte_ismail",
    name: "A'Esa Binte Ismail",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "a'esa binte ismail"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_aw_siow_ping_audrey",
    name: "Aw Siow Ping,Audrey",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "aw siow ping,audrey"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_golden_rooster_pte_ltd",
    name: "Golden Rooster Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "golden rooster pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_jamilah_binte_rasul",
    name: "Jamilah Binte Rasul",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jamilah binte rasul"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_jiang_huihong",
    name: "Jiang Huihong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jiang huihong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_ang_mui_guat",
    name: "Ang Mui Guat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang mui guat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd",
    name: "Boon Tong Kee Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "boon tong kee pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_hamisah_bte_ahmad",
    name: "Hamisah Bte Ahmad",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hamisah bte ahmad"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_loh_ai_gek",
    name: "Loh Ai Gek",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "loh ai gek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_loo_poh_kien",
    name: "Loo Poh Kien",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "loo poh kien"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_low_may_lan",
    name: "Low May Lan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "low may lan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_ang_kim_hua_hong_jinhua",
    name: "Ang Kim Hua (Hong Jinhua)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang kim hua (hong jinhua)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_goh_keow_huay",
    name: "Goh Keow Huay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh keow huay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_jnr_food_pte_ltd",
    name: "Jnr Food Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jnr food pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_katijah_bte_mammu",
    name: "Katijah Bte Mammu",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "katijah bte mammu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_kiang_siang_heng",
    name: "Kiang Siang Heng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kiang siang heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd",
    name: "Lee Kwang Kee Groups Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee kwang kee groups pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_amat_bin_jantan",
    name: "Amat Bin Jantan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "amat bin jantan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_ang_lye_seng",
    name: "Ang Lye Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang lye seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_ang_siam_ngo",
    name: "Ang Siam Ngo",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang siam ngo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_domino_s_pizza_singapore_pte_ltd",
    name: "Domino'S Pizza Singapore Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "domino's pizza singapore pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_fei_siong_f_b_holdings_pte_ltd",
    name: "Fei Siong (F&B) Holdings Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fei siong (f&b) holdings pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yishun_park_hawker_centre_hasanah_binte_ahmad",
    name: "Hasanah Binte Ahmad",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hasanah binte ahmad"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yishun_park_hawker_centre_heng_kia_tuck",
    name: "Heng Kia Tuck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "heng kia tuck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yishun_park_hawker_centre_hong_wee_siong",
    name: "Hong Wee Siong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "hong wee siong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yishun_park_hawker_centre_kumpor_sae_chew",
    name: "Kumpor Sae Chew",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kumpor sae chew"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yishun_park_hawker_centre_pure_coffee_house_pte_ltd",
    name: "Pure Coffee House Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pure coffee house pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yishun_park_hawker_centre_shia_siew_huay",
    name: "Shia Siew Huay",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "shia siew huay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_bibjan_bte_ali_zaman",
    name: "Bibjan Bte Ali Zaman",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bibjan bte ali zaman"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_cafe_galilee_pte_ltd",
    name: "Cafe Galilee Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cafe galilee pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_chan_tai_seng",
    name: "Chan Tai Seng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan tai seng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_cheong_siew_kum",
    name: "Cheong Siew Kum",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheong siew kum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_chiang_meng_tye",
    name: "Chiang Meng Tye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chiang meng tye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_goh_hin_chiang",
    name: "Goh Hin Chiang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh hin chiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_chia_cher_khiang",
    name: "Chia Cher Khiang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chia cher khiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_commonwealth_retail_concepts_pte_ltd",
    name: "Commonwealth Retail Concepts Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "commonwealth retail concepts pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_ysq_f_b_pte_ltd",
    name: "Ysq F&B Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ysq f&b pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_chodee_food_holdings_pte_ltd",
    name: "Chodee Food Holdings Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chodee food holdings pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_goh_sin_keat",
    name: "Goh Sin Keat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh sin keat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_azali_bin_dankarna",
    name: "Azali Bin Dankarna",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "azali bin dankarna"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_chiang_ken_weng",
    name: "Chiang Ken Weng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chiang ken weng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_broadway_food_centre_holdings_pte_ltd",
    name: "Broadway Food Centre (Holdings) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "broadway food centre (holdings) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_haji_karim_prata_palace_pte_ltd",
    name: "Haji Karim Prata Palace Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "haji karim prata palace pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_kopitiam_investment_pte_ltd",
    name: "Kopitiam Investment Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kopitiam investment pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_canberra_hawker_centre_chang_cheng_food_paradise_pte_ltd",
    name: "Chang Cheng Food Paradise Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang cheng food paradise pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_canberra_hawker_centre_chua_beng_tee",
    name: "Chua Beng Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chua beng tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_canberra_hawker_centre_fu_chan_f_b_group_pte_ltd",
    name: "Fu Chan F&B Group Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fu chan f&b group pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_canberra_hawker_centre_fu_chan_f_b_pte_ltd",
    name: "Fu Chan F&B Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fu chan f&b pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_canberra_hawker_centre_garden_cuisine_pte_ltd",
    name: "Garden Cuisine Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "garden cuisine pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_canberra_hawker_centre_lin_juan",
    name: "Lin Juan",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lin juan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "punggol_coast_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "punggol_coast_hawker_centre_chun_kheng_leng",
    name: "Chun Kheng Leng",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chun kheng leng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "punggol_coast_hawker_centre_how_wei_pte_ltd",
    name: "How Wei Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "how wei pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "punggol_coast_hawker_centre_ng_huat_kee",
    name: "Ng Huat Kee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ng huat kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "punggol_coast_hawker_centre_seow_chun_kiat",
    name: "Seow Chun Kiat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "seow chun kiat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd",
    name: "Srisun Prata . Com Food Holding'S Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "srisun prata . com food holding's pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_akbar_bin_mohamad",
    name: "Akbar Bin Mohamad",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "akbar bin mohamad"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_ang_ah_boy",
    name: "Ang Ah Boy",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang ah boy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_ang_ah_leck",
    name: "Ang Ah Leck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang ah leck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_ang_soon",
    name: "Ang Soon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang soon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_boo_meng_tee",
    name: "Boo Meng Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "boo meng tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_chan_chee_chung",
    name: "Chan Chee Chung",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan chee chung"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_117_aljunied_market_and_food_centre_fast_food_xpress_aljunied_pte_ltd",
    name: "Fast Food Xpress @ Aljunied Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fast food xpress @ aljunied pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_117_aljunied_market_and_food_centre_fragrance_foodstuff_pte_ltd",
    name: "Fragrance Foodstuff Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fragrance foodstuff pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_117_aljunied_market_and_food_centre_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_117_aljunied_market_and_food_centre_aroi_thai_kitchen_private_ltd",
    name: "Aroi-Thai Kitchen Private Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "aroi-thai kitchen private ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_117_aljunied_market_and_food_centre_chan_weng_on",
    name: "Chan Weng On",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan weng on"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_117_aljunied_market_and_food_centre_chang_cheng_food_beverage_pte_ltd",
    name: "Chang Cheng Food & Beverage Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang cheng food & beverage pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_alvin_sabai",
    name: "Alvin Sabai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alvin sabai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_alvin_sabai_2",
    name: "Alvin Sabai",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alvin sabai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_ang_siang_kah",
    name: "Ang Siang Kah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang siang kah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_ang_teng_aik",
    name: "Ang Teng Aik",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ang teng aik"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_azizah_bte_ahmad",
    name: "Azizah Bte Ahmad",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "azizah bte ahmad"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_chang_keng_nooi",
    name: "Chang Keng Nooi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang keng nooi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kopitiam",
    name: "Kopitiam",
    emoji: "🍽️",
    type: "food_court",
    cuisine: "Food Court (multi-stall, operator-run)",
    aliases: [
      "kopitiam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "koufu",
    name: "Koufu",
    emoji: "🍽️",
    type: "food_court",
    cuisine: "Food Court (multi-stall, operator-run)",
    aliases: [
      "koufu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "foodfare",
    name: "NTUC Foodfare",
    emoji: "🍽️",
    type: "food_court",
    cuisine: "Food Court (multi-stall, operator-run)",
    aliases: [
      "ntuc foodfare"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "hawkers_street",
    name: "Hawkers' Street",
    emoji: "🍜",
    type: "food_court",
    cuisine: "Food Court (multi-stall, operator-run — Select Group)",
    aliases: [
      "hawkers street",
      "hawkers' street",
      "hawker street"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "tai_wah_pork_noodle",
    name: "Tai Wah Pork Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Teochew Noodles",
    aliases: [
      "tai wah pork noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "tiong_bahru_chicken_rice_hws",
    name: "Tiong Bahru Hainanese Chicken Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "tiong bahru hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "jason_penang_cuisine",
    name: "Jason Penang Cuisine",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Penang / Malaysian",
    aliases: [
      "jason penang cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "tai_seng_fish_soup",
    name: "Tai Seng Fish Soup",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fish Soup",
    aliases: [
      "tai seng fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "chef_wei_hk_cheong_fun",
    name: "Chef Wei HK Cheong Fun",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hong Kong / Cheong Fun",
    aliases: [
      "chef wei hk cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "king_of_fried_rice_hws",
    name: "King of Fried Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fried Rice",
    aliases: [
      "king of fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "hill_street_coffee_shop",
    name: "Hill Street Coffee Shop",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Coffeeshop / Kopi",
    aliases: [
      "hill street coffee shop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "pangs_hakka_ytf",
    name: "Pang's Hakka Yong Tau Foo",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hakka",
    aliases: [
      "pang's hakka yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "hill_street_hainanese_curry_rice",
    name: "Hill Street Hainanese Curry Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hainanese Curry Rice",
    aliases: [
      "hill street hainanese curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "famous_eunos_bak_chor_mee",
    name: "Famous Eunos Bak Chor Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Bak Chor Mee",
    aliases: [
      "famous eunos bak chor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "jiak_song_mee_hoon_kway",
    name: "Jiak Song Mee Hoon Kway",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Mee Hoon Kway",
    aliases: [
      "jiak song mee hoon kway"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "ramen_king_hws",
    name: "Ramen King",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Japanese Ramen",
    aliases: [
      "ramen king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "beach_road_scissor_cut_curry_rice",
    name: "Beach Road Scissor-Cut Curry Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Curry Rice",
    aliases: [
      "beach road scissor-cut curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "koungs_wan_tan_mee",
    name: "Koung's Wan Tan Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Wanton Mee",
    aliases: [
      "koung's wan tan mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "old_teochew_satay_beehoon",
    name: "Old Teochew Satay Bee Hoon & Mee Siam",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Teochew",
    aliases: [
      "old teochew satay bee hoon & mee siam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "kaki_makan",
    name: "Kaki Makan",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Halal Local",
    aliases: [
      "kaki makan"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "thai_makan_by_thai_dynasty",
    name: "Thai Makan by Thai Dynasty",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Halal Thai",
    aliases: [
      "thai makan by thai dynasty"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "raja_wok",
    name: "Raja Wok",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Halal Fried Rice",
    aliases: [
      "raja wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "waker_chicken",
    name: "Waker Chicken",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Korean Fried Chicken",
    aliases: [
      "waker chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "loong_kee_yong_tau_fu",
    name: "Loong Kee Yong Tau Fu",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Yong Tau Fu",
    aliases: [
      "loong kee yong tau fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "fei_fei_roasted_noodle",
    name: "Fei Fei Roasted Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Roasted Meats / Noodles",
    aliases: [
      "fei fei roasted noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "top_1_home_made_noodle",
    name: "Top 1 Home Made Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Ban Mian / Noodles",
    aliases: [
      "top 1 home made noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "nikmat_nasi_lemak_husk",
    name: "Nikmat Nasi Lemak by Husk",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Nasi Lemak",
    aliases: [
      "nikmat nasi lemak by husk"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "pondok_indah_nasi_padang",
    name: "Pondok Indah Indonesian Nasi Padang",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Nasi Padang",
    aliases: [
      "pondok indah indonesian nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "fire_western_n_grill",
    name: "Fire Western 'N' Grill",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "fire western 'n' grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "nam_sing_hokkien_mee",
    name: "Nam Sing Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hokkien Mee",
    aliases: [
      "nam sing hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "garden_street_kway_chap",
    name: "Garden Street Kway Chap",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Kway Chap",
    aliases: [
      "garden street kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ],
    operatorId: "hawkers_street"
  }
];
