// Per-dish SEO page — static export via generateStaticParams(). One of
// these exists for every one of the 2,552 real, sourced menu items, each
// answering a specific long-tail search ("mcdonald's big mac protein
// singapore") that the single-page screener app can't rank for on its own.
// See reference/planning/GROWTH_STRATEGY.md and src/lib/brandPages.ts.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllBrandItemParams, getDishPageData, brandLocationSummary } from '@/lib/brandPages';
import { fmtMoney, ppdBadgeClasses } from '@/lib/utils';

export function generateStaticParams() {
  return getAllBrandItemParams();
}

export function generateMetadata({ params }: { params: { id: string; itemId: string } }): Metadata {
  const data = getDishPageData(params.id, params.itemId);
  if (!data) return { title: 'Not found — PlateScreen' };
  const { brand, item } = data;
  const title = `${item.name} (${brand.name}) — Calories & Protein | PlateScreen`;
  const description = `${item.name} at ${brand.name}, Singapore: ${item.calories} cal, ${item.protein}g protein, ${item.carbs}g carbs, ${item.fat}g fat, ${fmtMoney(item.price)}. Protein-per-dollar: ${item.ppd.toFixed(1)}g/$.`;
  return {
    title,
    description,
    alternates: { canonical: `/brand/${brand.id}/${item.id}` },
    openGraph: { title, description },
  };
}

export default function DishPage({ params }: { params: { id: string; itemId: string } }) {
  const data = getDishPageData(params.id, params.itemId);
  if (!data) notFound();
  const { brand, item, premises, otherItems } = data;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-blue-600">PlateScreen</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/brand/${brand.id}`} className="hover:text-blue-600">{brand.name}</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">{item.name}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span>{item.emoji}</span>
          {item.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {brand.emoji} <Link href={`/brand/${brand.id}`} className="hover:text-blue-600">{brand.name}</Link> · {item.category} · {brandLocationSummary(premises)}
        </p>
        {item.isPopular && (
          <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5">
            Popular
          </span>
        )}
        {item.confidence !== 'verified' && (
          <span className="mt-2 ml-1.5 inline-flex items-center rounded-full bg-slate-100 text-slate-500 text-xs font-medium px-2 py-0.5">
            Estimated
          </span>
        )}
      </header>

      <section className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Calories', value: item.calories },
          { label: 'Protein', value: `${item.protein}g` },
          { label: 'Carbs', value: `${item.carbs}g` },
          { label: 'Fat', value: `${item.fat}g` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 p-3 text-center">
            <div className="text-lg font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="mb-8 flex items-center justify-between rounded-xl border border-slate-200 p-4">
        <div>
          <div className="text-sm text-slate-500">Price</div>
          <div className="text-xl font-bold text-slate-900">{fmtMoney(item.price)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Protein per dollar</div>
          <span className={`inline-flex items-center rounded-full text-sm font-semibold px-2.5 py-1 ${ppdBadgeClasses(item.ppd)}`}>
            {item.ppd.toFixed(1)}g/$
          </span>
        </div>
      </section>

      {item.compatibleWith.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">Diet compatibility</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.compatibleWith.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5">
                {tag.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </section>
      )}

      {otherItems.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-slate-900 mb-2">More from {brand.name}</h2>
          <ul className="text-sm space-y-1">
            {otherItems.slice(0, 8).map((m) => (
              <li key={m.id}>
                <Link href={`/brand/${brand.id}/${m.id}`} className="text-slate-600 hover:text-blue-600">
                  {m.emoji} {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">
        Sourced macro data, not a generic per-cuisine estimate.{' '}
        <Link href="/" className="text-blue-600 hover:underline">Screen every dish in Singapore →</Link>
      </p>
    </main>
  );
}
