'use client';

import { cn } from '@/lib/utils';
import { DIET_TAG_OPTIONS, OUTLET_TYPE_OPTIONS, type ScreenerFilters } from '@/lib/screener';
import type { DietaryFlag } from '@/types';
import type { OutletType } from '@/types';

interface Props {
  filters: ScreenerFilters;
  onChange: (next: ScreenerFilters) => void;
  geoStatus: 'idle' | 'locating' | 'active' | 'error';
  onToggleNearMe: () => void;
  resultCount: number;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{children}</p>;
}

function NumberSlider({
  label, value, min, max, step = 1, onChange, suffix = '',
}: {
  label: string; value: number | null; min: number; max: number; step?: number;
  onChange: (v: number | null) => void; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
        <span>{label}</span>
        <span className="tabular font-semibold text-slate-900 dark:text-slate-100">{value == null ? 'Any' : `${value}${suffix}`}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value ?? max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      {value != null && (
        <button onClick={() => onChange(null)} className="text-[11px] text-blue-600 hover:text-blue-800">
          clear
        </button>
      )}
    </div>
  );
}

export function FilterPanel({ filters, onChange, geoStatus, onToggleNearMe, resultCount }: Props) {
  const set = (patch: Partial<ScreenerFilters>) => onChange({ ...filters, ...patch });

  const toggleTag = (tag: DietaryFlag) => {
    const has = filters.tags.includes(tag);
    set({ tags: has ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag] });
  };

  const toggleOutlet = (o: OutletType) => {
    const has = filters.outletTypes.includes(o);
    set({ outletTypes: has ? filters.outletTypes.filter((t) => t !== o) : [...filters.outletTypes, o] });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-card p-4 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Filters</h2>
        <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-2 py-0.5 tabular dark:bg-slate-800 dark:text-slate-300">
          {resultCount.toLocaleString()} results
        </span>
      </div>

      <div className="mb-4">
        <input
          value={filters.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Search item or restaurant..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
        />
      </div>

      <div className="mb-5">
        <SectionLabel>Location</SectionLabel>
        <input
          value={filters.location}
          onChange={(e) => set({ location: e.target.value })}
          placeholder="MRT / area, e.g. Tanjong Pagar"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 mb-2 dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
        />
        <button
          onClick={onToggleNearMe}
          className={cn(
            'w-full rounded-lg text-sm font-medium px-3 py-2 transition-colors',
            geoStatus === 'active'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300'
          )}
        >
          {geoStatus === 'locating' && 'Locating…'}
          {geoStatus === 'active' && '📍 Near me — on'}
          {(geoStatus === 'idle' || geoStatus === 'error') && '📍 Use my location'}
        </button>
        {geoStatus === 'active' && (
          <div className="mt-3">
            <NumberSlider label="Max distance" value={filters.maxDistanceKm} min={1} max={20} onChange={(v) => set({ maxDistanceKm: v })} suffix=" km" />
          </div>
        )}
        {geoStatus === 'error' && <p className="text-xs text-red-600 mt-1">Location permission denied or unavailable.</p>}
      </div>

      <div className="mb-5 space-y-4">
        <SectionLabel>Macros &amp; price</SectionLabel>
        <NumberSlider label="Calories max" value={filters.calMax} min={100} max={2000} step={50} onChange={(v) => set({ calMax: v })} suffix=" cal" />
        <NumberSlider label="Protein min" value={filters.protMin} min={0} max={100} step={5} onChange={(v) => set({ protMin: v })} suffix="g" />
        <NumberSlider label="Carbs max" value={filters.carbMax} min={0} max={200} step={5} onChange={(v) => set({ carbMax: v })} suffix="g" />
        <NumberSlider label="Price ceiling" value={filters.priceMax} min={1} max={40} step={0.5} onChange={(v) => set({ priceMax: v })} />
      </div>

      <div className="mb-5">
        <SectionLabel>Dietary preference</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {DIET_TAG_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleTag(opt.value)}
              className={cn(
                'rounded-full text-xs font-medium px-2.5 py-1 transition-colors',
                filters.tags.includes(opt.value)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <SectionLabel>Store type</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {OUTLET_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggleOutlet(opt.value)}
              className={cn(
                'rounded-full text-xs font-medium px-2.5 py-1 transition-colors',
                filters.outletTypes.includes(opt.value)
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800">
        <label className="text-xs text-slate-600 dark:text-slate-400">Verified data only</label>
        <input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => set({ verifiedOnly: e.target.checked })} className="w-4 h-4 rounded accent-blue-600" />
      </div>

      <button
        onClick={() =>
          onChange({
            q: '', calMin: null, calMax: null, protMin: null, carbMax: null, priceMax: null,
            tags: [], outletTypes: [], verifiedOnly: false, location: '', maxDistanceKm: null,
          })
        }
        className="w-full rounded-lg text-sm text-red-600 hover:bg-red-50 px-3 py-2 font-medium transition-colors dark:hover:bg-red-950/40"
      >
        Reset all filters
      </button>
    </div>
  );
}
