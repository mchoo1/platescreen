'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  buildScreenerRows, withDistances, applyFilters, sortRows, applyPresetPpdFilter,
  buildUncoveredBrandRows, withUncoveredDistances, applyUncoveredFilters, sortUncoveredRows,
  DEFAULT_FILTERS, PRESETS,
  type ScreenerFilters, type ScreenerRow, type SortKey, type SortDir,
} from '@/lib/screener';
import { getUserLocation } from '@/lib/geo';
import { fmtMoney, ppdBadgeClasses } from '@/lib/utils';
import { FilterPanel } from './FilterPanel';
import { PresetBar } from './PresetBar';
import { ScreenerTable } from './ScreenerTable';
import { PendingMenuList } from './PendingMenuList';
import { MealTray } from './MealTray';
import type { DietaryFlag, OutletType } from '@/types';
import type { Platform } from '@/types/db';

const ALL_ROWS = buildScreenerRows();
const OUTLET_COUNT = new Set(ALL_ROWS.map((r) => r.restaurantId)).size;
const VERIFIED_COUNT = ALL_ROWS.filter((r) => r.confidence === 'verified').length;
// Real, physical outlets with zero menu items — previously entirely invisible to
// search since buildScreenerRows() only ever iterates MENU_ITEMS. See
// reference/research-sessions/2026-08-29-zero-menu-brand-fallback.md.
const ALL_UNCOVERED = buildUncoveredBrandRows();
// Ready-to-eat outlet types only — excludes 'supermarket' so raw ingredients (chicken breast,
// eggs, dry rice) don't dominate "Top picks" ahead of actual meals someone can walk in and order.
// See reference/research-sessions/2026-08-22-database-usefulness-audit.md.
const TOP_VALUE_PICKS = [...ALL_ROWS]
  .filter((r) => r.outletType !== 'supermarket')
  .sort((a, b) => b.ppd - a.ppd)
  .slice(0, 10);

// ── URL <-> filters ───────────────────────────────────────────────────────────
function filtersFromParams(params: URLSearchParams): { filters: ScreenerFilters; sortKey: SortKey; sortDir: SortDir; preset: string | null } {
  const num = (k: string) => (params.has(k) ? Number(params.get(k)) : null);
  const filters: ScreenerFilters = {
    q: params.get('q') ?? '',
    calMin: num('cal_min'),
    calMax: num('cal_max'),
    protMin: num('prot_min'),
    carbMax: num('carb_max'),
    priceMax: num('price_max'),
    tags: (params.get('tag')?.split(',').filter(Boolean) as DietaryFlag[]) ?? [],
    outletTypes: (params.get('outlet')?.split(',').filter(Boolean) as OutletType[]) ?? [],
    platforms: (params.get('platform')?.split(',').filter(Boolean) as Platform[]) ?? [],
    verifiedOnly: params.get('verified') === '1',
    location: params.get('loc') ?? '',
    maxDistanceKm: num('dist_max'),
  };
  const sortKey = (params.get('sort') as SortKey) || 'ppd';
  const sortDir = (params.get('dir') as SortDir) || 'desc';
  const preset = params.get('preset');
  return { filters, sortKey, sortDir, preset: preset || null };
}

