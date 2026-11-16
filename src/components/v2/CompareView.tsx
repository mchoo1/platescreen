'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { SearchRow } from '@/lib/search/types';
import { useSearchIndex } from './useSearchIndex';
import { AppHeader, Icon, TrustBadge, fmt$, fmtN } from './ui';

type Metric = { label: string; get: (r: SearchRow) => number | null; best: 'min' | 'max'; fmt: (v: number | null) => string };

const kcalPerProtein = (r: SearchRow) => (r.kcal != null && r.protein ? Math.round((r.kcal / r.protein) * 10) / 10 : null);

const METRICS: Metric[] = [
  { label: 'Price', get: (r) => r.price, best: 'min', fmt: fmt$ },
  { label: 'Calories', get: (r) => r.kcal, best: 'min', fmt: (v) => fmtN(v) },
  { label: 'Protein', get: (r) => r.protein, best: 'max', fmt: (v) => fmtN(v, ' g') },
  { label: 'Carbs', get: (r) => r.carbs, best: 'min', fmt: (v) => fmtN(v, ' g') },
  { label: 'Fat', get: (r) => r.fat, best: 'min', fmt: (v) => fmtN(v, ' g') },
  { label: 'Protein per $', get: (r) => r.ppd, best: 'max', fmt: (v) => (v == null ? '—' : `${v.toFixed(1)} g`) },
  { label: 'kcal per g protein', get: kcalPerProtein, best: 'min', fmt: (v) => fmtN(v) },
];

export function CompareView() {
  const params = useSearchParams();
  const ids = (params.get('ids') ?? '').split(',').filter(Boolean).slice(0, 3);
  const { index, error } = useSearchIndex();
  const rows = useMemo(() => (index ? ids.map((id) => index.rows.find((r) => r.id === id)).filter((r): r is SearchRow => !!r) : []), [index, ids.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  const bestIdx = (m: Metric) => {
    const vals = rows.map(m.get);
    const known = vals.filter((v): v is number => v != null);
    if (known.length < 2) return new Set<number>();
    const target = m.best === 'min' ? Math.min(...known) : Math.max(...known);
    return new Set(vals.flatMap((v, i) => (v === target ? [i] : [])));
  };
  const winner = useMemo(() => {
    const scored = rows.filter((r) => r.ppd != null).sort((a, b) => (b.ppd ?? 0) - (a.ppd ?? 0));
    return scored[0] ?? null;
  }, [rows]);

  return (
    <div className="min-h-screen">
      <AppHeader compareCount={rows.length} compareHref={`/compare?ids=${ids.join(',')}`} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-ps-muted no-underline mb-3"><Icon name="back" size={16} />Back to results</Link>
        <h1 className="font-display text-2xl font-bold m-0 mb-4">Compare {rows.length || ''}</h1>
        {error && <p className="text-ps-amberink">Couldn't load the food database ({error}).</p>}
        {index && rows.length === 0 && <p className="text-ps-muted">Pick up to 3 dishes on Discover, then tap Compare.</p>}
        {rows.length > 0 && (
          <>
            {winner && rows.length > 1 && (
              <section className="mb-4 p-4 rounded-2xl bg-ps-greenbg border border-ps-greenline">
                <p className="m-0 label-caps !text-ps-greenink">Most protein per dollar</p>
                <p className="m-0 mt-1 font-display text-xl font-bold">{winner.name}</p>
                <p className="m-0 mt-1 text-sm text-[#cdeedd]">{winner.brandName} · {winner.ppd?.toFixed(1)} g protein per dollar. Calculated from the numbers below, never by AI.</p>
              </section>
            )}
            <div className="overflow-x-auto rounded-2xl border border-ps-line">
              <table className="w-full border-collapse text-sm table-fixed min-w-[340px]">
                <caption className="sr-only">Nutrition and price side by side</caption>
                <colgroup><col className="w-24 sm:w-36" />{rows.map((r) => <col key={r.id} />)}</colgroup>
                <thead className="bg-ps-surface">
                  <tr>
                    <th scope="col" />
                    {rows.map((r) => (
                      <th key={r.id} scope="col" className="text-left align-top px-2 sm:px-3 py-3">
                        <Link href={r.kind === 'set' ? `/brand/${r.brandId}/meal/${r.id}` : `/brand/${r.brandId}/${r.id}`} className="text-ps-ink no-underline font-bold leading-snug hover:underline">{r.name}</Link>
                        <div className="text-xs font-medium text-ps-muted mt-0.5">{r.brandName}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {METRICS.map((m, mi) => {
                    const best = bestIdx(m);
                    return (
                      <tr key={m.label} className={`border-t border-ps-line ${mi % 2 ? 'bg-ps-bar' : ''}`}>
                        <th scope="row" className="text-left px-3 py-3 font-sans text-xs font-semibold text-ps-muted">{m.label}</th>
                        {rows.map((r, i) => (
                          <td key={r.id} className={`px-2 sm:px-3 py-3 text-[13px] sm:text-sm ${best.has(i) ? 'text-ps-green font-semibold' : ''}`}>
                            {m.fmt(m.get(r))}{best.has(i) && <span className="sr-only"> (best)</span>}{best.has(i) && ' ✓'}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr className="border-t border-ps-line">
                    <th scope="row" className="text-left px-3 py-3 font-sans text-xs font-semibold text-ps-muted">Data</th>
                    {rows.map((r) => <td key={r.id} className="px-3 py-3 font-sans"><TrustBadge trust={r.trust} complete={r.complete} /></td>)}
                  </tr>
                  <tr className="border-t border-ps-line bg-ps-bar">
                    <th scope="row" className="text-left px-3 py-3 font-sans text-xs font-semibold text-ps-muted">Where</th>
                    {rows.map((r) => <td key={r.id} className="px-3 py-3 font-sans text-xs text-ps-muted">{r.location}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-ps-muted">✓ marks the best value in each row. Unknown values (—) are never counted as zero.</p>
          </>
        )}
      </main>
    </div>
  );
}
