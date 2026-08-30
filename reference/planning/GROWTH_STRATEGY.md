# PlateScreen — Growth Strategy

**Updated:** 2026-08-30 (supersedes `archive/growth-strategy-2026-08-22.md` —
same strategic reasoning, current numbers, corrected automation status).
**Stage:** 1,747 brands / 4,678 premises / 2,552 menu items, 95.8% menu
coverage. Live at platescreen.vercel.app. Reached mainly through manual
Cowork-session batch research (see `../research-sessions/`), not the
scheduled research tasks referenced below — those exist but are currently
disabled, and the user is planning to redo all six PlateScreen scheduled
tasks from scratch. Treat every mention of "the research/content tasks" in
this file as describing intent/design, not a currently-running system.

---

## The gap that has to close before any growth tactic matters

Two things were true as of the last check (2026-08-30) that would waste any
traffic sent to the app today:

**There is no analytics.** Confirmed directly against the Vercel API on
2026-08-30 — Web Analytics still isn't enabled, so there's no way to see how
many people visit, what they search for, or where they drop off. Turn it on
before anything else in this plan (Vercel dashboard → project → Analytics
tab, free tier, one click, no code changes for pageviews). Layer in a
handful of custom events once it's on: a search performed, a filter applied,
the "near me" GPS prompt accepted, an outbound tap. Those four events tell
you whether people who land on the app actually use the screening feature,
which is the entire product.

**There's no SEO surface to speak of.** The app is a single page — one
route, one `<title>`, one meta description, no per-brand or per-dish pages.
That's fine for the screener interaction itself, but it means 1,747 brands
of real, sourced data are invisible to Google. A static Next.js export is
exactly the architecture that's cheap to turn into hundreds of indexable
pages (`/brand/mcdonalds`, `/brand/mcdonalds/big-mac`, etc.), each one
answering a real long-tail search ("mcdonalds singapore calories", "cheap
high protein hawker food"). This is a product change, not a marketing task,
but it's the single highest-leverage thing on this list because the data to
populate it already exists — it just needs routes and a sitemap. Still
unbuilt as of 2026-08-30.

Everything below assumes those two are in place, or in progress alongside
them.

---

## Positioning: the wedge that makes this shareable

"A food screener, like a stock screener" is the right instinct — it's the
one line that makes people go "oh, that's clever" instead of "another
calorie app." The sharpest expression of that is **Protein-per-Dollar**,
sourced against real menu prices rather than generic USDA averages. Build
outbound content around that headline stat: "best protein/$ hawker meals in
Singapore," "cheapest way to hit 150g protein at a food court," "we ranked
every McDonald's item by protein per dollar." It's inherently a
listicle/leaderboard format, which travels furthest on Reddit, TikTok, and
IG Reels with the least production effort. (See `../../CLAUDE.md` and
`POSITIONING.md` for the fuller, currently-maintained framing of this
positioning — this file focuses on channel tactics built on top of it.)

## Channels, roughly in order of cost-to-effort

**Reddit first, and specifically.** r/singapore, r/SGExercise, and
r/singaporefi (the frugal-money crowd cares about protein/$ just as much as
the gym crowd) are the highest-intent, lowest-cost channel available. Post
the actual leaderboard as a text/table post ("I calculated protein-per-dollar
for every major SG fast food chain, here's the ranking") with the tool
linked as the source, not the pitch. This only works once the data
underneath it is solid enough to survive scrutiny from a community that will
fact-check a claimed macro number against the actual menu — at 95.8% menu
coverage, that bar is now comfortably clearable for most major chains.

**Reuse Stride's existing content and community-reply pattern.** Stride has
`stride-content-generator`/`stride-reply-drafter` skills built for the same
demographic (SG macro-conscious eaters). PlateScreen doesn't need a content
operation built from scratch — it needs its own version of the same
approach, with a PlateScreen-specific house style. Cross-link deliberately:
Stride's social posts can reference "we used PlateScreen's data for this"
(honest, since PlateScreen is the sourcing layer), and PlateScreen can point
power users toward Stride for tracking. Two products, one audience, one
content approach.

**Singapore fitness Telegram/Discord communities and gym-floor
micro-influencers** (SG-based coaches, physique competitors,
macro-tracking creators with a few thousand followers, not celebrities) are
worth direct, personal outreach — a short message with the protein/$
leaderboard for their favorite cheat-meal spot tends to land better than a
cold pitch, because it's genuinely useful to them and their audience.

**A single, well-timed launch/announcement post** — Product Hunt,
r/singapore's own "I built X" format, or HardwareZone's EeDee Kia forum
(still has real SG tech-hobbyist traffic) — works once, not repeatedly. This
hasn't happened yet as of 2026-08-30 despite the database being ready for it
(see `ROADMAP.md`'s "not started" list). A dead-end search on launch day is
the one thing that kills word-of-mouth before it starts, so re-verify the
two UI findings in `ROADMAP.md` first.

## Product mechanics that create their own distribution

A few build-once features pay for themselves in shares without ongoing
content effort: a shareable result card/link per search ("protein/$ ranking
near Tampines" as its own URL, screenshot-friendly), and — once per-brand
pages exist — an embeddable "protein/$ badge" a food blogger or the brand
itself could put on their own site linking back. Neither is urgent, but both
compound once the underlying pages exist, so sequence them right after the
SEO page work.

## Sequencing

1. Enable analytics — costs nothing, and everything after this should be
   measured against it.
2. Decide what to do with the six existing (disabled) PlateScreen scheduled
   tasks (`ROADMAP.md` priority 1) before building anything new in their
   place.
3. Ship per-brand/per-dish static pages — the SEO foundation and the
   shareable-link foundation at once.
4. Start Reddit/community leaderboard posts once analytics + a content
   approach are in place — coverage is no longer the blocker it was.
5. Hold the single big launch/announcement post until 1-4 are done.

## What to skip for now

Paid ads and App Store presence (it's a web tool, not an app — don't build a
native wrapper until organic traffic proves demand), and influencer
partnerships requiring payment upfront — the honest, data-driven angle is
the actual differentiator (see `POSITIONING.md` section 2), and it's worth
protecting that by keeping early growth organic and merit-based.
