# Method formulas, defaults and a worked example

Formulas for `skafld-vc:valuation-triangulation`. Each section says where its formula or default comes from; "derived here" marks arithmetic that follows from the formulas but is not printed in a source. Conversion arithmetic for SAFEs and notes is in `skafld-vc:cap-table` and is not repeated here.

## Notation

| Symbol | Meaning                                                                 |
| ------ | ----------------------------------------------------------------------- |
| `R`    | New money in the round                                                  |
| `s`    | Ownership sold in the round, fully diluted                              |
| `p`    | Option pool target as a share of post-money fully diluted shares        |
| `E`    | Exit value (equity value to all holders at exit)                        |
| `d_i`  | Dilution in later round `i` (new money plus any pool top-up that round) |
| `r`    | Retention to exit, the product of (1 − `d_i`)                           |
| `T`    | Target multiple on the cheque in the success case (per deal)            |
| `T_p`  | Required gross multiple for the portfolio (for the break-even test)     |

## 1. Decode the ask (arithmetic, not a valuation)

- post = R / s; pre = post − R.
- Pool carved from the pre-money: pool dollars = p × post; effective pre-money = pre − p × post. The investor's ownership is unchanged; existing holders absorb the pool (Nivi and Ravikant, "The Option Pool Shuffle", Venture Hacks, 2007).
- Post-money SAFEs: ownership sold = sum of amount / post-money cap, before the priced round's new money and pool increase dilute it (Y Combinator, Post-Money SAFE User Guide, 2018 onward).
- Default pool when none is stated: 12.1% of fully diluted shares, the seed median (Carta, Founder Ownership 2026). State it as an assumption.
- The GoingVC Valuation Model workbook (undated) computes pool dollars as pool share × pre-money. Term sheets size the pool on post-money, so use p × post and say which convention the documents use.

**Example (derived here).** $2M for 10%: post $20M, pre $18M. A 12.1% pool in the pre-money is $2.42M, so the effective pre-money is $15.58M.

## 2. Comparables distribution

- Use the in-regime set from `skafld-vc:deal-comparables`: same stage and sector, same funding regime (quarter, AI or not, region, lead tier, instrument).
- Quartiles by linear interpolation between ranked values. Percentile of the ask = (number of comparables below it + half of those equal to it) / n.
- When the set is too small for quartiles to mean anything, list the values and say so; no source gives a minimum count.
- Price identity: post-money ≈ round size / dilution (Carta, State of Private Markets, 2026: median dilution 18% at seed and Series A, software rounds, six months to July 2026). Report round size and dilution percentiles beside post-money.

## 3. Placement (design choice, unvalidated)

Map the rubric composite `c` onto the rubric scale's percentile anchors, which `skafld-vc:deal-scorecard` uses for every criterion:

| Composite | 1   | 2   | 3   | 4   | 5   |
| --------- | --- | --- | --- | --- | --- |
| Anchor    | p10 | p25 | p50 | p75 | p90 |

- Placement percentile: linear between the two anchors around `c` (clamp below 1 and above 5).
- Fair range: the comparables' values at those two anchors.
- No study tests a mapping from screening scores to price; this is a convention that keeps screening and valuation from double counting the same factors.

**Example (derived here).** In-regime seed post-money: p10 $8M, p25 $11M, p50 $15M, p75 $20M, p90 $26M. Composite 3.6 lies between the anchors 3 and 4, so placement = 50 + 0.6 × 25 = p65 and the fair range is $15M to $20M. An ask at $20M post sits at p75, the top of that range.

## 4. Ceiling (VC method with retention)

```
r        = product over later rounds of (1 − d_i)
max post = E × r / T
max pre  = max post − R
E_needed = post_ask × T / r        (exit value the ask needs to reach T)
```

