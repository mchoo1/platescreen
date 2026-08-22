# PlateScreen — Launch Guide (for a first-time app launcher)

**Written:** 2026-08-22. This is a plain-language walkthrough: is it ready, what to fix first, how to actually launch, and how much of this can run itself.

---

## Is it ready? Not quite — here's the actual data, not a guess

I pulled real numbers from the live database rather than eyeballing it:

| Metric | Number | What it means |
|---|---|---|
| Total brands listed | 779 | Every restaurant/hawker stall/grocery chain in the app |
| Brands with real menu/macro data | 158 (20%) | The other 80% show up as a name and a location with nothing to screen |
| Research queue completion | 12 / 635 (2%) | The backlog of outlets still needing their menu researched |
| Premises with real coordinates | 3,299 / 3,403 (97%) | Location data is in good shape |
| Grocery products (packaged SKUs) | 0 | This whole category of the schema is still empty |

**The core promise of PlateScreen is "find suitable meals by macros." Right now, 4 out of 5 listed places have nothing to screen.** That's the single blocking issue — not a technical bug, just unfinished content. A visitor who searches for a hawker stall they recognize has an 80% chance of finding it listed with zero dishes, which reads as broken even though the app itself works fine.

I also found two things worth fixing that aren't about data volume:

1. **The homepage's "Top protein/$ picks" — the very first thing a visitor sees — is currently all raw grocery ingredients** (uncooked chicken breast, raw eggs, dry jasmine rice, rolled oats), not meals. Technically accurate (protein-per-dollar is highest for raw ingredients, that's just math), but it undercuts "find suitable meals" as a first impression — a new visitor's first reaction will be "wait, this is telling me to buy raw chicken?" This is a known, already-flagged gap: those 17 grocery items were carried over from an old migration shaped as menu items instead of their own proper `GroceryProduct` type, and nothing currently separates "ready to eat now" from "buy and cook this" in the ranking. Cheap fix, real impact on first impressions.

2. **The results table is built for desktop and doesn't reflow on a phone** (it's hard-set to a minimum width, so a phone screen has to scroll sideways to see all the columns). This matters a lot for launch specifically, because nearly all of your traffic from Reddit/social will arrive on a phone, not a laptop.

Everything else about the build itself is solid: search and filtering both work correctly and fast, real sourcing badges show up on results (official vs. estimated), there are no console errors, and the location data underneath it is genuinely well-sourced (real SFA licence data, not guessed).

**Bottom line: this isn't "add more polish," it's "the database is about 20% full." Launching now would mean most first-time visitors hit empty results on the exact places they'd think to search for.**

---

## What to improve, in order

Treat this as a sequence, not a simultaneous todo list — each step makes the next one worth doing.

