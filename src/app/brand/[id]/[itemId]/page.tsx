// Per-dish page — statically generated for every product (SEO long tail:
// "tian tian chicken rice calories"). Shows where each number comes from.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ALLERGENS } from '@/db/schema';
import { ALLERGEN_LABEL, COOKING_LABEL, DAY, allDishParams, fmtDate, getDish, outletTypeLabel } from '@/lib/pages';
import { AppHeader, Icon, TrustBadge, fmt$, fmtN } from '@/components/v2/ui';

export function generateStaticParams() {
  return allDishParams();
}

export function generateMetadata({ params }: { params: { id: string; itemId: string } }): Metadata {
  const d = getDish(params.id, params.itemId);
  if (!d) return { title: 'Not found — PlateScreen' };
  const p = d.profile;
  const est = d.trust === 'verified' || d.trust === 'operator' ? '' : ' (estimated)';
  const title = `${d.product.name} (${d.brand.name}) — Calories, Protein & Price | PlateScreen`;
  const description = p
    ? `${d.product.name} at ${d.brand.name}, Singapore: ${fmtN(p.caloriesKcal)} kcal, ${fmtN(p.proteinG)} g protein, ${fmtN(p.carbohydrateG)} g carbs, ${fmtN(p.fatG)} g fat${est}, ${fmt$(d.price?.amount ?? null)}. Allergens, cooking style and outlets.`
    : `${d.product.name} at ${d.brand.name}, Singapore. Price, allergens, cooking style and outlets.`;
  return { title, description, alternates: { canonical: `/brand/${d.brand.id}/${d.product.id}` }, openGraph: { title, description } };
}

const TRUST_COPY: Record<string, { title: string; body: string }> = {
  verified: { title: 'Verified', body: 'From the brand’s published nutrition information.' },
  operator: { title: 'From the stall', body: 'Provided by the stall or brand.' },
  typical: { title: 'Typical for this dish', body: 'Not measured at this stall. It’s PlateScreen’s standard estimate for this kind of dish, so other stalls show the same numbers.' },
  estimate: { title: 'Estimate', body: 'Estimated for this dish. Not measured or published by the stall.' },
  community: { title: 'Community', body: 'Submitted by a PlateScreen user and not yet verified.' },
};

