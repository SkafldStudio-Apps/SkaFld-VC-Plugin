---
name: deal-comparables
description: Benchmark a deal's price against comparable deals from this deployment's own pipeline first (same sector and stage, same funding-cycle regime and quarter), tagged by market regime, rated against the subject on seven attributes, then external round data with sources. Reports p25/median/p75 and the subject's percentile. Use for deal-terms scoring, memos and committee questions about whether a price is in range.
---

# Deal comparables

The deployment's own pipeline is the best comparable set there is: same network, same stage, known decisions. External data supplements it and never replaces it. Comparables and exit expectations are the only valuation inputs with a measured link to the prices investors set: 80% of VCs call comparables important and 86% exit considerations (Gompers, Gornall, Kaplan and Strebulaev 2020, 885 VCs), and no published study has tested a pre-revenue valuation heuristic against prices or outcomes (literature search, September 2026). No paper prescribes a seed-stage selection algorithm either; the best-supported procedure is same stage, region, sector and recent, with adjustments for the money-supply regime (Gompers and Lerner 2000; Nanda and Rhodes-Kropf 2013), investor quality (Hsu 2004) and round structure (Carta 2026).

Load `skafld-vc:platform-access` first and call `whoami`.

## Procedure

1. **Subject.** For a deal in this deployment, `get_deal_details` and `search_documents` with its id; for an outside company, the documents the user gave you (nothing about it is saved). Record the subject with the same tags as the comparables (step 3).
2. **Candidate set, pipeline first.** `query_deals` with the subject's `sector` and `stage`, `sort_by: "created_at"`, and a `limit` large enough to reach back 8 to 12 quarters (a design choice: long enough for a usable set, short enough to stay within one funding-cycle regime; see step 4). Include every decision the member can see: funded, passed and still open. `query_deals` has no date filter, so drop older deals by `created_at` yourself. Say the scope: investors and associates see only open, funding and funded rounds, so their set has no passes and leans toward deals that were funded.
3. **Tag every comparable, and the subject.** Take what the tools return (`query_deals` fields, the scorecard's `extracted_metrics` from `get_deal_details`, `search_documents` with the comparable's id, and, where you have them (admin tier), `deal_activity` for the decision date and `committee_votes` for the tally; an agent without those tools writes "not recorded"). Write "not recorded" for anything the tools do not give; never estimate a tag.
   - **Market regime** (the price drivers in Gompers and Lerner 2000, Hsu 2004 and Carta 2026): quarter of the round or decision; AI vs non-AI; region; lead-investor tier (a high-reputation lead, another institutional lead, an angel or syndicate lead, no lead, unknown); instrument, priced round vs SAFE cap (for SAFEs compare post-money caps); round size; dilution (round size divided by post-money).
   - **Founder prior-success flag**: a founder with a prior successful company (a real exit or $10M+ revenue, Tamaseb's broader definition; Tamaseb 2021). Base rate, on a narrower definition: founders whose prior VC-backed company went public succeed (IPO) 30% of the time against 21% for first-time and 22% for previously failed founders (Gompers, Kovner, Lerner and Scharfstein 2010).
   - **Lead and co-investor quality**: who led and who joined, and whether they are well networked. One standard deviation more network centrality goes with a 2.5 point higher exit rate from a 34.2% base (Hochberg, Ljungqvist and Lu 2007); much of a VC's persistence is explained by better deal access (Nanda, Samila and Sorenson 2020). High-reputation VCs' offers are accepted about 3x as often at a 10 to 14% lower valuation (Hsu 2004), so a comparable with a top-tier lead is not a like-for-like price.
   - **Source channel**: how the deal arrived (application, member referral, investor referral, outbound, other), from the record where staff can see it (`source_application_id`, `submitted_by`); otherwise not recorded.
   - **Thesis version at decision**: the thesis the network applied when it decided. `whoami` serves only the current `house.thesis`; if no earlier version is recorded, write "current thesis; version at decision not recorded".
   - **Decision and outcome**: pipeline stage, decision date, and what happened since if known.
   - **Revenue basis**: trailing twelve-month revenue or a run-rate (a recent month or quarter annualised), with the months of data behind it. Run-rate figures pay for revenue "that has not materialized" (Stanford Search Fund Primer 2021, "A note on add-backs and run rates"); never compare a run-rate to a trailing figure without saying so.
4. **Vintage control.** Compare within the same funding-cycle regime and, where the set allows, the same quarter. Startups first funded in hot markets fail more but are valued higher when they exit (Nanda and Rhodes-Kropf 2013), and prices move with money supply independent of outcomes: a doubling of VC inflows raises valuations 7 to 21%, a doubling of public-market values 15 to 35% (Gompers and Lerner 2000). AI and non-AI are separate markets (Carta 2026: Series A medians of $55M for non-AI companies against $300M for AI foundation companies). Bucket out-of-regime comparables separately; never mix them silently.
5. **Rate up to five comparables against the subject.** Take the five most relevant in-regime comparables (the GoingVC Valuation Model's Comp Method uses five, on seven attributes). Rate each comparable relative to the subject on the Comp Method's seven attributes: **Niche, Founder Experience, Company Location, Customer Traction, Stage of Development, Funding, Team**, as Much Worse −2, Worse −1, Similar 0, Better +1, Much Better +2. For each comparable compute the **net** (sum of the seven ratings, −14 to +14) and the **distance** (sum of their absolute values, 0 to 14). One line of evidence per rating.
6. **Adjust from the most similar.** Anchor on the comparable with the smallest distance (keep ties). Adjust in the direction of its net: a comparable rated better than the subject (net above 0) implies a lower value for the subject; rated worse (net below 0), a higher value; net 0, about the same. Bound the adjustment with the neighbouring comparables on that side (the highest-valued comparable rated worse or similar when moving down, the lowest-valued one rated better or similar when moving up); if there is none, say the range is open on that side. No source gives a dollar value per rating point, so state the direction and the bounds, never a per-point percentage.
   - **Do not reproduce the workbook's pick.** The Comp Method sheet ranks comparables by the absolute value of the net, takes the most similar one's valuation as "Estimated Minimum" and the rank-2 one's as "Estimated Maximum", averages the two, and never applies the sign, so a comparable that is Much Better on every attribute enters unadjusted, and ties in the rank can leave the lookup empty (GoingVC Valuation Model workbook, n.d., Comp Method sheet, as built). Use the distance to choose and the net to adjust.
7. **External comparables and medians.** Add an external comparable only where a source gives valuation and round size for the same stage and period. Add dated market medians for context, each with its source and date, for example: Carta seed median $24.3M post-money on $4.1M raised at 18% dilution, and Series A $80M on $14.4M at 18% (six months to July 2026); Angel Capital Association member median seed valuation $10M for 2024 (Angel Funders Report, August 2025), so where the house profile describes an angel network with angel-sized cheques (`check_range_usd`), expect prices near the ACA medians rather than Carta's unless a top-tier lead is in the round (Angel Capital Association 2025; a high-reputation lead changes the price, Hsu 2004); Wilson Sonsini median SAFE valuation cap $15.0M in 1H 2026, 89% of SAFEs post-money (Entrepreneurs Report, Q1 and Q2 2026). Mark every external figure with source and date, and say it will age. For a US comparable, a Form D filing on SEC EDGAR (free full-text search) confirms the amount sold and the date of an exempt offering; it never gives a valuation, so use it to check round size and timing, not price.
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
- A headline post-money is the price of the latest preferred share, not the company's value: preferred is worth on average 56% more than common (Gornall and Strebulaev 2021). Say so whenever a comparable's terms are off-market.
- Never blend comparables with other valuation methods into one number, and never present the workbook's min/max pick as a range.
- Never invent a comparable, a valuation or a tag; "not recorded" is an answer.
- Name the network with `house.short_name` from `whoami` ("a <short name> deal" against "an outside company").

## Sources

1. Gompers, P., Gornall, W., Kaplan, S. and Strebulaev, I. (2020). "How Do Venture Capitalists Make Decisions?" Journal of Financial Economics 135(1), 169–190. NBER w22587, https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
2. Wiltbank, R. and Boeker, W. (2007). "Returns to Angel Investors in Groups." Kauffman Foundation / ACEF. SSRN 1028592, https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
3. Hochberg, Y., Ljungqvist, A. and Lu, Y. (2007). "Whom You Know Matters: Venture Capital Networks and Investment Performance." Journal of Finance 62(1). https://www.stat.berkeley.edu/~aldous/Networks/hochberg.pdf
4. Kerr, W., Lerner, J. and Schoar, A. (2014). "The Consequences of Entrepreneurial Finance: Evidence from Angel Financings." Review of Financial Studies 27(1). https://www.hbs.edu/ris/download.aspx?name=Kerr_Lerner_Schoar+RFS14.pdf
5. Lerner, J., Schoar, A., Sokolinski, S. and Wilson, K. (2018). "The Globalization of Angel Investments: Evidence across Countries." Journal of Financial Economics 127(1). https://www.nber.org/papers/w21808
6. Gompers, P., Kovner, A., Lerner, J. and Scharfstein, D. (2010). "Performance Persistence in Entrepreneurship." Journal of Financial Economics 96(1). https://www.newyorkfed.org/medialibrary/media/research/economists/kovner/performance_persistence.pdf
7. Nanda, R., Samila, S. and Sorenson, O. (2020). "The Persistent Effect of Initial Success: Evidence from Venture Capital." Journal of Financial Economics 137(1). https://www.nber.org/system/files/working_papers/w24887/w24887.pdf
8. Hsu, D. (2004). "What Do Entrepreneurs Pay for Venture Capital Affiliation?" Journal of Finance 59(4). https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.2004.00680.x
9. Nanda, R. and Rhodes-Kropf, M. (2013). "Investment Cycles and Startup Innovation." Journal of Financial Economics 110(2). https://www.hbs.edu/ris/Publication%20Files/12-032_87eecafd-ac01-4b6d-83e8-390b7c03539a.pdf
10. Gompers, P. and Lerner, J. (2000). "Money Chasing Deals? The Impact of Fund Inflows on Private Equity Valuations." Journal of Financial Economics 55(2), 281–325. https://www.sciencedirect.com/science/article/abs/pii/S0304405X99000525
11. Gornall, W. and Strebulaev, I. (2021). "A Valuation Model of Venture Capital-Backed Companies with Multiple Financing Rounds." SSRN 3725240, https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3725240
12. Cochrane, J. (2005). "The Risk and Return of Venture Capital." Journal of Financial Economics 75(1), 3–52. https://www.nber.org/papers/w8066
13. Korteweg, A. and Sorensen, M. (2010). "Risk and Return Characteristics of Venture Capital-Backed Entrepreneurial Companies." Review of Financial Studies 23(10), 3738–3772. https://business.columbia.edu/sites/default/files-efs/pubfiles/4556/RRmanu.021511.pdf
14. Carta (2026). "State of Private Markets: Q1 2026" and related data posts. https://carta.com/data/state-of-private-markets-q1-2026/ ; https://carta.com/data/state-of-private-markets-q4-2025/
15. Angel Capital Association (August 2025). "Angel Funders Report 2025." https://angelcapitalassociation.org/blog/press-release-aca-publishes-2025-angel-funders-report/
16. Wilson Sonsini (June and September 2026). "The Entrepreneurs Report: Q1 2026" and "Q2 2026." https://www.wsgr.com/a/web/53Cr6jTCinxG7PhbSHKt4H/entrepreneurs-report-q1-2026.pdf ; https://www.wsgr.com/a/web/ntbxCfmspTLoevehaAoUgh/entrepreneurs-report-q2-2026.pdf
17. GoingVC (n.d.). "The GoingVC Valuation Model" workbook, Comp Method sheet (seven startup attributes, five comparables, Much Worse to Much Better mapped to −2..+2). Practitioner workbook; no public URL.
18. Stanford GSB Center for Entrepreneurial Studies (2021). _2021 Search Fund Primer_, "A note on add-backs and run rates". Practitioner guide; no public URL.
19. Tamaseb, A. (2018, 2021). "Super Founders" dataset of about 200 US unicorns against a control set. https://alitamaseb.medium.com/land-of-the-super-founders-a-data-driven-approach-to-uncover-the-secrets-of-billion-dollar-a69ebe3f0f45
20. U.S. Securities and Exchange Commission. EDGAR full-text search and Form D (notice of exempt offering). https://www.sec.gov/edgar/search/
