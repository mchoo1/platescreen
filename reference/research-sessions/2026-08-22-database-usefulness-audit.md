# 2026-08-22 — Database usefulness audit (does this help someone find a restaurant/meal?)

**Trigger:** user asked for a full pass on whether the database is useful for someone looking for
restaurants and meals, stating plainly that generic outlets/stores add no value.

## What "useful" was checked against

A row only reaches a user if it survives the actual join in `buildScreenerRows()`
(`src/lib/screener.ts`), which iterates `MENU_ITEMS` and looks up the parent `Brand` — a Brand with
zero MenuItems **never renders**, regardless of how many Premises it has. So "useless" splits into
two very different problems: rows a user can actually see that mislead or don't help them, and rows
sitting inert in the data files that don't show up anywhere yet.

## Numbers

| Check | Count |
|---|---|
| Total brands | 781 (before this pass) → 745 (after) |
| Brands with a real address AND at least 1 menu item (fully useful) | 155 / 781 (20%) |
| Brands with zero menu items (invisible in the app — join never fires) | 621 / 781 (79%) |
| Brands with zero Premises AND zero MenuItems (pure dead stub) | 36 |
| Premises with no real single address (generic centroid or none) | 30 |
| Menu items still generic-named (visible, low-value) | 16 remaining, down from 81 |

## Action taken this pass

1. **Removed 36 fully-empty Brand stubs.** These were auto-created placeholders — mostly SFA
   licensee personal names (e.g. "Ho Poh Chee @Ang Lay Hua", "Chan Weng On") pulled in from research-
   queue processing but never actually completed with a location or a menu. They never rendered to a
   user (no MenuItems to join on) but were dead weight in the dataset and CSV exports. Each one still
   has a live entry in `researchQueue.ts`, so a future research pass can add it back properly once it
   has real menu/macro data — nothing was lost, just the premature empty placeholder.

2. **Fixed the homepage "Top protein/$ picks" carousel** (`src/components/ScreenerApp.tsx`) to
   exclude `outletType === 'supermarket'`. Raw grocery ingredients (chicken breast, eggs, dry rice)
   have inflated protein/$ ratios purely because they're uncooked — they were crowding out actual
   ready-to-eat meals in the very first thing a visitor sees, which directly contradicts "find a
   suitable meal." This was already flagged in `launch-guide-2026-08-22.md` as a fix; it's now
   applied. Supermarket items remain visible and filterable in the main results table (some users
   genuinely are macro-tracking via home cooking), just no longer dominate the top-picks spotlight.

## Not touched this pass, and why

- **621 zero-menu brands (incl. 682 hawker, 27 `food_court_stall`, 4 `food_court`-type umbrella
  brands like Kopitiam/Koufu/Foodfare).** These are currently invisible to users — not misleading,
  just incomplete. Deleting them would erase real, specific, already-verified stall names (e.g. "Tai
  Wah Pork Noodles", "Nam Sing Hokkien Mee") that just need menu/macro research, which is exactly
  the ongoing job of the `platescreen-research-restaurants` scheduled task. Removing them would
  undo real sourcing work for no user-facing benefit.
- **The 4 `food_court`-type umbrella brands (Kopitiam, Koufu, Foodfare, Hawkers' Street).** These
  represent an entire chain of 48–65 different food-court buildings, not one kitchen — worth a
  structural look (should "Kopitiam" ever be a single screenable card at all, versus each stall
  inside it being its own Brand?) but that's a data-modeling decision, not a straightforward
  delete/rename, so it's flagged here rather than acted on.
- **16 still-generic hawker names** (`newton_char_kway_teow`, `cc_ban_mian_stall`, `oar_laksa`,
  `gmfc_bak_kut_teh`, and 12 others — full list in
  `2026-08-22-generic-name-cleanup.md`). No independently-verifiable real stall name surfaced for
  these in the previous research pass. They're visible and lower-value than a real name, but they
  aren't false — the dish genuinely exists at that real hawker centre. Left as a follow-up rather
  than guessed.
