/**
 * FIRST-PASS EXPORT CONVERTER — maps PlateScreen's Brand/Premises/MenuItem
 * schema back into Stride's full SGRestaurant/SGMenuItem shape (see
 * reference/stride-original/sgFoodDb.ts for the canonical target interfaces).
 *
 * This is a manual mapping target, not a shared type import — Stride's schema
 * isn't part of this project anymore, so keep this in sync by hand if it changes.
 * Default values below are reasonable starting points; review before an actual
 * sync (per the reviewable-diff workflow — nothing here writes to stride-app
 * automatically).
 */
import type { Brand, Premises, MenuItem, Platform } from '@/types/db';

export interface StrideMenuItemDraft {
  id: string;
  name: string;
  emoji: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  compatibleWith: string[];
  isPopular?: boolean;
  confidence: 'verified' | 'estimated' | 'community';
  source: string;          // VerifiedSource in Stride — see confidenceToSource()
  verified: boolean;
}

export interface StrideRestaurantDraft {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  serviceTypes: string[];  // Stride's ServiceType: dine_in | grab_go | delivery
  aliases: string[];
  menu: StrideMenuItemDraft[];
  dietTags: string[];
  priceRange: string;
  outletType: string;
  tier: 'full_menu' | 'partial_menu' | 'estimated_menu' | 'place_only';
  hawkerLocation?: string;
  sfaLicenceType?: 'food_shop' | 'food_stall' | 'hawker_stall' | 'supermarket' | 'none';
  sfaLicenceNo?: string;
  premisesCount: number;    // how many real Premises rows this brand has (0 = no location data at all)
}

/** self_cook has no Stride equivalent (Stride has no home-cooked outlet concept) — dropped. */
function platformsToServiceTypes(platforms: Platform[]): string[] {
  const mapped = platforms.filter((p): p is Exclude<Platform, 'self_cook'> => p !== 'self_cook');
  return mapped.length ? mapped : ['grab_go'];
}

function confidenceToSource(confidence: MenuItem['confidence']): string {
  if (confidence === 'verified') return 'official_sg';
  if (confidence === 'community') return 'community';
  return 'ai_estimate';
}

function brandTypeToSfaLicenceType(type: Brand['type']): StrideRestaurantDraft['sfaLicenceType'] {
  switch (type) {
    case 'hawker': return 'hawker_stall';
    case 'food_court_stall': return 'food_stall';
    case 'supermarket': return 'supermarket';
    case 'restaurant': case 'food_court': case 'coffeeshop': case 'canteen': case 'grab_go':
      return 'food_shop';
    default: return 'none';
  }
}

function tierFromItems(items: MenuItem[]): StrideRestaurantDraft['tier'] {
  if (items.length === 0) return 'place_only';
  if (items.every((i) => i.confidence === 'verified')) return 'full_menu';
  if (items.some((i) => i.confidence === 'verified')) return 'partial_menu';
  return 'estimated_menu';
}

/** Convert one Brand + its Premises + its MenuItems into a Stride-shaped restaurant draft. */
export function exportBrandToStride(brand: Brand, premises: Premises[], items: MenuItem[]): StrideRestaurantDraft {
  // Prefer the first premises' SFA record (most brands have at most one licence
  // shape worth surfacing to Stride today); a brand with many premises just
  // reports its count — Stride doesn't have a per-branch concept yet either.
  const primaryPremises = premises[0];
  const locationLabel =
    premises.length === 0 ? undefined :
    premises.length === 1 ? (primaryPremises.locationContext || primaryPremises.label) :
    'Multiple outlets islandwide';
  return {
    id: brand.id,
    name: brand.name,
    emoji: brand.emoji,
    cuisine: brand.cuisine,
    serviceTypes: platformsToServiceTypes(brand.platforms),
    aliases: brand.aliases,
    dietTags: brand.dietTags,
    priceRange: brand.priceRange,
    outletType: brand.type,
    tier: tierFromItems(items),
    hawkerLocation: locationLabel,
    sfaLicenceType: brandTypeToSfaLicenceType(brand.type),
    sfaLicenceNo: primaryPremises?.sfa?.licenceNumber,
    premisesCount: premises.length,
    menu: items.map((item) => ({
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      price: item.price,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      category: item.category,
      compatibleWith: item.compatibleWith,
      isPopular: item.isPopular,
      confidence: item.confidence,
      source: confidenceToSource(item.confidence),
      verified: item.confidence === 'verified',
    })),
  };
}

/** Convert the full PlateScreen dataset into Stride-shaped restaurant drafts, grouped by brand. */
export function exportAllToStride(brands: Brand[], premises: Premises[], menuItems: MenuItem[]): StrideRestaurantDraft[] {
  const itemsByBrand = new Map<string, MenuItem[]>();
  for (const item of menuItems) {
    const list = itemsByBrand.get(item.brandId) ?? [];
    list.push(item);
    itemsByBrand.set(item.brandId, list);
  }
  const premByBrand = new Map<string, Premises[]>();
  for (const p of premises) {
    const list = premByBrand.get(p.brandId) ?? [];
    list.push(p);
    premByBrand.set(p.brandId, list);
  }
  return brands
    .filter((b) => b.type !== 'home_cooked') // no Stride equivalent — self-cook recipes stay PlateScreen-only
    .map((b) => exportBrandToStride(b, premByBrand.get(b.id) ?? [], itemsByBrand.get(b.id) ?? []));
}
