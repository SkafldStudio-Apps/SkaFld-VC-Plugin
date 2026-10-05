---
name: deal-comparables
description: Finds what comparable rounds priced at, from the firm's own pipeline where a platform is connected and from sourced external data, and gives the percentile the ask sits at. Use when someone asks what similar rounds priced at or raised, or when a price verdict needs its comparables. For whether the price is fair, use valuation-triangulation.
---

# Deal comparables

The deployment's own pipeline is the best comparable set there is: same network, same stage, known decisions. External data supplements it and never replaces it. Comparables and exit expectations are the only valuation inputs with a measured link to the prices investors set: 80% of VCs call comparables important and 86% exit considerations (Gompers, Gornall, Kaplan and Strebulaev 2020, 885 VCs), and no published study has tested a pre-revenue valuation heuristic against prices or outcomes (literature search, September 2026). No paper prescribes a seed-stage selection algorithm either; the best-supported procedure is same stage, region, sector and recent, with adjustments for the money-supply regime (Gompers and Lerner 2000; Nanda and Rhodes-Kropf 2013), investor quality (Hsu 2004) and round structure (Carta 2026).

**With a platform** (only where the SkaFld VC Platform add-on is connected and `skafld-vc:whoami` answers): load `skafld-vc-platform:platform-access` first (it comes with the add-on) and call `skafld-vc:whoami`; the pipeline is the first comparable set. **Documents only** (no platform): skip every platform call below. The candidate set is the comparables the person gives you plus the external comparables and dated medians of step 7; every pipeline-only tag (decision, thesis at decision, source channel) is "not recorded", and nothing is saved.

## Procedure

