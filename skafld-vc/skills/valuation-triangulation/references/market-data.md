# Dated market data

The one place SkaFld VC keeps the dated market figures its pricing and terms skills cite: the headline-price rule, term prevalence, the default option pool and round medians. Other skills and agents state the rule they need in one clause and cite this file; the figures live only here, so an update is made once.

**As of October 2026.** The newest figures are from reports covering the first half of 2026 (Cooley Q2 2026, published August 2026; Wilson Sonsini Q2 2026; Carta data to July 2026). They are US data and they age: quote each with its source and date, say it will age, and use a newer edition of the same source where you have one (and say which).

## The headline post-money is a price, not a value

The headline post-money is the price of the last preferred share, not the company's value. Across 135 US unicorns, the headline post-money averaged 48% above fair value (Gornall and Strebulaev, "Squaring Venture Capital Valuations with Reality", Journal of Financial Economics, 2020), and the latest preferred share is worth on average 56% more than common (Gornall and Strebulaev, "A Valuation Model of Venture Capital-Backed Companies with Multiple Financing Rounds", SSRN 3725240, 2021). Off-market terms widen the gap; the payout through the preference stack (the waterfall in `skafld-vc:returns-analysis`) shows by how much.

## Term prevalence

The standard package at seed and Series A: 1x, non-participating, pari passu with prior preferred, non-cumulative dividends, broad-based weighted-average anti-dilution, no redemption, no pay-to-play in an up round, a post-money capped SAFE.

| Term                 | Standard                  | Prevalence (source)                                                                                                                                                                            |
| -------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Liquidation multiple | 1x                        | 95.8% of deals 1x (Cooley, Q2 2026, 166 deals)                                                                                                                                                 |
| Participation        | none                      | 96.4% non-participating (Cooley, Q2 2026)                                                                                                                                                      |
| Seniority            | pari passu                | senior preference in 16% of Series B and later rounds, 1H 2026 (Wilson Sonsini); no seed-only series was found                                                                                 |
| Dividends            | non-cumulative            | accruing dividends in 3% (Cooley, Q2 2026)                                                                                                                                                     |
| Anti-dilution        | broad-based weighted avg. | 94 to 100% in every period since 2021, 98 to 100% in 2026; full ratchet 0 to 1% (Wilson Sonsini)                                                                                               |
| Redemption           | none                      | 5.4% (Cooley, Q2 2026)                                                                                                                                                                         |
| Pay-to-play          | none in an up round       | 8.4% of all deals (Cooley, Q2 2026); a down-round term: 42% of 2025 down rounds against about 2% of up rounds (Wilson Sonsini)                                                                 |
| SAFE form            | post-money, capped        | 89% of SAFEs post-money and 85% capped in 1H 2026; median discount 20% where one exists (Wilson Sonsini, Q2 2026)                                                                              |
| Founder vesting      | in place                  | angel-round model terms vest 25 to 50% at closing and the rest over two to four years (Angel Capital Association Angel Guidebook term sheet; Rosen, Alliance of Angels model term sheet, 2013) |

Cooley's figures cover all stages, and Wilson Sonsini's preference and pay-to-play tables are Series B and later; a seed-only prevalence series for priced rounds was not found. Say this when you cite them.

## Option pool

- Default pool when the documents state none: **12.1% of fully diluted shares**, the seed median (Carta, Founder Ownership 2026). State it as an assumption. Older guides use 20%; pools are typically 10 to 20% (GoingVC, VC interview guide, n.d.).

## Round medians and dilution

- Carta, software rounds in the six months to July 2026: seed median $24.3M post-money on $4.1M raised at 18% dilution; Series A $80M on $14.4M at 18%. Series B dilution median 12% (July 2026). The blended seed-to-Series C dilution median fell from 18% to 16% over 2025 (Carta, 2026).
- AI and non-AI companies price as different markets: Series A medians of $55M for non-AI companies against $300M for AI foundation companies (Carta, 2026).
- SAFE caps: Wilson Sonsini median post-money SAFE cap $15.0M in 1H 2026, $20.0M in 2025 (Entrepreneurs Report, Q1 and Q2 2026); Carta, State of Pre-Seed 2025: about $10M for $250k to $1M rounds and $15M for $1M to $2.5M.
- Angel groups price lower: Angel Capital Association member median seed pre-money $10M in 2024 (Angel Funders Report, August 2025). Where the house profile describes an angel network with angel-sized cheques, expect prices near this median rather than Carta's, unless a top-tier lead is in the round (a high-reputation lead changes the price; Hsu, Journal of Finance, 2004).
- The older angel baseline of a $2.5M pre-money for 20% (GoingVC diligence guide, undated) is history, not a norm.

## Sources

- Angel Capital Association (2025). Angel Funders Report 2025. https://angelcapitalassociation.org/blog/press-release-aca-publishes-2025-angel-funders-report/
- Angel Capital Association (undated). Angel Guidebook: term sheet. https://www.angelcapitalassociation.org/data/Documents/Resources/AngelCapitalEducation/Angel_Guidebook_-_Term_Sheet_1.pdf
- Carta (2025-2026). State of Pre-Seed 2025; State of Private Markets Q1 2026; VC fundraising benchmarks (July 2026); Founder Ownership 2026. https://carta.com/data/state-of-pre-seed-2025/ ; https://carta.com/data/state-of-private-markets-q1-2026/ ; https://carta.com/data/linkedin-vc-fundraising-benchmarks-2026/ ; https://carta.com/data/founder-ownership-2026/
- Cooley (2026). Q2 2026 Venture Financing Report (166 deals). https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report
- GoingVC (undated). VC interview guide; The Complete Guide to Due Diligence for Angels. Practitioner reference library; no public URL.
- Gornall and Strebulaev (2020). Squaring venture capital valuations with reality. Journal of Financial Economics 135(1). https://www.nber.org/system/files/working_papers/w23895/w23895.pdf
- Gornall and Strebulaev (2021). A valuation model of venture capital-backed companies with multiple financing rounds. SSRN 3725240. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3725240
- Hsu (2004). What do entrepreneurs pay for venture capital affiliation? Journal of Finance 59(4). https://onlinelibrary.wiley.com/doi/10.1111/j.1540-6261.2004.00680.x
- Rosen (2013). Model term sheet for Alliance of Angels. http://www.danrosen.com/Model%20Term%20Sheet%20for%20Alliance%20of%20Angels%20-%20May%202013.pdf
- Wilson Sonsini (2026). The Entrepreneurs Report, Q1 and Q2 2026; Full Year 2025. https://www.wsgr.com/a/web/53Cr6jTCinxG7PhbSHKt4H/entrepreneurs-report-q1-2026.pdf ; https://www.wsgr.com/a/web/ntbxCfmspTLoevehaAoUgh/entrepreneurs-report-q2-2026.pdf
