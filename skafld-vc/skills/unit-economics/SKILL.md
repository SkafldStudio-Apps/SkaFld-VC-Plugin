---
name: unit-economics
description: Reconstruct a startup's unit economics from what it discloses (burn, runway, gross margin, fully loaded CAC payback, cohort value, NRR and GRR, growth accounting, burn multiple), label each figure stated, derived or benchmark, and compare it with a dated benchmark for its business model and ARR band. Use for diligence, memo financial sections and testing a deck's numbers.
---

# Unit economics

Reconstruct, do not decorate. Every figure carries its source and one label: **stated** (the company says it), **derived** (you computed it, formula and inputs beside it) or **benchmark** (an outside reference, with its source and year). The output is a draft for a human reader.

Worked formulas for every metric are in `references/kpi-definitions.md`. Read it before computing anything.

## Procedure

1. **Collect the inputs.** Monthly revenue split into recurring and non-recurring, gross margin and what sits in COGS, monthly opex by function (sales and marketing, R&D, G&A), cash at each month end, customers or accounts by month (new, lost, expanded, contracted, returned), sales and marketing spend including salaries, and any cohort table. With a platform connected, read the deal's extracted figures with `get_deal_details` and the data room with `search_documents`; otherwise use the files the user gave. List every input that is missing.

2. **Fix the business model and the ARR band.** Business model: software (SMB, mid-market or enterprise by contract value), marketplace, consumer subscription, hardware, services-heavy, or other. ARR band: under $1M, $1-5M, $5-20M, $20-50M, over $50M. Load `skafld-vc:stage-calibration` for the stage bar. The benchmark rows you use in step 7 depend on both.

3. **Apply the "not yet measurable" rule under $1M ARR.** Every benchmark in the table below comes from companies that already have recurring revenue; none is specific to angel-stage companies, and at this size a ratio rests on a handful of customers. Under $1M ARR:

   - Always report gross margin, net burn and runway; they are measurable at any size.
   - Report NRR, GRR, CAC payback, LTV and burn multiple only when at least 12 months of customer history exist. Otherwise write "not yet measurable" with the reason (for example "4 paying customers, 5 months of history"). Show the raw counts instead.
   - For pre-revenue or thin-revenue companies, run growth accounting on active users or accounts as the proxy (Tribe Capital, 2019).
   - "Not yet measurable" feeds a scorecard as `not_assessed`, never as a low score.

4. **Derive what the inputs allow**, using the definitions in `references/kpi-definitions.md`:

   - Net burn and runway (cash / net burn).
   - Gross margin on the company's own COGS, then again with customer support and hosting moved into COGS if they sit in opex.
   - CAC payback on a gross margin basis with fully loaded CAC (KeyBanc and Sapphire, 2024): months = sales and marketing spend / ((new + expansion ARR) x gross margin) x 12. Check that sales and marketing includes founder time spent selling and that customer success sits in COGS; early-stage CAC usually omits both and looks better than it is (High Alpha, 2024).
   - Cohort value. With fewer than 12 months of cohorts, report realised cohort value: cumulative contribution per customer acquired in the cohort at months 3, 6 and 12 as available, with churned customers kept in the denominator (Tribe Capital, 2019; a16z, 2015). Do not present a formula LTV. With 12 months or more you may add a formula LTV, but show the retention curve beside it and say that a single retention rate biases the result, because cohort retention rises as low-retention customers leave (Fader and Hardie, 2010).
   - LTV and cohort value on contribution margin (revenue minus COGS minus variable cost to serve), never on revenue (a16z, 2015).
   - Growth accounting for each period: new, expansion, resurrected, churned and contraction ARR (or MRR, or active users), and the quick ratio = (new + expansion + resurrected) / (churned + contraction) (Tribe Capital, 2019).
   - GRR and NRR from beginning-of-period ARR (KeyBanc and Sapphire, 2024).
   - Burn multiple = net burn / net new ARR over the same period (Sacks, 2020).

5. **Reconcile.** Opex minus gross profit should approximate the stated net burn; treat burn as a positive number so the signs line up. Cash at the start minus cash at the end, less any financing received, should match cumulative net burn. Net new ARR from growth accounting should match the change in ARR. Headcount in the plan should match the revenue growth it is supposed to produce (GoingVC angel diligence guide, n.d.). Show every gap and its size; do not silently correct a stated figure.