**1. Keep growing the database, but change what "done" means for now.** You already have `platescreen-research-restaurants`/`-grocery`/`-branches` running 3x/day. Don't aim for 100% of 779 brands before launch — that'll take a long time at current pace. Aim instead for **100% coverage of the ~50-80 brands people will actually search for first**: the big recognizable chains (McDonald's, KFC, Starbucks, etc. — already well covered) and the most iconic hawker dishes (chicken rice, laksa, char kway teow — check these specifically, since a search for a famous dish coming up empty is the worst possible first impression). A visitor forgives "this obscure stall isn't listed yet" much more easily than "I searched chicken rice and got nothing useful."

**2. Fix the homepage hero.** Either exclude raw/uncooked ingredients from the "Top picks" ranking entirely (simplest — just filter by outlet type, showing only `restaurant`/`hawker`/`grab_go` items there, not `supermarket`), or label the picks section clearly as two separate rows: "Best meals right now" and "Best raw ingredients (cook it yourself)". I'd do the first option — it's a one-line filter change and immediately makes the homepage's first impression match its promise.

**3. Fix mobile.** At minimum, make the results table collapse into a card layout below a certain screen width (this is one of the most common responsive patterns — you don't need a redesign, just a second layout for small screens). Test on an actual phone, not just a resized browser window, before calling this done.

**4. Turn on analytics.** Vercel Analytics is a free, one-click toggle in your Vercel project settings — no code changes needed for basic pageviews. Do this *before* you send any traffic, not after, so you're not flying blind on launch day.

**5. Add basic SEO surface.** Right now the whole app is one page with one title. Once the top ~50-80 brands have real data, giving each one its own page (`/brand/mcdonalds`) is what lets Google ever send you free traffic later — but this is a "week 2" task, not a launch blocker.

None of steps 2-4 should take more than a day or two of focused work each — they're all small, targeted fixes, not rebuilds.

---

## How to actually launch (step by step, assuming zero experience)

**Step 0 — get the current work live.** Everything from the last week of database work is sitting committed on your machine but not yet pushed to GitHub, which means it's not on the live site either. Run:
```
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen"
git add -A
git commit -m "WIP"
git pull origin main
git push origin main
```
This triggers Vercel to redeploy automatically — check platescreen.vercel.app looks right afterward.

**Step 1 — a domain, if you want one (optional).** `platescreen.vercel.app` works fine to launch with; a custom domain like `platescreen.sg` or `.com` is a nice-to-have you can add later in Vercel's project settings once you've bought one (any registrar — Namecheap, GoDaddy, or Vercel sells them directly too). Don't block launch on this.

**Step 2 — a place for people to give feedback.** You have no backend, which is great for simplicity but means there's currently no way for a user to report "this macro is wrong" or "add my favourite stall." Even something as simple as a mailto: link or a Google Form linked from the page footer is enough for launch — you can build something fancier later.

**Step 3 — the actual announcement.** This is where the growth strategy and content copilots from earlier come in: once steps 2-4 above are done, post the first data-driven leaderboard (protein/$ ranking, e.g.) to r/singapore or r/SGExercise as a genuine, useful post — not "check out my app," but "I calculated X, here's what I found, here's the tool I built to do it." The `platescreen-post-copilot` scheduled task will draft this for you; you just need to hit "post" once you're happy with it.

**Step 4 — watch, don't disappear.** For the first few days after posting, actually check back on the thread and respond to comments/corrections yourself — this is the one part of launching that genuinely can't be automated or skipped, and it's also the part that builds the credibility the whole "real data, not marketing" positioning depends on.

That's it — there's no app store review process, no backend to provision, no accounts system to worry about, because of how this was built. The whole launch is: fix the two UX issues, turn on analytics, push it live, post about it honestly, and stick around to answer questions.

---

## How much of this can run itself

Being direct about the actual ceiling here, since "self-run" means different things for different parts:

**Fully automatic already, no action needed from you:**
- Database growth — 3x/day research across restaurants, grocery, and branch backfill
- Weekly sync reporting to Stride
- Content *drafting* for Reddit posts and community replies (2x/week + 1x/week)

**Structurally can't be made automatic, by design, not by limitation:**
- The actual "post" or "send" click on Reddit/social — every platform's anti-bot rules and this assistant's own safety rules require a human to approve each individual public post. This is a permanent ceiling, not a "not yet built" gap.
- `git push` to GitHub — I don't hold your GitHub credentials in this sandboxed environment, so this stays a manual command for you (or your own machine's git credential caching, which you'd only need to set up once, and then it's a single command forever after).
- The two UX fixes above (raw-ingredient hero, mobile table) — these are one-time product changes, not ongoing maintenance, so there's nothing to "automate" here, just something to build once.

**Realistic weekly time cost once this is all running:** a few minutes to glance at the Monday/Thursday post drafts and the Wednesday comment drafts, and periodically batch-pushing git commits (once a week is fine). That's a meaningfully small ongoing commitment for a tool that otherwise researches, writes, and drafts its own growth content unattended.
