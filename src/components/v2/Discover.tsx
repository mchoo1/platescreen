'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { applyFilters, activeFilterCount, type ResultRow } from '@/lib/search/filter';
import { parseQuery } from '@/lib/search/parse';
import { filterChips } from '@/lib/search/chips';
import { filtersFromParams, paramsFromFilters } from '@/lib/search/url';
import { DEFAULT_FILTERS, type Filters, type SearchIndex, type SortKey } from '@/lib/search/types';
import { getUserLocation } from '@/lib/geo';
import { useSearchIndex } from './useSearchIndex';
import { FilterSheet, type SheetSection } from './FilterSheet';
import { AppHeader, Icon, OpenBadge, TrustBadge, fmt$, fmtN } from './ui';

const PAGE = 40;
const EXAMPLES = [
  '650 kcal, 40g protein, $12',
  'halal not fried under $6',
  'steamed fish soup',
  'no peanut, not spicy',
];

function fitsLine(r: ResultRow, f: Filters): string | null {
  const parts: string[] = [];
  let constrained = false;
  if (f.kcalMax != null && r.row.kcal != null) { constrained = true; const left = f.kcalMax - r.row.kcal; if (left > 0) parts.push(`${left} kcal`); }
  if (f.priceMax != null && r.row.price != null) { constrained = true; const left = f.priceMax - r.row.price; if (left > 0.004) parts.push(`$${left.toFixed(2)}`); }
  if (!constrained) return null;
  return parts.length ? `Fits · leaves ${parts.join(', ')}` : 'Fits exactly';
}