6. **Read metrics in pairs, never alone.** "View these metrics together as either alone can tell a misleading story" and "a high churn rate and low DRR is a major red flag" (GoingVC angel diligence guide, n.d.). The pairs:

   - Churn with NRR: high logo churn with NRR above 100% means expansion is masking losses; high churn with NRR below 100% is the red flag.
   - Burn multiple with growth: a burn multiple is only read with the growth rate that produced it. Bessemer's ideal profile is "100% growth and 1.2x burn multiple" (Bessemer, 2023). Put its components (net burn, net new ARR, gross margin, churn) beside it, because it aggregates several problems into one number (Sacks, 2020).
   - Payback with retention: payback "says nothing about what happens after payback" (Balderton, 2023).
   - Marketplace GMV with take rate: GMV is not revenue (a16z, 2020).

7. **Compare with the benchmark table** for the model and band from step 2. State which direction the company sits and by how much, with the benchmark's source and year in the same cell. Read the burn multiple's direction by stage: it is expected near 3 at seed, near 2 after Series A, and should fall with scale (Sacks, 2020) toward zero (a16z, 2022); a burn multiple that rises as the company matures is a warning (Sacks, 2020).

8. **Flag the three assumptions** the picture is most sensitive to, and what data would resolve each.

## Benchmark table

Software medians by ARR band, from the two largest disclosed samples. Both are self-reported surveys whose samples change year to year; treat year-on-year movement as directional (SaaSCan, 2025).

| Metric (software)            | Under $1M   | $1-5M       | $5-20M      | $20-50M      | Over $50M    | Source                                                                                                      |
| ---------------------------- | ----------- | ----------- | ----------- | ------------ | ------------ | ----------------------------------------------------------------------------------------------------------- |
| Gross margin, median         | 80%         | 80%         | 80%         | 77%          | 79%          | High Alpha, 2024 (800+ companies)                                                                           |
| Gross margin, median         | 74%         | 77%         | 80%         | 78%          | 79%          | High Alpha, 2025 (early-stage margins down 7 points year on year, attributed to AI and infrastructure cost) |
| CAC payback, median months   | 5           | 8           | 14          | 20           | 20           | High Alpha, 2024                                                                                            |
| CAC payback, median months   | 5           | 8           | 14          | 20           | 17           | High Alpha, 2025                                                                                            |
| NRR, median (upper quartile) | 100% (110%) | 100% (110%) | 105% (120%) | 103%         | 102%         | High Alpha, 2024                                                                                            |
| NRR, median                  | 100%        | 104%        | 103%        | 103%         | 101%         | High Alpha, 2025                                                                                            |
| GRR, median                  | 92%         | 95%         | 90%         | 90%          | 83%          | High Alpha, 2024                                                                                            |
| GRR, median                  | 92%         | 92%         | 88%         | 90%          | 88%          | High Alpha, 2025                                                                                            |
| Year-on-year growth, median  | 100%        | 50%         | 30%         | 30%          | 15%          | High Alpha, 2024                                                                                            |
| Monthly net burn, median     | $50k        | $175k       | $375k       | not reported | not reported | High Alpha, 2024                                                                                            |

Other software references:

