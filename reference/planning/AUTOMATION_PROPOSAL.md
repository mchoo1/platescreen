# PlateScreen — Cowork Automation Proposal

**Written:** 2026-08-30. **Status: proposal only — nothing below has been
scheduled or connected.** This lays out what could run autonomously (via
Cowork's scheduled tasks, artifacts, and connectors) across maintenance,
enhancement, growth, and marketing, with an honest read on risk and
prerequisites for each. Review and pick what you want set up.

---

## Why "proposal only" matters here

Two of the four categories below (growth analytics review, and anything that
drafts marketing content) are genuinely low-risk to automate — they read data
and produce a doc for you to review. The other two (posting content publicly,
outreach/replies) involve **sending something on your behalf**, which Cowork
requires explicit per-action approval for regardless of how the task was
scheduled — so "automate marketing" in practice means "automate the drafting,
keep a human approval step before anything goes out." That's reflected below.

---

## 1. Maintenance (low risk, safe to schedule now if you want)

**Weekly data-health audit.** A scheduled task that re-runs the kind of check
from `research-sessions/2026-08-30-database-health-audit.md` — price/calorie
outliers, orphaned records, duplicate-name collisions at the same venue,
diet-tag-rule violations — and writes a short report (or just messages you a
summary) rather than auto-fixing anything. Auto-fixing is riskier than it
sounds (see that audit's own finding: what looked like an obvious duplicate
turned out to be two real adjacent stalls) — recommend the automation stops
at "flag for review," a human decides whether to have a follow-up session fix
it.

**Build/deploy health check.** If the Vercel connector is available in this
account, a scheduled check of the latest deployment status and runtime error
log (`get_deployment`, `get_runtime_errors`) — catches a broken production
build before a user reports it. Cheap, no side effects, no approval needed to
just *read* deployment status.

**Prerequisite:** none of this needs anything set up beyond what exists —
just a scheduled task pointed at the mirror-based verification pipeline in
`CLAUDE.md` section 6.

---

## 2. Enhancement (data quality / coverage — low risk)

**Continue the zero-menu long tail.** 74 brands remain uncovered (see
`ROADMAP.md`). A recurring task could pick up where the last research batch
left off and keep applying the same audit → assign → verify → commit
pipeline. This is exactly the work this session has been doing manually —
automating the *cadence* (e.g. "run a batch every few days") is
straightforward; the actual research judgment (is this dish name real, is
this brand a container, etc.) still needs the same care each time, so this
would be "an agent runs the existing playbook on a schedule," not something
that gets easier by being scheduled.

**Diet-tag coverage audit.** A one-time (not recurring) task to sample
untagged menu items and classify how many are legitimately untaggable vs.
overlooked, per the open question in `ROADMAP.md` item 3. Informs whether a
tagging backfill batch is even worth running.

**Risk:** none of this sends anything externally or spends money — it only
touches files in this repo, verified the same way every prior batch was.

---

## 3. Growth (analytics-dependent — needs a prerequisite first)

**Blocked until Vercel Web Analytics is confirmed on** (see `ROADMAP.md`
item 5). Once it is:

- A weekly artifact/report pulling search terms, top exit points, and the
  four custom events `growth-strategy-2026-08-22.md` proposed (search
  performed, filter applied, GPS "near me" accepted, outbound tap) — this is
  exactly the kind of "recurring status page" the Cowork Artifact tool is
  built for: a live-refreshing dashboard you reopen rather than a static
  doc that goes stale.
- SEO page generation (`/brand/[slug]`, `/brand/[slug]/[dish]`) is a
  one-time **product change**, not an automation — it needs actual Next.js
  route work, reviewed and shipped like any other code change, not scheduled
  as a recurring task. Flagging it here because `growth-strategy-2026-08-22.md`
  calls it the single highest-leverage item and it's still unstarted.

**Risk:** reading analytics is fully safe to automate. Nothing here writes
anything public.

---

## 4. Marketing (drafting can be automated now; posting always needs you)

`growth-content-ideas.md` already sketches a rotating content queue
(protein-per-dollar rankings, hawker-under-$5 leaderboards, bubble-tea
calorie comparisons) computed live from the actual data — this is a strong
foundation, but the `platescreen-post-copilot` it references doesn't exist
yet as a built skill (Stride has an equivalent, `stride-content-generator` —
worth using as a structural reference, but PlateScreen needs its own since
tone/brand/data source all differ).

**What's realistic to automate:**

- A skill (built via `skill-creator`) that, given one of the pending theme
  ids in `growth-content-ideas.md`, queries `BRANDS`/`PREMISES`/`MENU_ITEMS`
  for the live numbers and drafts a post in PlateScreen's voice for a named
  platform (Reddit/IG/TikTok script) — mirroring how `stride-content-
  generator` and `stride-reply-drafter` work for Stride. This produces a
  **draft for you to review and post manually**, same as those two skills do
  today. Reasonable to schedule the *drafting* step (e.g. one new draft
  proposal per week, marking the theme `used` in `growth-content-ideas.md`
  once you approve and post it).
- A reply-drafter for Reddit/community engagement, same pattern —
  drafts only, a human posts.

**What should not be automated:** actually publishing to Reddit/IG/TikTok/X,
or sending outreach DMs. Per Cowork's standing rules, posting public content
and sending messages both require your explicit per-action approval — a
"fully autonomous marketing" setup isn't something this platform does (or
should do) unsupervised, and that's independent of any PlateScreen-specific
decision.

---

## Suggested first step

If you want to move on any of this, the lowest-risk, highest-immediate-value
pick is **#1 (weekly data-health audit)** — it's pure read-and-report, uses
a pipeline that already exists, and directly extends the work already done
in this session. Growth (#3) is blocked on confirming analytics is even on;
worth a 5-minute check before deciding whether to invest in a dashboard for
data you might not be capturing yet.
