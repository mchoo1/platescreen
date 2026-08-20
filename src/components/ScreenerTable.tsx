'use client';

import { cn, fmtMoney, ppdBadgeClasses } from '@/lib/utils';
import type { ScreenerRow, SortKey, SortDir } from '@/lib/screener';

interface Column {
  key: SortKey;
  label: string;
  align?: 'left' | 'right';
}

const COLUMNS: Column[] = [
  { key: 'name', label: 'Item' },
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'location', label: 'Location' },
  { key: 'calories', label: 'Cal', align: 'right' },
  { key: 'protein', label: 'Protein', align: 'right' },
  { key: 'carbs', label: 'Carbs', align: 'right' },
  { key: 'fat', label: 'Fat', align: 'right' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'ppd', label: 'Protein/$', align: 'right' },
];

interface Props {
  rows: ScreenerRow[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  trayIds: Set<string>;
  onToggleTray: (row: ScreenerRow) => void;
  showDistance: boolean;
}

export function ScreenerTable({ rows, sortKey, sortDir, onSort, trayIds, onToggleTray, showDistance }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="overflow-auto scrollbar-thin max-h-[70vh]">
        <table className="w-full text-sm tabular min-w-[980px]">
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900">
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="w-9 px-3 py-2.5"></th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className={cn(
                    'px-3 py-2.5 font-medium text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none whitespace-nowrap hover:text-slate-900 dark:hover:text-slate-100',
                    col.align === 'right' ? 'text-right' : 'text-left'
                  )}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1 text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
              {showDistance && (
                <th
                  onClick={() => onSort('distance')}
                  className="px-3 py-2.5 font-medium text-xs text-slate-500 dark:text-slate-400 cursor-pointer select-none text-right whitespace-nowrap hover:text-slate-900 dark:hover:text-slate-100"
                >
                  Distance
                  {sortKey === 'distance' && (
                    <span className="ml-1 text-blue-600">{sortDir === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              )}
              <th className="px-3 py-2.5 text-left text-xs font-medium text-slate-500 dark:text-slate-400">Tags</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800/40"
              >
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={trayIds.has(row.id)}
                    onChange={() => onToggleTray(row)}
                    className="w-4 h-4 rounded accent-blue-600"
                    aria-label={`Add ${row.name} to tray`}
                  />
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="mr-1.5">{row.emoji}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{row.name}</span>
                  {row.isPopular && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 dark:bg-blue-950 dark:text-blue-400">
                      Popular
                    </span>
                  )}
                  {row.confidence !== 'verified' && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-medium px-1.5 py-0.5 dark:bg-slate-800 dark:text-slate-400">
                      Est.
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-600 dark:text-slate-400">
                  <span className="mr-1">{row.restaurantEmoji}</span>
                  {row.restaurantName}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-slate-500 dark:text-slate-400">
                  {row.location || '—'}
                </td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300">{row.calories}</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300">{row.protein}g</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300">{row.carbs}g</td>
                <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300">{row.fat}g</td>
                <td className="px-3 py-2 text-right font-medium text-slate-900 dark:text-slate-100">{fmtMoney(row.price)}</td>
                <td className="px-3 py-2 text-right">
                  <span className={cn('inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5', ppdBadgeClasses(row.ppd))}>
                    {row.ppd.toFixed(1)}
                  </span>
                </td>
                {showDistance && (
                  <td className="px-3 py-2 text-right text-slate-500 dark:text-slate-400">
                    {row.distanceKm != null ? (
                      <>
                        {row.distanceKm.toFixed(1)} km
                        {row.nearestBranchName && (
                          <div className="text-[10px] text-slate-400 dark:text-slate-500">{row.nearestBranchName}</div>
                        )}
                      </>
                    ) : '—'}
                  </td>
                )}
                <td className="px-3 py-2 whitespace-nowrap text-xs text-slate-400">
                  {row.compatibleWith.slice(0, 3).join(', ')}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={showDistance ? 12 : 11} className="px-3 py-14 text-center text-slate-400">
                  No items match these filters. Try loosening a slider or clearing a tag.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
