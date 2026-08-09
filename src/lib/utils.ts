import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}

/** Tailwind pill classes for a protein/$ value — mirrors ppdColor() thresholds. */
export function ppdBadgeClasses(ppd: number): string {
  if (ppd >= 6) return 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400';
  if (ppd >= 3) return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
  return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400';
}
