'use client';

import { cn } from '@/lib/utils';
import { PRESETS } from '@/lib/screener';

interface Props {
  activePreset: string | null;
  onSelect: (id: string | null) => void;
}

export function PresetBar({ activePreset, onSelect }: Props) {
  return (
    <div className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:bg-slate-800 dark:border-slate-700">
      {PRESETS.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(activePreset === p.id ? null : p.id)}
          title={p.description}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            activePreset === p.id
              ? 'bg-white text-blue-700 shadow-card dark:bg-slate-900 dark:text-blue-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          )}
        >
          {p.label}
          <span className="ml-1.5 text-xs font-normal opacity-60">{p.description}</span>
        </button>
      ))}
    </div>
  );
}
