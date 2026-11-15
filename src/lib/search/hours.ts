// Opening-hours logic. All times are Singapore time (UTC+8, no DST).

import type { OutletPoint, VenueInfo } from './types';

export type OpenState = 'open' | 'closed' | 'closed_today' | 'unknown';

export interface SgtClock { date: string; dow: number; minutes: number }

/** Current SGT date, day of week and minutes since midnight. */
export function sgtClock(now: Date = new Date(), atTime: string | null = null): SgtClock {
  const sgt = new Date(now.getTime() + 8 * 3600 * 1000);
  const date = sgt.toISOString().slice(0, 10);
  const minutes = atTime ? toMinutes(atTime) : sgt.getUTCHours() * 60 + sgt.getUTCMinutes();
  return { date, dow: sgt.getUTCDay(), minutes };
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

/** Is the venue closed (e.g. NEA cleaning) on this date? */
export function closureOn(venue: VenueInfo | null, date: string): [string, string, string] | null {
  if (!venue) return null;
  return venue.closures.find(([s, e]) => date >= s && date <= e) ?? null;
}

/** Next closure ending today or later. */
export function nextClosure(venue: VenueInfo | null, date: string): [string, string, string] | null {
  if (!venue) return null;
  return venue.closures.find(([, e]) => e >= date) ?? null;
}

/**
 * Open state for one outlet. Unknown hours stay 'unknown' — never treated as
 * open. A venue closure on the day overrides hours.
 */
export function outletOpenState(o: OutletPoint, venues: VenueInfo[], clock: SgtClock): OpenState {
  const venue = o.venue != null ? venues[o.venue] : null;
  if (closureOn(venue, clock.date)) return 'closed_today';
  if (!o.hours || o.hours.length === 0) return 'unknown';
  const prevDow = (clock.dow + 6) % 7;
  for (const [dow, opens, closes] of o.hours) {
    const a = toMinutes(opens); const b = toMinutes(closes);
    if (b > a) {
      if (dow === clock.dow && clock.minutes >= a && clock.minutes < b) return 'open';
    } else {
      // Crosses midnight: open from `a` today until `b` tomorrow.
      if (dow === clock.dow && clock.minutes >= a) return 'open';
      if (dow === prevDow && clock.minutes < b) return 'open';
    }
  }
  return 'closed';
}

/** Best state across several outlets: any open > any unknown > closed_today > closed. */
export function combineOpenStates(states: OpenState[]): OpenState {
  if (states.includes('open')) return 'open';
  if (states.includes('unknown')) return 'unknown';
  if (states.length && states.every((s) => s === 'closed_today')) return 'closed_today';
  return states.length ? 'closed' : 'unknown';
}
