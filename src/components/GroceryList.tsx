'use client';

import { cn, fmtMoney, ppdBadgeClasses } from '@/lib/utils';
import type { GroceryRow } from '@/lib/screener';

interface Props {
  rows: GroceryRow[];
  totalCount: number;
}

/** Per-unit macro display: for count-based items (eggs), per100 fields are "per 100 units" — show per single unit instead, which reads far more naturally than "per 100 eggs". For g/ml items, per-100 is the natural grocery-label convention. */
function macroBasis(row: GroceryRow) {
  if (row.packageUnit === 'each') {
    return {
      label: 'per egg/piece',
      calories: Math.round(row.caloriesPer100 / 100),
      protein: Math.round((row.proteinPer100 / 100) * 10) / 10,
      carbs: Math.round((row.carbsPer100 / 100) * 10) / 10,
      fat: Math.round((row.fatPer100 / 100) * 10) / 10,
      price: Math.round((row.pricePer100 / 100) * 100) / 100,
    };
  }
  return {
    label: `per 100${row.packageUnit}`,
    calories: row.caloriesPer100,
    protein: row.proteinPer100,
    carbs: row.carbsPer100,
    fat: row.fatPer100,
    price: row.pricePer100,
  };
}

export function GroceryList({ rows, totalCount }: Props) {
  if (totalCount === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Pantry — raw ingredients &amp; packaged groceries
        </p>
        <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
          {totalCount} product{totalCount === 1 ? '' : 's'} priced per package with per-100g/ml macros — for cooking at
          home, not a single serving you&apos;d order and eat like the results above.
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-6 text-sm text-slate-400 text-center">No pantry items match this search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
          {rows.map((row) => {
            const basis = macroBasis(row);
            return (
              <div key={row.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 truncate dark:text-slate-100">
                      <span className="mr-1">{row.emoji}</span>
                      {row.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
                      <span className="mr-1">{row.retailerEmoji}</span>
                      {row.retailerName} · {row.category}
                    </div>
                  </div>
                  <span className={cn('shrink-0 inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5', ppdBadgeClasses(row.ppd))}>
                    {row.ppd.toFixed(1)} g/$
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {row.packageSize}
                    {row.packageUnit === 'each' ? ' pc' : row.packageUnit} pack · {fmtMoney(row.packagePrice)}
                  </span>
                  {row.confidence !== 'verified' && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium px-1.5 py-0.5 dark:bg-slate-800 dark:text-slate-400">
                      Est.
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <span>{basis.calories} cal</span>
                  <span>{basis.protein}g protein</span>
                  <span>{basis.carbs}g carbs</span>
                  <span>{basis.fat}g fat</span>
                  <span className="text-slate-400">({fmtMoney(basis.price)} {basis.label})</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
