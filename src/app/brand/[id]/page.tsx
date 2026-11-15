// Per-brand page — statically generated for every brand.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allBrandIds, fmtDate, getBrand, outletTypeLabel } from '@/lib/pages';
import { AppHeader, TrustBadge, fmt$, fmtN } from '@/components/v2/ui';

export function generateStaticParams() {
  return allBrandIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const b = getBrand(params.id);
  if (!b) return { title: 'Not found — PlateScreen' };
  const title = `${b.brand.name} — Calories, Protein & Price in Singapore | PlateScreen`;
  const description = b.items.length
    ? `${b.brand.name}: calories, protein, price, allergens and cooking style for ${b.items.length} dish${b.items.length === 1 ? '' : 'es'} in Singapore.${b.outletCount > 1 ? ` ${b.outletCount} outlets.` : ''}`
    : `${b.brand.name} — ${outletTypeLabel(b.brand.type).toLowerCase()} in Singapore. Menu data coming soon.`;
  return { title, description, alternates: { canonical: `/brand/${b.brand.id}` }, openGraph: { title, description } };
}

export default function BrandPage({ params }: { params: { id: string } }) {
  const b = getBrand(params.id);
  if (!b) notFound();
  const { brand, items, outlets, outletCount } = b;
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">
        <nav aria-label="Breadcrumb" className="text-sm text-ps-muted"><Link href="/" className="text-ps-muted no-underline hover:text-ps-ink">PlateScreen</Link></nav>
        <header className="flex flex-col gap-1">
          <h1 className="m-0 font-display text-3xl font-bold">{brand.name}</h1>
          <p className="m-0 text-sm text-ps-muted">{outletTypeLabel(brand.type)} · {brand.cuisine} · {brand.priceRange}{outletCount > 1 ? ` · ${outletCount} outlets` : outlets[0]?.venue ? ` · ${outlets[0].venue.name}` : ''}</p>
        </header>

        <section className="flex flex-col gap-2">
          <h2 className="m-0 label-caps">Menu{items.length ? ` · ${items.length}` : ''}</h2>
          {items.length === 0 ? (
            <p className="m-0 text-sm text-ps-muted">We know this stall exists but haven't found a reliable source for its dishes yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-ps-line">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead className="bg-ps-surface text-xs uppercase tracking-wider text-ps-muted">
                  <tr>
                    <th scope="col" className="text-left px-3 py-3 font-semibold">Dish</th>
                    <th scope="col" className="text-right px-3 py-3 font-semibold">Price</th>
                    <th scope="col" className="text-right px-3 py-3 font-semibold">kcal</th>
                    <th scope="col" className="text-right px-3 py-3 font-semibold">Protein</th>
                    <th scope="col" className="text-right px-3 py-3 font-semibold">g P / $</th>
                    <th scope="col" className="text-left px-3 py-3 font-semibold">Data</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[13px]">
                  {items.map(({ product, profile, trust, price, ppd }, i) => (
                    <tr key={product.id} className={`border-t border-ps-line ${i % 2 ? 'bg-ps-bar' : ''}`}>
                      <td className="px-3 py-3 font-sans"><Link href={`/brand/${brand.id}/${product.id}`} className="text-ps-ink no-underline font-semibold hover:underline">{product.name}</Link></td>
                      <td className="px-3 py-3 text-right">{fmt$(price)}</td>
                      <td className="px-3 py-3 text-right">{fmtN(profile?.caloriesKcal ?? null)}</td>
                      <td className="px-3 py-3 text-right text-ps-green">{fmtN(profile?.proteinG ?? null, ' g')}</td>
                      <td className="px-3 py-3 text-right">{ppd == null ? '—' : ppd.toFixed(1)}</td>
                      <td className="px-3 py-3 font-sans"><TrustBadge trust={trust} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {outletCount > 0 && (
          <section className="card p-4 flex flex-col gap-3">
            <h2 className="m-0 text-[15px] font-bold">{outletCount === 1 ? 'Where' : `Outlets (${outletCount})`}</h2>
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 gap-3 text-sm">
              {outlets.map((o) => (
                <li key={o.outlet.id} className="flex flex-col gap-0.5">
                  <span className="font-semibold">{o.venue?.name ?? o.outlet.label}</span>
                  {o.outlet.address && <span className="text-xs text-ps-muted">{o.outlet.address}</span>}
                  {o.upcomingClosures[0] && <span className="text-xs text-ps-muted">Next centre closure: {fmtDate(o.upcomingClosures[0].startDate)}</span>}
                </li>
              ))}
            </ul>
            {outletCount > outlets.length && <p className="m-0 text-xs text-ps-muted">Showing {outlets.length} of {outletCount}.</p>}
          </section>
        )}
      </main>
    </div>
  );
}