1. **Subject.** For a deal in this deployment, `skafld-vc:get_deal_details` and `skafld-vc:search_documents` with its id; for an outside company, the documents the user gave you (nothing about it is saved). Record the subject with the same tags as the comparables (step 3).
2. **Candidate set, pipeline first** (platform only; documents only, start from the person's comparables and go to step 7 for external ones). `skafld-vc:query_deals` with the subject's `sector` and `stage`, `sort_by: "created_at"`, and a `limit` large enough to reach back 8 to 12 quarters (a design choice: long enough for a usable set, short enough to stay within one funding-cycle regime; see step 4). Include every decision the member can see: funded, passed and still open. `skafld-vc:query_deals` has no date filter, so drop older deals by `created_at` yourself. Say the scope: investors and associates see only open, funding and funded rounds, so their set has no passes and leans toward deals that were funded.
3. **Tag every comparable, and the subject.** Take what the tools return (`skafld-vc:query_deals` fields, the scorecard's `extracted_metrics` from `skafld-vc:get_deal_details`, `skafld-vc:search_documents` with the comparable's id, and, where you have them (admin tier), `skafld-vc:deal_activity` for the decision date and `skafld-vc:committee_votes` for the tally; an agent without those tools writes "not recorded"). Write "not recorded" for anything the tools do not give; never estimate a tag.
   - **Market regime** (the price drivers in Gompers and Lerner 2000, Hsu 2004 and Carta 2026): quarter of the round or decision; AI vs non-AI; region; lead-investor tier (a high-reputation lead, another institutional lead, an angel or syndicate lead, no lead, unknown); instrument, priced round vs SAFE cap (for SAFEs compare post-money caps); round size; dilution (round size divided by post-money).
   - **Founder prior-success flag**: a founder with a prior successful company (a real exit or $10M+ revenue, Tamaseb's broader definition; Tamaseb 2021). Base rate, on a narrower definition: founders whose prior VC-backed company went public succeed (IPO) 30% of the time against 21% for first-time and 22% for previously failed founders (Gompers, Kovner, Lerner and Scharfstein 2010).
   - **Lead and co-investor quality**: who led and who joined, and whether they are well networked. One standard deviation more network centrality goes with a 2.5 point higher exit rate from a 34.2% base (Hochberg, Ljungqvist and Lu 2007); much of a VC's persistence is explained by better deal access (Nanda, Samila and Sorenson 2020). High-reputation VCs' offers are accepted about 3x as often at a 10 to 14% lower valuation (Hsu 2004), so a comparable with a top-tier lead is not a like-for-like price.
   - **Source channel**: how the deal arrived (application, member referral, investor referral, outbound, other), from the record where staff can see it (`source_application_id`, `submitted_by`); otherwise not recorded.
   - **Thesis version at decision**: the thesis the network applied when it decided. `skafld-vc:whoami` serves only the current `house.thesis`; if no earlier version is recorded, write "current thesis; version at decision not recorded".
   - **Decision and outcome**: pipeline stage, decision date, and what happened since if known.
   - **Revenue basis**: trailing twelve-month revenue or a run-rate (a recent month or quarter annualised), with the months of data behind it. Run-rate figures pay for revenue "that has not materialized" (Stanford Search Fund Primer 2021, "A note on add-backs and run rates"); never compare a run-rate to a trailing figure without saying so.
4. **Vintage control.** Compare within the same funding-cycle regime and, where the set allows, the same quarter. Startups first funded in hot markets fail more but are valued higher when they exit (Nanda and Rhodes-Kropf 2013), and prices move with money supply independent of outcomes: a doubling of VC inflows raises valuations 7 to 21%, a doubling of public-market values 15 to 35% (Gompers and Lerner 2000). AI and non-AI are separate markets (the medians are in the `references/market-data.md` of `skafld-vc:valuation-triangulation`). Bucket out-of-regime comparables separately; never mix them silently.
5. **Rate up to five comparables against the subject.** Take the five most relevant in-regime comparables (the GoingVC Valuation Model's Comp Method uses five, on seven attributes). Rate each comparable relative to the subject on the Comp Method's seven attributes: **Niche, Founder Experience, Company Location, Customer Traction, Stage of Development, Funding, Team**, as Much Worse −2, Worse −1, Similar 0, Better +1, Much Better +2. For each comparable compute the **net** (sum of the seven ratings, −14 to +14) and the **distance** (sum of their absolute values, 0 to 14). One line of evidence per rating.
6. **Adjust from the most similar.** Anchor on the comparable with the smallest distance (keep ties). Adjust in the direction of its net: a comparable rated better than the subject (net above 0) implies a lower value for the subject; rated worse (net below 0), a higher value; net 0, about the same. Bound the adjustment with the neighbouring comparables on that side (the highest-valued comparable rated worse or similar when moving down, the lowest-valued one rated better or similar when moving up); if there is none, say the range is open on that side. No source gives a dollar value per rating point, so state the direction and the bounds, never a per-point percentage.
   - **Do not reproduce the workbook's pick.** The Comp Method sheet ranks comparables by the absolute value of the net, takes the most similar one's valuation as "Estimated Minimum" and the rank-2 one's as "Estimated Maximum", averages the two, and never applies the sign, so a comparable that is Much Better on every attribute enters unadjusted, and ties in the rank can leave the lookup empty (GoingVC Valuation Model workbook, n.d., Comp Method sheet, as built). Use the distance to choose and the net to adjust.
7. **External comparables and medians.** Add an external comparable only where a source gives valuation and round size for the same stage and period. Add dated market medians for context from the round medians and SAFE caps in the `references/market-data.md` of `skafld-vc:valuation-triangulation`, each with its source and date; where the house profile describes an angel network with angel-sized cheques (`check_range_usd`), use that file's angel-group median rather than the venture medians unless a top-tier lead is in the round. Mark every external figure with source and date, and say it will age. For a US comparable, a Form D filing on SEC EDGAR (free full-text search) confirms the amount sold and the date of an exempt offering; it never gives a valuation, so use it to check round size and timing, not price.
8. **Distribution and placement.** Across the in-regime set report p25, median and p75 for post-money (or cap), round size and dilution, and the subject's percentile on each; repeat for the funded subset. When the set is too small for quartiles to mean anything, list the values and say so. Price is round size divided by dilution (Carta 2026), so compare on round size and dilution, not on valuation alone.
9. **What funded comparables had.** Note what the funded comparables had that the subject does or does not. Treat "what the funded comparables went on to do" as a biased sample: observed valuations come disproportionately from companies doing well (Cochrane 2005; Korteweg and Sorensen 2010).

## Output

```
## Comparables — <Company>
Base rates: 48% of angel-group exits returned capital (Wiltbank and Boeker 2007);
the average VC fund writes off 75.3% of investments (Hochberg, Ljungqvist and Lu 2007);
funded angel-group applicants survive 20-25% more over four years than rejected ones
(Kerr, Lerner and Schoar 2014), 14-23% over 1.5-3 years across 21 countries
(Lerner, Schoar, Sokolinski and Wilson 2018).
Market context: <dated medians, each with source and date>
Pipeline set: <n> deals, <sector>, <stage>, <quarters>, regime <label>; scope <member scope>

| Deal | Quarter | AI | Region | Lead (tier) | Co-investors | Instrument | Round | Post / cap | Dilution | Revenue (trailing or run-rate, months) | Prior success | Source | Thesis at decision | Decision | Since |
| [Company](/deals/{id}) | ... |

Similarity (up to five; comparable relative to subject, −2..+2)
| Deal | Niche | Founder Exp. | Location | Traction | Stage of Dev. | Funding | Team | Net | Distance |

Anchor: <deal>, distance <d>, net <n> → subject <below / at / above> <value>; bounded by <deal> <value>
Distribution (in-regime; funded subset): post-money p25 / median / p75; round size p25 / median / p75; dilution p25 / median / p75
Subject: post-money at p<..>; round size at p<..>; dilution at p<..>
Funded comparables typically had: ...
Out-of-regime comparables (not used above): ...
```

## Rules

- Never name a portfolio company's confidential metrics outside the platform; in plugin output for readers outside the admin tier, refer to comparables by sector, stage and quarter instead of by name.
- Mark every external figure with its source and date, and every pipeline figure with its deal id.
- A headline post-money is the price of the latest preferred share, not the company's value (evidence in the `references/market-data.md` of `skafld-vc:valuation-triangulation`). Say so whenever a comparable's terms are off-market.
- Never blend comparables with other valuation methods into one number, and never present the workbook's min/max pick as a range.
- Never invent a comparable, a valuation or a tag; "not recorded" is an answer.
- Name the network with `house.short_name` from the house profile (resolved as the `references/house-profile.md` of `skafld-vc:setup` says: the platform's `skafld-vc:whoami`, else the saved firm profile from `setup:get_profile`, else the person) ("a <short name> deal" against "an outside company").

## Sources

The numbered sources cited above are in `references/sources.md`; the dated market medians carry their own in the `references/market-data.md` of `skafld-vc:valuation-triangulation`.
