# PlateScreen — Positioning: Introduction, Value Proposition, Moat

**Status: living reference, not a dated snapshot** (unlike the archived
strategy docs in `archive/`, which are point-in-time). Treat this as
canonical framing for the project — any Cowork chat, agent, or
scheduled task working on PlateScreen (marketing copy, a pitch conversation,
a new contributor's onboarding, a scheduled content-drafting task) should
read this before writing anything that describes what PlateScreen *is* or
*why it matters*, so that framing stays consistent across sessions instead
of getting reinvented differently each time. Update this file in place when
the underlying facts change materially (a new data category ships, the moat
gets stronger or weaker) — it isn't archived like a dated strategy doc.

See `../../CLAUDE.md` for how the app works, `ROADMAP.md` for current status
and priorities. This file is about how to describe and think about the
product, not how to build it.

---

## 1. App Introduction

**Reviewed 2026-08-30: the original version of this section led with the
screener mechanism ("filter dishes like you'd screen stocks") before
explaining why anyone would need that. That's backwards — a reader could
finish it understanding exactly what the app does and still not feel a
reason to open it. Rewritten below to lead with the actual problem.**

**If you eat out in Singapore and care about what you're eating — hitting a
protein target, watching calories, keeping halal or vegetarian, or just not
overpaying — you're flying blind.** Most meals here come from a hawker
stall, food court, or coffeeshop, not a packaged product with a nutrition
label. A generic calorie-tracking app either doesn't have your exact stall
in its database at all, or has it under a generic "fried noodles, mixed
dish" entry with a national-average macro estimate that could be off by a
wide margin from what that specific stall actually serves. Delivery apps
show you photos and prices, not protein or diet compatibility. So the actual
choice most people make is: track carefully at home and guess wildly the
moment they eat out, or give up tracking altogether whenever hawker food is
involved — which, in Singapore, is most of the time.

**PlateScreen exists to remove that guesswork.** It's a stock-screener for
Singapore food: filter and sort real dishes — from real, named stalls and
chains — by calories, protein, carbs, fat, price, protein-per-dollar, diet
compatibility (halal, vegetarian, vegan, no-pork, and more), outlet type,
and distance. Pick a preset — Cut, Bulk, Budget, Keto, High Value — or build
your own filter, and get a ranked table of dishes that actually fit, each
one traceable to a real stall you can walk to or order from. The reason to
use it over a generic tracker isn't the filtering UI (any nutrition app has
filters) — it's that the numbers underneath are sourced from real
Singapore-specific data instead of a generic per-cuisine average, at a level
of hawker-stall detail generic trackers don't attempt (see section 2).

It's a fully static site — no login, no backend, no tracking beyond
analytics — because the product doesn't need an account system to be useful;
the value is entirely in the data and the screening tool, not in a social
graph or a checkout flow.

**What's actually in it, as of 2026-08-30:** 1,747 real brands (restaurants,
hawker stalls, food-court concessions, grocery chains), 4,678 physical
locations (every branch of every chain individually geocoded, hawker stalls
matched to their own SFA food-licence records where one exists), and 2,552
menu items with real macros — 95.8% of listed brands have at least one
screenable dish. This isn't a demo dataset; it's the product.

---

## 2. Research Value Proposition

**The product's value doesn't come from the UI — a filterable table is not
hard to build. It comes from the data underneath being real, sourced, and
verified, at a level of local granularity nothing else covers.**

Three things back that up, all independently checkable in this repo:

- **Government-licence-grounded, not scraped guesswork.** Where a physical
  premises has one, its SFA food-shop/food-stall licence data (licence
  number, licensee name, hygiene grade) is pulled from data.gov.sg's own
  List of NEA Licensed Eating Establishments — a public, authoritative
  source, not an inferred address. 0 of 4,678 premises are missing
  coordinates.
- **Every dish traces to a real signal — nothing is invented.** The
  standing rule in `CLAUDE.md` section 5 (a hard constraint enforced across
  every research batch this project has run) is that a menu item's name must
  come from the brand's own signage/cuisine field, a real site scrape, or
  individual research — never "what's typical for this cuisine." When a
  stall's real dish can't be confirmed, it's left with zero menu items
  rather than filled with a guess. That restraint is unusual — most food
  databases backfill gaps with plausible-sounding placeholders, which is
  exactly what erodes trust in a screening tool the moment someone checks
  a number against reality.
