import { BRANDS } from './brands';
import { PREMISES } from './premises';
import { MENU_ITEMS } from './menuItems';
import { exportBrandToStride } from './exportToStride';
import * as fs from 'fs';

const candidateIds = [
  'hjh_maimunah_clementi_mall',
  'tartini_grill_pasta_clementi_mall',
  'rong_cheng_rou_gu_cha_clementi_mall',
  'malalah_clementi_mall',
  'lixin_teochew_fishball_noodle_clementi_mall',
];

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

const results: any[] = [];
for (const id of candidateIds) {
  const brand = (BRANDS as any[]).find((b: any) => b.id === id);
  if (!brand) {
    console.log('MISSING BRAND', id);
    continue;
  }
  const items = itemsByBrand.get(id) ?? [];
  const prem = premByBrand.get(id) ?? [];
  const draft = exportBrandToStride(brand as any, prem as any, items as any);
  results.push({ brand, premises: prem, draft });
}

fs.writeFileSync('/sessions/eloquent-stoic-carson/mnt/outputs/candidate_details.json', JSON.stringify(results, null, 2));
console.log('Wrote', results.length, 'candidate details');
console.log(JSON.stringify(results, null, 2));
