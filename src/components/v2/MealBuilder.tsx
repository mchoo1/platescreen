'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { MealOptionView } from '@/lib/pages';
import { TrustBadge, fmtN } from './ui';

interface Props {
  meal: {
    id: string; name: string; brandName: string; brandId: string;
    groups: { id: string; name: string; options: MealOptionView[] }[];
    setPrice: number | null; setPriceUnconfirmed: boolean; mainProductId: string | null;
  };
}

const deltaLabel = (o: MealOptionView) =>
  o.isDefault ? 'Included' : o.priceDelta == null ? 'Price not known' : o.priceDelta === 0 ? 'No extra charge' : `+ $${o.priceDelta.toFixed(2)}`;

export function MealBuilder({ meal }: Props) {
  const [sel, setSel] = useState<Record<string, string>>(() =>
    Object.fromEntries(meal.groups.map((g) => [g.id, (g.options.find((o) => o.isDefault) ?? g.options[0]).id])));

  const chosen = meal.groups.map((g) => g.options.find((o) => o.id === sel[g.id])!);
  const totals = useMemo(() => {
    const t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    let known = 0;
    for (const o of chosen) {
      const full = o.kcal != null && o.protein != null && o.carbs != null && o.fat != null;
      if (full) known++;
      t.kcal += o.kcal ?? 0; t.protein += o.protein ?? 0; t.carbs += o.carbs ?? 0; t.fat += o.fat ?? 0;
    }
    let price: number | null = meal.setPrice;
    for (const o of chosen) price = price == null || o.priceDelta == null ? null : price + o.priceDelta;
    return { ...t, known, complete: known === chosen.length, price };
  }, [chosen, meal.setPrice]);
  const ge = totals.complete ? '' : '≥ ';
  const worst = chosen.some((o) => o.trust !== 'verified') ? (chosen.find((o) => o.trust !== 'verified')?.trust ?? null) : 'verified';

  return (
    <>
      <header className="flex flex-col gap-1">
        <p className="m-0 text-sm text-ps-muted">{meal.brandName} · all outlets</p>
        <h1 className="m-0 font-display text-3xl font-bold tracking-tight">{meal.name}</h1>
      </header>

      <section aria-label="Meal totals" aria-live="polite"
        className={`p-4 rounded-2xl flex flex-col gap-3 bg-ps-surface ${totals.complete ? 'border border-ps-line' : 'border-[1.5px] border-dashed border-ps-amberline'}`}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <TrustBadge trust={worst} complete={totals.complete} />
          <span className="font-mono text-lg font-semibold">
            {totals.price == null ? 'Price not known' : `$${totals.price.toFixed(2)}`}
            {meal.setPriceUnconfirmed && totals.price != null && <span className="block text-[11px] font-sans font-medium text-ps-muted text-right">unconfirmed price</span>}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl font-semibold tracking-tight">{ge}{Math.round(totals.kcal)}</span>
          <span className="text-ps-muted">kcal</span>
        </div>
        <div className="grid grid-cols-3 gap-2 font-mono">
          {([['protein', totals.protein, 'text-ps-green'], ['carbs', totals.carbs, ''], ['fat', totals.fat, '']] as const).map(([l, v, cls]) => (
            <div key={l} className="px-3 py-2 rounded-xl bg-ps-raised"><div className={`text-base font-semibold ${cls}`}>{ge}{fmtN(v, ' g')}</div><div className="text-xs text-ps-muted font-sans">{l}</div></div>
          ))}
        </div>
        {!totals.complete && <p className="m-0 text-sm text-ps-amberink">Some parts of this meal have no nutrition data, so these totals are a minimum. The real total is higher.</p>}
      </section>

      {meal.groups.map((g) => (
        <fieldset key={g.id} className="border-0 m-0 p-0 flex flex-col gap-2">
          <legend className="text-[13px] font-bold text-ps-muted mb-2 p-0">{g.name} · choose 1</legend>
          {g.options.map((o) => {
            const on = sel[g.id] === o.id;
            return (
              <label key={o.id} className={`flex items-center gap-3 p-3 rounded-xl bg-ps-surface cursor-pointer ${on ? 'border-[1.5px] border-ps-green' : 'border border-ps-line'}`}>
                <input type="radio" name={g.id} checked={on} onChange={() => setSel((s) => ({ ...s, [g.id]: o.id }))} className="w-5 h-5 accent-ps-green" />
                <span className="flex-1 flex flex-col min-w-0">
                  <span className="font-semibold">{o.name}</span>
                  <span className="text-xs text-ps-muted font-mono">{o.kcal == null ? 'no nutrition data' : `${o.kcal} kcal · ${fmtN(o.protein, ' g')} P`} · <span className="font-sans">{deltaLabel(o)}</span></span>
                </span>
                {g.options.length > 1 && <TrustBadge trust={o.trust} />}
              </label>
            );
          })}
        </fieldset>
      ))}

      <div className="flex gap-2.5 flex-wrap">
        <Link href={`/compare?ids=${meal.id}`} className="btn-ghost no-underline">Compare</Link>
        {meal.mainProductId && <Link href={`/brand/${meal.brandId}/${meal.mainProductId}`} className="btn-ghost no-underline">Main item details</Link>}
      </div>
    </>
  );
}
