// Generated 2026-08-20 — schema-only for now, zero rows (see GroceryProduct in types/db.ts
// and reference/planning/database-restructure-proposal-2026-08-20.md). Packaged-SKU research
// (per-100g macros + package size) is a separate future effort from this restructure.
// Note: fairprice's 17 "raw ingredient" items (Chicken Breast, etc, previously mis-modeled
// as store_fairprice's MenuItems) are flagged in menuItems.ts as a future conversion
// candidate for this table — not converted yet, still shaped as MenuItem for now.

export const GROCERY_PRODUCTS = [
  {
    id: "bengawan_solo_pineapple_tarts_330g",
    brandId: "bengawan_solo",
    name: "Pineapple Tarts (330g)",
    emoji: "🍍",
    category: "Confectionery",
    packageSize: 330,
    packageUnit: "g",
    packagePrice: 28,
    caloriesPer100: 365,
    proteinPer100: 5,
    carbsPer100: 75,
    fatPer100: 20,
    confidence: "community"
  },
  {
    id: "bengawan_solo_kueh_lapis_0_6kg",
    brandId: "bengawan_solo",
    name: "Kueh Lapis (0.6kg)",
    emoji: "🍰",
    category: "Cakes",
    packageSize: 600,
    packageUnit: "g",
    packagePrice: 42,
    caloriesPer100: 476,
    proteinPer100: 9,
    carbsPer100: 33,
    fatPer100: 33,
    confidence: "estimated"
  }
];