- The VC method: forecast an exit value and divide by the target return (Sahlman and Scherlis, "A Method for Valuing High-Risk, Long-Term Investments", HBS note 288-006, 1987), with expected retention (Metrick and Yasuda, Venture Capital and the Finance of Innovation, 2011). The GoingVC workbook's version has no retention factor; always include it.
- Dilution defaults, shared with `skafld-vc:returns-analysis`: 18% at Series A and 12% at Series B (Carta, July 2026), plus pool top-ups where the company will need them. How many later rounds is a stated assumption; no source gives cumulative seed-to-exit dilution.
- `T` at seed: 10x reference, 20 to 30x as the "what has to be true" case (Gompers, Gornall, Kaplan and Strebulaev, JFE 2020; Payne, 2011; Berkus, 2016). At Series A, use the ladder in `skafld-vc:returns-analysis`.
- `E` comes only from cited exit evidence for the sector (acquisition prices, or exit-year revenue × a sourced multiple). Without it, the ceiling is not assessed.
- E × r / T uses ownership × exit value, which is right only above the point where preferred converts. At a 10x target that normally holds; check it with the waterfall in section 6 when the stack is large relative to `E`.

**Example (derived here).** E = $150M, Series A 18%, Series B 12%, one 5% pool top-up: r = 0.82 × 0.88 × 0.95 = 0.6855. With T = 10: max post = $150M × 0.6855 / 10 = $10.28M. A $20M post-money ask is 95% above the ceiling and needs E = $20M × 10 / 0.6855 = $291.8M.

## 5. Break-even stress test

Split the scenarios into success (strong and outlier, 5x or more) and the rest (loss and modest). Fix the relative weights inside each group, then:

```
m_S = weighted mean multiple of the success scenarios (through the waterfall)
m_N = weighted mean multiple of the other scenarios (through the waterfall)
M(q) = q × m_S + (1 − q) × m_N          judgment-weighted multiple at success probability q
q*   = (T_p − m_N) / (m_S − m_N)         break-even success probability
q_1  = (1 − m_N) / (m_S − m_N)           success probability for money back
```

- If m_S ≤ T_p, no probability makes the price work; say so.
- `T_p` defaults to 3x gross, stated as an assumption: with 60% of a seed portfolio near 0.25x and 30% near 2x, the remaining 10% must average about 22x for 3x (arithmetic on the base rates, not a published figure; see `skafld-vc:returns-analysis`).
- Base rate to compare with: about 10% of US venture financings returned 5x or more and 4% returned 10x or more (Correlation Ventures, 21,000 financings 2004 to 2013, via Levine, 2014); 52% of angel-group exits returned under 1x and 7% over 10x (Wiltbank and Boeker, 2007).
- **Default outcome prior, before any rubric adjustment.** Start every scenario table from this prior, print it, and move away from it only with a stated reason from the evidence (scorecard, traction, terms):

  | Outcome on the cheque | Default prior | Anchors                                                                                                                                                                                                                                                                                                                                            |
  | --------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Under 1x              | 55-65%        | 65% of 21,000 US financings (Correlation Ventures 2004-2013, via Levine, 2014); nearly half of financings lost money in the decade to 2023 (Coats, 2023); about half of 7,000+ investments (Horsley Bridge, via Evans, 2016); 52% of 1,137 angel-group exits (Wiltbank and Boeker, 2007); about 70% of 245 angel exits (Wiltbank and Brooks, 2016) |
  | 1x to 3x              | 25-30%        | the remainder once the other three rows are set; no source publishes this band on its own                                                                                                                                                                                                                                                          |
  | 3x to 10x             | 5-10%         | about 10% of financings returned 5x or more (Levine, 2014)                                                                                                                                                                                                                                                                                         |
  | 10x or more           | 3-6%          | 4% of financings (Levine, 2014); 6% of investments (Evans, 2016; Dixon, 2015); 7% of angel-group exits (Wiltbank and Boeker, 2007)                                                                                                                                                                                                                 |

  The table is a prior synthesised from those sources, not a published distribution; say so beside it. The sources are VC-backed or survey-based angel samples, so which prior fits a given network's deals is itself uncertain.