- **Hyper-local, hawker-level granularity most food data doesn't attempt.**
  This isn't just "chains in Singapore" — it's individually-licensed hawker
  stalls inside named hawker centres and food courts, tracked stall by
  stall (documented across 135+ dated research sessions in
  `reference/research-sessions/`). Per the 2026-08-22 growth-strategy
  research, protein-per-dollar sourced against *real menu prices* at this
  granularity — rather than generic USDA per-cuisine averages — was not
  found to be published anywhere else for Singapore at the time of that
  research; that finding hasn't been re-verified since, so treat it as the
  starting hypothesis worth re-checking before repeating it as a settled
  fact, not re-asserting it as newly confirmed today.

The pitch to a user, in one line: **every number here is either
government-verified or traceable to a real source — nothing is a
plausible-sounding estimate wearing a confident font.**

---

## 3. Moat

Ranked by how durable each advantage actually is, not by how it sounds:

1. **Accumulated verified-data labor (strongest, compounds over time).**
   Getting from "a brand exists" to "a brand has a real, sourced dish with
   real macros" took a documented sequence of 60+ research batches across
   this project's history — SFA dataset cross-referencing, site-scrape
   parsing (e.g. Kopitiam's own stall listings), and individual per-stall
   web research where nothing else resolved it. A competitor can't shortcut
   this by scraping PlateScreen itself (that just gets them today's
   snapshot) or by pointing an LLM at "list Singapore hawker dishes" (that's
   exactly the fabrication failure mode this project explicitly refuses to
   ship). Reproducing the coverage that already exists here means redoing
   the same weeks of sourcing work. Every future data-quality pass (like the
   2026-08-30 duplicate-record audit) makes this harder to catch up to, not
   easier — the gap only grows.
2. **A codified quality bar, not just a pile of data.** The never-fabricate
   rule, the conservative diet-tag classification rules (including the
   standing no-pork skip-list for dishes that traditionally may contain
   pork despite not being named for it), and the append-only research-log
   convention are written down in `CLAUDE.md` specifically so they survive
   past any one person or session. A competitor could copy the *data* if
   they got access to it, but copying the *discipline* that keeps it
   trustworthy as it grows is a process moat, not a data moat — harder to
   fake convincingly at scale.
3. **Structural readiness for an SEO moat (real, but not yet built).**
   Static-export architecture + the existing brand/dish data means
   hundreds of indexable per-brand/per-dish pages are a routes-and-sitemap
   change away, per `GROWTH_STRATEGY.md` and `ROADMAP.md`'s
   lower-priority list — each one answering a real long-tail search. This
   is a moat only once built and once Google has indexed it long enough to
   rank; right now it's unrealized potential, not a current advantage. Don't
   describe it as an existing moat until it ships.
4. **Weak/unproven, don't oversell these:** no user accounts, no proprietary
   usage data yet (Web Analytics is still off as of 2026-08-30 — see
   `ROADMAP.md`), no network effects, no brand recognition. None of that
   exists today. If asked "what stops a well-funded competitor from just
   doing this," the honest answer is: nothing stops them from *starting* —
   the moat is entirely in how much sourcing work they'd have to redo to
   *match current coverage*, and in whether they hold themselves to the same
   never-fabricate discipline once the backlog pressure to "just fill it in"
   shows up. That's a real but erodible advantage, not a structural one like
   a network effect or a regulatory license — say so plainly rather than
   implying more permanence than actually exists.

---

## How to use this doc

- Drafting marketing copy, a pitch conversation, or an onboarding note for a
  new contributor/agent → start from section 1 and 2 verbatim; don't
  reinvent the framing each time.
- Asked "why would anyone trust this over [competitor/generic nutrition
  app]" → section 2's three bullets, in order.
- Asked "what's defensible about this" → section 3, and be honest about
  which claims are strong vs. weak. Overclaiming the moat to an external
  audience (investor, partner) is a credibility risk the moment they ask a
  follow-up question this doc already flags as unproven.