function paramsFromState(filters: ScreenerFilters, sortKey: SortKey, sortDir: SortDir, preset: string | null): string {
  const p = new URLSearchParams();
  if (filters.q) p.set('q', filters.q);
  if (filters.calMin != null) p.set('cal_min', String(filters.calMin));
  if (filters.calMax != null) p.set('cal_max', String(filters.calMax));
  if (filters.protMin != null) p.set('prot_min', String(filters.protMin));
  if (filters.carbMax != null) p.set('carb_max', String(filters.carbMax));
  if (filters.priceMax != null) p.set('price_max', String(filters.priceMax));
  if (filters.tags.length) p.set('tag', filters.tags.join(','));
  if (filters.outletTypes.length) p.set('outlet', filters.outletTypes.join(','));
  if (filters.platforms.length) p.set('platform', filters.platforms.join(','));
  if (filters.verifiedOnly) p.set('verified', '1');
  if (filters.location) p.set('loc', filters.location);
  if (filters.maxDistanceKm != null) p.set('dist_max', String(filters.maxDistanceKm));
  p.set('sort', sortKey);
  p.set('dir', sortDir);
  if (preset) p.set('preset', preset);
  return p.toString();
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-card px-4 py-3 dark:bg-slate-900 dark:border-slate-800">
      <div className="text-xl font-bold text-slate-900 tabular dark:text-slate-100">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function PickCard({ row }: { row: ScreenerRow }) {
  return (
    <div className="shrink-0 w-52 rounded-xl border border-slate-200 bg-white shadow-card px-3 py-2.5 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-1">
        <span className={`inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5 ${ppdBadgeClasses(row.ppd)}`}>
          {row.ppd.toFixed(1)} g/$
        </span>
        <span className="text-xs text-slate-400 tabular">{fmtMoney(row.price)}</span>
      </div>
      <div className="text-sm font-medium text-slate-900 truncate dark:text-slate-100">{row.emoji} {row.name}</div>
      <div className="text-xs text-slate-500 truncate dark:text-slate-400">{row.restaurantName}</div>
    </div>
  );
}

export function ScreenerApp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(() => filtersFromParams(new URLSearchParams(searchParams.toString())), []); // eslint-disable-line react-hooks/exhaustive-deps

  const [filters, setFilters] = useState<ScreenerFilters>(initial.filters);
  const [sortKey, setSortKey] = useState<SortKey>(initial.sortKey);
  const [sortDir, setSortDir] = useState<SortDir>(initial.sortDir);
  const [preset, setPreset] = useState<string | null>(initial.preset);
  const [trayIds, setTrayIds] = useState<Set<string>>(new Set());
  const [geoStatus, setGeoStatus] = useState<'idle' | 'locating' | 'active' | 'error'>('idle');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Sync state -> URL (shareable link)
  useEffect(() => {
    const qs = paramsFromState(filters, sortKey, sortDir, preset);
    router.replace(`${pathname}?${qs}`, { scroll: false });
  }, [filters, sortKey, sortDir, preset, pathname, router]);

  const handleToggleNearMe = useCallback(async () => {
    if (geoStatus === 'active') {
      setGeoStatus('idle');
      setUserCoords(null);
      setFilters((f) => ({ ...f, maxDistanceKm: null }));
      return;
    }
    setGeoStatus('locating');
    try {
      const coords = await getUserLocation();
      setUserCoords(coords);
      setGeoStatus('active');
      setFilters((f) => ({ ...f, maxDistanceKm: f.maxDistanceKm ?? 5 }));
    } catch {
      setGeoStatus('error');
    }
  }, [geoStatus]);

  const rowsWithDistance = useMemo(() => {
    if (!userCoords) return ALL_ROWS;
    return withDistances(ALL_ROWS, userCoords.lat, userCoords.lng);
  }, [userCoords]);

  const visibleRows = useMemo(() => {
    let out = applyFilters(rowsWithDistance, filters);
    out = applyPresetPpdFilter(out, preset);
    return sortRows(out, sortKey, sortDir);
  }, [rowsWithDistance, filters, sortKey, sortDir, preset]);

  const uncoveredWithDistance = useMemo(() => {
    if (!userCoords) return ALL_UNCOVERED;
    return withUncoveredDistances(ALL_UNCOVERED, userCoords.lat, userCoords.lng);
  }, [userCoords]);

  // Only the filters that describe the physical outlet itself apply here — there's
  // no menu data yet to test calorie/protein/carb/price/diet-tag filters against.
  const visibleUncovered = useMemo(() => {
    const out = applyUncoveredFilters(uncoveredWithDistance, {
      q: filters.q,
      outletTypes: filters.outletTypes,
      platforms: filters.platforms,
      location: filters.location,
      maxDistanceKm: filters.maxDistanceKm,
    });
    return sortUncoveredRows(out);
  }, [uncoveredWithDistance, filters.q, filters.outletTypes, filters.platforms, filters.location, filters.maxDistanceKm]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir(key === 'name' || key === 'restaurant' ? 'asc' : 'desc');
    }
  };

  const handleSelectPreset = (id: string | null) => {
    if (!id) {
      setFilters(DEFAULT_FILTERS);
      setPreset(null);
      return;
    }
    const p = PRESETS.find((p) => p.id === id);
    setFilters(p ? p.apply(DEFAULT_FILTERS) : DEFAULT_FILTERS);
    setPreset(id);
  };

  const handleToggleTray = (row: ScreenerRow) => {
    setTrayIds((prev) => {
      const next = new Set(prev);
      if (next.has(row.id)) next.delete(row.id);
      else next.add(row.id);
      return next;
    });
  };

  const trayItems = useMemo(() => ALL_ROWS.filter((r) => trayIds.has(r.id)), [trayIds]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark.svg" alt="PlateScreen" className="w-8 h-8 dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark-white.svg" alt="PlateScreen" className="w-8 h-8 hidden dark:block" />
            <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Plate<span className="text-brand dark:text-blue-400">Screen</span>
            </h1>
            <span className="rounded-full bg-slate-100 text-slate-500 text-xs font-medium px-2 py-0.5 dark:bg-slate-800 dark:text-slate-400">
              Singapore
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="rounded-lg border border-slate-200 text-xs font-medium text-slate-600 px-3 py-1.5 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300"
            >
              Copy shareable link
            </button>
            <button
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto w-full px-4 pt-5">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Screen Singapore food by macros &amp; value</h2>
        <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">Search, filter, and compare — like a stock screener, for meals.</p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
          <StatCard label="Menu items indexed" value={ALL_ROWS.length.toLocaleString()} />
          <StatCard label="Outlets covered" value={OUTLET_COUNT.toLocaleString()} />
          <StatCard label="Menu pending" value={ALL_UNCOVERED.length.toLocaleString()} />
          <StatCard label="Verified entries" value={VERIFIED_COUNT.toLocaleString()} />
          <StatCard label="Showing now" value={visibleRows.length.toLocaleString()} />
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold text-slate-500 mb-2 dark:text-slate-400">Top protein/$ picks right now</p>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-thin pb-1">
            {TOP_VALUE_PICKS.map((row) => (
              <PickCard key={row.id} row={row} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-4 py-5 flex-1 flex flex-col gap-4 lg:flex-row">
        <aside className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-4">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              geoStatus={geoStatus}
              onToggleNearMe={handleToggleNearMe}
              resultCount={visibleRows.length}
            />
          </div>
        </aside>

        <main className="flex-1 min-w-0 flex flex-col gap-4 pb-4">
          <PresetBar activePreset={preset} onSelect={handleSelectPreset} />
          <ScreenerTable
            rows={visibleRows}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            trayIds={trayIds}
            onToggleTray={handleToggleTray}
            showDistance={geoStatus === 'active'}
          />
          <PendingMenuList
            rows={visibleUncovered}
            totalCount={ALL_UNCOVERED.length}
            showDistance={geoStatus === 'active'}
          />
        </main>
      </div>

      <MealTray
        items={trayItems}
        onRemove={(id) => setTrayIds((prev) => { const n = new Set(prev); n.delete(id); return n; })}
        onClear={() => setTrayIds(new Set())}
      />
    </div>
  );
}