const distanceLabel = (km: number | null) => (km == null ? null : km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`);

function ResultCard({ r, f, selected, onToggle, canSelect }: { r: ResultRow; f: Filters; selected: boolean; onToggle: () => void; canSelect: boolean }) {
  const { row } = r;
  const fits = fitsLine(r, f);
  return (
    <li className="card p-4 flex flex-col gap-2.5">
      <div className="flex justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <Link href={`/brand/${row.brandId}/${row.id}`} className="text-ps-ink no-underline font-bold text-base leading-snug hover:underline">{row.name}</Link>
          <span className="text-[13px] text-ps-muted truncate">{row.location && row.location !== row.brandName ? `${row.brandName} · ${row.location}` : row.brandName}</span>
        </div>
        <span className="font-mono font-semibold text-[17px] shrink-0">{fmt$(row.price)}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-ps-muted">
        <span><b className="text-ps-ink">{fmtN(row.kcal)}</b> kcal</span>
        <span><b className="text-ps-green">{fmtN(row.protein, ' g')}</b> P</span>
        <span>{fmtN(row.carbs)} C</span>
        <span>{fmtN(row.fat)} F</span>
        <span className="ml-auto"><b className="text-ps-ink">{row.ppd == null ? '—' : row.ppd.toFixed(1)}</b> g/$</span>
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3 text-xs">
          {fits && <span className="text-ps-greenink">{fits}</span>}
          {distanceLabel(r.distanceKm) && <span className="text-ps-muted">{distanceLabel(r.distanceKm)}</span>}
          <OpenBadge state={r.open} />
        </div>
        <div className="flex items-center gap-3">
          <TrustBadge trust={row.trust} complete={row.complete} />
          <label className={`flex items-center gap-1.5 text-xs font-semibold min-h-8 ${canSelect || selected ? 'text-ps-muted cursor-pointer' : 'text-ps-dim'}`}>
            <input type="checkbox" checked={selected} disabled={!canSelect && !selected} onChange={onToggle} className="w-4 h-4 accent-ps-green" />
            Compare
          </label>
        </div>
      </div>
    </li>
  );
}

function ResultsTable({ rows, f, sort, onSort, selected, onToggle, canSelect }: {
  rows: ResultRow[]; f: Filters; sort: SortKey; onSort: (s: SortKey) => void;
  selected: string[]; onToggle: (id: string) => void; canSelect: boolean;
}) {
  const head = (key: SortKey | null, label: string, right = true) => (
    <th scope="col" className={`px-3 py-3 font-semibold text-xs uppercase tracking-wider ${right ? 'text-right' : 'text-left'} ${key === sort ? 'text-ps-ink' : 'text-ps-muted'}`}>
      {key ? <button onClick={() => onSort(key)} className="uppercase tracking-wider font-semibold">{label}{key === sort ? ' ↓' : ''}</button> : label}
    </th>
  );
  return (
    <div className="overflow-x-auto rounded-2xl border border-ps-line">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead className="bg-ps-surface">
          <tr>
            <th scope="col" className="px-3 py-3 w-10"><span className="sr-only">Compare</span></th>
            {head(null, 'Dish', false)}{head(null, 'Where', false)}{head('price', 'Price')}{head('kcal', 'kcal')}
            {head('protein', 'Protein')}{head(null, 'Carbs')}{head(null, 'Fat')}{head('ppd', 'g P / $')}
            {head(null, 'Data', false)}
          </tr>
        </thead>
        <tbody className="font-mono text-[13px]">
          {rows.map((r, i) => {
            const sel = selected.includes(r.row.id);
            return (
              <tr key={r.row.id} className={`border-t border-ps-line ${sel ? 'bg-[#15301f]' : i % 2 ? 'bg-ps-bar' : ''}`}>
                <td className="px-3 py-3"><input type="checkbox" aria-label={`Compare ${r.row.name}`} checked={sel} disabled={!canSelect && !sel} onChange={() => onToggle(r.row.id)} className="w-4 h-4 accent-ps-green" /></td>
                <td className="px-3 py-3 font-sans"><Link href={`/brand/${r.row.brandId}/${r.row.id}`} className="text-ps-ink font-semibold no-underline hover:underline">{r.row.name}</Link></td>
                <td className="px-3 py-3 font-sans text-ps-muted">
                  {r.row.location && r.row.location !== r.row.brandName ? `${r.row.brandName} · ${r.row.location}` : r.row.brandName}
                  <span className="ml-2"><OpenBadge state={r.open} /></span>
                  {distanceLabel(r.distanceKm) && <span className="ml-2 text-ps-dim">{distanceLabel(r.distanceKm)}</span>}
                </td>
                <td className="px-3 py-3 text-right">{fmt$(r.row.price)}</td>
                <td className="px-3 py-3 text-right">{fmtN(r.row.kcal)}</td>
                <td className="px-3 py-3 text-right text-ps-green">{fmtN(r.row.protein)}</td>
                <td className="px-3 py-3 text-right">{fmtN(r.row.carbs)}</td>
                <td className="px-3 py-3 text-right">{fmtN(r.row.fat)}</td>
                <td className="px-3 py-3 text-right font-semibold">{r.row.ppd == null ? '—' : r.row.ppd.toFixed(1)}</td>
                <td className="px-3 py-3 font-sans"><TrustBadge trust={r.row.trust} complete={r.row.complete} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Discover() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const initial = useMemo(() => filtersFromParams(new URLSearchParams(params.toString())), []); // eslint-disable-line react-hooks/exhaustive-deps
  const { index, error } = useSearchIndex();

  const [filters, setFilters] = useState<Filters>(initial.filters);
  const [ask, setAsk] = useState(initial.ask || initial.filters.q);
  const [compare, setCompare] = useState<string[]>(initial.compare);
  const [sheet, setSheet] = useState<SheetSection | null | false>(false);
  const [user, setUser] = useState<{ lat: number; lng: number } | null>(null);
  const [geo, setGeo] = useState<'idle' | 'locating' | 'on' | 'error'>('idle');
  const [shown, setShown] = useState(PAGE);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 60_000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const qs = paramsFromFilters(filters, ask && ask !== filters.q ? ask : '', compare);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters, ask, compare, pathname, router]);
  useEffect(() => setShown(PAGE), [filters]);

  const requestLocation = useCallback(async () => {
    setGeo('locating');
    try {
      const c = await getUserLocation();
      setUser(c); setGeo('on');
    } catch { setGeo('error'); }
  }, []);

  const results = useMemo(() => (index && now ? applyFilters(index, filters, { user, now }) : []), [index, filters, user, now]);
  const trustCounts = useMemo(() => {
    const c = { verified: 0, typical: 0, estimate: 0, other: 0 };
    for (const r of results) {
      if (r.row.trust === 'verified' || r.row.trust === 'operator') c.verified++;
      else if (r.row.trust === 'typical') c.typical++;
      else if (r.row.trust === 'estimate') c.estimate++;
      else c.other++;
    }
    return c;
  }, [results]);

  const submit = (text: string) => {
    const p = parseQuery(text);
    setAsk(text);
    setFilters((f) => ({ ...f, ...p.patch, q: p.text, diet: [...new Set([...f.diet, ...(p.patch.diet ?? [])])], excludeAllergens: [...new Set([...f.excludeAllergens, ...(p.patch.excludeAllergens ?? [])])], cooking: [...new Set([...f.cooking, ...(p.patch.cooking ?? [])])] }));
    if (p.nearMe && !user) requestLocation();
  };
  const toggleCompare = (id: string) => setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]));
  const chips = filterChips(filters);
  const nActive = activeFilterCount(filters);
  const compareHref = `/compare?ids=${compare.join(',')}`;

  const catChip = (label: string, section: SheetSection, on: boolean) => (
    <button key={label} onClick={() => setSheet(section)} className={`chip ${on ? 'chip-on' : ''}`}>{label}<Icon name="chev" size={12} /></button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader compareCount={compare.length} compareHref={compareHref} />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 pt-6 pb-32">
        <form onSubmit={(e) => { e.preventDefault(); submit(ask); }} className="flex flex-col gap-3 max-w-3xl">
          <label htmlFor="ask" className="font-display text-2xl sm:text-3xl font-semibold leading-tight">What can I eat?</label>
          <div className="flex items-center gap-2.5 h-14 pl-4 pr-2 rounded-2xl bg-ps-ink text-ps-bg">
            <span className="text-[#3b5270]"><Icon name="search" size={20} /></span>
            <input id="ask" value={ask} onChange={(e) => setAsk(e.target.value)} autoComplete="off"
              placeholder="e.g. 650 kcal left, 40g protein, $12, halal"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[15px] font-medium text-ps-bg placeholder:text-[#5b6f88]" />
            {ask && <button type="button" aria-label="Clear search" onClick={() => { setAsk(''); setFilters(DEFAULT_FILTERS); }} className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3b5270]"><Icon name="x" /></button>}
            <button type="submit" aria-label="Search" className="w-11 h-11 rounded-xl bg-brand text-ps-ink flex items-center justify-center"><Icon name="arrow" /></button>
          </div>
          {!chips.length && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-ps-muted">Try</span>
              {EXAMPLES.map((e) => (
                <button key={e} type="button" onClick={() => { setAsk(e); submit(e); }} className="h-8 px-3 rounded-full border border-dashed border-ps-line2 text-ps-muted text-[13px] font-semibold hover:text-ps-ink">{e}</button>
              ))}
            </div>
          )}
        </form>

        <div role="toolbar" aria-label="Filters" className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mt-4">
          <button onClick={() => setSheet(null)} className="chip bg-ps-ink text-ps-bg border-ps-ink"><Icon name="sliders" size={14} />Filters{nActive ? ` · ${nActive}` : ''}</button>
          <button onClick={() => (geo === 'on' ? (setUser(null), setGeo('idle'), setFilters((f) => ({ ...f, maxDistanceKm: null, sort: f.sort === 'distance' ? 'ppd' : f.sort }))) : requestLocation())}
            aria-pressed={geo === 'on'} className={`chip ${geo === 'on' ? 'chip-on' : ''}`}>
            <Icon name="pin" size={14} />{geo === 'locating' ? 'Locating…' : geo === 'error' ? 'Location off' : 'Near me'}
          </button>
          {catChip(filters.priceMax != null ? `Price ≤ $${filters.priceMax}` : 'Price', 'price', filters.priceMax != null)}
          {catChip('Dietary', 'diet', filters.diet.length > 0 || filters.glutenFreeConfirmed)}
          <button onClick={() => setFilters((f) => ({ ...f, openNow: !f.openNow }))} aria-pressed={filters.openNow} className={`chip ${filters.openNow ? 'chip-on' : ''}`}><Icon name="clock" size={14} />Open now</button>
          {catChip('Cooking', 'cooking', filters.cooking.length > 0 || filters.notFried || filters.spice !== 'any')}
          {catChip('Allergens', 'allergens', filters.excludeAllergens.length > 0)}
          {catChip('Distance', 'where', filters.maxDistanceKm != null || !!filters.area)}
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center mt-3">
            <span className="text-xs text-ps-muted">Active</span>
            {chips.map((c) => (
              <button key={c.id} onClick={() => setFilters(c.remove)} aria-label={`Remove ${c.label}`} className="h-8 px-2.5 rounded-full border border-ps-line2 bg-ps-raised text-[12px] font-semibold inline-flex items-center gap-1">
                {c.label}<Icon name="x" size={12} />
              </button>
            ))}
            <button onClick={() => { setFilters(DEFAULT_FILTERS); setAsk(''); }} className="text-[13px] font-semibold text-ps-blue ml-1">Clear all</button>
          </div>
        )}

        {error && <p className="mt-6 text-ps-amberink">Couldn't load the food database ({error}). Refresh to try again.</p>}
        {!index && !error && <p className="mt-6 text-ps-muted">Loading {''}dishes…</p>}

        {index && (
          <>
            <div className="mt-6 mb-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="m-0 font-display text-xl font-bold">{results.length.toLocaleString()} {results.length === 1 ? 'dish' : 'dishes'}{nActive || filters.q ? ' fit' : ''}</h1>
                <p className="m-0 text-xs text-ps-muted">
                  {trustCounts.verified} verified · {trustCounts.typical} typical · {trustCounts.estimate} estimate
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm text-ps-muted">Sort
                <select value={filters.sort} onChange={(e) => { const s = e.target.value as SortKey; setFilters((f) => ({ ...f, sort: s })); if (s === 'distance' && !user) requestLocation(); }}
                  className="h-10 px-2 rounded-lg border border-ps-line2 bg-ps-surface text-ps-ink font-semibold">
                  <option value="ppd">Protein per dollar</option>
                  <option value="price">Lowest price</option>
                  <option value="kcal">Fewest calories</option>
                  <option value="protein">Most protein</option>
                  <option value="distance">Nearest</option>
                  <option value="name">Name</option>
                </select>
              </label>
            </div>

            {results.length > 0 && trustCounts.verified === 0 && (
              <div role="note" className="mb-3 px-3 py-2.5 rounded-xl border border-dashed border-ps-amberline bg-ps-amberbg text-ps-amberink text-[13px] flex gap-2 max-w-3xl">
                <span className="text-ps-amber shrink-0 mt-0.5"><Icon name="clock" size={16} /></span>
                <span>All of these are estimates. None of them has verified nutrition yet, so treat the numbers as a guide.</span>
              </div>
            )}
            {filters.openNow && filters.includeHoursUnknown && (
              <p className="mb-3 text-[13px] text-ps-muted max-w-3xl">Most stalls don't have opening hours in PlateScreen yet, so "Open now" only removes places we know are closed, like hawker centres on their NEA cleaning day.</p>
            )}
            {results.length === 0 && (
              <div className="card p-6 text-sm text-ps-muted max-w-3xl">
                Nothing fits all of these filters. Try removing one of the active filters above.
              </div>
            )}

            <ul className="lg:hidden list-none m-0 p-0 flex flex-col gap-2.5">
              {results.slice(0, shown).map((r) => (
                <ResultCard key={r.row.id} r={r} f={filters} selected={compare.includes(r.row.id)} canSelect={compare.length < 3} onToggle={() => toggleCompare(r.row.id)} />
              ))}
            </ul>
            <div className="hidden lg:block">
              {results.length > 0 && (
                <ResultsTable rows={results.slice(0, shown)} f={filters} sort={filters.sort} onSort={(s) => setFilters((f) => ({ ...f, sort: s }))}
                  selected={compare} onToggle={toggleCompare} canSelect={compare.length < 3} />
              )}
            </div>
            {results.length > shown && (
              <button onClick={() => setShown((s) => s + PAGE * 2)} className="btn-ghost w-full max-w-3xl mt-4">Show more ({(results.length - shown).toLocaleString()} left)</button>
            )}

            <PendingList index={index} />
          </>
        )}
      </main>

      {compare.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-ps-bar border-t border-ps-line">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <span className="text-sm text-ps-muted flex-1">{compare.length} of 3 selected</span>
            <button onClick={() => setCompare([])} className="btn-ghost h-11">Clear</button>
            <Link href={compareHref} className="btn-primary no-underline">Compare {compare.length}</Link>
          </div>
        </div>
      )}

      {index && (
        <FilterSheet open={sheet !== false} focus={sheet || null} filters={filters} index={index} user={user}
          onRequestLocation={requestLocation}
          onApply={(f) => { setFilters(f); setSheet(false); }} onClose={() => setSheet(false)} />
      )}
    </div>
  );
}

function PendingList({ index }: { index: SearchIndex }) {
  const [open, setOpen] = useState(false);
  if (!index.pending.length) return null;
  return (
    <section className="mt-10 max-w-3xl">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="text-sm font-semibold text-ps-muted flex items-center gap-2">
        <Icon name="chev" size={14} />{index.pending.length} more stalls are listed but have no dishes yet
      </button>
      {open && (
        <ul className="mt-3 list-none p-0 grid sm:grid-cols-2 gap-2">
          {index.pending.map((b) => (
            <li key={b.id}><Link href={`/brand/${b.id}`} className="text-ps-ink no-underline text-sm hover:underline">{b.name}</Link>{b.location && <span className="text-xs text-ps-muted"> · {b.location}</span>}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
