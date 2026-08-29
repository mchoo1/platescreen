'use client';

import { PLATFORM_OPTIONS } from '@/lib/screener';
import type { UncoveredBrandRow } from '@/lib/screener';

const PLATFORM_EMOJI = Object.fromEntries(PLATFORM_OPTIONS.map((o) => [o.value, o.emoji])) as Record<string, string>;
const PLATFORM_LABEL = Object.fromEntries(PLATFORM_OPTIONS.map((o) => [o.value, o.label])) as Record<string, string>;

interface Props {
  rows: UncoveredBrandRow[];
  totalCount: number;
  showDistance: boolean;
}

const DISPLAY_CAP = 50;

export function PendingMenuList({ rows, totalCount, showDistance }: Props) {
  if (totalCount === 0) return null;

  const shown = rows.slice(0, DISPLAY_CAP);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          More outlets nearby — menu not yet available
        </p>
        <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
          {rows.length.toLocaleString()} real, physical outlet{rows.length === 1 ? '' : 's'} match your search/location/type
          filters, but we don&apos;t have their menu or macros yet — so they can&apos;t be filtered by calories, protein, or
          diet tags. Shown here so you know they exist; check the outlet directly for what&apos;s on the menu.
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="px-4 py-6 text-sm text-slate-400 text-center">No menu-pending outlets match these filters.</p>
      ) : (
        <div className="overflow-auto scrollbar-thin max-h-80">
          <table className="w-full text-sm">
            <tbody>
              {shown.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-b-0 dark:border-slate-800/60">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="mr-1.5">{row.emoji}</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{row.name}</span>
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-amber-50 text-amber-700 text-[10px] font-medium px-1.5 py-0.5 dark:bg-amber-950/40 dark:text-amber-400">
                      Menu pending
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-slate-500 dark:text-slate-400">{row.cuisine}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-slate-500 dark:text-slate-400">{row.location}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-0.5">
                      {row.platforms.map((p) => (
                        <span key={p} title={PLATFORM_LABEL[p] ?? p} className="text-xs" aria-label={PLATFORM_LABEL[p] ?? p}>
                          {PLATFORM_EMOJI[p] ?? ''}
                        </span>
                      ))}
                    </span>
                  </td>
                  {showDistance && (
                    <td className="px-4 py-2 text-right whitespace-nowrap text-slate-500 dark:text-slate-400">
                      {row.distanceKm != null ? `${row.distanceKm.toFixed(1)} km` : '—'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > DISPLAY_CAP && (
            <p className="px-4 py-2 text-xs text-slate-400 text-center">
              +{(rows.length - DISPLAY_CAP).toLocaleString()} more — narrow your search or location to see the rest.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
