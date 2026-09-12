import { BRANDS } from './brands';
import { PREMISES } from './premises';
import { MENU_ITEMS } from './menuItems';
import * as fs from 'fs';

let GROCERY: any[] = [];
try {
  const gp = require('./groceryProducts');
  GROCERY = gp.GROCERY_PRODUCTS || gp.GroceryProducts || [];
} catch (e) {
  GROCERY = [];
}

console.log('BRANDS count:', BRANDS.length);
console.log('PREMISES count:', PREMISES.length);
console.log('MENU_ITEMS count:', MENU_ITEMS.length);
console.log('GROCERY count:', GROCERY.length);

// Read Stride's existing ids
const strideSrc = fs.readFileSync('/sessions/eloquent-stoic-carson/mnt/stride-app/app/src/lib/sgFoodDb.ts', 'utf8');
const strideIds = new Set<string>();
const idRegex = /id:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = idRegex.exec(strideSrc)) !== null) {
  strideIds.add(m[1]);
}
console.log('Stride ids found (rough, includes menu item ids too):', strideIds.size);

// Read _synced.json
let synced: string[] = [];
const syncedPath = '/sessions/eloquent-stoic-carson/mnt/Desktop/PlateScreen/reference/stride-sync-sessions/_synced.json';
if (fs.existsSync(syncedPath)) {
  synced = JSON.parse(fs.readFileSync(syncedPath, 'utf8'));
}
console.log('Already synced ids:', synced.length, synced);

// Exclude home_cooked
const nonHomeCooked = BRANDS.filter((b: any) => b.type !== 'home_cooked');
console.log('Non-home_cooked brands:', nonHomeCooked.length);

// Exclude food-court operator brands with zero menu items by design
const itemsByBrand = new Map<string, any[]>();
for (const item of MENU_ITEMS) {
  const list = itemsByBrand.get(item.brandId) ?? [];
  list.push(item);
  itemsByBrand.set(item.brandId, list);
}
const premByBrand = new Map<string, any[]>();
for (const p of PREMISES) {
  const list = premByBrand.get(p.brandId) ?? [];
  list.push(p);
  premByBrand.set(p.brandId, list);
}

const zeroMenuBrands = nonHomeCooked.filter((b: any) => (itemsByBrand.get(b.id) ?? []).length === 0);
console.log('Brands with zero menu items:', zeroMenuBrands.length);
console.log(zeroMenuBrands.slice(0, 20).map((b: any) => ({id: b.id, name: b.name, type: b.type})));

// Candidates: not in strideIds, not in synced, has >=1 menu item
const candidates = nonHomeCooked.filter((b: any) => {
  const items = itemsByBrand.get(b.id) ?? [];
  if (items.length === 0) return false;
  if (strideIds.has(b.id)) return false;
  if (synced.includes(b.id)) return false;
  return true;
});

console.log('\n=== CANDIDATES ===', candidates.length);
for (const b of candidates) {
  const items = itemsByBrand.get(b.id) ?? [];
  const prem = premByBrand.get(b.id) ?? [];
  console.log(JSON.stringify({id: b.id, name: b.name, type: b.type, itemCount: items.length, premCount: prem.length}));
}

fs.writeFileSync('/sessions/eloquent-stoic-carson/mnt/outputs/candidates_raw.json', JSON.stringify({
  candidateIds: candidates.map((b: any) => b.id),
  strideIdsCount: strideIds.size,
  syncedIds: synced,
}, null, 2));