| Metric                                                       | Reference                                                                                                                                                                                                    | Source                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Gross margin, later-stage private                            | total 72%, subscription about 78% (median ARR about $26M)                                                                                                                                                    | KeyBanc and Sapphire, 2024                                          |
| Gross margin, spread                                         | portfolio average 65-70%, middle half 60-80%; top quartile at $1-10M ARR 85%+                                                                                                                                | Bessemer, 2021 updated 2024 (own portfolio, survivor-biased upward) |
| Gross margin, long-term target                               | 75% or more                                                                                                                                                                                                  | Sacks, 2020 and 2021                                                |
| CAC payback, later-stage private                             | median 20 months, top quartile 14 (2024 estimate)                                                                                                                                                            | KeyBanc and Sapphire, 2024                                          |
| CAC payback, by customer segment                             | targets under 12 months SMB, under 18 mid-market, under 24 enterprise                                                                                                                                        | Bessemer, 2021 updated 2024                                         |
| CAC payback, Series B/C                                      | good 12-18, better 6-12, best 0-6 months                                                                                                                                                                     | Bessemer, 2023                                                      |
| LTV to CAC                                                   | 3x or more                                                                                                                                                                                                   | Bessemer, 2021 updated 2024                                         |
| Cohort payback                                               | cohort cumulative gross profit crosses zero before month 12 and reaches 3x CAC                                                                                                                               | Sacks, 2020 and 2021                                                |
| NRR, later-stage private                                     | median 101%, top quartile 108-110%                                                                                                                                                                           | KeyBanc and Sapphire, 2024                                          |
| NRR, spread                                                  | median 101% (fell from 105% FY21 to FY23), top quartile 110-111%                                                                                                                                             | SaaSCan, 2024                                                       |
| NRR and GRR by contract value                                | SMB (under $12K ACV) GRR 70-80%, NRR 80-100%; mid-market ($12-50K) GRR 80-90%, NRR 90-120%; enterprise ($50K+) GRR above 90%, NRR above 100%                                                                 | Bessemer, 2019                                                      |
| NRR, Series B/C                                              | good 100%, better 110%, best 120%+                                                                                                                                                                           | Bessemer, 2023                                                      |
| GRR, spread                                                  | median 89%, top quartile 95%                                                                                                                                                                                 | SaaSCan, 2024                                                       |
| Burn multiple bands                                          | under 1 amazing, 1-1.5 great, 1.5-2 good, 2-3 suspect, over 3 bad (the post's table as reproduced across the industry; the text says "less than one is amazing, anything less than two is still quite good") | Sacks, 2020                                                         |
| Burn multiple by stage                                       | about 3 at seed, about 2 at Series A, lower after Series B                                                                                                                                                   | Sacks, 2020                                                         |
| Burn multiple by ARR                                         | about 3.4x at $0-1M ARR falling to about 1x at $25-50M; pooled 1.6x from seed to IPO                                                                                                                         | Scale Venture Partners, 2022                                        |
| Burn multiple, top quartile at $1-5M ARR                     | 0.5 (FY22), 0.8 (FY23)                                                                                                                                                                                       | SaaSCan, 2024                                                       |
| Efficiency (net new ARR / net burn, the inverse), Series B/C | good under 0.5x, better 0.5-1.5x, best 1.5x+                                                                                                                                                                 | Bessemer, 2023                                                      |
| Quick ratio                                                  | above 4 preferred for enterprise SaaS; under 2 signals a churn problem                                                                                                                                       | Tribe Capital, 2019                                                 |
| Runway, Series B/C                                           | good 12, better 18, best 24+ months                                                                                                                                                                          | Bessemer, 2023                                                      |

Consumer and marketplace references:

| Metric                               | Reference                                                                                                   | Source          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------- |
| 6-month user retention, good / great | consumer social 25% / 45%; consumer transactional 30% / 50%; consumer SaaS 40% / 70%                        | Rachitsky, 2020 |
| 6-month logo retention, good / great | SMB SaaS 60% / 80%; enterprise 70-75% / 90%                                                                 | Rachitsky, 2020 |
| 12-month NRR, good / great           | consumer SaaS 55% / 80%; bottom-up SaaS 100% / 120%; SMB land-and-expand 90% / 110%; enterprise 110% / 130% | Rachitsky, 2020 |
| Marketplace take rate                | low single digits to mid-30s percent; GMV is not revenue                                                    | a16z, 2020      |

Non-software gross margin: "durable economics benefit from high gross margins (40-60%+)" (GoingVC angel diligence guide, n.d.). This band applies only to marketplaces (on net revenue), hardware and services-heavy models. It sits at or below the bottom of the software spread above (middle half 60-80%, Bessemer, 2021 updated 2024), so never use it to judge a software company. The guide is undated; say so when you cite it.

Where the company's model has no row here, say "no dated benchmark found" and compare with the company's own history and plan only.

## Output

```
## Unit economics: <Company>
Model: <software segment / marketplace / ...> · ARR band: <band> · Stage bar: <from stage-calibration>
Basis: <n> months of data, <deck p.n / data room file / get_deal_details>

| Metric | Value | Label (stated / derived / benchmark) | Formula and inputs, or source and year |
| Gross margin | ... | ... | ... |
| Net burn, runway | ... | ... | ... |
| CAC payback (fully loaded, GM basis) | ... or not yet measurable (<reason>) | ... | ... |
| Cohort value at 3 / 6 / 12 months | ... | derived | ... |
| GRR, NRR | ... | ... | ... |
| Growth accounting (new / expansion / resurrected / churned / contraction), quick ratio | ... | derived | ... |
| Burn multiple | ... | derived | ... |

Benchmark comparison: <metric: company vs benchmark (source, year), direction>
Joint readings: churn with NRR: ...; burn multiple with growth: ...; payback with retention: ...
Reconciliation: <each check, match or gap with size>
Run-rate versus trailing: <which figures are annualised, from which months>
Sensitivities: 1. ... 2. ... 3. ...
Gaps: <what would resolve them>
```

## Rules

- Never present a derived number without the formula and the inputs beside it.
- Never annualise fewer than three months of data without saying so.
- A run-rate is never trailing revenue. Label every annualised figure "run-rate", name the months it was annualised from, and keep trailing twelve-month revenue separate. Paying on run-rate means "paying for earnings that have not materialized" (Stanford Search Fund Primer, 2021). ARR excludes services and one-off revenue (a16z, 2015).
- Where the company reports an adjusted figure (adjusted EBITDA, "excluding one-offs"), list each add-back and recompute without it.
- Where the company reports a metric with an unusual definition, quote the definition and recompute under the standard one in `references/kpi-definitions.md`.
- Every benchmark cell carries its source and year. Never state a threshold without one. When a newer edition of a source is available to you, use it and say which edition.
- A metric that cannot be computed yet is "not yet measurable" (and `not_assessed` in a scorecard), never a low score.
- This is a draft for a human decision. Cite every figure to a page, file or tool result. Never contact the company or its founders; list questions for the human team instead.

## Sources

- High Alpha, OpenView and Paddle, "2024 SaaS Benchmarks Report", 2024. https://www.highalpha.com/saas-benchmarks/2024 ; PDF https://2994607.fs1.hubspotusercontent-na1.net/hubfs/2994607/2024%20SaaS%20Benchmarks%20Report%20by%20High%20Alpha.pdf
- High Alpha, "2025 SaaS Benchmarks Report", 2025. https://www.highalpha.com/saas-benchmarks (mirror used by the source review: https://cdn1.tenchat.ru/static/vbc-gostinder/2026-01-07/28a96819-eeb8-439d-a75f-170bc33e3994.pdf)
- KeyBanc Capital Markets and Sapphire Ventures, "2024 KeyBanc Capital Markets and Sapphire SaaS Survey", 2024. https://www.key.com/content/dam/kco/documents/businesses___institutions/2024_kbcm_sapphire_saas_survey.pdf
- Bessemer Venture Partners (D'Onofrio), "Scaling to $100 Million", 2021, updated 2024. https://www.bvp.com/atlas/scaling-to-100-million
- Bessemer Venture Partners, "State of the Cloud 2023", 2023. https://www.bvp.com/atlas/state-of-the-cloud-2023
- Bessemer Venture Partners, "State of the Cloud 2019", 2019. https://www.bvp.com/atlas/state-of-the-cloud-2019
- Thibodeau and Rike, "SaaSCan B2B SaaS Metric Benchmarks", 2024 and 2025. https://saascan.ca/wp-content/uploads/2024/06/SaaSCan-B2B-SaaS-Metric-Benchmarks-2024.pdf ; https://saascan.ca/wp-content/uploads/2025/06/SaaSCan-B2B-SaaS-Metric-Benchmarks-2025.pdf
- Sacks (Craft Ventures), "The Burn Multiple", 2020. https://medium.com/craft-ventures/the-burn-multiple-51a7e43cb200
- Sacks, "The SaaS Metrics That Matter", 2021. https://sacks.substack.com/p/the-saas-metrics-that-matter
- Kahl and George (a16z), "A Framework for Navigating Down Markets", 2022. https://a16z.com/a-framework-for-navigating-down-markets/
- Jordan, Hariharan, Chen and Kasireddy (a16z), "16 Startup Metrics", 2015. https://a16z.com/16-startup-metrics/
- a16z, "13 Metrics for Marketplace Companies", 2020. https://a16z.com/13-metrics-for-marketplace-companies/
- Scale Venture Partners, "Benchmarking SaaS growth and burn", 2022. https://www.scalevp.com/blog/benchmarking-saas-growth-and-burn
- Cunningham (Balderton Capital), "The SaaS metrics that matter in 2023", 2023. https://www.balderton.com/wp-content/uploads/2023/07/The-SaaS-metrics-that-matters-in-2023_Balderton-Capital-1.pdf
- Hsu (Tribe Capital), "A Quantitative Approach to Product Market Fit", 2019. https://tribecap.co/essays/a-quantitative-approach-to-product-market-fit
- Fader and Hardie, "Customer-Base Valuation in a Contractual Setting: The Perils of Ignoring Heterogeneity", Marketing Science 29(1), 2010. https://pubsonline.informs.org/doi/10.1287/mksc.1080.0482
- Fader and Hardie, "How to Project Customer Retention", Journal of Interactive Marketing 21(1), 2007. https://journals.sagepub.com/doi/10.1002/dir.20074
- Rachitsky (with Winters), "What is good retention", 2020. https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29
- GoingVC Research Library, "Complete Due Diligence for Angels" (Product KPIs and Financial Due Diligence chapters), undated. Practitioner guide read from a reference folder; no public URL recorded.
- "Search Fund Primer" (Stanford, 2021 edition), run-rate and add-back cautions. Read from a reference folder; no public URL recorded.
