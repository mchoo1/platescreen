'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { applyFilters } from '@/lib/search/filter';
import {
  DEFAULT_FILTERS, OUTLET_GROUPS, UI_ALLERGENS, UI_COOKING, UI_DIET_TAGS,
  type Filters, type SearchIndex, type SortKey,
} from '@/lib/search/types';
import type { Platform } from '@/db/schema';
import { Icon } from './ui';

export type SheetSection = 'price' | 'nutrition' | 'diet' | 'allergens' | 'cooking' | 'hours' | 'where' | 'quality' | 'sort';

interface Props {
  open: boolean;
  focus: SheetSection | null;
  filters: Filters;
  index: SearchIndex;
  user: { lat: number; lng: number } | null;
  onRequestLocation: () => void;
  onApply: (f: Filters) => void;
  onClose: () => void;
}

const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function Section({ id, title, aside, children }: { id: SheetSection; title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <fieldset id={`fs-${id}`} className="border-0 border-b border-ps-line py-5 m-0 px-0 flex flex-col gap-3 scroll-mt-4">
      <legend className="float-left w-full p-0 font-bold text-base flex justify-between items-baseline">{title}{aside}</legend>
      {children}
    </fieldset>
  );
}

function Pill({ on, children, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { on: boolean; children: React.ReactNode }) {
  return (
    <label className={`chip h-10 cursor-pointer ${on ? 'chip-on' : ''}`}>
      <input {...rest} checked={on} className="w-4 h-4 accent-ps-green" />
      {children}
    </label>
  );
}

function Switch({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 min-h-11 text-sm cursor-pointer">
      <span className="flex flex-col">{label}{hint && <span className="text-xs text-ps-muted">{hint}</span>}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 accent-ps-green shrink-0" />
    </label>
  );
}

function NumberLimit({ label, value, unit, max, step = 1, onChange, accent }: { label: string; value: number | null; unit: string; max: number; step?: number; onChange: (v: number | null) => void; accent: string }) {
  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <div className="flex justify-between items-center">
        <span>{label}</span>
        <span className="flex items-center gap-2">
          <input
            type="number" inputMode="numeric" min={0} max={max} step={step} aria-label={`${label} (${unit})`}
            value={value ?? ''} placeholder="Any"
            onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
            className="w-20 h-9 px-2 rounded-lg border border-ps-line2 bg-ps-surface text-right font-mono text-ps-ink"
          />
          <span className="text-ps-muted w-8">{unit}</span>
        </span>
      </div>
      <input type="range" min={0} max={max} step={step} value={value ?? max} aria-hidden="true" tabIndex={-1}
        onChange={(e) => { const v = Number(e.target.value); onChange(v >= max ? null : v); }}
        style={{ accentColor: accent }} />
    </div>
  );
}

