// Small shared UI pieces for the v2 design.
import Link from 'next/link';
import type { Trust } from '@/lib/search/types';
import type { OpenState } from '@/lib/search/hours';

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="37" fill="none" stroke="#eef3f8" strokeWidth="7" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#eef3f8" strokeWidth="7" />
      <circle cx="50" cy="50" r="8" fill="#3fd17a" />
    </svg>
  );
}

export function AppHeader({ compareCount = 0, compareHref = '/compare' }: { compareCount?: number; compareHref?: string }) {
  return (
    <header className="border-b border-ps-line bg-ps-bar">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
        <Link href="/" className="flex items-center gap-2.5 text-ps-ink no-underline">
          <Logo />
          <span className="font-display font-bold text-xl tracking-tight">PlateScreen</span>
          <span className="hidden sm:inline text-xs text-ps-muted border border-ps-line rounded-full px-2 py-0.5">Singapore</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <Link href="/" className="px-3 py-2 rounded-lg text-sm font-semibold text-ps-ink no-underline hover:bg-ps-raised">Discover</Link>
          <Link href={compareHref} className="px-3 py-2 rounded-lg text-sm font-semibold text-ps-muted no-underline hover:bg-ps-raised hover:text-ps-ink">
            Compare{compareCount ? ` · ${compareCount}` : ''}
          </Link>
        </nav>
      </div>
    </header>
  );
}

const TRUST: Record<Trust, { label: string; cls: string; title: string }> = {
  verified: { label: 'Verified', cls: 'bg-ps-green text-ps-bg border border-ps-green', title: 'Published by the brand' },
  operator: { label: 'From stall', cls: 'bg-ps-green text-ps-bg border border-ps-green', title: 'Provided by the stall or brand' },
  typical: { label: 'Typical', cls: 'text-ps-amber border border-dashed border-ps-amber', title: 'Standard estimate for this dish — not measured at this stall' },
  estimate: { label: 'Estimate', cls: 'text-ps-amber border border-dashed border-ps-amber', title: 'Estimated for this dish' },
  community: { label: 'Community', cls: 'text-ps-blue border border-dashed border-ps-blue', title: 'Submitted by a user, not yet verified' },
};

export function TrustBadge({ trust, complete = true }: { trust: Trust | null; complete?: boolean }) {
  if (!trust) return <span className="text-[11px] font-bold uppercase tracking-wide text-ps-muted border border-dashed border-ps-dim rounded-full px-2 py-0.5">No data</span>;
  const t = TRUST[trust];
  return (
    <span title={t.title} className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 whitespace-nowrap ${t.cls}`}>
      {(trust === 'verified' || trust === 'operator') && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
      )}
      {t.label}{!complete && ' · incomplete'}
    </span>
  );
}

export function trustExplanation(trust: Trust | null): string {
  return trust ? TRUST[trust].title : 'No nutrition data yet';
}

export function OpenBadge({ state }: { state: OpenState }) {
  if (state === 'open') return <span className="text-[11px] font-bold uppercase tracking-wide text-ps-green">Open now</span>;
  if (state === 'closed_today') return <span className="text-[11px] font-bold uppercase tracking-wide text-ps-amber">Closed today · cleaning</span>;
  if (state === 'closed') return <span className="text-[11px] font-bold uppercase tracking-wide text-ps-muted">Closed now</span>;
  return null;
}

export const fmt$ = (n: number | null) => (n == null ? '—' : `$${n.toFixed(2)}`);
export const fmtN = (n: number | null, unit = '') => (n == null ? '—' : `${Math.round(n * 10) / 10}${unit}`);

export function Icon({ name, size = 18 }: { name: 'search' | 'sliders' | 'pin' | 'x' | 'chev' | 'arrow' | 'check' | 'clock' | 'back'; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (name) {
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>;
    case 'sliders': return <svg {...p}><path d="M4 6h16M7 12h10M10 18h4" /></svg>;
    case 'pin': return <svg {...p}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case 'x': return <svg {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case 'chev': return <svg {...p}><path d="M6 9l6 6 6-6" /></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'check': return <svg {...p}><path d="M5 12l5 5 9-10" /></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case 'back': return <svg {...p}><path d="M15 5l-7 7 7 7" /></svg>;
  }
}
