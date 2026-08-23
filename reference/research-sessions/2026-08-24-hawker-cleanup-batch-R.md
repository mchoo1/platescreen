# 2026-08-24 (6th pass, Batch R) — Broader re-audit finds 24 more affected venues

Batches A-Q (5th pass) closed out the flagged-venue backlog tracked against an original
~86-89 count, using a heuristic of `type: hawker`, `cuisine: "Local & Hawker"`, no
`operatorId`. Re-running the audit with a stricter heuristic — any hawker brand whose
name contains no food-related word at all (not just the "Local & Hawker" catch-all
cuisine) — surfaces **88 additional generic personal/corporate-name entries across 24
venues** that the 5th pass never touched, including several venues entirely new to this
cleanup effort (Bukit Panjang Hawker Centre, East Coast Lagoon Food Village, Serangoon
Garden Market, Sims Vista Market, Havelock Road Cooked Food Centre, Kukoh 21 Food
Centre, Marsiling Lane Blk 20/21, Blk 6 Tanjong Pagar Plaza, Blk 17 Upper Boon Keng,
Jurong West Street 52 Blk 505, Chong Boon Market, Cheng San Market, Blk 724 Ang Mo Kio
Market, Taman Jurong Market).

This starts a new round (Batch R onward) working through that list. Batch R covers 4
venues, including a second instance of the SFA-log-duplication bug.

## Chong Boon Market & Food Centre / Cheng San Market & Cooked Food Centre — a second duplication-bug pair

Same defect pattern as the Mayflower/AMK 628 and Kaki Bukit 511/Bedok 538 pairs resolved
in Batch P: `chong_boon_market_and_food_centre` and `cheng_san_market_and_cooked_food_centre`
had byte-identical brand lists (Chee Kiat Hoe (Xu Jiehe), Chow Chee Peng Jason (Zou
Zhiping), Amk443 Eating House Pte. Ltd., Cheers Holdings (2004) Pte. Ltd., Cold Storage
Singapore (1983) Pte Ltd — appearing twice under a duplicated "_2" id) and identical
stored addresses scattered across 407/443/452/532 Ang Mo Kio Avenue 10 — none of which
is either venue's real address.

Web search confirms these are two distinct, well-known hawker centres:
**Chong Boon Market & Food Centre** at 453A Ang Mo Kio Avenue 10, 561453, and **Cheng San
Market & Cooked Food Centre** at 527 Ang Mo Kio Avenue 10, 560527. Removed the two
generic personal names, the non-informative "Amk443 Eating House Pte. Ltd." (a coffeeshop
operator's corporate name with zero informational value per the standing "avoid generic
outlets" instruction), and the duplicated "_2" Cold Storage entry from each venue.
Fixed the address on the two legitimate remaining real-chain entries (Cheers Holdings,
Cold Storage) per venue. Added 4 verified real stalls to each from published stall
directories:

- **Chong Boon**: Yong Xin (#01-39, noodles), Ang Mo Kio Loh Mee Laksa (#01-17), Bin Fen
  Economic Bee Hoon (#01-03), Cai Ji Fried Fish Soup (#01-10).
- **Cheng San**: Tian Yi Vegetarian Food (#01-143), Mei Ji Niang Dou Foo (#01-149, yong
  tau foo), Shui Guo (#01-136, chwee kueh), Xiang Kee Yu Yuan Mian Tang (#01-130,
  fishball noodles).

## Blk 724 Ang Mo Kio Market — new venue, wrong addresses pointed to a JC, a school, a library, a Shell station

Never previously touched. Its 5 generic/non-informative entries (Alvin Sabai, Ang Hwei
Ling, "Cafe Galilee Pte. Ltd.", Choo Siew Ping, Chu Sing Kuang) were scattered across
addresses for Anderson Junior College, Presbyterian High School, and Ang Mo Kio
Community Library — none of them the actual hawker centre. Confirmed via web search and
OneMap that the real venue (Ang Mo Kio Central Market & Food Centre) is at **724 Ang Mo
Kio Avenue 6, 560724**. Removed all 5 generic entries, fixed the address on the
remaining Cold Storage Singapore (1983) Pte Ltd entry, and added 5 real stalls sourced
from a dedicated food blog roundup: Xi Xiang Feng (#01-23, yong tau foo), Lim Hai Sheng
Cooked Food (#01-09, white carrot cake), Hup Hup Minced Meat Noodle (#01-39), Fried
Hokkien Prawn Noodle (#01-38), Seng Bee Hainanese Chicken Rice (#01-31).

## Bukit Panjang Hawker Centre — completing prior partial coverage

This venue already had 3 real stalls added in an earlier session (You Xiang Teochew
Noodles, Zai Lai's Lor Mee, Like Pudding, all at 2 Bukit Panjang Ring Road, 679947) but
3 "Stall No" placeholder entries (Khor Lye Hong, Koh Heong Choo, Kok Kuan Yen) were left
behind and missed by every batch in the 5th pass because they don't carry the "Local &
Hawker" cuisine tag the old heuristic filtered on. Address was already correct, so no
fix needed there. Added 3 verified real stalls: Hai Nan Hometown Curry (#01-01), Tong
Fong Fatt Hainanese Boneless Chicken Rice (#01-24), Yu Kee Duck Rice (#01-10).

## Still to do (from the new 24-venue list)

Clementi Ave 3 Blk 448, Eunos Crescent Blk 4A, East Coast Lagoon Food Village, Serangoon
Garden Market, Tanglin Halt Market, Mei Chin Road Market, New Upper Changi Road Blk
208B, Sims Vista Market, Bukit Merah Central Food Centre, 80 Circuit Road Market,
Havelock Road Cooked Food Centre, Kukoh 21 Food Centre, Marsiling Lane Blk 20/21, Blk 6
Tanjong Pagar Plaza, Changi Village Blk 2 and 3, Blk 17 Upper Boon Keng, Jurong West
Street 52 Blk 505, Margaret Drive Hawker Centre, Taman Jurong Market. (Some of these are
partial-coverage completions on already-touched venues; others are entirely new.)

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,721 total brands (unchanged net — 16
added, 16 removed), 4,653 total premises (unchanged net) — 0 duplicate IDs, 0 orphaned
premises, 0 missing lat/lng. Build-mirror diff confirms live and mirror
`brands.ts`/`premises.ts` are byte-identical.