export function FilterSheet({ open, focus, filters, index, user, onRequestLocation, onApply, onClose }: Props) {
  const [d, setD] = useState<Filters>(filters);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { if (open) setD(filters); }, [open, filters]);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (focus) document.getElementById(`fs-${focus}`)?.scrollIntoView({ block: 'start' });
      panel.current?.focus();
    }, 30);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { clearTimeout(t); window.removeEventListener('keydown', esc); };
  }, [open, focus, onClose]);

  const count = useMemo(() => (open ? applyFilters(index, d, { user }).length : 0), [open, index, d, user]);
  if (!open) return null;
  const set = (patch: Partial<Filters>) => setD((x) => ({ ...x, ...patch }));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close filters" className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="fs-title"
        className="relative w-full sm:max-w-[440px] h-full bg-ps-bg border-l border-ps-line flex flex-col outline-none">
        <div className="flex items-center justify-between px-3 h-16 border-b border-ps-line shrink-0">
          <button onClick={onClose} aria-label="Close filters" className="w-11 h-11 rounded-full flex items-center justify-center text-ps-ink"><Icon name="x" size={22} /></button>
          <h2 id="fs-title" className="font-display font-bold text-xl m-0">Filters</h2>
          <button onClick={() => setD({ ...DEFAULT_FILTERS, q: d.q })} className="h-11 px-3 text-ps-blue font-semibold">Reset</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <Section id="price" title="Price" aside={<span className="font-mono text-sm text-ps-blue">{d.priceMax == null ? 'Any' : `≤ $${d.priceMax.toFixed(2)}`}</span>}>
            <div className="flex flex-wrap gap-2">
              {[5, 8, 12, 20].map((v) => (
                <Pill key={v} type="radio" name="price" on={d.priceMax === v} onChange={() => set({ priceMax: v })}>${v}</Pill>
              ))}
              <Pill type="radio" name="price" on={d.priceMax == null} onChange={() => set({ priceMax: null })}>Any</Pill>
            </div>
            <NumberLimit label="Custom max" value={d.priceMax} unit="$" max={40} step={0.5} onChange={(v) => set({ priceMax: v })} accent="#6cb4ff" />
          </Section>

          <Section id="nutrition" title="Nutrition">
            <NumberLimit label="Calories, max" value={d.kcalMax} unit="kcal" max={1500} step={10} onChange={(v) => set({ kcalMax: v })} accent="#eef3f8" />
            <NumberLimit label="Protein, min" value={d.proteinMin} unit="g" max={80} onChange={(v) => set({ proteinMin: v === 0 ? null : v })} accent="#3fd17a" />
            <NumberLimit label="Carbs, max" value={d.carbsMax} unit="g" max={150} onChange={(v) => set({ carbsMax: v })} accent="#a3b3c6" />
            <NumberLimit label="Fat, max" value={d.fatMax} unit="g" max={80} onChange={(v) => set({ fatMax: v })} accent="#a3b3c6" />
          </Section>

          <Section id="diet" title="Dietary">
            <div className="flex flex-wrap gap-2">
              {UI_DIET_TAGS.map((t) => (
                <Pill key={t.value} type="checkbox" on={d.diet.includes(t.value)} onChange={() => set({ diet: toggle(d.diet, t.value) })}>{t.label}</Pill>
              ))}
              <Pill type="checkbox" on={d.glutenFreeConfirmed} onChange={() => set({ glutenFreeConfirmed: !d.glutenFreeConfirmed })}>Gluten-free (confirmed)</Pill>
            </div>
            <p className="m-0 text-xs text-ps-muted leading-relaxed">Halal shows Muslim-owned or Malay/Indian-Muslim dishes. It isn't MUIS certification unless the stall says so. "Gluten-free (confirmed)" needs the stall's or brand's own claim, so few dishes have it yet.</p>
          </Section>

          <Section id="allergens" title="Leave out allergens">
            <div className="flex flex-wrap gap-2">
              {UI_ALLERGENS.map((a) => (
                <Pill key={a.value} type="checkbox" on={d.excludeAllergens.includes(a.value)} onChange={() => set({ excludeAllergens: toggle(d.excludeAllergens, a.value) })}>{a.label}</Pill>
              ))}
            </div>
            <Switch label={'Also hide "unknown"'} hint="Safer, but hides most hawker dishes" checked={d.hideUnknownAllergens} onChange={(v) => set({ hideUnknownAllergens: v })} />
            <p className="m-0 text-xs text-ps-amberink leading-relaxed">Most stalls don't publish allergens. "Likely" is our estimate from the dish, so always ask the stall if you have an allergy.</p>
          </Section>

          <Section id="cooking" title="Cooking style">
            <div className="flex flex-wrap gap-2">
              <Pill type="checkbox" on={d.notFried} onChange={() => set({ notFried: !d.notFried })}>Not fried</Pill>
              {UI_COOKING.map((m) => (
                <Pill key={m.value} type="checkbox" on={d.cooking.includes(m.value)} onChange={() => set({ cooking: toggle(d.cooking, m.value) })}>{m.label}</Pill>
              ))}
            </div>
            <div role="radiogroup" aria-label="Spice level" className="grid grid-cols-3 border border-ps-line2 rounded-xl overflow-hidden">
              {(['any', 'mild', 'spicy'] as const).map((s, i) => (
                <label key={s} className={`h-11 flex items-center justify-center gap-1.5 text-sm font-semibold cursor-pointer ${i ? 'border-l border-ps-line2' : ''} ${d.spice === s ? 'bg-ps-select' : ''}`}>
                  <input type="radio" name="spice" checked={d.spice === s} onChange={() => set({ spice: s })} className="accent-ps-blue" />
                  {s === 'any' ? 'Any spice' : s === 'mild' ? 'Not spicy' : 'Spicy'}
                </label>
              ))}
            </div>
            <p className="m-0 text-xs text-ps-muted">Worked out from dish names, so dishes we can't tell stay in the results.</p>
          </Section>

          <Section id="hours" title="Opening hours">
            <Switch label="Open now" checked={d.openNow} onChange={(v) => set({ openNow: v })} />
            <Switch label={'Include "hours unknown"'} hint="Most stalls don't have hours in PlateScreen yet" checked={d.includeHoursUnknown} onChange={(v) => set({ includeHoursUnknown: v })} />
            <label className="flex items-center justify-between min-h-11 text-sm">Open at a set time
              <input type="time" value={d.openAt ?? ''} onChange={(e) => set({ openAt: e.target.value || null })}
                className="h-10 px-2 rounded-lg border border-ps-line2 bg-ps-surface text-ps-ink font-mono" />
            </label>
            <p className="m-0 text-xs text-ps-muted">Hawker centres closed for NEA cleaning that day are left out.</p>
          </Section>

          <Section id="where" title="Where">
            <div role="radiogroup" aria-label="Distance" className="grid grid-cols-4 border border-ps-line2 rounded-xl overflow-hidden">
              {([0.5, 1, 3, null] as const).map((v, i) => (
                <label key={String(v)} className={`h-11 flex items-center justify-center gap-1 text-[13px] font-semibold cursor-pointer ${i ? 'border-l border-ps-line2' : ''} ${d.maxDistanceKm === v ? 'bg-ps-select' : ''}`}>
                  <input type="radio" name="dist" checked={d.maxDistanceKm === v} onChange={() => { set({ maxDistanceKm: v }); if (v != null && !user) onRequestLocation(); }} className="accent-ps-blue" />
                  {v == null ? 'Any' : v < 1 ? '500 m' : `${v} km`}
                </label>
              ))}
            </div>
            {d.maxDistanceKm != null && !user && <p className="m-0 text-xs text-ps-amberink">Allow location access to use distance.</p>}
            <label className="flex flex-col gap-1.5 text-sm">Area, venue or postal code
              <input value={d.area} onChange={(e) => set({ area: e.target.value })} placeholder="e.g. Maxwell, Tampines Mall, 069111"
                className="h-11 px-3 rounded-lg border border-ps-line2 bg-ps-surface text-ps-ink" />
            </label>
            <div className="flex flex-wrap gap-2">
              {OUTLET_GROUPS.map((g) => (
                <Pill key={g.value} type="checkbox" on={d.outletGroups.includes(g.value)} onChange={() => set({ outletGroups: toggle(d.outletGroups, g.value) })}>{g.label}</Pill>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {([['dine_in', 'Dine in'], ['grab_go', 'Takeaway'], ['delivery', 'Delivery']] as [Platform, string][]).map(([v, l]) => (
                <Pill key={v} type="checkbox" on={d.platforms.includes(v)} onChange={() => set({ platforms: toggle(d.platforms, v) })}>{l}</Pill>
              ))}
            </div>
          </Section>

          <Section id="quality" title="Data quality">
            <Switch label="Verified nutrition only" hint="Mostly chains for now" checked={d.verifiedOnly} onChange={(v) => set({ verifiedOnly: v })} />
            <Switch label="Price checked in the last 90 days" hint="No prices have been re-checked since import yet" checked={d.priceCheckedDays != null} onChange={(v) => set({ priceCheckedDays: v ? 90 : null })} />
          </Section>

          <Section id="sort" title="Sort by">
            {([['ppd', 'Protein per dollar'], ['price', 'Lowest price'], ['kcal', 'Fewest calories'], ['protein', 'Most protein'], ['distance', 'Nearest']] as [SortKey, string][]).map(([v, l]) => (
              <label key={v} className="flex items-center gap-2.5 text-sm min-h-10 cursor-pointer">
                <input type="radio" name="sort" checked={d.sort === v} onChange={() => { set({ sort: v }); if (v === 'distance' && !user) onRequestLocation(); }} className="w-4 h-4 accent-ps-green" />{l}
              </label>
            ))}
          </Section>
        </div>

        <div className="p-4 border-t border-ps-line bg-ps-bar shrink-0">
          <button onClick={() => onApply(d)} className="btn-primary w-full">Show {count.toLocaleString()} {count === 1 ? 'result' : 'results'}</button>
        </div>
      </div>
    </div>
  );
}