- **Failure probability falls as milestones are met.** Survival is time-varying: each milestone reached lowers the probability of failure, so the same company is worth more after the raise and the milestone it funds than before them, and the capital itself can lower the failure probability (Damodaran, 2009). A prior for a company that has already cleared its next-round bar is not the prior for one that has not; say which you used.
- The method is First Chicago (Achleitner and Lutz, 2008); failure is explicit in the probabilities instead of hidden in a high discount rate (Damodaran, 2009). Report `q*`, never M as a value.
- Read `q*` against the prior: when `q*` is far above the 3x-and-up rows of the table, the price needs the company to be a rarer outcome than the base rates allow; say by how much. When the success probability you can defend is below 1%, section 7 applies.

**Example (derived here).** Loss 0.1x and modest 1.5x weighted 70/30 give m_N = 0.52. Strong 5x and outlier 25x weighted 60/40 give m_S = 13.0. With T_p = 3: q\* = (3 − 0.52) / (13.0 − 0.52) = 19.9%; money back needs q_1 = 3.8%. The price needs about twice the roughly 10% base rate of 5x-plus outcomes, so it is rich unless the evidence justifies that.

## 6. Liquidation waterfall (for scenario proceeds)

Pay each scenario's exit value `E` through the stack, never ownership × `E`:

1. Assume every preferred class and every SAFE converts; each converting holder gets its share of the proceeds left after the non-converting classes are paid.
2. A non-participating class takes its preference instead when that is larger than its converted share. Pay preferences in seniority order; pari passu classes share pro rata when proceeds fall short.
3. Recompute the converted shares for the classes still converting, and repeat until no class switches.
4. Participating preferred takes its preference and then its converted share of the rest; with a cap, it converts once its converted share exceeds the cap.
5. A post-money SAFE in a liquidity event before it converts takes the greater of its purchase amount and its converted amount at the cap, alongside preferred and ahead of common (Y Combinator post-money SAFE form; confirm against the signed document).

The headline post-money is the price of the last preferred share: across 135 unicorns it averaged 48% above fair value, and the latest preferred is worth on average 56% more than common (Gornall and Strebulaev, JFE 2020; SSRN 3725240, 2021).

**Example (derived here).** Exit $10M. Seed preferred invested $4M for 20% (1x, non-participating); converted SAFEs hold 10% with a $1.5M preference, pari passu; common and pool hold 70%. All converting: seed $2.0M, SAFEs $1.0M, both below their preferences, so both take them ($5.5M). Common receives the remaining $4.5M (against $7.0M pro rata). Re-check: converting would now give the seed about $1.9M and the SAFEs $0.75M, still below their preferences, so the result stands. A $100k seed cheque receives $100k (1.0x), not 0.5% × $10M = $50k.

## 7. Sanity checks (practitioner, one author)

- A business plan that, properly resourced, has under a 1% chance of success is uninvestable at any price (GoingVC, Early-Stage Valuations guide, undated). Tie it to section 5: the success probability you would defend for this company, after the prior and the evidence, is what `q*` is tested against. If that probability is under 1%, stop there and say the plan is uninvestable rather than reporting `q*` or a price. The author treats the chance of success as the product of the critical-path objectives (see the seven prompts in `skafld-vc:returns-analysis` step 9), so one objective near zero is enough.
- The same author's corollary: since a sound plan has better than 1% odds and should show success within about five years, a required multiple above about 100x means the price or the plan is mis-specified (GoingVC, Early-Stage Valuations guide, undated). The same guide's maximum-value check, Vmax = market size × capturable share × steady-state margin / about 15%, is one author's model with assumed parameters: use it only as a stress test, never as an answer.

## 8. Heuristics kept only for a footnote

Never a dollar output in a verdict. If a reader asks, print them labelled "unvalidated heuristics" with their authors' caveats:

