# PlateScreen — Pre-Launch Growth Strategy

**Written:** 2026-08-22
**Stage:** Pre-launch. 776 brands / 3,404 premises / 837 menu items, growing 3x/day via scheduled research tasks. Live at platescreen.vercel.app, zero paid marketing spend assumed, single-person team.

---

## The gap that has to close before any growth tactic matters

Two things are true right now that would waste any traffic sent to the app today:

**There is no analytics.** I checked — Vercel Web Analytics isn't enabled on the project, so there's currently no way to see how many people visit, what they search for, or where they drop off. Enable it before doing anything else in this plan (Vercel dashboard → project → Analytics tab, free tier, one click, no code changes for pageviews). Layer in a handful of custom events once it's on: a search performed, a filter applied, the "near me" GPS prompt accepted, an outbound tap (e.g. to a restaurant's own site or maps). Those four events tell you whether people who land on the app actually use the screening feature, which is the entire product.

**There's no SEO surface to speak of.** The app is a single page — one route, one `<title>`, one meta description, no per-brand or per-dish pages. That's fine for the screener interaction itself, but it means the 776 brands and 3,404 premises you've spent this week sourcing from real SFA data are invisible to Google. A static Next.js export is exactly the architecture that's cheap to turn into hundreds of indexable pages (`/brand/mcdonalds`, `/brand/mcdonalds/big-mac`, etc.), each one answering a real long-tail search ("mcdonalds singapore calories", "cheap high protein hawker food"). This is a product change, not a marketing task, but it's the single highest-leverage thing on this list because the data to populate it already exists — it just needs routes and a sitemap.

Everything below assumes those two are in place, or in progress alongside them.

---

## Positioning: the wedge that makes this shareable

"A food screener, like a stock screener" is the right instinct — it's the one line that makes people go "oh, that's clever" instead of "another calorie app." The sharpest expression of that is **Protein-per-Dollar**, since it's a metric nobody else in Singapore is publishing at this granularity, sourced against real menu prices rather than generic USDA averages. That's the headline stat worth building every piece of outbound content around: "best protein/$ hawker meals in Singapore," "cheapest way to hit 150g protein at a food court," "we ranked every McDonald's item by protein per dollar." It's inherently a listicle/leaderboard format, which is the content type that travels furthest on Reddit, TikTok, and IG Reels with the least production effort.

## Channels, roughly in order of cost-to-effort

**Reddit first, and specifically.** r/singapore, r/SGExercise, and r/singaporefi (the frugal-money crowd cares about protein/$ just as much as the gym crowd) are the highest-intent, lowest-cost channel available. Don't post "check out my app" — post the actual leaderboard as a text/table post ("I calculated protein-per-dollar for every major SG fast food chain, here's the ranking") with the tool linked as the source, not the pitch. This only works once the data underneath it is solid enough to survive scrutiny from a community that will absolutely fact-check a claimed macro number against the actual menu.

**Reuse Stride's existing content and community-reply pipeline.** You already have `stride-content-generator` and `stride-reply-drafter` skills built for exactly this audience (same demographic, same SG macro-conscious eaters). PlateScreen doesn't need its own content operation from scratch — it needs a PlateScreen-flavored variant of the same skills, and a house style profile the same way Stride has one. Cross-link deliberately: Stride's social posts can reference "we used PlateScreen's data for this" (it's a real, honest attribution since PlateScreen is the sourcing layer), and PlateScreen's about page can point power users toward Stride for tracking. Two products, one audience, one content engine.

**Singapore fitness Telegram/Discord communities and gym-floor micro-influencers** (SG-based coaches, physique competitors, macro-tracking creators with a few thousand followers, not celebrities) are worth direct, personal outreach — a short message with the protein/$ leaderboard for their favorite cheat-meal spot tends to land better than a cold pitch, because it's genuinely useful to them and their audience.

**A single, well-timed launch post** — Product Hunt, r/singapore's own "I built X" format, or HardwareZone's EeDee Kia forum (still has real SG tech-hobbyist traffic) — works once, not repeatedly. Hold it until the database and the per-brand pages are far enough along that a first-time visitor's first search doesn't come up empty. A dead-end search on launch day is the one thing that kills word-of-mouth before it starts.

## Product mechanics that create their own distribution

A few build-once features pay for themselves in shares without any ongoing content effort: a shareable result card/link per search ("protein/$ ranking near Tampines" as its own URL, screenshot-friendly), and — once per-brand pages exist — an embeddable "protein/$ badge" that a food blogger or the brand itself could put on their own site linking back. Neither is urgent, but both compound once the underlying data and pages exist, so it's worth sequencing them right after the SEO page work rather than as a separate later project.

## Sequencing

1. Enable analytics now — it costs nothing and everything after this should be measured against it.
2. Keep the 3x/day research tasks running to close the database gaps that would otherwise embarrass a first-time visitor.
3. Ship per-brand/per-dish static pages — this is the SEO foundation and the shareable-link foundation at once.
4. Start the Reddit/community leaderboard posts as soon as the top 20-30 chains have solid, defensible data — don't wait for full coverage, but don't go out with obviously incomplete numbers on the chains everyone will check first (McDonald's, KFC, the hawker classics).
5. Hold the single big launch post until 1-3 are done.

## What I'd skip for now

Paid ads and App Store presence (it's a web tool, not an app — don't build a native wrapper until organic traffic proves the demand), and influencer partnerships with anyone who'd want payment upfront — the honest, data-driven angle is the actual differentiator here, and it's worth protecting that by keeping the early growth motion organic and merit-based rather than sponsored.
