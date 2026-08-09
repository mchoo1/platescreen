'use client';

import { fmtMoney } from '@/lib/utils';
import type { ScreenerRow } from '@/lib/screener';

interface Props {
  items: ScreenerRow[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function MealTray({ items, onRemove, onClear }: Props) {
  if (items.length === 0) return null;

  const totals = items.reduce(
    (acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat,
      cost: acc.cost + i.price,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0 }
  );

  return (
    <div className="sticky bottom-3 z-20 px-3">
      <div className="max-w-[1400px] mx-auto rounded-xl border border-slate-200 bg-white shadow-lg p-3 flex flex-col gap-2 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-wrap gap-1.5 max-h-14 overflow-y-auto scrollbar-thin">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => onRemove(i.id)}
              className="rounded-full bg-slate-100 text-xs px-2.5 py-1 hover:bg-red-50 hover:text-red-700 dark:bg-slate-800 dark:text-slate-300"
              title="Remove from tray"
            >
              {i.emoji} {i.name} ✕
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          <span className="inline-flex items-center rounded-full bg-blue-600 text-white text-xs font-semibold px-2.5 py-1">
            {items.length} item{items.length !== 1 ? 's' : ''} in tray
          </span>
          <span className="text-slate-600 dark:text-slate-400"><span className="text-slate-400 dark:text-slate-500">Cal</span> <b className="tabular text-slate-900 dark:text-slate-100">{Math.round(totals.calories)}</b></span>
          <span className="text-slate-600 dark:text-slate-400"><span className="text-slate-400 dark:text-slate-500">Protein</span> <b className="tabular text-slate-900 dark:text-slate-100">{Math.round(totals.protein)}g</b></span>
          <span className="text-slate-600 dark:text-slate-400"><span className="text-slate-400 dark:text-slate-500">Carbs</span> <b className="tabular text-slate-900 dark:text-slate-100">{Math.round(totals.carbs)}g</b></span>
          <span className="text-slate-600 dark:text-slate-400"><span className="text-slate-400 dark:text-slate-500">Fat</span> <b className="tabular text-slate-900 dark:text-slate-100">{Math.round(totals.fat)}g</b></span>
          <span className="text-slate-600 dark:text-slate-400"><span className="text-slate-400 dark:text-slate-500">Est. cost</span> <b className="tabular text-slate-900 dark:text-slate-100">{fmtMoney(totals.cost)}</b></span>
          <button onClick={onClear} className="ml-auto text-sm text-red-600 hover:underline">Clear tray</button>
        </div>
      </div>
    </div>
  );
}
