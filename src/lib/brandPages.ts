// Data access layer for the per-brand / per-dish SEO pages (src/app/brand/[id]
// and src/app/brand/[id]/[itemId]). Deliberately separate from screener.ts —
// screener.ts's lookup maps (BRAND_BY_ID, PREMISES_BY_BRAND) are module-private
// and built for the interactive screener's join shape (ScreenerRow). These
// static pages need a different, simpler shape (raw Brand + its Premises +
// its MenuItems, not joined into one row-per-dish), so this file builds its
// own lookups directly off the same raw data rather than reaching into
// screener.ts's internals.
//
// Added 2026-08-30 as the highest-leverage unbuilt growth lever identified in
// reference/planning/GROWTH_STRATEGY.md: ~1,747 brands / 2,552 real, sourced
// menu items existed only inside one single-page interactive app, invisible
// to search engines. These routes make each brand and each dish its own
// indexable, static page.

import { BRANDS as RAW_BRANDS } from './brands';
import { PREMISES as RAW_PREMISES } from './premises';
import { MENU_ITEMS as RAW_MENU_ITEMS } from './menuItems';
import type { Brand, Premises, MenuItem } from '@/types/db';
import { proteinPerDollar, ppdColor } from './screener';

// Same TS2590-avoidance cast as screener.ts — see the comment there.
const BRANDS = RAW_BRANDS as unknown as Brand[];
const PREMISES = RAW_PREMISES as unknown as Premises[];
const MENU_ITEMS = RAW_MENU_ITEMS as unknown as MenuItem[];

const BRAND_BY_ID = new Map<string, Brand>(BRANDS.map((b) => [b.id, b]));

const PREMISES_BY_BRAND = new Map<string, Premises[]>();
for (const p of PREMISES) {
  const list = PREMISES_BY_BRAND.get(p.brandId) ?? [];
  list.push(p);
  PREMISES_BY_BRAND.set(p.brandId, list);
}

const MENU_ITEMS_BY_BRAND = new Map<string, MenuItem[]>();
for (const m of MENU_ITEMS) {
  const list = MENU_ITEMS_BY_BRAND.get(m.brandId) ?? [];
  list.push(m);
  MENU_ITEMS_BY_BRAND.set(m.brandId, list);
}

const MENU_ITEM_BY_ID = new Map<string, MenuItem>(MENU_ITEMS.map((m) => [m.id, m]));

/** Every brand id — for generateStaticParams() on /brand/[id]. */
export function getAllBrandIds(): string[] {
  return BRANDS.map((b) => b.id);
}

/** Every (brandId, itemId) pair with a real menu item — for /brand/[id]/[itemId]. */
export function getAllBrandItemParams(): { id: string; itemId: string }[] {
  return MENU_ITEMS.map((m) => ({ id: m.brandId, itemId: m.id }));
}

export interface BrandPageData {
  brand: Brand;
  premises: Premises[];
  menuItems: (MenuItem & { ppd: number; ppdColor: string })[];
}

/** Full data for one brand's detail page, or null if the id doesn't exist. */
export function getBrandPageData(id: string): BrandPageData | null {
  const brand = BRAND_BY_ID.get(id);
  if (!brand) return null;
  const premises = PREMISES_BY_BRAND.get(id) ?? [];
  const menuItems = (MENU_ITEMS_BY_BRAND.get(id) ?? []).map((m) => ({
    ...m,
    compatibleWith: m.compatibleWith ?? [],
    ppd: proteinPerDollar(m.protein, m.price),
    ppdColor: ppdColor(proteinPerDollar(m.protein, m.price)),
  }));
  return { brand: { ...brand, dietTags: brand.dietTags ?? [] }, premises, menuItems };
}

export interface DishPageData {
  brand: Brand;
  item: MenuItem & { ppd: number; ppdColor: string };
  premises: Premises[];
  otherItems: MenuItem[]; // rest of the brand's menu, for internal linking
}

/** Full data for one dish's detail page, or null if brand/item don't exist or don't match. */
export function getDishPageData(brandId: string, itemId: string): DishPageData | null {
  const brand = BRAND_BY_ID.get(brandId);
  const item = MENU_ITEM_BY_ID.get(itemId);
  if (!brand || !item || item.brandId !== brandId) return null;
  const premises = PREMISES_BY_BRAND.get(brandId) ?? [];
  const otherItems = (MENU_ITEMS_BY_BRAND.get(brandId) ?? []).filter((m) => m.id !== itemId);
  return {
    brand: { ...brand, dietTags: brand.dietTags ?? [] },
    item: {
      ...item,
      compatibleWith: item.compatibleWith ?? [],
      ppd: proteinPerDollar(item.protein, item.price),
      ppdColor: ppdColor(proteinPerDollar(item.protein, item.price)),
    },
    premises,
    otherItems,
  };
}

const OUTLET_TYPE_LABEL: Record<string, string> = {
  restaurant: 'Restaurant',
  food_court: 'Food Court',
  coffeeshop: 'Coffeeshop',
  canteen: 'Canteen',
  grab_go: 'Grab & Go',
  food_court_stall: 'Food Court Stall',
  hawker: 'Hawker Stall',
  supermarket: 'Grocery',
  ready_to_eat: 'Ready-to-Eat',
  home_cooked: 'Home Cooked',
};

export function outletTypeLabel(type: string): string {
  return OUTLET_TYPE_LABEL[type] ?? type;
}

/**
 * Short, human location summary for a brand. Deliberately simple: most
 * premises rows only set locationContext when they sit inside a named
 * parent building (mall/hawker centre/food court) — a standalone shopfront
 * has none — so counting distinct locationContext values undercounts real
 * spread and can wrongly make a many-outlet chain look like it's confined to
 * whichever one location happens to have that field set. Just state the
 * count instead of guessing at a pattern in incomplete data.
 */
export function brandLocationSummary(premises: Premises[]): string {
  if (premises.length === 0) return 'Location not yet listed';
  if (premises.length === 1) return premises[0].locationContext || premises[0].label;
  return `${premises.length} outlets across Singapore`;
}
