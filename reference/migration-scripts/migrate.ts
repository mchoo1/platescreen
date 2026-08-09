import { SG_RESTAURANTS, SG_INGREDIENTS, SG_RECIPES } from '../src/lib/sgFoodDb';
import * as fs from 'fs';

type Platform = 'dine_in' | 'grab_go' | 'delivery' | 'self_cook';

const outlets: any[] = [];
const foodOptions: any[] = [];

const mapPlatforms = (serviceTypes: string[]): Platform[] => {
  const out: Platform[] = [];
  for (const s of serviceTypes) {
    if (s === 'dine_in' || s === 'grab_go' || s === 'delivery') out.push(s as Platform);
  }
  return out.length ? out : ['grab_go'];
};

// ── Restaurants / hawkers / food courts ────────────────────────────────────
for (const r of SG_RESTAURANTS) {
  outlets.push({
    id: r.id,
    name: r.name,
    emoji: r.emoji,
    type: r.outletType,
    cuisine: r.cuisine,
    location: r.hawkerLocation || r.venueName || undefined,
    aliases: r.aliases,
    dietTags: r.dietTags ?? [],
    priceRange: r.priceRange,
    platforms: mapPlatforms(r.serviceTypes ?? []),
    sfa: undefined,
  });
  for (const item of r.menu) {
    if (item.visibility === 'component_only') continue;
    foodOptions.push({
      id: item.id,
      outletId: r.id,
      name: item.name,
      emoji: item.emoji,
      category: item.category,
      price: item.price,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      compatibleWith: item.compatibleWith ?? [],
      confidence: item.confidence ?? 'estimated',
      isPopular: item.isPopular ?? undefined,
    });
  }
}

// ── Groceries: group by store into one outlet per store ────────────────────
const storeOutletIds = new Map<string, string>();
for (const ing of SG_INGREDIENTS) {
  const storeSlug = 'store_' + ing.store.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  if (!storeOutletIds.has(ing.store)) {
    storeOutletIds.set(ing.store, storeSlug);
    outlets.push({
      id: storeSlug,
      name: ing.store,
      emoji: '🛒',
      type: 'supermarket',
      cuisine: 'Grocery',
      location: undefined,
      aliases: [ing.store.toLowerCase()],
      dietTags: [],
      priceRange: '$',
      platforms: ['grab_go'],
      sfa: undefined,
    });
  }
  const outletId = storeOutletIds.get(ing.store)!;
  foodOptions.push({
    id: ing.id,
    outletId,
    name: ing.name,
    emoji: ing.emoji,
    category: 'Ingredients',
    price: ing.price,
    calories: ing.calories,
    protein: ing.protein,
    carbs: ing.carbs,
    fat: ing.fat,
    compatibleWith: ing.compatibleWith ?? [],
    confidence: ing.verified ? 'verified' : 'estimated',
    isPopular: undefined,
  });
}

// ── Recipes: single "Home Cooked" outlet ────────────────────────────────────
outlets.push({
  id: 'home_cooked',
  name: 'Home Cooked',
  emoji: '🍳',
  type: 'home_cooked',
  cuisine: 'Home Cooking',
  location: undefined,
  aliases: ['home cooked', 'homemade', 'self cook'],
  dietTags: [],
  priceRange: '$',
  platforms: ['self_cook'],
  sfa: undefined,
});
for (const rec of SG_RECIPES) {
  foodOptions.push({
    id: rec.id,
    outletId: 'home_cooked',
    name: rec.name,
    emoji: rec.emoji,
    category: rec.category,
    price: rec.costPerServing,
    calories: rec.macrosPerServing.calories,
    protein: rec.macrosPerServing.protein,
    carbs: rec.macrosPerServing.carbs,
    fat: rec.macrosPerServing.fat,
    compatibleWith: rec.compatibleWith ?? [],
    confidence: 'estimated',
    isPopular: undefined,
  });
}

console.log('Outlets:', outlets.length, '| FoodOptions:', foodOptions.length);

function ser(x: any, indent = 2): string {
  return JSON.stringify(x, (k, v) => v === undefined ? undefined : v, indent)
    .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:'); // unquote keys for cleaner TS
}

fs.writeFileSync(
  'src/lib/outlets.gen.ts',
  `import type { Outlet } from '@/types/db';\n\nexport const OUTLETS: Outlet[] = ${ser(outlets)};\n`
);
fs.writeFileSync(
  'src/lib/foodOptions.gen.ts',
  `import type { FoodOption } from '@/types/db';\n\nexport const FOOD_OPTIONS: FoodOption[] = ${ser(foodOptions)};\n`
);
console.log('Wrote outlets.gen.ts and foodOptions.gen.ts');