export default function DishPage({ params }: { params: { id: string; itemId: string } }) {
  const d = getDish(params.id, params.itemId);
  if (!d) notFound();
  const { brand, product, profile: p } = d;
  const kcal = p?.caloriesKcal ?? null;
  const split = p && kcal && p.proteinG != null && p.carbohydrateG != null && p.fatG != null
    ? { P: p.proteinG * 4, C: p.carbohydrateG * 4, F: p.fatG * 9 } : null;
  const splitTotal = split ? split.P + split.C + split.F : 0;
  const trustCopy = d.trust ? TRUST_COPY[d.trust] : null;
  const declared = d.allergens.filter((a) => a.basis !== 'dish_inference');
  const likely = d.allergens.filter((a) => a.basis === 'dish_inference');
  const known = new Set(d.allergens.map((a) => a.allergen));
  const unknown = ALLERGENS.filter((a) => !known.has(a));
  const glutenFree = d.claims.find((c) => c.claim === 'gluten_free' || c.claim === 'naturally_gluten_free');
  const methods = [...d.preparation].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  const yesTags = d.dietTags.filter((t) => t.value === 'yes' && ['halal', 'no_pork', 'vegetarian', 'vegan', 'pescatarian'].includes(t.tag));
  const issue = `https://github.com/mchoo1/platescreen/issues/new?title=${encodeURIComponent(`Data fix: ${product.name} (${brand.name})`)}&body=${encodeURIComponent(`Dish id: ${product.id}\nWhat's wrong (price / nutrition / allergens / hours / closed):\n\nWhat you saw (and a photo or link if you have one):\n`)}`;

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
        <nav aria-label="Breadcrumb" className="text-sm text-ps-muted">
          <Link href="/" className="text-ps-muted no-underline hover:text-ps-ink">PlateScreen</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/brand/${brand.id}`} className="text-ps-muted no-underline hover:text-ps-ink">{brand.name}</Link>
        </nav>

        <header className="flex flex-col gap-1">
          <p className="m-0 text-sm text-ps-muted">{brand.name} · {outletTypeLabel(brand.type)}{d.outletCount === 1 && d.outlets[0]?.venue ? ` · ${d.outlets[0].venue.name}` : d.outletCount > 1 ? ` · ${d.outletCount} outlets` : ''}</p>
          <h1 className="m-0 font-display text-3xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-3 flex-wrap mt-1">
            <span className="font-mono text-xl font-semibold">{fmt$(d.price?.amount ?? null)}</span>
            <span className="text-xs text-ps-muted">{d.price?.lastVerifiedAt ? `price checked ${fmtDate(d.price.lastVerifiedAt)}` : 'price not yet dated'}{d.price?.kind === 'set' ? ' · set price' : ''}</span>
            {d.ppd != null && <span className="text-xs text-ps-muted">· <b className="text-ps-ink font-mono">{d.ppd.toFixed(1)}</b> g protein per $</span>}
          </div>
        </header>

        <section aria-label="Nutrition" className="card p-4 flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            {[['kcal', p?.caloriesKcal, ''], ['protein g', p?.proteinG, 'text-ps-green'], ['carbs g', p?.carbohydrateG, ''], ['fat g', p?.fatG, '']].map(([l, v, cls]) => (
              <div key={l as string}><div className={`text-2xl font-semibold ${cls}`}>{fmtN((v as number | null) ?? null)}</div><div className="text-xs text-ps-muted font-sans">{l}</div></div>
            ))}
          </div>
          {split && (
            <>
              <div className="flex h-2 rounded overflow-hidden" aria-hidden="true">
                <div style={{ flex: split.P }} className="bg-ps-green" /><div style={{ flex: split.C }} className="bg-ps-blue" /><div style={{ flex: split.F }} className="bg-ps-amber" />
              </div>
              <div className="flex gap-4 text-xs text-ps-muted">
                <span>Protein {Math.round((split.P / splitTotal) * 100)}%</span><span>Carbs {Math.round((split.C / splitTotal) * 100)}%</span><span>Fat {Math.round((split.F / splitTotal) * 100)}%</span>
                <span className="ml-auto">of energy from macros</span>
              </div>
            </>
          )}
          {p && [p.fibreG, p.sugarG, p.sodiumMg].some((v) => v != null) && (
            <div className="flex gap-4 text-xs text-ps-muted font-mono">
              {p.fibreG != null && <span>Fibre {p.fibreG} g</span>}{p.sugarG != null && <span>Sugar {p.sugarG} g</span>}{p.sodiumMg != null && <span>Sodium {p.sodiumMg} mg</span>}
            </div>
          )}
          {!p && <p className="m-0 text-sm text-ps-muted">No nutrition data for this dish yet.</p>}
        </section>

        {trustCopy && (
          <section aria-label="Where these numbers come from" className={`p-4 rounded-2xl flex flex-col gap-2 ${d.trust === 'verified' || d.trust === 'operator' ? 'bg-ps-greenbg border border-ps-greenline' : 'bg-ps-amberbg border-[1.5px] border-dashed border-ps-amberline'}`}>
            <TrustBadge trust={d.trust} />
            <p className={`m-0 text-sm leading-relaxed ${d.trust === 'verified' || d.trust === 'operator' ? 'text-ps-greenink' : 'text-ps-amberink'}`}>
              {trustCopy.body}{d.concept && d.trust === 'typical' && d.concept.name.toLowerCase() !== product.name.toLowerCase() ? ` Standard dish: ${d.concept.name}.` : ''}
            </p>
            {p && p.assumptions.length > 0 && (
              <details className="text-[13px] text-ps-amberink">
                <summary className="cursor-pointer font-semibold min-h-8 flex items-center">What this assumes</summary>
                <ul className="mt-1 mb-0 pl-5">{p.assumptions.map((a) => <li key={a}>{a}</li>)}</ul>
              </details>
            )}
          </section>
        )}

        <section aria-label="Allergens" className="card p-4 flex flex-col gap-2.5">
          <div className="flex justify-between items-center gap-2">
            <h2 className="m-0 text-[15px] font-bold">Allergens</h2>
            {declared.length === 0 && <span className="text-[11px] font-bold uppercase tracking-wide text-ps-amber border border-dashed border-ps-amber rounded-full px-2 py-0.5">Not confirmed by stall</span>}
          </div>
          {glutenFree && <p className="m-0 text-sm text-ps-greenink">Gluten-free · declared by {glutenFree.basis === 'operator_declared' ? 'the stall' : 'the brand'}</p>}
          <ul className="list-none m-0 p-0 flex flex-col gap-1.5 text-sm">
            {declared.map((a) => (
              <li key={a.allergen} className="flex items-center gap-2.5"><span aria-hidden="true" className="w-[18px] h-[18px] rounded-full bg-ps-amber shrink-0" /><span className="flex-1">{ALLERGEN_LABEL[a.allergen]}</span><span className="text-xs text-ps-muted">{a.status.replace('_', ' ')} · declared</span></li>
            ))}
            {likely.map((a) => (
              <li key={a.allergen} className="flex items-start gap-2.5"><span aria-hidden="true" className="mt-0.5 w-[18px] h-[18px] rounded-full border-[1.5px] border-dashed border-ps-amber shrink-0" /><span className="flex-1 flex flex-col">{ALLERGEN_LABEL[a.allergen]}<span className="text-xs text-ps-amberink">Likely · {a.reason}</span></span></li>
            ))}
            <li className="flex items-center gap-2.5"><span aria-hidden="true" className="w-[18px] h-[18px] rounded bg-ps-line shrink-0" /><span className="flex-1 text-ps-muted">{unknown.map((a) => ALLERGEN_LABEL[a].replace(' (wheat)', '').toLowerCase()).join(', ')}</span><span className="text-xs text-ps-muted">unknown</span></li>
          </ul>
          <p className="m-0 text-xs text-ps-muted leading-relaxed">“Likely” is based on how this dish is usually made. Stalls can change recipes and share equipment, so if you have an allergy, ask the stall before ordering.</p>
        </section>

        <section aria-label="How it's cooked" className="flex flex-col gap-2">
          <h2 className="m-0 label-caps">How it’s cooked</h2>
          <div className="flex flex-wrap gap-2">
            {methods.length === 0 && d.spiceLevel == null && <span className="text-sm text-ps-muted">Not known yet</span>}
            {methods.map((m) => <span key={m.method} className="chip h-8 bg-ps-raised">{COOKING_LABEL[m.method]}</span>)}
            {methods.length > 0 && !methods.some((m) => ['deep_fried', 'stir_fried', 'fried'].includes(m.method)) && <span className="chip h-8 bg-ps-raised">Not fried</span>}
            {d.spiceLevel != null && <span className="chip h-8 bg-ps-raised">{d.spiceLevel >= 2 ? 'Spicy' : d.spiceLevel === 1 ? 'Mildly spicy' : 'Not spicy'}</span>}
          </div>
          {(methods.length > 0 || d.spiceLevel != null) && <span className="text-xs text-ps-muted">{methods.some((m) => m.basis === 'operator_declared') ? 'From the stall' : 'Worked out from the dish name'}</span>}
        </section>

        {yesTags.length > 0 && (
          <section aria-label="Diet" className="flex flex-col gap-2">
            <h2 className="m-0 label-caps">Diet</h2>
            <div className="flex flex-wrap gap-2">{yesTags.map((t) => <span key={t.tag} className="chip h-8 bg-ps-greenbg border-ps-greenline text-ps-greenink">{t.tag.replace('_', ' ')}</span>)}</div>
          </section>
        )}

        <section aria-label="Where to get it" className="card p-4 flex flex-col gap-3">
          <h2 className="m-0 text-[15px] font-bold">{d.outletCount === 1 ? 'Where' : `Outlets (${d.outletCount})`}</h2>
          {d.outletCount === 0 && <p className="m-0 text-sm text-ps-muted">No outlet listed yet.</p>}
          <ul className="list-none m-0 p-0 flex flex-col gap-3">
            {d.outlets.map((o) => (
              <li key={o.outlet.id} className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold">{o.venue?.name ?? o.outlet.label}</span>
                {o.outlet.address && <span className="text-xs text-ps-muted">{o.outlet.address}</span>}
                {o.hours.length ? (
                  <span className="text-xs text-ps-muted font-mono">{o.hours.map((h) => `${DAY[h.dayOfWeek]} ${h.opens}–${h.closes}`).join(' · ')}</span>
                ) : (
                  <span className="flex items-center gap-2 text-xs text-ps-muted"><Icon name="clock" size={14} />Hours not known yet</span>
                )}
                {o.upcomingClosures.length > 0 && (
                  <span className="text-xs text-ps-muted">
                    {o.upcomingClosures[0].reason === 'cleaning' ? 'Centre closed for cleaning' : 'Centre closed'}: {o.upcomingClosures.slice(0, 2).map((c) => (c.startDate === c.endDate ? fmtDate(c.startDate) : `${fmtDate(c.startDate)} – ${fmtDate(c.endDate)}`)).join(', ')}
                    {o.upcomingClosures[0].sourceId === 'nea_hawker_closures' ? ' · NEA schedule' : ''}
                  </span>
                )}
                {o.licence?.grade && o.licence.grade !== 'not_applicable' && <span className="text-xs text-ps-muted">SFA hygiene grade {o.licence.grade}</span>}
              </li>
            ))}
          </ul>
          {d.outletCount > d.outlets.length && <Link href={`/brand/${brand.id}`} className="text-sm no-underline">See all {d.outletCount} outlets</Link>}
        </section>

        <div className="flex gap-2.5 flex-wrap">
          <Link href={`/compare?ids=${product.id}`} className="btn-ghost no-underline">Compare</Link>
          <a href={issue} className="btn-ghost no-underline" rel="noopener">Suggest a fix</a>
        </div>

        {d.otherProducts.length > 0 && (
          <section className="flex flex-col gap-2 mt-2">
            <h2 className="m-0 label-caps">More from {brand.name}</h2>
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 gap-1.5 text-sm">
              {d.otherProducts.slice(0, 10).map((m) => <li key={m.id}><Link href={`/brand/${brand.id}/${m.id}`} className="text-ps-ink no-underline hover:underline">{m.name}</Link></li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