- Berkus: five elements (sound idea, prototype, quality management team, strategic relationships, product rollout or sales) up to $500k each, pre-revenue maximum $2M; the author says the per-element values must be rescaled to the local market (Berkus, 2016).
- Scorecard: weights team 30%, size of opportunity 25%, product and technology 15%, competitive environment 10%, marketing, sales and partnerships 10%, need for additional investment 5%, other 5%, each factor rated against the average comparable, the weighted sum times the regional median pre-money; the author says the median drives the output (Payne, 2011, revised 2019).
- Risk Factor Summation: twelve risks rated −2 to +2, each point $250k, added to a baseline; equal weights are a known criticism (Payne, 2013). The GoingVC workbook has no baseline, so a neutral company values at zero; never use it standalone.
- Step Up: ten yes-or-no factors at $250k each, maximum $2.5M (GoingVC Valuation Model workbook, undated).
- The workbook's weighted mean of all methods is not reproduced.

## Sources

- Achleitner and Lutz (2008). First Chicago Method. SSRN 1133004. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1133004
- Berkus (2016). After 20 years: updating the Berkus Method. https://berkonomics.com/?p=2752
- Carta (2026). State of Private Markets Q1 2026; VC fundraising benchmarks (July 2026); Founder Ownership 2026. https://carta.com/data/state-of-private-markets-q1-2026/ ; https://carta.com/data/founder-ownership-2026/
- Damodaran (2009). Valuing young, start-up and growth companies. https://pages.stern.nyu.edu/~adamodar/pdfiles/papers/younggrowth.pdf
- Coats (2023). Venture capital: we're still not normal (Correlation Ventures). https://medium.com/correlation-ventures/venture-capital-were-still-not-normal-9d07d354db88
- Dixon (2015). Performance data and the "Babe Ruth effect" in venture capital (Horsley Bridge data). https://a16z.com/performance-data-and-the-babe-ruth-effect-in-venture-capital/
- Evans (2016). In praise of failure (Horsley Bridge data). https://www.ben-evans.com/benedictevans/2016/4/28/winning-and-losing
- GoingVC (undated). The GoingVC Valuation Model workbook; Early-Stage Valuations guide. Practitioner reference library; no public URL.
- Gompers, Gornall, Kaplan and Strebulaev (2020). How do venture capitalists make decisions? JFE 135(1). https://www.nber.org/system/files/working_papers/w22587/w22587.pdf
- Gornall and Strebulaev (2020). Squaring venture capital valuations with reality. JFE 135(1); (2021) A valuation model of VC-backed companies with multiple financing rounds, SSRN 3725240. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3725240
- Levine (2014). Venture outcomes are even more skewed than you think (Correlation Ventures data). https://sethlevine.com/archives/2014/08/venture-outcomes-are-even-more-skewed-than-you-think.html
- Metrick and Yasuda (2011, 3rd ed. 2021). Venture Capital and the Finance of Innovation. Wiley.
- Nivi and Ravikant (2007). The Option Pool Shuffle. https://venturehacks.com/option-pool-shuffle
- Payne (2011, revised 2019; 2013). Scorecard Valuation Methodology; Methods for valuation of seed-stage companies. https://angelcapitalassociation.org/blog/blog-methods-for-valuation-of-seed-stage-startup-companies/
- Sahlman and Scherlis (1987). A method for valuing high-risk, long-term investments: the "Venture Capital Method". HBS note 288-006. https://www.hbs.edu/faculty/Pages/item.aspx?num=6515
- Wiltbank and Boeker (2007). Returns to angel investors in groups. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1028592
- Wiltbank and Brooks (2016). Tracking angel returns. Angel Resource Institute; report offline, figures from published summaries. https://www.venturesouth.vc/2016-5-20-3u3wdqmmhkcygzpnonoygks594kunk
- Y Combinator (2018 onward). Post-Money SAFE User Guide and forms. https://www.ycombinator.com/documents
